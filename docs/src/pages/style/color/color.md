# Color

<p class="description">Convey meaning through color. Out of the box you get access to all colors in the Material Design spec.</p>

[Color](https://material.io/design/color/) in material design is inspired by bold hues juxtaposed with muted environments, deep shadows, and bright highlights.

## Color system

The Material Design color system can be used to create a color theme that reflects your brand or style.

### Important Terms

#### "Palette"

A palette is a collection of colors, i.e. hues and their shades. Material-UI provides all colors from the Material Design guidelines.

#### "Hue" & "Shade"

A single color within the palette is made up of a hue such as "red", and shade, such as "500".
"red 50" is the lightest shade of red (*pink!*), while "red 900" is the darkest.
In addition, most hues come with "accent" shades, prefixed with an `A`.

### Examples

The Material Design color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors.
They’ve been designed to work harmoniously with each other.

For instance, you can refer to complementary primary and accent colors (for example 'red 500' & 'purple A200'), like so:

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent2 = purple.A200; // #E040FB (alternative method)
```

## Color tool

To test a [material.io/color](https://material.io/color) color scheme with the Material-UI
documentation, simply select colors using the palette and sliders below.
Alternatively, you can enter hex values in the Primary and Secondary text fields.

{{"demo": "pages/style/color/ColorTool.js", "hideHeader": true}}

The output shown in the color sample can be pasted directly into a [`createMuiTheme()`](/customization/themes#createmuitheme-options-theme) function (to be used with [`MuiThemeProvider`](/customization/themes#theme-provider)):

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});
```

Only the `main` shades need be provided (unless you wish to further customise `light`, `dark` or `contrastText`), as the other colors will be calculated by `createMuiTheme()`, as described in the [Theme customization](/customization/themes#palette) section.

If you are using the default primary and / or secondary shades then by providing the color object, `createMuiTheme()` will use the appropriate shades from the material color for main, light and dark.

### Material color tool

The Material Design team has also built an awesome palette configuration tool: [material.io/tools/color](https://material.io/tools/color/).
This can help you create a color palette for your UI, as well as measure the accessibility level of any color combination.

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336">
  <img src="/static/images/color/colorTool.png" style="width: 574px" />
</a>

The output can be fed into `createMuiTheme()` function:

```jsx
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

## Color palette

This color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors. They’ve been designed to work harmoniously with each other.

{{"demo": "pages/style/color/Color.js", "hideHeader": true}}
