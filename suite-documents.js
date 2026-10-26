/* FORMA / Documentos — busca e biblioteca ampliada sem tocar nos arquivos salvos. */
(()=>{'use strict';
function mount(){
 const sidebar=document.getElementById('side'),list=document.getElementById('docList');
 if(!sidebar||!list||document.getElementById('suiteDocSearch'))return;
 const label=list.previousElementSibling;
 if(!label)return;
 label.classList.add('suite-doc-heading');
 label.querySelector('.smallplus')?.setAttribute('title','Criar documento');
 const controls=document.createElement('div');controls.className='suite-doc-controls';
 controls.innerHTML='<label class="suite-doc-search-wrap"><span aria-hidden="true">⌕</span><input id="suiteDocSearch" type="search" autocomplete="off" placeholder="Buscar documentos" aria-label="Buscar documentos salvos"></label><button id="suiteDocExpand" type="button" class="suite-doc-expand" aria-label="Ampliar lista de documentos" aria-expanded="false" title="Ampliar lista de documentos">⤢</button>';
 label.insertAdjacentElement('afterend',controls);
 const counter=document.createElement('div');counter.className='suite-doc-status';counter.id='suiteDocStatus';counter.setAttribute('aria-live','polite');controls.insertAdjacentElement('afterend',counter);
 const shade=document.createElement('div');shade.className='suite-doc-shade';shade.id='suiteDocShade';shade.hidden=true;document.body.append(shade);
 const input=controls.querySelector('#suiteDocSearch'),expand=controls.querySelector('#suiteDocExpand');
 let expanded=false;
 function filter(){const term=(input.value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();let shown=0;
  const items=[...list.querySelectorAll('[data-open-doc]')];for(const el of items){const name=(el.textContent||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const match=!term||name.includes(term);el.hidden=!match;if(match)shown++;el.title=el.textContent.trim();}
  counter.textContent=term?`${shown} de ${items.length} documentos`:`${items.length} ${items.length===1?'documento salvo':'documentos salvos'}`;
  let empty=list.querySelector('.suite-doc-no-match');if(!shown&&term){if(!empty){empty=document.createElement('p');empty.className='suite-doc-no-match';empty.textContent='Nenhum documento encontrado.';list.append(empty)}}else empty?.remove();
 }
 function toggle(force){expanded=typeof force==='boolean'?force:!expanded;sidebar.classList.toggle('suite-docs-expanded',expanded);shade.hidden=!expanded;expand.setAttribute('aria-expanded',String(expanded));expand.setAttribute('aria-label',expanded?'Fechar lista ampliada':'Ampliar lista de documentos');expand.textContent=expanded?'×':'⤢';document.body.classList.toggle('suite-docs-open',expanded);if(expanded)input.focus();}
 input.addEventListener('input',filter);expand.addEventListener('click',()=>toggle());shade.addEventListener('click',()=>toggle(false));
 list.addEventListener('click',e=>{if(e.target.closest('[data-open-doc]'))toggle(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&expanded){toggle(false);e.preventDefault()}});
 const observer=new MutationObserver(()=>filter());observer.observe(list,{childList:true});
 window.addEventListener('pageshow',filter);filter();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();