const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm'), assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'assets/js/i18n.js'),'utf8');
const snippet=source.slice(source.indexOf('  const localizedPath'),source.indexOf("  document.addEventListener('DOMContentLoaded'"));
const codes=['en','ko','es','zh-cn','pt-br'];
function run({pathname='/', languages=['en-US'],saved=null,search='',hash='',blocked=false}={}){
 const redirects=[], writes=[];
 const locale=pathname.split('/').find(x=>codes.includes(x))||'ja';
 const ctx={locale,localeCodes:codes,URLSearchParams,
  navigator:{languages},location:{pathname,search,hash,replace:x=>redirects.push(x)},
  localStorage:{getItem(){if(blocked)throw Error();return saved},setItem(k,v){if(blocked)throw Error();writes.push(v)}}};
 vm.createContext(ctx);vm.runInContext(snippet+'\nautoLanguage();',ctx);
 return {redirects,writes};
}
for(const [browser,code] of [['ja-JP','ja'],['en-GB','en'],['ko-KR','ko'],['es-MX','es'],['zh-CN','zh-cn'],['pt-PT','pt-br'],['de-DE','en']]){
 assert.deepEqual(run({languages:[browser]}).redirects,code==='ja'?[]:[`/${code}/`]);
 assert.deepEqual(run({pathname:'/project/start.html',languages:[browser]}).redirects,code==='ja'?[]:[`/project/${code}/start.html`]);
}
assert.deepEqual(run({languages:['de-DE','ko-KR']}).redirects,['/ko/']);
assert.deepEqual(run({saved:'ja'}).redirects,[]);
assert.deepEqual(run({saved:'ko',languages:['ja']}).redirects,['/ko/']);
assert.deepEqual(run({saved:'invalid',languages:['es']}).redirects,['/es/']);
assert.deepEqual(run({blocked:true,languages:['pt-BR']}).redirects,['/pt-br/']);
assert.deepEqual(run({search:'?lang=ja',blocked:true}).redirects,[]);
assert.deepEqual(run({search:'?lang=ja',saved:'en'}).writes,['ja']);
for(const code of codes) assert.deepEqual(run({pathname:`/${code}/start.html`,saved:'ja',languages:['en']}).redirects,[]);
assert.deepEqual(run({pathname:'/start.html',search:'?source=test',hash:'#photos'}).redirects,['/en/start.html?source=test#photos']);
assert.deepEqual(run({pathname:'/contact.php'}).redirects,[]);
assert.deepEqual(run({pathname:'/404.html'}).redirects,[]);
for(const code of ['',...codes])for(const page of ['index.html','start.html','guide.html']){
 const html=fs.readFileSync(path.join(root,code,page),'utf8');
 assert.ok(html.includes('i18n.js?v=48'));
 assert.ok(html.includes('language-menu.css?v=46'));
}
console.log('PASS: language auto-routing, saved preferences, explicit URLs, storage restrictions, query/hash preservation and six-language resource versions. No browser rendering.');
