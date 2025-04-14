# Tailwind CSS v4 integration

<p class="description">Learn how to use Material UI with Tailwind CSS v4.</p>

## Frameworks

There are 2 steps to integrate Tailwind CSS v4 with Material UI:

1. Configure the styles to generate with `@layer` directive.
2. Set up layer order to have `mui` comes before `utilities` layer so that Tailwind CSS classes can override Material UI styles.

If you are using a framework, you can follow the instructions below to set up the integration.

### Next.js App Router

Follow the [App Router guide](/material-ui/integrations/nextjs/#app-router) and do the following steps:

- pass `{ enableCssLayer: true }` to the `options` prop of `AppRouterCacheProvider` component.

```tsx title="src/app/layout.tsx"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import GlobalStyles from '@mui/material/GlobalStyles';

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

- configure layer order in the Tailwind CSS file.

```css title="src/app/globals.css"
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';
```

### Next.js Pages Router

Follow the [Pages Router guide](/material-ui/integrations/nextjs/#pages-router) and do the following steps:

- pass a custom cache with `{ enableCssLayer: true }` to `documentGetInitialProps` function.

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

- configure the layer order with `GlobalStyles` component.

```tsx title="pages/_app.tsx"
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      {/* Your app */}
    </AppCacheProvider>
  );
}
```

### Vite.js or any other SPA

Open `src/main.tsx` and do the following steps:

- set `enableCssLayer` prop to `StyledEngineProvider` component.
- configure the layer order with `GlobalStyles` component.

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

## Tailwind IntelliSense for VS Code

Follow the [installation](https://tailwindcss.com/docs/editor-setup#intellisense-for-vs-code) and add the following configuration to your [`settings.json`](https://code.visualstudio.com/docs/editor/settings#_settings-json-file) file.

```json
{
  // ...config
  "tailwindCSS.experimental.classRegex": [["className\\s*:\\s*['\"]([^'\"]*)['\"]"]]
}
```

This will enable Tailwind CSS IntelliSense for any value that has key `className`.

## Usage

- Use `className` prop to apply Tailwind CSS classes to the root element of the component.
- Use `slotProps.{slotName}.className` to apply Tailwind CSS classes to the [interior slot](/material-ui/customization/overriding-component-structure/#interior-slots) of the component.

{{"demo": "TextFieldTailwind.js"}}

## Troubleshooting

If the Tailwind CSS classes are not overriding Material UI components, make sure that:

- You are using at least Tailwind CSS v4.
- You have configured the layer order correctly by checking the [DevTools styles tab](https://developer.chrome.com/docs/devtools/css/reference#cascade-layers). The `mui` layer should come before the `utilities` layer.
