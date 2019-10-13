# Instalação

<p class="description">Instale o Material-UI, o framework React UI mais popular do mundo.</p>

O Material-UI está disponível como um [pacote do npm](https://www.npmjs.com/package/@material-ui/core).

## npm

Para instalar e salvar em suas dependências do `package.json`, execute:

```sh
// utilizando o npm
npm install @material-ui/core

// utilizando o yarn
yarn add @material-ui/core
```

Note que o pacote possui 2 dependências obrigatórias: [react](https://www.npmjs.com/package/react) >= 16.8.0 e [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0.

## Fonte Roboto

O Material-UI foi desenvolvido com base na fonte [Roboto](https://fonts.google.com/specimen/Roboto). Portanto, certifique-se de seguir as [instruções](/components/typography/#general) para obtê-la. Por exemplo, instale-a através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Ícones

In order to use the font `Icon` component, you must first add the [Material icons](https://material.io/tools/icons/) font. Aqui estão [ algumas instruções ](/components/icons/#font-icons) sobre como fazer isso. Por exemplo, instale-a através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Ícones SVG

Para usar os ícones SVG pré-definidos do Material, como os encontrados na [demonstração de ícones](/components/icons/) você deve primeiro instalar o pacote [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// utilizando o npm
npm install @material-ui/icons

// utilizando o yarn
yarn add @material-ui/icons
```

## CDN

Você pode começar a utilizar o Material-UI com o mínimo de infraestrutura de frontend, o que é bom para prototipação.

Two Universal Module Definition (**UMD**) files are provided:

- um para desenvolvimento: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- um para a produção: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Você pode seguir [esse exemplo de CDN](https://github.com/mui-org/material-ui/tree/master/examples/cdn) para rapidamente começar.

⚠️ Using this approach in **production** is **discouraged** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ Os links UMD estão usando a `última` tag para apontar para a versão mais recente da biblioteca. Dessa forma aponta para uma versão **instável**, muda a medida que lançamos novas versões. You should consider pointing to a specific version, such as [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).