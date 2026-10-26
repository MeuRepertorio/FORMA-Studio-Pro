/* FORMA Research → FORMA Documentos. Runs after the original editor initialization. */
(()=>{'use strict';
 if(new URLSearchParams(location.search).get('importResearch')!=='1')return;
 const KEY='forma.research.handoff.v1';let handoff;
 try{handoff=JSON.parse(localStorage.getItem(KEY)||'null');}catch{return;}
 if(!handoff||handoff.origin!=='forma-research'||!Array.isArray(handoff.sections)||!handoff.title)return;
 if(!window.confirm('Importar a pesquisa “'+String(handoff.title).slice(0,120)+'” como um NOVO documento no FORMA Studio? Seus documentos atuais serão preservados.'))return;
 const safe=x=>String(x||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
 try{
  const d=newDocument('business',String(handoff.title).slice(0,140));
  d.subtitle=String(handoff.subtitle||'').slice(0,500);
  d.sections=handoff.sections.slice(0,35).map(s=>section(String(s.heading||'Seção').slice(0,160),'<p>'+safe(s.body||'').split(/\n\s*\n/).join('</p><p>').replaceAll('\n','<br>')+'</p>'));
  state.docs.unshift(d);state.activeId=d.id;activeSectionId=d.sections[0]?.id;currentView='write';state.lastView='write';saveNow();setPage('workspace');notify('Pesquisa importada do FORMA Research!');localStorage.removeItem(KEY);
  history.replaceState(null,'',location.pathname);
 }catch(e){console.error('Falha na importação do FORMA Research',e);alert('Não foi possível importar automaticamente. A pesquisa original continua no FORMA Research.');}
})();