# zero-runtime

A zero-runtime CSS-in-JS library that extracts the colocated css to it's own css files at build-time.

## Getting started

Zero-runtime supports Next.js and Vite with future support for more bundlers—you must install the corresponding plugin, as shown below.

The package currently has a dependency on `@mui/material` to initialize the theme object, but this is only at build time. There won't be any Material UI code at runtime if you're not using it otherwise—in that case, you can move it to dev dependencies instead (as shown with the plugin packages).

### Next.js

#### Installation

```bash
npm install @mui/zero-runtime @mui/material
npm install --save-dev @mui/zero-next-plugin
```

#### Configuration

In your `next.config.js` file,

1. Import the plugin

```js
const { withZeroPlugin } = require('@mui/zero-next-plugin');
```

2. Create a theme object

```js
const { experimental_extendTheme: extendTheme } = require('@mui/material/styles');
const theme = extendTheme();
```

3. Wrap the exported config object

```js
module.exports = withZeroPlugin(nextConfig, {
  theme,
});
```

### Vite

#### Installation

```bash
npm install @mui/zero-runtime @mui/material
npm install --save-dev @mui/zero-vite-plugin
```

#### Configuration

In your vite config file,

1. Import the plugin

```js
import { zeroVitePlugin } from '@mui/zero-vite-plugin';
```

2. Create a theme object

```js
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
const theme = extendTheme();
```

3. Add the plugin to the `plugins` array. The position does not matter.

```js
export default defineConfig({
  plugins: [
    zeroVitePlugin({
      theme,
    }),
    // ... Your other plugins.
  ],
});
```

### Usage

In your source files, you can import the `styled` function from `@mui/zero-runtime`. The usage should be familiar if you've worked with Emotion or styled-components:

```js
import { styled } from '@mui/zero-runtime';

const Heading = styled.h1({
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

You can access the same `theme` object that you provided in the bundler config by declaring styles as callbacks—for example:

```js
const Heading = styled.h1(({ theme }) => ({
  ...theme.typography.h1,
}));
```

Visit the [Default theme viewer](https://mui.com/material-ui/customization/default-theme/) to learn more about the structure of the theme object.

#### Styling variants

The `styled` function must account for all combinations of props. If you're creating a button component that supports a `size` prop and a `color` prop, for example, you can use the `variants` API to define styles for each possible combination of the two:

```jsx
const Button = styled.button(() => ({
  border: 'none',
  // ... other base css styles to be applied across all prop values.
  variants: [
    {
      // prop combinations
      props: {
        color: 'primary',
      },
      // styles to be applied when color="primary" is passed on the component
      style: {
        color: 'blue',
        outline: '1px transparent lightblue',
      },
    },
    {
      props: {
        color: 'secondary',
      },
      // styles to be applied when color="secondary" is passed on the component
      style: {
        color: 'green',
        outline: '1px transparent lightgreen',
      },
    },
    {
      props: {
        size: 'large',
      },
      style: {
        padding: '0.5rem',
      },
    },
    {
      props: {
        size: 'medium',
      },
      style: {
        padding: '0.25rem',
      },
    },
    {
      props: {
        size: 'small',
      },
      style: {
        padding: '0.1rem',
      },
    },
    {
      props: {
        size: 'small',
        color: 'primary',
      },
      style: {
        // Styles to be applied when <Button size="small" color="primary" />
      },
    },
    {
      // If key value pair doesn't suffice, you can use the callback syntax
      // to return `true` if you want the styles to be applied
      props({ children }) {
        return !!children;
      },
      style: {
        // CSS
      },
    },
  ],
}));
```

#### Styling based on runtime values

To style a component based on the runtime values of the props, you can declare a CSS property as a callback—for example:

```tsx
const Heading = styled.h1<{ isError?: boolean }>(({ theme }) => ({
  ...theme.typography.h1,
  color: ({ isError }) => (isError ? 'red' : 'black'),
}));
```

This works through the use of CSS variables and inline styles. The CSS and JSX output will look something like this:

```css
.Heading_class_akjsdfb {
  /* Other styles from `theme.typography` */
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
