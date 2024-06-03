---
productId: joy-ui
components: CssBaseline, ScopedCssBaseline
githubLabel: 'component: CssBaseline'
---

# CSS Baseline

<p class="description">Joy UI provides a CssBaseline component to kickstart an elegant, consistent, and simple baseline to build upon.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

## Global reset

You might be familiar with [normalize.css](https://github.com/necolas/normalize.css), a collection of HTML element and attribute style-normalizations.

```jsx
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

export default function MyApp() {
  return (
    <CssVarsProvider>
      {/* must be used under CssVarsProvider */}
      <CssBaseline />

      {/* The rest of your application */}
    </CssVarsProvider>
  );
}
```

## Scoping on children

However, you might be progressively migrating a website to Joy UI, using a global reset might not be an option.
It's possible to apply the baseline only to the children by using the `ScopedCssBaseline` component.

```jsx
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import ScopedCssBaseline from '@mui/joy/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  const [root, setRoot] = React.useState(null);
  return (
    {/* target the node to ScopedCssBaseline's div */}
    <CssVarsProvider colorSchemeNode={root}>
      {/* must be used under CssVarsProvider */}
      <ScopedCssBaseline ref={(element) => setRoot(element)}>
        {/* The rest of your application */}
        <MyApp />
      </ScopedCssBaseline>
    </CssVarsProvider>
  );
}
```

:::warning
Make sure you import `ScopedCssBaseline` first to avoid box-sizing conflicts as in the above example.
:::

## Approach

### Page

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- The margin in all browsers is removed.
- The default Material Design background color is applied.
  It's using `theme.palette.background.body` for standard devices and a white background for print devices.
- The CSS [`color-scheme`](https://web.dev/articles/color-scheme) is applied by default. You can disable it by setting `disableColorScheme` to true on the `CssBaseline` or `ScopedCssBaseline`.

### Layout

- `box-sizing` is set globally on the `<html>` element to `border-box`.
  Every element—including `*::before` and `*::after` are declared to inherit this property, which ensures that the declared width of the element is never exceeded due to padding or border.

### Color scheme

The CSS [`color-scheme`](https://web.dev/articles/color-scheme) is applied by default to render proper built-in components on the web. You can disable it by setting `disableColorScheme` to true on the `CssBaseline` or `ScopedCssBaseline`.

```jsx
<CssVarsProvider>
  <CssBaseline disableColorScheme />
</CssVarsProvider>

// or
<CssVarsProvider>
  <ScopedCssBaseline disableColorScheme >
    {/* The rest of your application */}
  </ScopedCssBaseline>
</CssVarsProvider>
```

### Typography

- No base font-size is declared on the `<html>`, but 16px is assumed (the browser default).
  You can learn more about the implications of changing the `<html>` default font size in [the theme documentation](/material-ui/customization/typography/#html-font-size) page.
- Set the default `Typography`'s level (`body1`) style on the `<body>` element. The style comes from `theme.typography.{default typography level prop}`.
- Set the font-weight to `bold` for the `<b>` and `<strong>` elements.
- Custom font-smoothing is enabled for better display of the default font.

## Customization

### CssBaseline

To customize the styles produced by the `CssBaseline` component, append the `GlobalStyles` next to it:

```js
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import GlobalStyles from '@mui/joy/GlobalStyles';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline /> {/* CssBaseline must come first */}
      <GlobalStyles
        styles={{
          // CSS object styles
          html: {
            // ...
          },
          body: {
            // ...
          },
        }}
      />
    </CssVarsProvider>
  );
}
```

### ScopedCssBaseline

You can customize it using the [themed components](https://mui.com/joy-ui/customization/themed-components/) approach. The component identifier is `JoyScopedCssBaseline` which contains only the `root` slot.

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import ScopedCssBaseline from '@mui/joy/ScopedCssBaseline';
import MyApp from './MyApp';

const theme = extendTheme({
  components: {
    JoyScopedCssBaseline: {
      styleOverrides: {
        root: ({ theme }) => ({
          // ...CSS object styles
        })
      }
    }
  }
})

export default function MyApp() {
  const [root, setRoot] = React.useState(null);
  return (
    {/* target the node to ScopedCssBaseline's div */}
    <CssVarsProvider colorSchemeNode={root}>
      {/* must be used under CssVarsProvider */}
      <ScopedCssBaseline ref={(element) => setRoot(element)}>
        {/* The rest of your application */}
        <MyApp />
      </ScopedCssBaseline>
    </CssVarsProvider>
  );
}
```
