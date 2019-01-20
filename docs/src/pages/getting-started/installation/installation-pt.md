# Instalação

<p class="description">Instale o Material-UI, o framework React UI mais popular do mundo.</p>

O Material-UI está disponível como um [pacote do npm](https://www.npmjs.com/package/@material-ui/core).

## npm

Para instalar e salvar em suas dependências do `package.json`, execute:

```sh
// npm
npm install @material-ui/core

// yarn
yarn add @material-ui/core
```

Note que o pacote possui 2 dependências obrigatórias: [react](https://www.npmjs.com/package/react) >= 16.3.0 e [react-dom](https://www.npmjs.com/package/react-dom) >= 16.3.0.

## Fonte Roboto

O Material-UI foi desenvolvido pensando na fonte [Roboto](https://fonts.google.com/specimen/Roboto). Portanto, certifique-se de seguir as [instruções](/style/typography/#general) para obtê-la. Por exemplo, instale-a através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

Como alternativa, se você estiver utilizando o JSX, use:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Ícones

In order to use the font `Icon` component you must first add the [Material icons](https://material.io/tools/icons/) font. Here are [some instructions](/style/icons/#font-icons) on how to do so. Por exemplo, instale-a através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Como alternativa, se você estiver utilizando o JSX, use:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Ícones SVG

In order to use prebuilt SVG Material icons, such as those found in the [component demos](/demos/app-bar/) you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
npm install @material-ui/icons
```

## CDN

You can start using Material-UI with minimal Front-end infrastructure, which is great for prototyping. We discourage using this approach in production though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilisation.

#### UMD releases

We are providing two Universal Module Definition (UMD) files:

- one for development: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- one for production: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

You can follow [this CDN example](https://github.com/mui-org/material-ui/tree/master/examples/cdn) to quickly get started.