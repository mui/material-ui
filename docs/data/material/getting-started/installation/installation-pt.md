# Instalação

<p class="description">Instale MUI, o framework de componentes React UI mais popular do mundo.</p>

MUI está disponível como um [pacote npm](https://www.npmjs.com/package/@mui/material).

## npm

Para instalar e salvar em suas dependências do `package.json`, execute:

```sh
// usando npm
npm install @mui/material @emotion/react @emotion/styled

// usando yarn
yarn add @mui/material @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

Note que o pacote possui 2 dependências obrigatórias: [react](https://www.npmjs.com/package/react) >= 17.0.0 e [react-dom](https://www.npmjs.com/package/react-dom) >= 17.0.0.

MUI is using [emotion](https://emotion.sh/docs/introduction) as a styling engine by default. Ou se você quiser utilizar `styled-components` como um motor de estilização:

```sh
// usando npm
npm install @mui/material @mui/styled-engine-sc styled-components

// usando yarn
yarn add @mui/material @mui/styled-engine-sc styled-components
```

> 💡 Dê uma olhada no [guia de motor de estilos](/material-ui/guides/styled-engine/) para obter mais informações de como configurar `styled-components` como o motor de estilos.

## Fonte Roboto

MUI foi desenvolvida com base na fonte [Roboto](https://fonts.google.com/specimen/Roboto). Portanto, certifique-se de seguir [estas instruções](/material-ui/react-typography/#general) para carregá-la. Como alternativa, carregue através do Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## Ícones de fonte

Para usar o componente de fonte `Icon`, você deve primeiramente adiciona a fonte de [ícones Material](https://fonts.google.com/icons). Aqui estão [algumas instruções](/material-ui/icons/#font-icons) de como fazer isso. Como alternativa, carregue através do Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

## Ícones SVG

Para usar os ícones SVG pré-definidos do Material, como os encontrados na [demonstração de ícones](/material-ui/icons/), você deve primeiro instalar o pacote [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material):

<!-- #default-branch-switch -->

```sh
// usando npm
npm install @mui/icons-material

// usando yarn
yarn add @mui/icons-material
```

## CDN

Você pode começar a utilizar o MUI com o mínimo de infraestrutura de frontend, o que é bom para prototipação.

Dois arquivos Universal Module Definition (**UMD**) são fornecidos:

- um para desenvolvimento: https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
- um para produção: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

Você pode seguir [esse exemplo CDN](https://github.com/mui/material-ui/tree/master/examples/cdn) para dar um pontapé inicial.

⚠️ Usar essa abordagem em **produção** não é **recomendada** devido que - o cliente tem que baixar toda a biblioteca, independentemente de quais os componentes que são realmente utilizados, o que afeta o desempenho e a utilização da largura de banda.

⚠️ Os links UMD estão usando a tag `latest` para apontar para a versão mais recente da biblioteca. Esse apontamento é **instável**, muda à medida que lançamos novas versões. Você deve considerar apontar para uma versão específica, tal como [v5.0.0](https://unpkg.com/@mui/material@5.0.0/umd/material-ui.development.js).

## Recursos de design

<a href="https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

Um conjunto de componentes reutilizáveis para ferramentas de design está disponível, desenvolvido para enquadrar os componentes React e te ajudar a criar ótimos produtos:

- [Figma](https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): A large UI kit with over 600 handcrafted MUI components.
- [Adobe XD](https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): A large UI kit with over 600 handcrafted MUI components.
- [Sketch](https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): A large UI kit with over 600 handcrafted MUI symbols.
- [UXPin](https://github.com/uxpin-merge/material-ui-5-merge): A large UI kit of MUI components. The design tool renders the components in a web runtime. It uses the same React implementation as your production environment.
