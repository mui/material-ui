# Theme scoping

<p class="description">Learn how to use multiple styling solutions in a single Material UI app.</p>

:::warning
Having more than one styling library can introduce unnecessary complexity to your project.
You should have a very good reason to do this.
:::

Starting with [v5.12.0](https://github.com/mui/material-ui/releases/tag/v5.12.0), Material UI can coexist with other component libraries that depend on Emotion or styled-components—this is possible thanks to _theme scoping_.

To do this, you need to render Material UI's `ThemeProvider` as an inner provider and use the `THEME_ID` to store the theme, as shown below:

```js
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { AnotherThemeProvider } from 'another-ui-library';

const materialTheme = createTheme(/* your theme */);

function App() {
  return (
    <AnotherThemeProvider>
      <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        {/* components from another library and Material UI */}
      </ThemeProvider>
    </AnotherThemeProvider>
  );
}
```

The Material UI theme will be separated from the other library, so when you use APIs such as `styled`, the `sx` prop, and `useTheme`, you'll be able to access Material UI's theme like you normally would.

## Minimum version

[Theme scoping](https://github.com/mui/material-ui/pull/36664) was introduced in Material UI v5.12.0, so make sure you're running that version or higher.

### Using with Theme UI

Render Material UI's theme provider below Theme UI's provider and assign the `materialTheme` to the `THEME_ID` property:

```js
import { ThemeUIProvider } from 'theme-ui';
import { createTheme as materialCreateTheme, THEME_ID } from '@mui/material/styles';

const themeUITheme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
};

const materialTheme = materialCreateTheme();

function App() {
  return (
    <ThemeUIProvider theme={themeUITheme}>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        Theme UI components and Material UI components
      </MaterialThemeProvider>
    </ThemeUIProvider>
  );
}
```

### Using with Chakra UI

Render Material UI's theme provider below Chakra UI's provider and assign the `materialTheme` to the `THEME_ID` property:

```js
import { ChakraProvider, extendTheme as chakraExtendTheme } from '@chakra-ui/react';
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from '@mui/material/styles';

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();

function App() {
  return (
    <ChakraProvider theme={chakraTheme} resetCSS>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        Chakra UI components and Material UI components
      </MaterialThemeProvider>
    </ChakraProvider>
  );
}
```
