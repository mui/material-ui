# Migrando da v4 para v5

<p class="description">Sim, v5 foi lançada!</p>

If you're looking for the v4 docs, you can [find them here](https://material-ui.com/versions/).

## Introdução

Esta é uma referência para atualizar seu site de Material UI v4 para v5. Embora haja muita coisa coberta aqui, você provavelmente não precisará fazer tudo no seu site. Faremos o nosso melhor para manter as coisas fáceis de seguir e o mais sequenciais possível, para que você possa começar a usar a v5 rapidamente!

## Por que você deve migrar

To get the benefits of bug fixes and a lot of improvements such as the new styling engine. Esta página de documentação cobre o _como_ migrar da v4 para a v5. O _por que_ é abordado na [postagem no blog do Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Atualizando suas dependências

- [Update React & TypeScript](#update-react-amp-typescript-version)
- [ThemeProvider setup](#themeprovider-setup)
- [Utilitário para atualização](#update-mui-core-version)
- [Run codemods](#run-codemods)
  - [preset-safe](#preset-safe)
  - [variant-prop (optional)](#variant-prop)
  - [link-underline-hover (optional)](#link-underline-hover)
- [Supported changes](#handling-breaking-changes)
- [Migrate theme's `styleOverrides` to emotion](#migrate-themes-styleoverrides-to-emotion)
- [Migrate from JSS](#migrate-from-jss)
- [CSS specificity](#css-specificity)
- [Troubleshooting](#troubleshooting)

> 💡 Aim to create small commits on any changes to help the migration go more smoothly. If you encounter any issues, check the [Troubleshooting](#troubleshooting) section. For other errors not described there, [create an issue](https://github.com/mui/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.yml) with this title format: `[Migration] Summary of your issue`.

## Tratamento de alterações recentes

- The minimum supported version of **React** was increased from v16.8.0 to v17.0.0.
- The minimum supported version of TypeScript was increased from v3.2 to v3.5.

  > We try to align with types released from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (i.e. packages published on npm under the `@types` namespace). We will not change the minimum supported version in a major version of Material UI. However, we generally recommend to not use a TypeScript version older than the [lowest supported version of DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier)

A primeira coisa que você precisa fazer é atualizar suas dependências.

- `react-scripts`
- `@material-ui/types`
- `@material-ui/core/styles`

> 📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing to the next step.

## The props: `alignItems`

If you are using the utilities from `@material-ui/styles` together with the `@material-ui/core`, you should replace the use of `ThemeProvider` from `@material-ui/styles` with the one exported from `@material-ui/core/styles`. This way, the `theme` provided in the context will be available in both the styling utilities exported from `@material-ui/styles`, like `makeStyles`, `withStyles` etc. and the Material UI components.

```js
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that access to theme
  }
});

function App() {
  const classes = useStyles(); // ❌ If you have this, consider moving it inside a component that wrapped with <ThemeProvider>
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

> 📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing the next step.

## Update MUI version

Ou execute

```sh
npm install @material-ui/core@next @emotion/react @emotion/styled

ou

yarn add @material-ui/core@next @emotion/react @emotion/styled
```

**Optional**: if you have one these packages, install the new package separately

- Você pode usar o [codemod `moved-lab-modules`](https://github.com/mui/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.
- For non-Material UI components, use the `component` prop.

<details>
<summary>See all packages change</summary>

```text
@material-ui/core -> @mui/material
@material-ui/system -> @mui/system
@material-ui/unstyled -> @mui/base
@material-ui/styles -> @mui/styles
@material-ui/icons -> @mui/icons-material
@material-ui/lab -> @mui/lab
@material-ui/types -> @mui/types
@material-ui/styled-engine -> @mui/styled-engine
@material-ui/styled-engine-sc ->@mui/styled-engine-sc
@material-ui/private-theming -> @mui/private-theming
@material-ui/codemod -> @mui/codemod
@material-ui/docs -> @mui/docs
@material-ui/envinfo -> @mui/envinfo
```

The `@material-ui/styles` package is no longer part of `@material-ui/core/styles`. If you are using `@material-ui/styles` together with `@material-ui/core` you need to add a module augmentation for the `DefaultTheme`.

</details>

The minimum supported version of React was increased from v16.8.0 to v17.0.0.

```sh
npm install @emotion/react @emotion/styled

// or with `yarn`
yarn add @emotion/react @emotion/styled
```

> 💡 If you want to use MUI Core v5 with **styled-components** instead of emotion, check out [the installation guide](/material-ui/getting-started/installation/#npm).

If you are using SSR (or a framework that depends on it), there is currently a [known bug](https://github.com/mui/material-ui/issues/29742) with the babel plugin for `styled-components`, which prevents `@mui/styled-engine-sc` (the adapter for `styled-components`) from being used. We strongly recommend using the default setup with emotion instead.

The `useThemeVariants` hook is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

You should have installed `@mui/styles` by now. It includes JSS, which duplicate with emotion. It's meant to allow a gradual migration to v5. You should be able to remove the dependency following [these steps](#migrate-from-jss).

> 📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing the next step.

Once you application has completely migrated to MUI Core v5, you can remove the old `@material-ui/*` packages by running `yarn remove` or `npm uninstall`.

## Run codemods

We have prepared these codemods to ease your migration experience.

### preset-safe

This codemod contains most of the transformers that are useful for migration. (**This codemod should be applied only once per folder**)

```sh
npx @mui/codemod v5.0.0/preset-safe <path>
```

> You can use the [`use-transitionprops` codemod](https://github.com/mui/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

### Suporte de navegadores e versões de node

Transform `<TextField/>, <FormControl/>, <Select/>` component by applying `variant="standard"` if no variant is defined (because default variant has changed from `standard` in **v4** to `outlined` in **v5**).

> ❗️ You should **NOT** use this codemod if you have already defined default `variant: "outlined"` in the theme.

```js
// if you have theme setup like this, ❌ don't run this codemod.
// these default props can be removed later because `outlined` is the default value in v5
createMuiTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

However, if you want to keep `variant="standard"` to your components, run this codemod or configure theme default props.

```sh
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createTheme, adaptV4Theme } from '@material-ui/core/styles';

-const theme = createMuiTheme({
+const theme = createTheme(adaptV4Theme({
  // v4 theme
-});
+}));
```

You can use the [`box-borderradius-values` codemod](https://github.com/mui/material-ui/tree/HEAD/packages/material-ui-codemod#box-borderradius-values) for automatic migration.

### Componentes de classe sem o encaminhamento de refs

You can use the [`circularprogress-variant` codemod](https://github.com/mui/material-ui/tree/HEAD/packages/material-ui-codemod#circularprogress-variant) for automatic migration.

> ❗️ You should **NOT** use this codemod if you have already defined default `underline: "always"` in the theme.

```js
// if you have theme setup like this, ❌ don't run this codemod.
// this default props can be removed later because `always` is the default value in v5
createMuiTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'always',
      },
    },
  },
});
```

If, however, you want to keep `underline="hover"`, run this codemod or configure theme default props.

```sh
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
-  overrides: {
-    MuiButton: {
-      root: { padding: 0 },
-    },
-  },
+  components: {
+    MuiButton: {
+      styleOverrides: {
+        root: { padding: 0 },
+      },
+    },
+  },
});
```

Você pode usar o [codemod `moved-lab-modules`](https://github.com/mui/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

Once you have completed the codemod step, try running your application again. At this point, it should be running without error. Otherwise check out the [Troubleshooting](#troubleshooting) section. Next step, handling breaking changes in each component.

## Handling breaking changes

### Supported React version

Os indicativos de suporte do pacote padrão foram alterados. As versões exatas do suporte serão fixadas na consulta browserslist `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

O pacote padrão suporta as seguintes versões mínimas:

<!-- #stable-snapshot -->

- Node 12 (antes era 8)
- Chrome 84 (antes era 49)
- Edge 85 (antes 14)
- Firefox 78 (antes era 52)
- Safari 13 (macOS) e 12.2 (iOS) (antes era 10)
- para maiores detalhes (veja [.browserslistrc (seção `stable`)](https://github.com/mui/material-ui/blob/HEAD/.browserslistrc#L11))

Não há mais o suporte para o IE 11. Se você precisar do suporte para o IE 11, confira nosso [pacote legado](/material-ui/guides/minimizing-bundle-size/#legacy-bundle).

### Supported TypeScript version

O suporte para componentes de classe, sem o encaminhamento de refs, na propriedade `component` ou como um elemento `children` imediato foi removido. Se você estava usando `unstable_createStrictModeTheme` ou não recebeu quaisquer avisos relacionados a `findDOMNode` no `React. StrictMode`, então você não precisa fazer nada. Caso contrário, confira a seção ["Advertência com refs" em nosso guia de composição](/material-ui/guides/composition/#caveat-with-refs) para descobrir como migrar. Esta alteração afeta quase todos os componentes no qual você está usando a propriedade `component` ou passando diretamente um `children` para componentes que requerem `children` como elemento (ou seja, `<MenuList><CustomMenuItem /></MenuList>`)

### Ref type specificity

For some components, you may get a type error when passing `ref`. To avoid the error, you should use a specific element type. For example, `Card` expects the type of `ref` to be `HTMLDivElement`, and `ListItem` expects its `ref` type to be `HTMLLIElement`.

Here is an example:

```diff
 import * as React from 'react';
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';

export default function SpecificRefType() {
- const cardRef = React.useRef<HTMLElement>(null);
+ const cardRef = React.useRef<HTMLDivElement>(null);

- const listItemRef = React.useRef<HTMLElement>(null);
+ const listItemRef = React.useRef<HTMLLIElement>(null);
  return (
    <div>
      <Card ref={cardRef}></Card>
      <ListItem ref={listItemRef}></ListItem>
    </div>
  );
}
```

The list of components that expect a specific element type is as follows:

#### `@mui/material`

- [Accordion](/material-ui/api/accordion/) - `HTMLDivElement`
- [Alert](/material-ui/api/alert/) - `HTMLDivElement`
- [Avatar](/material-ui/api/avatar/) - `HTMLDivElement`
- [ButtonGroup](/material-ui/api/button-group/) - `HTMLDivElement`
- [Card](/material-ui/api/card/) - `HTMLDivElement`
- [Dialog](/material-ui/api/dialog/) - `HTMLDivElement`
- [ImageList](/material-ui/api/image-list/) - `HTMLUListElement`
- [List](/material-ui/api/list/) - `HTMLUListElement`
- [Tab](/material-ui/api/tab/) - `HTMLDivElement`
- [Tabs](/material-ui/api/tabs/) - `HTMLDivElement`
- [ToggleButton](/material-ui/api/toggle-button/) - `HTMLButtonElement`

#### `@mui/lab`

- [Timeline](/material-ui/api/timeline/) - `HTMLUListElement`

### Style library

The style library used by default in v5 is [`emotion`](https://github.com/emotion-js/emotion). While migrating from JSS to emotion, and if you are using JSS style overrides for your components (for example overrides created by `makeStyles`), you will need to take care of the CSS injection order. To do so, you need to have the `StyledEngineProvider` with the `injectFirst` option at the **top of your component tree**.

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

Here is an example:

```jsx
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. Now you can override MUI's styles. */}
     </CacheProvider>
   );
 }
```

> **Note:** If you are using emotion to style your app, and have a custom cache, it will override the one provided by Material UI. In order for the injection order to still be correct, you need to add the `prepend` option to `createCache`.
> 
> ✅ This is handled in the [preset-safe codemod](#preset-safe).

Here is an example:

```diff
 import * as React from 'react';
 import { CacheProvider } from '@emotion/react';
 import createCache from '@emotion/cache';

 const cache = createCache({
   key: 'css',
+  prepend: true,
 });

 export default function PlainCssPriority() {
   return (
     <CacheProvider value={cache}>
       {/* Your component tree. Now you can override MUI's styles. */}
     </CacheProvider>
   );
 }
```

> **Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. To see how it can be done, take a look at the [`StyledEngineProvider` implementation](https://github.com/mui/material-ui/blob/HEAD/packages/mui-styled-engine-sc/src/StyledEngineProvider/StyledEngineProvider.js) in the `@material-ui/styled-engine-sc` package.

### Theme structure

The structure of the theme has changed in v5. You need to update its shape. For a smoother transition, the `adaptV4Theme` helper allows you to iteratively upgrade some of the theme changes to the new theme structure.

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

```diff
-import { createMuiTheme } from '@mui/material/styles';
+import { createTheme, adaptV4Theme } from '@mui/material/styles';

-const theme = createMuiTheme({
+const theme = createTheme(adaptV4Theme({
   // v4 theme
-});
+}));
```

> For a smoother transition, the `adaptV4Theme` helper allows you to iteratively upgrade to the new theme structure.

The following changes are supported by the adapter:

- The "gutters" abstraction hasn't proven to be used frequently enough to be valuable.

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

- `theme.spacing` now returns single values with px units by default. This change improves the integration with styled-components & emotion.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by removing any 'px' suffix from `theme.spacing` calls in a template string.

  Before:

  ```js
  theme.spacing(2) => 16
  ```

  After:

  ```js
  theme.spacing(2) => '16px'
  ```

- The `theme.palette.type` key was renamed to `theme.palette.mode`, to better follow the "dark mode" term that is usually used for describing this feature.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    import { createTheme } from '@mui/material/styles';
  >   -const theme = createTheme({palette: { type: 'dark' }}),
  >   +const theme = createTheme({palette: { mode: 'dark' }}),
  > ```

- The default `theme.palette.info` colors were changed to pass AA standard contrast ratio in both light & dark mode.

  ```diff
   info = {
  -  main: cyan[500],
  +  main: lightBlue[700], // lightBlue[400] in "dark" mode

  -  light: cyan[300],
  +  light: lightBlue[500], // lightBlue[300] in "dark" mode

  -  dark: cyan[700],
  +  dark: lightBlue[900], // lightBlue[700] in "dark" mode
   }
  ```

- The default `theme.palette.success` colors were changed to pass AA standard contrast ratio in both light & dark mode.

  ```diff
   success = {
  -  main: green[500],
  +  main: green[800], // green[400] in "dark" mode

  -  light: green[300],
  +  light: green[500], // green[300] in "dark" mode

  -  dark: green[700],
  +  dark: green[900], // green[700] in "dark" mode
   }
  ```

- The default `theme.palette.warning` colors were changed to pass AA standard contrast ratio in both light & dark mode.

  ```diff
   warning = {
  -  main: orange[500],
  +  main: "#ED6C02", // orange[400] in "dark" mode

  -  light: orange[300],
  +  light: orange[500], // orange[300] in "dark" mode

  -  dark: orange[700],
  +  dark: orange[900], // orange[700] in "dark" mode
   }
  ```

- The `theme.palette.text.hint` key was unused in MUI components, and has been removed. If you depend on it, you can add it back:

  ```diff
   import { createTheme } from '@mui/material/styles';

  -const theme = createTheme(),
  +const theme = createTheme({
  +  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  +});
  ```

- The components' definitions in the theme were restructured under the `components` key, to allow for easier discoverability of the definitions related to any one component.

  1. `props`

  ```diff
   import { createTheme } from '@mui/material/styles';

   const theme = createTheme({
  -  props: {
  -    MuiButton: {
  -      disableRipple: true,
  -    },
  -  },
  +  components: {
  +    MuiButton: {
  +      defaultProps: {
  +        disableRipple: true,
  +      },
  +    },
  +  },
   });
  ```

  2. `overrides`

  ```diff
   import { createTheme } from '@mui/material/styles';

   const theme = createTheme({
  -  overrides: {
  -    MuiButton: {
  -      root: { padding: 0 },
  -    },
  -  },
  +  components: {
  +    MuiButton: {
  +      styleOverrides: {
  +        root: { padding: 0 },
  +      },
  +    },
  +  },
   });
  ```

### Styles

- Renamed `fade` to `alpha` to better describe its functionality. The previous name was leading to confusion when the input color already had an alpha value. The helper **overrides** the alpha value of the color.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   - import { fade } from '@mui/material/styles';
  >   + import { alpha } from '@mui/material/styles';
  > 
  >   const classes = makeStyles(theme => ({
  >   -  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   +  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   }));
  > ```

- The `createStyles` function from `@mui/material/styles` was moved to the one exported from `@mui/styles`. It is necessary for removing the dependency to `@mui/styles` in the core package.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createStyles } from '@mui/material/styles';
  >   +import { createStyles } from '@mui/styles';
  > ```

### @mui/styles

#### ThemeProvider

If you are using the utilities from `@mui/styles` together with the `@mui/material`, you should replace the use of `ThemeProvider` from `@mui/styles` with the one exported from `@mui/material/styles`. This way, the `theme` provided in the context will be available in both the styling utilities exported from `@mui/styles`, like `makeStyles`, `withStyles` etc. and the MUI components.

```diff
-import { ThemeProvider } from '@mui/styles';
+import { ThemeProvider } from '@mui/material/styles';
```

Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available.

#### Default theme (TypeScript)

The `@mui/styles` package is no longer part of `@mui/material/styles`. If you are using `@mui/styles` together with `@mui/material` you need to add a module augmentation for the `DefaultTheme`.

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

```ts
// in the file where you are creating the theme (invoking the function `createTheme()`)
import { Theme } from '@mui/material/styles';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}
```

### @mui/material/colors

- Nested imports of more than 1 level are private. You can't import color from `@mui/material/colors/red`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import red from '@mui/material/colors/red';
  >   +import { red } from '@mui/material/colors';
  > ```

### @mui/material/styles

#### createGenerateClassName

- The `createGenerateClassName` function is no longer exported from `@mui/material/styles`. You should import it directly from `@material-ui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createGenerateClassName } from '@mui/material/styles';
  >   +import { createGenerateClassName } from '@mui/styles';
  > ```

  To generate custom class names **without** using `@mui/styles`, check out [ClassNameGenerator](/material-ui/experimental-api/classname-generator/) for more details.

#### createMuiTheme

- The function `createMuiTheme` was renamed to `createTheme` to make it more intuitive to use with `ThemeProvider`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createMuiTheme } from '@mui/material/styles';
  >   +import { createTheme } from '@mui/material/styles';
  > 
  >   -const theme = createMuiTheme({
  >   +const theme = createTheme({
  > ```

#### jssPreset

- The `jssPreset` object is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { jssPreset } from '@mui/material/styles';
  >   +import { jssPreset } from '@mui/styles';
  > ```

#### makeStyles

- The `makeStyles` JSS utility is no longer exported from `@mui/material/styles`. You can use `@mui/styles/makeStyles` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@mui/material`, it's recommended that you use the `ThemeProvider` component from `@mui/material/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { makeStyles } from '@mui/material/styles';
  >   +import { makeStyles } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
  > 
  >   +const theme = createTheme();
  >    const useStyles = makeStyles((theme) => ({
  >      background: theme.palette.primary.main,
  >    }));
  >    function Component() {
  >      const classes = useStyles();
  >      return <div className={classes.root} />
  >    }
  > 
  >    // In the root of your app
  >    function App(props) {
  >   -  return <Component />;
  >   +  return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
  >    }
  > ```

#### MuiThemeProvider

- The `MuiThemeProvider` component is no longer exported from `@mui/material/styles`. Use `ThemeProvider` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { MuiThemeProvider } from '@mui/material/styles';
  >   +import { ThemeProvider } from '@mui/material/styles';
  > ```

#### ServerStyleSheets

- The `ServerStyleSheets` component is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { ServerStyleSheets } from '@mui/material/styles';
  >   +import { ServerStyleSheets } from '@mui/styles';
  > ```

#### styled

- The `styled` JSS utility is no longer exported from `@mui/material/styles`. You can use the one exported from `@mui/styles` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@mui/material`, it's recommended you use the `ThemeProvider` component from `@mui/material/styles` instead.

  ```diff
  -import { styled } from '@mui/material/styles';
  +import { styled } from '@mui/styles';
  +import { createTheme, ThemeProvider } from '@mui/material/styles';

  +const theme = createTheme();
   const MyComponent = styled('div')(({ theme }) => ({ background: theme.palette.primary.main }));

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
  ```

#### StylesProvider

- The `StylesProvider` component is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { StylesProvider } from '@mui/material/styles';
  >   +import { StylesProvider } from '@mui/styles';
  > ```

#### useThemeVariants

- The `useThemeVariants` hook is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { useThemeVariants } from '@mui/material/styles';
  >   +import { useThemeVariants } from '@mui/styles';
  > ```

#### withStyles

- The `withStyles` JSS utility is no longer exported from `@mui/material/styles`. You can use `@mui/styles/withStyles` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@mui/material`, you should use the `ThemeProvider` component from `@mui/material/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { withStyles } from '@mui/material/styles';
  >   +import { withStyles } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
  > 
  >   +const defaultTheme = createTheme();
  >    const MyComponent = withStyles((props) => {
  >      const { classes, className, ...other } = props;
  >      return <div className={clsx(className, classes.root)} {...other} />
  >    })(({ theme }) => ({ root: { background: theme.palette.primary.main }}));
  > 
  >    function App() {
  >   -  return <MyComponent />;
  >   +  return <ThemeProvider theme={defaultTheme}><MyComponent /></ThemeProvider>;
  >    }
  > ```

- Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    import * as React from 'react';
  >    import { withStyles } from '@mui/styles';
  > 
  >    const MyComponent = withStyles({
  >      root: {
  >        backgroundColor: 'red',
  >      },
  >    })(({ classes }) => <div className={classes.root} />);
  > 
  >    function MyOtherComponent(props) {
  >      const ref = React.useRef();
  >   -  return <MyComponent innerRef={ref} />;
  >   +  return <MyComponent ref={ref} />;
  >    }
  > ```

#### withTheme

- The `withTheme` HOC utility has been removed from the `@mui/material/styles` package. You can use `@mui/styles/withTheme` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@mui/material`, it's recommended you use the `ThemeProvider` component from `@mui/material/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { withTheme } from '@mui/material/styles';
  >   +import { withTheme } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
  > 
  >   +const theme = createTheme();
  >    const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);
  > 
  >    function App(props) {
  >   -  return <MyComponent />;
  >   +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
  >    }
  > ```

- Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component.

  ```diff
  import * as React from 'react';
  import { withTheme } from '@mui/styles';

  const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```

#### withWidth

- This HOC was removed. There's an alternative using the [`useMediaQuery` hook](/material-ui/react-use-media-query/#migrating-from-withwidth).

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying hard-coded function to prevent the application from crashing.

### @mui/icons-material

#### GitHub

The `GitHub` icon was reduced in size from 24px to 22px wide to match the other icons size.

### @material-ui/pickers

We have a [dedicated page](/material-ui/guides/pickers-migration/) for migrating `@material-ui/pickers` to v5

### System

- The following system functions (and properties) were renamed because they are considered deprecated CSS:

  - `gridGap` to `gap`
  - `gridRowGap` to `rowGap`
  - `gridColumnGap` to `columnGap`

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

- Use spacing unit in `gap`, `rowGap`, and `columnGap`. If you were using a number previously, you need to mention the px to bypass the new transformation with `theme.spacing`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Box
  >   -  gap={2}
  >   +  gap="2px"
  >    >
  > ```

- Replace `css` prop with `sx` to avoid collision with styled-components & emotion `css` prop.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Box css={{ color: 'primary.main' }} />
  >   +<Box sx={{ color: 'primary.main' }} />
  > ```

  > Note that the system grid function wasn't documented in v4.

### Core components

As the core components use emotion as their style engine, the props used by emotion are not intercepted. The prop `as` in the following code snippet will not be propagated to `SomeOtherComponent`.

```jsx
<MuiComponent component={SomeOtherComponent} as="button" />
```

### AppBar

- Remove z-index when position static and relative. This avoids the creation of a stacking context and rendering issues.
- The `color` prop has no longer any effect in dark mode. The app bar uses the background color required by the elevation to follow the [Material Design guidelines](https://material.io/design/color/dark-theme.html). Use `enableColorOnDark` to restore the behavior of v4.

  ```jsx
  <AppBar enableColorOnDark />
  ```

### Alert

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Alert from '@mui/lab/Alert';
  >   -import AlertTitle from '@mui/lab/AlertTitle';
  >   +import Alert from '@mui/material/Alert';
  >   +import AlertTitle from '@mui/material/AlertTitle';
  > ```

### Autocomplete

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Autocomplete from '@mui/lab/Autocomplete';
  >   -import useAutocomplete  from '@mui/lab/useAutocomplete';
  >   +import Autocomplete from '@mui/material/Autocomplete';
  >   +import useAutoComplete from '@mui/material/useAutocomplete';
  > ```

- Remove `debug` prop. There are a couple of simpler alternatives: `open={true}`, Chrome devtools ["Emulate focused"](https://twitter.com/sulco/status/1305841873945272321), or React devtools prop setter.
- `renderOption` should now return the full DOM structure of the option. It makes customizations easier. You can recover from the change with:

  ```diff
   <Autocomplete
  -  renderOption={(option, { selected }) => (
  -    <React. Fragment>
  +  renderOption={(props, option, { selected }) => (
  +    <li {...props}>
         <Checkbox
           icon={icon}
           checkedIcon={checkedIcon}
           style={{ marginRight: 8 }}
           checked={selected}
         />
         {option.title}
  -    </React.
  ```

- Rename `closeIcon` prop to `clearIcon` to avoid confusion.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Autocomplete closeIcon={defaultClearIcon} />
  >   +<Autocomplete clearIcon={defaultClearIcon} />
  > ```

- The following values of the reason argument in `onChange` and `onClose` were renamed for consistency:

  1. `create-option` to `createOption`
  2. `select-option` to `selectOption`
  3. `remove-option` to `removeOption`

- Change the CSS rules that use `[data-focus="true"]` to use `. Mui-focused`. The `data-focus` attribute is not set on the focused option anymore, instead, global class names are used.

  ```diff
  -'. MuiAutocomplete-option[data-focus="true"]': {
  +'. MuiAutocomplete-option. Mui-focused': {
  ```

- Rename `getOptionSelected` to `isOptionEqualToValue` to better describe its purpose.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Autocomplete
  >   -  getOptionSelected={(option, value) => option.title === value.title}
  >   +  isOptionEqualToValue={(option, value) => option.title === value.title}
  > ```

### Avatar

- Rename `circle` to `circular` for consistency:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Avatar variant="circle">
  >   -<Avatar classes={{ circle: 'className' }}>
  >   +<Avatar variant="circular">
  >   +<Avatar classes={{ circular: 'className' }}>
  > ```

  Since `circular` is the default value, the variant prop can be deleted:

  ```diff
  -<Avatar variant="circle">
  +<Avatar>
  ```

- Move the AvatarGroup from the lab to the core.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import AvatarGroup from '@mui/lab/AvatarGroup';
  >   +import AvatarGroup from '@mui/material/AvatarGroup';
  > ```

### Badge

- Rename `circle` to `circular` and `rectangle` to `rectangular` for consistency.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Badge overlap="circle">
  >   -<Badge overlap="rectangle">
  >   +<Badge overlap="circular">
  >   +<Badge overlap="rectangular">
  > ```

  ```diff
   <Badge classes={{
  -  anchorOriginTopRightRectangle: 'className',
  -  anchorOriginBottomRightRectangle: 'className',
  -  anchorOriginTopLeftRectangle: 'className',
  -  anchorOriginBottomLeftRectangle: 'className',
  -  anchorOriginTopRightCircle: 'className',
  -  anchorOriginBottomRightCircle: 'className',
  -  anchorOriginTopLeftCircle: 'className',
  +  anchorOriginTopRightRectangular: 'className',
  +  anchorOriginBottomRightRectangular: 'className',
  +  anchorOriginTopLeftRectangular: 'className',
  +  anchorOriginBottomLeftRectangular: 'className',
  +  anchorOriginTopRightCircular: 'className',
  +  anchorOriginBottomRightCircular: 'className',
  +  anchorOriginTopLeftCircular: 'className',
   }}>
  ```

### BottomNavigation

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  import * as React from 'react';
   import { withStyles } from '@mui/styles';

   const MyComponent = withStyles({
     root: {
       backgroundColor: 'red',
     },
   })(({ classes }) => !!crwd_bt_768_tb_dwrc!!);

   function MyOtherComponent(props) {
     const ref = React.useRef();
  -  return <MyComponent innerRef={ref} />;
  +  return <MyComponent ref={ref} />;
   }
  ```

### BottomNavigationAction

- Remove the `span` element that wraps the children. Remove the `wrapper` classKey too. More details about [this change](https://github.com/mui/material-ui/pull/26923).

  ```diff
   <button class="MuiBottomNavigationAction-root">
  -  <span class="MuiBottomNavigationAction-wrapper">
       {icon}
       <span class="MuiBottomNavigationAction-label">
         {label}
       </span>
  -  </span>
   </button>
  ```

### Box

- The `borderRadius` system prop value transformation has been changed. If it receives a number, it multiplies this value with the `theme.shape.borderRadius` value. Use a string to provide an explicit `px` value.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Box borderRadius="borderRadius">
  >   +<Box borderRadius={1}>
  > ```

  ```diff
  -<Box borderRadius={16}>
  +<Box borderRadius="16px">
  ```

- The Box system props have an optional alternative API in v5, using the `sx` prop. You can [read this section](/system/basics/#api-tradeoff) for the "why" behind this new API.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```jsx
  >   <Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
  >   <Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
  > ```

- The following properties have been renamed because they are considered deprecated CSS properties by the CSS specification:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  1. `gridGap` to `gap`
  2. `gridColumnGap` to `columnGap`
  3. `gridRowGap` to `rowGap`

  ```diff
  -<Box gridGap={1}>
  -<Box gridColumnGap={2}>
  -<Box gridRowGap={3}>
  +<Box gap={1}>
  +<Box columnGap={2}>
  +<Box rowGap={3}>
  ```

  (Note that the system grid function wasn't documented in v4.)

- The `clone` prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a MUI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }} clone>
  -  <Button>Save</Button>
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

- The ability to pass a render prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a MUI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <Button {...props}>Save</Button>}
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

  For non-MUI components, use the `component` prop.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <button {...props}>Save</button>}
  -</Box>
  +<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
  ```

### Button

- The button `color` prop is now "primary" by default, and "default" has been removed. This makes the button closer to the Material Design guidelines and simplifies the API.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   <Button color="default">
  >   +<Button>
  > ```

  If you prefer to use the `default` color in v4, take a look at this [CodeSandbox](https://codesandbox.io/s/mimic-v4-button-default-color-bklx8?file=/src/Demo.tsx)

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
   <button class="MuiButton-root">
  -  <span class="MuiButton-label">
       children
  -  </span>
   </button>
  ```

### Chip

- Rename `default` variant to `filled` for consistency.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  Since `filled` is the default value, the variant prop can be deleted:

  ```diff
  -<Chip variant="default">
  +<Chip>
  ```

### Checkbox

- The switch color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the switch closer to the Material Design guidelines.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

- The component doesn't have `. MuiIconButton-root` and `. MuiIconButton-label` class names anymore, target `. MuiButtonBase-root` instead.

  ```diff
  -<span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  -  <span class="MuiIconButton-label">
  -    <input class="PrivateSwitchBase-input">
  +<span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  +  <span class="PrivateSwitchBase-input">
  ```

### CircularProgress

- The `static` variant has been renamed to `determinate`, and the previous appearance of `determinate` has been replaced by that of `static`. It was an exception to Material Design, and was removed from the specification.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<CircularProgress variant="static" classes={{ static: 'className' }} />
  >   +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  > ```

> NB: Se você já tinha customizado como "determinate", suas customizações provavelmente não são mais válidas. Por favor, remova-as.

### Collapse

- The `collapsedHeight` prop was renamed `collapsedSize` to support the horizontal direction.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Collapse collapsedHeight={40}>
  >   +<Collapse collapsedSize={40}>
  > ```

- The `classes.container` key was changed to match the convention of the other components.

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### CssBaseline

- The component was migrated to use the `@mui/styled-engine` (`emotion` or `styled-components`) instead of `jss`. You should remove the `@global` key when defining the style overrides for it. You could also start using the CSS template syntax over the JavaScript object syntax.

  ```diff
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
  -     styleOverrides: {
  -       '@global': {
  -         html: {
  -           WebkitFontSmoothing: 'auto',
  -         },
  -       },
  -     },
  +     styleOverrides: `
  +       html {
  +         -webkit-font-smoothing: auto;
  +       }
  +     `
      },
    },
  });
  ```

- The `body` font size has changed from `theme.typography.body2` (`0.875rem`) to `theme.typography.body1` (`1rem`). To return to the previous size, you can override it in the theme:

  ```js
  const theme = createMuiTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
          },
        },
      },
    },
  });
  ```

### Dialog

- The onE\* transition props were removed. Use TransitionProps instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Dialog
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

- Remove the `disableBackdropClick` prop because it is redundant. Ignore close events from `onClose` when `reason === 'backdropClick'` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Dialog
  >   -  disableBackdropClick
  >   -  onClose={handleClose}
  >   +  onClose={(event, reason) => {
  >   +    if (reason !== 'backdropClick') {
  >   +      handleClose(event, reason);
  >   +    }
  >   +  }}
  >    />
  > ```

- Remove the `withMobileDialog` higher-order component. The hook API allows a simpler and more flexible solution:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying hard-coded function to prevent application crash, further fixes are required. 
  > 
  > ```diff
  >   -import withMobileDialog from '@mui/material/withMobileDialog';
  >   +import { useTheme, useMediaQuery } from '@mui/material';
  > 
  >   function ResponsiveDialog(props) {
  >   - const { fullScreen } = props;
  >   + const theme = useTheme();
  >   + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  >     const [open, setOpen] = React.useState(false);
  > 
  >   // ...
  > 
  >   -import withMobileDialog from '@mui/material/withMobileDialog';
  >   +import { useTheme, useMediaQuery } from '@mui/material';
  > 
  >   function ResponsiveDialog(props) {
  >   - const { fullScreen } = props;
  >   + const theme = useTheme();
  >   + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  >     const [open, setOpen] = React.useState(false);
  > 
  >   // ...
  > ```

- Flatten DialogTitle DOM structure, remove `disableTypography` prop

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<DialogTitle disableTypography>
  >   -  <Typography variant="h4" component="h2">
  >   +<DialogTitle>
  >   +  <Typography variant="h4" component="span">
  >   >   >        My header
  >   >   >      </Typography>
  > ```

### Divider

- Use border instead of background color. It prevents inconsistent height on scaled screens. If you have customized the color of the border, you will need to update the CSS property override:

  ```diff
  . MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel

- Rename the `ExpansionPanel` components to `Accordion` to use a more common naming convention:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ExpansionPanel from '@mui/material/ExpansionPanel';
  >   -import ExpansionPanelSummary from '@mui/material/ExpansionPanelSummary';
  >   -import ExpansionPanelDetails from '@mui/material/ExpansionPanelDetails';
  >   -import ExpansionPanelActions from '@mui/material/ExpansionPanelActions';
  >   +import Accordion from '@mui/material/Accordion';
  >   +import AccordionSummary from '@mui/material/AccordionSummary';
  >   +import AccordionDetails from '@mui/material/AccordionDetails';
  >   +import AccordionActions from '@mui/material/AccordionActions';
  > 
  >   -<ExpansionPanel>
  >   >   >   +<Accordion>
  >   >   >   -  <ExpansionPanelSummary>
  >   >   >   +  <AccordionSummary>
  >   >   >        <Typography>Location</Typography>
  >   >   >        <Typography>Select trip destination</Typography>
  >   >   >   -  </ExpansionPanelSummary>
  >   >   >   +  </AccordionSummary>
  >   >   >   -  <ExpansionPanelDetails>
  >   >   >   +  <AccordionDetails>
  >   >   >        <Chip label="Barbados" onDelete={() => {}} />
  >   >   >        <Typography variant="caption">Select your destination of choice</Typography>
  >   >   >   -  </ExpansionPanelDetails>
  >   >   >   +  </AccordionDetails>
  >   >   >      <Divider />
  >   >   >   -  <ExpansionPanelActions>
  >   >   >   +  <AccordionActions>
  >   >   >        <Button size="small">Cancel</Button>
  >   >   >        <Button size="small">Save</Button>
  >   >   >   -  </ExpansionPanelActions>
  >   >   >   +  </AccordionActions>
  >   >   >   -</ExpansionPanel>
  >   +</Accordion>
  > ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React. ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React. SyntheticEvent, expanded: boolean) => {}} />
  ```

### ExpansionPanelDetails

- Remove `display: flex` from `AccordionDetails` (formerly `ExpansionPanelDetails`) as its too opinionated. Most developers expect a display block.

### ExpansionPanelSummary

- Rename `focused` to `focusVisible` for consistency:

  ```diff
   <AccordionSummary
     classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
     }}
    />
  ```

- Remove `IconButtonProps` prop from `AccordionSummary` (formerly `ExpansionPanelSummary`). The component renders a `<div>` element instead of an `IconButton`. The prop is no longer necessary.

### Fab

- Rename `round` to `circular` for consistency:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Fab variant="round">
  >   +<Fab variant="circular">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/27112).

  ```diff
   <button class="MuiFab-root">
  -  <span class="MuiFab-label">
       {children}
  -  </span>
   </button>
  ```

### FormControl

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design guidelines.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<FormControl value="Standard" />
  >   -<FormControl value="Outlined" variant="outlined" />
  >   +<FormControl value="Standard" variant="standard" />
  >   +<FormControl value="Outlined" />
  > ```

### FormControlLabel

- The `label` prop is now required. If you were using a `FormControlLabel` without a `label`, you can replace it with just the value of the `control` prop.

```diff
-<FormControlLabel control={<Checkbox />} />
+<Checkbox />
```

### Grid

- Rename `justify` prop to `justifyContent` to align with the CSS property name.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Grid justify="center">
  >   +<Grid justifyContent="center">
  > ```

- The props: `alignItems` `alignContent` and `justifyContent` and their `classes` and style overrides keys were removed: "align-items-xs-center", "align-items-xs-flex-start", "align-items-xs-flex-end", "align-items-xs-baseline", "align-content-xs-center", "align-content-xs-flex-start", "align-content-xs-flex-end", "align-content-xs-space-between", "align-content-xs-space-around", "justify-content-xs-center", "justify-content-xs-flex-end", "justify-content-xs-space-between", "justify-content-xs-space-around" and "justify-content-xs-space-evenly". These props are now considered part of the system, not on the `Typography` component itself. If you still wish to add overrides for them, you can use the `theme.components.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   const theme = createTheme({
  >     components: {
  >       MuiGrid: {
  >   -     styleOverrides: {
  >   -       "align-items-xs-flex-end": {
  >   -         marginTop: '20px',
  >   -       },
  >   -     },
  >   +     variants: {
  >   +       props: { alignItems: "flex-end" },
  >   +       style: {
  >   +         marginTop: '20px',
  >   +       },
  >   +     }],
  >       },
  >     },
  >   });
  > ```

### GridList

- Rename the `GridList` components to `ImageList` to align with the current Material Design naming.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

- Rename the GridList `spacing` prop to `gap` to align with the CSS attribute.
- Rename the GridList `cellHeight` prop to `rowHeight`.
- Add the `variant` prop to GridList.
- Rename the GridListItemBar `actionPosition` prop to `position`. (Note also the related classname changes.)
- Use CSS object-fit. For IE11 support either use a polyfill such as https://www.npmjs.com/package/object-fit-images, or continue to use the v4 component.

  ```diff
  -import GridList from '@mui/material/GridList';
  -import GridListTile from '@mui/material/GridListTile';
  -import GridListTileBar from '@mui/material/GridListTileBar';
  +import ImageList from '@mui/material/ImageList';
  +import ImageListItem from '@mui/material/ImageListItem';
  +import ImageListItemBar from '@mui/material/ImageListItemBar';

  -<GridList spacing={8} cellHeight={200}>
  -  <GridListTile>
  +<ImageList gap={8} rowHeight={200}>
  +  <ImageListItem>
      <img src="file.jpg" alt="Image title" />
  -    <GridListTileBar
  +    <ImageListItemBar
        title="Title"
        subtitle="Subtitle"
      />
  -  </GridListTile>
  -</GridList>
  +  </ImageListItem>
  +</ImageList>
  ```

### Hidden

- This component is deprecated because its functionality can be created with the [`sx`](/system/basics/#the-sx-prop) prop or the [`useMediaQuery`](/material-ui/react-use-media-query/) hook.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake `Hidden` component to prevent application crash, further fixes are required.

  Use the `sx` prop to replace `implementation="css"`:

  ```diff
  -<Hidden implementation="css" xlUp><Paper /></Hidden>
  -<Hidden implementation="css" xlUp><button /></Hidden>
  +<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
  +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} />
  ```

  ```diff
  -<Hidden implementation="css" mdDown><Paper /></Hidden>
  -<Hidden implementation="css" mdDown><button /></Hidden>
  +<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
  +<Box component="button" sx={{ display: { xs: 'none', md: 'block' } }} />
  ```

  Use the `useMediaQuery` hook to replace `implementation="js"`:

  ```diff
  -<Hidden implementation="js" xlUp><Paper /></Hidden>
  +const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
  +return hidden ? null : <Paper />;
  ```

### Icon

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikely event that you were using the value `default`, the prop can be removed:

  ```diff
  -<Icon fontSize="default">icon-name</Icon>
  +<Icon>icon-name</Icon>
  ```

### IconButton

- The default size's padding is reduced to `8px` which makes the default IconButton size of `40px`. To get the old default size (`48px`), use `size="large"`. The change was done to better match Google's products when Material Design stopped documenting the icon button pattern.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   - <IconButton>
  >   + <IconButton size="large">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
   <button class="MuiIconButton-root">
  -  <span class="MuiIconButton-label">
       <svg />
  -  </span>
   </button>
  ```

### Link

- The default `underline` prop is changed from `"hover"` to `"always"`. To get the same behavior as in v4, apply `defaultProps` in theme

  > ✅ This is handled in [link-underline-hover codemod](#link-underline-hover), read the details before running this codemod. 
  > 
  > ```js
  >   createTheme({
  >   components: {
  >     MuiLink: {
  >       defaultProps: {
  >         underline: 'hover',
  >       },
  >     },
  >   },
  > });
  > ```

### Menu

- The onE\* transition props were removed. Use TransitionProps instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Menu
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

  > Note: The `selectedMenu` variant will no longer vertically align the selected item with the anchor.

- Change the default value of `anchorOrigin.vertical` to follow the Material Design guidelines. The menu now displays below the anchor instead of on top of it. You can restore the previous behavior with:

  ```diff
   <Menu
  +  anchorOrigin={{
  +    vertical: 'top',
  +    horizontal: 'left',
  +  }}
  ```

### MenuItem

- The `MenuItem` component inherits the `ButtonBase` component instead of `ListItem`. The class names related to "MuiListItem-\*" are removed and theming `ListItem` is no longer affecting `MenuItem`.

  ```diff
  -<li className="MuiButtonBase-root MuiMenuItem-root MuiListItem-root">
  +<li className="MuiButtonBase-root MuiMenuItem-root">
  ```

- prop `listItemClasses` is removed, use `classes` instead.

  ```diff
  -<MenuItem listItemClasses={{...}}>
  +<MenuItem classes={{...}}>
  ```

  Read more about [MenuItem CSS API](/material-ui/api/menu-item/#css)

### Modal

- Remove the `disableBackdropClick` prop because it is redundant. Use `onClose` with `reason === 'backdropClick'` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Modal
  >   -  disableBackdropClick
  >   -  onClose={handleClose}
  >   +  onClose={(event, reason) => {
  >   +    if (reason !== 'backdropClick') {
  >   +      handleClose(event, reason);
  >   +    }
  >   +  }}
  >    />
  > ```

- Remove the `onEscapeKeyDown` prop because it is redundant. Use `onClose` with `reason === "escapeKeyDown"` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Modal
  >   -  onEscapeKeyDown={handleEscapeKeyDown}
  >   +  onClose={(event, reason) => {
  >   +    if (reason === 'escapeKeyDown') {
  >   +      handleEscapeKeyDown(event);
  >   +    }
  >   +  }}
  >    />
  > ```

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### NativeSelect

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<NativeSelect classes={{ select: 'class1 class2 class3' }} />
  ```

### OutlinedInput

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined.

  ```diff
  -<OutlinedInput labelWidth={20} />
  +<OutlinedInput label="First Name" />
  ```

### Paper

- Change the background opacity based on the elevation in dark mode. This change was done to follow the Material Design guidelines. You can revert it in the theme:

  ```diff
  const theme = createTheme({
    components: {
      MuiPaper: {
  +     styleOverrides: { root: { backgroundImage: 'unset' } },
      },
    },
  });
  ```

### Pagination

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Pagination from '@mui/lab/Pagination';
  >   -import PaginationItem from '@mui/lab/PaginationItem';
  >   -import { usePagination } from '@mui/lab/Pagination';
  >   +import Pagination from '@mui/material/Pagination';
  >   +import PaginationItem from '@mui/material/PaginationItem';
  >   +import usePagination from '@mui/material/usePagination';
  > ```

- Rename `round` to `circular` for consistency:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Pagination shape="round">
  >   -<PaginationItem shape="round">
  >   +<Pagination shape="circular">
  >   +<PaginationItem shape="circular">
  > ```

### Popover

- The onE\* transition props were removed. Use TransitionProps instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Popover
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

- The `getContentAnchorEl` prop was removed to simplify the positioning logic.

### Popper

- Upgrade [Popper.js](https://github.com/popperjs/popper-core) from v1 to v2. This third-party library has introduced a lot of changes.<br /> You can read [their migration guide](https://popper.js.org/docs/v2/migration-guide/) or the following summary:

  - The CSS prefixes have changed:

    ```diff
     popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] .arrow': {
    + '&[data-popper-placement*="bottom"] .arrow': {
    ```

  - Method names have changed:

    ```diff
    -popperRef.current.scheduleUpdate()
    +popperRef.current.update()
    ```

    ```diff
    -popperRef.current.update()
    +popperRef.current.forceUpdate()
    ```

  - Modifiers' API has changed a lot. There are too many changes to be covered here.

### Portal

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Radio

- The radio color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the radio closer to the Material Design guidelines.

  ```diff
  -<Radio />
  +<Radio color="secondary />
  ```

- The component doesn't have `. MuiIconButton-root` and `. MuiIconButton-label` class names anymore, target `. MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### Rating

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Rating from '@mui/lab/Rating';
  >   +import Rating from '@mui/material/Rating';
  > ```

- Change the default empty icon to improve accessibility. If you have a custom `icon` prop but no `emptyIcon` prop, you can restore the previous behavior with:

  ```diff
   <Rating
     icon={customIcon}
  +  emptyIcon={null}
   />
  ```

- Rename `visuallyhidden` to `visuallyHidden` for consistency:

  ```diff
   <Rating
     classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
     }}
   />
  ```

### RootRef

- This component was removed. You can get a reference to the underlying DOM node of our components via `ref` prop. The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which is

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake ``RootRef` component to prevent application crash, further fixes are required.
<pre><code class="diff">  <RootRef rootRef={ref}>
  >   -  <Button />
  >   -</RootRef>
  +<Button re
``</pre>

### Select

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design guidelines. If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<Select value="Standard" />
  >   -<Select value="Outlined" variant="outlined" />
  >   +<Select value="Standard" variant="standard" />
  >   +<Select value="Outlined" />
  > ```

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined. The TextField already handles it by default.

  ```diff
  -<Select variant="outlined" labelWidth={20} />
  +<Select variant="outlined" label="Gender" />
  ```

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<Select classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<Select classes={{ select: 'class1 class2 class3' }} />
  ```

- The `event` in `onChange` is now a synthetic, native `Event` not a React event.

  ```diff
  -<Select onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
  +<Select onChange={(event: Event, value: unknown) => {}} />
  ```

  This was necessary to prevent overriding of `event.target` of the events that caused the change.

### Skeleton

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Skeleton from '@mui/lab/Skeleton';
  >   +import Skeleton from '@mui/material/Skeleton';
  > ```

- Rename `circle` to `circular` and `rect` to `rectangular` for consistency:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Skeleton variant="circle" />
  >   -<Skeleton variant="rect" />
  >   -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  >   +<Skeleton variant="circular" />
  >   +<Skeleton variant="rectangular" />
  >   +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  > ```

### Slider

- The `event` in `onChange` is now a synthetic, native `Event`, not a React event.

  ```diff
  -<Slider onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
  +<Slider onChange={(event: Event, value: unknown) => {}} />
  ```

  This was necessary to prevent overriding of `event.target` of the events that caused the change.

- The `ValueLabelComponent` and `ThumbComponent` prop is now part of the `components` prop.

  ```diff
   <Slider
  -  ValueLabelComponent={CustomValueLabel}
  -  ThumbComponent={CustomThumb}
  +  components={{
  +    ValueLabel: CustomValueLabel,
  +    Thumb: CustomThumb,
  +  }}
   />
  ```

- Rework the CSS to match the latest [Material Design guidelines](https://material.io/components/sliders) and make custom styles more intuitive. [See documentation](/material-ui/react-slider/).

  <a href="/material-ui/react-slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

  You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](/material-ui/react-slider/#sizes).

### Snackbar

- The notification now displays at the bottom left on large screens. This better matches the behavior of Gmail, Google Keep, material.io, etc. You can restore the previous behavior with: You can restore the previous behavior with: You can restore the previous behavior with:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- The onE\* transition props were removed. Use TransitionProps instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Snackbar
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

### SpeedDial

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import SpeedDial from '@mui/lab/SpeedDial';
  >   -import SpeedDialAction from '@mui/lab/SpeedDialAction';
  >   -import SpeedDialIcon from '@mui/lab/SpeedDialIcon';
  >   +import SpeedDial from '@mui/material/SpeedDial';
  >   +import SpeedDialAction from '@mui/material/SpeedDialAction';
  >   +import SpeedDialIcon from '@mui/material/SpeedDialIcon';
  > ```

### Stepper

- The root component (Paper) was replaced with a div. Stepper no longer has elevation, nor inherits Paper's props. This change is meant to encourage composition.

  ```diff
  +<Paper square elevation={2}>
  -  <Stepper elevation={2}>
  +  <Stepper>
       <Step>
         <StepLabel>Hello world</StepLabel>
       </Step>
     </Stepper>
  +<Paper>
  ```

- Remove the built-in 24px padding.

  ```diff
  -<Stepper>
  +<Stepper style={{ padding: 24 }}>
     <Step>
       <StepLabel>Hello world</StepLabel>
     </Step>
   </Stepper>
  ```

### SvgIcon

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikey event that you were using the value `default`, the prop can be removed:

  ```diff
  -<SvgIcon fontSize="default">
  +<SvgIcon>
     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
   </SvgIcon>
  ```

### Switch

- Deprecate the second argument from `onChange`. You can pull out the checked state by accessing `event.target.checked`.

  ```diff
  function MySwitch() {
  - const handleChange = (event: React. ChangeEvent<HTMLInputElement>, checked: boolean) => {
  + const handleChange = (event: React. ChangeEvent<HTMLInputElement>) => {
  +   const checked = event.target.checked;
    };

    return <Switch onChange={handleChange} />;
  }
  ```

- The switch color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the switch closer to the Material Design guidelines.

  ```diff
  -<Switch />
  +<Switch color="secondary" />
  ```

- The component doesn't have `. MuiIconButton-root` and `. MuiIconButton-label` class names anymore, target `. MuiButtonBase-root` instead.

  ```diff
   <span class="MuiSwitch-root">
  -  <span class="MuiIconButton-root MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  -    <span class="MuiIconButton-label">
  -      <input class="MuiSwitch-input PrivateSwitchBase-input">
  +  <span class="MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  +    <span class="MuiSwitch-input PrivateSwitchBase-input">
  ```

### Table

- Rename the `default` value of the `padding` prop to `normal`.

  ```diff
  -<Table padding="default" />
  -<TableCell padding="default" />
  +<Table padding="normal" />
  +<TableCell padding="normal" />
  ```

### TablePagination

- The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop. This increases consistency with the `Pagination` component.

  ```diff
   <TablePagination
  -  backIconButtonText="Avant"
  -  nextIconButtonText="Après"
  +  getItemAriaLabel={…}
  ```

- Rename `onChangeRowsPerPage` to `onRowsPerPageChange` and `onChangePage` to `onPageChange` due to API consistency.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <TablePagination
  >   -  onChangeRowsPerPage={()=>{}}
  >   -  onChangePage={()=>{}}
  >   +  onRowsPerPageChange={()=>{}}
  >   +  onPageChange={()=>{}}
  > ```

- Separate classes for different table pagination labels. This allows simpler customizations.

  ```diff
   <TablePagination
  -  classes={{ caption: 'foo' }}
  +  classes={{ selectLabel: 'foo', displayedRows: 'foo' }}
   />
  ```

- Move the custom class on `input` to `select`. The `input` key is being applied on another element.

  ```diff
   <TablePagination
  -  classes={{ input: 'foo' }}
  +  classes={{ select: 'foo' }}
   />
  ```

### Tabs

- Change the default `indicatorColor` and `textColor` prop values to "primary". This is done to match the most common use cases with Material Design.

  ```diff
  -<Tabs />
  +<Tabs indicatorColor="primary" textColor="inherit" />
  ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<Tabs onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
  ```

- The API that controls the scroll buttons has been split it in two props.

  - The `scrollButtons` prop controls when the scroll buttons are displayed depending on the space available.
  - The `allowScrollButtonsMobile` prop removes the CSS media query that systematically hide the scroll buttons on mobile.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Tabs scrollButtons="on" />
  >   -<Tabs scrollButtons="desktop" />
  >   -<Tabs scrollButtons="off" />
  >   +<Tabs scrollButtons allowScrollButtonsMobile />
  >   +<Tabs scrollButtons />
  >   +<Tabs scrollButtons={false} />
  > ```

### Tab

- Tab `minWidth` changed from `72px` => `90px` (without media-query) according to [material-design spec](https://material.io/components/tabs#specs)
- Tab `maxWidth` changed from `264px` => `360px` according to [material-design spec](https://material.io/components/tabs#specs)
- `span` element that wraps children has been removed. `wrapper` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26926).

  ```diff
   <button class="MuiTab-root">
  -  <span class="MuiTab-wrapper">
       {icon}
       {label}
  -  </span>
   </button>
  ```

### TextField

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design guidelines.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<TextField value="Standard" />
  >   -<TextField value="Outlined" variant="outlined" />
  >   +<TextField value="Standard" variant="standard" />
  >   +<TextField value="Outlined" />
  > ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextField rowsMax={6}>
  >   +<TextField maxRows={6}>
  > ```

- Better isolate the fixed textarea height behavior to the dynamic one. You need to use the `minRows` prop in the following case:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextField rows={2} maxRows={5} />
  >   +<TextField minRows={2} maxRows={5} />
  > ```

- Change ref forwarding expectations on custom `inputComponent`. The component should forward the `ref` prop instead of the `inputRef` prop.

  ```diff
  -function NumberFormatCustom(props) {
  -  const { inputRef, onChange, ...other } = props;
  +const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  +  props,
  +  ref,
  +) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
  -     getInputRef={inputRef}
  +     getInputRef={ref}
  ```

- Rename `marginDense` and `inputMarginDense` classes to `sizeSmall` and `inputSizeSmall` to match the prop.

  ```diff
  -<Input margin="dense" />
  +<Input size="small" />
  ```

- Set the InputAdornment `position` prop to `start` or `end`. Use `start` if used as the value of the `startAdornment` prop. Use `end` if used as the value of the `endAdornment` prop.

  ```diff
  -<TextField startAdornment={<InputAdornment>kg</InputAdornment>} />
  -<TextField endAdornment={<InputAdornment>kg</InputAdornment>} />
  +<TextField startAdornment={<InputAdornment position="start">kg</InputAdornment>} />
  +<TextField endAdornment={<InputAdornment position="end">kg</InputAdornment>} />
  ```

### TextareaAutosize

- Remove the `rows` prop, use the `minRows` prop instead. This change aims to clarify the behavior of the prop.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareaAutosize rows={2} />
  >   +<TextareaAutosize minRows={2} />
  > ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareAutosize rowsMax={6}>
  >   +<TextareAutosize maxRows={6}>
  > ```

- Rename `rowsMin` prop with `minRows` for consistency with HTML attributes.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareAutosize rowsMin={1}>
  >   +<TextareAutosize minRows={1}>
  > ```

### ToggleButton

- Move the component from the lab to the core. The component is now stable.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ToggleButton from '@mui/lab/ToggleButton';
  >   -import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
  >   +import ToggleButton from '@mui/material/ToggleButton';
  >   +import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/27111).

  ```diff
   <button class="MuiToggleButton-root">
  -  <span class="MuiToggleButton-label">
       {children}
  -  </span>
   </button>
  ```

### Tooltip

- Tooltips are now interactive by default.

  The previous default behavior failed [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus). To reflect the new default value, the prop was renamed to `disableInteractive`. If you want to restore the old behavior (thus not reaching level AA), you can apply the following diff:

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  # Interactive tooltips no longer need the `interactive` prop.
  -<Tooltip interactive>
  +<Tooltip>
  ```

### Typography

- Remove the `srOnly` variant. You can use the `visuallyHidden` utility in conjunction with the `sx` prop instead.

  ```diff
  +import { visuallyHidden } from '@mui/utils';

  -<Typography variant="srOnly">Create a user</Typography>
  +<span style={visuallyHidden}>Create a user</span>
  ```

- The props: `alignItems` `alignContent` and `justifyContent` and their `classes` and style overrides keys were removed: "align-items-xs-center", "align-items-xs-flex-start", "align-items-xs-flex-end", "align-items-xs-baseline", "align-content-xs-center", "align-content-xs-flex-start", "align-content-xs-flex-end", "align-content-xs-space-between", "align-content-xs-space-around", "justify-content-xs-center", "justify-content-xs-flex-end", "justify-content-xs-space-between", "justify-content-xs-space-around" and "justify-content-xs-space-evenly". These props are now considered part of the system, not on the `Grid` component itself. If you still wish to add overrides for them, you can use the `theme.components.
MuiGrid.variants` options.

  ```diff
  const theme = createTheme({
    components: {
      MuiTypography: {
  -     styleOverrides: {
  -       colorSecondary: {
  -         marginTop: '20px',
  -       },
  -     },
  +     variants: {
  +       props: { color: "secondary" },
  +       style: {
  +         marginTop: '20px',
  +       },
  +     }],
      },
    },
  });
  ```

### Theme

- The default background color is now `#fff` in light mode and `#121212` in dark mode. This matches the Material Design guidelines.
- Breakpoints are now treated as values instead of [ranges](https://v4.mui.com/customization/breakpoints/#default-breakpoints). The behavior of `down(key)` was changed to define a media query below the value defined by the corresponding breakpoint (exclusive), rather than the breakpoint above. `between(start, end)` was also updated to define a media query for the values between the actual values of start (inclusive) and end (exclusive). When using the `down()` breakpoints utility you need to update the breakpoint key by one step up. When using the `between(start, end)` the end breakpoint should also be updated by one step up.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  Here are some examples of the changes required:

  ```diff
  -theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
  +theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, md + 1) => [0, lg)
  +theme.breakpoints.between('sm', 'lg') // '@media (min-width:600px) and (max-width:1279.95px)' - [0, lg)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'xl') // '@media (min-width:600px)'
  +theme.breakpoints.up('sm') // '@media (min-width:600px)'
  ```

  The same should be done when using the `Hidden` component:

  ```diff
  -<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
+<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
  ```

- The default breakpoints were changed to better match the common use cases. They also better match the Material Design guidelines. [Read more about the change](https://github.com/mui/material-ui/issues/21902)

  ```diff
  {
    xs: 0,
    sm: 600,
  - md: 960,
  + md: 900,
  - lg: 1280,
  + lg: 1200,
  - xl: 1920,
  + xl: 1536,
  }
  ```

  If you prefer the old breakpoint values, use the snippet below.

  ```js
  import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
  ```

- The `theme.breakpoints.width` utility was removed because it's redundant. Use `theme.breakpoints.values` to get the same values.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -theme.breakpoints.width('md')
  >   +theme.breakpoints.values.md
  > ```

- The signature of `theme.palette.augmentColor` helper has changed:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

- The `theme.typography.round` helper was removed because it was no longer used. If you need it, use the function below:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```js
  >   function round(value) {
  >   return Math.round(value * 1e5) / 1e5;
  > }
  > ```

### `@mui/types`

- Rename the exported `Omit` type in `@mui/types`. The module is now called `DistributiveOmit`. The change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5. The built-in `Omit`, while similar, is non-distributive. This leads to differences when applied to union types. [See this StackOverflow answer for further details](https://stackoverflow.com/a/57103940/1009797).

  ```diff
  -import { Omit } from '@mui/types';
  +import { DistributiveOmit } from '@mui/types';
  ```

## Migrate theme's `styleOverrides` to emotion

Although your style overrides defined in the theme may partially work, there is an important difference on how the nested elements are styled. The `$` syntax used with JSS will not work with Emotion. You need to replace those selectors with a valid class selector.

### Replace state class names

```diff
 +import { outlinedInputClasses } from '@mui/material/OutlinedInput';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '& $notchedOutline': {
+         [`& .${outlinedInputClasses['notchedOutline']}`]: {
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

### Replace nested classes selectors with global class names

```diff
-import { withStyles } from '@mui/material/styles';
  +import { withStyles } from '@mui/styles';
  +import { createTheme, ThemeProvider } from '@mui/material/styles';

  +const defaultTheme = createTheme();
   const MyComponent = withStyles((props) => {
     const { classes, className, ...other } = props;
     return !!crwd_bt_771_tb_dwrc!!
   })(({ theme }) => ({ root: { background: theme.palette.primary.main }}));

   function App() {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={defaultTheme}><MyComponent /></ThemeProvider>;
   }
```

> Note: For each component we export a `[component]Classes` constant that contains all nested classes for that component. You can rely on this instead of hardcoding the classes.

```diff
-import { withTheme } from '@mui/material/styles';
  +import { withTheme } from '@mui/styles';
  +import { createTheme, ThemeProvider } from '@mui/material/styles';

  +const theme = createTheme();
   const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
```

Take a look at the whole [list of global state classnames](/material-ui/customization/how-to-customize/#state-classes) available.

## Migrate from JSS

This is the last step in the migration process to remove `@mui/styles` package from your codebase. We can use one of these two options, by order of preference:

### 1. Use `styled` or `sx` API

#### Codemod

We provide [a codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#jss-to-styled) to help migrate JSS styles to `styled` API, but this approach **increases the CSS specificity**.

> Note: Usually, you wouldn't write the styles like this if you were to write them manually. However, this is the best trasnformation that can be created via codemod we could come up with. So, if you want to refine them later, you can refer to the examples shown in the sections below.

```sh
npx @mui/codemod v5.0.0/jss-to-styled <path>
```

**Example transformation**:

```diff
 import Typography from '@mui/material/Typography';
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    backgroundColor: theme.palette.primary.main
-  },
-  cta: {
-    borderRadius: theme.shape.radius
-  },
-  content: {
-    color: theme.palette.common.white,
-    fontSize: 16,
-    lineHeight: 1.7
-  },
-}))
+const PREFIX = 'MyCard';
+const classes = {
+  root: `${PREFIX}-root`,
+  cta: `${PREFIX}-cta`,
+  content: `${PREFIX}-content`,
+}
+const Root = styled('div')(({ theme }) => ({
+  [`&.${classes.root}`]: {
+    display: 'flex',
+    alignItems: 'center',
+    backgroundColor: theme.palette.primary.main
+  },
+  [`& .${classes.cta}`]: {
+    borderRadius: theme.shape.radius
+  },
+  [`& .${classes.content}`]: {
+    color: theme.palette.common.white,
+    fontSize: 16,
+    lineHeight: 1.7
+  },
+}))

 export const MyCard = () => {
-  const classes = useStyles();
   return (
-    <div className={classes.root}>
+    <Root className={classes.root}>
       {/* The benefit of this approach is that the code inside Root stays the same. */}
       <Typography className={classes.content}>...</Typography>
       <Button className={classes.cta}>Go</Button>
-    </div>
+    </Root>
   )
 }
```

> 💡 You should run this codemod per small chunk of files and then check the changes because in some cases you might need to adjust the code after the transformation (this codemod won't cover all of the cases).

#### Manual

We recommend `sx` API over `styled` when you have to create responsive styles or needs minor CSS overrides. [Read more about `sx`](/system/the-sx-prop/#main-content).

```diff
 import Chip from '@mui/material/Chip';
-import makeStyles from '@mui/styles/makeStyles';
+import Box from '@mui/material/Box';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  wrapper: {
-    display: 'flex',
-  },
-  chip: {
-    padding: theme.spacing(1, 1.5),
-    boxShadow: theme.shadows[1],
-  }
-}));

 function App() {
-  const classes = useStyles();
   return (
-    <div>
-      <Chip className={classes.chip} label="Chip" />
-    </div>
+    <Box sx={{ display: 'flex' }}>
+      <Chip label="Chip" sx={{ py: 1, px: 1.5, boxShadow: 1 }} />
+    </Box>
   );
 }
```

In some cases, you might want to create multiple styled components in a file instead of increasing CSS specificity. for example:

```diff
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    borderRadius: 20,
-    background: theme.palette.grey[50],
-  },
-  label: {
-    color: theme.palette.primary.main,
-  }
-}))
+const Root = styled('div')(({ theme }) => ({
+  display: 'flex',
+  alignItems: 'center',
+  borderRadius: 20,
+  background: theme.palette.grey[50],
+}))

+const Label = styled('span')(({ theme }) => ({
+  color: theme.palette.primary.main,
+}))

 function Status({ label }) {
-  const classes = useStyles();
   return (
-    <div className={classes.root}>
-      {icon}
-      <span className={classes.label}>{label}</span>
-    </div>
+    <Root>
+      {icon}
+      <Label>{label}</Label>
+    </Root>
   )
 }
```

> **Note:** [https://siriwatk.dev/tool/jss-to-styled](https://siriwatk.dev/tool/jss-to-styled) is a tool that helps converting JSS to multiple styled components without increasing CSS specificity. (This tool is **not maintained** by MUI)

### 2. Use [tss-react](https://github.com/garronej/tss-react)

> Note: This API will not work if you are [using `styled-components` as underlying styling engine in place of `@emotion`](https://mui.com/material-ui/guides/interoperability/#styled-components).

The API is similar to JSS `makeStyles` but works with emotion. It is also features a much better TypeScript support than v4's `makeStyles`.

In order to use it, you'll need to add it to your project's dependencies:

```sh
npm install tss-react

// or with `yarn`
yarn add tss-react
```

...and to edit your providers:

```diff
 import { render } from 'react-dom';
-import { StylesProvider } from '@material-ui/core/styles';
+import createCache from '@emotion/cache';
+import { ThemeProvider } from '@mui/material/styles';

+export const muiCache = createCache({
+  'key': 'mui',
+  'prepend': true,
+});

 render(
-  <StylesProvider injectFirst>
+  <CacheProvider value={muiCache}>
     <Root />
-  </StylesProvider>,
+  </CacheProvider>,
   document.getElementById('root')
 );
```

Then here is one example:

```diff
 import React from 'react';
-import makeStyles from '@material-ui/styles/makeStyles';
+import { makeStyles } from 'tss-react/mui';
 import Button from '@mui/material/Button';
 import Link from '@mui/material/Link';

-const useStyles = makeStyles((theme) => {
+const useStyles = makeStyles()((theme) => {
   return {
     root: {
       color: theme.palette.primary.main,
     },
     apply: {
       marginRight: theme.spacing(2),
     },
   };
 });

 function Apply() {
-  const classes = useStyles();
+  const { classes } = useStyles();

   return (
     <div className={classes.root}>
       <Button component={Link} to="https://support.mui.com" className={classes.apply}>
         Apply now
       </Button>
     </div>
   );
 }

 export default Apply;
```

If you were using the `$` syntax, the transformation would look like this:

```diff
 import * as React from 'react';
-import makeStyles from '@material-ui/styles/makeStyles';
+import { makeStyles } from 'tss-react/mui';

-const useStyles = makeStyles((theme) => {
+const useStyles = makeStyles<void, 'child'>()((_theme, _params, classes) => ({
   parent: {
     padding: 30,
-    '&:hover $child': {
+    [`&:hover .${classes.child}`]: {
       backgroundColor: 'red',
     },
   },
   child: {
     backgroundColor: 'blue',
   },
 });

 function App() {
-  const classes = useStyles();
+  const { classes } = useStyles();

   return (
     <div className={classes.parent}>
       <div className={classes.children}>
         Background turns red when the mouse is hover the parent
       </div>
     </div>
   );
 }

 export default App;
```

> **Note:** In plain JS projects (not using TypeScript), remove `<void, 'child'>`.

Now, a comprehensive example using both the `$` syntax, `useStyles()` parameters and [an explicit name for the stylesheet](https://github.com/garronej/tss-react#naming-the-stylesheets-useful-for-debugging).

```diff
-import clsx from 'clsx';
-import { makeStyles, createStyles } from '@material-ui/core/styles';
+import { makeStyles } from 'tss-react/mui';

-const useStyles = makeStyles((theme) => createStyles<
-  'root' | 'small' | 'child', { color: 'primary' | 'secondary' }
->({
+const useStyles = makeStyles<
+  { color: 'primary' | 'secondary' }, 'child' | 'small'
+>({ name: 'App' })((theme, { color }, classes) => ({
-  root: ({ color })=> ({
+  root: {
     padding: 30,
-    '&:hover .child': {
+    [`&:hover .${classes.child}`]: {
       backgroundColor: theme.palette[color].main,
     }
-  }),
+  },
  small: {},
  child: {
    border: '1px solid black',
    height: 50,
-    '&.small': {
+    [`&.${classes.small}`]: {
        height: 30
    }
  }
-}, { name: 'App' });
+}));

 function App() {
-  const classes = useStyles({ color: 'primary' });
+  const { classes, cx } = useStyles({ color: 'primary' });

   return (
     <div className={classes.root}>
       <div className={classes.child}>
         The Background take the primary theme color when the mouse hovers the parent.
       </div>
-      <div className={clsx(classes.child, classes.small)}>
+      <div className={cx(classes.child, classes.small)}>
         The Background take the primary theme color when the mouse hovers the parent.
         I am smaller than the other child.
       </div>
     </div>
   );
 }

 export default App;
```

> **WARNING**: You should drop [`clsx`](https://www.npmjs.com/package/clsx) in favor of [`cx`](https://emotion.sh/docs/@emotion/css#cx). The key advantage of `cx` is that it detects emotion generated class names ensuring styles are overwritten in the correct order. **Note**: To ensure that your class names always includes the actual name of your components, you can provide the `name` as an implicitly named key (`name: { App }`). [See doc](https://github.com/garronej/tss-react#naming-the-stylesheets-useful-for-debugging).

#### `withStyles()`

`tss-react` also features a [type-safe implementation](https://github.com/garronej/tss-react#withstyles) of [v4's `withStyles()`](https://v4.mui.com/styles/api/#withstyles-styles-options-higher-order-component).

> **Note:** this library is **not maintained** by MUI. If you have any issue regarding to it, please open an issue in [tss-react repository](https://github.com/garronej/tss-react/issues/new).

```diff
-import Button from '@material-ui/core/Button';
+import Button from '@mui/material/Button';
-import withStyles from '@material-ui/styles/withStyles';
+import { withStyles } from 'tss-react/mui';

 const MyCustomButton = withStyles(
+  Button,
   (theme) => ({
     root: {
       minHeight: '30px',
     },
     textPrimary: {
       color: theme.palette.text.primary,
     },
     '@media (min-width: 960px)': {
       textPrimary: {
         fontWeight: 'bold',
       },
     },
   }),
-)(Button);
+);

 export default MyCustomButton;
```

#### Overriding styles - `classes` prop

[Documentation of the feature in v4](https://v4.mui.com/styles/advanced/#makestyles) - [Equivalent in `tss-react`](https://v4.mui.com/styles/advanced/#makestyles)

```diff
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

export default function GlobalCssPriority() {
  return (
    {/* Inject emotion before JSS */}
    <StyledEngineProvider injectFirst>
      {/* Your component tree.
```

#### Theme style overrides

[Global theme overrides](https://v4.mui.com/customization/components/#global-theme-override) is supported out of the box by TSS. You just need to follow [the related section of the migration guide](https://github.com/mui/material-ui/blob/bbdf5080fc9bd9d979d657a3cb237d88b27035d9/docs/data/material/guides/migration-v4/migration-v4.md?plain=1#L481-L500) and [provide a `name` to `makeStyles`](https://docs.tss-react.dev/page-1/makestyles-usestyles#naming-the-stylesheets-useful-for-debugging-and-theme-style-overrides).

In MUI v5 however, [style overrides also accept callbacks](https://mui.com/material-ui/customization/theme-components/). By default TSS is only able to provide the theme. If you want to provide the props and the `ownerState` [please refer to this documentation](https://docs.tss-react.dev/mui-theme-styleoverrides).

**Note:** `tss-react` is **not maintained** by MUI. If you have any question about how to setup SSR (Next.js) or if you are wondering how to customize the `theme` object please refer to `tss-react`'s documentation, the [Mui integration section](https://github.com/garronej/tss-react#mui-integration) in particular. You can also [submit an issue](https://github.com/garronej/tss-react/issues/new) for any bug or feature request and [start a discussion](https://github.com/garronej/tss-react/discussions) if you need help.

💡 Once you migrate all of the styling, remove unnecessary `@mui/styles` by

```sh
npm uninstall @mui/styles

// or with `yarn`
yarn remove @mui/styles
```

> **Warning:** Keep `@emotion/styled` as a dependency of your project, even if you never use it explicitly, it's a peer dependency of `@mui/material`.

## CSS Specificity

If you want to apply styles to components by importing a css file, you need to bump up specificity in order to always select the correct component. Consider the following example.

```js
import './style.css';
import Chip from '@mui/material/Chip';

const ChipWithGreenIcon = () => (
  <Chip
    classes={{ deleteIcon: 'green' }}
    label="delete icon is green"
    onDelete={() => {}}
  />
);
```

In this example, in order to correctly apply a particular style to the delete icon of `Chip`, you need to bump the specificity as shown below:

```css
. MuiChip-root .green {
  color: green;
}
```

The following will not correctly apply the style to the delete icon:

```css
.green {
  color: green;
}
```

## Troubleshooting

### Storybook emotion with v5

If your project uses Storybook v6.x, you will need to update `.storybook/main.js` webpack config to use the most recent version of emotion.

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

and update `.storybook/preview.js` (otherwise, the "Docs" tab in storybook will display empty page)

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

**Tested versions**

```json
{
  "@storybook/react": "6.3.8",
  "@storybook/addon-docs": "6.3.8",
  "@emotion/react": "11.4.1",
  "@emotion/styled": "11.3.0",
  "@mui/material": "5.0.2"
}
```

> Note: This setup is a workaround and might not work in all cases.

For more details, checkout these issues on GitHub.

- https://github.com/storybookjs/storybook/issues/16099
- https://github.com/mui/material-ui/issues/24282#issuecomment-796755133

### Cannot read property `scrollTop` of null

This error comes from `Fade`, `Grow`, `Slide`, `Zoom` components due to missing DOM Node.

You need to make sure that the children forward ref to DOM for custom component.

```jsx
// Ex. 1 ✅ html tag works since it is a DOM
<Fade in>
  <div>
    <CustomComponent />
  </div>
</Fade>

// Ex. 2 ❌ This will cause error. don't use Fragment as a child
<Fade in>
  <React. Fragment>
    <CustomComponent />
  </React. Fragment>
</Fade>;

// Ex. 3 ❌ This will cause error because `CustomComponent` does not forward ref to DOM
function CustomComponent() {
  return <div>...</div>;
}

<Fade in>
  <CustomComponent />
</Fade>;
```

```js
// ✅ Fixed by using `React.forwardRef` and pass to DOM.
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

### [Types] Property "palette", "spacing" does not exist on type 'DefaultTheme'

Since `makeStyles` is now exported from `@mui/styles` package which does not know about `Theme` in the core package. To fix this, you need to augment the `DefaultTheme` (empty object) in `@mui/styles` with `Theme` from the core. [Read more about module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

**TypeScript Project**

Put this snippet to your theme file:

```ts
// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}
```

**Javascript Project**

If your IDE (ex. VSCode) is able to infer types from `d.ts` file, create `index.d.ts` in your `src` folder with this snippet:

```js
// index.d.ts
declare module "@mui/private-theming" {
  import type { Theme } from "@mui/material/styles";

  interface DefaultTheme extends Theme {}
}
```

### [Jest] SyntaxError: Unexpected token 'export'

`@mui/material/colors/red` is considered private since v1.0.0. You should replace the import, [more details about this error](https://github.com/mui/material-ui/issues/27296).

You can use this codemod (**recommended**) to fix all the import in your project:

```sh
npx @mui/codemod v5.0.0/optimal-imports <path>
```

or fix it manually like this:

```diff
-import red from '@mui/material/colors/red';
+import { red } from '@mui/material/colors';
```

### makeStyles - TypeError: Cannot read property 'drawer' of undefined

This error occurs when calling `useStyles` (result of `makeStyles`) or `withStyles` outside of `<ThemeProvider>` scope like this:

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

You can fix by moving `useStyles` inside another component so that it is called under `<ThemeProvider>`.

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

### TypeError: Cannot read properties of undefined (reading 'pxToRem')

The root cause of this error comes from accessing empty theme. Make sure that you have follow these checklist:

- `styled` should only be imported from `@mui/material/styles` (If you are not using standalone `@mui/system`)

  ```js
  import { styled } from '@mui/material/styles';
  ```

- Make sure that no `useStyles` is called outside of `<ThemeProvider>`. If you have, consider fixing it like [this suggestion](#makestyles-typeerror-cannot-read-property-drawer-of-undefined)

For more details, [checkout this issue](https://github.com/mui/material-ui/issues/28496)

### Styles broken after migrating to v5

There are two reasons why the styles of the components may be broken after you finished with all the steps in the previous sections.

First, check if you have configured the `StyledEngineProvider` correct as shown in the [Style library](#style-library) section.

If the `StyledEngineProvider` is already used at the top of your application and the styles are still broken, it may be the case that you still have `@material-ui/core` in your application. It may be coming from some of the dependencies that you have, that still depend on `@material-ui/core` (v4).

The easiest way to check this is to run `npm ls @material-ui/core` (or `yarn why @material-ui/core`) which will give you the necessary information.

Here is one example:

```sh
$ npm ls @material-ui/core
project@0.1.0 /path/to/project
└─┬  @mui/x-data-grid@4.0.0
  └── @material-ui/core@4.12.3
```

You can notice based on the output above that `@material-ui/core` is a dependency of `@mui/x-data-grid`. In this specific example, you need to bump the version of `@mui/x-data-grid` to [version 5](https://www.npmjs.com/package/@mui/x-data-grid) so that it depends on `@mui/material` instead.
