document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.getElementById('mobile-menu');
  const backdrop=document.getElementById('menu-backdrop');
  const openButton=document.getElementById('menu-button');
  const closeButton=document.getElementById('menu-close');
  if(!menu||!backdrop||!openButton||!closeButton)return;
  let returnFocus=null;
  const setMenu=open=>{if(open)returnFocus=document.activeElement;menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));backdrop.classList.toggle('visible',open);openButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);if(open)closeButton.focus();else{returnFocus?.focus?.();returnFocus=null}};
  openButton.addEventListener('click',()=>setMenu(true));
  closeButton.addEventListener('click',()=>setMenu(false));
  backdrop.addEventListener('click',()=>setMenu(false));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('open'))setMenu(false);if(event.key==='Tab'&&menu.classList.contains('open')){const focusable=[...menu.querySelectorAll('a[href],button:not([disabled])')],first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
});
