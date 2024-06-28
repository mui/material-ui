# Migrating to Pigment CSS

<p class="description">This guide helps you integrate Pigment CSS with Material UI v6.</p>

Before going through this guide, make sure you have Material UI v6 installed. If you have not yet migrated to Material UI v6, follow the [migration guide](/material-ui/migration/migrating-to-v6/) first.

## Supported frameworks

Pigment CSS can be used with one of the following frameworks:

- [Next.js](https://nextjs.org/) with Webpack 5 (Turbo is not supported yet)
- [Vite](https://vitejs.dev/)

## Installation

First, install the dependency:

<codeblock storageKey="package-manager">

```bash npm
npm install @pigment-css/react
```

```bash yarn
yarn add @pigment-css/react
```

```bash pnpm
pnpm add @pigment-css/react
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

Next, open Next.js config file and add the plugin:

<codeblock>

```js next.config.mjs
import { withPigment } from '@pigment-css/nextjs-plugin';

const nextConfig = {
  // ...Your nextjs config.
};

export default withPigment(nextConfig);
```

```js next.config.js
const { withPigment } = require('@pigment-css/nextjs-plugin');

const nextConfig = {
  // ...Your nextjs config.
};

module.exports = withPigment(nextConfig);
```

</codeblock>

Finally, import the stylesheet to your application.

```js title="app/layout.(js|tsx)"
// ...other imports
import '@pigment-css/react/styles.css';
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

export default defineConfig({
  plugins: [
    pigment(),
    // ... Your other plugins.
  ],
});
```

Finally, add the Pigment CSS stylesheet to your application.

```js title="src/main.(js|tsx)"
// ...other imports
import '@pigment-css/react/styles.css';
```

## Configuring the theme

Integrating Pigment CSS with Material UI requires you to configure the theme to the plugin.
The theme must be created from `extendTheme` utility from `@mui/material` package.

<codeblock>

```js next.config.mjs
import { withPigment } from '@pigment-css/nextjs-plugin';
import { extendTheme, stringifyTheme } from '@mui/material';

const customTheme = extendTheme({
  // ...Your Material UI theme.
});
customTheme.toRuntimeSource = stringifyTheme;

const nextConfig = {
  // ...Your nextjs config.
};

export default withPigment(nextConfig, {
  theme: customTheme,
});
```

```js vite.config.js
import { pigment } from '@pigment-css/vite-plugin';
import { extendTheme, stringifyTheme } from '@mui/material';

const customTheme = extendTheme({
  // ...Your Material UI theme.
});
customTheme.toRuntimeSource = stringifyTheme;

export default defineConfig({
  plugins: [
    pigment({
      theme: customTheme,
    }),
    // ... Your other plugins.
  ],
});
```

</codeblock>

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

There are cases that the codemod is not able to remove the owner state. In such cases, you have to manually replace the owner state with `variants`.

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

## Migrating dynamic styles

### sx prop

Run the following codemod:

```bash
npx @mui/codemod@next v6.0.0/sx-prop path/to/folder
```

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

Run the following codemod:

```bash
npx @mui/codemod@next v6.0.0/styled path/to/folder
```

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
