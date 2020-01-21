---
components: CssBaseline
---

# Base de CSS

<p class="description">Material-UI provee un componente llamado CssBaseline como un punto de partida elegante, simple y consistente para empezar a desarrollar.</p>

Tal vez tengas familiaridad con [normalize.css](https://github.com/necolas/normalize.css), una colección de atributos de estilos normalizados para elementos HTML.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}
```

## Enfoque

### Página

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- Se elimina el margen en todos los navegadores.
- Se aplica el color de fondo predeterminado de Material Design. It's using [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) for standard devices and a white background for print devices.

### Disposición

- La propiedad `box-sizing` se establece globalmente en el elemento `<html>` con el valor `border-box`. Cada elemento, incluyendo `*::before` y `*::after`, es declarado para heredar ésta propiedad, la cual asegura que el ancho declarado del elemento nunca sea excedido gracias al relleno o al borde.

### Tipografía

- No se declara ningún tamaño de fuente de base en el elemento `<html>`, pero se asume 16px (el valor predeterminado del navegador). Puedes aprender más acerca de las implicaciones de cambiar el tamaño de fuente predeterminado de `<html>`, en la página [de documentación del tema](/customization/typography/#typography-html-font-size).
- Set the `theme.typography.body2` style on the `<body>` element.
- Set the font-weight to "bolder" for the `<b>` and `<strong>` elements. Bolder is one font weight heavier than the parent element (among the available weights of the font).
- El antialiasing de fuentes está habilitado para una mejor visualización de la fuente Roboto.