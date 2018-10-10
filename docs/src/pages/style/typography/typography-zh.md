---
components: Typography
---
# Typography

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

Too many type sizes and styles at once can spoil any layout. A [typographic scale](https://material.io/design/typography/#type-scale) has a limited set of type sizes that work well together along with the layout grid.

## General

The *Roboto* font will **not** be automatically loaded by Material-UI. The developer is responsible for loading all fonts used in their application. Roboto Font has a few easy ways to get started.

## Roboto Font CDN

Shown below is a sample link markup used to load the Roboto font from a CDN.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

## Install with npm

You can [install it](https://www.npmjs.com/package/typeface-roboto) by typing the below command in your terminal:

`npm install typeface-roboto --save`

Then, you can import it in your entry-point.

```js
import 'typeface-roboto';
```

For more info check out the [typeface](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto) project.

⚠️ Be careful when using this approach. Make sure your bundler doesn't eager load all the font variations (100/300/400/500/700/900, italic/regular, SVG/woff). Inlining all the font files can significantly increase the size of your bundle. Material-UI default typography configuration only relies on 300, 400 and 500 font weights.

## Component

{{"demo": "pages/style/typography/Types.js"}}

### Deprecated variants

{{"demo": "pages/style/typography/DeprecatedTypes.js"}}

## Theme

In some situations you might not be able to use the `Typography` component. Hopefully, you might be able to take advantage of the [`typography`](/customization/default-theme/?expend-path=$.typography) keys of the theme.

{{"demo": "pages/style/typography/TypographyTheme.js"}}

## Migration to typography v2

The material design specification changed concerning variant names and styles. To allow a smooth transition we kept old variants and restyled variants for backwards compatibility but we log deprecation warnings. We will remove the old typography variants in the next major release v4.0.0 (Q1 2019).

### Strategies

To make an immediate switch to typography v2 you can simply pass `useNextVariants: true` when calling `createMuiTheme`:

```js
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
```

or set `window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;` if you don't use the theme.

This will use new variants instead of old variants according to the following mapping:

```sh
display4 => h1
display3 => h2
display2 => h3
display1 => h4
headline => h5
title => h6
subheading => subtitle1
body2 => body1
body1 (default) => body2 (default)
```

Please note that this will log deprecation warnings if you use one of the old variants. We recommend you replace those old variants with the recommended variants to be prepared for the next major release. See [Themes](/customization/themes/) for more information about how to use a global theme.