// Editorial translations for the shared Japanese introduction layout.
export const startCopy = {
 en: {
  concept: 'Every photo. Every detail.',
  lead: 'Keep the camera, lens and settings behind each shot in a beautifully framed photo. Free to use, right in your browser.',
  steps: ['Choose your photos', 'Make them yours', 'Save'],
  privacy: 'No sign-up needed. Your images and EXIF data are processed in your browser and are not stored on our server.',
  locale: 'en_US', menu: 'Menu', close: 'Close menu', main: 'Main navigation', footer: 'Footer navigation',
  showcase: 'Photos created with ExifFrame', prev: 'Previous sample photo', next: 'Next sample photo', dot: 'Show sample photo {n}', empty: 'Sample photo unavailable',
  photos: ['An aircraft among the clouds, framed with shooting details', 'A child walking down a flower-lined lane, with a vertical photo frame', 'A red postbox in the street, framed with shooting details', 'Green fern leaves, framed with shooting details']
 },
 ko: {
  concept: '한 장의 사진에, 그 순간의 기록을.',
  lead: '카메라와 렌즈, 촬영 설정까지 아름다운 프레임에 담아보세요. 브라우저에서 무료로 사용할 수 있습니다.',
  steps: ['사진 선택', '나만의 프레임 완성', '저장'],
  privacy: '회원가입이 필요 없습니다. 사진과 EXIF 정보는 브라우저에서 처리되며 서버에 저장되지 않습니다.',
  locale: 'ko_KR', menu: '메뉴', close: '메뉴 닫기', main: '주 메뉴', footer: '하단 메뉴',
  showcase: 'ExifFrame으로 만든 사진 예시', prev: '이전 예시 사진', next: '다음 예시 사진', dot: '예시 사진 {n} 보기', empty: '예시 사진을 불러올 수 없습니다',
  photos: ['구름 사이를 나는 비행기와 촬영 정보', '꽃이 핀 골목을 걷는 아이의 세로 프레임 사진', '거리의 빨간 우체통과 촬영 정보', '초록 고사리 잎과 촬영 정보']
 },
 es: {
  concept: 'Cada foto, con su historia.',
  lead: 'Conserva la cámara, el objetivo y los ajustes de cada toma en un marco que realza tu foto. Gratis y desde tu navegador.',
  steps: ['Elige tus fotos', 'Dales tu estilo', 'Guarda'],
  privacy: 'Sin registro. Tus imágenes y datos EXIF se procesan en tu navegador y no se guardan en nuestro servidor.',
  locale: 'es_ES', menu: 'Menú', close: 'Cerrar menú', main: 'Navegación principal', footer: 'Enlaces del pie de página',
  showcase: 'Fotos creadas con ExifFrame', prev: 'Foto de ejemplo anterior', next: 'Siguiente foto de ejemplo', dot: 'Ver foto de ejemplo {n}', empty: 'Foto de ejemplo no disponible',
  photos: ['Un avión entre las nubes con sus datos de captura', 'Una niña en un callejón con flores, en un marco vertical', 'Un buzón rojo en la calle con sus datos de captura', 'Hojas verdes de helecho con sus datos de captura']
 },
 'zh-cn': {
  concept: '让每一张照片，留住拍摄的记忆。',
  lead: '将相机、镜头与拍摄参数融入精美相框，留住每一张照片背后的细节。在浏览器中即可免费使用。',
  steps: ['选择照片', '调整样式', '保存'],
  privacy: '无需注册。照片与 EXIF 信息仅在浏览器中处理，不会保存到我们的服务器。',
  locale: 'zh_CN', menu: '菜单', close: '关闭菜单', main: '主导航', footer: '页脚导航',
  showcase: '使用 ExifFrame 制作的照片示例', prev: '上一张示例照片', next: '下一张示例照片', dot: '查看第 {n} 张示例照片', empty: '示例照片暂时无法显示',
  photos: ['云间飞行的飞机及其拍摄参数', '走在花间小巷中的孩子，配有竖幅相框', '街边的红色邮筒及其拍摄参数', '绿色蕨叶及其拍摄参数']
 },
 'pt-br': {
  concept: 'Cada foto tem uma história.',
  lead: 'Guarde a câmera, a lente e os ajustes de cada clique em uma moldura que valoriza sua foto. Grátis, direto no navegador.',
  steps: ['Escolha suas fotos', 'Dê seu toque', 'Salve'],
  privacy: 'Sem cadastro. Suas imagens e dados EXIF são processados no navegador e não são armazenados em nosso servidor.',
  locale: 'pt_BR', menu: 'Menu', close: 'Fechar menu', main: 'Navegação principal', footer: 'Links do rodapé',
  showcase: 'Fotos criadas com o ExifFrame', prev: 'Foto de exemplo anterior', next: 'Próxima foto de exemplo', dot: 'Ver foto de exemplo {n}', empty: 'Foto de exemplo indisponível',
  photos: ['Um avião entre as nuvens com os dados da captura', 'Uma criança em uma viela florida, com moldura vertical', 'Uma caixa de correio vermelha com os dados da captura', 'Folhas verdes de samambaia com os dados da captura']
 }
};

