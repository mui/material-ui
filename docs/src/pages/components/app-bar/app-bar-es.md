---
title: 'Componente React: App Bar'
components: AppBar, Toolbar, Menu
---

# App Bar

<p class="description">La App Bar muestra información y acciones disponibles en la pantalla actual.</p>

La [top App Bar](https://material.io/design/components/app-bars-top.html) provee contenido y acciones relacionados a la pantalla actual. Es usada para mostrar logotipos de marcas, títulos de pantalla, navegación y acciones.

Puede transformarse en una barra de acción contextual o ser usada como una barra de navegación.

## App Bar Simple

{{"demo": "pages/components/app-bar/ButtonAppBar.js"}}

## App Bar con un campo de búsqueda principal

Un campo de búsqueda principal.

{{"demo": "pages/components/app-bar/PrimarySearchAppBar.js"}}

## App Bar con menú

{{"demo": "pages/components/app-bar/MenuAppBar.js"}}

## App Bar con campo de búsqueda

Un campo de búsqueda al costado.

{{"demo": "pages/components/app-bar/SearchAppBar.js"}}

## Denso (sólo escritorio)

{{"demo": "pages/components/app-bar/DenseAppBar.js"}}

## Prominente

Un App Bar prominente.

{{"demo": "pages/components/app-bar/ProminentAppBar.js"}}

## App bar en pie de página

{{"demo": "pages/components/app-bar/BottomAppBar.js", "iframe": true, "maxWidth": 500}}

## Fixed placement

Cuando renderizas la posición del app bar fijo, la dimensión de los elementos no tiene impacto sobre el resto de la página. Esto puede causar que alguna parte de tu contenido no sea visible, detrás del app bar. Aquí hay 3 posibles soluciones:

1. Puedes usar `position = "sticky"` en lugar de fijo. ⚠️ sticky no es compatible con IE 11.
2. Puedes renderizar un segundo componente `<Toolbar />`:

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

3. Puede usar `theme.mixins.toolbar` CSS:

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

## Desplazamiento

Puede usar el `useScrollTrigger ()` para responder a las acciones de desplazamiento del usuario.

### Ocultar App bar

La barra de aplicaciones se oculta al desplazarse hacia abajo para dejar más espacio para leer.

{{"demo": "pages/components/app-bar/HideAppBar.js", "iframe": true, "maxWidth": 500}}

### Elevar App Bar

La barra de la aplicación se eleva al desplazarse para comunicar que el usuario no está en la parte superior de la página.

{{"demo": "pages/components/app-bar/ElevateAppBar.js", "iframe": true, "maxWidth": 500}}

### Ir arriba

Aparece un botón de acción flotante al desplazarse para que sea fácil volver a la parte superior de la página.

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