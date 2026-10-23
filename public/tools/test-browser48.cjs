// Requires Playwright and a Chromium executable at CHROMIUM_PATH.
// Uses local static HTTP with the production CSP. Apache/PHP are tested separately.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const csp=fs.readFileSync(root+'/.htaccess','utf8').match(/Header always set Content-Security-Policy "([^"]+)"/)[1];
const server=http.createServer((req,res)=>{
 const uri=decodeURIComponent(new URL(req.url,'http://local').pathname);let file=path.resolve(root,'.'+uri);
 if(!file.startsWith(root+'/')&&file!==root){res.writeHead(403).end();return}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file+='/index.html';
 if(!fs.existsSync(file)){res.writeHead(404).end();return}
 const type={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'}[path.extname(file)];
 if(!type){res.writeHead(403).end();return}
 res.writeHead(200,{'Content-Type':type,'Content-Security-Policy':csp});res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'],headless:true});
 const errors=[];let checks=0;
 try{
  for(const lang of ['ja','en','ko','es','zh-cn','pt-br']){
   const context=await browser.newContext({locale:'ja-JP',viewport:{width:1280,height:900}}),page=await context.newPage(),prefix=lang==='ja'?'':lang+'/';
   page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
   await page.goto(`${base}/${prefix}start.html?lang=${lang}`);await page.locator('#showcase-image.loaded').waitFor();
   assert.equal(await page.locator('.site-header .language-trigger:visible').count(),1);
   const first=await page.locator('#showcase-image').getAttribute('src');await page.locator('#showcase-next').click();assert.notEqual(await page.locator('#showcase-image').getAttribute('src'),first);await page.locator('#showcase-prev').click();assert.equal(await page.locator('#showcase-image').getAttribute('src'),first);
   for(const width of [320,390,768,1280]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${lang} intro overflows ${width}`);checks++}
   await page.setViewportSize({width:1280,height:900});await page.goto(`${base}/${prefix}?lang=${lang}`);
   await page.locator('#multiple-photo-input').setInputFiles([root+'/assets/images/top/photo_01.jpg',root+'/assets/images/top/photo_02.jpg']);await page.waitForFunction(()=>document.querySelectorAll('.thumbnail-item').length===2);
   assert.equal(await page.locator('.header-actions .language-trigger').count(),0);
   for(let i=0;i<4;i++){await page.locator(i===0?'#icon-add-button':'#icon-change-button').click();await page.locator('.brand-icon-choice').nth(i).click();await page.locator('.brand-icon-dialog').waitFor({state:'detached'});assert.ok((await page.locator('#main-frame-canvas').evaluate(c=>c.toDataURL('image/jpeg'))).length>10000);checks++}
   await context.close();
  }
  const mobile=await browser.newContext({locale:'en-US',viewport:{width:390,height:844},isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36'}),m=await mobile.newPage();
  m.on('pageerror',e=>errors.push(e.message));await m.goto(base+'/en/');
  await m.locator('#multiple-photo-input').setInputFiles([root+'/assets/images/top/photo_01.jpg',root+'/assets/images/top/photo_02.jpg']);await m.waitForFunction(()=>document.querySelectorAll('.thumbnail-item').length===2);
  await m.evaluate(()=>window.scrollTo(0,10000));const before=await m.locator('.main-preview-section').boundingBox();assert.ok(Math.abs(before.y)<2,JSON.stringify(before));
  await m.locator('.control-panel-section').evaluate(e=>e.scrollTop=10000);const after=await m.locator('.main-preview-section').boundingBox();assert.ok(Math.abs(before.y-after.y)<1);
  const strip=await m.locator('.filmstrip-footer-section').boundingBox();assert.ok(strip.y+strip.height<=2);
  await m.locator('#preview-save-button').click();const download=m.waitForEvent('download');await m.locator('#media-selection-submit').click();assert.ok((await download).suggestedFilename().endsWith('.jpg'));checks+=4;await mobile.close();
  const korean=await browser.newContext({locale:'ko-KR'}),k=await korean.newPage();await k.goto(base+'/start.html');await k.waitForURL('**/ko/start.html');checks++;await korean.close();
  assert.deepEqual(errors,[]);console.log(`PASS: ${checks} Chromium checks; six languages, responsive widths, production CSP, imports, SVG canvas exports, mobile scroll/save, auto language.`);
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
