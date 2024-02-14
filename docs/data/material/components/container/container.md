---
productId: material-ui
title: React Container component
components: Container
githubLabel: 'component: Container'
---

# Container

<p class="description">The Container component centers primary layout elements with a fluid or fixed width.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

The Container component is a generic layout container for centering the main content of a page.
Containers can have a [fluid](#fluid-width) or [fixed](#fixed-width) width.

### Usage

The Container is meant to center the primary elements of your app.
It should sit near the app's `<body>` tag in the DOM tree.
Though Containers _can_ be nested, it's rare for a layout to call for nested Container components—consider using the [Box](/material-ui/react-box/) and [Stack](/material-ui/react-stack/) components instead for more generic wrappers inside of a Container.

## Basics

```jsx
import Container from '@mui/material/Container';
```

### Fluid width

By default, the Container grows and shrinks fluidly to match the size of the viewport.
Use the `maxWidth` prop to set the maximum size that the Container can grow: `'xs'`, `'sm'`, `'md'`, `'lg'`, or `'xl'`.

{{"demo": "SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

### Fixed width

If you're working with designs for a fixed set of viewport sizes (instead of accommodating a fully fluid viewport), you can apply the `fixed` prop to disable the Container's default fluid behavior.
When this prop is set to true, the maximum width of the Container is equal to the minimum width at each respective breakpoint.

{{"demo": "FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

## Anatomy

The Container component renders as an HTML `<div>` element:

```html
<div class="MuiContainer-root">
  <!-- Container children -->
</div>
```
