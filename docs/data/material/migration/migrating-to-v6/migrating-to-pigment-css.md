# Migrating to Pigment CSS

<p class="description">This guide helps you integrate Pigment CSS with Material UI v6.</p>

Before going through this guide, make sure you have [migrated to Material UI v6](/material-ui/migration/migrating-to-v6/).

## Introduction

The default styling engine of Material UI v6 is [Emotion](https://emotion.sh/docs/introduction). It lets you write styles in a CSS-in-JS fashion, which is great for dynamic styles that depend on states and props. However, it has some performance drawbacks when it comes to frequent re-renders because the style recalculation happens on the client side. It also does not fully support [React Server Components](https://react.dev/reference/rsc/server-components), a new rendering paradigm that renders components ahead of time on the server.

Pigment CSS aims to solve these problems while keeping the same developer experience of writing styles in a CSS-in-JS fashion. It can work alongside Emotion to ease the migration process, but it is recommended to fully migrate to Pigment CSS in the end.

## Supported frameworks

Pigment CSS can be used with one of the following frameworks:

- [Next.js App Router](https://nextjs.org/docs/app/) with Webpack 5 (Turbo is not supported yet)
- [Vite](https://vitejs.dev/)

## Installation

First, install the adapter package:

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/material-pigment-css
```

```bash yarn
yarn add @mui/material-pigment-css
```

```bash pnpm
pnpm add @mui/material-pigment-css
```

</codeblock>

Then, follow the instructions based on your framework:

### Next.js

Install the Next.js plugin as a dev dependency:

<codeblock storageKey="package-manager">

```bash npm
npm install --save-dev @pigment-css/nextjs-plugin
```

```bash yarn
yarn add -D @pigment-css/nextjs-plugin
```

```bash pnpm
pnpm add -D @pigment-css/nextjs-plugin
```

</codeblock>

Then, open Next.js config file and add the plugin:

<codeblock>

```js next.config.mjs
import { withPigment } from '@pigment-css/nextjs-plugin';

const nextConfig = {
  // ...Your nextjs config.
};

/**
 * @type {import('@pigment-css/nextjs-plugin').PigmentOptions}
 */
const pigmentConfig = {}; // we will refer to this later

export default withPigment(nextConfig, pigmentConfig);
```

```js next.config.js
const { withPigment } = require('@pigment-css/nextjs-plugin');

const nextConfig = {
  // ...Your nextjs config.
};

/**
 * @type {import('@pigment-css/nextjs-plugin').PigmentOptions}
 */
const pigmentConfig = {}; // we will refer to this later

module.exports = withPigment(nextConfig, pigmentConfig);
```

</codeblock>

Finally, import the stylesheet at the top of the layout file.

```js title="app/layout.(js|tsx)"
import '@mui/material-pigment-css/styles.css';
```

### Vite

Install the Vite plugin as a dev dependency:

<codeblock storageKey="package-manager">

```bash npm
npm install --save-dev @pigment-css/vite-plugin
```

```bash yarn
yarn add -D @pigment-css/vite-plugin
```

```bash pnpm
pnpm add -D @pigment-css/vite-plugin
```

</codeblock>

Next, open vite config file, usually named `vite.config.js`, and add the plugin:

```js
import { defineConfig } from 'vite';
import { pigment } from '@pigment-css/vite-plugin';

const pigmentConfig = {}; // we will refer to this later

export default defineConfig({
  plugins: [
    pigment(pigmentConfig),
    // ... Your other plugins.
  ],
});
```

Finally, add the Pigment CSS stylesheet to the top of the main file.

```js title="src/main.(js|tsx)"
import '@mui/material-pigment-css/styles.css';
```

## Configuring the theme

Integrating Pigment CSS with Material UI requires you to configure the theme to the plugin.
Add the following code to your [Next.js](#nextjs) or [Vite](#vite) config file:

```diff
+ import { extendTheme, stringifyTheme } from '@mui/material';

+ const pigmentConfig = {
+   theme: extendTheme(),
+ };
```

If you don't have a custom theme, you are ready to go. Start a development server by running:

<codeblock storageKey="package-manager">

```bash npm
npm run dev
```

```bash yarn
yarn dev
```

```bash pnpm
pnpm dev
```

</codeblock>

Open the browser and navigate to the localhost URL, you should see the app running with Pigment CSS.

## How it works

When a Pigment CSS plugin is configured through a framework bundler, it intercepts the styling APIs that Material UI uses and replaces them with those from Pigment CSS instead. Pigment CSS then extracts the styles at build time and injects them into the stylesheet.

If you come from Material UI v5, using Pigment CSS will be a paradigm shift in terms of writing styles.
Since Pigment CSS is a build-time extraction tool, it does not support dynamic styles that depend on runtime variables. For example, Pigment CSS will throw an error for styles that depend on a state like the one below:

```js
import Card from '@mui/material/Card';

function App() {
  const [color, setColor] = useState('#000000');
  return (
    <Card
      sx={{
        color, // ❌ Pigment CSS cannot extract this style.
      }}
    />
  );
}
```

We recommend reading the rest of the guide below to learn about the new styling paradigm and patterns for creating dynamic styles.

## Migrating custom theme

### Removing owner state

Since Pigment CSS is a build-time extraction tool, it does not support owner state through callbacks. Here is an example that will throw an error at build time:

```js
const theme = extendTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          color: ({ ownerState }) => ({
            // ❌ Pigment CSS cannot extract this style.
            ...(ownerState.variant === 'outlined' && {
              borderWidth: 3,
            }),
          }),
        },
      },
    },
  },
});
```

Run the following codemod to remove the owner state from the theme:

```bash
npx @mui/codemod@next v6.0.0/theme-v6 next.config.mjs
```

There are cases where the codemod is not able to remove the owner state. In such cases, you have to manually replace the owner state with `variants`.

#### Dynamic color based on palette

If you have a dynamic color based on the theme palette, you can use the `variants` property to define the styles for each palette.

<codeblock>

```js before
const theme = extendTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          color: theme.palette[ownerState.palette]?.main,
        }),
      },
    },
  },
});
```

```js after
const theme = extendTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          variants: [
            ...Object.entries(theme.palette)
              .filter(([, palette]) => palette && palette.main)
              .map(([palette, { main }]) => ({
                props: { palette },
                style: {
                  color: main,
                },
              })),
          ],
        }),
      },
    },
  },
});
```

</codeblock>

### Default props provider

Use `DefaultPropsProvider` in your main application file and move all the component default props to it:

<codeblock>

```diff next.config|vite.config
 import { extendTheme } from '@mui/material';

 const customTheme = extendTheme({
   // ...other tokens.
   components: {
     MuiButtonBase: {
-      defaultProps: {
-        disableRipple: true,
-      },
     },
     MuiSelect: {
-      defaultProps: {
-        IconComponent: DropdownIcon,
-      },
     }
   }
 });
