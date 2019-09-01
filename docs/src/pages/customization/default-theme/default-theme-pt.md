# Tema Padrão

<p class="description">Veja como o objeto tema se parece com os valores padrão.</p>

## Explorar

Explore a documentação do objeto tema:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideHeader": true}}

> Tip: you can play with the documentation theme object in **your console**, as the `theme` variable is exposed on all the documentation pages. Please note that the documentation site is using a custom theme.

Se você quiser aprender mais sobre como o tema é montado, dê uma olhada em [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js), e as importações relacionadas que `createMuiTheme` usa.

## @material-ui/core/styles vs @material-ui/styles

Os estilos do Material-UI são fornecidos pelo pacote npm [@material-ui/styles](/styles/basics/). É uma solução de estilo para o React. Esta solução é [isolada](https://bundlephobia.com/result?p=@material-ui/styles), não tem conhecimento do tema padrão do Material-UI. Para remover a necessidade de injetar um tema no contexto do React **sistematicamente**, estamos envolvendo os módulos de estilo (`makeStyles`, `withStyles` e `styled`) com o tema padrão Material-UI:

- `@material-ui/core/styles/makeStyles` encapsula `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/makeStyles` encapsula `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/styled` encapsula `@material-ui/styles/styled`.