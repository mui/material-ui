# Usage

<p class="description">Learn the basics of working with Material UI components.</p>

## Getting started

The following code snippet demonstrates a simple app that uses the Material UI [Button](/material-ui/react-button/) component:

```jsx
import * as React from 'react';
import Button from '@mui/material/Button';

export default function MyApp() {
  return (
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}
```

You can play around with this code in the interactive Code Sandbox demo below.
Try changing the `variant` on the Button to `"outlined"` to see how the style changes:

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

## Globals

MUI usage experience can be improved with a handful of important globals that you'll need to be aware of.

### Responsive meta tag

MUI is developed mobile-first, a strategy in which we first write code for mobile devices, and then scale up components as necessary using CSS media queries.
To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element.

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

Material UI components work in isolation.
**They are self-supporting**, and will only inject the styles they need to display.
They don't rely on any global style-sheets such as [normalize.css](https://github.com/necolas/normalize.css/).

MUI provides an optional [CssBaseline](/material-ui/react-css-baseline/) component.
It fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## Versioned Documentation

This documentation always reflects the latest stable version of MUI.
You can find older versions of the documentation on a [separate page](https://mui.com/versions/).

## Next steps

Now that you have an idea of the basic setup, it's time to learn more about:

- How to provide [the Material Design font and typography](/material-ui/react-typography/).
- How to take advantage of the [theming solution](/material-ui/customization/theming/).
- How to [override](/material-ui/customization/how-to-customize/) the look and feel of the components.
