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
    const area=document.querySelector('.content-area');
    if(!area)throw new Error('Editor content-area missing');
    const block=document.createElement('div');block.id='touchSmokeContent';
    block.style.cssText='padding:20px;line-height:1.8;color:#172f41;';
    for(let i=0;i<32;i++){
      const p=document.createElement('p');p.textContent='Documento longo de teste: a rolagem precisa alcançar todos os parágrafos, inclusive os últimos. '.repeat(3);block.append(p);
    }
    area.append(block);
  });
  await phone.locator('#touchSmokeContent p').last().waitFor({state:'attached'});
  const layout=await phone.evaluate(()=>({docHeight:document.scrollingElement.scrollHeight,viewport:innerHeight,overflow:getComputedStyle(document.querySelector('.content-area')).overflowY,initialScroll:scrollY}));
  assert(layout.docHeight>layout.viewport*2,'Document is too short to validate scrolling');
  assert.equal(layout.overflow,'visible','Mobile content-area must not trap vertical scrolling');
  const cdp=await mobile.newCDPSession(phone);
  await cdp.send('Input.synthesizeScrollGesture',{x:220,y:620,yDistance:-550,gestureSourceType:'touch',speed:650});
  await phone.waitForTimeout(550);
  const motion=await phone.evaluate(()=>{
    const els=['html','body','.app-shell','.app-main','.work-area','.workspace-canvas','.content-area','.editor-paper']
      .map(sel=>{const n=document.querySelector(sel);if(!n)return {sel,missing:true};const s=getComputedStyle(n);return {sel,scrollTop:n.scrollTop,scrollHeight:n.scrollHeight,clientHeight:n.clientHeight,overflowY:s.overflowY,display:s.display,position:s.position}});
    return {scrollY,visualTop:visualViewport?.pageTop??null,els};
  });
  console.log('MOBILE TOUCH DIAGNOSTICS',JSON.stringify(motion));
  assert(motion.scrollY>50 || motion.els.some(e=>e.scrollTop>50),'Touch scrolling did not move any document container');
  console.log('PASS mobile: native touch scroll and long Editor content');
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