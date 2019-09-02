---
title: 'Componente React: App Bar'
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">La App Bar muestra información y acciones disponibles en la pantalla actual.</p>

La [top App Bar](https://material.io/design/components/app-bars-top.html) provee contenido y acciones relacionados a la pantalla actual. Es usada para mostrar logotipos de marcas, títulos de pantalla, navegación y acciones.

Puede transformarse en una barra de acción contextual o ser usada como una barra de navegación.

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

### Ocultar App bar

The app bar hides on scroll down to leave more space for reading.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### Elevar App Bar

The app bar elevates on scroll to communicate that the user is not at the top of the page.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Back to top

A floating action buttons appears on scroll to make it easy to get back to the top of the page.

{{"demo": "pages/components/app-bar/BackToTop.js", "iframe": true, "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Argumentos

1. `options` (*Object* [optional]):

- `options.disableHysteresis` (*Boolean* [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
- `options.target` (*Node* [optional]): Defaults to `window`.
- `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

#### Devuelve

`trigger`: Does the scroll position match the criteria?

#### Ejemplos

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