---
productId: system
title: React Box component
components: Box
githubLabel: 'component: Box'
---

# Box

<p class="description">The Box component serves as a wrapper component for most of the CSS utility needs.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

The Box component is a generic container for grouping other components.
It's a fundamental building block when building with MUI component libraries—you can think of it as a `<div>` with special features (like access to your app's theme and the [`sx` prop](/system/getting-started/the-sx-prop/)).

## Basics

```jsx
import { Box } from '@mui/system';
```

The Box component render as a `<div>` by default, but you can swap in any other valid HTML tag or React component using the `component` prop.
The demo below replaces the `<div>` with a `<section>` element:

{{"demo": "BoxBasic.js", "defaultCodeOpen": true }}

The Box component differs from other general container-like components available in packages such as Material UI and Joy UI because it is entirely agnostic. It has no usage-specific props as some of these other components might have.

## Component

### Using the sx prop

Using the [`sx` prop](/system/getting-started/the-sx-prop/), you can quickly customize any Box instance using a superset of CSS with access to all the style functions and theme-aware properties exposed in the MUI System package.

{{"demo": "BoxSx.js", "defaultCodeOpen": true }}

### System props

As a CSS utility component, the Box supports all [MUI System properties](/system/properties/).
You can use them as prop directly on the component.

```jsx
<Box mt={2}>
```

## Create your own Box component

Use the `createBox()` utility to create your version of the Box component.
That's interesting to do if you want to expose it to a theme that's different from the default theme of the library you're working with:

```js
import { createBox, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const Box = createBox({ defaultTheme });

export default Box;
```
