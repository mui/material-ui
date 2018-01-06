# Color

[Color](https://material.io/guidelines/style/color.html) in material design is inspired by bold hues juxtaposed with muted environments, deep shadows, and bright highlights.

## Color palette

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
import { red, purple } from 'material-ui/colors';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent2 = purple.A200; // #E040FB (alternative method)
```

### Full Palette
{{"demo": "pages/style/Color.js"}}

## Tools

These are some of the awesome tools that can be used to generate palettes:

- [https://material.io/color](https://material.io/color)
- [www.materialpalette.com](https://www.materialpalette.com)
- [mcg.mbitson.com](http://mcg.mbitson.com)
