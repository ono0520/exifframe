// Resolve shared photo paths from this script, including localized subdirectories.
const topPhotoBase=new URL('../../',document.currentScript.src);
document.addEventListener('DOMContentLoaded',()=>{
    const photos=Array.isArray(window.TOP_PAGE_PHOTOS)?window.TOP_PAGE_PHOTOS.filter(x=>x&&x.src):[];
    const image=document.getElementById('showcase-image'),placeholder=document.getElementById('showcase-placeholder'),card=document.getElementById('showcase-card'),stack=card?.closest('.photo-stack'),dots=document.getElementById('showcase-dots'),prev=document.getElementById('showcase-prev'),next=document.getElementById('showcase-next');
    const configuredInterval=Number(window.TOP_PAGE_PHOTO_INTERVAL),interval=Number.isFinite(configuredInterval)&&configuredInterval>=3000?configuredInterval:6000,reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer=null;
    let active=photos.length?Math.floor(Math.random()*photos.length):0;
    const show=index=>{if(!photos.length)return;active=(index+photos.length)%photos.length;const item=photos[active];image.classList.remove('loaded');image.onload=()=>{const ratio=image.naturalWidth/image.naturalHeight;card.classList.remove('landscape','portrait','square');card.classList.add(ratio>1.1?'landscape':ratio<.9?'portrait':'square');card.style.setProperty('--sample-aspect',`${image.naturalWidth}/${image.naturalHeight}`);placeholder.classList.add('hidden');image.classList.add('loaded')};image.onerror=()=>{image.classList.remove('loaded');placeholder.classList.remove('hidden')};image.src=new URL(item.src,topPhotoBase).href;image.alt=image.dataset[`alt${active+1}`]||item.alt||'ExifFrameで編集した写真の作例';image.style.objectPosition=item.position||'center';[...dots.children].forEach((button,i)=>button.classList.toggle('active',i===active))};
    const stop=()=>{if(timer){window.clearInterval(timer);timer=null}};
    const start=()=>{stop();if(photos.length>1&&!reducedMotion&&!document.hidden)timer=window.setInterval(()=>show(active+1),interval)};
    const select=index=>{show(index);start()};
    photos.forEach((_,i)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',(dots.dataset.label||'作例写真{n}を表示').replace('{n}',String(i+1)));button.onclick=()=>select(i);dots.appendChild(button)});
    photos.forEach(item=>{const preload=new Image();preload.src=new URL(item.src,topPhotoBase).href});
    if(photos.length<2){prev.hidden=true;next.hidden=true}else{prev.onclick=()=>select(active-1);next.onclick=()=>select(active+1);stack.addEventListener('mouseenter',stop);stack.addEventListener('mouseleave',start);stack.addEventListener('focusin',stop);stack.addEventListener('focusout',event=>{if(!stack.contains(event.relatedTarget))start()});document.addEventListener('visibilitychange',()=>document.hidden?stop():start())}
    show(active);start();
    const menu=document.getElementById('mobile-menu'),backdrop=document.getElementById('menu-backdrop'),menuButton=document.getElementById('menu-button');
    const closeButton=document.getElementById('menu-close');let returnFocus=null;
    const setMenu=open=>{if(open)returnFocus=document.activeElement;menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));backdrop.classList.toggle('visible',open);menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);if(open)closeButton.focus();else{returnFocus?.focus?.();returnFocus=null}};
    menuButton.onclick=()=>setMenu(true);closeButton.onclick=()=>setMenu(false);backdrop.onclick=()=>setMenu(false);document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('open'))setMenu(false);if(event.key==='Tab'&&menu.classList.contains('open')){const focusable=[...menu.querySelectorAll('a[href],button:not([disabled])')],first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
});
