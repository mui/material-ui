# Color

[Color](https://material.io/guidelines/style/color.html) in material design is inspired by bold hues juxtaposed with muted environments, deep shadows, and bright highlights.

## Color system

### Important Terms

#### "Palette"

A palette is a collection of colors, i.e. hues and their shades. Material-UI provides all colors from the Material Design guidelines.

#### "Hue" & "Shade"

A single color within the palette is made up of a hue such as "red", and shade, such as "500".
"red 50" is the lightest shade of red (*pink!*), while "red 900" is the darkest.
In addition, most hues come with "accent" shades, prefixed wih `A`.

### Examples

The Material Design color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors.
They’ve been designed to work harmoniously with each other.

For instance, you can refer to complementary primary and accent colors (for example 'red 500' & 'purple A200'), like so:

```js
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent2 = purple.A200; // #E040FB (alternative method)
```

## Color tool

The Material Design team has built an awesome palette configuration tool: [material.io/color](https://material.io/color).
It will help you create a color palette for your UI, as well as measure the accessibility level of any color combination.

<a href="https://material.io/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336">
  <img src="/static/images/color/colorTool.png" style="width: 574px" />
</a>

The output can be fed directly to `createMuiTheme()` function:

```jsx
import { createMuiTheme } from 'material-ui/styles';

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

{{"demo": "pages/style/color/Color.js"}}
