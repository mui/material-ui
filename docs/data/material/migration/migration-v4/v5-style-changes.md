# Breaking changes in v5, part one: styles and themes

<p class="description">This is a reference guide to the breaking changes introduced in Material UI v5, and how to migrating from v4. This part covers changes to styling and theming.</p>

## Material UI v5 migration

1. [Getting started](/material-ui/migration/migration-v4/)
2. Breaking changes part one: style and theme 👈 _you are here_
3. [Breaking changes part two: components](/material-ui/migration/v5-component-changes/)
4. [Migrating from JSS](/material-ui/migration/migrating-from-jss/)
5. [Troubleshooting](/material-ui/migration/troubleshooting/)

## Breaking changes, part one

Material UI v5 introduces a number of breaking changes from v4.
Many of these changes can be resolved automatically using [the codemods](/material-ui/migration/migration-v4/#run-codemods) described in the [main migration guide](/material-ui/migration/migration-v4/).

The following document lists all breaking changes related to styles and themes in v5 and how to address them.

After you're finished here, please move on to [Breaking changes in v5 part two: components](/material-ui/migration/v5-component-changes/) to continue the migration process.

:::warning
Breaking changes that are handled by codemods are denoted by a ✅ emoji in the table of contents on the right side of the screen.

If you have already followed the instructions in the main migration guide and run the codemods, then you should not need to take any further action on these items.

All other changes must be handled manually.
:::

## Migrate theme styleOverrides to Emotion

### Refactor local rule references

Although your style overrides defined in the theme may partially work, there is an important difference regarding how the nested elements are styled.

The `$` syntax (local rule reference) used with JSS will not work with Emotion.
You need to replace those selectors with a valid class selector.

#### Replace state class names

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

#### Replace nested classes selectors with global class names

```diff
 const theme = createTheme({
   components: {
     MuiOutlinedInput: {
       styleOverrides: {
         root: {
-          '& $notchedOutline': {
+          '& .MuiOutlinedInput-notchedOutline': {
             borderWidth: 1,
           }
         }
       }
     }
   }
 });
```

:::info
For each component, we export a `[component]Classes` constant that contains all nested classes for that component.

You can rely on this instead of hardcoding the classes.
:::

```diff
+import { outlinedInputClasses } from '@mui/material/OutlinedInput';

 const theme = createTheme({
   components: {
     MuiOutlinedInput: {
       styleOverrides: {
         root: {
-          '& $notchedOutline': {
+          [`& .${outlinedInputClasses.notchedOutline}`]: {
             borderWidth: 1,
           }
         }
       }
     }
   }
 });
```

Take a look at the complete [list of global state classnames](/material-ui/customization/how-to-customize/#state-classes) available.

### Refactor alternative syntax for space- and comma-separated values

The alternative, array-based syntax JSS supports for space- and comma-separated values is not supported by Emotion.

#### Replace array-based values with string-based values

**Before**

```jsx
const theme = createTheme({
  overrides: {
    MuiBox: {
      root: {
        background: [
          ['url(image1.png)', 'no-repeat', 'top'],
          ['url(image2.png)', 'no-repeat', 'center'],
          '!important',
        ],
      },
    },
  },
});
```

**After**

```jsx
const theme = createTheme({
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          background:
            'url(image1.png) no-repeat top, url(image2.png) no-repeat center !important',
        },
      },
    },
  },
});
```

Be sure to add units to numeric values as appropriate.

**Before**

```jsx
const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        padding: [[5, 8, 6]],
      },
    },
  },
});
```

**After**

```jsx
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: '5px 8px 6px',
        },
      },
    },
  },
});
```

## ref

### Refactor non-ref-forwarding class components

Support for non-ref-forwarding class components in the `component` prop or as immediate `children` has been dropped.

If you were using `unstable_createStrictModeTheme` or didn't see any warnings related to `findDOMNode` in `React.StrictMode` then you don't need to take any further action.

Otherwise check out the [Caveat with refs](/material-ui/guides/composition/#caveat-with-refs) section in the Composition guide to find out how to migrate.
This change affects almost all components where you're using the `component` prop or passing `children` to components that require `children` to be elements (for example `<MenuList><CustomMenuItem /></MenuList>`).

### Fix ref type specificity

For some components, you may get a type error when passing `ref`.
To avoid the error, you should use a specific element type.
For example, `Card` expects the type of `ref` to be `HTMLDivElement`, and `ListItem` expects its `ref` type to be `HTMLLIElement`.

Here is an example:

```diff
 import * as React from 'react';
 import Card from '@mui/material/Card';
 import ListItem from '@mui/material/ListItem';

 export default function SpecificRefType() {
-  const cardRef = React.useRef<HTMLElement>(null);
+  const cardRef = React.useRef<HTMLDivElement>(null);

-  const listItemRef = React.useRef<HTMLElement>(null);
+  const listItemRef = React.useRef<HTMLLIElement>(null);
   return (
     <div>
       <Card ref={cardRef}></Card>
       <ListItem ref={listItemRef}></ListItem>
     </div>
   );
 }
```

Here are the specific element types that each component expects:

#### @mui/material

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

#### @mui/lab

- [Timeline](/material-ui/api/timeline/) - `HTMLUListElement`

## Style library

### ✅ Adjust CSS injection order

The style library used by default in v5 is [Emotion](https://emotion.sh/docs/introduction).

If you were using JSS for the style overrides of Material UI components—for example, those created by `makeStyles`—you will need to take care of the CSS injection order.
JSS `<style`>' elements need to be injected in the `<head>` after Emotion `<style>`' elements.

To do so, you need to have the `StyledEngineProvider` with the `injectFirst` option at the top of your component tree, as shown here:

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

export default function GlobalCssPriority() {
  return (
    {/* Inject Emotion before JSS */}
    <StyledEngineProvider injectFirst>
      {/* Your component tree. Now you can override Material UI's styles. */}
    </StyledEngineProvider>
  );
}
```

### ✅ Add prepend to createCache

If you have a custom cache and are using Emotion to style your app, it will override the cache provided by Material UI.

To correct the injection order, add the `prepend` option to `createCache`, as shown below:

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
       {/* Your component tree. Now you can override Material UI's styles. */}
     </CacheProvider>
   );
 }
```

:::warning
If you are using styled-components and have a `StyleSheetManager` with a custom `target`, make sure that the target is the first element in the HTML `<head>`.

To see how it can be done, take a look at the [`StyledEngineProvider` implementation](https://github.com/mui/material-ui/blob/-/packages/mui-styled-engine-sc/src/StyledEngineProvider/StyledEngineProvider.js) in the `@mui/styled-engine-sc` package.
:::

## Theme structure

### ✅ Add adaptV4Theme helper

The structure of the theme has changed in v5. You need to update its shape.
For a smoother transition, the `adaptV4Theme` helper allows you to iteratively upgrade some of the theme changes to the new theme structure.

```diff
-import { createMuiTheme } from '@mui/material/styles';
+import { createTheme, adaptV4Theme } from '@mui/material/styles';

-const theme = createMuiTheme({
+const theme = createTheme(adaptV4Theme({
   // v4 theme
-});
+}));
```

:::warning
This adapter only handles the input arguments of `createTheme`.
If you modify the shape of the theme after its creation, you need to migrate the structure manually.
:::

The following changes are supported by the adapter:

### Remove gutters

The "gutters" abstraction hasn't proven to be used frequently enough to be valuable.

```diff
-theme.mixins.gutters(),
+paddingLeft: theme.spacing(2),
+paddingRight: theme.spacing(2),
+[theme.breakpoints.up('sm')]: {
+  paddingLeft: theme.spacing(3),
+  paddingRight: theme.spacing(3),
+},
```

### ✅ Remove px suffix

`theme.spacing` now returns single values with px units by default.
This change improves the integration with styled-components & Emotion.

Before:

```js
theme.spacing(2) => 16
```

After:

```js
theme.spacing(2) => '16px'
```

### ✅ Rename theme.palette.type

The `theme.palette.type` key was renamed to `theme.palette.mode`, to better follow the "dark mode" terminology that is usually used for describing this feature.

```diff
 import { createTheme } from '@mui/material/styles';
-const theme = createTheme({ palette: { type: 'dark' } }),
+const theme = createTheme({ palette: { mode: 'dark' } }),
```

### Change default theme.palette.info colors

The default `theme.palette.info` colors were changed to pass the AA accessibility standard contrast ratio in both light and dark modes.

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

### Change default theme.palette.success colors

The default `theme.palette.success` colors were changed to pass the AA accessibility standard contrast ratio in both light and dark modes.

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

### Change default theme.palette.warning colors

The default `theme.palette.warning` colors were changed to pass the AA accessibility standard contrast ratio in both light and dark modes.

```diff
  warning = {
-  main: orange[500],
+  main: '#ED6C02', // orange[400] in "dark" mode

-  light: orange[300],
+  light: orange[500], // orange[300] in "dark" mode

-  dark: orange[700],
+  dark: orange[900], // orange[700] in "dark" mode
  }
```

### Restore theme.palette.text.hint key (if needed)

The `theme.palette.text.hint` key was unused in Material UI components, and has been removed.
If you depend on it, you can add it back:

```diff
  import { createTheme } from '@mui/material/styles';

-const theme = createTheme(),
+const theme = createTheme({
+  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
+});
```

### Restructure component definitions

The component definitions in the theme were restructured under the `components` key to make them easier to find.

#### 1. props

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

#### 2. overrides

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

## @mui/styles

### Update ThemeProvider import

If you are using the utilities from `@mui/styles` together with the `@mui/material`, you should replace the use of `ThemeProvider` from `@mui/styles` with the one exported from `@mui/material/styles`.

This way, the `theme` provided in the context will be available in both the styling utilities exported from `@mui/styles`, like `makeStyles`, `withStyles`, etc., along with the Material UI components.

```diff
-import { ThemeProvider } from '@mui/styles';
+import { ThemeProvider } from '@mui/material/styles';
```

Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available in the utilities coming from `@mui/styles`.

### ✅ Add module augmentation for DefaultTheme (TypeScript)

The `@mui/styles` package is no longer part of `@mui/material/styles`.

If you are using `@mui/styles` together with `@mui/material` you need to add a module augmentation for the `DefaultTheme`.

```ts
// in the file where you are creating the theme (invoking the function `createTheme()`)
import { Theme } from '@mui/material/styles';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}
```

## @mui/material/colors

### ✅ Change color imports

Nested imports of more than one level are private. For example, you can no longer import `red` from `@mui/material/colors/red`.

```diff
-import red from '@mui/material/colors/red';
+import { red } from '@mui/material/colors';
```

## @mui/material/styles

### ✅ Rename fade to alpha

`fade` was renamed to `alpha` to better describe its functionality.

The previous name caused confusion when the input color already had an alpha value. The helper overrides the alpha value of the color.

```diff
-import { fade } from '@mui/material/styles';
+import { alpha } from '@mui/material/styles';

  const classes = makeStyles(theme => ({
-  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
+  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }));
```

### ✅ Update createStyles import

The `createStyles` function from `@mui/material/styles` was moved to the one exported from `@mui/styles`. It is necessary for removing the dependency on `@mui/styles` in the Material UI npm package.

```diff
-import { createStyles } from '@mui/material/styles';
+import { createStyles } from '@mui/styles';
```

### ✅ Update createGenerateClassName import

The `createGenerateClassName` function is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

```diff
-import { createGenerateClassName } from '@mui/material/styles';
+import { createGenerateClassName } from '@mui/styles';
```

To generate custom class names without using `@mui/styles`, check out [ClassName Generator](/material-ui/experimental-api/classname-generator/) for more details.

### ✅ Rename createMuiTheme

The function `createMuiTheme` was renamed to `createTheme` to make it more intuitive to use with `ThemeProvider`.

```diff
-import { createMuiTheme } from '@mui/material/styles';
+import { createTheme } from '@mui/material/styles';

-const theme = createMuiTheme({
+const theme = createTheme({
```

### ✅ Update MuiThemeProvider import

The `MuiThemeProvider` component is no longer exported from `@mui/material/styles`. Use `ThemeProvider` instead.

```diff
-import { MuiThemeProvider } from '@mui/material/styles';
+import { ThemeProvider } from '@mui/material/styles';
```

### ✅ Update jssPreset import

The `jssPreset` object is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

```diff
-import { jssPreset } from '@mui/material/styles';
+import { jssPreset } from '@mui/styles';
```

### ✅ Update `makeStyles` import

The `makeStyles` JSS utility is no longer exported from `@mui/material/styles`.
You can use `@mui/styles/makeStyles` instead.

Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available.

If you are using this utility together with `@mui/material`, it's recommended that you use the `ThemeProvider` component from `@mui/material/styles` instead.

```diff
-import { makeStyles } from '@mui/material/styles';
+import { makeStyles } from '@mui/styles';
+import { createTheme, ThemeProvider } from '@mui/material/styles';

+const theme = createTheme();
  const useStyles = makeStyles((theme) => ({
    background: theme.palette.primary.main,
  }));
  function Component() {
    const classes = useStyles();
    return <div className={classes.root} />
  }

  // In the root of your app
  function App(props) {
-  return <Component />;
+  return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
  }
```

### ✅ Update ServerStyleSheets import

The `ServerStyleSheets` component is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

```diff
-import { ServerStyleSheets } from '@mui/material/styles';
+import { ServerStyleSheets } from '@mui/styles';
```

### styled

The `styled` JSS utility is no longer exported from `@mui/material/styles`. You can use the one exported from `@mui/styles` instead.

Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available.

If you are using this utility together with `@mui/material`, it's recommended you use the `ThemeProvider` component from `@mui/material/styles` instead.

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

### ✅ Update StylesProvider import

The `StylesProvider` component is no longer exported from `@mui/material/styles`. You should import it directly from `@mui/styles`.

```diff
-import { StylesProvider } from '@mui/material/styles';
+import { StylesProvider } from '@mui/styles';
```

### ✅ Update useThemeVariants import

The `useThemeVariants` hook is no longer exported from `@mui/material/styles`.
You should import it directly from `@mui/styles`.

```diff
-import { useThemeVariants } from '@mui/material/styles';
+import { useThemeVariants } from '@mui/styles';
```

### ✅ Update withStyles import

The `withStyles` JSS utility is no longer exported from `@mui/material/styles`.
You can use `@mui/styles/withStyles` instead.

Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available.

If you are using this utility together with `@mui/material`, you should use the `ThemeProvider` component from `@mui/material/styles` instead.

```diff
-import { withStyles } from '@mui/material/styles';
+import { withStyles } from '@mui/styles';
+import { createTheme, ThemeProvider } from '@mui/material/styles';

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

### ✅ Replace innerRef with ref

Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component.

```diff
  import * as React from 'react';
  import { withStyles } from '@mui/styles';

  const MyComponent = withStyles({
    root: {
      backgroundColor: 'red',
    },
  })(({ classes }) => <div className={classes.root} />);

  function MyOtherComponent(props) {
    const ref = React.useRef();
-  return <MyComponent innerRef={ref} />;
+  return <MyComponent ref={ref} />;
  }
```

### Update withTheme import

The `withTheme` HOC utility has been removed from the `@mui/material/styles` package. You can use `@mui/styles/withTheme` instead.

Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available.

If you are using this utility together with `@mui/material`, it's recommended you use the `ThemeProvider` component from `@mui/material/styles` instead.

```diff
-import { withTheme } from '@mui/material/styles';
+import { withTheme } from '@mui/styles';
+import { createTheme, ThemeProvider } from '@mui/material/styles';

+const theme = createTheme();
  const MyComponent = withTheme(({ theme }) => <div>{theme.direction}</div>);

  function App(props) {
-  return <MyComponent />;
+  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
  }
```

### ✅ Remove withWidth

This HOC was removed. If you need this feature, you can try [the alternative that uses the `useMediaQuery` hook](/material-ui/react-use-media-query/#migrating-from-withwidth).

## @mui/icons-material

### Reduce GitHub icon size

The GitHub icon was reduced in size from 24px to 22px wide to match the size of the other icons.

## @material-ui/pickers

We have a [dedicated page](/material-ui/migration/pickers-migration/) for migrating `@material-ui/pickers` to v5.

## System

### ✅ Rename gap props

The following system functions and properties were renamed because they are considered deprecated CSS:

- `gridGap` becomes `gap`
- `gridRowGap` becomes `rowGap`
- `gridColumnGap` becomes `columnGap`

### ✅ Add spacing units to gap props

Use a spacing unit in `gap`, `rowGap`, and `columnGap`. If you were using a number previously, you need to mention the px to bypass the new transformation with `theme.spacing`.

```diff
  <Box
-  gap={2}
+  gap="2px"
  >
```

Replace `css` prop with `sx` to avoid collision with styled-components and Emotion's `css` prop.

```diff
-<Box css={{ color: 'primary.main' }} />
+<Box sx={{ color: 'primary.main' }} />
```

:::warning
The system grid function was not documented in v4.
:::
