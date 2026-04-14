---
title: Material UI v7 is here 🚀
description: Material UI v7 is now stable, improving integration with modern tools and consistency across the library.
date: 2025-03-26T12:00:00.000Z
authors:
  ['aarongarciah', 'brijeshb42', 'diegoandai', 'janpot', 'mnajdova', 'siriwatknp']
tags: ['Material UI', 'Product']
manualCard: true
---

Material UI v7 is now stable.
This major release improves the integration with modern tools and consistency across the library.
It is designed to be straightforward to upgrade to.

## Improved ESM support

The package layout has been updated, and now unambiguously supports both valid ESM and CommonJS through the `exports` field in `package.json`. The package layout was previously faux-ESM.

This update fixes several issues with popular bundlers like Vite and webpack, and makes it possible to load Material UI packages from ES modules under Node.js.
More details in [mui/material-ui#43938](https://github.com/mui/material-ui/issues/43938).

For example, you can see how all the warnings that [publint.dev](https://publint.dev/) reports with v6 are fixed in v7:

<figure>
  <img src="/static/blog/material-ui-v7-is-here/publint-before.png" width="1244" height="880" loading="lazy" alt="" style="width: 400px" />
  <figcaption><a href="https://publint.dev/@mui/material@6.4.11">Before v6</a></figcaption>
</figure>

<figure>
  <img src="/static/blog/material-ui-v7-is-here/publint-after.png" width="1260" height="906" loading="lazy" alt="" style="width: 400px" />
  <figcaption><a href="https://publint.dev/@mui/material@7.0.0">After v7</a></figcaption>
</figure>

This new package layout might create breaking changes for some users, especially those depending on private APIs of the library. Refer to the [migration guide](/material-ui/migration/upgrade-to-v7/#package-layout-updated) for more details.

## Completed the slot pattern implementation

The API for replacing or modifying component inner elements is now standardized, and all relevant components use the `slots` and `slotProps` props for greater flexibility and consistency.
For example:

```diff
 <Accordion
-  TransitionComponent={CustomTransition}
-  TransitionProps={{ unmountOnExit: true }}
+  slots={{ transition: CustomTransition }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

A [guide about this pattern](/material-ui/customization/overriding-component-structure/) has been added to the documentation.

## Opt-in support for CSS layers

Material UI styles can be wrapped in a CSS layer named via the opt-in config `enableCssLayer`.
This allows Material UI to integrate with modern tools that rely on CSS layers, like Tailwind CSS v4.
This feature was backported and is now also available in Material UI v6.

This feature is currently supported in Next.js App Router and client-side frameworks like Vite.
Here is an example of how to enable CSS layers depending on your setup:

<codeblock>

```tsx Next.js
// App Router only, support for Pages Router is coming soon

// app/layout.tsx
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <GlobalStyles styles="@layer theme,base,mui,components,utilities;" />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

```tsx Client-side
// main.js
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme,base,mui,components,utilities;" />
      <App />
    </StyledEngineProvider>
  </StrictMode>,
);
```

</codeblock>

A detailed guide for Tailwind CSS v4 integration is coming soon.

## Removed deprecated APIs

APIs that were deprecated in v5 have been removed.
This reduces the API surface, making the docs easier to navigate.
Visit the upgrade guide for a [list of removed APIs](/material-ui/migration/upgrade-to-v7/#deprecated-apis-removed).

## Get started

Head to [the v7 upgrade guide](/material-ui/migration/upgrade-to-v7/) and upgrade today.
