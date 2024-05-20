# Theming

<p class="description">Personaliza la interfaz de usuario de Material con tu tema. Puedes cambiar los colores, la tipografía y mucho más.</p>

El tema especifica el color de los componentes, la oscuridad de las superficies, el nivel de sombra, la opacidad adecuada de los elementos, etc.

Los temas te permiten aplicar un tono consistente a tu aplicación. Le permite **personalizar todos los aspectos de diseño** de su proyecto para satisfacer las necesidades específicas de su negocio o marca.

Para promover una mayor coherencia entre las aplicaciones, se encuentran disponibles tipos de temas claros y oscuros para elegir. De forma predeterminada, los componentes utilizan el tipo de tema claro.

## Theme provider

Si deseas personalizar el tema, necesitas usar el componente `ThemeProvider` para inyectar un tema en tu aplicación. 
Sin embargo, esto es opcional; los componentes de Material UI vienen con un tema predeterminado.

`ThemeProvider` se basa en la [característica de contexto de React](https://react.dev/learn/passing-data-deeply-with-context) para pasar el tema a los componentes, por lo que debes asegurarte de que `ThemeProvider` sea un padre de los componentes que estás tratando de personalizar. Puedes obtener más información sobre esto en [la sección API](#themeprovider).

## Theme configuration variables

Modificar las variables de configuración del tema es la forma más eficaz de adaptar la interfaz de usuario del material a sus necesidades.  Las siguientes secciones cubren las variables temáticas más importantes:

- [`.palette`](/material-ui/customization/palette/)
- [`.typography`](/material-ui/customization/typography/)
- [`.spacing`](/material-ui/customization/spacing/)
- [`.breakpoints`](/material-ui/customization/breakpoints/)
- [`.zIndex`](/material-ui/customization/z-index/)
- [`.transitions`](/material-ui/customization/transitions/)
- [`.components`](/material-ui/customization/theme-components/)

Puedes consultar la [sección de tema predeterminado](https://mui.com/material-ui/customization/default-theme/) para ver el tema predeterminado en su totalidad.

### Custom variables

Cuando utilizas el tema de Material UI con [MUI System](https://mui.com/system/getting-started/) o [cualquier otra solución de estilos](https://mui.com/material-ui/integrations/interoperability/), puede ser conveniente agregar variables adicionales al tema para que puedas usarlas en todas partes. Por ejemplo:

```jsx
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
```

:::warning
`vars` es un campo privado para las [variables de tema de CSS](https://mui.com/material-ui/experimental-api/css-theme-variables/overview/). Generará un error si intentas asignarle un valor:

```jsx
createTheme({
  vars: { ... }, // ❌ error
})
```

:::

### TypeScript

Debes utilizar la [ampliación de módulos](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) para agregar nuevas variables a `Theme` y `ThemeOptions`.

```tsx
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
```

{{"demo": "CustomStyles.js"}}

agregue variables adicionales a `theme.palette`, consulte [personalización de la paleta](https://mui.com/material-ui/customization/palette/)

## Theme builder

<video autoPlay muted loop width="320">
  <source src="/static/studies.mp4" type="video/mp4" >
</video>

La comunidad ha creado excelentes herramientas para crear un tema:

- [mui-theme-creator:](https://zenoo.github.io/mui-theme-creator/)
Una herramienta para ayudar a diseñar y personalizar temas para la biblioteca de componentes de Material UI. Incluye plantillas básicas de sitios para mostrar varios componentes y cómo se ven afectados por el tema.
- [Material palette generator:](https://m2.material.io/inline-tools/color/)  El generador de paletas de Material se puede utilizar para generar una paleta para cualquier color que ingreses.

## Accessing the theme in a component

Puedes acceder a las variables del tema dentro de tus componentes funcionales de React utilizando el hook `useTheme`:

```jsx
import { useTheme } from '@mui/material/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

## Nesting the theme

[puedes anidar](https://mui.com/system/styles/advanced/#theme-nesting) múltiples proveedores de temas.

{{"demo": "ThemeNesting.js"}}

El tema interno **sobrescribirá** el tema externo. 
Puedes extender el tema externo proporcionando una función:

{{"demo": "ThemeNestingExtend.js"}}

## API

### `createTheme(options, ...args) => theme`

Genera un tema basado en las opciones recibidas. Luego, pásalo como una prop a [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#themeprovider).

#### Argumentos

1. `options` (object): Toma un objeto de tema incompleto y agrega las partes faltantes.
2. `...args` (object[]): Fusiona profundamente los argumentos con el tema que está a punto de ser retornado.

:::warning
Solo el primer argumento (`options`) es procesado por la función `createTheme`. Si deseas realmente fusionar las opciones de dos temas y crear uno nuevo basado en ellas, es posible que quieras realizar una fusión profunda de las dos opciones y proporcionarlas como primer argumento a la función `createTheme`.
:::

```js
import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

const theme = createTheme(deepmerge(options1, options2));
```

#### Returns

`theme` (_object_): A complete, ready-to-use theme object.

#### Examples

```js
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

#### Theme composition: using theme options to define other options

When the value for a theme option is dependent on another theme option, you should compose the theme in steps.

```js
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});
```

Think of creating a theme as a two-step composition process: first, you define the basic design options; then, you'll use these design options to compose other options.

**WARNING**: `theme.vars` is a private field used for CSS variables support. Please use another name for a custom object.

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Arguments

1. `theme` (_object_): The theme object to enhance.
2. `options` (_object_ [optional]):

- `breakpoints` (_array\<string\>_ [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/material-ui/customization/breakpoints/) (identifiers).
- `disableAlign` (_bool_ [optional]): Default to `false`. Whether font sizes change slightly so line
  heights are preserved and align to Material Design's 4px line height grid.
  This requires a unitless line height in the theme's styles.
- `factor` (_number_ [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens.
  The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
- `variants` (_array\<string\>_ [optional]): Default to all. The typography variants to handle.

#### Returns

`theme` (_object_): The new theme with a responsive typography.

#### Examples

```js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**ADVERTENCIA**: No uses este método en producción.

Genera un tema que reduce la cantidad de advertencias dentro de [`React.StrictMode`](https://react.dev/reference/react/StrictMode) como `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Actualmente, `unstable_createMuiStrictModeTheme` no añade requisitos adicionales.

#### Arguments

1. `options` (_object_): Toma un objeto de tema incompleto y agrega las partes faltantes.
2. `...args` (_object[]_): Fusiona profundamente los argumentos con el tema que está a punto de ser retornado.

#### Returns

`theme` (_object_): A complete, ready-to-use theme object.

#### Examples

```js
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>
  );
}
```

### `ThemeProvider`

Este componente toma una prop de `theme` y la aplica a todo el árbol de React que envuelve. 
Preferentemente, debe usarse en la raíz de tu árbol de componentes.

#### Props

| Name             | Type                                     | Description                                                                                                                                                                                               |
| :--------------- | :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children&nbsp;\* | node                                     | Your component tree.                                                                                                                                                                                      |
| theme&nbsp;\*    | union:&nbsp;object&nbsp;&#124;&nbsp;func | A theme object, usually the result of [`createTheme()`](#createtheme-options-args-theme). The provided theme will be merged with the default theme. You can provide a function to extend the outer theme. |

#### Examples

```jsx
import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```
