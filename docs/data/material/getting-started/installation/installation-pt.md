# Instalação

<p class="description">Instale Material UI! O framework UI mais popular do mundo de React.</p>

O Material UI está disponível como um [pacote npm](https://www.npmjs.com/package/@mui/material)

## npm

Para instalar e salvar as dependências do seu `pacote.json`, execute o seguinte comando **npm** abaixo:

```sh
npm install @mui/material @emotion/react @emotion/styled
```

Ou **yarn**

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

Por favor, note que [react](https://www.npmjs.com/package/react) >= 17.0.0 and [react-dom](https://www.npmjs.com/package/react-dom) >= 17.0.0 são dependências obrigatórias.

Material UI está usando a biblioteca [`emotion`](https://emotion.sh/docs/introduction) como o motor de estilo padrão. <br>
Se você quiser usar [`styled-components`](https://styled-components.com/), execute:

```sh
npm install @mui/material @mui/styled-engine-sc styled-components
```

```sh
yarn add @mui/material @mui/styled-engine-sc styled-components
```

:::info
💡 Dê uma olhada no [Guia Styled Engine](/material-ui/guides/styled-engine/) para obter mais informações sobre como configurar `styled-components` como o style engine.
:::

## Fonte Roboto

Material UI foi projetado com a fonte [Roboto](https://fonts.google.com/specimen/Roboto) em mente. Então certifique-se de seguir [estas instruções](/material-ui/react-typography/#general). Por exemplo, usando o Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## Ícones de fonte

To use the font `Icon` component, you must first add the [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) font. Here are [some instructions](/material-ui/icons/#icon-font-icons) on how to do so. For instance, via Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

## Ícones SVG

Para usar SVG Material ícones pré-construídos, como os encontrados nas demonstrações de ícones, você deve primeiro instalar o pacote [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material):

<!-- #default-branch-switch -->

Com **npm**:

```sh
npm install @mui/icons-material
```

Com **yarn**:

```sh
yarn add @mui/icons-material
```

## CDN

Você pode começar com Material UI em uma infraestrutura de front-end mínima, o que é ótimo para prototipagem simples e rápida.

Dois arquivos do Universal Module Definition (**UMD**) são fornecidos:

- um para desenvolvimento: https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
- um para produção: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

Você pode seguir [este exemplo de CDN](https://github.com/mui/material-ui/tree/master/examples/cdn) e começar rapidamente.

⚠️ No entanto, o uso dessa abordagem em **produção** não é recomendado e é **desencorajado** - o cliente precisa baixar a biblioteca inteira, independentemente de quais componentes são realmente usados, afetando o desempenho e a utilização do consumo da internet e dados móveis.


⚠️  Os links UMD estão usa a tag `mais recente` apontando para a versão mais recente da biblioteca. Este apontamento é **instável**, e muda conforme lançamos novas versões. Você deve considerar linkar para uma versão específica, como [v5.0.0](https://unpkg.com/@mui/material@5.0.0/umd/material-ui.development.js).

## Recursos de design

<a href="https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

Um conjunto de componentes reutilizáveis para ferramentas de design está disponível, projetado para corresponder aos componentes React e ajudá-lo a construir ótimos produtos:

- [Figma](https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): Um grande kit UI com mais de 600 componentes Material UI personalizados.
- [Adobe XD](https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): Um grande kit UI com mais de 600 componentes Material UI personalizados.
- [Sketch](https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): Um grande kit UI com mais de 600 símbolos Material UI personalizados.
- [UXPin](https://www.uxpin.com/merge/mui-library):  Um grande kit UI de componentes Material UI. A ferramenta de design renderiza os componentes em tempo de execução na web. Usa a mesma implementação do React que seu ambiente de produção.
