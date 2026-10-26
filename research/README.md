# FORMA Research — Knowledge Workspace

Ambiente local-first de investigação, gestão de pesquisas, decisões e produção de projetos. Integra-se ao **FORMA Studio Pro** e ao **FORMA Slides**, sem cadastro e sem servidor obrigatório.

## Funcionalidades entregues

- Modelos predefinidos: pesquisa escolar, TCC, negócios, investigação documental e pesquisa livre.
- Estrutura por projeto: perguntas, fontes, descobertas, decisões, cenários e tarefas editáveis.
- Registros de mudança e linha do tempo, indicadores de conclusão de etapas, pesquisa global e biblioteca unificada de fontes.
- Mapa de fichas arrastáveis com relações entre fontes, descobertas e decisões.
- Biblioteca de pesquisas externas: Wikipedia (MediaWiki Action API), Crossref e OpenAlex. Os resultados são candidatos a fontes; **não são provas automáticas**.
- Orientador local baseado em regras e informações cadastradas, com atalho de pesquisa. **Não utiliza IA generativa**.
- Salvamento em IndexedDB, fallback para localStorage se necessário, exportação/restauração de backup JSON (a restauração exige confirmação).
- Exportação `.md`, impressão/PDF do navegador, geração de `.pptx` editável com o motor local do FORMA Slides e transferência direta de seções para um novo documento do FORMA Studio.
- Interface adaptável a celular, tablet e computador; cache offline após carregamento inicial.

## APIs e gratuidade

A busca consulta endpoints públicos de maneira explícita (uma consulta de cada serviço por pesquisa), sem servidor intermediário:

1. Wikipedia: `https://pt.wikipedia.org/w/api.php`, `origin=*`, não requer credencial.
2. Crossref: `https://api.crossref.org/works`, acesso público gratuito, sem registro obrigatório. Respeitar limites de taxa.
3. OpenAlex: `https://api.openalex.org/works`, uso demonstrativo sem chave limitado; para uso regular, pode exigir chave gratuita. A chave é fornecida pelo usuário e guardada apenas na memória da aba (não no repositório, no localStorage nem no backup).

A disponibilidade depende de permissões CORS, das políticas e limites dos provedores, de conexão e de manutenção dos serviços. Nenhuma dessas APIs equivale a pesquisa genérica por toda a web; para leitura completa, abrir os links originais. Nunca chamar metadados de prova conclusiva.

## Limitações e segurança

- Os projetos não são sincronizados automaticamente entre dispositivos. Faça backup JSON regularmente. GitHub Pages é hospedagem estática, não banco de dados privado.
- A linha do tempo registra alterações, **não** faz rollback de versões completas. Backups JSON permitem recuperação.
- O mapa apresenta até 19 nós simultaneamente para preservar desempenho e legibilidade.
- Pesquisa por palavras-chave não substitui revisão metodológica. Wikipédia pode conter erros; metadados de Crossref/OpenAlex não garantem o teor do artigo.
- A exportação para Slides gera um novo PPTX de estrutura textual, **não** replica os slides originais.
- Enviar para Documentos usa uma passagem local por `localStorage`, solicita confirmação no editor e cria um novo documento. Arquivos existentes não são substituídos.
- Dados e chaves pessoais **não** devem ser versionados no repositório público.

## Estrutura

- `index.html`: aplicação e navegação.
- `style.css`: identidade visual e responsividade.
- `app.js`: editor, persistência, pesquisa e exportações.
- `sw.js`, `manifest.webmanifest`, `icon.svg`: PWA.
- `bridge-doc.js`: conversão local do Research para o editor de documentos da raiz.

### Referências técnicas

- MediaWiki CORS: https://www.mediawiki.org/wiki/API:Cross-site_requests
- Crossref REST: https://www.crossref.org/documentation/retrieve-metadata/rest-api/
- OpenAlex authentication: https://help.openalex.org/api/authentication/
- MDN IndexedDB: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API