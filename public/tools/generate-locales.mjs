import fs from 'node:fs';
import path from 'node:path';
import { localizeStart } from './start-locales.mjs';

const root = path.resolve(import.meta.dirname, '..');
const locales = {
  en:{lang:'en',name:'English',title:'Add camera settings beautifully to your photos',desc:'A free, registration-free browser photo editor that adds camera, lens and exposure details to your images.',nav:['Getting started','Guide','FAQ','About','Contact','Terms','Privacy'],edit:'Edit photos',privacy:'Your photos and EXIF data are processed in your browser and are not uploaded for editing.'},
  ko:{lang:'ko',name:'한국어',title:'사진에 촬영 정보를 아름답게 담아보세요',desc:'카메라, 렌즈, 촬영 설정을 사진에 더하는 무료·회원가입 불필요 브라우저 편집 도구입니다.',nav:['처음 사용하기','사용법','자주 묻는 질문','사이트 소개','문의','이용약관','개인정보 처리방침'],edit:'사진 편집하기',privacy:'사진과 EXIF 정보는 브라우저 안에서 처리되며 편집을 위해 서버에 업로드되지 않습니다.'},
  es:{lang:'es',name:'Español',title:'Añade los datos de la cámara a tus fotos',desc:'Editor gratuito y sin registro para añadir cámara, objetivo y ajustes de exposición a tus fotos.',nav:['Primeros pasos','Guía','Preguntas frecuentes','Acerca de','Contacto','Términos','Privacidad'],edit:'Editar fotos',privacy:'Tus fotos y datos EXIF se procesan en el navegador y no se suben al servidor para editarlos.'},
  'zh-cn':{lang:'zh-Hans',name:'简体中文',title:'为照片精美添加拍摄信息',desc:'免费、无需注册的浏览器照片编辑工具，可添加相机、镜头和曝光信息。',nav:['入门','使用指南','常见问题','关于本站','联系我们','使用条款','隐私政策'],edit:'编辑照片',privacy:'照片和 EXIF 信息仅在浏览器中处理，不会为了编辑而上传到服务器。'},
  'pt-br':{lang:'pt-BR',name:'Português',title:'Adicione os dados da câmera às suas fotos',desc:'Editor gratuito e sem cadastro para adicionar câmera, lente e configurações de exposição às fotos.',nav:['Primeiros passos','Guia','Perguntas frequentes','Sobre','Contato','Termos','Privacidade'],edit:'Editar fotos',privacy:'Suas fotos e dados EXIF são processados no navegador e não são enviados ao servidor para edição.'}
};
const pages=['index.html','start.html','guide.html','faq.html','about.html','terms.html','privacy.html'];
const urls={ja:'',en:'en/','ko':'ko/','es':'es/','zh-cn':'zh-cn/','pt-br':'pt-br/'};
const hrefLang={ja:'ja',en:'en',ko:'ko',es:'es','zh-cn':'zh-Hans','pt-br':'pt-BR'};
const alternates=page=>Object.entries(urls).map(([code,dir])=>`<link rel="alternate" hreflang="${hrefLang[code]}" href="https://exifframe.net/${dir}${page==='index.html'?'':page}">`).concat(`<link rel="alternate" hreflang="x-default" href="https://exifframe.net/en/${page==='index.html'?'':page}">`).join('');
const csp=`default-src 'self';script-src 'self';style-src 'self';img-src 'self' data: blob:;font-src 'self';connect-src 'none';object-src 'none';base-uri 'none';form-action 'self'`;

