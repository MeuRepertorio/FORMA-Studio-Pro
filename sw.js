/* FORMA Studio Pro — cache v3.2: navegações online usam a versão atual, com fallback offline. */
const CACHE='forma-studio-pro-v3.2.0';
const CORE=['./','./index.html','./style.css','./studio-v3.css','./app.js','./repertorio.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('forma-studio-pro-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(res=>{
      if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}
      return res;
    }).catch(async()=>await caches.match(req,{ignoreSearch:true})||await caches.match('./index.html')||Response.error()));
    return;
  }
  event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
    if(res.ok&&new URL(req.url).pathname.startsWith(new URL(self.registration.scope).pathname)){
      const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
    }
    return res;
  })));
});
