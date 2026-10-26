# FORMA Studio Pro

**Editor visual de documentos e relatórios profissionais.**

- **Site / editor:** https://meurepertorio.github.io/FORMA-Studio-Pro/
- **Central de downloads:** https://meurepertorio.github.io/FORMA-Studio-Pro/downloads.html
- **Instaladores Windows:** https://github.com/MeuRepertorio/FORMA-Studio-Pro/releases/latest

## Recursos

Trabalhe por seções no modo **Escrever**, reorganize no **Mapa visual**, ou confira o resultado em **Documento**. O editor disponibiliza ferramentas de fonte, tamanho, negrito, itálico, sublinhado, cores, alinhamento, listas, tabelas, imagens, ajustes de página (A4/carta, margens e orientação), modelos, revisões por heurísticas e exportação.

## Uso offline, privacidade e backups

O editor funciona sem conta ou servidor: seus dados são salvos **localmente no dispositivo**, no armazenamento do aplicativo/navegador. Não existe sincronização entre Windows e web. Exporte e guarde backups JSON. A instalação web (PWA) requer primeiro acesso ao site e um navegador compatível.

## Estrutura do repositório

```text
index.html             Editor web / página inicial
app.js                 Lógica do editor, modelos e exportações
style.css              Interface e aparência
downloads.html         Página de downloads do Windows
manifest.webmanifest   Instalação web (PWA)
sw.js                  Cache para funcionamento offline
icon.svg               Ícone do app
desktop/main.cjs       Janela nativa via Electron
package.json           Dependências e configuração de build
.github/workflows/     Publicação automática e compilação Windows
RELEASE_NOTES.md       Informações de lançamento
```

## Desenvolver localmente

Para o site, sirva o diretório raiz com um servidor HTTP local; algumas funções do navegador são restritas ao modo `file://`. Para Windows, instale Node.js 22+:

```bash
npm install
npm run desktop
npm run dist:win
```

A compilação automática ocorre no GitHub Actions para `windows-latest` e publica os `.exe` na área **Releases**; há também um build portátil. Sem assinatura digital, o Windows pode apresentar avisos do SmartScreen.

## Limitações conhecidas

- Exportação Word não garante fidelidade perfeita de documentos complexos.
- Não implementa sumário com páginas automáticas, comentários do Word ou controle de alterações.
- Orientações de redação são heurísticas locais, não análise profunda por IA.
- O app de Windows e o site não sincronizam documentos automaticamente.
- Valide margens, tabelas e quebras no DOCX/PDF antes da entrega final.

**Versão 2.0.** Repositório de desenvolvimento do FORMA Studio Pro, integrado conceitualmente ao Repertório Abalion e independente do código central.