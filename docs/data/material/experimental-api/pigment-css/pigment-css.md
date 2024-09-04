# Getting started with Pigment CSS

<p class="description">Learn how to get started customizing your components using Pigment CSS.</p>

<iframe width="100%" height="400" src="https://www.youtube.com/embed/UVeDpUey5Es?si=w8OtdStXHtWWIODa" title="YouTube video player: Getting Started with Pigment CSS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Pigment CSS](https://github.com/mui/pigment-css) is a zero-runtime CSS-in-JS library that pre-compiles at build time, making it compatible with React Server Components and providing you with significant performance improvements over other styling engines.

Pigment CSS is compatible with any React component library and can be used with Vite and Next.js.

Check out the [Migrating to Pigment CSS](/material-ui/migration/migrating-to-pigment-css/) guide if you have an existing Material UI project.

## Prerequisites

- Node.js
- A package manager
- A Next.js or Vite project

If using Next.js, you can fast track your Pigment CSS installation and project creation with the following commands:

```bash
curl https://codeload.github.com/mui/pigment-css/tar.gz/master | tar -xz --strip=2  pigment-css-master/examples/pigment-css-nextjs-ts
cd pigment-css-nextjs-ts
```

For Vite:

```bash
curl https://codeload.github.com/mui/pigment-css/tar.gz/master | tar -xz --strip=2 pigment-css/examples/pigment-css-vite-ts
cd pigment-css-vite-ts
```

## Manual installation

To get started on an existing project, install Pigment CSS with the following command:

**Next.js**

```bash
npm install @pigment-css/react
npm install --save-dev @pigment-css/nextjs-plugin
```

**Vite**

```bash
npm install @pigment-css/react@next
npm install --save-dev @pigment-css/vite-plugin@next
```

Next, head over to your config file and import the `withPigment` plugin:

**Next.js**

```js
// next.config.js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment({ nextConfig });
```

**Vite**

```ts
// main.tsx
import { pigment } from '@pigment-css/vite-plugin';

export default defineConfig({
  plugins: [
    pigment(),
    // ... Your other plugins.
  ],
});
```

Finally, import the Pigment CSS stylesheet in your `layout.tsx` (Next.js) or `main.tsx` (Vite) file:

```js
import '@pigment-css/react/styles.css';
```

## Usage

Pigment CSS addresses the needs of modern React development: it's compatible with React Server Components and lets you reap the benefits of CSS-in-JS—all without runtime performance costs.

With Pigment CSS, you can create locally scoped reusable styles, themes, CSS variables, and more.

### Styling

Pigment CSS simplifies the creation and definition of styles through various APIs:

- `css`: for reusable styles
- `globalCss`: for global styles
- `keyframes`: for reusable animation keyframes
- `styled`: for styled components

#### Creating reusable styles

Use the `css` API to create reusable styles:

```js
import { css } from '@pigment-css/react';
```

You can do this with either template or object syntax:

**Template syntax**

```js
const bodyBackground = css`
  background-color: #000;
  color: #fff;
`;
```

**Object syntax**

```js
const mainClass = css({
  display: '#000',
  color: '#fff',
});
```

#### Creating global styles

Use the `globalCSS` API to define global styles to load across an entire app.

You should define these at the top level of your JavaScript file:

```js
import { globalCSS } from '@pigment-css/react';

globalCss`
  body {
    margin: 0;
    padding: 0;
  }
`;
```

#### Creating styled components

Keeping styles scoped to components ensures that only the necessary CSS is loaded and leads to better modularity, readability, and maintainability.
You can apply conditional styling to your components based on props or runtime values.

Use the `styled` API to create styled components:

```js
import { styled } from '@pigment-css/react';

const Heading = styled('div')({
  fontSize: '2rem',
  color: '#9FADBC',
  fontWeight: 'bold',
  margin: '1rem',
});
```

**Styling based on props**

Use the `variants` key to define different styling options based on props. 
This approach is recommended when the value of the prop is known at build time.

Each of the `variants` is an object with `props` and `style` keys:

```js
import { styled } from '@pigment-css/react';

const Heading = styled('div')({
  fontSize: '2rem',
  color: '#9FADBC',
  fontWeight: 'bold',
  margin: '1rem',
  variants: [
    {
      props: { variant: 'success' },
      style: { color: '#23AD79' },
    },
    {
      props: { size: 'small' },
      style: { fontSize: '1.5rem' },
    },
  ],
});
```

**Styling based on runtime values**

When the value of a prop is unknown ahead of time, you can style your components based on runtime values:

```js
const Heading = styled('h1')({
  color: ({ isError }) => (isError ? 'red' : 'black'),
});
```

### Themes

Pigment CSS supports theming to apply consistent styles and values across your application.
You can create themes by defining them in your config file:

```js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment(nextConfig, {
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
});
```

To access your themes, use a callback with the `styled()` and `css()` APIs:

```js
const Heading = styled('h1')(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.spacing.unit * 4,
  fontFamily: theme.typography.fontFamily,
}));
```

#### CSS variables support

Pigment CSS generates CSS variables from the theme values when they're wrapped by the `extendTheme` utility, creating a `vars` object:

```js
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';

export default withPigment(nextConfig, {
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
});
```

#### Color schemes

You can use the `colorSchemes` key within the `extendTheme` utility to assign different values based on different conditions, such as switching between dark mode and light mode:

```js
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

Pigment CSS uses the `prefers-color-scheme` media query by default to switch between color schemes:

```js
const colorScheme = css`
  background-color: ${({ theme }) => theme.colorSchemes.dark.colors.background};

  color: ${({ theme }) => theme.colorSchemes.dark.colors.foreground};

  @media (prefers-color-scheme: light) {
    background-color: ${({ theme }) => theme.colorSchemes.light.colors.background};
    color: ${({ theme }) => theme.colorSchemes.light.colors.foreground};
  }
`;
```

You can also customize the behavior by providing a `getSelector` function:

```js
  extendTheme({
    colorSchemes: {
      light: { ... },
      dark: { ... },
    },
+   getSelector: (colorScheme) => colorScheme ? `.theme-${colorScheme}` : ':root',
  });
```

### The sx prop

Pigment CSS includes [the `sx` prop](/system/getting-started/the-sx-prop/) which lets you provide one-off inline custom styles to any element.

At build time, Pigment CSS replaces the `sx` prop with `className` and `style` props.
The `sx` prop works with all Material UI components as well as HTML elements and any third-party JSX components.

```js
<div sx={{ display: 'flex', flexDirection: 'column' }}>

<AnyComponent sx={{ fontSize: 12, color: 'red' }} />;
```

If you use the `sx` prop on an HTML element, you'll need to augment the `HTMLAttributes` interface:

```js
type Theme = {
  // your theme type
};

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?:
        | React.CSSProperties
        | ((theme: Theme) => React.CSSProperties)
        | ReadonlyArray<React.CSSProperties | ((theme: Theme) => React.CSSProperties)>;
    }
  }
}
```
