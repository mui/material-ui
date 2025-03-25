# Demos

<p class="description">The different variants of demo containers we have in the docs.</p>

## Standard demo

"Standard" refers to when no background is explicitly defined.
So, it renders the "outlined" background variant.

{{"demo": "DemoInDocs.js"}}

## "bg": "outlined"

{{"demo": "DemoInDocs.js", "bg": "outlined"}}

## "bg": "inline"

{{"demo": "DemoInDocs.js", "bg": "inline"}}

## "bg": true

{{"demo": "DemoInDocs.js", "bg": true}}

## "bg": gradient

{{"demo": "DemoInDocs.js", "bg": "gradient"}}

## "hideToolbar": true

{{"demo": "DemoInDocsNotEditable.js", "hideToolbar": true}}

## "hideToolbar": true, "bg": true

{{"demo": "DemoInDocsNotEditable.js", "hideToolbar": true, "bg": true}}

## "hideToolbar": true, "bg": "inline"

{{"demo": "DemoInDocsNotEditable.js", "hideToolbar": true, "bg": "inline"}}

## Multiple Tabs demo

{{"demo": "DemoMultiTabs.js", "bg": "inline" }}

## Mode toggle demo

If the demo needs to demonstrate mode toggling, you need to set `isolated: true` to the demo and pass the props to the `ThemeProvider` of the demo.

{{"demo": "DemoModeToggle.js", "isolated": true, "bg": "inline" }}

```js
import { ThemeProvider, useColorScheme } from '@mui/material/styles';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
}

export default function Demo(props) {
  return <ThemeProvider {...props}>...</ThemeProvider>;
}
```

:::info
The demo with `isolated` will always set to `system` mode when refresh the page. It will not store to the local storage.
:::

### Custom theme

Create a custom theme and pass the `cssVarPrefix` and `colorSchemeSelector` from the theme prop to the `createTheme` function.

{{"demo": "DemoModeToggleCustomTheme.js", "isolated": true, "bg": "inline", "theme": "dark" }}

```js
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

export default function Demo(props) {
  const theme = createTheme({
    cssVariables: {
      cssVarPrefix: props.theme.cssVarPrefix,
      colorSchemeSelector: props.theme.colorSchemeSelector,
    },
    colorSchemes: {
      light: {
        palette: {
          // ...custom palette
        },
      },
      dark: {
        palette: {
          // ...custom palette
        },
      },
    },
  });
  return (
    <ThemeProvider {...props} theme={theme}>
      ...
    </ThemeProvider>
  );
}
```

### Iframe demo

Similar to the above demos, you need to set `isolated: true` to the demo and pass the props to the `ThemeProvider` of the demo.

{{"demo": "DemoModeToggleIframe.js", "bg": "inline", "defaultCodeOpen": false, "iframe": true, "isolated": true }}
