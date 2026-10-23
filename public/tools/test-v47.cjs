const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
class Element {
 constructor(tag){this.tag=tag;this.children=[];this.events={};}
 append(...items){this.children.push(...items)}
 setAttribute(){}
 addEventListener(k,fn){this.events[k]=fn}
 showModal(){this.open=true}
 close(){this.open=false;this.events.close?.()}
 remove(){this.removed=true}
}
for(const locale of ['ja','en','ko','es','zh-cn','pt-br']) {
 const images=[],body=new Element('body'),selected=[];let uploads=0;
 const ctx={URL,window:{ExifI18n:{locale}},document:{currentScript:{src:'https://example.com/project/assets/js/brand-icons.js'},body,createElement:t=>new Element(t)},Image:class {constructor(){images.push(this)}}};
 vm.createContext(ctx);vm.runInContext(read('assets/js/brand-icons.js'),ctx);vm.runInContext(read('assets/js/icon-picker.js'),ctx);
 assert.equal(ctx.window.EXIF_BRAND_ICONS.length,4);
 for(const item of ctx.window.EXIF_BRAND_ICONS){assert.ok(item.label[locale]);assert.ok(fs.existsSync(path.join(root,new URL(item.src).pathname.replace('/project/',''))))}
 const open=()=>{ctx.window.ExifIconPicker.open((...x)=>selected.push(x),()=>uploads++);return body.children.at(-1)};
 for(let i=0;i<4;i++){
  const d=open();d.children[1].children[i].onclick();images.at(-1).onload();
  assert.ok(d.removed);assert.equal(selected.at(-1)[0].src,ctx.window.EXIF_BRAND_ICONS[i].src);
 }
 let d=open();d.children[3].onclick();assert.equal(uploads,1);assert.ok(d.removed);
 d=open();d.children[1].children[0].onclick();let before=selected.length;d.close();images.at(-1).onload();assert.equal(selected.length,before);
 d=open();d.children[1].children[0].onclick();images.at(-1).onerror();assert.ok(d.open);assert.ok(d.children[2].textContent);
 d.close();
 const html=read(locale==='ja'?'index.html':`${locale}/index.html`);
 assert.ok(html.includes('site-brand-icon'));assert.ok(html.includes('brand-icons.js?v=47'));assert.ok(html.includes('icon-picker.js?v=47'));
}
const main=read('assets/js/main.js');
assert.ok(!main.includes("toast('大きな画像は端末負荷"));
assert.ok(main.includes('let maxSide=isMobileDevice()?2560:4096'));
assert.ok(main.includes("toast(`「${file.name}」は対応していない画像形式です。`,'error')"));
// Exercise the bridge into existing per-photo settings and linked propagation.
const marker=main.indexOf('const chooseIcon=');
const bridge=main.slice(marker,main.indexOf(";$('icon-add-button')",marker)+1);
let current={settings:{}},received,syncs=0,changes=0;
const ctx={window:{ExifIconPicker:{open:fn=>received=fn}},photo:()=>current,syncIconUI:()=>syncs++,settingsChanged:()=>changes++};
vm.createContext(ctx);vm.runInContext(bridge+'\nchooseIcon();',ctx);
received({src:'test'},'ExifFrame.net');assert.equal(current.settings.iconName,'ExifFrame.net');assert.equal(syncs,1);assert.equal(changes,1);
vm.runInContext('chooseIcon();',ctx);current={settings:{}};received({src:'late'},'late');assert.equal(current.settings.icon,undefined);
console.log('PASS: four presets in six languages; image load/error/cancel, custom upload, per-photo bridge, required asset paths and removal of optimization notice only.');
