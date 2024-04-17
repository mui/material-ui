---
title: Material UI v6 Sneak Peek
description: Previewing all the major updates of Material UI v6.
date: 2024-04-17T00:00:00.000Z
authors: ['siriwatknp']
tags: ['Material UI', 'Product']
manualCard: true
---

Material UI v6 is coming soon! We're excited to share a sneak peek of all the major updates.

## Opt-in CSS extraction via Pigment CSS

As you know, Material UI v5 is using Emotion as a default styling solution. As a runtime CSS-in-JS library, it has several trade-offs such as slower performance and larger bundle size.

In the upcoming v6, we're introducing an opt-in integration with Pigment CSS, our new open-source library, that will eliminate the overhead of style recalculation while preserving similar APIs that you are already familiar with.

Since the integration is an opt-in feature, you can upgrade to v6 and continue using Emotion if you'd like. We will provide a migration guide to help you switch to Pigment CSS at your pace.

<!-- would be nice if we have a link to a prototype page -->

## Theming

### New API for dark mode

The new API `theme.applyStyles()` has been added to unify all supporting styling solutions, including Emotion, Styled-components and Pigment CSS.

```diff
  const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
-    borderBottom: `1px solid ${
-      theme.palette.mode === 'dark' ? '#30363d' : '#eaecef'
-    }`,
+    borderBottom: `1px solid #eaecef`,
+    ...theme.applyStyles('dark', {
+      borderBottom: '1px solid #30363d',
+    })
    '& input': {
      borderRadius: 4,
-      backgroundColor: '#fff',
+     ...theme.applyStyles('dark', {
+       backgroundColor: '#0d1117',
+     })
    },
  }));
```

We are working on a codemod to help you migrate your existing codebase to this new API.

### Container Queries

We added support for [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) based on the existing `theme.breakpoints` API.

This feature lets you define styles based on the width of the parent container instead of the viewport.

```jsx
const Component = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.containerQueries.up('sm')]: {
    flexDirection: 'row',
  },
  [theme.containerQueries('sidebar').up('400px')]: {
    flexDirection: 'row',
  },
}));
```

It also works with the `sx` prop:

```jsx
<Card
  sx={{
    '@sm': {
      flexDirection: 'row',
    },
    '@400/sidebar': {
      flexDirection: 'row',
    },
  }}
/>
```

## Stablizing CSS Theme Variables

We introduced [CSS theme variables](https://mui.com/material-ui/experimental-api/css-theme-variables/overview/) in v5 as an experimental API. In v6, we are making it a stable API with two more additions:

### Spacing

The value from `theme.spacing()` will use the CSS variable `--mui-spacing` under the hood including `sx` values.

```jsx
<Button
  sx={(theme) => ({
    padding: theme.spacing(2), // calc(var(--mui-spacing) * 2)
  })}
/>
```

### Typography

The typography tokens will be generated as CSS variables for using with CSS `font` property.

You can access the typography tokens from `theme.vars.typography.*`:

```jsx
const Title = styled('div')(({ theme }) => ({
  font: theme.vars.typography.h1,
}));
```

or refer to the CSS variable directly:

```css
.some-component {
  font: var(--mui-typography-h1);
}
```

## Revamping the free templates

We are upgrading the [free templates](https://mui.com/material-ui/getting-started/templates/) to make them look amazing for your next project. Here are some sneak peeks:

<!-- Add images -->

## Deprecations

- Drop IE11 support
- Deprecate `components` and `componentProps` props in favor of `slots` and `slotProps` through codemods.
