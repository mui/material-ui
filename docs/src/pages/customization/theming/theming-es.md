# Temática

<p class="description">Personaliza Material-UI con tu tema. Puedes cambiar los colores, la tipogradía y mucho más.</p>

El tema especifica el color de los componentes, las obscuridad de las superficies, nivel de la sombra, opacidad apropiada de la tinta de los elementos, etc.

Los temas te permiten aplicar un tono consistente a tu aplicación. Le permite ** personalizar todos los aspectos de diseño ** de su proyecto para satisfacer las necesidades específicas de su negocio o marca.

Para promover una mayor coherencia entre las aplicaciones; claro y oscuro son los tipos de temas que están disponibles para elegir. Por defecto, los componentes utilizan el tema de tipo claro.

## Proveedor de Tema

Si desea personalizar el tema, deberá de usar el componente ` ThemeProvider ` para inyectar un tema en su aplicación. Sin embargo, esto es opcional; Los componentes de material-UI vienen con un tema predeterminado.

Puede aprender más acerca de esto en la [sección API](/styles/api/#themeprovider). Puede aprender más acerca de esto en la [sección API](/styles/api/#themeprovider).

## Variables de configuración de Tema

Cambiar las variables de configuración del tema es la forma más efectiva de adaptar Material-UI a sus necesidades. Las siguientes secciones cubren las variables de tema más importantes:

- [Paleta](/customization/palette/)
- [Tipografía](/customization/typography/)
- [Espaciado](/customization/spacing/)
- [Separaciones](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globales](/customization/globals/)

Puede consultar la sección de [Tema predeterminado](/customization/default-theme/) para ver el tema completo.

### Variables personalizadas

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider), it can be convenient to add additional variables to the theme so you can use them everywhere. Por ejemplo:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Accediendo al tema en un componente

Usted [ puede acceder ](/styles/advanced/#accessing-the-theme-in-a-component) a las variables del tema dentro de sus componentes React.

## Anidando el tema

Usted [ puedes anidar ](/styles/advanced/#theme-nesting) multiples proveedores de tema.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

El tema interno **sobrescribirá** el tema exterior. Puede ampliar el tema externo proporcionando una función:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### Sobre el rendimiento

Las implicaciones de rendimiento de anidar el componente ` ThemeProvider ` están vinculados al trabajo de JSS detrás de escena. El punto principal a entender es que el CSS inyectado se almacena en caché con la siguiente tupla ` (styles, theme) `.

- `theme`: Si proporciona un tema nuevo en cada renderizado, un nuevo objeto CSS será calculado e inyectado. Tanto para la consistencia de la interfaz de usuario, como para el rendimiento, es mejor renderizar un número limitado de objetos de tema.
- ` styles`: Cuanto más grande es el objeto de estilos, más trabajo se necesitará.

## API

### `createMuiTheme(options, ...args) => theme`

Generar un tema en base a las opciones recibidas.

#### Argumentos

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Devuelve

`theme` (*Object*): A complete, ready to use theme object.

#### Ejemplos

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
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

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Argumentos

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

- Array of [breakpoints](/customization/breakpoints/) (identifiers). `breakpoints` (*Array\<String\>* [optional]): Default to `['sm', 'md', 'lg']`.
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
- `variants` (*Array\<String\>* [optional]): Default to all. The typography variants to handle.

#### Regresa

`theme` (*Object*): The new theme with a responsive typography.

#### Ejemplos

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Requirements

Using `unstable_createMuiStrictModeTheme` restricts the usage of some of our components.

##### `component` prop

The component used in the `component` prop of the following components need to forward their ref:

- [`Collapse`](/api/collapse/)

Otherwise you'll encounter `Error: Function component cannot be given refs`. See also: [Composition: Caveat with refs](/guides/composition/#caveat-with-refs).

##### `children` prop

The `children` of the following components need to forward their ref:

- [`Fade`](/api/fade/)
- [`Grow`](/api/grow/)
- [`Zoom`](/api/zoom/)

```diff
-function TabPanel(props) {
+const TabPanel = React.forwardRef(function TabPanel(props, ref) {
  return <div role="tabpanel" {...props} ref={ref} />;
-}
+});

function Tabs() {
  return <Fade><TabPanel>...</TabPanel></Fade>;
}
```

Otherwise the component will not animate properly and you'll encounter the warning that `Function components cannot be given refs`.

#### Disable StrictMode compatibility partially

If you still see `Error: Function component cannot be given refs` then you're probably using a third-party component for which the previously mentioned fixes aren't applicable. You can fix this by applying `disableStrictModeCompat`. You'll see deprecation warnings again but these are only warnings while `Function component cannot be given refs` actually breaks the documented behavior of our components.

```diff
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

function ThirdPartyTabPanel(props) {
  return <div {...props} role="tabpanel">
}

const theme = unstable_createMuiStrictModeTheme();

function Fade() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>

-        <Fade>
+        <Fade disableStrictModeCompat>
          <ThirdPartyTabPanel />
        </Fade>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```

#### Argumentos

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.
2. `...args` (*Array*): Deep merge the arguments with the about to be returned theme.

#### Regresa

`theme` (*Object*): A complete, ready to use theme object.

#### Ejemplos

```js
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
```