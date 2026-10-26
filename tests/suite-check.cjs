const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const read=(f)=>fs.readFileSync(f,'utf8');
for(const f of ['suite-preferences.js','suite-home.js','app.js','slides/app.js','research/app.js']){new vm.Script(read(f),{filename:f});console.log('JS válido:',f)}
const home=read('index.html'),slides=read('slides/index.html'),research=read('research/index.html');
for(const [name,html] of [['Studio',home],['Slides',slides],['Research',research]]){
 assert(html.includes('suite-preferences.js'),name+' não carrega as preferências');assert(html.includes('suite-preferences.css'),name+' não carrega os estilos');assert(html.includes('data-forma-app='),name+' sem escopo do tema');}
for(const tag of ['id="suiteHome"','data-nav="home"','data-nav="workspace"','./slides/','./research/','id="suiteRecentDocs"']) assert(home.includes(tag),'Homepage sem '+tag);
for(const theme of ['jade','graphite','cobalt','aurora','ivory'])assert(read('suite-preferences.js').includes(theme),'tema ausente: '+theme);
for(const mode of ['studio','gallery','compact'])assert(read('suite-preferences.js').includes(mode),'layout ausente: '+mode);
assert(!home.includes('forma-slides-entry'),'atalho antigo ainda na navegação');
assert(read('app.js').includes("page='home'"),'home não é página inicial');
assert(read('app.js').includes("if(page==='home')"),'home não tem handler');
console.log('PASS: suíte e personalização integradas');