# Migrating to v6

<p class="description">This guide explains how and why to migrate from Material UI v5 to v6.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/material": "latest",
+"@mui/material": "next",
```

Using `next` ensures your project always uses the latest v6 alpha release.
Alternatively, you can also target and fix it to a specific version, for example, `6.0.0-alpha.0`.

## Introduction

The biggest change in v6 is the support for Pigment CSS integration, our zero-runtime CSS-in-JS solution.

<!-- :::info
Need to refer back to an older version of the docs? Check out [the v5 documentation here](https://v5.mui.com/).
::: -->

## Why you should migrate

Material UI v6 includes many bug fixes and improvements over v5.

Apart from the support for Pigment CSS, the v6 release provides a stable API for adopting CSS variables which open more customization possibilities and offers a more enjoyable developer experience.

Additionally, the v6 release does not include any breaking changes. Some APIs are deprecated to bring more consistent developer experience which are easily migrated using our codemod.

## Supported browsers and Node versions

The targets of the default bundle have changed in v6.

The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

<!-- #stable-snapshot -->

<!-- Add  -->

## Update React & TypeScript version

<!-- Add minimum React & TypeScript version -->

## New features and improvements

### Container queries

CSS Container Quries lets you apply styles based on the size of the container, rather than the viewport.

The `theme` object now includes a field `containerQueries` which can be used to define container queries similar to `theme.breakpoints`.

```js
import { styled } from '@mui/material/styles';

const MyComponent = styled('div')(({ theme }) => ({
  [theme.containerQueries.up('sm')]: {
    backgroundColor: 'red',
  },
}));
```

or using the `sx` prop:

```js
<Card sx={{
  display: 'flex',
  '@300px': {
    flexDirection: 'column',
  }
}}>
```

<!-- TODO: add link to the docs -->

To learn more about using container queries, check out the [Container Queries documentation](/system/container-queries/).

## Stabilized APIs

### CssVarsProvider and extendTheme

CSS theme variables become a recommended way to customize the theme. The `CssVarsProvider` and `extendTheme` APIs are now stable.

```diff
- import { createTheme, ThemeProvider } from '@mui/material/styles';
+ import { extendTheme, CssVarsProvider } from '@mui/material/styles';

- const theme = createTheme({...});
+ const theme = extendTheme({...});

- <ThemeProvider theme={theme}>
+ <CssVarsProvider theme={theme}>
```

<!-- Link to CSS theme variables page -->

To learn more about using CSS theme variables, check out the CSS theme variables page.

### Grid

The Grid v2 is now becoming the default Grid component. Check out the [migration guide](/material-ui/migration/migration-grid-v2/) to see the differences and improvements.

## Deprecations

### `components` and `componentsProps`

<!-- TODO: add info and codemod instruction -->

### Component style overrides

<!-- TODO: add info and codemod instruction -->

### System props

System props are deprecated in `Box`, `Typography`, `Link`, `Grid`, and `Stack` components. Move all system props into the `sx` prop instead. Example:

```diff
- <Button mr={2}>...</Button>
+ <Button sx={{ mr: 2 }}>...</Button>
```

<!-- TODO: add codemod instruction -->

## Pigment CSS integration
