# Instalação

<p class="description">Instale Material UI! O framework UI mais popular do mundo de React.</p>

O Material UI está disponível como um [pacote npm](https://www.npmjs.com/package/@mui/material)

## npm

Para instalar e salvar as dependências do seu `pacote.json`, execute o seguinte comando **npm** abaixo:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

Ou **yarn**

```bash
yarn add @mui/material @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

Por favor, note que [react](https://www.npmjs.com/package/react) >= 17.0.0 and [react-dom](https://www.npmjs.com/package/react-dom) >= 17.0.0 são dependências obrigatórias.

Material UI está usando a biblioteca [emotion](https://emotion.sh/docs/introduction) como o motor de estilo padrão. Se você quiser usar [`styled-components`](https://styled-components.com/), execute:

```bash
npm install @mui/material @mui/styled-engine-sc styled-components
```

```bash
yarn add @mui/material @mui/styled-engine-sc styled-components
```

:::info
Take a look at the [styled-components guide](/material-ui/guides/styled-components/) for more information on configuration.
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

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/material-ui/icons/) you must first install the [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) package:

<!-- #default-branch-switch -->

Com **npm**:

```bash
npm install @mui/icons-material
```

Com **yarn**:

```bash
yarn add @mui/icons-material
```

## CDN

You can start using Material UI with minimal Front-end infrastructure, which is great for prototyping.

Dois arquivos do Universal Module Definition (**UMD**) são fornecidos:

- um para desenvolvimento: https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
- um para produção: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

You can follow [this CDN example](https://github.com/mui/material-ui/tree/master/examples/material-via-cdn) to quickly get started.

⚠️ Using this approach in **production** is **discouraged** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is **unstable**, it shifts as we release new versions. You should consider pointing to a specific version, such as [v5.0.0](https://unpkg.com/@mui/material@5.0.0/umd/material-ui.development.js).

## Recursos de design

<a href="https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

Um conjunto de componentes reutilizáveis para ferramentas de design está disponível, projetado para corresponder aos componentes React e ajudá-lo a construir ótimos produtos:

- [Figma](https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): A large UI kit with over 600 handcrafted Material UI components.
- [Adobe XD](https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): A large UI kit with over 600 handcrafted Material UI components.
- [Sketch](https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): A large UI kit with over 600 handcrafted Material UI symbols.
- [UXPin](https://www.uxpin.com/merge/mui-library): A large UI kit of Material UI components. The design tool renders the components in a web runtime. It uses the same React implementation as your production environment.
