# Instalação

<p class="description">Instale o Material-UI, a biblioteca de componentes React UI mais popular do mundo.</p>

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

O Material-UI foi desenvolvido com base na fonte [Roboto](https://fonts.google.com/specimen/Roboto). Portanto, certifique-se de seguir [estas instruções](/components/typography/#general) para carregá-la. Como alternativa, carregue através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Ícones

Para utilizar o componente de fonte `Icon`, você deve primeiro adicionar a fonte [Material icons](https://material.io/tools/icons/). Aqui estão [ algumas instruções ](/components/icons/#font-icons) sobre como fazer isso. Como alternativa, carregue através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Ícones SVG

Para usar os ícones SVG pré-definidos do Material, como os encontrados na [demonstração de ícones](/components/icons/) você deve primeiro instalar o pacote [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// usando npm
npm install @material-ui/icons

// usando yarn
yarn add @material-ui/icons
```

## CDN

Você pode começar a utilizar o Material-UI com o mínimo de infraestrutura de frontend, o que é bom para prototipação.

Dois arquivos Universal Module Definition (**UMD**) são fornecidos:

- um para desenvolvimento: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- um para produção: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Você pode seguir [esse exemplo de CDN](https://github.com/mui-org/material-ui/tree/master/examples/cdn) para dar um pontapé inicial.

⚠️ Usar essa abordagem em **produção** não é **recomendada** devido que - o cliente tem que baixar toda a biblioteca, independentemente de quais os componentes que são realmente utilizados, o que afeta o desempenho e a utilização da largura de banda.

⚠️ Os links UMD estão usando a tag `latest` para apontar para a versão mais recente da biblioteca. Dessa forma aponta para uma versão **instável**, muda a medida que lançamos novas versões. Você deve considerar apontar para uma versão específica, como [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).