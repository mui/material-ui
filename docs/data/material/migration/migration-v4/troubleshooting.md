# Troubleshooting

<p class="description">This document covers known issues and common problems encountered when migrating from Material UI v4 to v5.</p>

## Material UI v5 migration

1. [Getting started](/material-ui/migration/migration-v4/)
2. [Breaking changes part one: style and theme](/material-ui/migration/v5-style-changes/)
3. [Breaking changes part two: components](/material-ui/migration/v5-component-changes/)
4. [Migrating from JSS](/material-ui/migration/migrating-from-jss/)
5. Troubleshooting 👈 _you are here_

## Styles broken after migrating to v5

There are two reasons why component styles may be broken after you've completed all steps in the migration process.

First, check if you have configured the `StyledEngineProvider` correctly, as shown in the [Style library](/material-ui/migration/v5-style-changes/#style-library) section.

If the `StyledEngineProvider` is already used at the top of your application and the styles are still broken, it may be the case that you still have `@material-ui/core` in your application.

This could be caused by other dependencies in the app that still rely on Material UI v4.

To check this, run `npm ls @material-ui/core` (or `yarn why @material-ui/core`).
If your project contains such dependencies, you will see a list that looks something like this:

```bash
$ npm ls @material-ui/core
project@0.1.0 /path/to/project
└─┬  @mui/x-data-grid@4.0.0
  └── @material-ui/core@4.12.3
```

The output above indicates that `@material-ui/core` is a dependency of `@mui/x-data-grid`.

In this specific example, you would need to bump the version of `@mui/x-data-grid` to [v5](https://www.npmjs.com/package/@mui/x-data-grid) so that it depends on `@mui/material` instead.

## Storybook and Emotion

If your project uses Storybook v6.x, you will need to update the `.storybook/main.js` Webpack config to use the most recent version of Emotion:

```js
// .storybook/main.js

const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    };
  },
};
```

Next, update `.storybook/preview.js` to prevent Storybook's Docs tab from displaying an empty page:

```js
// .storybook/preview.js

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

const defaultTheme = createTheme(); // or your custom theme

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

// ...other storybook exports
```

:::info

This solution has been tested on the following versions:

```json
{
  "@storybook/react": "6.3.8",
  "@storybook/addon-docs": "6.3.8",
  "@emotion/react": "11.4.1",
  "@emotion/styled": "11.3.0",
  "@mui/material": "5.0.2"
}
```

Note that this is a workaround that may not be suitable for your situation if you are using different versions.

For more details, checkout these GitHub issues:

- https://github.com/storybookjs/storybook/issues/16099
- https://github.com/mui/material-ui/issues/24282#issuecomment-796755133

  :::

## Cannot read property scrollTop of null

This error comes from `Fade`, `Grow`, `Slide`, `Zoom` components due to a missing DOM node.

Make sure that the children forward the `ref` to the DOM for custom components:

```jsx
// Ex. 1-1 ❌ This will cause an error because the Fragment is not a DOM node:
<Fade in>
  <React.Fragment>
    <CustomComponent />
  </React.Fragment>
</Fade>
```

```jsx
// Ex. 1-2 ✅ Add a DOM node such as this div:
<Fade in>
  <div>
    <CustomComponent />
  </div>
</Fade>
```

```jsx
// Ex. 2-1 ❌ This will cause an error because `CustomComponent` does not forward `ref` to the DOM:
function CustomComponent() {
  return <div>...</div>;
}

<Fade in>
  <CustomComponent />
</Fade>;
```

```jsx
// Ex. 2-2 ✅ Add `React.forwardRef` to forward `ref` to the DOM:
const CustomComponent = React.forwardRef(function CustomComponent(props, ref) {
  return (
    <div ref={ref}>
      ...
    </div>
  )
})

<Fade in>
  <CustomComponent />
</Fade>
```

For more details, checkout [this issue](https://github.com/mui/material-ui/issues/27154) on GitHub.

## [Types] Property "palette", "spacing" does not exist on type 'DefaultTheme'

This error arises because `makeStyles` is now exported from the `@mui/styles` package, which does not know about `Theme` in the core package.

To fix this, you need to augment the `DefaultTheme` (empty object) in `@mui/styles` with `Theme` from the core.

Read more about module augmentation in [the official TypeScript docs](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

### TypeScript

Add this snippet to your theme file:

```ts
// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}
```

### JavaScript

If you are using an IDE like VSCode which is able to infer types from a `d.ts` file, create `index.d.ts` in your `src` folder and add the following lines of code:

```js
// index.d.ts
declare module '@mui/private-theming' {
  import type { Theme } from '@mui/material/styles';

  interface DefaultTheme extends Theme {}
}
```

## [Jest] SyntaxError: Unexpected token 'export'

`@mui/material/colors/red` is considered private since v1.0.0.
To fix this error, you must replace the import.
For more details, see [this GitHub issue](https://github.com/mui/material-ui/issues/27296).

We recommend using this codemod to fix all imports in your project:

```bash
npx @mui/codemod@latest v5.0.0/optimal-imports <path>
```

You can fix it manually like this:

```diff
-import red from '@mui/material/colors/red';
+import { red } from '@mui/material/colors';
```

## makeStyles - TypeError: Cannot read property 'drawer' of undefined

This error occurs when calling `useStyles` or `withStyles` outside of the scope of `<ThemeProvider>`, as in the following example:

```js
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const theme = createTheme();

function App() {
  const classes = useStyles(); // ❌ called outside of ThemeProvider
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Card className={classes.root}>...</Card>
    </ThemeProvider>
  );
}

export default App;
```

You can fix this by moving `useStyles` inside another component so that it is called under `<ThemeProvider>`:

```js
// ...imports

function AppContent(props) {
  const classes = useStyles(); // ✅ This is safe because it is called inside ThemeProvider
  return <Card className={classes.root}>...</Card>;
}

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent {...props} />
    </ThemeProvider>
  );
}

export default App;
```

## TypeError: Cannot read properties of undefined (reading 'pxToRem')

This error results from trying to access an empty theme.

Make sure that you have addressed the following issues:

1. `styled` should only be imported from `@mui/material/styles` (if you are not using the standalone `@mui/system`):

```js
import { styled } from '@mui/material/styles';
```

2. `useStyles` cannot be called outside of `<ThemeProvider>`.
   To fix this problem, follow [the instructions in this section](#makestyles-typeerror-cannot-read-property-drawer-of-undefined).

For more details, see [this GitHub issue](https://github.com/mui/material-ui/issues/28496).

## Still having problems?

If you're encountering a problem not covered here, please [create a GitHub issue](https://github.com/mui/material-ui/issues/new/choose) with this title format: **[Migration] Summary of your issue**.
