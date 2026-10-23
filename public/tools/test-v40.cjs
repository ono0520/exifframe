const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const main=read('assets/js/main.js');
const block=main.slice(main.indexOf("let mediaMode='save'"),main.indexOf('let menuReturnFocus'));
let checks=0;
const check=(v,label)=>{assert.ok(v,label);checks++;};
class Element {
  constructor(){this.children=[];this.dataset={};this.attrs={};this.disabled=false;this.checked=false;this.listeners={};const set=new Set();this.classList={add:x=>set.add(x),remove:x=>set.delete(x),contains:x=>set.has(x)};}
  append(...els){this.children.push(...els);}
  replaceChildren(...els){this.children=els;}
  setAttribute(k,v){this.attrs[k]=v;}
  getAttribute(k){return this.attrs[k];}
  focus(){this.focused=true;}
  querySelectorAll(selector){const all=[];const visit=el=>{for(const e of el.children){all.push(e);visit(e);}};visit(this);return all.filter(x=>selector==='input[type="checkbox"]'?x.tag==='input'&&x.type==='checkbox':['input','button'].includes(x.tag));}
}
(async()=>{
 for(const locale of ['ja','en','ko','es','zh-cn','pt-br']){
  const elements={},get=id=>elements[id]||=(new Element());
  const calls={files:[],download:[],zip:[],share:[],toast:[]};
  const context={location:{pathname:locale==='ja'?'/project/':`/project/${locale}/`},window:{isSecureContext:true},document:{documentElement:{},addEventListener(){},body:new Element(),activeElement:null,createElement(tag){const e=new Element();e.tag=tag;return e;}},navigator:{share:async x=>calls.share.push(x),canShare:()=>true},$:get,S:{active:1,photos:[0,1,2].map(i=>({image:{src:`${i}.jpg`},file:{name:`${i}.jpg`}}))},isIOS:()=>false,filesForIndices:async indices=>{calls.files.push(indices);return indices.map(i=>({name:`${i}.jpg`}));},downloadFile:f=>calls.download.push(f),downloadZip:async i=>calls.zip.push(i),toast:(s,t)=>calls.toast.push([s,t])};
  vm.createContext(context);vm.runInContext(read('assets/js/i18n.js'),context);
  const dialog=get('media-selection-dialog');
  for(const id of ['media-selection-submit','media-selection-share-submit','media-selection-close','media-selection-cancel','media-select-all-checkbox','media-selection-list']){const e=get(id);e.tag=id==='media-selection-list'?'div':id==='media-select-all-checkbox'?'input':'button';dialog.append(e);}
  vm.runInContext(block,context);
  const before=get('preview-save-button');context.document.activeElement=before;
  check(before.onclick===get('settings-save-button').onclick,'Both entry buttons have the same handler');
  before.onclick();
  check(dialog.classList.contains('visible'),'Shared chooser opens');
  check(!get('media-selection-share-submit').hidden,'Sharing action is visible');
  check(get('media-selection-title').textContent===context.window.ExifI18n.translate('写真を選択'),'Localized chooser heading');
  const boxes=()=>get('media-selection-list').querySelectorAll('input[type="checkbox"]');
  check(boxes().length===3&&boxes()[1].checked,'Active photo initially selected');
  get('media-select-all-checkbox').onchange({target:{checked:false}});
  check(get('media-selection-submit').disabled&&get('media-selection-share-submit').disabled,'Zero selection disables both actions');
  get('media-select-all-checkbox').onchange({target:{checked:true}});
  check(!get('media-selection-submit').disabled&&boxes().every(x=>x.checked),'Select all enables actions');
  await get('media-selection-submit').onclick();
  check(calls.zip.length===1&&calls.zip[0].length===3,'Multiple photos saved as ZIP');
  check(!dialog.classList.contains('visible')&&before.focused,'Closes and returns focus');
  get('settings-save-button').onclick();
  await get('media-selection-share-submit').onclick();
  check(calls.share.length===1&&calls.share[0].files[0].name==='1.jpg','Sharing uses selected photo');
  before.onclick();await get('media-selection-submit').onclick();
  check(calls.download.length===1&&calls.download[0].name==='1.jpg','Single-photo download');
  context.isIOS=()=>true;before.onclick();await get('media-selection-submit').onclick();
  check(calls.share.length===2,'iPhone save uses share sheet');context.isIOS=()=>false;
  context.navigator.share=async()=>{const e=new Error('cancel');e.name='AbortError';throw e;};
  before.onclick();const count=calls.toast.length;await get('media-selection-share-submit').onclick();
  check(dialog.classList.contains('visible')&&!get('media-selection-submit').disabled&&calls.toast.length===count,'Share cancellation preserves selection without error');
  context.navigator.share=undefined;await get('media-selection-share-submit').onclick();
  check(calls.toast.at(-1)[1]==='error'&&!get('media-selection-submit').disabled,'Unsupported sharing leaves save available');
  let resolveFiles;context.filesForIndices=()=>new Promise(resolve=>{resolveFiles=resolve;});
  const pending=get('media-selection-submit').onclick();
  check(get('media-selection-share-submit').disabled&&get('media-selection-cancel').disabled,'No simultaneous actions during generation');
  const selectionBefore=boxes();get('settings-save-button').onclick();check(boxes()[0]===selectionBefore[0],'Cannot reopen while busy');
  resolveFiles([{name:'1.jpg'}]);await pending;
  check(!dialog.classList.contains('visible'),'Finishes pending save');
  get('share-current-button').onclick();check(get('media-selection-share-submit').hidden,'Desktop share keeps single action');get('media-selection-close').onclick();
  get('download-current-button').onclick();check(get('media-selection-share-submit').hidden,'Desktop save keeps single action');get('media-selection-close').onclick();
  context.S.photos=[];before.onclick();check(!dialog.classList.contains('visible'),'Empty photo list cannot export');
  for(const text of ['比率','保存','個別','個別設定に切り替える','写真を選んで保存・共有']){
   if(locale!=='ja'&&!(locale==='zh-cn'&&text==='保存'))check(context.window.ExifI18n.translate(text)!==text,`${locale}: new text translated`);
  }
 }
 for(const locale of ['', 'en/','ko/','es/','zh-cn/','pt-br/']){
  const html=read(`${locale}index.html`),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  check(new Set(ids).size===ids.length,'No duplicated IDs');
  for(const removed of ['linked-edit-control','make-individual-button','mobile-save-button','mobile-share-button']) check(!ids.includes(removed)&&!main.includes(`$('${removed}')`),'No dangling removed controls');
  for(const m of main.matchAll(/\$\('([^']+)'\)/g))check(ids.includes(m[1]),`Existing DOM target ${m[1]}`);
  check(html.indexOf('settings-save-button')>html.indexOf('hashtag-section')&&html.indexOf('settings-save-button')<html.indexOf('</aside>',html.indexOf('hashtag-section')),'Save button at end of settings');
 }
 const css=read('assets/css/mobile-refinements.css');
 check(css.includes('--portrait-preview-height: 55dvh')&&css.includes('height: calc(var(--portrait-screen-height) - var(--portrait-preview-height))'),'55/45 current viewport allocation');
 check(css.includes('--portrait-photo-height: calc(var(--portrait-preview-height) - var(--portrait-tabs-height))'),'Toolbar included in 55 percent');
 check(css.includes('--portrait-action-height: 0px'),'No footer reservation');
 console.log(`PASS: ${checks} v40 assertions (save/share flow, translations, DOM targets, layout rules; no browser rendering).`);
})().catch(e=>{console.error(e);process.exitCode=1;});
