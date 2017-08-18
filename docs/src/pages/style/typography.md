---
components: Typography
---

# Typography

Too many type sizes and styles at once can wreck any layout.
A [typographic scale](https://material.google.com/style/typography.html#typography-styles) has a limited set of type sizes that work well together along with the layout grid.

## General

The *Roboto* font will **not** be automatically loaded by Material-UI.
The developer is responsible for loading all fonts used in their application.
Roboto Font has a few easy ways to get started.

## Roboto Font CDN

Shown below is a sample link markup used to load the Roboto font from a CDN.
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```
## Install with [npm](https://www.npmjs.com/)

You can install it by typing the below command in your terminal:

`npm install typeface-roboto --save`

Then, you can import it in your entrypoint.

```js
import 'typeface-roboto'
```
For more info checkout the [typeface](https://www.npmjs.com/package/typeface-roboto) project.

## Component

{{demo='pages/style/Typography.js'}}

## CSS in JS

In some situation you might not be able to use the `Typography` component.
Hopefully, you might be able to take advantage of the `typography` keys of the theme.

{{demo='pages/style/TypographyTheme.js'}}
