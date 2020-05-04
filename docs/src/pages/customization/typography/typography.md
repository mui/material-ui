# Typography

<p class="description">The theme provides a set of type sizes that work well together, and also with the layout grid.</p>

## Font family

You can change the font family with the `theme.typography.fontFamily` property.

For instance, this demo uses the system font instead of the default Roboto font:

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

### Self-hosted fonts

To self-host fonts, download the font files in `ttf`, `woff`, and/or `woff2` formats and import them into your code.

⚠️ This requires that you have a plugin or loader in your build process that can handle loading `ttf`, `woff`, and
`woff2` files. Fonts will _not_ be embedded within your bundle. They will be loaded from your webserver instead of a
CDN.

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
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
```

Next, you need to change the theme to use this new font.
In order to globally define Raleway as a font face, the [`CssBaseline`](/components/css-baseline/) component can be used (or any other CSS solution of your choice).

```jsx
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
```

## Font size

Material-UI uses `rem` units for the font size.
The browser `<html>` element default font size is `16px`, but browsers have an option to change this value,
so `rem` units allow us to accommodate the user's settings, resulting in a better accessibility support.
Users change font size settings for all kinds of reasons, from poor eyesight to choosing optimum settings
for devices that can be vastly different in size and viewing distance.

To change the font-size of Material-UI you can provide a `fontSize` property.
The default value is `14px`.

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

![font-size](/static/images/font-size.gif)

<!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

### Responsive font sizes

The typography variants properties map directly to the generated CSS.
You can use [media queries](/customization/breakpoints/#api) inside them:

```js
const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
```

{{"demo": "pages/customization/typography/CustomResponsiveFontSizes.js"}}

To automate this setup, you can use the [`responsiveFontSizes()`](/customization/theming/#responsivefontsizes-theme-options-theme) helper to make Typography font sizes in the theme responsive.

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideToolbar": true}}

You can see this in action in the example below. adjust your browser's window size, and notice how the font size changes as the width crosses the different [breakpoints](/customization/breakpoints/):

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

### Fluid font sizes

To be done: [#15251](https://github.com/mui-org/material-ui/issues/15251).

### HTML font size

You might want to change the `<html>` element default font size. For instance, when using the [10px simplification](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).

> ⚠️ Changing the font size can harm accessibility ♿️. Most browsers agreed on the default size of 16 pixels, but the user can change it. For instance, someone with an impaired vision could have set their browser’s default font size to something larger.

An `htmlFontSize` theme property is provided for this use case,
which tells Material-UI what the font-size on the `<html>` element is.
This is used to adjust the `rem` value so the calculated font-size always match the specification.

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

## Variants

The typography object comes with [13 variants](/components/typography/#component) by default:

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- subtitle2
- body1
- body2
- button
- caption
- overline

Each of these variants can be customized individually:

```js
const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

{{"demo": "pages/customization/typography/TypographyVariants.js"}}

## Default values

You can explore the default values of the typography using [the theme explorer](/customization/default-theme/?expand-path=$.typography) or by opening the dev tools console on this page (`window.theme.typography`).
