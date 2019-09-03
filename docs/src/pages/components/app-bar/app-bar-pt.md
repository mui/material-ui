---
title: Componente App Bar (Barra de Aplicativos) para React
components: AppBar, Toolbar, Menu
---

# Barra de Aplicativos

<p class="description">A Barra de aplicativos exibe informações e ações relacionadas à tela atual.</p>

A [barra de aplicativos superior](https://material.io/design/components/app-bars-top.html) provê conteúdo e ações relacionados à tela atual. Ela é utilizada para a identidade visual, títulos de tela, navegação, e ações.

Ele pode se transformar em uma barra de ações contextual ou utilizado como uma barra de navegação.

## Simple App Bar

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## App Bar with a primary search field

A primary searchbar.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## App Bar with menu

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## App Bar with search field

A side searchbar.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Dense (desktop only)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Bottom App Bar

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrolling

You can use the `useScrollTrigger()` hook to respond to user scroll actions.

### Barra de Aplicativos oculta

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### Barra de aplicativos elevada

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Back to top

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