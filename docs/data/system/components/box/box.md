---
productId: system
title: React Box component
components: Box
githubLabel: 'component: Box'
---

# Box

<p class="description">The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

The Box component is a generic container for grouping other components.
It's a fundamental building block when building with MUI component libraries—you can think of it as a `<div>` with special features (like access to your app's theme and the [`sx` prop](/system/getting-started/the-sx-prop/)).

## Basics

```jsx
import Box from '@mui/system/Box';
```

The Box component renders as a `<div>` by default, but you can swap in any other valid HTML tag or React component using the `component` prop.
The demo below replaces the `<div>` with a `<section>` element:

{{"demo": "BoxBasic.js", "defaultCodeOpen": true }}

:::info
The Box component differs from other containers available in Material UI and Joy UI because it's intended to be multipurpose—components like [Stack](/material-ui/react-stack/) and [Paper](/material-ui/react-paper/), by contrast, feature usage-specific props that make them ideal for certain use cases.
:::

## Component

### Using the sx prop

Use the [`sx` prop](/system/getting-started/the-sx-prop/) to quickly customize any Box instance using a superset of CSS with access to all the style functions and theme-aware properties exposed in the MUI System package.

{{"demo": "BoxSx.js", "defaultCodeOpen": true }}

### System props

As a CSS utility component, the Box supports all [MUI System properties](/system/properties/).
You can use them as prop directly on the component.

```jsx
<Box height={20} width={20} my={4} display="flex" alignItems="center" gap={4}>
```

## Create your own Box component

Use the `createBox()` utility to create your version of the Box component.
This is useful if you need to expose your container to a theme that's different from the default theme of the library you're working with:

```js
import { createBox, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const Box = createBox({ defaultTheme });

export default Box;
```