```

```diff App.tsx
+ import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';

  function App() {
    return (
+     <DefaultPropsProvider value={{
+       MuiButtonBase: {
+         disableRipple: true,
+       },
+       MuiSelect: {
+         IconComponent: DropdownIcon,
+       },
+     }}>
        {/* Your app */}
+     </DefaultPropsProvider>
    );
  }
```

</codeblock>

## Migrating dynamic styles

### sx prop

Run the following codemod:

```bash
npx @mui/codemod@next v6.0.0/sx-prop path/to/folder
```

The scenarios below are not covered by the codemod, so you have to manually update them:

<!-- Add manual case -->

#### Dynamic values

If a value depends on a variable, you need to move it to a CSS variable inside inline styles.

<codeblock>

```js before
<div>
  {items.map((item, index) => (
    <Box
      key={index}
      sx={{
        borderRadius: '50%',
        width: `max(${6 - index}px, 3px)`,
        height: `max(${6 - index}px, 3px)`,
        bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
      }}
    />
  ))}
</div>
```

```js after
<div>
  {items.map((item, index) => (
    <Box
      key={index}
      sx={{
        borderRadius: '50%',
        width: `max(6px - var(--offset), 3px)`,
        height: `max(6px - var(--offset), 3px)`,
        bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
      }}
      style={{
        '--offset': `${index}px`,
      }}
    />
  ))}
