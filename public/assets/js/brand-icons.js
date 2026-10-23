/* Add, remove or replace presets here. Paths are relative to this JS file.
   Use a local, self-contained PNG, WebP or SVG. See ICON_GUIDE.md. */
(() => {
  const base = document.currentScript.src;
  window.EXIF_BRAND_ICONS = [
    { id: 'red', src: '../images/brand/exif-red.svg', label: {ja:'赤',en:'Red',ko:'빨강',es:'Rojo','zh-cn':'红色','pt-br':'Vermelho'} },
    { id: 'white', src: '../images/brand/exif-white.svg', label: {ja:'白（黒文字）',en:'White (black text)',ko:'흰색 (검정 글자)',es:'Blanco (texto negro)','zh-cn':'白色（黑字）','pt-br':'Branco (texto preto)'} },
    { id: 'black', src: '../images/brand/exif-black.svg', label: {ja:'黒（白文字）',en:'Black (white text)',ko:'검정 (흰색 글자)',es:'Negro (texto blanco)','zh-cn':'黑色（白字）','pt-br':'Preto (texto branco)'} },
    { id: 'blue', src: '../images/brand/exif-blue.svg', label: {ja:'青（白文字）',en:'Blue (white text)',ko:'파랑 (흰색 글자)',es:'Azul (texto blanco)','zh-cn':'蓝色（白字）','pt-br':'Azul (texto branco)'} }
  ].map(item => ({...item, src:new URL(item.src, base).href}));
})();
