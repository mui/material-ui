# CSS Layers

<p class="description">Learn how to generate Material UI styles with cascade layers.</p>

## Overview

Cascade layers are a new CSS feature that allows you to control the order in which styles are applied to elements. If you are not familiar with cascade layers, we recommend reading the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade_layers) for a detailed overview.

Some of the benefits of using cascade layers include:

- **Improved specificity**: Cascade layers let you control the order of the styles, which can help avoid specificity conflicts. For example, you can theme a component without hitting the default specificity of the styles.
- **Better integration with CSS frameworks**: With cascade layers, you can use Tailwind CSS v4 utility classes to override Material UI styles without specifying `!important` directive.
- **Better debuggability**: Cascade layers appear in the browser's dev tools, making it easier to see which styles are applied and in what order.

## Single layer

This method creates a single layer, namely `@layer mui`, for all Material UI components and global styles.
This method is suitable for integrating with other styling solutions, such as Tailwind CSS v4, that use the `@layer` directive.

### Next.js App Router

Start by configuring Material UI with Next.js in the [App Router integration guide](/material-ui/integrations/nextjs/#app-router).
Then follow these steps:

1. Enable the [CSS layer feature](/material-ui/integrations/nextjs/#using-other-styling-solutions) in the root layout:

```tsx title="src/app/layout.tsx"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {/* Your app */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

2. Configure the layer order at the top of a CSS file:

```css title="src/app/globals.css"
@layer mui;
```

### Next.js Pages Router

Start by configuring Material UI with Next.js in the [Pages Router integration guide](/material-ui/integrations/nextjs/#pages-router).
Then follow these steps:

1. Enable the [CSS layer feature](/material-ui/integrations/nextjs/#configuration-2) in a custom `_document`:

```tsx title="pages/_document.tsx"
import {
  createCache,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter';

// ...

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createCache({ enableCssLayer: true }),
  });
  return finalProps;
};
```

2. Configure the layer order with the `GlobalStyles` component—it must be the first child of the `AppCacheProvider`:

```tsx title="pages/_app.tsx"
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <GlobalStyles styles="@layer mui;" />
      <Component {...pageProps} />
    </AppCacheProvider>
  );
}
```

### Vite or any other SPA

Make the following changes in `src/main.tsx`:

1. Pass the `enableCssLayer` prop to the `StyledEngineProvider` component.
2. Configure the layer order with the `GlobalStyles` component.

```tsx title="main.tsx"
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer mui;" />
      {/* Your app */}
    </StyledEngineProvider>
  </React.StrictMode>,
);
```

## Multiple layers

On top of the [single layer](#single-layer), you can split styles into multiple layers to better organize them within Material UI.
This makes theming and overriding styles through the `sx` prop easier.

When this feature is enabled, Material UI generates these layers:

- `@layer global`: The global styles from `GlobalStyles` and `CssBaseline` components.
- `@layer default`: The base styles for all Material UI components.
- `@layer theme`: The theme styles for all Material UI components.
- `@layer custom`: The custom styles for non-Material UI styled components.
- `@layer sx`: The styles from the `sx` prop.

Follow the steps from the [previous section](#single-layer) to enable the CSS layer feature.
Then, create a new file and export the component that wraps the `ThemeProvider` from Material UI.
Finally, pass the `experimental_modularCssLayer: true` option to the `createTheme` function:

```tsx title="src/theme.tsx"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  experimental_modularCssLayer: true,
});

export default function AppTheme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

{{"demo": "CssLayersInput.js"}}

Render the component based on the framework you are using and update the layer order.

### Next.js App Router

```tsx title="src/app/layout.tsx"
import AppTheme from '../theme';

export default function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppTheme>{/* Your app */}</AppTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

```css title="src/app/globals.css"
@layer mui.global, mui.default, mui.theme, mui.custom, mui.sx;
```

### Next.js Pages Router

```tsx title="pages/_app.tsx"
import AppTheme from '../src/theme';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <GlobalStyles styles="@layer mui.global, mui.default, mui.theme, mui.custom, mui.sx;" />
      <AppTheme>
        <Component {...pageProps} />
      </AppTheme>
    </AppCacheProvider>
  );
}
```

### Vite or any other SPA

```tsx title="src/main.tsx"
import AppTheme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer mui.global, mui.default, mui.theme, mui.custom, mui.sx;" />
      <AppTheme>{/* Your app */}</AppTheme>
    </StyledEngineProvider>
  </React.StrictMode>,
);
```
