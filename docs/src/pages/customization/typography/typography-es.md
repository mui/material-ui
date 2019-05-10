# Tipografía

<p class="description">The theme provides a set of type sizes that work well together, and also with the layout grid.</p>

The following example demonstrates how to change the typography default values – in this case, the font family. If you want to learn more about typography, you can check out [the typography component](/components/typography/).

{{"demo": "pages/customization/typography/TypographyTheme.js"}}

## Font family

You can use the system font instead of the default Roboto font.

```js
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

## Self-host fonts

To self-host fonts, download the font files in `ttf`, `woff`, and/or `woff2` formats and import them into your code.

⚠️ This requires that you have a plugin or loader in your build process that can handle loading `ttf`, `woff`, and `woff2` files. Fonts will *not* be embedded within your bundle. They will be loaded from your webserver instead of a CDN.

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RalewayWoff2}) format('woff2')
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
```

Then, you can change the theme to use this new font. It requires use of the [`CssBaseline`](/components/css-baseline/) component to globally define Raleway as a font family.

```js
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-family': [raleway],
      },
    },
  },
});
```

## Font size

Material-UI uses `rem` units for the font size. The browser `<html>` element default font size is `16px`, but browsers have an option to change this value, so `rem` units allow us to accommodate the user's settings, resulting in a much better user experience. Users change font size settings for all kinds of reasons, from poor eyesight to choosing optimum settings for devices that can be vastly different in size and viewing distance.

To change the font-size of Material-UI you can provide a `fontSize` property. The default value is `14px`.

```js
const theme = createMuiTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});
```

The computed font size by the browser follows this mathematical equation:

![font-size](/static/images/font-size.gif) <!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

## HTML font size

You might want to change the `<html>` element default font size. For instance, when using the [10px simplification](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/). We provide a `htmlFontSize` theme property for this use case. It's telling Material-UI what's the font-size on the `<html>` element is. It's used to adjust the `rem` value so the calculated font-size always match the specification.

```js
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*You need to apply the above CSS on the html element of this page to see the below demo rendered correctly*

{{"demo": "pages/customization/typography/FontSizeTheme.js"}}

## Responsive font sizes

The typography variants properties map directly to the generated CSS. You can use [media queries](/customization/breakpoints/#api) inside them:

```js
const theme = createMuiTheme();

theme.typography.h1 = {
  fontSize: '3rem',
  '@media (min-width:600px)': {
    fontSize: '4.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
};
```

To automate this setup, you can use the [`responsiveFontSizes()`](/customization/themes/#responsivefontsizes-theme-options-theme) helper to make Typography font sizes in the theme responsive.

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideHeader": true}}

You can see this in action in the example below. adjust your browser's window size, and notice how the font size changes as the width crosses the different [breakpoints](/customization/breakpoints/):

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

## Fluid font sizes

To be done: [#15251](https://github.com/mui-org/material-ui/issues/15251).