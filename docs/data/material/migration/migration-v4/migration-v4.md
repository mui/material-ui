# Migration from v4 to v5

<p class="description">Yeah, v5 has been released!</p>

If you're looking for the v4 docs, you can [find them here](https://v4.mui.com/versions/).

## Introduction

This is a reference for upgrading your site from MUI Core v4 to v5.
While there's a lot covered here, you probably won't need to do everything.
We'll do our best to keep things easy to follow, and as sequential as possible, so you can quickly get rocking on v5!

## Why you should migrate

To get the benefits of bug fixes and a lot of improvements such as the new styling engine.
This documentation page covers the **how** of migrating from v4 to v5.
The **why** is covered in the [release blog post](/blog/mui-core-v5/).

## Migration steps

- [Update React & TypeScript](#update-react-amp-typescript-version)
- [ThemeProvider setup](#themeprovider-setup)
- [Update MUI Core version](#update-mui-core-version)
- [Run codemods](#run-codemods)
  - [preset-safe](#preset-safe)
  - [variant-prop (optional)](#variant-prop)
  - [link-underline-hover (optional)](#link-underline-hover)
- [Handling Breaking Changes](#handling-breaking-changes)
- [Migrate theme's `styleOverrides` to emotion](#migrate-themes-styleoverrides-to-emotion)
- [Migrate from JSS](#migrate-from-jss)
- [CSS specificity](#css-specificity)
- [Troubleshooting](#troubleshooting)

:::info
💡 Aim to create small commits on any changes to help the migration go more smoothly.
If you encounter any issues, check the [Troubleshooting](#troubleshooting) section. For other errors not described there, [create an issue](https://github.com/mui/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.yml) with this title format: `[Migration] Summary of your issue`.
:::

## Update React & TypeScript version

- The minimum supported version of **React** was increased from v16.8.0 to v17.0.0.
- The minimum supported version of **TypeScript** was increased from v3.2 to v3.5.

  :::warning
  We try to align with types released from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (i.e. packages published on npm under the `@types` namespace).
  We will not change the minimum supported version in a major version of MUI.
  However, we generally recommend not to use a TypeScript version older than the [lowest supported version of DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier)
  :::

**Note:** if your project includes these packages, please upgrade them to the `latest` version.

- `react-scripts`
- `@types/react`
- `@types/react-dom`

:::info
📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing to the next step.
:::

## `ThemeProvider` setup

Before upgrading to v5, please make sure that `ThemeProvider` is defined at the root of your application and in tests—even if you are using the default theme—and `useStyles` is _not_ called before `ThemeProvider`.
This is because we are going to use `@mui/styles` (JSS) **temporarily**, which requires `ThemeProvider`.

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

:::info
📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing the next step.
:::

## Update MUI Core version

To use the `v5` version of MUI Core, you first need to update the package names:

```sh
npm install @mui/material @mui/styles

// or with `yarn`
yarn add @mui/material @mui/styles
```

**Optional**: if you have one these packages, install the new package separately

- For `@material-ui/lab`, install `@mui/lab`
- For `@material-ui/icons`, install `@mui/icons-material`

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

The org & package names have been changed from `@material-ui` to [`@mui`](https://www.npmjs.com/org/mui) as part of the rebranding effort.
For more details about it, check our [blog post](/blog/material-ui-is-now-mui/) or [#27803](https://github.com/mui/material-ui/discussions/27803).

</details>

Then, you need to add the new peer dependencies - emotion packages:

```sh
npm install @emotion/react @emotion/styled

// or with `yarn`
yarn add @emotion/react @emotion/styled
```

:::info
💡 If you want to use MUI Core v5 with **styled-components** instead of emotion, check out [the installation guide](/material-ui/getting-started/installation/#npm).
:::

If you are using SSR (or a framework that depends on it), there is currently a [known bug](https://github.com/mui/material-ui/issues/29742) with the babel plugin for `styled-components`, which prevents `@mui/styled-engine-sc` (the adapter for `styled-components`) from being used. We strongly recommend using the default setup with emotion instead.

If you are using `@material-ui/pickers`, it has moved to `@mui/lab`. You can follow [these steps](#material-ui-pickers).

You should have installed `@mui/styles` by now.
It includes JSS, which duplicate with emotion.
It's meant to allow a gradual migration to v5.
You should be able to remove the dependency following [these steps](#migrate-from-jss).

:::info
📝 Please make sure that your application is still **running** without errors and **commit** the change before continuing the next step.
:::

Once you application has completely migrated to MUI Core v5, you can remove the old `@material-ui/*` packages by running `yarn remove` or `npm uninstall`.

## Run codemods

We have prepared these codemods to ease your migration experience.

### preset-safe

This codemod contains most of the transformers that are necessary for migration. (**This codemod should be applied only once per folder**)

```sh
npx @mui/codemod v5.0.0/preset-safe <path>
```

:::info
If you want to run the transformers one by one, check out the [preset-safe codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#-preset-safe) for more details.
:::

### variant-prop

Transform `<TextField/>, <FormControl/>, <Select/>` component by applying `variant="standard"` if no variant is defined (because default variant has changed from `standard` in **v4** to `outlined` in **v5**).

:::error
❗️ You should **NOT** use this codemod if you have already defined default `variant: "outlined"` in the theme.
:::

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
npx @mui/codemod v5.0.0/variant-prop <path>
```

For more details, check out the [variant-prop codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#variant-prop).

### link-underline-hover

Transforms the `<Link/>` component by applying `underline="hover"` if there is no `underline` prop defined (because default `underline` has changed from `"hover"` in **v4** to `"always"` in **v5**).

:::error
❗️ You should **NOT** use this codemod if you have already defined default `underline: "always"` in the theme.
:::

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
npx @mui/codemod v5.0.0/link-underline-hover <path>
```

For more details, checkout [link-underline-hover codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#link-underline-hover).

Once you have finished setting up with the codemods, try running your application again. At this point, it should be running without error. Otherwise check out the [Troubleshooting](#troubleshooting) section. Next step, handling breaking changes in each component.

## Migrate theme's `styleOverrides` to emotion

Although your style overrides defined in the theme may partially work, there is an important difference on how the nested elements are styled.
The `$` syntax used with JSS will not work with Emotion.
You need to replace those selectors with a valid class selector.

### Replace state class names

```diff
 const theme = createTheme({
   components: {
     MuiOutlinedInput: {
       styleOverrides: {
         root: {
-          '&$focused': {
+          '&.Mui-focused': {
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

> Note: For each component we export a `[component]Classes` constant that contains all nested classes for that component.
> You can rely on this instead of hardcoding the classes.

```diff
+import { outlinedInputClasses } from '@mui/material/OutlinedInput';

 const theme = createTheme({
   components: {
     MuiOutlinedInput: {
       styleOverrides: {
         root: {
-          '& $notchedOutline': {
+          [`& .${outlinedInputClasses['notchedOutline']}`]: {
             borderWidth: 1,
           }
         }
       }
     }
   }
 });
```

Take a look at the whole [list of global state classnames](/material-ui/customization/how-to-customize/#state-classes) available.

## CSS Specificity

If you want to apply styles to components by importing a css file, you need to bump up specificity in order to always select the correct component.
Consider the following example:

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
.MuiChip-root .green {
  color: green;
}
```

The following will not correctly apply the style to the delete icon:

```css
.green {
  color: green;
}
```
