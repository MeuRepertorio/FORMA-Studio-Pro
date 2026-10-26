const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const central=read('index.html'),editor=read('editor/index.html'),slides=read('slides/index.html'),research=read('research/index.html');
for(const [name,html] of [['Central',central],['Editor',editor],['Slides',slides],['Research',research]]){
  assert(html.includes('suite-fixed.css'),name+': aparência única ausente');
  assert(html.includes('data-forma-theme="porcelain"')&&html.includes('data-forma-persona="technical"'),name+': tema Técnico Porcelana ausente');
  assert(!html.includes('suite-preferences.js'),name+': seletor antigo não deveria carregar');
}
assert(central.includes('href="./editor/"')&&central.includes('href="./slides/"')&&central.includes('href="./research/"'),'Central sem links separados');
assert(!central.includes('id="editorWorkspace"')&&!central.includes('src="app.js"'),'Editor continua embutido na central');
assert(editor.includes('id="editorWorkspace"')&&editor.includes('src="../app.js"')&&editor.includes('id="docList"'),'Editor separado incompleto');
assert(read('app.js').includes("const STORE='forma.studio.v1'"),'Documentos devem continuar na mesma chave');
assert(read('app.js').includes("page='workspace'"),'Editor deve abrir direto na edição');
assert(read('research/app.js').includes("../editor/?importResearch=1"),'Integração Research → Editor não foi atualizada');
assert(read('suite-home.js').includes('./editor/?doc='),'Central não localiza documentos no Editor');
assert(read('suite-fixed.css').includes('touch-action:pan-y')&&read('suite-fixed.css').includes('overflow-y:visible'),'Correção de rolagem móvel ausente');
assert(read('sw.js').includes("'./editor/index.html'"),'Editor não entrou no cache offline');
for(const p of ['app.js','suite-home.js','slides/app.js','research/app.js','sw.js'])new vm.Script(read(p),{filename:p});
console.log('PASS: FORMA V6 — quatro rotas independentes, tema único, toque e dados preservados');