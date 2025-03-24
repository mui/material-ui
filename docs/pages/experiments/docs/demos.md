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

If the demo needs to demonstrate mode toggling, you need to set `isolated: true` to the demo and pass the props to the `ThemeProvider` in the demo.

{{"demo": "DemoModeToggle.js", "isolated": true, "bg": "inline" }}

```js
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    cssVarPrefix: 'demo', // to prevent clashing with other demos
    colorSchemeSelector: 'class', // any value except `media`
  },
});

export default function Demo(props) {
  return (
    <ThemeProvider {...props} theme={theme}>
      ...
    </ThemeProvider>
  );
}
```

## Iframe

{{"demo": "DemoIframe.js", "bg": "inline", "defaultCodeOpen": false, "iframe": true }}
