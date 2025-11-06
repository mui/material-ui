# CSS theme variables - Usage

<p class="description">Learn how to use the experimental APIs to adopt CSS theme variables.</p>

## Getting started

The CSS variables API relies on a new experimental provider for the theme called `Experimental_CssVarsProvider` to inject styles into Material UI components.
In addition to providing the theme in the inner React context, this new provider also generates CSS variables out of all tokens in the theme that are not functions, and makes them available in the context as well.

Once the `App` renders on the screen, you will see the CSS theme variables in the HTML `:root` stylesheet.
The variables are flattened and prefixed with `--mui` by default:

```css
/* generated global stylesheet */
:root {
  --mui-palette-primary-main: #1976d2;
  --mui-palette-primary-light: #42a5f5;
  --mui-palette-primary-dark: #1565c0;
  --mui-palette-primary-contrastText: #fff;
  /* ...other variables */
}
```

The following demo uses `--md-demo` as a prefix for the variables:

{{"demo": "CssVarsBasic.js", "defaultCodeOpen": true}}

:::info
The `CssVarsProvider` is built on top of the [`ThemeProvider`](/material-ui/customization/theming/#themeprovider) with extra features like CSS variable generation, storage synchronization, unlimited color schemes, and more.
:::

## Toggle between light and dark mode

The `useColorScheme` hook lets you read and update the user-selected mode:

```jsx
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';

// ModeSwitcher is an example interface for toggling between modes.
// Material UI does not provide the toggle interface—you have to build it yourself.
const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
};

function App() {
  return (
    <CssVarsProvider>
      <ModeSwitcher />
    </CssVarsProvider>
  );
}
```

## Using theme variables

All of these variables are accessible in an object in the theme called `vars`.
The structure of this object is nearly identical to the theme structure, the only difference is that the values represent CSS variables.

- `theme.vars` (recommended): an object that refers to the CSS theme variables.

  ```js
  const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.vars.palette.primary.main, // var(--mui-palette-primary-main)
    color: theme.vars.palette.primary.contrastText, // var(--mui-palette-primary-contrastText)
  }));
  ```

  For **TypeScript**, the typings are not enabled by default.
  Follow the [TypeScript setup](#typescript) to enable the typings.

  :::warning
  Make sure that the components accessing `theme.vars.*` are rendered under the new provider, otherwise you will get a `TypeError`.
  :::

- **Native CSS**: if you can't access the theme object, for example in a pure CSS file, you can use [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/var) directly:

  ```css
  /* external-scope.css */
  .external-section {
    background-color: var(--mui-palette-grey-50);
  }
  ```

  :::warning
  If you have set up a [custom prefix](/material-ui/experimental-api/css-theme-variables/customization/#changing-variable-prefixes), make sure to replace the default `--mui`.
  :::

## Server-side rendering

Place `<InitColorSchemeScript />` before the `<Main />` tag to prevent the dark-mode SSR flickering during the hydration phase.

### Next.js App Router

Add the following code to the [root layout](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#root-layout-required) file:

```jsx title="app/layout.js"
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <InitColorSchemeScript /> {/* must come before the <main> element */}
        <main>{props.children}</main>
      </body>
    </html>
  );
}
```

### Next.js Pages Router

Add the following code to the custom [`pages/_document.js`](https://nextjs.org/docs/pages/building-your-application/routing/custom-document) file:

```jsx title="pages/_document.js"
import Document, { Html, Head, Main, NextScript } from 'next/document';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default class MyDocument extends Document {
  render() {
    return (
      <Html data-color-scheme="light">
        <Head>...</Head>
        <body>
          <InitColorSchemeScript /> {/* must come before the <Main> element */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## TypeScript

The theme variables type is not enabled by default. You need to import the module augmentation to enable the typings:

```ts
// The import can be in any file that is included in your `tsconfig.json`
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

const StyledComponent = styled('button')(({ theme }) => ({
  // ✅ typed-safe
  color: theme.vars.palette.primary.main,
}));
```

## API

### `<CssVarsProvider>` &nbsp;props

- `defaultMode?: 'light' | 'dark' | 'system'` - Application's default mode (`light` by default)
- `disableTransitionOnChange : boolean` - Disable CSS transitions when switching between modes
- `theme: ThemeInput` - the theme provided to React's context
- `modeStorageKey?: string` - localStorage key used to store application `mode`
- `attribute?: string` - DOM attribute for applying color scheme

### `useColorScheme: () => ColorSchemeContextValue`

- `mode: string` - The user's selected mode
- `setMode: mode => {…}` - Function for setting the `mode`. The `mode` is saved to internal state and local storage; if `mode` is null, it will be reset to the default mode

### `<InitColorSchemeScript>` &nbsp;props

- `defaultMode?: 'light' | 'dark' | 'system'`: - Application's default mode before React renders the tree (`light` by default)
- `modeStorageKey?: string`: - localStorage key used to store application `mode`
- `attribute?: string` - DOM attribute for applying color scheme
- `nonce?: string` - Optional nonce passed to the injected script tag, used to allow-list the next-themes script in your CSP
