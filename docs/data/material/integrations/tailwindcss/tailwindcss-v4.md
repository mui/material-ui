# Tailwind CSS v4 integration

<p class="description">Learn how to use Material UI with Tailwind CSS v4.</p>

## Overview

There are two steps to integrate Tailwind CSS v4 with Material UI:

1. Configure the styles to generate with the `@layer` directive.
2. Set up the layer order so that `mui` comes before the `utilities` layer, allowing Tailwind CSS classes to override Material UI styles.

The instructions below detail how to achieve this using common React frameworks.

### Next.js App Router

To integrate Tailwind CSS v4 with Material UI in a Next.js App Router project, start by configuring Material UI with Next.js in the [App Router integration guide](/material-ui/integrations/nextjs/#app-router).
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

2. Configure the layer order in the Tailwind CSS file:

```css title="src/app/globals.css"
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';
```

### Next.js Pages Router

To integrate Tailwind CSS v4 with Material UI in a Next.js Pages Router project, start by configuring Material UI with Next.js in the [Pages Router integration guide](/material-ui/integrations/nextjs/#pages-router).
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
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      {/* Your app */}
    </AppCacheProvider>
  );
}
```

### Vite.js or any other SPA

To integrate Tailwind CSS v4 with Material UI in a Vite-based app, make the following changes in `src/main.tsx`:

1. Pass the `enableCssLayer` prop to the `StyledEngineProvider` component.
2. Configure the layer order with the `GlobalStyles` component.

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

## Tailwind CSS IntelliSense for VS Code

The official [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension requires extra configuration to work properly when customizing the interior slots of Material UI components.
After installing the extension, add the following line to your [VS Code `settings.json`](https://code.visualstudio.com/docs/editor/settings#_settings-json-file) file:

```json
{
  // ...config
  "tailwindCSS.experimental.classRegex": [["className\\s*:\\s*['\"]([^'\"]*)['\"]"]]
}
```

Now you should see the autocomplete and syntax highlighting features when using the `slotProps` prop, as shown in the screenshot below:

![A preview of Tailwind CSS Intellisense](/static/material-ui/tailwind-intellisense.jpg)

## Usage

- Use the `className` prop to apply Tailwind CSS classes to the root element of the component.
- Use `slotProps.{slotName}.className` to apply Tailwind CSS classes to a component's [interior slots](/material-ui/customization/overriding-component-structure/#interior-slots).

{{"demo": "TextFieldTailwind.js"}}

## Troubleshooting

If the Tailwind CSS classes are not overriding Material UI components, make sure that:

- You are using Tailwind CSS >= v4.
- You have configured the layer order correctly by checking the [DevTools styles tab](https://developer.chrome.com/docs/devtools/css/reference#cascade-layers). The `mui` layer should come before the `utilities` layer.