</div>
```

</codeblock>

### styled

If you have custom components that are using `styled` from `@mui/material/styles`, change the import source to `@mui/material-pigment-css`:

```diff
- import { styled } from '@mui/material/styles';
+ import { styled } from '@mui/material-pigment-css';
```

Then, run the following codemod:

```bash
npx @mui/codemod@next v6.0.0/styled path/to/folder
```

The scenarios below are not covered by the codemod, so you have to manually update them:

#### Dynamic styles based on props

If you have dynamic styles based on props, you need to move them to CSS variables. You will need to create a wrapper component to set the inline style with the CSS variables.

<codeblock>

```js before
const FlashCode = styled('div')(
  ({ theme, startLine = 0, endLine = startLine, lineHeight = '0.75rem' }) => ({
    top: `calc(${lineHeight} * 1.5 * ${startLine})`,
    height: `calc(${lineHeight} * 1.5 * ${endLine - startLine + 1})`,
    ...theme.typography.caption,
  }),
);

export default FlashCode;
```

```js after
const FlashCodeRoot = styled('div')(({ theme }) => ({
  top: `calc(var(--Flashcode-lineHeight) * 1.5 * var(--Flashcode-startLine))`,
  height: `calc(var(--Flashcode-lineHeight) * 1.5 * (var(--Flashcode-endLine) - var(--Flashcode-startLine) + 1))`,
  ...theme.typography.caption,
}));

const FlashCode = React.forwardRef(function FlashCode(props, ref) {
  const {
    children,
    startLine = 0,
    endLine = startLine,
    lineHeight = '0.75rem',
    ...other
  } = props;

  return (
    <FlashCodeRoot
      ref={ref}
      {...other}
      style={{
        '--Flashcode-lineHeight': lineHeight,
        '--Flashcode-startLine': startLine,
        '--Flashcode-endLine': endLine,
        ...other.style,
      }}
    >
      {children}
    </FlashCodeRoot>
  );
});

export default FlashCode;
```

</codeblock>

## Migrating layout components

To use layout components that are compatible with Pigment CSS, replace the following components with those from the adapter package:

```diff
- import Container from '@mui/material/Container';
+ import Container from '@mui/material-pigment-css/Container';

- import Grid from '@mui/material/Grid';
+ import Grid from '@mui/material-pigment-css/Grid';

- import Stack from '@mui/material/Stack';
+ import Stack from '@mui/material-pigment-css/Stack';

- import Hidden from '@mui/material/Hidden';
+ import Hidden from '@mui/material-pigment-css/Hidden';
```

## Migrating Box component

Choose one of the following approaches:

### Continue using Box component

Replace the `Box` component with the one from the adapter package:

```diff
- import Box from '@mui/material/Box';
+ import Box from '@mui/material-pigment-css/Box';
```

### Replace Box with HTML element

Pigment CSS can extract the `sx` prop from any JSX element, so there is no need to use the Box component.

```diff
- import Box from '@mui/material/Box';

 function CustomCard() {
   return (
-    <Box sx={{ display: 'flex' }}>
-      <Box component="img" src="..." sx={{ width: 24, height: 24 }}>
-      ...
-    </Box>
+    <div style={{ display: 'flex' }}>
+      <img src="..." style={{ width: 24, height: 24 }}>
+      ...
+    </div>
   )
 }
```

For **TypeScript** users, you need to extend the `HTMLAttributes` interface to support the `sx` prop. Add the following code to a file that is included in your `tsconfig.json`:

```ts
import type { Theme, SxProps } from '@mui/material/styles';

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?: SxProps<Theme>;
    }
  }
}
```
