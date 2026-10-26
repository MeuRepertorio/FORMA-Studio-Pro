const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=f=>fs.readFileSync(f,'utf8');
for(const js of ['suite-preferences.js','suite-documents.js','suite-home.js','app.js','slides/app.js','research/app.js']){new vm.Script(read(js),{filename:js});console.log('JavaScript válido:',js)}
const pref=read('suite-preferences.js'),css=read('suite-personas.css'),docs=read('suite-documents.css');
const home=read('index.html'),slides=read('slides/index.html'),research=read('research/index.html');
for(const mode of ['executive','signature','technical','institutional']){
 assert(pref.includes(`${mode}:{name:`),`Estilo ausente: ${mode}`);
 assert(css.includes(`data-forma-persona="${mode}"`),`Estilo não definido em CSS: ${mode}`);
}
for(const mode of ['studio','gallery','compact'])assert(pref.includes(`${mode}:{name:`),`Layout ausente: ${mode}`);
for(const color of ['jade','graphite','cobalt','aurora','ivory','navy','porcelain'])assert(pref.includes(`${color}:{name:`),`Paleta ausente: ${color}`);
for(const [name,html] of [['Início',home],['Apresentações',slides],['Pesquisas',research]]){
 assert(html.includes('suite-personas.css'),`${name}: estilos não importados`);
 assert(html.includes('suite-preferences.js'),`${name}: preferências compartilhadas ausentes`);
}
assert(home.includes('suite-documents.js')&&home.includes('suite-documents.css'),'Módulo de documentos ausente');
assert(docs.includes('suite-docs-expanded')&&read('suite-documents.js').includes('suiteDocSearch'),'Biblioteca ampliada ausente');
assert(home.includes('id="docList"')&&home.includes('id="btnNewDocSide"'),'Documentos existentes não devem ser apagados');
assert(pref.includes("const KEY='forma.suite.preferences.v1'"),'Preferências não devem trocar de chave');
console.log('PASS: personalidades, paletas, lista ampliada, suíte compatível');