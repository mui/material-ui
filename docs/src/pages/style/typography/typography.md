---
components: Typography
---

# Typography

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

Too many type sizes and styles at once can spoil any layout.
A [typographic scale](https://material.io/design/typography/#type-scale) has a limited set of type sizes that work well together along with the layout grid.

## General

The *Roboto* font will **not** be automatically loaded by Material-UI.
The developer is responsible for loading all fonts used in their application.
Roboto Font has a few easy ways to get started.

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

⚠️ Be careful when using this approach.
Make sure your bundler doesn't eager load all the font variations (100/300/400/500/700/900, italic/regular, SVG/woff).
Inlining all the font files can significantly increase the size of your bundle.
Material-UI default typography configuration only relies on 300, 400 and 500 font weights.

## Component

{{"demo": "pages/style/typography/Types.js"}}

### Deprecated variants

{{"demo": "pages/style/typography/DeprecatedTypes.js"}}

## Theme

In some situations you might not be able to use the `Typography` component.
Hopefully, you might be able to take advantage of the [`typography`](/customization/default-theme/?expend-path=$.typography) keys of the theme.

{{"demo": "pages/style/typography/TypographyTheme.js"}}

## Migration to typography v2

The material design specification changed concerning variant names and styles. To allow
a smooth transition we kept old variants and restyled variants for backwards compatibility
but will log deprecation warnings. We will remove the old variants with our next
major release.

### Strategies

To make an immediate switch to typography v2 you can simply pass `useNextVariants: true` when
calling `createMuiTheme`:
```js
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
```

This will use new variants instead of old variants according to the following mapping:

```json
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

Please note that this will still log deprecation warnings if you use one of the variants.
We recommend you replace those old variants with the recommended variants to be prepared
for the next major release.

See [Themes](/customization/themes/) for more information about how to use a global theme.

### Deprecation warnings for v4.0.0

Deprecation warnings are logged when:
- `NODE_ENV` is not strictly equal to `production`
- Regardless of whether you directly use the `Typography` component with a deprecated variant or another component
  has a `Typography` component with a deprecated variant
- You override the style of a deprecated variant with `createMuiTheme`
- You override the style of a restyled variant without `useNextVariants` with `createMuiTheme`
- Variants are considered deprecated if:
  - They will be removed in the next major release. This includes: display4, display3, display2, display1, headline, title, subheading
  - They will be restyled and `useNextVariants` is falsy. This includes: body2, body1, caption, button

In some cases the deprecation warnings can break your test suite which might be inconvenient.
In those cases you can set the environment variable `MUI_SUPPRESS_DEPRECATION_WARNINGS` to a truthy value.
Passing `suppressDeprecationWarnings: true` to the typography options in `createMuiTheme` is equivalent.
