(() => {
  const words = {
    ja:['アイコンを選択','自分の画像を追加','閉じる','読み込み中…','アイコンを読み込めませんでした。'],
    en:['Choose an icon','Upload your image','Close','Loading…','Could not load the icon.'],
    ko:['아이콘 선택','내 이미지 추가','닫기','불러오는 중…','아이콘을 불러오지 못했습니다.'],
    es:['Elige un icono','Añadir tu imagen','Cerrar','Cargando…','No se pudo cargar el icono.'],
    'zh-cn':['选择图标','添加自己的图片','关闭','正在加载…','无法加载图标。'],
    'pt-br':['Escolha um ícone','Adicionar sua imagem','Fechar','Carregando…','Não foi possível carregar o ícone.']
  };
  window.ExifIconPicker = {
    open(onSelect, onUpload) {
      const locale=window.ExifI18n?.locale||'ja', t=words[locale]||words.en;
      const dialog=document.createElement('dialog'); dialog.className='brand-icon-dialog';
      const heading=document.createElement('h2'); heading.id='brand-icon-heading'; heading.textContent=t[0];
      dialog.setAttribute('aria-labelledby',heading.id);
      const grid=document.createElement('div'); grid.className='brand-icon-grid';
      const status=document.createElement('p'); status.className='brand-icon-status'; status.setAttribute('role','status');
      let closed=false, generation=0;
      dialog.addEventListener('close',()=>{closed=true;generation++;dialog.remove()});
      for(const item of window.EXIF_BRAND_ICONS||[]) {
        const button=document.createElement('button'); button.type='button'; button.className='brand-icon-choice';
        const preview=document.createElement('img'); preview.src=item.src; preview.alt='';
        const label=document.createElement('span'); label.textContent=item.label[locale]||item.label.en||item.id;
        button.append(preview,label);
        button.onclick=()=>{
          const request=++generation; status.textContent=t[3];
          const image=new Image();
          image.onload=()=>{
            if(closed||request!==generation)return;
            onSelect(image,`ExifFrame.net — ${label.textContent}`); dialog.close();
          };
          image.onerror=()=>{if(!closed&&request===generation)status.textContent=t[4]};
          image.src=item.src;
        };
        grid.append(button);
      }
      const upload=document.createElement('button'); upload.type='button';upload.className='brand-icon-upload';upload.textContent=t[1];
      upload.onclick=()=>{dialog.close();onUpload()};
      const close=document.createElement('button');close.type='button';close.className='brand-icon-close';close.textContent=t[2];close.onclick=()=>dialog.close();
      dialog.append(heading,grid,status,upload,close);document.body.append(dialog);dialog.showModal();
    }
  };
})();
