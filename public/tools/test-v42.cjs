const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const main = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
const start = main.indexOf("const snapOverlay=$('snap-zone-overlay')");
const end = main.indexOf('\n', main.indexOf('activeZone=snapZones[index]', start));
const classes = () => ({ add() {}, remove() {} });
const overlay = { style: {}, classList: classes(), children: [],
  set innerHTML(value) { this.children = [...value.matchAll(/data-zone=/g)].map(() => ({ classList: classes() })); }
};
const rect = { left: 10, top: 20, width: 300, height: 300 };
const settings = { direction: 'horizontal' };
const context = { $: () => overlay, setting: () => settings,
  photo: () => ({ image: { width: 1200, height: 800 } }), S: { aspect: '1:1' },
  canvas: { getBoundingClientRect: () => rect, parentElement: { getBoundingClientRect: () => rect } }
};
vm.createContext(context);
vm.runInContext(main.slice(start, end) + '\nglobalThis.snap = {showSnapZones, updateSnapZone, active: () => activeZone};', context);
context.snap.showSnapZones();
assert.equal(overlay.children.length, 9);
assert.equal(overlay.style.gridTemplateColumns, 'repeat(3,1fr)');
for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
  context.snap.updateSnapZone({ clientX: 10 + col * 100 + 50, clientY: 20 + row * 100 + 50 });
  assert.equal(context.snap.active().horizontal, ['left', 'center', 'right'][col]);
  assert.equal(context.snap.active().vertical, ['top', 'both', 'bottom'][row]);
}
context.snap.updateSnapZone({ clientX: 310, clientY: 320 });
assert.equal(context.snap.active().horizontal, 'right');
assert.equal(context.snap.active().vertical, 'bottom');
context.snap.updateSnapZone({ clientX: 311, clientY: 320 });
assert.equal(context.snap.active(), null);
settings.direction = 'vertical';
context.snap.showSnapZones();
assert.equal(overlay.children.length, 4);
for (const locale of ['ja', 'en', 'ko', 'es', 'zh-cn', 'pt-br']) {
  const c = { location: { pathname: locale === 'ja' ? '/index.html' : `/${locale}/index.html` }, document: { documentElement: {}, addEventListener() {} }, window: {} };
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/i18n.js'), 'utf8'), c);
  assert.equal(c.window.ExifI18n.translate('フレーム'), { ja: 'フレーム', en: 'Frame', ko: '프레임', es: 'Marco', 'zh-cn': '相框', 'pt-br': 'Moldura' }[locale]);
  const html = fs.readFileSync(path.join(root, locale === 'ja' ? 'index.html' : `${locale}/index.html`), 'utf8');
  assert.ok(html.includes('<span>フレーム</span><select id="portrait-aspect-select"'));
  assert.ok(html.includes('main.js?v=47'));
  assert.ok(html.includes('mobile-refinements.css?v=42'));
}
console.log('PASS: nine distinct snap positions, boundaries, vertical layout, frame labels and resources in six languages. No browser rendering.');
