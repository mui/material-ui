# Default theme viewer

<p class="description">Explore the structure of Material-UI's default theme object, including all customizable properties and their default values.</p>

## Overview

Use the interactive tree view below to inspect the complete theme object with default settings. This helps you understand the available theme properties and their structure before customizing your own theme.

## Theme Implementation

For detailed information about how the theme is assembled, refer to:
- [`createTheme.ts`](https://github.com/mui/material-ui/blob/-/packages/mui-material/src/styles/createTheme.ts) - The main theme creation function
- Related imports and utilities that `createTheme()` depends on

## Browser Console Access

You can explore the documentation theme object interactively in your browser console. The `theme` variable is exposed on all documentation pages, allowing you to inspect and experiment with theme values in real-time:

```javascript
console.log(theme);
```

:::warning
**Note:** The documentation site applies a custom theme for MUI's organization branding. This differs from the default Material-UI theme shown in the viewer above.
:::

<hr/>

{{"demo": "DefaultTheme.js", "hideToolbar": true, "bg": "inline"}}
