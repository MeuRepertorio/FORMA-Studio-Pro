/* FORMA Home — painel central. Só lê a biblioteca local; não altera documentos. */
(()=>{'use strict';
const holder=document.getElementById('suiteRecentDocs');if(!holder)return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function refresh(){let docs=[];try{const obj=JSON.parse(localStorage.getItem('forma.studio.v1')||'{}');docs=Array.isArray(obj.docs)?obj.docs:[]}catch{};
 const count=document.getElementById('suiteDocumentCount');if(count)count.textContent=String(docs.length);
 const recent=docs.slice().sort((a,b)=>(b.updated||0)-(a.updated||0)).slice(0,3);
 holder.innerHTML=recent.length?recent.map(d=>`<button type="button" data-open-doc="${esc(d.id)}"><span class="recent-doc-symbol">▤</span><span class="recent-doc-copy"><strong>${esc(d.title||'Documento sem título')}</strong><small>Documento salvo neste dispositivo</small></span><span class="recent-arrow">↗</span></button>`).join(''):'<div class="suite-empty">Quando você criar seu primeiro documento, ele aparecerá aqui para continuar a edição.</div>';
 }
 document.addEventListener('forma:home',refresh);
 document.addEventListener('click',e=>{const item=e.target.closest('[data-open-doc]');if(item&&item.dataset.openDoc){location.href='./editor/index.html?doc='+encodeURIComponent(item.dataset.openDoc);}});const nav=document.getElementById('suiteMobileNav'),side=document.getElementById('side'),shade=document.getElementById('sideShade');nav?.addEventListener('click',()=>{side.classList.toggle('open');shade.classList.toggle('show')});shade?.addEventListener('click',()=>{side.classList.remove('open');shade.classList.remove('show')});
 window.addEventListener('storage',e=>{if(e.key==='forma.studio.v1')refresh()});refresh();
})();