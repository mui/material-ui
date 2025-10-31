# CSS Layers

Learn how to generate Material UI styles with cascade layers.

## What are cascade layers?

Cascade layers are an advanced CSS feature that make it possible to control the order in which styles are applied to elements.
If you're not familiar with cascade layers, visit the [MDN documentation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers) for a detailed overview.

Benefits of using cascade layers include:

- **Improved specificity**: Cascade layers let you control the order of the styles, which can help avoid specificity conflicts. For example, you can theme a component without hitting the default specificity of the styles.
- **Better integration with CSS frameworks**: With cascade layers, you can use Tailwind CSS v4 utility classes to override Material UI styles without the need for the `!important` directive.
- **Better debuggability**: Cascade layers appear in the browser's dev tools, making it easier to see which styles are applied and in what order.

## Implementing a single cascade layer

This method creates a single layer, namely `@layer mui`, for all Material UI components and global styles.
This is suitable for integrating with other styling solutions, such as Tailwind CSS v4, that use the `@layer` directive.

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

2. Configure the layer order at the top of a CSS file to work with Tailwind CSS v4:

```css title="src/app/globals.css"
@layer theme, base, mui, components, utilities;
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

2. Configure the layer order with the `GlobalStyles` component to work with Tailwind CSS v4—it must be the first child of the `AppCacheProvider`:

```tsx title="pages/_app.tsx"
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Component {...pageProps} />
    </AppCacheProvider>
  );
}
```

### Vite or any other SPA

Make the following changes in `src/main.tsx`:

1. Pass the `enableCssLayer` prop to the `StyledEngineProvider` component.
2. Configure the layer order with the `GlobalStyles` component to work with Tailwind CSS v4.

```tsx title="main.tsx"
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      {/* Your app */}
    </StyledEngineProvider>
  </React.StrictMode>,
);
```

## Implementing multiple cascade layers

After you've set up a [single cascade layer](#implementing-a-single-cascade-layer), you can split the styles into multiple layers to better organize them within Material UI.
This makes it simpler to apply theming and override styles with the `sx` prop.

First, follow the steps from the [previous section](#implementing-a-single-cascade-layer) to enable the CSS layer feature.
Then, create a new file and export the component that wraps the `ThemeProvider` from Material UI.
Finally, pass the `modularCssLayers: true` option to the `createTheme` function:

```tsx title="src/theme.tsx"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  modularCssLayers: true,
});

export default function AppTheme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

```tsx
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const theme = createTheme({
  modularCssLayers: true,
  cssVariables: true,
});

export default function CssLayersInput() {
  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined">
        <InputLabel
          shrink
          htmlFor="css-layers-input"
          sx={{
            width: 'fit-content',
            transform: 'none',
            position: 'relative',
            mb: 0.25,
            fontWeight: 'medium',
            pointerEvents: 'auto',
          }}
        >
          Label
        </InputLabel>
        <OutlinedInput
          id="css-layers-input"
          placeholder="Type something"
          slotProps={{
            input: {
              sx: { py: 1.5, height: '2.5rem', boxSizing: 'border-box' },
            },
          }}
        />
        <FormHelperText sx={{ marginLeft: 0 }}>Helper text goes here</FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
}
```

When this feature is enabled, Material UI generates these layers:

- `@layer mui.global`: Global styles from the `GlobalStyles` and `CssBaseline` components.
- `@layer mui.components`: Base styles for all Material UI components.
- `@layer mui.theme`: Theme styles for all Material UI components.
- `@layer mui.custom`: Custom styles for non-Material UI styled components.
- `@layer mui.sx`: Styles from the `sx` prop.

The sections below demonstrate how to set up multiple cascade layers for Material UI with common React frameworks.

### Next.js App Router

```tsx title="src/theme.tsx"
'use client';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  modularCssLayers: true,
});

export default function AppTheme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

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

### Next.js Pages Router

```tsx title="src/theme.tsx"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  modularCssLayers: true,
});

export default function AppTheme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

```tsx title="pages/_app.tsx"
import AppTheme from '../src/theme';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <AppTheme>
        <Component {...pageProps} />
      </AppTheme>
    </AppCacheProvider>
  );
}
```

```tsx title="pages/_document.tsx"
import {
  createCache,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter';

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createCache({ enableCssLayer: true }),
  });
  return finalProps;
};
```

### Vite or any other SPA

```tsx title="src/theme.tsx"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  modularCssLayers: true,
});

export default function AppTheme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

```tsx title="src/main.tsx"
import AppTheme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider enableCssLayer>
      <AppTheme>{/* Your app */}</AppTheme>
    </StyledEngineProvider>
  </React.StrictMode>,
);
```

### Usage with other styling solutions

To integrate with other styling solutions, such as Tailwind CSS v4, replace the boolean value for `modularCssLayers` with a string specifying the layer order.
Material UI will look for the `mui` identifier and generate the layers in the correct order:

```diff title="src/theme.tsx"
 const theme = createTheme({
-  modularCssLayers: true,
+  modularCssLayers: '@layer theme, base, mui, components, utilities;',
 });
```

The generated CSS will look like this:

```css
@layer theme, base, mui.global, mui.components, mui.theme, mui.custom, mui.sx, components, utilities;
```

### Caveats

If you enable `modularCssLayers` in an app that already has custom styles and theme overrides applied to it, you may observe unexpected changes to the look and feel of the UI due to the differences in specificity before and after.

For example, if you have the following [theme style overrides](/material-ui/customization/theme-components/#theme-style-overrides) for the [Accordion](/material-ui/react-accordion/) component:

```js
const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});
```

By default, the margin from the theme does _not_ take precedence over the default margin styles when the accordion is expanded, because it has higher specificity than the theme styles—so this code has no effect.

After enabling the `modularCssLayers` option, the margin from the theme _does_ take precedence because the theme layer comes after the components layer in the cascade order—so the style override is applied and the accordion has no margins when expanded.

```tsx
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

export default function CssLayersCaveat() {
  const [cssLayers, setCssLayers] = React.useState(false);
  const theme = React.useMemo(() => {
    return createTheme({
      modularCssLayers: cssLayers,
      cssVariables: true,
      components: {
        MuiAccordion: {
          styleOverrides: {
            root: {
              margin: 0,
            },
          },
        },
      },
    });
  }, [cssLayers]);
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Typography
          component="span"
          sx={{ marginRight: '8px', fontSize: '14px', color: 'text.secondary' }}
        >
          No CSS Layers
        </Typography>
        <Switch checked={cssLayers} onChange={() => setCssLayers(!cssLayers)} />
        <Typography
          component="span"
          sx={{ marginLeft: '8px', fontSize: '14px', color: 'text.secondary' }}
        >
          With CSS Layers
        </Typography>
      </Box>
      <ThemeProvider theme={theme}>
        <div>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>
        </div>
      </ThemeProvider>
    </div>
  );
}
```
