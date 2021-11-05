# Migrando da v4 para v5

<p class="description">Sim, v5 foi lançada!</p>

If you're looking for the v4 docs, you can [find them here](https://material-ui.com/versions/).

## Introdução

Esta é uma referência para atualizar seu site de Material-UI v4 para v5. Embora haja muita coisa coberta aqui, você provavelmente não precisará fazer tudo no seu site. Faremos o nosso melhor para manter as coisas fáceis de seguir e o mais sequenciais possível, para que você possa começar a usar a v5 rapidamente!

## Por que você deve migrar

To get the benefits of bug fixes and a lot of improvements such as the new styling engine. Esta página de documentação cobre o _como_ migrar da v4 para a v5. O *por que* é abordado na [postagem no blog do Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Atualizando suas dependências

- [Update React & TypeScript](#update-react-amp-typescript-version)
- [ThemeProvider setup](#themeprovider-setup)
- [Utilitário para atualização](#update-material-ui-version)
- [Run codemods](#run-codemods)
  - [preset-safe](#preset-safe)
  - [variant-prop (optional)](#variant-prop)
  - [link-underline-hover (optional)](#link-underline-hover)
- [Supported changes](#handling-breaking-changes)
- [Migrate theme's `styleOverrides` to emotion](#migrate-themes-styleoverrides-to-emotion)
- [Migrate from JSS](#migrate-from-jss)
- [Resolução de problemas](#troubleshooting)

> 💡 Aim to create small commits on any changes to help the migration go more smoothly. If you encounter any issues, check the [Troubleshooting](#troubleshooting) section. For other errors not described there, [create an issue](https://github.com/mui-org/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.md) with this title format: `[Migration] Summary of your issue`.

## Tratamento de alterações recentes

- The minimum supported version of **React** was increased from v16.8.0 to v17.0.0.
- The minimum supported version of TypeScript was increased from v3.2 to v3.5.

  > We try to align with types released from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (i.e. packages published on npm under the `@types` namespace). We will not change the minimum supported version in a major version of Material-UI. However, we generally recommend to not use a TypeScript version older than the [lowest supported version of DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier)

A primeira coisa que você precisa fazer é atualizar suas dependências.

- `react-scripts`
- `@material-ui/types`
- `@material-ui/core/styles`

> 📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing to the next step.

## The props: `alignItems`

If you are using the utilities from `@material-ui/styles` together with the `@material-ui/core`, you should replace the use of `ThemeProvider` from `@material-ui/styles` with the one exported from `@material-ui/core/styles`. This way, the `theme` provided in the context will be available in both the styling utilities exported from `@material-ui/styles`, like `makeStyles`, `withStyles` etc. and the Material-UI components.

```js
"dependencies": {
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@material-ui/core": "^5.0.0"
}
```

> 📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing the next step.

## Atualize a versão do Material-UI

Ou execute

```sh
npm install @material-ui/core@next @emotion/react @emotion/styled

ou

yarn add @material-ui/core@next @emotion/react @emotion/styled
```

**Optional**: if you have one these packages, install the new package separately

- Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.
- For non-Material-UI components, use the `component` prop.

<details>
<summary>See all packages change</summary>

```text
-import { withTheme } from '@material-ui/core/styles';
  +import { withTheme } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const theme = createTheme();
   const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
```

The `@material-ui/styles` package is no longer part of `@material-ui/core/styles`. If you are using `@material-ui/styles` together with `@material-ui/core` you need to add a module augmentation for the `DefaultTheme`.

</details>

The minimum supported version of React was increased from v16.8.0 to v17.0.0.

```sh
npm install @emotion/react @emotion/styled

// or with `yarn`
yarn add @emotion/react @emotion/styled
```

> 💡 If you want to use MUI Core v5 with **styled-components** instead of emotion, check out [the installation guide](/getting-started/installation/#npm).

The `useThemeVariants` hook is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

You should have installed `@mui/styles` by now. It includes JSS, which duplicate with emotion. It's meant to allow a gradual migration to v5. You should be able to remove the dependency following [these steps](#migrate-from-jss).

> 📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing the next step.

You can use the [`theme-breakpoints` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#theme-breakpoints) for automatic migration of `theme.breakpoints`.

## Run codemods

We have prepared these codemods to ease your migration experience.

### Atualize a versão do Material-UI

This codemod contains most of the transformers that are useful for migration. (**This codemod should be applied only once per folder**)

```sh
npx @mui/codemod v5.0.0/preset-safe <path>
```

> You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

### Suporte de navegadores e versões de node

As seguintes alterações são aplicadas por este utilitário adaptador:

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

Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

### Componentes de classe sem o encaminhamento de refs

You can use the [`box-borderradius-values` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#box-borderradius-values) for automatic migration.

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

You can use the [`circularprogress-variant` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#circularprogress-variant) for automatic migration.

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

You can use the [`collapse-rename-collapsedheight` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#collapse-rename-collapsedheight) for automatic migration of both the prop and the classes key.

Once you have completed the codemod step, try running your application again. At this point, it should be running without error. Otherwise check out the [Troubleshooting](#troubleshooting) section. Next step, handling breaking changes in each component.

## Tratamento de alterações recentes

### Supported React version

Os indicativos de suporte do pacote padrão foram alterados. As versões exatas do suporte serão fixadas na consulta browserslist `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

O pacote padrão suporta as seguintes versões mínimas:

<!-- #stable-snapshot -->

- Node 12 (antes era 8)
- Chrome 84 (antes era 49)
- Edge 85 (antes 14)
- Firefox 78 (antes era 52)
- Safari 13 (macOS) e 12.2 (iOS) (antes era 10)
- para maiores detalhes (veja [.browserslistrc (seção `stable`)](https://github.com/mui-org/material-ui/blob/HEAD/.browserslistrc#L11))

Não há mais o suporte para o IE 11. Se você precisar do suporte para o IE 11, confira nosso [pacote legado](/guides/minimizing-bundle-size/#legacy-bundle).

### Supported TypeScript version

O suporte para componentes de classe, sem o encaminhamento de refs, na propriedade `component` ou como um elemento `children` imediato foi removido. Se você estava usando `unstable_createStrictModeTheme` ou não recebeu quaisquer avisos relacionados a `findDOMNode` no `React. StrictMode`, então você não precisa fazer nada. Caso contrário, confira a seção ["Advertência com refs" em nosso guia de composição](/guides/composition/#caveat-with-refs) para descobrir como migrar. Esta alteração afeta quase todos os componentes no qual você está usando a propriedade `component` ou passando diretamente um  `children` para componentes que requerem `children` como elemento (ou seja, `<MenuList><CustomMenuItem /></MenuList>`)

### Style library

The style library used by default in v5 is [`emotion`](https://github.com/emotion-js/emotion). While migrating from JSS to emotion, and if you are using JSS style overrides for your components (for example overrides created by `makeStyles`), you will need to take care of the CSS injection order. To do so, you need to have the `StyledEngineProvider` with the `injectFirst` option at the top of your component tree.

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

```jsx
Agora você pode sobrescrever os estilos do Material-UI. import * as React from 'react';
import { StylesProvider } from '@material-ui/core';

export default function GlobalCssPriority() {
  return (
    <StylesProvider injectFirst>
      {/* Your component tree. import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. */}
    </StylesProvider>
  );
}
```

> **Note:** If you are using emotion to style your app, and have a custom cache, it will override the one provided by Material-UI. In order for the injection order to still be correct, you need to add the `prepend` option to `createCache`.
> 
> ✅ This is handled in the [preset-safe codemod](#preset-safe).

You can use the [`variant-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#variant-prop) for automatic migration.

```diff
 import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CssModulesPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Sua árvore de componentes. */}
    </CacheProvider>
  );
}
```

> **Note:** If you are using styled-components and have `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`. To see how it can be done, take a look at the [`StyledEngineProvider` implementation](https://github.com/mui-org/material-ui/blob/HEAD/packages/mui-styled-engine-sc/src/StyledEngineProvider/StyledEngineProvider.js) in the `@material-ui/styled-engine-sc` package.

### Tema

The structure of the theme has changed in v5. You need to update its shape. For a smoother transition, the `adaptV4Theme` helper allows you to iteratively upgrade to the new theme structure.

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
  +import { createTheme } from '@material-ui/core/styles';

  -const theme = createMuiTheme({
  +const theme = createTheme({
```

> For a smoother transition, the `adaptV4Theme` helper allows you to iteratively upgrade to the new theme structure.

The following changes are supported by the adapter:

- A abstração com a função "gutters" não provou ser utilizada com frequência suficiente para ser valiosa.

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

- `theme.spacing` agora retorna valores únicos com a unidade px por padrão. Esta alteração melhora a integração com styled-components & emotion.

  > You can use the [`theme-spacing` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#theme-spacing) to remove any 'px' suffix from `theme.spacing` calls in a template string.

  Antes:

  ```js
  theme.spacing(2) => 16
  ```

  Depois:

  ```js
  theme.spacing(2) => '16px'
  ```

- The `theme.palette.type` key was renamed to `theme.palette.mode`, to better follow the "dark mode" term that is usually used for describing this feature.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    import { createTheme } from '@material-ui/core/styles';
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

- A assinatura do utilitário `theme.palette.augmentColor` foi alterada:

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

- A chave `theme.palette.text.hint` não era usada em componentes do Material-UI e foi removida. Se você depende dela, você pode adicioná-la de volta:

  ```diff
   import { createTheme } from '@material-ui/core/styles';

  -const theme = createTheme(),
  +const theme = createTheme({
  +  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  +});
  ```

- The components' definitions in the theme were restructure under the `components` key, to allow for easier discoverability of the definitions related to any one component.

  1. `props`

  ```diff
   import { createTheme } from '@material-ui/core/styles';

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
   -import { MuiThemeProvider } from '@material-ui/core/styles';
  +import { ThemeProvider } from '@material-ui/core/styles';
  ```

### Estilos

- Renomeado `fade` para `alpha` para descrever melhor a sua funcionalidade. O nome anterior estava gerando confusão quando a cor de entrada já tinha um valor alfa. O utilitário **sobrescreve** o valor alfa da cor.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   - import { fade } from '@material-ui/core/styles';
  >   + import { alpha } from '@material-ui/core/styles';
  > 
  >   const classes = makeStyles(theme => ({
  >   -  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   +  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   }));
  > ```

- The `createStyles` function from `@material-ui/core/styles` was moved to the one exported from `@material-ui/styles`. It is necessary for removing the dependency to `@material-ui/styles` in the core package.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createStyles } from '@material-ui/core/styles';
  > +import { createStyles } from '@material-ui/styles';
  > ```

### Sistema

#### ThemeProvider

The `MuiThemeProvider` component is no longer exported from `@material-ui/core/styles`. Use `ThemeProvider` instead.

```diff
-import { ThemeProvider } from '@material-ui/styles';
+import { ThemeProvider } from '@material-ui/core/styles';
```

The function `createMuiTheme` was renamed to `createTheme` to make more intuitive to use with `ThemeProvider`.

#### Default theme (TypeScript)

The `StylesProvider` component is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

> ✅ This is handled in the [preset-safe codemod](#preset-safe).

```ts
-import { useThemeVariants } from '@material-ui/core/styles';
  +import { useThemeVariants } from '@material-ui/styles';
```

### Componentes do core

- Nested imports of more than 1 level are private. You can't import color from `@mui/material/colors/red`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { Omit } from '@material-ui/types';
  >   +import { DistributiveOmit } from '@material-ui/types';
  > ```

### Uma barra de aplicativos proeminente.

#### createGenerateClassName

- The `createGenerateClassName` function is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { createGenerateClassName } from '@material-ui/core/styles';
  >   +import { createGenerateClassName } from '@material-ui/styles';
  > ```

  Você pode usar o  [codemod `moved-lab-modules`](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#moved-lab-modules) para realizar uma migração automática.

#### createMuiTheme

- The function `createMuiTheme` was renamed to `createTheme` to make it more intuitive to use with `ThemeProvider`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { styled } from '@material-ui/core/styles';
  >   +import { styled } from '@material-ui/styles';
  >   +import { createTheme, ThemeProvider } from '@material-ui/core/styles';
  > 
  >   +const theme = createTheme();
  >    const MyComponent = styled('div')(({ theme }) => ({ background: theme.palette.primary.main }));
  > 
  >    function App(props) {
  >   -  return <MyComponent />;
  >   +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
  >    }
  > ```

#### jssPreset

- The `jssPreset` object is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { jssPreset } from '@material-ui/core/styles';
  >   +import { jssPreset } from '@material-ui/styles';
  > ```

#### makeStyles

- The `makeStyles` JSS utility is no longer exported from `@material-ui/core/styles`. You can use `@material-ui/styles/makeStyles` instead. The function `createMuiTheme` was renamed to `createTheme` to make more intuitive to use with `ThemeProvider`. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { makeStyles } from '@material-ui/core/styles';
  >   +import { makeStyles } from '@material-ui/styles';
  >   +import { createTheme, ThemeProvider } from '@material-ui/core/styles';
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

- The `ServerStyleSheets` component is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { StylesProvider } from '@material-ui/core/styles';
  >   +import { StylesProvider } from '@material-ui/styles';
  > ```

#### ServerStyleSheets

- The `ServerStyleSheets` component is no longer exported from `@mui/material/styles`. You should import it directly from `@material-ui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import { ServerStyleSheets } from '@material-ui/core/styles';
  >   +import { ServerStyleSheets } from '@material-ui/styles';
  > ```

#### styled

- The `styled` JSS utility is no longer exported from `@material-ui/core/styles`. You can use `@material-ui/styles/styled` instead. The function `createMuiTheme` was renamed to `createTheme` to make more intuitive to use with `ThemeProvider`. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core/styles` instead.

  ```diff
  import * as React from 'react';
  import { withTheme  } from '@material-ui/core/styles';

  const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```

#### StylesProvider

- The `StylesProvider` component is no longer exported from `@mui/material/styles`. You should import it directly from `@material-ui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Skeleton from '@material-ui/lab/Skeleton';
  >   +import Skeleton from '@material-ui/core/Skeleton';
  > ```

#### useThemeVariants

- The `useThemeVariants` hook is no longer exported from `@mui/material/styles`. You should import it directly from `@material-ui/styles`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   import { createTheme } from '@material-ui/core/styles';
  > 
  >   const theme = createTheme({
  >     breakpoints: {
  >       values: {
  >         xs: 0,
  >         sm: 600,
  >         md: 960,
  >         lg: 1280,
  >         xl: 1920,
  >       },
  >     },
  >   });
  > ```

#### withStyles

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

- The `withStyles` JSS utility is no longer exported from `@material-ui/core/styles`. You can use `@material-ui/styles/withStyles` instead. The function `createMuiTheme` was renamed to `createTheme` to make more intuitive to use with `ThemeProvider`. If you are using this utility together with `@material-ui/core`, you should use the `ThemeProvider` component from `@material-ui/core/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   const theme = createTheme({
  >     components: {
  >       MuiCssBaseline: {
  >   -      styleOverrides: {
  >   -       '@global': {
  >   -          html: {
  >   -            WebkitFontSmoothing: 'auto',
  >   -          },
  >   -       },
  >   -      },
  >   +     styleOverrides: `
  >   +       html {
  >   +         -webkit-font-smoothing: auto;
  >   +       }
  >   +     `
  >       },
  >     },
  >   });
  > ```

#### withTheme

- The `withTheme` HOC utility has been removed from the `@material-ui/core/styles` package. You can use `@material-ui/styles/withTheme` instead. The function `createMuiTheme` was renamed to `createTheme` to make more intuitive to use with `ThemeProvider`. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core/styles` instead.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ToggleButton from '@material-ui/lab/ToggleButton';
  >   -import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
  >   +import ToggleButton from '@material-ui/core/ToggleButton';
  >   +import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
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

- This HOC was removed. There's an alternative using the `useMediaQuery` hook on [this page](/components/use-media-query/#migrating-from-withwidth).

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying hard-coded function to prevent the application from crashing.

### Alerta

#### GitHub

The `GitHub` icon was reduced in size from 24px to 22px wide to match the other icons size.

### Autocompletar

You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

### Sistema

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
  >   - gap={2}
  >   + gap="2px"
  >   >
  > ```

- Replace `css` prop with `sx` to avoid collision with styled-components & emotion `css` prop.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Box css={{ color: 'primary.main' }} />
  >   +<Box sx={{ color: 'primary.main' }} />
  > ```

  > Note that the system grid function wasn't documented in v4.

### Componentes do core

As the core components use emotion as their style engine, the props used by emotion are not intercepted. The prop `as` in the following code snippet will not be propagated to `SomeOtherComponent`.

```jsx
<MuiComponent component={SomeOtherComponent} as="button" />
```

### Uma barra de aplicativos proeminente.

- Remove z-index when position static and relative. This avoids the creation of a stacking context and rendering issues.
- The `color` prop has no longer any effect in dark mode. The app bar uses the background color required by the elevation to follow the [Material Design guidelines](https://material.io/design/color/dark-theme.html). Use `enableColorOnDark` to restore the behavior of v4.

  ```jsx
  <AppBar enableColorOnDark />
  ```

### Alerta

- Mova o componente do lab para o core. O componente agora é estável.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Alert from '@material-ui/lab/Alert';
  >   -import AlertTitle from '@material-ui/lab/AlertTitle';
  >   +import Alert from '@material-ui/core/Alert';
  >   +import AlertTitle from '@material-ui/core/AlertTitle';
  > ```

### Autocompletar

- Mova o componente do lab para o core. O componente agora é estável.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Autocomplete from '@material-ui/lab/Autocomplete';
  >   -import useAutocomplete  from '@material-ui/lab/useAutocomplete';
  >   +import Autocomplete from '@material-ui/core/Autocomplete';
  >   +import useAutoComplete from '@material-ui/core/useAutocomplete';
  > ```

- Remova a propriedade `debug`. Existem algumas alternativas mais simples: `open={true}`, Chrome devtools ["Emulate focused"](https://twitter.com/sulco/status/1305841873945272321), ou React devtools prop setter.
- `renderOption` deve agora retornar uma estrutura completa do DOM da opção. Isso torna as customizações mais fáceis. Você pode aplicar a alteração com:

  ```diff
   <Autocomplete
  - getOptionSelected={(option, value) => option.title === value.title}
  + isOptionEqualToValue={(option, value) => option.title === value.title}
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
  >   - renderOption={(option, { selected }) => (
  >   -   <React.
  > ```

### Avatar

- Renomeie `circle` para `circular` por uma questão de consistência:

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

- Mova o componente AvatarGroup do lab para o core.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import AvatarGroup from '@material-ui/lab/AvatarGroup';
  >   +import AvatarGroup from '@material-ui/core/AvatarGroup';
  > ```

### Emblema

- Renomeie `circle` para `circular` e `rectangle` para `rectangular` por uma questão de consistência.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Badge overlap="circle">
  >   -<Badge overlap="rectangle">
  >   +<Badge overlap="circular">
  >   +<Badge overlap="rectangular">
  >   <Badge classes={{
  >   - anchorOriginTopRightRectangle: 'className',
  >   - anchorOriginBottomRightRectangle: 'className',
  >   - anchorOriginTopLeftRectangle: 'className',
  >   - anchorOriginBottomLeftRectangle: 'className',
  >   - anchorOriginTopRightCircle: 'className',
  >   - anchorOriginBottomRightCircle: 'className',
  >   - anchorOriginTopLeftCircle: 'className',
  >   + anchorOriginTopRightRectangular: 'className',
  >   + anchorOriginBottomRightRectangular: 'className',
  >   + anchorOriginTopLeftRectangular: 'className',
  >   + anchorOriginBottomLeftRectangular: 'className',
  >   + anchorOriginTopRightCircular: 'className',
  >   + anchorOriginBottomRightCircular: 'className',
  >   + anchorOriginTopLeftCircular: 'className',
  >   }}>
  > ```

  ```diff
   import { Theme } from '@material-ui/core/styles';

declare module '@material-ui/styles' {
  interface DefaultTheme extends Theme {}
}
  ```

### BottomNavigation

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<BottomNavigation onChange={(event: React. ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React. SyntheticEvent) => {}} />
  ```

### BottomNavigationAction

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
   <button class="MuiIconButton-root">
  - <span class="MuiIconButton-label">
      <svg />
  - </span>
  </button>
  ```

### Box

- O valor de transformação da propriedade de sistema `borderRadius` foi alterado. Se ele receber um número, ele multiplica esse valor pelo valor de `theme.shape.borderRadius`. Use a string to provide an explicit `px` value.

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
  >   -<Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
  >   +<Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
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

- The `clone` prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a Material-UI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }} clone>
  -  <Button>Save</Button>
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

- The ability to pass a render prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a Material-UI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <Button {...props}>Save</Button>}
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

  O mesmo deve ser feito ao usar o componente `Hidden`:

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <button {...props}>Save</button>}
  -</Box>
  +<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
  ```

### Button

- A propriedade  `color` do botão agora é "primary" por padrão, e "default" foi removido. This makes the button closer to the Material Design guidelines and simplifies the API.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Button color="primary">
  >   -<Button color="default">
  >   +<Button>
  >   +<Button>
  > ```

  You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
   <button class="MuiButton-root">
  - <span class="MuiButton-label">
      children
  - </span>
  </button>
  ```

### Chip

- Renomeie a variante `default` para `filled` por uma questão de consistência.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

  Since `filled` is the default value, the variant prop can be deleted:

  ```diff
  -<Chip variant="default">
  +<Chip>
  ```

### Painel de expansão

- The component doesn't have `. MuiIconButton-root` and `. MuiIconButton-label` class names anymore, target `. MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### Conjunto de progressos

- The `static` variant has been renamed to `determinate`, and the previous appearance of `determinate` has been replaced by that of `static`. Era uma exceção para Material Design, e foi removida da especificação.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   <CircularProgress variant="static" classes={{ static: 'className' }} />
  >   +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  > ```

> NB: Se você já tinha customizado como "determinate", suas customizações provavelmente não são mais válidas. Por favor, remova-as.

### Collapse

- A propriedade `collapsedHeight` foi renomeada para `collapsedSize` para dar suporte para a direção horizontal.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Collapse collapsedHeight={40}>
  >   +<Collapse collapsedSize={40}>
  > ```

- A chave `classes.container` foi alterada para corresponder à convenção dos outros componentes.

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### CssBaseline

- The component was migrated to use the `@material-ui/styled-engine` (`emotion` or `styled-components`) instead of `jss`. You should remove the `@global` key when defining the style overrides for it. You could also start using the CSS template syntax over the JavaScript object syntax.

  ```diff
  const theme = createTheme({
    typography: {
      body1: {
        fontSize: '0.875rem',
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

### Diálogo

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

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
  >   />
  > ```

- Remove the `disableBackdropClick` prop because it is redundant. Em vez disso, ignore eventos de close em `onClose` quando `reason === 'backdropClick'`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Dialog
  >   - disableBackdropClick
  >   - onClose={handleClose}
  >   + onClose={(event, reason) => {
  >   +   if (reason !== 'backdropClick') {
  >   +     onClose(event, reason);
  >   +   }
  >   + }}
  >   />
  > ```

- Remove the `withMobileDialog` higher-order component. A hook API permite uma solução mais simples e flexível:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying hard-coded function to prevent application crash, further fixes are required. 
  > 
  > ```diff
  >   -import withMobileDialog from '@material-ui/core/withMobileDialog';
  >   +import { useTheme, useMediaQuery } from '@material-ui/core';
  > 
  >   function ResponsiveDialog(props) {
  >   - const { fullScreen } = props;
  >   + const theme = useTheme();
  >   + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  >     const [open, setOpen] = React.useState(false);
  > 
  >   // ...
  > 
  >   -export default withMobileDialog()(ResponsiveDialog);
  >   +export default ResponsiveDialog;
  > ```

- Flatten DialogTitle DOM structure, remove `disableTypography` prop

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<DialogTitle disableTypography>
  >   -  <Typography variant="h4" component="h2">
  >   +<DialogTitle>
  >   +  <Typography variant="h4" component="span">
  >        My header
  >      </Typography>
  > ```

### Divisor

- Use cor de borda em vez de cor de fundo. Ela impede a altura inconsistente em telas redimensionadas. If you have customized the color of the border, you will need to update the CSS property override:

  ```diff
  . MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### Painel de expansão

- Renomeie os componentes `ExpansionPanel` para `Accordion` para usar uma convenção de nome mais comum:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  >   -import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  >   -import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  >   -import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
  >   +import Accordion from '@material-ui/core/Accordion';
  >   +import AccordionSummary from '@material-ui/core/AccordionSummary';
  >   +import AccordionDetails from '@material-ui/core/AccordionDetails';
  >   +import AccordionActions from '@material-ui/core/AccordionActions';
  > 
  >   -<ExpansionPanel>
  >   +<Accordion>
  >   -  <ExpansionPanelSummary>
  >   +  <AccordionSummary>
  >        <Typography>Location</Typography>
  >        <Typography>Select trip destination</Typography>
  >   -  </ExpansionPanelSummary>
  >   +  </AccordionSummary>
  >   -  <ExpansionPanelDetails>
  >   +  <AccordionDetails>
  >        <Chip label="Barbados" onDelete={() => {}} />
  >        <Typography variant="caption">Select your destination of choice</Typography>
  >   -  </ExpansionPanelDetails>
  >   +  </AccordionDetails>
  >      <Divider />
  >   -  <ExpansionPanelActions>
  >   +  <AccordionActions>
  >        <Button size="small">Cancel</Button>
  >        <Button size="small">Save</Button>
  >   -  </ExpansionPanelActions>
  >   +  </AccordionActions>
  >   -</ExpansionPanel>
  >   +</Accordion>
  > ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React. ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React. SyntheticEvent, expanded: boolean) => {}} />
  ```

### ExpansionPanelDetails

- Remova `display: flex` de AccordionDetails, é muito opinativo. A maioria dos desenvolvedores espera uma exibição em bloco.

### ExpansionPanelSummary

- Renomeie `focused` para `focusVisible` por uma questão de consistência:

  ```diff
   <Accordion
    classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
    }}
  />
  ```

- Remova a propriedade `IconButtonProps` de AccordionSummary. O componente renderiza um elemento `<div>` em vez de um IconButton. A propriedade não é mais necessária.

### Fab

- Renomeie `round` para `circular` por uma questão de consistência:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Fab variant="round">
  >   +<Fab variant="circular">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/27112).

  ```diff
   <button class="MuiFab-root">
  -  <span class="MuiFab-label">
       {children}
  -  </span>
   </button>
  ```

### FormControl

- Altere a variante padrão de `standard` para `outlined`. Standard has been removed from the Material Design guidelines.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<FormControl value="Standard" />
  >   -<FormControl value="Outlined" variant="outlined" />
  >   +<FormControl value="Standard" variant="standard" />
  >   +<FormControl value="Outlined" />
  > ```

### FormControlLabel

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined.

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

- `alignContent` and `justifyContent` and their `classes` and style overrides keys were removed: "align-items-xs-center", "align-items-xs-flex-start", "align-items-xs-flex-end", "align-items-xs-baseline", "align-content-xs-center", "align-content-xs-flex-start", "align-content-xs-flex-end", "align-content-xs-space-between", "align-content-xs-space-around", "justify-content-xs-center", "justify-content-xs-flex-end", "justify-content-xs-space-between", "justify-content-xs-space-around" and "justify-content-xs-space-evenly". These props are now considered part of the system, not on the `Grid` component itself. If you still wish to add overrides for them, you can use the `theme.components. MuiGrid.variants` options.

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

- Renomeie os componentes `GridList` para `ImageList` para entrar em conformidade com o nome atual do componente no Material Design.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe).

- Renomeie no GridList a propriedade  `spacing` para  `gap` para ter conformidade com o atributo CSS.
- Rename the GridList `cellHeight` prop to `rowHeight`.
- Adicione a propriedade `variant` para o GridList.
- Renomeie no GridListItemBar a propriedade `actionPosition` para `position`. (Observe também as alterações de nome de classe relacionadas.)
- Use CSS object-fit. For IE11 support either use a polyfill such as https://www.npmjs.com/package/object-fit-images, or continue to use the v4 component.

  ```diff
  -import GridList from '@material-ui/core/GridList';
  -import GridListTile from '@material-ui/core/GridListTile';
  -import GridListTileBar from '@material-ui/core/GridListTileBar';
  +import ImageList from '@material-ui/core/ImageList';
  +import ImageListItem from '@material-ui/core/ImageListItem';
  +import ImageListItemBar from '@material-ui/core/ImageListItemBar';

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

- This component was removed because its functionality can be created with the [`sx`](/system/basics/#the-sx-prop) prop or the [`useMediaQuery`](/components/use-media-query) hook.

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

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
   <Snackbar
  -  onEnter={onEnter}
  -  onEntered={onEntered}
  -  onEntering={onEntering}
  -  onExit={onExit}
  -  onExited={onExited}
  -  onExiting={onExiting}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

### Link

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikey event that you were using the value `default`, the prop can be removed:

  > ✅ This is handled in [link-underline-hover codemod](#link-underline-hover), read the details before running this codemod. 
  > 
  > ```js
  >   createTheme({
  >     components: {
  >       MuiLink: {
  >         defaultProps: {
  >           underline: 'hover',
  >         },
  >       },
  >     },
  >   });
  > ```

### Menu

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

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
  >   >
  > ```

  > Note: The `selectedMenu` variant will no longer vertically align the selected item with the anchor.

- Change the default value of `anchorOrigin.vertical` to follow the Material Design guidelines. The menu now displays below the anchor instead of on top of it. Você pode reproduzir o comportamento anterior com:

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

  Read more about [MenuItem CSS API](/api/menu-item/#css)

### Modal

- Remove the `disableBackdropClick` prop because it is redundant. Remove the `disableBackdropClick` prop because it is redundant.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Modal
  >   - disableBackdropClick
  >   - onClose={handleClose}
  >   + onClose={(event, reason) => {
  >   +   if (reason !== 'backdropClick') {
  >   +     onClose(event, reason);
  >   +   }
  >   + }}
  >   />
  > ```

- Remove the `onEscapeKeyDown` prop because it is redundant. Em vez disso, use `onClose` com `reason === "escapeKeyDown"`.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <Modal
  >   - onEscapeKeyDown={handleEscapeKeyDown}
  >   + onClose={(event, reason) => {
  >   +   if (reason === 'escapeKeyDown') {
  >   +     handleEscapeKeyDown(event);
  >   +   }
  >   + }}
  >   />
  > ```

- Remova a propriedade `onRendered`. Dependendo da sua situação de uso,  use um [ref com callback](https://pt-br.reactjs.org/docs/refs-and-the-dom.html#callback-refs) no elemento filho ou um hook de efeito no componente filho.

### NativeSelect

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<NativeSelect classes={{ select: 'class1 class2 class3' }} />
  ```

### OutlinedInput

- The `theme.breakpoints.width` utility was removed because it's redundant. Use `theme.breakpoints.values` to get the same values.

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

### Paginação

- Mova o componente do lab para o core. O componente agora é estável.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Pagination from '@material-ui/lab/Pagination';
  >   -import PaginationItem from '@material-ui/lab/PaginationItem';
  >   -import { usePagination } from '@material-ui/lab/Pagination';
  >   +import Pagination from '@material-ui/core/Pagination';
  >   +import PaginationItem from '@material-ui/core/PaginationItem';
  >   +import usePagination from '@material-ui/core/usePagination';
  > ```

- Renomeie `round` para `circular` por uma questão de consistência:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<Pagination shape="round">
  >   -<PaginationItem shape="round">
  >   +<Pagination shape="circular">
  >   +<PaginationItem shape="circular">
  > ```

### Popover

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

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
  >   />
  > ```

- The `getContentAnchorEl` prop was removed to simplify the positioning logic.

### Popper

- Atualize [Popper.js](https://github.com/popperjs/popper-core) da v1 para v2. Esta biblioteca de terceiros introduziu muitas mudanças.<br /> Você pode ler [seu guia de migração](https://popper.js.org/docs/v2/migration-guide/) ou o seguinte resumo:

  - Os prefixos CSS mudaram:
    ```diff
    popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] $arrow': {
    + '&[data-popper-placement*="bottom"] $arrow': {
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

  - A API dos modificadores mudou muito. Há demasiadas alterações para serem cobertas neste guia.

### Portal

- Remova a propriedade `onRendered`. Dependendo da sua situação de uso,  use um [ref com callback](https://pt-br.reactjs.org/docs/refs-and-the-dom.html#callback-refs) no elemento filho ou um hook de efeito no componente filho.

### Botões de opção

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

- Mova o componente do lab para o core. O componente agora é estável.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import Rating from '@material-ui/lab/Rating';
  >   +import Rating from '@material-ui/core/Rating';
  > ```

- Altere o ícone padrão de vazio para melhorar a acessibilidade. Se você tiver uma propriedade `icon` customizada e não a propriedade `emptyIcon`, você pode reproduzir o comportamento anterior com:

  ```diff
   <Rating
    icon={customIcon}
  + emptyIcon={null}
  />
  ```

- Renomeie `visuallyhidden` para `visuallyHidden` por uma questão de consistência:

  ```diff
   <Rating
    classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
  ```

### RootRef

- Este componente foi removido. Você pode obter uma referência para o nó DOM subjacente dos nossos componentes através da propriedade  `ref`. The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which isdeprecated in `React.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake `RootRef` component to prevent application crash, further fixes are required. 
  > 
  > ```diff
  >   -<RootRef rootRef={ref}>
  >   -  <Button />
  >   -</RootRef>
  >   +<Button ref={ref} />
  > ```

### Caixa de seleção

- <code class="diff">  -&lt;RootRef rootRef={ref}>
  -  &lt;Button />
  -&lt;/RootRef>
  +&lt;Button ref={ref} />
`&lt;/pre>&lt;/li> &lt;/ul> &lt;/li>
&lt;/ul>

&lt;h3 spaces-before="0">Seleção&lt;/h3>

&lt;ul spaces="0" level="0" marker="-">
&lt;li marker="-" level="0" spaces="0" spaces-after-marker="0">Altere a variante padrão de &lt;code>standard</code> para `outlined`. Standard has been removed from the Material Design guidelines. If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<Select value="Standard" />
  >   -<Select value="Outlined" variant="outlined" />
  >   +<Select value="Standard" variant="standard" />
  >   +<Select value="Outlined" />
  > ```

- The `theme.breakpoints.width` utility was removed because it's redundant. Use `theme.breakpoints.values` to get the same values. The TextField already handles it by default.

  ```diff
  -<Select variant="outlined" labelWidth={20} />
  +<Select variant="outlined" label="Gender" />
  ```

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<Select classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<Select classes={{ select: 'class1 class2 class3' }} />
  ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React. ChangeEvent` but `React. SyntheticEvent`.

  ```diff
  -<Select onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  +<Select onChange={(event: Event, value: unknown) => {}} />
  ```

  This was necessary to prevent overriding of `event.target` of the events that caused the change.

### Skeleton

- Mova o componente do lab para o core. O componente agora é estável.

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
  -<Slider onChange={(event: React. ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React. SyntheticEvent, value: unknown) => {}} />
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

- Rework the CSS to match the latest [Material Design guidelines](https://material.io/components/sliders) and make custom styles more intuitive. [See documentation](/components/slider/). <a href="/components/slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

  You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](/components/slider/#sizes).

### Snackbar

- A notificação agora é exibida na parte inferior esquerda em telas grandes. This better matches the behavior of Gmail, Google Keep, material.io, etc. You can restore the previous behavior with: Você pode reproduzir o comportamento anterior com: Você pode reproduzir o comportamento anterior com:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- As propriedades de transição onE\* foram removidas. Em vez disso, use TransitionProps.

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

- Mova o componente do lab para o core. O componente agora é estável.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import SpeedDial from '@material-ui/lab/SpeedDial';
  >   -import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
  >   -import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
  >   +import SpeedDial from '@material-ui/core/SpeedDial';
  >   +import SpeedDialAction from '@material-ui/core/SpeedDialAction';
  >   +import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
  > ```

### Assistente

- O componente raiz (Paper) foi substituído por um div. Stepper não tem mais elevação, nem herda as propriedades de Paper. Esta alteração destina-se a incentivar a composição.

  ```diff
  import * as React from 'react';
  import { withStyles } from '@material-ui/styles';

  const MyComponent = withStyles({
    root: {
      backgroundColor: 'red',
    },
  })(({ classes }) => <div className={classes.root} />);

  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```

- Remova o padding automático de 24px.

  ```diff
  -import { withStyles } from '@material-ui/core/styles';
  +import { withStyles } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const defaultTheme = createTheme();
   const MyComponent = withStyles((props) => {
     const { classes, className, ...other } = props;
     return <div className={clsx(className, classes.root)} {...other} />
   })(({ theme }) => ({ root: { background: theme.palette.primary.main }}));

   function App() {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={defaultTheme}><MyComponent /></ThemeProvider>;
   }
  ```

### SvgIcon

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikey event that you were using the value `default`, the prop can be removed:

  ```diff
  -<SvgIcon fontSize="default">
  +<SvgIcon>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
  ```

### Interruptor

- Remove the second argument from `onChange`. You can pull out the checked state by accessing `event.target.checked`.

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
  -   <span class="MuiIconButton-root MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  -     <span class="MuiIconButton-label">
  -       <input class="MuiSwitch-input PrivateSwitchBase-input">
  +   <span class="MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  +     <span class="MuiSwitch-input PrivateSwitchBase-input">
  ```

### Tabela

- Rename the `default` value of the `padding` prop to `normal`.

  ```diff
  -<Table padding="default" />
  -<TableCell padding="default" />
  +<Table padding="normal" />
  +<TableCell padding="normal" />
  ```

### TablePagination

- A customização dos rótulos das ações da paginação da tabela deve ser feita com a propriedade `getItemAriaLabel`. Isso aumenta a consistência com o componente `Paginação`.

  ```diff
   <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après"
  + getItemAriaLabel={…}
  ```

- Renomeie `onChangeRowsPerPage` para `onRowsPerPageChange` e `onChangePage` para `onPageChange` por questões de consistência da API.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >    <TablePagination
  >   - onChangeRowsPerPage={()=>{}}
  >   - onChangePage={()=>{}}
  >   + onRowsPerPageChange={()=>{}}
  >   + onPageChange={()=>{}}
  > ```

- Separate classes for different table pagination labels. This allows simpler customizations.

  ```diff
   <TablePagination
  - classes={{ caption: 'foo' }}
  + classes={{ selectLabel: 'foo', displayedRows: 'foo' }}
  />
  ```

- Move the custom class on `input` to `select`. The `input` key is being applied on another element.

  ```diff
   <TablePagination
  - classes={{ input: 'foo' }}
  + classes={{ select: 'foo' }}
  />
  ```

### Abas

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

- A API que controla os botões de rolagem foi dividida em duas propriedades.

  - A propriedade `scrollButtons` controla quando os botões de rolagem são exibidos dependendo do espaço disponível.
  - A propriedade `allowScrollButtonsMobile` remove a consulta de mídia CSS que oculta sistematicamente os botões de rolagem no celular.

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
- `span` element that wraps children has been removed. `wrapper` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26926).

  ```diff
   <button class="MuiTab-root">
  -  <span class="MuiTab-wrapper">
       {icon}
       {label}
  -  </span>
   </button>
  ```

### TextField

- Altere a variante padrão de `standard` para `outlined`. Standard has been removed from the Material Design guidelines.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<TextField value="Standard" />
  >   -<TextField value="Outlined" variant="outlined" />
  >   +<TextField value="Standard" variant="standard" />
  >   +<TextField value="Outlined" />
  > ```

- Renomeie a propriedade `rowsMax` para `maxRows` por questão de consistência com atributos HTML.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextField rowsMax={6}>
  >   +<TextField maxRows={6}>
  > ```

- Melhor isolar o comportamento fixo de altura do textarea para o dinâmico. Você precisa usar a propriedade `minRows` da seguinte forma:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextField rows={2} maxRows={5} />
  >   +<TextField minRows={2} maxRows={5} />
  > ```

- Altere o que é esperado no encaminhamento de ref no componente customizado `inputComponent`. O componente deve encaminhar a propriedade `ref` em vez da propriedade `inputRef`.

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

- Renomeie as classes `marginDense` e `inputMarginDense` para `sizeSmall` e `inputSizeSmall` para corresponder com a propriedade.

  ```diff
  -<Input margin="dense" />
  +<Input size="small" />
  ```

- Set the InputAdornment `position` prop to `start` or `end`. Use `start` if used as the value of the `startAdornment` prop. Use `end` if used as the value of the `endAdornment` prop.

  ```diff
  -<TextField startAdornment={<InputAdornment>Kg</InputAdornment>} />
  -<TextField endAdornment={<InputAdornment>Kg</InputAdornment>} />
  +<TextField startAdornment={<InputAdornment position="start">Kg</InputAdornment>} />
  +<TextField endAdornment={<InputAdornment position="end">Kg</InputAdornment>} />
  ```

### TextareaAutosize

- Remova a propriedade `rows`, use `minRows` em vez disso. Esta alteração visa esclarecer o comportamento da propriedade.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareaAutosize rows={2} />
  >   +<TextareaAutosize minRows={2} />
  > ```

- Renomeie a propriedade `rowsMax` para `maxRows` por questão de consistência com atributos HTML.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareAutosize rowsMax={6}>
  >   +<TextareAutosize maxRows={6}>
  > ```

- Renomeie a propriedade `rowsMin` para `minRows` por questão de consistência com atributos HTML.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -<TextareAutosize rowsMin={1}>
  >   +<TextareAutosize minRows={1}>
  > ```

### ToggleButton

- Mova o componente do lab para o core. O componente agora é estável.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -import ToggleButton from '@mui/lab/ToggleButton';
  >   -import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
  >   +import ToggleButton from '@mui/material/ToggleButton';
  >   +import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/27111).

  ```diff
   <button class="MuiToggleButton-root">
  -  <span class="MuiToggleButton-label">
       {children}
  -  </span>
   </button>
  ```

### Tooltip

- Dicas agora estão interativas por padrão.

  O comportamento padrão anterior era falho, como mostra neste artigo, [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus). Para refletir o novo valor padrão, a propriedade foi renomeada para `disableInteractive`. Se você quiser reproduzir o comportamento antigo (portanto não chegando ao nível AA), você pode aplicar a seguinte alteração:

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  #Dicas interativas não precisam mais da propriedade `interactive`.
  -<Tooltip interactive>
  +<Tooltip>
  ```

### Tipografia

- Remove the `srOnly` variant. You can use the `visuallyHidden` utility in conjunction with the `sx` prop instead.

  ```diff
  +import { visuallyHidden } from '@material-ui/utils';

  -<Typography variant="srOnly">Create a user</Typography>
  +<span style={visuallyHidden}>Create a user</span>
  ```

- The following `classes` and style overrides keys were removed: "colorInherit", "colorPrimary", "colorSecondary", "colorTextPrimary", "colorTextSecondary", "colorError", "displayInline" and "displayBlock". These props are now considered part of the system, not on the `Typography` component itself. If you still wish to add overrides for them, you can use the `theme.components. MuiTypography.variants` options. Por exemplo

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

### Tema

- The default background color is now `#fff` in light mode and `#121212` in dark mode. This matches the Material Design guidelines.
- Breakpoints are now treated as values instead of [ranges](https://v4.material-ui.com/customization/breakpoints/#default-breakpoints). The behavior of `down(key)` was changed to define a media query below the value defined by the corresponding breakpoint (exclusive), rather than the breakpoint above. `between(start, end)` was also updated to define a media query for the values between the actual values of start (inclusive) and end (exclusive). Ao usar o utilitário de pontos de quebra `down()`, você precisa atualizar a chave de ponto de quebra em um passo. Ao usar o `between(start, end)`, o ponto de quebra de fim também deve ser atualizado em um passo.

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

  O mesmo deve ser feito ao usar o componente `Hidden`:

  ```diff
  -<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
  +<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
  ```

- The default breakpoints were changed to better match the common use cases. They also better match the Material Design guidelines. [Read more about the change](https://github.com/mui-org/material-ui/issues/21902)

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

* The `theme.breakpoints.width` utility was removed because it's redundant. Use `theme.breakpoints.values` to get the same values.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```diff
  >   -theme.breakpoints.width('md')
  >   +theme.breakpoints.values.md
  > ```

* A assinatura do utilitário `theme.palette.augmentColor` foi alterada:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

* The `theme.typography.round` helper was removed because it was no longer used. If you need it, use the function below:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe). 
  > 
  > ```js
  >   function round(value) {
  >     return Math.round(value * 1e5) / 1e5;
  >   }
  > ```

### `@material-ui/styles`

- Rename the exported `Omit` type in `@material-ui/types`. The module is now called `DistributiveOmit`. The change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5. The built-in `Omit`, while similar, is non-distributive. This leads to differences when applied to union types. [See this StackOverflow answer for further details](https://stackoverflow.com/a/57103940/1009797).

  ```diff
  -import { Omit } from '@mui/types';
  +import { DistributiveOmit } from '@mui/types';
  ```

## Migrate theme's `styleOverrides` to emotion

Although your style overrides defined in the theme may partially work, there is an important difference on how the nested elements are styled. The `$` syntax used with JSS will not work with Emotion. You need to replace those selectors with a valid class selector.

### Replace state class names

```diff
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '&$focused': {
+         '&.Mui-focused': {
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
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '& $notchedOutline': {
+         '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

> Note: For each component we export a `[component]Classes` constant that contains all nested classes for that component. You can rely on this instead of hardcoding the classes.

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

Take a look at the whole [list of global state classnames](/customization/how-to-customize/#state-classes) available.

## Migrate from JSS

This is the last step in the migration process to remove `@mui/styles` package from your codebase. We can use one of these two options, by order of preference:

### 1. Use `styled` or `sx` API

#### Codemod

You can use the [`use-transitionprops` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#use-transitionprops) for automatic migration.

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

We recommend `sx` API over `styled` when you have to create responsive styles or needs minor CSS overrides. [Read more about `sx`](/system/the-sx-prop/#main-content).

```diff
 import Chip from '@mui/material/Chip';
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  wrapper: {
-    display: 'flex',
-  },
-  chip: {
-    padding: theme.spacing(1, 1.5),
-    boxShadow: theme.shadows[1],
-  }
-}))
+const Root = styled('div')({
+  display: 'flex',
+})

 function App() {
-  const classes = useStyles();
   return (
-    <div>
-      <Chip className={classes.chip} label="Chip" />
-    </div>
+    <Root>
+      <Chip label="Chip" sx={{ py: 1, px: 1.5, boxShadow: 1 }} />
+    </Root>
   )
 }
```

#### Manual

In some cases, you might want to create multiple styled components in a file instead of increasing CSS specificity. Aqui está um exemplo:

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

The API is similar to JSS `makeStyles` but works with emotion.

  <!-- Add material-ui component migration example -->

> **Note:** this library is **not maintained** by MUI. If you have any issue regarding to it, please open an issue in [tss-react repository](https://github.com/garronej/tss-react/issues/new).

💡 Once you migrate all of the styling, remove unnecessary `@mui/styles` by

```sh
npm uninstall @mui/styles

// or with `yarn`
yarn remove @mui/styles
```

## Resolução de problemas

### Storybook emotion with v5

Você precisa atualizar seu `package.json` para usar a versão mais recente do Material-UI e suas dependências de pares.

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
- https://github.com/mui-org/material-ui/issues/24282#issuecomment-796755133

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
  <React.Fragment>
    <CustomComponent />
  </React.Fragment>
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

For more details, checkout [this issue](https://github.com/mui-org/material-ui/issues/27154) on GitHub.

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

`@mui/material/colors/red` is considered private since v1.0.0. You should replace the import, [more details about this error](https://github.com/mui-org/material-ui/issues/27296).

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

You can use the [`component-rename-prop` codemod](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod#component-rename-prop) for automatic migration.

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

For more details, [checkout this issue](https://github.com/mui-org/material-ui/issues/28496)

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
