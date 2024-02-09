# zero-runtime

A zero-runtime CSS-in-JS library that extracts the colocated styles to their own CSS files at build-time.

- [Getting started](#getting-started)
  - [Next.js](#nextjs)
  - [Vite](#vite)
- [Basic usage](#basic-usage)
  - [Creating styles](#creating-styles)
  - [Creating components](#creating-components)
    - [Styling based on props](#styling-based-on-props)
    - [Styling based on runtime values](#styling-based-on-runtime-values)
    - [Styled component as a CSS selector](#styled-component-as-a-css-selector)
    - [Typing props](#typing-props)
- [Theming](#theming)
  - [Accesing theme values](#accesing-theme-values)
  - [CSS variables support](#css-variables-support)
  - [Color schemes](#color-schemes)
  - [Switching color schemes](#switching-color-schemes)
  - [TypeScript](#typescript)

## Getting started

Zero-runtime supports Next.js and Vite with future support for more bundlers. You must install the corresponding plugin, as shown below.

### Next.js

```bash
npm install @mui/zero-runtime
npm install --save-dev @mui/zero-next-plugin
```

Then, in your `next.config.js` file, import the plugin and wrap the exported config object:

```js
const { withZeroPlugin } = require('@mui/zero-next-plugin');

module.exports = withZeroPlugin({
  // ... Your nextjs config.
});
```

### Vite

```bash
npm install @mui/zero-runtime
npm install --save-dev @mui/zero-vite-plugin
```

Then, in your vite config file file, import the plugin and wrap the exported config object:

```js
import { zeroVitePlugin } from '@mui/zero-vite-plugin';

export default defineConfig({
  plugins: [
    zeroVitePlugin(),
    // ... Your other plugins.
  ],
});
```

## Basic usage

> You must configure zero-runtime with [Next.js](#nextjs) or [Vite](#vite) first.

### Creating styles

Use the `css` API to create reusable styles:

```js
import { css } from '@mui/zero-runtime';

const visuallyHidden = css({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
});

function App() {
  return <div className={visuallyHidden}>I am invisible</div>;
}
```

The call to the `css` function will be replaced with a unique string that represents the CSS class name for the generated styles.

Use a callback function to get access to the [theme](#theming) values:

```js
const title = css(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.spacing.unit * 4,
  fontFamily: theme.typography.fontFamily,
}));
```

### Creating components

Use the `styled` API to create a component by passing styles at the end. The usage should be familiar if you've worked with Emotion or styled-components:

```js
import { styled } from '@mui/zero-runtime';

const Heading = styled('div')({
  fontSize: '4rem',
  fontWeight: 'bold',
  padding: '10px 0px',
});

function App() {
  return <Heading>Hello</Heading>;
}
```

The zero-runtime package differs from "standard" runtime CSS-in-JS libraries in a few ways:

1. You never get direct access to props in your styled declarations. This is because prop values are only available at runtime, but the CSS is extracted at build time. See [Styling based on runtime values](#styling-based-on-runtime-values) for a workaround.
2. Your styles must be declarative, and must account for all combinations of props that you want to style.
3. The theme lets you declare CSS tokens that become part of the CSS bundle after the build. Any other values and methods that it might have are only available during build time—not at runtime. This leads to smaller bundle sizes.

#### Styling based on props

> 💡 This approach is recommended when the value of the prop is known at build time (finite values).

Use the `variants` key to define styles for a combination of the component's props.

Each variant is an object with `props` and `style` keys. The styles are applied when the component's props match the `props` object.

**Example 1**: A button component with `small` and `large` sizes:

```jsx
const Button = styled('button')({
  border: 'none',
  padding: '0.75rem',
  // ...other base styles
  variants: [
    {
      props: { size: 'large' },
      style: { padding: '1rem' },
    },
    {
      props: { size: 'small' },
      style: { padding: '0.5rem' },
    },
  ],
});

<Button>Normal button</Button>; // padding: 0.75rem
<Button size="large">Large button</Button>; // padding: 1rem
<Button size="small">Small button</Button>; // padding: 0.5rem
```

**Example 2**: A button component with variants and colors:

```jsx
const Button = styled('button')({
  border: 'none',
  padding: '0.75rem',
  // ...other base styles
  variants: [
    {
      props: { variant: 'contained', color: 'primary' },
      style: { backgroundColor: 'tomato', color: 'white' },
    },
  ],
});

// `backgroundColor: 'tomato', color: 'white'`
<Button variant="contained" color="primary">
  Submit
</Button>;
```

**Example 3**: Apply styles based on a condition:

The value of the `props` can be a function that returns a boolean. If the function returns `true`, the styles are applied.

```jsx
const Button = styled('button')({
  border: 'none',
  padding: '0.75rem',
  // ...other base styles
  variants: [
    {
      props: (props) => props.variant !== 'contained',
      style: { backgroundColor: 'transparent' },
    },
  ],
});
```

#### Styling based on runtime values

> 💡 This approach is recommended when the value of a prop is **unknown** ahead of time or possibly unlimited values, e.g. styling based on the user's input.

Use a callback function as a value to create a dynamic style for the specific CSS property:

```jsx
const Heading = styled('h1')({
  color: ({ isError }) => (isError ? 'red' : 'black'),
});
```

Zero-runtime will replace the callback with a CSS variable and inject the value through inline style. This makes it possible to create a static CSS file while still allowing dynamic styles.

```css
.Heading_class_akjsdfb {
  color: var(--Heading_class_akjsdfb-0);
}
```

```jsx
<h1
  style={{
    '--Heading_class_akjsdfb-0': ({ isError }) => (isError ? 'red' : 'black'),
  }}
>
  Hello
</h1>
```

#### Styled component as a CSS selector

All of the components that you create are also available as CSS selectors. For example, for the `Heading` component described in the previous section, you can target that component inside another styled component like this:

```jsx
const Wrapper = styled.div({
  [`& .${Heading}`]: {
    color: 'blue',
  },
});
```

This enables you to override the default `color` of the Heading component rendered inside the Wrapper:

```tsx
<Wrapper>
  <Heading>Hello</Heading>
</Wrapper>
```

You can also export any styled component you create and use it as the base for additional components:

```tsx
const ExtraHeading = styled(Heading)({
  // ... overridden styled
});
```

#### Typing props

If you use TypeScript, add the props typing before the styles to get the type checking:

```tsx
const Heading = styled('h1')<{ isError?: boolean }>({
  color: ({ isError }) => (isError ? 'red' : 'black'),
});
```

### Theming

Theming is an **optional** feature that lets you reuse the same values, such as colors, spacing, and typography, across your application. It is a plain object of any structure that you can define in your config file.

> **💡 Good to know**:
>
> The **theme** object are used at build time without relying on React context like common CSS-in-JS libraries. This means that components created by zero-runtime `styled` will be React Server Component by default and still get benefits from theming.

For example, in Next.js, you can define a theme in the `next.config.js` file like this:

```js
const { withZeroPlugin } = require('@mui/zero-next-plugin');

module.exports = withZeroPlugin(
  {
    // ...other nextConfig
  },
  {
    theme: {
      colors: {
        primary: 'tomato',
        secondary: 'cyan',
      },
      spacing: {
        unit: 8,
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
      // ...more keys and values, it's free style!
    },
  },
);
```

#### Accessing theme values

A callback can be used with **styled** and **css** APIs to access the theme values:

```js
const Heading = styled('h1')(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.spacing.unit * 4,
  fontFamily: theme.typography.fontFamily,
}));
```

#### CSS variables support

Zero-runtime can generate CSS variables from the theme values when you wrap your theme with `extendTheme` utility. For example, in a `next.config.js` file:

```js
const { withZeroPlugin, extendTheme } = require('@mui/zero-next-plugin');

module.exports = withZeroPlugin(
  {
    // ...other nextConfig
  },
  {
    theme: extendTheme({
      colors: {
        primary: 'tomato',
        secondary: 'cyan',
      },
      spacing: {
        unit: 8,
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
    }),
  },
);
```

The `extendTheme` utility will go through the theme and create a `vars` object which represents the tokens that refer to CSS variables.

```jsx
const theme = extendTheme({
  colors: {
    primary: 'tomato',
    secondary: 'cyan',
  },
});

console.log(theme.colors.primary); // 'tomato'
console.log(theme.vars.colors.primary); // 'var(--colors-primary)'
```

#### Color schemes

Some tokens, especially color-related tokens, can have different values for different scenarios. For example in a daylight condition, the background color might be white, but in a dark condition, it might be black.

The `extendTheme` utility lets you define theme with a special `colorSchemes` key:

```jsx
extendTheme({
  colorSchemes: {
    light: {
      colors: {
        background: '#f9f9f9',
        foreground: '#121212',
      },
    },
    dark: {
      colors: {
        background: '#212121',
        foreground: '#fff',
      },
    },
  },
});
```

In the above example, `light` (default) and `dark` color schemes are defined. The structure of each color scheme must be a plain object with keys and values.

#### Switching color schemes

By default, when `colorSchemes` is defined, zero-runtime uses the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query to switch between color schemes based on user's system settings.

However, if you want to control the color scheme based on application logic, for example, using a button to switch between light and dark mode, you can customize the behavior by providing a `getSelector` function:

```diff
  extendTheme({
    colorSchemes: {
      light: { ... },
      dark: { ... },
    },
+   getSelector: (colorScheme) => colorScheme ? `.theme-${colorScheme}` : ':root',
  });
```

Note that you need to add a logic to a button by yourself. Here is an example of how to do it:

```jsx
function App() {
  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle('theme-dark');
      }}
    >
      Toggle color scheme
    </button>
  );
}
```

#### CSS variables prefix

You can add a prefix to the generated CSS variables by providing a `cssVarPrefix` option to the `extendTheme` utility:

```jsx
extendTheme({
  cssVarPrefix: 'zero',
});
```

The generated CSS variables will have the `zero` prefix:

```css
:root {
  --zero-colors-background: #f9f9f9;
  --zero-colors-foreground: #121212;
}
```

#### TypeScript

To get the type checking for the theme, you need to augment the theme type:

```ts
// any file that is included in your tsconfig.json
import type { ExtendTheme } from '@mui/zero-runtime';

declare module '@mui/zero-runtime/theme' {
  interface ThemeTokens {
    // the structure of your theme
  }

  interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: 'light' | 'dark';
      tokens: ThemeTokens;
    }>;
  }
}
```
