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

## Isolated demo

Isolated demos are disconnected from the page's theme and color scheme.
They are like mini apps within the documentation.

When `isolated: true` is set to the demo options, the demo will get props for creating isolated demo.
Those props should be passed to the `ThemeProvider` of the demo.

### Basic theme

```js title="DemoIsolated.js"
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
}

export default function DemoIsolated(props) {
  return (
    <ThemeProvider
      {...props}
      theme={createTheme({
        // ...custom theme
      })}
    >
      ...
    </ThemeProvider>
  );
}
```

### Mode toggle with CSS variables

{{"demo": "DemoModeToggle.js", "isolated": true, "bg": "inline" }}

```js title="DemoModeToggle.js"
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
}

export default function DemoModeToggle(props) {
  return (
    <ThemeProvider
      {...props}
      theme={createTheme({
        colorSchemes: { light: true, dark: true },
        cssVariables: {
          // required to make the demo isolated
          cssVarPrefix: props.cssVarPrefix,
          colorSchemeSelector: props.colorSchemeSelector || 'class',
        },
      })}
    >
      ...
    </ThemeProvider>
  );
}
```

:::info
The demo with `isolated` will always set to `system` mode when refresh the page. It will not store the selected mode to the local storage.
:::

### Custom theme with CSS variables

Provide custom palettes to light and/or dark color schemes.

{{"demo": "DemoModeToggleCustomTheme.js", "isolated": true, "bg": "inline", "theme": "dark" }}

```js title="DemoModeToggleCustomTheme.js"
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

export default function DemoModeToggleCustomTheme(props) {
  const theme = createTheme({
    cssVariables: {
      cssVarPrefix: props.cssVarPrefix,
      colorSchemeSelector: props.colorSchemeSelector || 'class',
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

`isolated: true` can be used with iframe demos. The difference is that the node to attach the color scheme selector will be the `html` of the iframe instead of the demo container.

{{"demo": "DemoModeToggleIframe.js", "bg": "inline", "defaultCodeOpen": false, "iframe": true, "isolated": true }}
