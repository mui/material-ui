---
components: CssBaseline
---

# CSS Baseline

<p class="description">Material-UI provides a CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon.</p>

You might be familiar with [normalize.css](https://github.com/necolas/normalize.css), a collection of HTML element and attribute style-normalizations.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}

export default MyApp;
```

## Approach

### Page

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- The margin in all browsers is removed.
- The default Material Design background color is applied.
It's using [`theme.palette.background.default`](/customization/default-theme/?expend-path=$.palette.background) for standard devices and a white background for print devices.

### Layout

- `box-sizing` is set globally on the `<html>` element to `border-box`.
Every element—including `*::before` and `*::after` are declared to inherit this property,
which ensures that the declared width of the element is never exceeded due to padding or border.

### Typography

- No base font-size is declared on the `<html>`, but 16px is assumed (the browser default).
You can learn more about the implications of changing the `<html>` default font size in [the theme documentation](/customization/typography/#typography-html-font-size) page.
- Set the `theme.typography.body2` style on the `<body>` element.
- Set the font-weight to "bolder" for the `<b>` and `<strong>` elements.
  Bolder is one font weight heavier than the parent element (among the available weights of the font).
- Font antialiasing is enabled for better display of the Roboto font.
