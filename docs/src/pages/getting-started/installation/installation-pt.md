# Instalação

<p class="description">Instale o Material-UI, o framework React UI mais popular do mundo.</p>

O Material-UI está disponível como um [pacote do npm](https://www.npmjs.com/package/@material-ui/core).

## npm

Para instalar e salvar em suas dependências do `package.json`, execute:

```sh
// usando npm
npm install @material-ui/core@next

// usando yarn
yarn add @material-ui/core@next
```

Note que o pacote possui 2 dependências obrigatórias: [react](https://www.npmjs.com/package/react) >= 16.8.0 e [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0.

## Fonte Roboto

O Material-UI foi desenvolvido com base na fonte [Roboto](https://fonts.google.com/specimen/Roboto). Portanto, certifique-se de seguir as [instruções](/components/typography/#general) para obtê-la. Por exemplo, instale-a através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Ícones

Para utilizar o componente font `Icon`, você deve primeiro adicionar o pacote [Material icons](https://material.io/tools/icons/). Aqui estão [ algumas instruções ](/components/icons/#font-icons) sobre como fazer isso. Por exemplo, instale através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

Como alternativa, se você estiver utilizando JSX, use:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Ícones SVG

Para usar os ícones SVG pré-definidos do Material, como os encontrados na [demonstração de ícones](/components/icons/) você deve primeiro instalar o pacote [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// usando npm
npm install @material-ui/icons@next

// usando yarn
yarn add @material-ui/icons@next
```

## CDN

Você pode começar a utilizar o Material-UI com o mínimo de infraestrutura de frontend, o que é bom para prototipagem. Nós, porém, não recomendamos utilizar esse método em produção - o cliente precisa baixar a biblioteca inteira, independente de quais componentes realmente são utilizados, afetando a performance e uso de banda.

#### Versões UMD

Nós estamos fornecendo dois arquivos no padrão UMD (Universal Module Definition):

- um para desenvolvimento: https://unpkg.com/@material-ui/core@next/umd/material-ui.development.js
- um para produção: https://unpkg.com/@material-ui/core@next/umd/material-ui.production.min.js

Você pode seguir [esse exemplo de CDN](https://github.com/mui-org/material-ui/tree/next/examples/cdn-next) para começar imediatamente.