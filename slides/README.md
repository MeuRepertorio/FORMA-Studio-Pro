# FORMA Slides — Editor visual de apresentações

**Parte do FORMA Studio Pro.** Interface web leve, sem servidor de arquivos, para ajustar apresentações `.pptx` e exportar arquivos `.pptx`, `.pdf` e imagem `.png`.

## Fluxo rápido

1. Clique em **Importar** e escolha um PowerPoint (`.pptx`), ou abra **Modelos profissionais**.
2. Selecione o slide à esquerda. Clique em textos, imagens ou formas para movê-los, dimensioná-los e alterar propriedades. Dois cliques num texto ativam a edição direta.
3. Para inserir marca, use **Imagem ou logo** e, se desejar, **Repetir esta imagem em todos os slides**. A opção de remover fundo é **apenas por cor uniforme**, apropriada para logos de fundo sólido.
4. **Exportar PDF** gera um PDF paginado em proporção 16:9. **PPTX** gera uma nova apresentação com objetos editáveis. **Salvar projeto** guarda um backup JSON reimportável.

## Conteúdo incluído

- Interface com miniaturas, tela 16:9, inspector visual, drag, resize, duplicação, exclusão, zoom, histórico básico (Ctrl+Z), atalhos, 6 linhas de modelo profissional (cada uma com 4 slides).
- Imagens PNG/JPG/WEBP/SVG, textos, formas e logos; paleta de cores, opções tipográficas e ordem de camadas.
- Leitura local de `.pptx` usando JSZip e análise dos arquivos OOXML, incluindo textos, imagens e formas básicas.
- Exportação PPTX via PptxGenJS e exportação PDF paginada em JPEG rasterizado por uma implementação local, sem serviço externo.
- Autosave no armazenamento do navegador, sujeito à quota do navegador. Use backup JSON especialmente em projetos com muitas imagens.
- PWA básico (após a primeira visita com os motores carregados).

## Limitações e transparência

**Não é um clone completo do PowerPoint/Keynote/Google Slides.** A importação `.pptx` é **parcial**: suporta textos comuns, imagens raster e algumas formas; pode não manter rigorosamente fontes, tema, hierarquia de grupos, tabelas, gráficos nativos, SmartArt, slides mestres, comentários, vídeos, efeitos, alinhamento fino, links ou animações. Ao importar um arquivo complexo, revise a diagramação antes da entrega. O PPTX exportado preserva os objetos que o editor reconheceu, **não** o OOXML original intacto.

O PDF exportado usa **imagens de cada slide**, o que preserva a aparência aproximada desta tela, mas **o texto no PDF não fica selecionável**. PptxGenJS preserva como editáveis os textos, formas e imagens reconstruídos, não elementos complexos que não foram interpretados.

A remoção de fundo funciona por similaridade com as cores dos quatro cantos; não é recorte inteligente de pessoas ou fotos. Os dados ficam localmente no seu navegador e **não são transmitidos para servidores do FORMA**. Dependências de terceiros são publicadas junto ao site; recursos de fontes do sistema podem apresentar pequenas diferenças entre dispositivos.

## Instalação e publicação

Este projeto é uma página estática na pasta `/slides` do repositório [FORMA Studio Pro](https://github.com/MeuRepertorio/FORMA-Studio-Pro), publicado em [FORMA Slides](https://meurepertorio.github.io/FORMA-Studio-Pro/slides/).

- `index.html`, `app.js`, `style.css`: editor.
- `vendor/`: bibliotecas JSZip e PptxGenJS, instaladas pelo workflow GitHub Actions com versões fixadas.
- `icon.svg`, `manifest.webmanifest`, `sw.js`: identidade e experiência offline/PWA.

## Licenças de bibliotecas

- PptxGenJS v4.0.0, MIT — <https://github.com/gitbrent/PptxGenJS>
- JSZip v3.10.1, MIT/GPLv3 — <https://stuk.github.io/jszip/>

O código deste editor foi desenvolvido para integrar a suíte FORMA Studio Pro.