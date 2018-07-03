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
documentation, simply select colors using the palette and slider.
Alternatively, you can enter hex values in the Primary and Secondary TextFields.

{{"demo": "pages/style/color/ColorTool.js", "hideHeader": true}}

The output can be fed directly to `createMuiTheme()` function:

```jsx
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f50b5',
    },
    secondary: {
      main: '#f44336',
    },
  },
});
```

## Color palette

This color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors. They’ve been designed to work harmoniously with each other.

{{"demo": "pages/style/color/Color.js", "hideHeader": true}}
