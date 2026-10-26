/* FORMA Editor: os painéis auxiliares não ocupam a área de escrita. */
(()=>{
  'use strict';
  const byId=id=>document.getElementById(id);
  const outline=byId('outlinePanel');
  const inspector=byId('inspector');
  const shade=byId('formaDrawerShade');
  const outlineBtn=byId('btnOutlineToggle');
  const inspectorBtn=byId('btnInspectorMobile');
  if(!outline||!inspector||!shade)return;
  const opened=()=>outline.classList.contains('forma-drawer-open')||inspector.classList.contains('inspector-mobile-open');
  function sync(){
    const o=outline.classList.contains('forma-drawer-open');
    const i=inspector.classList.contains('inspector-mobile-open');
    shade.classList.toggle('is-visible',o||i);
    shade.hidden=!(o||i);
    outlineBtn?.setAttribute('aria-expanded',String(o));
    inspectorBtn?.setAttribute('aria-expanded',String(i));
  }
  function close(){
    outline.classList.remove('forma-drawer-open');
    inspector.classList.remove('inspector-mobile-open');
    sync();
  }
  function openOutline(){
    const willOpen=!outline.classList.contains('forma-drawer-open');
    close();
    if(willOpen)outline.classList.add('forma-drawer-open');
    sync();
  }
  document.addEventListener('click',event=>{
    const btn=event.target.closest('button');
    if(btn?.id==='btnOutlineToggle'){openOutline();return;}
    /* app.js já alterna esta classe. Apenas sincronizamos o segundo painel. */
    if(btn?.id==='btnInspectorMobile'){
      outline.classList.remove('forma-drawer-open');
      sync();
      return;
    }
    if(btn?.id==='btnCloseInspector'||btn?.id==='btnCloseOutline'){
      close();
      return;
    }
    if(btn?.dataset.sectionAct==='help'){
      outline.classList.remove('forma-drawer-open');
      inspector.classList.add('inspector-mobile-open');
      sync();
      return;
    }
    if(btn?.dataset.outlineId || btn?.dataset.nav || btn?.dataset.view){
      close();
    }
  });
  shade.addEventListener('click',close);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&opened())close();
  });
  window.addEventListener('pagehide',close);
  sync();
})();