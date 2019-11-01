---
title: Componente App Bar (Barra de Aplicativos) para React
components: AppBar, Toolbar, Menu
---

# Barra de Aplicativos

<p class="description">A Barra de aplicativos exibe informações e ações relacionadas à tela atual.</p>

A [barra de aplicativos superior](https://material.io/design/components/app-bars-top.html) provê conteúdo e ações relacionados à tela atual. Ela é utilizada para a identidade visual, títulos de tela, navegação, e ações.

Ele pode se transformar em uma barra de ações contextual ou utilizado como uma barra de navegação.

## Barra de Aplicativos Simples

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## Barra de Aplicativos com um campo de busca principal

Um campo de busca principal.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## Barra de Aplicativos com menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## Barra de Aplicativos com campo de busca

Uma barra de pesquisa na lateral.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Densa (apenas para desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Proeminente

Uma barra de aplicativos proeminente.

{{"demo": "pages/components/app-bar/ProminentAppBar.js"}}

## Barra de Aplicativos Inferior

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Local de filtros

Quando você renderiza a posição da barra de apps fixa, a dimensão do elemento não afeta o resto da página. Isso pode fazer com que parte do seu conteúdo fique invisível, atrás da barra de aplicativos. Aqui estão 3 soluções possíveis:

1. Você pode usar `posição="sticky"` ao invés de fixed. ⚠️ sticky não é suportado pelo IE 11.
2. You can render a second `<Toolbar />` component:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. You can use `theme.mixins.toolbar` CSS:

```jsx
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  )
};
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### Barra de Aplicativos oculta

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### Barra de aplicativos elevada

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Voltar ao topo

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Argumentos

1. `options` (*Object* [opcional]):

- `options.disableHysteresis` (*Boolean* [opcional]): Padrão `false`. Desabilita a histerese. Ignora a direção de rolagem ao determinar o valor `trigger`.
- `options.target` (*Node* [opcional]): Padrão `window`.
- `options.threshold` (*Number* [opcional]): Padrão `100`. Modifica o valor limite que aciona a `trigger` quando a barra de rolagem vertical cruzar ou chegar a este limite.

#### Retornos

`trigger`: Does the scroll position match the criteria?

#### Exemplos

```jsx
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Hello</div>
    </Slide>
  );
}
```