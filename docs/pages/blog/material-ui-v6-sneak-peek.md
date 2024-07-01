---
title: Material UI v6 Sneak Peek
description: Previewing all the major updates of Material UI v6.
date: 2024-07-01T00:00:00.000Z
authors: ['siriwatknp']
tags: ['Material UI', 'Product']
manualCard: true
---

Material UI v6 is now in beta! We're excited to share a sneak peek of all the upcoming major updates.

## Opt-in CSS extraction via Pigment CSS

As you know, Material UI v5 is using Emotion as a default styling solution. As a runtime CSS-in-JS library, it has several trade-offs such as slower performance and larger bundle size.

With Material UI v6, we're introducing an opt-in integration with Pigment CSS, our new open-source library, that will eliminate the overhead of style recalculation while preserving similar APIs that you are already familiar with.

Since the integration is an opt-in feature, you can upgrade to v6 and continue using Emotion if you'd like. We will provide a migration guide to help you switch to Pigment CSS at your pace.

<!-- would be nice if we have a link to a prototype page -->
<!-- a link to Next.js repo that render templates -->

### React Server Components

Once integrated with Pigment CSS, Material UI v6 provides a separate set of layout components, including `Grid`, `Container`, and `Stack`, that are compatible with React Server Components.

```jsx
import Grid from '@mui/material/PigmentGrid';
import Container from '@mui/material/PigmentContainer';
import Stack from '@mui/material/PigmentStack';
```

<!-- A link to example repo? -->

## CSS theme variables

A new API that lets you turn your theme into CSS variables.

```diff
- import { ThemeProvider } from '@mui/material/styles';
+ import { CssVarsProvider } from '@mui/material/styles';
```

Serializable values like palette, spacing, typography, etc. are converted to CSS variables and can be accessed from `theme.vars`.

With CSS variables, you can easily integrate your prefered styling solution with Material UI.

```css title="styles.css"
.custom-card {
  background-color: var(--palette-background-default);
  color: var(--palette-text-primary);
  padding: var(--spacing-2);
  font: var(--font-body1);
}
```

## Dark mode improvements

### Simplified dark mode

The new `extendTheme` lets you enable media [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) in one line:

<codeblock>

```js Theme
import { extendTheme, CssVarsProvider } from '@mui/material/styles';

const theme = extendTheme({
  strategy: 'media',
});

function App({ children }) {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
}
```

```css Result
:root {
  --palette-background-default: #fff;
  /* ...other variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    --palette-background-default: #121212;
    /* ...other variables */
  }
}
```

</codeblock>

If you have a custom selector for dark mode, for example using data attributes, you can specify a custom value:

<codeblock>

```js Theme
import { extendTheme, CssVarsProvider } from '@mui/material/styles';

const theme = extendTheme({
  strategy: '[data-mode-%s]', // the %s will be replaced with the mode
});

function App({ children }) {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
}
```

```css Result
:root {
  --palette-background-default: #fff;
  /* ...other variables */
}

:where([data-mode-dark]) {
  --palette-background-default: #121212;
  /* ...other variables */
}
```

</codeblock>

### Custom styles for specific modes

The new API `theme.applyStyles()` has been added to unify all supporting styling solutions, including Emotion, Styled-components and Pigment CSS.

We will provide a codemod that migrates the code like an example below:

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

## Container Queries

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

## Stabilized Grid v2

## Revamping the free templates

We are upgrading the [free templates](https://mui.com/material-ui/getting-started/templates/) to make them look amazing for your next project.

<!-- Add images -->

## Bundle size improvements
