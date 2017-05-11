# Color

[Color](https://material.io/guidelines/style/color.html) in material design is inspired by bold hues juxtaposed with muted environments, deep shadows, and bright highlights.

## Color palette

### Important Terms

#### Hues/Shades

A hue/shade is a single color within a palette.

#### Palette

A palette is a collection of hues. By default, Material-UI ships with all palettes from the material design spec built in. Valid palettes include:

### Examples

This color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors.
They’ve been designed to work harmoniously with each other.

For instance, you can use the red color like so:
```js
import { red, purple } from 'material-ui/styles/colors';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
```

{{demo='pages/style/Color.js'}}

## Color system

In Material Design, a **primary color** refers to a color that appears most frequently in your app. A **secondary color** refers to a color used to accent key parts of your UI.

Using colors from the Material Design palette is optional.
You can learn more about it following [that link](https://material.io/guidelines/style/color.html#color-color-system).

## Color schemes

These are links to some of the awesome tools that can be used to generate palettes:

- [www.materialpalette.com](https://www.materialpalette.com)
- [mcg.mbitson.com/](http://mcg.mbitson.com/)
