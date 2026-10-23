const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const element = () => ({ children: [], dataset: {}, classList: {add(){},remove(){},toggle(){}},
  style: {setProperty(){}}, addEventListener(){}, setAttribute(k,v){this[k]=v}, appendChild(x){this.children.push(x)}, focus(){} });
for (const lang of ['', 'en', 'ko', 'es', 'zh-cn', 'pt-br']) {
 const html = read(`${lang ? lang+'/' : ''}start.html`);
 for (const id of ['showcase-image','showcase-card','showcase-prev','showcase-next','showcase-dots'])
  assert.equal((html.match(new RegExp(`id="${id}"`, 'g')) || []).length, 1);
 assert.ok(html.includes('top.js?v=44'));
 assert.ok(html.includes('top-photos.js'));
 assert.ok(html.includes('site-colors.css?v=43'));
 if (lang) {
  assert.ok(!/[\u3040-\u30ff]/u.test(html), `${lang}: untranslated Japanese`);
  assert.ok(html.includes(`rel="canonical" href="https://exifframe.net/${lang}/start.html"`));
 }
 for (const href of [...html.matchAll(/(?:href|src)="([^"?#]+)/g)].map(m=>m[1])) {
  if (href.includes(':') || href.startsWith('/')) continue;
  assert.ok(fs.existsSync(path.join(root,lang,href)), `${lang}: ${href}`);
 }
 const elements = Object.fromEntries(['showcase-image','showcase-placeholder','showcase-card','showcase-dots','showcase-prev','showcase-next','mobile-menu','menu-backdrop','menu-button','menu-close'].map(id=>[id,element()]));
 elements['showcase-card'].closest = () => element();
 const label = html.match(/data-label="([^"]+)"/);
 if (label) elements['showcase-dots'].dataset.label=label[1];
 for (const m of html.matchAll(/data-alt(\d)="([^"]+)"/g)) elements['showcase-image'].dataset[`alt${m[1]}`]=m[2];
 let ready, tick, delay;
 const context = {URL, Image: class {}, window: {
  matchMedia:()=>({matches:false}), clearInterval(){}, setInterval(fn,ms){tick=fn;delay=ms;return 1}
 }, document: {currentScript:{src:'https://example.com/nested/assets/js/top.js?v=44'},
  getElementById: id=>elements[id], createElement: element, body:element(),
  addEventListener(type,fn){if(type==='DOMContentLoaded')ready=fn} }};
 vm.createContext(context);
 vm.runInContext(read('assets/js/top-photos.js'),context);
 vm.runInContext(read('assets/js/top.js'),context);
 ready();
 assert.equal(delay,6000);
 assert.equal(elements['showcase-dots'].children.length,4);
 const image=elements['showcase-image'], original=image.src;
 assert.ok(original.startsWith('https://example.com/nested/assets/images/top/'));
 elements['showcase-next'].onclick(); assert.notEqual(image.src,original);
 elements['showcase-prev'].onclick(); assert.equal(image.src,original);
 tick(); assert.notEqual(image.src,original);
 for(let i=0;i<4;i++) {
  elements['showcase-dots'].children[i].onclick();
  assert.ok(image.src.endsWith(`photo_0${i+1}.jpg`));
  assert.ok(fs.existsSync(path.join(root,`assets/images/top/photo_0${i+1}.jpg`)));
  if(lang) assert.equal(image.alt,elements['showcase-image'].dataset[`alt${i+1}`]);
 }
}
console.log('PASS: six intro pages; localized copy and metadata; image paths including subdirectory hosting; 6-second autoplay, previous/next and four dots. No browser rendering.');
