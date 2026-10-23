const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/i18n.js'), 'utf8');
const snippet = source.slice(source.indexOf('  const readPreference'), source.indexOf('  const autoLanguage'));
class Element {
  constructor(){this.children=[];this.attributes={};}
  addEventListener(){}
  contains(){return false;}
  append(...children){this.children.push(...children);}
  setAttribute(k,v){this.attributes[k]=v;}
  querySelector(){return this.children.find(e=>e.className?.split(' ').includes('language-picker'));}
}
let cases=0;
for (const pageType of ['editor','intro']) for (const locale of ['ja','en','ko','es','zh-cn','pt-br']) for (const blocked of [false,true]) {
  const host=new Element(), desktop=new Element(), saved=[];
  const context={locale, URLSearchParams, location:{search:'',hash:''}, localizedPath:code=>`/project/${code}/`,localStorage:{getItem(){if(blocked)throw Error('blocked');return 'en';},setItem(k,v){if(blocked)throw Error('blocked');saved.push(v);}},document:{addEventListener(){},querySelector:selector=>selector==='.site-header'?(pageType==='intro'?desktop:null):selector==='.hamburger-menu-drawer'?(pageType==='editor'?host:null):selector==='.mobile-menu'?(pageType==='intro'?host:null):null,createElement:()=>new Element()}};
  vm.createContext(context);vm.runInContext(snippet+'\naddLanguageMenu();addLanguageMenu();',context);
  assert.equal(host.children.length,1,'No duplicated language control');
  assert.equal(desktop.children.length,pageType==='intro'?1:0,'Desktop language control only on informational pages');
  if(pageType==='intro')assert.notEqual(host.children[0].children[1].id,desktop.children[0].children[1].id);
  const [button,list]=host.children[0].children;
  assert.equal(button.textContent,'Language');assert.equal(list.hidden,true);
  button.onclick();assert.equal(list.hidden,false);assert.equal(button.attributes['aria-expanded'],'true');
  assert.deepEqual(Array.from(list.children,x=>x.textContent),['日本語','English','한국어','Español','简体中文','Português (Brasil)']);
  assert.equal(list.children.filter(x=>x.attributes['aria-current']==='true').length,1);
  for(const link of list.children){assert.ok(link.href.startsWith('/project/'));assert.doesNotThrow(()=>link.onclick());}
  assert.equal(saved.length,blocked?0:6);
  button.onclick();assert.equal(list.hidden,true);assert.equal(button.attributes['aria-expanded'],'false');
  cases++;
}
console.log(`PASS: ${cases} menu scenarios (six languages, storage available/blocked).`);
