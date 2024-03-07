# Pigment CSS

A zero-runtime CSS-in-JS library that extracts the colocated styles to their own CSS files at build-time.

- [Getting started](#getting-started)
  - [Why this project exists?](#why-choose-pigment-css)
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

Pigment CSS supports Next.js and Vite with support for more bundlers in future. You must install the corresponding plugin, as shown below.

### Why choose Pigment CSS

Thanks to recent advancements in CSS (like CSS variables and `color-mix()`), "traditional" CSS-in-JS solutions that process styles at runtime are no longer required for unlocking features like color transformations and theme variables which are necessary for maintaining a sophisticated design system.

Pigment CSS addresses the needs of the modern React developer by providing a zero-runtime CSS-in-JS styling solution as a successor to tools like Emotion and styled-components.

Compared to its predecessors, Pigment CSS offers improved DX and runtime performance (though at the cost of increased build time) while also being compatible with React Server Components.
Pigment CSS is built on top of [WyW-in-JS](https://wyw-in-js.dev/), enabling us to provide the smoothest possible experience for Material UI users when migrating from Emotion in v5 to Pigment in v6.

### Next.js

```bash
npm install @pigment-css/react
npm install --save-dev @pigment-css/nextjs-plugin
```

Then, in your `next.config.js` file, import the plugin and wrap the exported config object:

```js
const { withPigment } = require('@pigment-css/nextjs-plugin');

module.exports = withPigment({
  // ... Your nextjs config.
});
```

### Vite

```bash
npm install @pigment-css/react
npm install --save-dev @pigment-css/vite-plugin
```

Then, in your Vite config file, import the plugin and pass it to the `plugins` array as shown:

```js
import { pigment } from '@pigment-css/vite-plugin';

export default defineConfig({
  plugins: [
    pigment(),
    // ... Your other plugins.
  ],
});
```

## Basic usage

> You must configure Pigment CSS with [Next.js](#nextjs) or [Vite](#vite) first.

### Creating styles

Use the `css` API to create reusable styles:

```js
import { css } from '@pigment-css/react';

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
import { styled } from '@pigment-css/react';

const Heading = styled('div')({
  fontSize: '4rem',
  fontWeight: 'bold',
  padding: '10px 0px',
});

function App() {
  return <Heading>Hello</Heading>;
}
```

The Pigment CSS library differs from "standard" runtime CSS-in-JS libraries in a few ways:

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
> The **theme** object is used at build time and does not exist in the final JS bundle. This means that components created using Pigment's `styled` can be used with React Server Components by default while still getting the benefits of theming.

For example, in Next.js, you can define a theme in the `next.config.js` file like this:

```js
const { withPigment } = require('@pigment-css/nextjs-plugin');

module.exports = withPigment(
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
const { withPigment, extendTheme } = require('@pigment-css/nextjs-plugin');

module.exports = withPigment(
  {
    // ...nextConfig
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

By default, when `colorSchemes` is defined, Pigment uses the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query to switch between color schemes based on user's system settings.

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

Note that you need to add the logic to a button by yourself. Here is an example of how to do it:

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
  cssVarPrefix: 'pigment',
});
```

The generated CSS variables will have the `pigment` prefix:

```css
:root {
  --pigment-colors-background: #f9f9f9;
  --pigment-colors-foreground: #121212;
}
```

#### TypeScript

To get the type checking for the theme, you need to augment the theme type:

```ts
// any file that is included in your tsconfig.json
import type { ExtendTheme } from '@pigment-css/react';

declare module '@pigment-css/react/theme' {
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
