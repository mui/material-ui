# Usage

<p class="description">Learn the basics of using Joy UI components.</p>

## Quickstart

The following code snippet demonstrates a simple app that uses the Joy UI [Button](/joy-ui/react-button/) component:

```jsx
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

export default function App() {
  return (
    <CssVarsProvider>
      <Button variant="solid">Hello World</Button>
    </CssVarsProvider>
  );
}
```

You can play around with this code in the interactive Code Sandbox demo below.
Try changing the `variant` on the Button to `soft` to see how the style changes:

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

### CssVarsProvider

In the example above, you can see that the Button component is nested within `<CssVarsProvider />`.
This provider unlocks a whole host of customization options powered by CSS variables.
See [Using CSS variables](/joy-ui/customization/using-css-variables/) for more details.

## Responsive meta tag

Joy UI is a _mobile-first_ component library—we write code for mobile devices first, and then scale up the components as necessary using CSS media queries.

To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element:

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```
