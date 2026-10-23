const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks++; };
class Element {
  constructor() { this.children = []; this.listeners = {}; this.attrs = {}; this.scrollTop = 0; this.clientHeight = 200; this.classList = { toggle() {}, contains: () => false }; }
  append(...nodes) { this.children.push(...nodes); }
  appendChild(node) { this.append(node); }
  prepend(node) { this.children.unshift(node); }
  replaceChildren(...nodes) { this.children = nodes; }
  setAttribute(k,v) { this.attrs[k] = v; }
  addEventListener(type, listener) { this.listeners[type] = listener; }
}
const main = read('assets/js/main.js');
const stripSource = main.slice(main.indexOf('function strip()'), main.indexOf('function tags()'));
const propagateSource = main.match(/const propagateLinked=\(\)=>\{.*?\};/)[0];
for (const locale of ['ja','en','ko','es','zh-cn','pt-br']) {
  const document = { documentElement: {}, addEventListener() {}, createElement: () => new Element() };
  const context = { location: { pathname: locale === 'ja' ? '/project/index.html' : `/project/${locale}/index.html` }, document, window: {} };
  vm.createContext(context);
  vm.runInContext(read('assets/js/i18n.js'), context);
  const i18n = context.window.ExifI18n;
  check(i18n.locale === locale, `${locale}: nested language detection`);
  check(i18n.localizedPath('ja') === '/project/', `${locale}: Japanese link`);
  check(i18n.localizedPath('en') === '/project/en/', `${locale}: English link`);
  context.location.pathname = '/en/';
  check(i18n.localizedPath('ja') === '/', 'No double-slash root link');
  const elements = {};
  context.$ = id => elements[id] ||= new Element();
  context.syncMasterCheckbox = () => {};
  context.select = i => { context.S.active = i; };
  context.linkedReference = i => context.S.photos.find((p,n) => n !== i && p.linked);
  context.photo = () => context.S.photos[context.S.active];
  context.S = { listMode: 'link', active: 0, photos: [true,true,false].map((linked,i) => ({ linked, file:{name:`${i}.jpg`}, image:{src:'test'}, settings:{color:'black'} })) };
  vm.runInContext(stripSource + '\n' + propagateSource, context);
  const draw = () => { vm.runInContext('strip()',context); return elements['filmstrip-container'].children; };
  let cards = draw();
  check(cards[0].children[1].textContent === i18n.filmstripLabel('editing'), `${locale}: active linked label`);
  check(cards[1].children[1].children[1].textContent === i18n.filmstripLabel('linked'), `${locale}: linked label`);
  check(cards[2].children[1].children[1].textContent === i18n.filmstripLabel('solo'), `${locale}: individual label`);
  context.S.photos[0].linked = false;
  cards = draw();
  check(cards[0].children[1].textContent === i18n.filmstripLabel('editingSolo'), `${locale}: editing individual`);
  check(cards[1].children[1].children[0].indeterminate, `${locale}: paused dash`);
  check(cards[1].children[1].children[0].disabled, `${locale}: paused disabled`);
  vm.runInContext("S.photos[0].settings.color='white';propagateLinked()",context);
  check(context.S.photos[1].settings.color === 'black', `${locale}: individual edits isolated`);
  context.S.listMode = 'delete';
  cards = draw();
  check(cards[0].children[1].children[1].textContent === i18n.filmstripLabel('editing'), `${locale}: active DELETE label`);
  if (locale !== 'ja') check(!/[ぁ-ゖァ-ヺ]/.test(cards[0].children[1].children[1].textContent), `${locale}: no Japanese delete label`);
  check(!cards[0].children[1].children[0].disabled, 'Delete checkbox remains enabled');
  cards[0].children[1].children[0].onchange({ stopPropagation(){}, target:{checked:true} });
  check(context.S.photos[0].deleteSelected, 'Delete selection changes only selection');
  const file = locale === 'ja' ? 'index.html' : `${locale}/index.html`;
  const html = read(file);
  check(html.indexOf('i18n.js?v=48') >= 0 && html.indexOf('i18n.js?v=48') < html.indexOf('main.js?v=47'), 'Translation API loaded before editor');
  check(html.includes('mobile-refinements.css?v=42') && html.includes('portrait-scroll.js?v=41'), 'CSS and scroll script in each locale');
}

// Execute the actual scroll event handlers with a document/window model.
const panel = new Element(), tabs = new Element(), preview = new Element(), body = new Element();
let domReady;
const media = {matches:true, addEventListener(type,fn){this.change=fn;}};
const window = {scrollY:0, scrollBy(x,y){this.scrollY=Math.max(0,Math.min(220,this.scrollY+y));}, scrollTo(a,b){this.scrollY=typeof a==='object'?a.top:b;}, ExifI18n:{filmstripLabel:()=> 'Photos'}};
preview.getBoundingClientRect = () => ({top:Math.max(0,220-window.scrollY)});
const document = {body, addEventListener(type,fn){domReady=fn;}, getElementById:()=>panel, querySelector:q=>q.includes('aspect')?tabs:preview, createElement:()=>new Element()};
const context = {document,window,matchMedia:()=>media};
vm.runInNewContext(read('assets/js/portrait-scroll.js'), context); domReady();
function wheel(delta) {const e={deltaY:delta,deltaX:0,deltaMode:0,preventDefault(){this.prevented=true;}};panel.listeners.wheel(e);return e;}
check(wheel(100).prevented && window.scrollY===100 && panel.scrollTop===0, 'Scroll page before settings');
wheel(150);
check(window.scrollY===220 && panel.scrollTop===30, 'Continue leftover delta into settings');
panel.scrollTop=10; wheel(-40);
check(window.scrollY===190 && panel.scrollTop===0, 'Pull down restores list');
tabs.children[0].onclick();
check(window.scrollY===0, 'Photos button returns to list');
media.matches=false;
check(!wheel(100).prevented && window.scrollY===0, 'Landscape/desktop scroll not intercepted');
media.matches=true;
const touch = y => ({touches:[{clientY:y}],target:{closest:()=>false},cancelable:true,preventDefault(){this.prevented=true;}});
panel.listeners.touchstart(touch(500));
panel.listeners.touchmove(touch(250));
check(window.scrollY===220 && panel.scrollTop===30,'Touch scroll crosses into settings');
panel.listeners.touchmove(touch(200));
check(panel.scrollTop===80,'Same touch gesture continues scrolling settings');
panel.listeners.touchmove(touch(400));
check(panel.scrollTop===0 && window.scrollY===100,'Reverse gesture restores page');
panel.listeners.touchstart({touches:[{clientY:500}],target:{closest:()=>true}});
panel.listeners.touchmove(touch(200));
check(window.scrollY===100,'Sliders and text fields are not intercepted');
body.classList.contains=()=>true;
check(!wheel(100).prevented,'Modal scroll not intercepted');
media.change();check(window.scrollY===0,'Rotation resets outer scroll');
for(const file of ['index.html','en/index.html','ko/index.html','es/index.html','zh-cn/index.html','pt-br/index.html']) {
  for(const [,link] of read(file).matchAll(/(?:href|src)="([^"?#]+)(?:\?[^"#]*)?"/g)) {
    if (/^(https?:|mailto:|data:|#)/.test(link)) continue;
    check(fs.existsSync(path.resolve(root,path.dirname(file),link)), `${file}: missing ${link}`);
  }
}
console.log(`PASS: ${checks} assertions (logic and references; no browser layout verification).`);
