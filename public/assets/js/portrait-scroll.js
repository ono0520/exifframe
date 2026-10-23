document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('control-panel-section');
  const preview = document.querySelector('.main-preview-section');
  if (!panel || !preview) return;
  const portrait = matchMedia('(max-width: 800px) and (orientation: portrait)');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'show-photos-button';
  button.textContent = window.ExifI18n.filmstripLabel('photos');
  button.setAttribute('aria-controls', 'filmstrip-container');
  button.onclick = () => window.scrollTo({ top: 0, behavior: 'auto' });
  document.querySelector('.aspect-tab-group').prepend(button);

  // Keep resizing outside the settings scroll surface and canvas gestures.
  const divider = document.createElement('div');
  divider.className = 'portrait-panel-resizer';
  divider.tabIndex = 0;
  divider.setAttribute('role', 'separator');
  divider.setAttribute('aria-orientation', 'horizontal');
  divider.setAttribute('aria-controls', panel.id);
  const labels = {
    ja: '上下にドラッグしてプレビューと詳細設定の高さを調整',
    en: 'Drag up or down to resize preview and settings',
    es: 'Arrastra arriba o abajo para ajustar la vista previa y los ajustes',
    ko: '위아래로 드래그하여 미리보기와 설정 높이 조절',
    'zh-cn': '上下拖动以调整预览和设置区域的高度',
    'pt-br': 'Arraste para cima ou para baixo para ajustar a prévia e as configurações'
  };
  const lang = document.documentElement.lang.toLowerCase();
  const label = labels[lang] || (lang.startsWith('zh') ? labels['zh-cn'] : labels.en);
  divider.setAttribute('aria-label', label);
  divider.title = label;
  preview.append(divider);
  let drag = null;
  let share = 0.55;
  let resizeFrame = 0;
  const bounds = () => {
    const total = preview.getBoundingClientRect().height + panel.getBoundingClientRect().height;
    // Leave room for the toolbar, handle and photo, and a usable settings area.
    return { total, min: Math.max(0.30, Math.min(0.5, 176 / total)),
      max: Math.min(0.75, Math.max(0.5, 1 - 160 / total)) };
  };
  const applyShare = value => {
    if (!portrait.matches) return;
    const { total, min, max } = bounds();
    if (!total) return;
    share = Math.max(min, Math.min(max, value));
    document.documentElement.style.setProperty('--portrait-preview-height',
      `calc(var(--portrait-screen-height) * ${share})`);
    divider.setAttribute('aria-valuemin', Math.round(min * 100));
    divider.setAttribute('aria-valuemax', Math.round(max * 100));
    divider.setAttribute('aria-valuenow', Math.round(share * 100));
  };
  const endResize = () => {
    if (!drag) return;
    const id = drag.id;
    drag = null;
    divider.classList.remove('is-resizing');
    if (divider.hasPointerCapture(id)) divider.releasePointerCapture(id);
  };
  divider.addEventListener('pointerdown', event => {
    if (!portrait.matches || !event.isPrimary || event.button !== 0 ||
        document.body.classList.contains('modal-open')) return;
    event.preventDefault();
    drag = { id: event.pointerId, y: event.clientY, share, total: bounds().total };
    divider.setPointerCapture(event.pointerId);
    divider.classList.add('is-resizing');
  });
  divider.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    event.preventDefault();
    applyShare(drag.share + (event.clientY - drag.y) / drag.total);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    divider.addEventListener(type, event => { if (drag?.id === event.pointerId) endResize(); });
  }
  divider.addEventListener('keydown', event => {
    if (!portrait.matches) return;
    const { min, max } = bounds();
    const next = { ArrowUp: share - 0.03, ArrowDown: share + 0.03, Home: min, End: max }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    applyShare(next);
  });
  const refreshSize = () => {
    endResize();
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => applyShare(share));
  };
  window.addEventListener('resize', refreshSize);
  window.visualViewport?.addEventListener('resize', refreshSize);
  portrait.addEventListener('change', refreshSize);
  applyShare(share);

  // One continuous gesture: first reveal the editor by scrolling the page,
  // then scroll only its settings. Pull down at the panel top to return.
  const routeScroll = delta => {
    if (!portrait.matches || document.body.classList.contains('modal-open')) return false;
    const offset = Math.max(0, preview.getBoundingClientRect().top);
    if (delta > 0 && offset > 0.5) {
      const outer = Math.min(delta, offset);
      const before = window.scrollY;
      window.scrollBy(0, outer);
      // Only hand off the unused delta once the entire photo strip is hidden.
      // A browser viewport resize may temporarily limit document scrolling.
      const consumed = Math.max(0, window.scrollY - before);
      if (preview.getBoundingClientRect().top <= 0.5) panel.scrollTop += Math.max(0, delta - consumed);
      return true;
    }
    if (delta < 0 && window.scrollY > 0 && panel.scrollTop < -delta) {
      const remainder = delta + panel.scrollTop;
      panel.scrollTop = 0;
      window.scrollBy(0, remainder);
      return true;
    }
    return false;
  };
  panel.addEventListener('wheel', event => {
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? panel.clientHeight : 1);
    if (routeScroll(delta)) event.preventDefault();
  }, { passive: false });
  let lastY = null;
  panel.addEventListener('touchstart', event => {
    lastY = event.touches.length === 1 && !event.target.closest('input,select,textarea')
      ? event.touches[0].clientY : null;
  }, { passive: true });
  panel.addEventListener('touchmove', event => {
    if (lastY === null || event.touches.length !== 1) return;
    const nextY = event.touches[0].clientY;
    const delta = lastY - nextY;
    lastY = nextY;
    if (!portrait.matches || document.body.classList.contains('modal-open') || !event.cancelable) return;
    // Keep the whole gesture in one scroll path; switching back to native
    // touch scrolling after preventDefault can otherwise stall on iOS.
    event.preventDefault();
    if (!routeScroll(delta)) panel.scrollTop += delta;
  }, { passive: false });
  for (const type of ['touchend', 'touchcancel']) panel.addEventListener(type, () => { lastY = null; });
  portrait.addEventListener('change', () => { lastY = null; window.scrollTo(0, 0); });
});
