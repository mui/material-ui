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

## Supported browsers

The targets of the default bundle have changed in v6.

The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, safari >= 15.4, iOS >= 15.4"`.

The stable bundle supports the following minimum versions:

<!-- #stable-snapshot -->

- Chrome 109 (up from 90)
- Edge 121 (up from 91)
- Firefox 115 (up from 78)
- Safari 15.4 in both macOS and iOS (up from 14 in macOS and 12.5 in iOS)
- and more (see [.browserslistrc (`stable` entry)](https://github.com/mui/material-ui/blob/v6.0.0/.browserslistrc#L16))

### Removed support for IE 11

Support for IE 11 is completely removed, by dropping the legacy bundle and all IE 11 related code.
This allows us to decrease bundle size and keep the scope manageable.
If you need to support IE 11, you can use Material UI v5's [legacy bundle](https://v5.mui.com/material-ui/guides/minimizing-bundle-size/#legacy-bundle), but it won't get updates or bug fixes.

## Breaking changes

The biggest change in v6 is the support for Pigment CSS integration, our zero-runtime CSS-in-JS solution.

<!-- :::info
Need to refer back to an older version of the docs? Check out [the v5 documentation here](https://v5.mui.com/).
::: -->

## Why you should migrate

Material UI v6 includes many bug fixes and improvements over v5.

Apart from the support for Pigment CSS, the v6 release provides a stable API for adopting CSS variables which open more customization possibilities and offers a more enjoyable developer experience.

Additionally, the v6 release does not include major breaking changes. Instead, they are deprecated to bring more consistent developer experience which are easily migrated using our codemod.

## Supported browsers and Node versions

The targets of the default bundle have changed in v6.

The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

<!-- #stable-snapshot -->

- Node ?? (up from 12)
- Chrome 109 (up from 90)
- Edge 121 (up from 91)
- Firefox 115 (up from 78)
- Safari 15.4 (macOS) and 15.4 (iOS)
- and more (see [.browserslistrc (`stable` entry)](https://github.com/mui/material-ui/blob/v6.0.0/.browserslistrc#L11))

## Update React & TypeScript version

### Update React

The minimum supported version of React is v17.0.0 (the same as v5).

### Update TypeScript

The minimum supported version of TypeScript has been increased from v3.5 to 4.1.

:::info
We try to align with types released by [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (that is packages published on npm under the `@types` namespace).

We will not change the minimum supported version in a minor version of Material UI.
However, we generally recommend not to use a TypeScript version older than the lowest supported version of DefinitelyTyped.
:::

If your project includes these packages, you'll need to update them:

- `@types/react`
- `@types/react-dom`

:::warning
Make sure that your application is still running without errors, and commit the changes before continuing to the next step.
:::

## New features and improvements

### Container queries

[CSS Container Quries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) lets you apply styles based on the size of the container, rather than the viewport.

The `theme` object now includes a field `containerQueries` which can be used to define container queries similar to `theme.breakpoints`.

```js
import { styled } from '@mui/material/styles';

const MyComponent = styled('div')(({ theme }) => ({
  [theme.containerQueries.up('sm')]: {
    backgroundColor: 'red',
  },
}));
```

or using the `sx` prop shorthand:

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

## Breaking changes

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### UMD bundle was removed

<!-- #default-branch-switch -->

The UMD bundle is no longer provided. This was replaced in favor of [ESM CDNs](https://esm.sh/). Please refer to the [CDN docs](https://next.mui.com/material-ui/getting-started/installation/#cdn) for alternatives.

## Deprecations

### `components`, `componentsProps` and composed CSS classes

- `components` and `componentsProps` are deprecated in favor of `slots` and `slotProps` in the theme object.
- Composed CSS classes are deprecated in favor of atomic class alternatives.

The deprecations can be migrated using the codemod below:

```bash
npx @mui/codemod@latest deprecations/all <path>
```

For more details on each component, check out the [deprecations page](/material-ui/migration/migrating-from-deprecated-apis/).

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
