# zero-runtime

A zero-runtime CSS-in-JS library that extracts the colocated css to it's own css files at build-time.

- [Mental model](#mental-model)
- [Getting started](#getting-started)
  - [Next.js](#nextjs)
  - [Vite](#vite)
- [Usage](#usage)
  - [Creating styles](#creating-styles)
  - [Creating components](#creating-components)
    - [Styling based on props](#styling-based-on-props)
    - [Styling based on runtime values](#styling-based-on-runtime-values)
    - [Styled component as a CSS selector](#styled-component-as-a-css-selector)
- [Theme](#theme)
  - [Accesing theme values](#accesing-theme-values)
  - [CSS variables support](#css-variables-support)
  - [Color schemes](#color-schemes)
  - [Mutliple themes](#mutliple-themes)

## Mental model

// TODO: Add a mental model

## Getting started

Zero-runtime supports Next.js and Vite with future support for more bundlers—you must install the corresponding plugin, as shown below.

### Next.js

```bash
npm install @mui/zero-runtime
npm install --save-dev @mui/zero-next-plugin
```

Then, in your `next.config.js` file, import the plugin and wrap the exported config object:

```js
const { withZeroPlugin } = require('@mui/zero-next-plugin');

/**
 * @type {ZeroPluginConfig}
 */
const zeroPluginOptions = {
  theme: {}, // To learn more, check the "Theme" section.
};

module.exports = withZeroPlugin(
  {
    // ...other nextConfig
  },
  zeroPluginOptions,
);
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
    zeroVitePlugin({
      theme: {}, // To learn more, check the "Theme" section.
    }),
    // ... Your other plugins.
  ],
});
```

## Usage

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

The `css` function will be replaced with a unique string that represents the CSS class name for the generated styles.

You can reuse the styles across your application by applying the class name to any element.

To Learn more about using theme, check out [Theme](#theme) section.

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

Use the `variants` to define styles for a combination of the component's props.

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

```tsx
const Heading = styled.h1<{ isError?: boolean }>({
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

### Theme

Theme lets you reuse the same values, such as colors, spacing, and typography, across your application. It is a plain object of any structure that you can define in your config file.

For example, in Next.js, you can define the theme in the `next.config.js` file:

```js
const { withZeroPlugin } = require('@mui/zero-next-plugin');

/**
 * @type {ZeroPluginConfig}
 */
const zeroPluginOptions = {
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
};

module.exports = withZeroPlugin(
  {
    // ...other nextConfig
  },
  zeroPluginOptions,
);
```

#### Accesing theme values

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

/**
 * @type {ZeroPluginConfig}
 */
const zeroPluginOptions = {
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
};

module.exports = withZeroPlugin(
  {
    // ...other nextConfig
  },
  zeroPluginOptions,
);
```

The `extendTheme` utility will go through the theme object and create a `vars` object which represents the theme tokens that are available as CSS variables.

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

When `extendTheme` is used, zero-runtime will extract and generate CSS variables to a separate CSS file.

#### Color schemes

Some tokens, especially color-related tokens, can have different values for different scenarios. For example in a daylight condition, the background color might be white, but in a dark condition, it might be black.

The `extendTheme` utility lets you define unlimited color schemes:

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
  defaultColorScheme: 'light',
});
```

In the above example, `light` (default) and `dark` color schemes are defined. Next, choose one or both methods to switch between color schemes:

- **CSS media query**: It uses the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query, no extra JavaScript is required at runtime.

  ```diff
   extendTheme({
     colorSchemes: {
       light: { ... },
       dark: { ... },
     },
     defaultColorScheme: 'light',
  +  prefersColorScheme: {
  +    light: 'light',
  +    dark: 'dark',
  +  }
   });
  ```

- **class, data-\* attribute** : provide a `getColorSchemeSelector` function to tell zero-runtime what selector to apply for each color scheme. This method is more flexible but you need to write a JavaScript to control when and where to attach the attribute.

  ```diff
   extendTheme({
     colorSchemes: {
       light: { ... },
       dark: { ... },
     },
     defaultColorScheme: 'light',
  +  getColorSchemeSelector: (colorScheme) => `.${colorScheme}`,
   });
  ```

  The result CSS will be:

  ```css
  :root,
  .light {
    --colors-background: #f9f9f9;
    --colors-foreground: #121212;
  }
  .dark {
    --colors-background: #212121;
    --colors-foreground: #fff;
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

#### Mutliple themes

> ⏳ Currently, zero-runtime only supports a single theme.
