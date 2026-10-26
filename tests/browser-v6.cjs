const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const BASE='http://127.0.0.1:4173';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const desktop=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await desktop.newPage();
  let errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(BASE+'/',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('#editorWorkspace').count(),0,'Central must not embed Editor');
  assert.equal(await page.locator('.suite-module-card[href="./editor/"]').count(),1,'Editor card points to its own route');
  assert.equal(await page.locator('html').getAttribute('data-forma-persona'),'technical');
  assert.equal(await page.locator('html').getAttribute('data-forma-theme'),'porcelain');
  await page.locator('.suite-module-card[href="./editor/"]').click();
  await page.waitForURL('**/editor/');
  await page.locator('#editorWorkspace').waitFor({state:'visible'});
  await page.locator('#docList .doc-link').first().waitFor();
  assert.equal(await page.locator('#suiteHome').count(),0,'Editor must not embed Central');
  const snapshot=await page.evaluate(()=>JSON.parse(localStorage.getItem('forma.studio.v1')));
  assert(snapshot.docs.length>0,'Editor lost stored documents');
  console.log('PASS desktop: distinct routes, local document storage');
  await desktop.close();
  const mobile=await browser.newContext({viewport:{width:390,height:780},isMobile:true,hasTouch:true,deviceScaleFactor:1});
  const phone=await mobile.newPage();
  await phone.goto(BASE+'/editor/',{waitUntil:'domcontentloaded'});
  await phone.locator('#docList .doc-link').first().waitFor();
  await phone.evaluate(()=>{
    const state=JSON.parse(localStorage.getItem('forma.studio.v1'));
    const example=state.docs[0];
    for(let i=0;i<25;i++)example.sections.push({id:'testing'+i,title:'Seção '+i,html:'<p>'+('Parágrafo de teste para verificar a rolagem no dispositivo móvel. '.repeat(12))+'</p>'});
    localStorage.setItem('forma.studio.v1',JSON.stringify(state));
  });
  await phone.reload({waitUntil:'domcontentloaded'});
  await phone.locator('[data-section="testing24"]').waitFor({state:'attached'});
  const layout=await phone.evaluate(()=>({docHeight:document.scrollingElement.scrollHeight,viewport:innerHeight,overflow:getComputedStyle(document.querySelector('.content-area')).overflowY,initialScroll:scrollY}));
  assert(layout.docHeight>layout.viewport*2,'Document is too short to validate scrolling');
  assert.equal(layout.overflow,'visible','Mobile content-area must not trap vertical scrolling');
  const cdp=await mobile.newCDPSession(phone);
  await cdp.send('Input.synthesizeScrollGesture',{x:220,y:620,yDistance:-550,gestureSourceType:'touch',speed:650});
  await phone.waitForTimeout(550);
  const y=await phone.evaluate(()=>scrollY);
  assert(y>50,'Touch scrolling did not move the document: '+y);
  console.log('PASS mobile: native touch scroll, document height, Editor persistence');
  await mobile.close();
  const context=await browser.newContext();
  for(const route of ['/slides/','/research/']){
    const p=await context.newPage(); const failures=[];
    p.on('pageerror',e=>failures.push(e.message));
    await p.goto(BASE+route,{waitUntil:'domcontentloaded'});
    assert.equal(await p.locator('html').getAttribute('data-forma-theme'),'porcelain');
    assert.equal(await p.locator('html').getAttribute('data-forma-persona'),'technical');
    await p.waitForTimeout(400);
    if(failures.length)throw new Error(route+' runtime errors: '+failures.join('; ').slice(0,650));
    console.log('PASS route: '+route);
    await p.close();
  }
  await context.close();
  if(errors.length)throw new Error('Desktop JS error: '+errors.join('; ').slice(0,400));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});