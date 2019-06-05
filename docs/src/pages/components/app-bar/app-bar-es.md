---
title: 'Componente React: App Bar'
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">La App Bar muestra información y acciones disponibles en la pantalla actual.</p>

La [top App Bar](https://material.io/design/components/app-bars-top.html) provee contenido y acciones relacionados a la pantalla actual. Es usada para mostrar logotipos de marcas, títulos de pantalla, navegación y acciones.

Puede transformarse en una barra de acción contextual o ser usada como una barra de navegación.

## App bar con botones

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## App bar simple

{{"demo": "pages/components/app-bar/SimpleAppBar.js"}}

## App bar con un campo de búsqueda principal

Una barra de búsqueda principal.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## App bar con un menú

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## App bar con un campo de búsqueda

Barra de búsqueda secundaria.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## App bar densa (solo en desktop)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## App bar en pie de página

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Scrolling

### Hide App Bar

An App Bar that hides on scroll.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": "true", "maxWidth": 500}}

### Elevate App Bar

An App Bar that elevates on scroll.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": "true", "maxWidth": 500}}

### `useScrollTrigger([options]) => trigger`

#### Arguments

1. `options` (*Object* [optional]):
    
    - `options.disableHysteresis` (*Boolean* [optional]): Defaults to `false`. Disable the hysteresis. Ignore the scroll direction when determining the `trigger` value.
    - `options.target` (*Node* [optional]): Defaults to `window`.
    - `options.threshold` (*Number* [optional]): Defaults to `100`. Change the `trigger` value when the vertical scroll strictly crosses this threshold (exclusive).

#### Returns

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