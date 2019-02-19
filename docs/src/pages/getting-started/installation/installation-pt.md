# Instalação

<p class="description">Instale o Material-UI, o framework React UI mais popular do mundo.</p>

O Material-UI está disponível como um [pacote do npm](https://www.npmjs.com/package/@material-ui/core).

## npm

Para instalar e salvar em suas dependências do `package.json`, execute:

```sh
// with npm
npm install @material-ui/core@next

// with yarn
yarn add @material-ui/core@next
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

Para utilizar o `Icon` componente, você deve primeiro adicionar o pacote [Material icons](https://material.io/tools/icons/). Aqui estão [ algumas instruções ](/style/icons/#font-icons) sobre como fazer isso. Por exemplo, instale-a através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Como alternativa, se você estiver utilizando o JSX, use:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Ícones SVG

Para utilizar os ícones Material em SVG, como os encontrados nas [demonstrações de componentes](/demos/app-bar/) você precisa primeiro instalar o pacote [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// with npm
npm install @material-ui/icons@next

// with yarn
yarn add @material-ui/icons@next
```

## CDN

Você pode começar a utilizar o Material-UI com o mínimo de infraestrutura de frontend, o que é bom para prototipação. Nós, porém, desencorajamos utilizar esse método na produção - o cliente precisa baixar a biblioteca inteira, independente de quais componentes realmente são utilizados, afetando a performance e uso de banda.

#### Lançamentos para UMD

Nós estamos provendo dois arquivos no Universal Module Definition (UMD):

- um para desenvolvimento: https://unpkg.com/@material-ui/core/next/umd/material-ui.development.js
- um para a produção: https://unpkg.com/@material-ui/core/next/umd/material-ui.production.min.js

Você pode seguir [esse exemplo de CDN](https://github.com/mui-org/material-ui/tree/next/examples/cdn-next) para rapidamente começar.