function nav(l){let n=l.nav;return `<header class="site-header"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">◎</span><span>ExifFrame.net</span></a><nav class="desktop-nav" aria-label="Navigation"><a href="start.html">${n[0]}</a><a href="guide.html">${n[1]}</a><a href="faq.html">${n[2]}</a><a href="about.html">${n[3]}</a></nav><button id="menu-button" class="menu-button" type="button" aria-label="Menu" aria-expanded="false">☰</button></header>`}
function footer(l){let n=l.nav;return `<footer class="site-footer"><span>© 2026 ExifFrame</span><nav><a href="about.html">${n[3]}</a><a href="contact.html">${n[4]}</a><a href="terms.html">${n[5]}</a><a href="privacy.html">${n[6]}</a></nav></footer><aside id="mobile-menu" class="mobile-menu" aria-hidden="true"><div class="mobile-menu-heading"><strong>Menu</strong><button id="menu-close" type="button" aria-label="Close">×</button></div><a href="index.html">${l.edit}</a><a href="start.html">${n[0]}</a><a href="guide.html">${n[1]}</a><a href="faq.html">${n[2]}</a><a href="about.html">${n[3]}</a><a href="contact.html">${n[4]}</a></aside><button id="menu-backdrop" class="menu-backdrop" type="button" aria-label="Close menu"></button><script src="../assets/js/i18n.js"></script><script src="../assets/js/site-menu.js"></script>`}
function shell(code,page,title,desc,body){let l=locales[code];return `<!doctype html><html lang="${l.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="description" content="${desc}"><meta http-equiv="Content-Security-Policy" content="${csp}"><link rel="canonical" href="https://exifframe.net/${code}/${page}">${alternates(page)}<meta property="og:type" content="website"><meta property="og:site_name" content="ExifFrame"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:url" content="https://exifframe.net/${code}/${page}"><title>${title} | ExifFrame</title><link rel="stylesheet" href="../assets/css/page.css"></head><body><div class="site-shell">${nav(l)}${body}${footer(l)}</div></body></html>`}
function content(code,type){let l=locales[code],n=l.nav;
 const strings={
  en:{start:['Create a photo worth sharing','Add camera and exposure details in three simple steps.','Choose your photos','EXIF data is read automatically when available.','Adjust the design','Choose the frame, typography, placement and icon.','Save or share','Select one, several or all finished photos.'],guide:['How to use ExifFrame','1. Add photos','Use JPEG, PNG or WebP images.','2. Edit','Linked photos share a design. Use “Edit separately” for a photo that needs its own settings.','3. Export','Save selected photos or open your device share sheet.'],faq:['Frequently asked questions','Are my photos uploaded?','No. Editing is performed locally in your browser.','Can I use it on a phone?','Yes. Up to 20 photos can be added at once on mobile.','Why is EXIF missing?','Some social and editing apps remove EXIF. Missing fields can be entered manually.'],about:['About ExifFrame','ExifFrame is a browser-based tool for preserving camera, lens and exposure details as part of a clean photo frame.','What we value','Photo-first design, simple mobile controls, local processing and no required registration.'],terms:['Terms of use','Use only photos, text and icons you have the right to use. You are responsible for saving, publishing and sharing exported images. Do not use the service unlawfully, infringe third-party rights or disrupt its operation. The service may change or stop for maintenance or other operational needs.'],privacy:['Privacy policy',l.privacy,'Contact data','Information submitted through the contact form is used to answer your request, prevent abuse and maintain support records.','Cookies and advertising','Cookies may be used for analytics, service improvement and advertising. You can control personalized ads through the provider’s settings.']},
  ko:{start:['공유하고 싶은 사진을 만들어 보세요','세 단계로 촬영 정보를 아름답게 더할 수 있습니다.','사진 선택','가능한 경우 EXIF 정보를 자동으로 읽습니다.','디자인 조정','프레임, 글꼴, 배치와 아이콘을 설정합니다.','저장 또는 공유','완성된 사진을 한 장, 여러 장 또는 모두 선택합니다.'],guide:['ExifFrame 사용법','1. 사진 추가','JPEG, PNG, WebP 이미지를 사용할 수 있습니다.','2. 편집','연동 사진은 디자인을 공유합니다. 별도 조정이 필요하면 “개별 설정”을 선택하세요.','3. 내보내기','선택한 사진을 저장하거나 기기의 공유 화면을 엽니다.'],faq:['자주 묻는 질문','사진이 업로드되나요?','아니요. 편집은 브라우저 안에서 처리됩니다.','스마트폰에서도 사용할 수 있나요?','네. 모바일에서는 한 번에 최대 20장까지 추가할 수 있습니다.','EXIF가 없는 이유는 무엇인가요?','일부 SNS와 편집 앱은 EXIF를 삭제합니다. 없는 항목은 직접 입력할 수 있습니다.'],about:['ExifFrame 소개','카메라, 렌즈, 노출 정보를 깔끔한 프레임으로 사진에 남기는 브라우저 기반 도구입니다.','중요하게 생각하는 것','사진 중심 디자인, 쉬운 모바일 조작, 로컬 처리, 회원가입 없는 사용.'],terms:['이용약관','사용 권한이 있는 사진, 텍스트, 아이콘만 사용해 주세요. 결과 이미지의 저장, 공개, 공유는 이용자의 책임입니다. 불법 이용, 제3자 권리 침해, 서비스 방해를 금지합니다. 서비스는 유지보수 등의 사유로 변경되거나 중단될 수 있습니다.'],privacy:['개인정보 처리방침',l.privacy,'문의 정보','문의 양식으로 받은 정보는 답변, 부정 이용 방지, 지원 이력 관리에 사용합니다.','쿠키 및 광고','분석, 서비스 개선, 광고를 위해 쿠키를 사용할 수 있습니다. 광고 제공자의 설정에서 맞춤 광고를 관리할 수 있습니다.']},
  es:{start:['Crea una foto lista para compartir','Añade los datos de la toma en tres pasos sencillos.','Elige tus fotos','Los datos EXIF se leen automáticamente cuando están disponibles.','Ajusta el diseño','Configura marco, tipografía, posición e icono.','Guarda o comparte','Selecciona una, varias o todas las fotos terminadas.'],guide:['Cómo usar ExifFrame','1. Añade fotos','Puedes usar imágenes JPEG, PNG o WebP.','2. Edita','Las fotos vinculadas comparten diseño. Usa “Editar por separado” cuando una foto necesite sus propios ajustes.','3. Exporta','Guarda las fotos seleccionadas o abre el menú de compartir del dispositivo.'],faq:['Preguntas frecuentes','¿Se suben mis fotos?','No. La edición se realiza localmente en el navegador.','¿Funciona en el móvil?','Sí. En móvil puedes añadir hasta 20 fotos a la vez.','¿Por qué faltan datos EXIF?','Algunas redes y aplicaciones eliminan EXIF. Puedes completar los campos manualmente.'],about:['Acerca de ExifFrame','Una herramienta de navegador para conservar la cámara, el objetivo y la exposición en un marco limpio.','Nuestros principios','La foto como protagonista, controles móviles sencillos, procesamiento local y sin registro obligatorio.'],terms:['Términos de uso','Usa solo fotos, textos e iconos cuyos derechos poseas. Eres responsable de guardar, publicar y compartir las imágenes. No uses el servicio de forma ilegal, para vulnerar derechos ni para interferir con su funcionamiento. El servicio puede cambiar o detenerse por mantenimiento.'],privacy:['Política de privacidad',l.privacy,'Datos de contacto','Los datos del formulario se usan para responder, prevenir abusos y conservar el historial de soporte.','Cookies y publicidad','Podemos usar cookies para análisis, mejora del servicio y publicidad. Puedes controlar la publicidad personalizada en los ajustes del proveedor.']},
  'zh-cn':{start:['制作值得分享的照片','只需三步即可添加拍摄信息。','选择照片','如照片包含 EXIF，将自动读取。','调整设计','设置相框、字体、位置和图标。','保存或分享','可选择一张、多张或全部成品照片。'],guide:['ExifFrame 使用方法','1. 添加照片','支持 JPEG、PNG 和 WebP。','2. 编辑','联动照片共用设计。需要单独调整时，请选择“单独设置”。','3. 导出','保存所选照片或打开设备分享菜单。'],faq:['常见问题','照片会上传吗？','不会。编辑完全在浏览器本地完成。','手机可以使用吗？','可以。移动端一次最多添加 20 张照片。','为什么没有 EXIF？','部分社交或编辑应用会删除 EXIF，缺失内容可以手动填写。'],about:['关于 ExifFrame','一款在浏览器中为照片保留相机、镜头和曝光信息的工具。','我们的原则','突出照片、移动端易用、本地处理、无需注册。'],terms:['使用条款','只能使用您有权使用的照片、文字和图标。导出图片的保存、发布和分享由用户负责。禁止违法使用、侵犯第三方权利或干扰服务运行。服务可能因维护等原因调整或停止。'],privacy:['隐私政策',l.privacy,'联系信息','联系表单中的信息用于回复、预防滥用和保留支持记录。','Cookie 与广告','我们可能使用 Cookie 进行分析、服务改进和广告投放。您可以在广告服务商设置中管理个性化广告。']},
  'pt-br':{start:['Crie uma foto pronta para compartilhar','Adicione os dados da captura em três etapas simples.','Escolha suas fotos','Os dados EXIF são lidos automaticamente quando disponíveis.','Ajuste o design','Configure moldura, tipografia, posição e ícone.','Salve ou compartilhe','Selecione uma, várias ou todas as fotos finalizadas.'],guide:['Como usar o ExifFrame','1. Adicione fotos','Use imagens JPEG, PNG ou WebP.','2. Edite','Fotos vinculadas compartilham o design. Use “Editar separadamente” quando uma foto precisar de ajustes próprios.','3. Exporte','Salve as fotos selecionadas ou abra o menu de compartilhamento do aparelho.'],faq:['Perguntas frequentes','Minhas fotos são enviadas?','Não. A edição acontece localmente no navegador.','Funciona no celular?','Sim. No celular, é possível adicionar até 20 fotos por vez.','Por que faltam dados EXIF?','Algumas redes e aplicativos removem EXIF. Os campos ausentes podem ser preenchidos manualmente.'],about:['Sobre o ExifFrame','Uma ferramenta no navegador para preservar câmera, lente e exposição em uma moldura limpa.','O que valorizamos','Foto em primeiro lugar, controles simples no celular, processamento local e uso sem cadastro.'],terms:['Termos de uso','Use apenas fotos, textos e ícones que você tem direito de utilizar. Você é responsável por salvar, publicar e compartilhar as imagens exportadas. Não use o serviço ilegalmente, para violar direitos ou prejudicar seu funcionamento. O serviço pode mudar ou parar para manutenção.'],privacy:['Política de privacidade',l.privacy,'Dados de contato','As informações do formulário são usadas para responder, prevenir abuso e manter o histórico de suporte.','Cookies e publicidade','Podemos usar cookies para análise, melhoria do serviço e publicidade. Você pode controlar anúncios personalizados nas configurações do provedor.']}
 }[code][type];
 if(type==='start')return `<main class="page-main"><header class="page-head"><p class="eyebrow">EXIF PHOTO FRAME</p><h1>${strings[0]}</h1><p>${strings[1]}</p></header><section class="content-card"><h2>${strings[2]}</h2><p>${strings[3]}</p><h2>${strings[4]}</h2><p>${strings[5]}</p><h2>${strings[6]}</h2><p>${strings[7]}</p><div class="notice">${l.privacy}</div><a class="primary-link" href="index.html">${l.edit}</a></section></main>`;
 if(type==='faq')return `<main class="page-main"><header class="page-head"><p class="eyebrow">FAQ</p><h1>${strings[0]}</h1></header><section class="content-card">${[[1,2],[3,4],[5,6]].map(x=>`<article class="faq-item"><h2>${strings[x[0]]}</h2><p>${strings[x[1]]}</p></article>`).join('')}</section></main>`;
 if(type==='privacy')return `<main class="page-main"><header class="page-head"><p class="eyebrow">PRIVACY</p><h1>${strings[0]}</h1></header><section class="content-card"><h2>${strings[0]}</h2><p>${strings[1]}</p><h3>${strings[2]}</h3><p>${strings[3]}</p><h3>${strings[4]}</h3><p>${strings[5]}</p></section></main>`;
 if(type==='terms')return `<main class="page-main"><header class="page-head"><p class="eyebrow">TERMS</p><h1>${strings[0]}</h1></header><section class="content-card"><p>${strings[1]}</p></section></main>`;
 if(type==='about')return `<main class="page-main"><header class="page-head"><p class="eyebrow">ABOUT</p><h1>${strings[0]}</h1><p>${strings[1]}</p></header><section class="content-card"><h2>${strings[2]}</h2><p>${strings[3]}</p><div class="notice">${l.privacy}</div><a class="primary-link" href="index.html">${l.edit}</a></section></main>`;
 return `<main class="page-main"><header class="page-head"><p class="eyebrow">${type.toUpperCase()}</p><h1>${strings[0]}</h1></header><section class="content-card"><h2>${strings[1]}</h2><p>${strings[2]}</p><h3>${strings[3]}</h3><p>${strings[4]}</p><h3>${strings[5]}</h3><p>${strings[6]}</p><div class="notice">${l.privacy}</div><a class="primary-link" href="index.html">${l.edit}</a></section></main>`;
}

