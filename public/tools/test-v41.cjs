const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../assets/js/portrait-scroll.js'),'utf8');
let ready,viewport=600,currentScroll=0,cap=Infinity;
const stripBottom=214,listeners={},tabs={prepend(){}},panel={scrollTop:0,clientHeight:270,addEventListener:(name,fn)=>listeners[name]=fn};
const preview={getBoundingClientRect:()=>({top:Math.max(0,stripBottom-currentScroll)})};
const win={get scrollY(){return currentScroll;},scrollBy(x,y){currentScroll=Math.max(0,Math.min(stripBottom,cap,currentScroll+y));},scrollTo(){currentScroll=0;},ExifI18n:{filmstripLabel:()=> 'Photos'}};
const doc={body:{classList:{contains:()=>false}},addEventListener:(n,fn)=>{ready=fn;},getElementById:()=>panel,querySelector:s=>s.includes('aspect')?tabs:preview,createElement:()=>({setAttribute(){}})};
vm.runInNewContext(source,{document:doc,window:win,matchMedia:()=>({matches:true,addEventListener(){}})});ready();
const wheel=delta=>listeners.wheel({deltaY:delta,deltaX:0,deltaMode:0,preventDefault(){}});
// Browser chrome retracts: an svh-only document would leave 80px of strip.
const oldMaxScroll=stripBottom+viewport-(viewport+80);
assert.equal(stripBottom-oldMaxScroll,80);
viewport+=80;
const newDocumentHeight=stripBottom+.55*viewport+.45*viewport;
assert.equal(newDocumentHeight-viewport,stripBottom);
// During the resize, do not move settings while part of the list is visible.
cap=134;wheel(300);
assert.equal(currentScroll,134);assert.equal(panel.scrollTop,0);
cap=Infinity;wheel(100);
assert.equal(currentScroll,stripBottom);assert.equal(panel.scrollTop,20);
assert.equal(preview.getBoundingClientRect().top,0);
console.log('PASS: viewport growth, temporarily capped scroll, complete strip hiding, then settings handoff. Geometry is modeled; real-device rendering not tested.');
