# Temática

<p class="description">Personaliza Material-UI con tu tema. Puedes cambiar los colores, la tipogradía y mucho más.</p>

El tema especifica el color de los componentes, las obscuridad de las superficies, nivel de la sombra, opacidad apropiada de la tinta de los elementos, etc.

Los temas te permiten aplicar un tono consistente a tu aplicación. Le permite ** personalizar todos los aspectos de diseño ** de su proyecto para satisfacer las necesidades específicas de su negocio o marca.

Para promover una mayor coherencia entre las aplicaciones; claro y oscuro son los tipos de temas que están disponibles para elegir. Por defecto, los componentes utilizan el tema de tipo claro.

## Proveedor de Tema

Si desea personalizar el tema, deberá de usar el componente ` ThemeProvider ` para inyectar un tema en su aplicación. Sin embargo, esto es opcional; Los componentes de material-UI vienen con un tema predeterminado.

`ThemeProvider` se basa en la característica de contexto de React para pasar el tema hacia los componentes que estén por dejabo. así que tendrá que asegurar que `ThemeProvider` sea un componente padre de los componentes que trata de personalizar. Puede aprender más acerca de esto en la [sección API](/styles/api/#themeprovider).

## Variables de configuración de Tema

Cambiar las variables de configuración del tema es la forma más efectiva de adaptar Material-UI a sus necesidades. Las siguientes secciones cubren las variables de tema más importantes:

- [Paleta](/customization/palette/)
- [Tipografía](/customization/typography/)
- [Espaciado](/customization/spacing/)
- [Puntos de interrupción](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globales](/customization/globals/)

Puede consultar la sección de [Tema predeterminado](/customization/default-theme/) para ver el tema completo.

### Variables personalizadas

Al usar el tema de Material-UI con nuestra [solución de estilo](/styles/basics/) o [ cualquier otro ](/guides/interoperability/#themeprovider). Puede ser conveniente agregar variables adicionales al tema para que pueda usarlas en cualquier lugar. Por ejemplo:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Accediendo al tema en un componente

Usted [ puede acceder ](/styles/advanced/#accessing-the-theme-in-a-component) a las variables del tema dentro de sus componentes React.

## Anidando el tema

Usted [ puedes anidar ](/styles/advanced/#theme-nesting) multiples proveedores de tema.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

El tema interno **sobreescribirá** el tema exterior. Puede ampliar el tema externo proporcionando una función:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### A note on performance

Las implicaciones de rendimiento de anidar el componente ` ThemeProvider ` están vinculados al trabajo de JSS detrás de escena. El punto principal a entender es que el CSS inyectado se almacena en caché con la siguiente tupla ` (styles, theme) `.

- `theme`: Si proporciona un tema nuevo en cada renderizado, un nuevo objeto CSS será calculado e inyectado. Tanto para la consistencia de la interfaz de usuario, como para el rendimiento, es mejor renderizar un número limitado de objetos de tema.
- ` styles`: Cuanto más grande es el objeto de estilos, más trabajo se necesitará.

## API

### `createMuiTheme(options) => theme`

Generate a theme base on the options received.

#### Argumentos

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.

#### Devuelve

`theme` (*Object*): A complete, ready to use theme object.

#### Ejemplos

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Argumentos

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

- `breakpoints` (*Array<string>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
- `variants` (*Array<string>* [optional]): Default to all. The typography variants to handle.

#### Devuelve

`theme` (*Object*): The new theme with a responsive typography.

#### Ejemplos

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```