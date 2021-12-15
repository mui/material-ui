---
title: Componente Barra de Aplicativos para React
components: AppBar, Toolbar, Menu
githubLabel: 'component: AppBar'
materialDesign: https://material.io/components/app-bars-top
---

# Barra de Aplicativos

<p class="description">A barra de aplicativos exibe informações e ações relacionadas à tela atual.</p>

A barra de aplicativos superior fornece conteúdo e ações relacionadas à tela atual. Ela é utilizada para a identidade visual, títulos de tela, navegação e ações.

Ela pode se transformar em uma barra de ações contextual ou ser utilizada como uma barra de navegação.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Barra de Aplicativos Simples

{{"demo": "pages/components/app-bar/ButtonAppBar.js", "bg": true}}

## Barra do site com menu

{{"demo": "pages/components/app-bar/MenuAppBar.js", "bg": true}}

## Barra do site com menu responsivo

{{"demo": "pages/components/app-bar/ResponsiveAppBar.js", "bg": true}}

## Barra de Aplicativos com campo de busca

Uma barra de pesquisa lateral

{{"demo": "pages/components/app-bar/SearchAppBar.js", "bg": true}}

## Barra do site com um campo de busca principal

Uma barra de pesquisa primária

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js", "bg": true}}

## Densa (apenas para desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js", "bg": true}}

## Proeminente

A prominent app bar.

{{"demo": "pages/components/app-bar/ProminentAppBar.js", "bg": true}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 400}}

## Fixed placement

When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. Here are 3 possible solutions:

1. Você pode usar `position="sticky"` ao invés de fixed. ⚠️ sticky não é suportado pelo IE11.
2. Você pode renderizar um segundo componente `<Toolbar />`:

```jsx
function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* conteúdo */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
```

3. Você pode usar o CSS `theme.mixins.toolbar`:

```jsx
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* conteúdo */}</Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}
```

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### Barra de aplicativos oculta

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true}}

### Barra de aplicativos elevada

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true}}

### Voltar ao topo

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true}}

### `useScrollTrigger([options]) => trigger`

#### Argumentos

1. `options` (_object_ [opcional]):

   - `options.disableHysteresis` (_bool_ [opcional]): Padrão `false`. Desabilita a histerese. Ignora a direção de rolagem ao determinar o valor de `trigger`.
   - `options.target` (_Node_ [opcional]): Padrão `window`.
   - `options.threshold` (_number_ [opcional]): Padrão `100`. Modifica o valor limite que aciona a `trigger` quando a barra de rolagem vertical cruzar ou chegar a este limite.

#### Retornos

`trigger`: Does the scroll position match the criteria?

#### Exemplos

```jsx
import useScrollTrigger from '@mui/material/useScrollTrigger';

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <div>Olá</div>
    </Slide>
  );
}
```

## Enable color on dark

Following the [Material Design guidelines](https://material.io/design/color/dark-theme.html), the `color` prop has no effect on the appearance of the app bar in dark mode. You can override this behavior by setting the `enableColorOnDark` prop to `true`.

{{"demo": "pages/components/app-bar/EnableColorOnDarkAppBar.js", "bg": true}}
