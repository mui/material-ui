# Couleur

<p class="description">Transmettre le sens à travers la couleur. Out of the box you get access to all colors in the Material Design spec.</p>

The Material Design [color system](https://material.io/design/color/) can be used to create a color theme that reflects your brand or style.

## Color system

### Important Terms

#### "Palette"

A palette is a collection of colors, i.e. hues and their shades. Material-UI provides all colors from the Material Design guidelines. [This color palette](#color-palette) has been designed with colors that work harmoniously with each other.

#### "Hue" & "Shade"

A single color within the palette is made up of a hue such as "red", and shade, such as "500". "red 50" is the lightest shade of red (*pink!*), while "red 900" is the darkest. In addition, most hues come with "accent" shades, prefixed with an `A`.

### Exemples

The Material Design color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors. They’ve been designed to work harmoniously with each other.

For instance, you can refer to complementary primary and accent colors (for example 'red 500' & 'purple A200'), like so:

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent = purple.A200; // #E040FB (alternative method)
```

### Color palette

Given a *HUE* (red, pink, etc.) and a *SHADE* (500, 600, etc.) you can import the color like this:

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideHeader": true}}

## Color tool

To test a [material.io/design/color](https://material.io/design/color/) color scheme with the Material-UI documentation, simply select colors using the palette and sliders below. Alternatively, you can enter hex values in the Primary and Secondary text fields.

{{"demo": "pages/customization/color/ColorTool.js", "hideHeader": true}}

The output shown in the color sample can be pasted directly into a [`createMuiTheme()`](/customization/themes/#createmuitheme-options-theme) function (to be used with [`MuiThemeProvider`](/customization/themes/#theme-provider)):

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

Only the `main` shades need be provided (unless you wish to further customize `light`, `dark` or `contrastText`), as the other colors will be calculated by `createMuiTheme()`, as described in the [Theme customization](/customization/palette/) section.

If you are using the default primary and / or secondary shades then by providing the color object, `createMuiTheme()` will use the appropriate shades from the material color for main, light and dark.

### Official color tool

The Material Design team has also built an awesome palette configuration tool: [material.io/tools/color](https://material.io/tools/color/). This can help you create a color palette for your UI, as well as measure the accessibility level of any color combination.

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336">
  <img src="/static/images/color/colorTool.png" alt="Official color tool" style="width: 574px" />
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

### Tools by the community

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/) Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/) A tool to generate themes for your Material-UI applications by just selecting the colors and having a live preview.
- [Material palette generator](https://material.io/inline-tools/color/): The Material palette generator can be used to generate a palette for any color you input.