# Usage

<p class="description">Learn the basics of working with Joy UI components.</p>

## Quickstart

The following code snippet demonstrates a simple app that uses the Joy UI [Button](/joy-ui/react-button/) component:

```jsx
import * as React from 'react';
import Button from '@mui/joy/Button';

export default function MyApp() {
  return <Button variant="solid">Hello World</Button>;
}
```

You can play around with this code in the interactive Code Sandbox demo below.
Try changing the `variant` on the Button to `soft` to see how the style changes:

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

### CssVarsProvider

In the Quickstart example above, you can see that the Button component is nested within `<CssVarsProvider />`.
This provider unlocks a whole host of customization options powered by CSS variables.
See [Using CSS variables](/joy-ui/customization/using-css-variables/) for more details.

## Globals

Since Joy UI components are built to function in isolation, they don't require any kind of globally scoped styles.
For a better user experience and developer experience, we recommend adding the following globals to your app.

### Responsive meta tag

Joy UI is a _mobile-first_ component library—we write code for mobile devices first, and then scale up the components as necessary using CSS media queries.

To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element:

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

Joy UI provides an optional [CssBaseline](/joy-ui/react-css-baseline/) component.
It fixes some inconsistencies across browsers and devices while providing resets that are better tailored to fit Joy UI than alternative global style sheets like [normalize.css](https://github.com/necolas/normalize.css/).

### Default font

Joy UI uses the Public Sans font by default.
See [Installation—Public Sans font](/joy-ui/getting-started/installation/#public-sans-font) for complete details.