const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function localizeStart(template, code, language) {
 const t = startCopy[code];
 const pairs = [
  ['撮った一枚に、撮影の記録を。', t.concept],
  ['機種名やレンズ、撮影設定を、美しいフレームとして写真に添える無料のWebツールです。', t.lead],
  ['登録不要。画像とEXIF情報はブラウザ内で処理され、当サイトのサーバーには保存されません。', t.privacy],
  ['写真を選ぶ', t.steps[0]], ['デザインを整える', t.steps[1]], ['保存する', t.steps[2]],
  ['ExifFrame.net 写真編集画面', `ExifFrame.net — ${language.edit}`],
  ['このツールで編集した写真の作例', t.showcase], ['ExifFrameで編集した写真の作例', t.showcase],
  ['前の作例写真を表示', t.prev], ['次の作例写真を表示', t.next], ['作例写真を切り替える', t.showcase],
  ['assets/images/top に作例写真を追加してください', t.empty],
  ['メインメニュー', t.main], ['フッターメニュー', t.footer], ['メニューを開く', t.menu], ['メニューを閉じる', t.close], ['メニュー', t.menu],
  ['初めての方へ', language.nav[0]], ['写真を編集する', language.edit], ['使い方', language.nav[1]],
  ['よくある質問', language.nav[2]], ['このサイトについて', language.nav[3]], ['運営者情報', language.nav[3]],
  ['お問い合わせ', language.nav[4]], ['利用規約', language.nav[5]], ['プライバシーポリシー', language.nav[6]]
 ];
 let html = template.replace('<html lang="ja">', `<html lang="${language.lang}">`);
 for (const [from, to] of pairs) html = html.replaceAll(from, escape(to));
 html = html.replace(/(<meta name="description" content=")[^"]*/, `$1${escape(t.lead)}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(t.lead)}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(t.concept)} | ExifFrame`)
  .replace('content="ja_JP"', `content="${t.locale}"`)
  .replace('rel="canonical" href="https://exifframe.net/start.html"', `rel="canonical" href="https://exifframe.net/${code}/start.html"`)
  .replace('property="og:url" content="https://exifframe.net/start.html"', `property="og:url" content="https://exifframe.net/${code}/start.html"`)
  .replaceAll('href="contact.php"', 'href="contact.html"')
  .replace(/((?:href|src)=")assets\//g, '$1../assets/')
  .replace('id="showcase-dots"', `id="showcase-dots" data-label="${escape(t.dot)}"`)
  .replace('id="showcase-image"', `id="showcase-image" ${t.photos.map((alt, i) => `data-alt${i+1}="${escape(alt)}"`).join(' ')}`)
  .replace('</head>', '<link rel="stylesheet" href="../assets/css/start-locales.css?v=44"></head>');
 return html;
}
