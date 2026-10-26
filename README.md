# FORMA Studio Pro · Precision V3

**Editor profissional de documentos, com interface escura premium, edição visual, repertório estruturado de relatórios e exportação para Word/PDF.**

## Abrir o aplicativo

- **Site:** https://meurepertorio.github.io/FORMA-Studio-Pro/
- **Código:** https://github.com/MeuRepertorio/FORMA-Studio-Pro
- **Windows:** a automação `.github/workflows/windows.yml` gera instalador e versão portátil em **Actions → Artefatos da execução**. Os artefatos são temporários; por isso a interface não anuncia links de download permanentes não verificados.

O site pode ser instalado como PWA em navegadores compatíveis. O editor é autocontido: não exige API, login ou conexão com serviços de IA. Depois do primeiro carregamento, o service worker disponibiliza os recursos principais offline. Os exemplos externos do repertório precisam de internet.

## Novidades da versão 3

- **Precision V3:** navegação escura, estrutura de seções à esquerda, papel central, barra compacta de formatação e propriedades à direita; transições sutis e acessibilidade para movimento reduzido.
- **Repertório profissional:** 25 roteiros determinísticos em nove áreas: Produtos, Mercado, Negócios, Finanças, Marketing, Gestão, Pessoas, Acadêmico e Serviços.
- **Criar por assunto:** escolha um roteiro, indique assunto, organização, período e objetivo. O aplicativo cria títulos, sequência de seções, instruções e, opcionalmente, um parágrafo inicial editável sem inventar resultados.
- **Orientador por regras:** perguntas por seção e verificação básica de estrutura, evidências e clareza. **Não é uma integração com IA nem realiza avaliação semântica**.
- **Edição profissional:** fontes e tamanhos, negrito, itálico, sublinhado, alinhamentos, listas, tabelas, imagens locais, links, recuos, blocos, tema de documento, A4/Carta, orientação, margens independentes, espaçamento, sumário simples, cabeçalho e rodapé simples.
- **Modos:** Escrever, Mapa visual, Página final. Os modos usam o mesmo documento estruturado.
- **Arquivos:** exportação DOCX, Markdown, cópia JSON; PDF pela caixa de impressão. Importação de texto, JSON e DOCX simples.
- **Segurança:** salvamento local no navegador e backup manual JSON para transferência entre dispositivos.

## Criar sem IA

1. Abra **Criar por assunto**.
2. Escolha um dos 25 roteiros (ex.: Análise de produto).
3. Preencha o assunto, contexto, finalidade e período, quando aplicáveis.
4. Escolha se deseja um parágrafo inicial orientado.
5. Clique em **Criar relatório**. Cada seção contém uma orientação própria no painel **Orientador**.

O aplicativo **não inventa pesquisas, números, resultados, fontes ou evidências**. O conteúdo factual é responsabilidade do autor.

## Para Windows

É necessário Node.js 22+ no Windows:

```bash
npm install
npm run desktop
npm run dist:win
```

`npm run dist:win` produz instalador NSIS e aplicativo portátil de 64 bits em `dist/`, sem assinatura digital. Para obter os arquivos pela nuvem, abra **Actions → FORMA Studio Pro · Aplicativo Windows**, selecione uma execução bem-sucedida e baixe o artefato.

## Estrutura

- `index.html`: interface
- `style.css`: estilos legados do motor
- `studio-v3.css`: tema Precision V3
- `app.js`: edição, dados locais, importação/exportação e lógica de interface
- `repertorio.js`: catálogo estático dos 25 tipos de relatórios
- `manifest.webmanifest` e `sw.js`: aplicativo instalável/offline
- `desktop/main.cjs`: janela Electron
- `.github/workflows/windows.yml`: build do Windows

## Limitações honestas

- DOCX não é uma cópia pixel a pixel do Word. Estruturas complexas importadas podem exigir revisão.
- Sumário não calcula páginas automaticamente e cabeçalho/rodapé do DOCX não se repetem como elementos nativos em todas as páginas.
- Editor e PWA salvam dados localmente; **não existe sincronização entre aparelhos** nem backups em nuvem.
- Os indicadores de escrita são heurísticos, não certificação ou IA.
- Os executáveis Windows não são assinados digitalmente e podem gerar alerta do SmartScreen.
- O GitHub Pages é público, mas seus documentos de trabalho não são enviados ao repositório.
- A antiga página de downloads foi removida da navegação porque não havia distribuição permanente confiável.

**Apenas o software e os modelos estão versionados no GitHub. Não coloque dados privados no repositório público.**