let editor=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<link rel="alternate"[^>]*>/g,'');
for(const [code,l] of Object.entries(locales)){
 fs.mkdirSync(path.join(root,code),{recursive:true});
 let localized=editor.replace('<html lang="ja">',`<html lang="${l.lang}">`).replace(/(?:href|src)="assets\//g,m=>m.replace('assets/','../assets/')).replace(/href="contact\.php"/g,'href="contact.html"').replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${l.desc}">`).replace(/<link rel="canonical"[^>]*>/,`<link rel="canonical" href="https://exifframe.net/${code}/">${alternates('index.html')}`).replace(/<title>[^<]*<\/title>/,`<title>${l.title} | ExifFrame</title>`).replace('<script src="../assets/js/main.js"></script>','<script src="../assets/js/i18n.js"></script><script src="../assets/js/main.js"></script>');
 fs.writeFileSync(path.join(root,code,'index.html'),localized);
 for(const type of ['start','guide','faq','about','terms','privacy']){
  let page=`${type}.html`,title=type==='start'?l.nav[0]:l.nav[{guide:1,faq:2,about:3,terms:5,privacy:6}[type]];
  fs.writeFileSync(path.join(root,code,page),type==='start'
   ? localizeStart(fs.readFileSync(path.join(root,'start.html'),'utf8'),code,l)
   : shell(code,page,title,`${title} - ExifFrame`,content(code,type)));
 }
 fs.writeFileSync(path.join(root,code,'contact.html'),shell(code,'contact.html',l.nav[4],`${l.nav[4]} - ExifFrame`,`<main class="page-main"><header class="page-head"><p class="eyebrow">CONTACT</p><h1>${l.nav[4]}</h1></header><section class="content-card"><p>${l.privacy}</p><p><a class="primary-link" href="mailto:info@exifframe.net">info@exifframe.net</a></p></section></main>`));
}

for(const page of pages){let file=path.join(root,page);if(!fs.existsSync(file))continue;let html=fs.readFileSync(file,'utf8');if(!html.includes('hreflang=')){html=html.replace(/(<link rel="canonical"[^>]*>)/,`$1${alternates(page)}`);if(!html.includes('rel="canonical"'))html=html.replace('</head>',`<link rel="canonical" href="https://exifframe.net/${page==='index.html'?'':page}">${alternates(page)}</head>`)}if(!html.includes('assets/js/i18n.js'))html=html.replace('</body>','<script src="assets/js/i18n.js"></script></body>');fs.writeFileSync(file,html)}

const groups=[...pages,'contact.html'];
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${groups.flatMap(page=>Object.entries(urls).map(([code,dir])=>`<url><loc>https://exifframe.net/${dir}${page==='index.html'?'':page}</loc>${Object.entries(urls).map(([alt,altDir])=>`<xhtml:link rel="alternate" hreflang="${hrefLang[alt]}" href="https://exifframe.net/${altDir}${page==='index.html'?'':page}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="https://exifframe.net/en/${page==='index.html'?'':page}"/></url>`)).join('')}</urlset>`;
fs.writeFileSync(path.join(root,'sitemap.xml'),sitemap);

// Keep the shared language control styles and cache version in generated pages.
for (const dir of ['', ...Object.keys(locales)]) {
 for (const name of fs.readdirSync(path.join(root,dir))) {
  if (!name.endsWith('.html')) continue;
  const file=path.join(root,dir,name);
  let html=fs.readFileSync(file,'utf8');
  if (!html.includes('assets/js/i18n.js')) continue;
  html=html.replace(/assets\/js\/i18n\.js(?:\?v=\d+)?/g,'assets/js/i18n.js?v=48');
  if (!html.includes('assets/css/language-menu.css')) html=html.replace('</head>',`<link rel="stylesheet" href="${dir?'../':''}assets/css/language-menu.css?v=46"></head>`);
  html=html.replace(/assets\/css\/language-menu\.css(?:\?v=\d+)?/g,'assets/css/language-menu.css?v=46');
  fs.writeFileSync(file,html);
 }
}

// Use one color palette for informational pages; do not alter editor geometry.
for (const dir of ['', ...Object.keys(locales)]) {
 for (const name of fs.readdirSync(path.join(root, dir))) {
  if (!/\.(html|php)$/.test(name)) continue;
  const file = path.join(root, dir, name);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replaceAll('<span>ExifFrame</span>', '<span>ExifFrame.net</span>')
    .replaceAll('<strong>ExifFrame</strong>', '<strong>ExifFrame.net</strong>')
    .replaceAll('aria-label="ExifFrame 写真編集画面"', 'aria-label="ExifFrame.net 写真編集画面"');
  if (/assets\/css\/(page|top)\.css/.test(html) && !html.includes('assets/css/site-colors.css'))
    html = html.replace('</head>', `<link rel="stylesheet" href="${dir?'../':''}assets/css/site-colors.css?v=43"></head>`);
  fs.writeFileSync(file, html);
 }
}

// Shared site logo: keep the editor title size and information-page logo slot.
for (const dir of ['', ...Object.keys(locales)]) {
 for (const name of fs.readdirSync(path.join(root,dir))) {
  if (!/\.(html|php)$/.test(name)) continue;
  const file=path.join(root,dir,name), prefix=dir?'../':'';
  let html=fs.readFileSync(file,'utf8');
  if (!html.includes('class="brand"') && !html.includes('class="app-title"')) continue;
  const logo=`<img class="site-brand-icon" src="${prefix}assets/images/brand/site-icon.svg" alt="" width="28" height="28">`;
  html=html.replace(/<span class="brand-mark"[^>]*>◎<\/span>/g,logo);
  if (!html.includes('class="site-brand-icon"')) html=html.replace('<strong>ExifFrame.net</strong>',`${logo}<strong>ExifFrame.net</strong>`);
  if (!html.includes('assets/css/brand.css')) html=html.replace('</head>',`<link rel="stylesheet" href="${prefix}assets/css/brand.css?v=47"></head>`);
  fs.writeFileSync(file,html);
 }
}

// Favicons share the exact site logo artwork. Include every locale and the PHP form.
for (const dir of ['', ...Object.keys(locales)]) {
 for (const name of fs.readdirSync(path.join(root,dir))) {
  if (!/\.(html|php)$/.test(name)) continue;
  const file=path.join(root,dir,name), prefix=dir?'../':'';
  let html=fs.readFileSync(file,'utf8');
  if (!html.includes('</head>')) continue;
  if (!html.includes('rel="icon"')) html=html.replace('</head>',`<link rel="icon" type="image/png" sizes="32x32" href="${prefix}assets/images/brand/favicon-32.png?v=48"><link rel="icon" type="image/png" sizes="192x192" href="${prefix}assets/images/brand/favicon-192.png?v=48"><link rel="apple-touch-icon" sizes="180x180" href="${prefix}assets/images/brand/favicon-180.png?v=48"></head>`);
  fs.writeFileSync(file,html);
 }
}

// Refresh changed shared assets even when rebuilding pages already generated.
for (const dir of ['', ...Object.keys(locales)]) {
 for (const name of fs.readdirSync(path.join(root,dir))) {
  if (!/\.(html|php)$/.test(name)) continue;
  const file=path.join(root,dir,name);
  let html=fs.readFileSync(file,'utf8')
   .replace(/assets\/js\/i18n\.js(?:\?v=\d+)?/g,'assets/js/i18n.js?v=48')
   .replace(/assets\/css\/top\.css(?:\?v=\d+)?/g,'assets/css/top.css?v=48')
   .replace(/type="image\/svg\+xml" href="([^"]*)site-icon\.svg\?v=48"/g,'type="image/png" sizes="192x192" href="$1favicon-192.png?v=48"');
  if(name==='404.html') html=html.replace(/href="assets\//g,'href="/assets/').replace('href="index.html"','href="/"');
  fs.writeFileSync(file,html);
 }
}
