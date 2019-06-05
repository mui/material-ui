# Tema Padrão

<p class="description">Veja como o objeto tema se parece com os valores padrão.</p>

## Explorar

Explore a documentação do objeto tema:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

> Dica: você pode trabalhar com a documentação do objeto tema em **seu console**. Expomos uma variável `tema` de documentação em todas as páginas de documentação. Por favor, note que o site de documentação está usando um tema personalizado.

Se você quiser aprender mais sobre como o tema é montado, dê uma olhada em [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/createMuiTheme.js), e as importações relacionadas que `createMuiTheme` usa.

## @material-ui/core/styles vs @material-ui/styles

Os estilos do Material-UI são fornecidos pelo pacote npm [@material-ui/styles](/styles/basics/). É uma solução de estilo para o React. Esta solução é [isolada](https://bundlephobia.com/result?p=@material-ui/styles), não tem conhecimento do tema padrão do Material-UI. Para remover a necessidade de injetar um tema no contexto do React **sistematicamente**, estamos envolvendo os módulos de estilo (`makeStyles`, `withStyles` e `styled`) com o tema padrão Material-UI:

- `@material-ui/core/styles/makeStyles` encapsula `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/makeStyles` encapsula `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/styled` encapsula `@material-ui/styles/styled`.