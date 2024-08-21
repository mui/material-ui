# Pigment CSS

<p class="description">This guide will help you quickstart your Pigment CSS setup.</p>

<iframe width="100%" height="400" src="https://www.youtube.com/embed/UVeDpUey5Es?si=w8OtdStXHtWWIODa" title="YouTube video player: Getting Started with Pigment CSS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Pigment CSS](https://github.com/mui/pigment-css) is a zero-runtime CSS-in-JS library that pre-compiles at build time, making it compatible with React Server Components and providing you with significant performance improvements over other styling engines.

Pigment CSS is compatible with any React component library and can be used with Vite and Next.js.

## Installation

To get started on an existing project, install Pigment CSS with the following command:

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

``` js
// next.config.js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment({nextConfig});
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

Finally, import the Pigment CSS stylesheet in your `layout.tsx` (Next.js) or `main.tsx` (Vite) file:

```js
import '@pigment-css/react/styles.css';
```

## Usage

### Creating reusable styles

Use the `css` API to create reusable styles:
```js
import { css } from '@pigment-css/react';
```

You can do this either with the `template` or `object` syntax:

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
  display: "#000",
  color: "#fff"
});
```

### Creating global styles

You can also define global styles by using the `globalCSS` API:

```js
import { globalCSS } from '@pigment-css/react';

globalCss`
  body {
    margin: 0;
    padding: 0;
  }
`;
```

### Creating styled components

Use the `styled` API to create styled components:
```js
import { styled } from '@pigment-css/react';

const Heading = styled('div')({
  fontSize: "2rem",
  color: "#9FADBC",
  fontWeight: "bold",
  margin: "1rem",
});
```

You can add different styling options based on props by using the `variants` key. Each `variant` is an object with `props` and `style` keys:
```js
import { styled } from '@pigment-css/react';

const Heading = styled('div')({
  fontSize: "2rem",
  color: "#9FADBC",
  fontWeight: "bold",
  margin: "1rem",
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

### Creating themes

Pigment CSS supports theming, letting you reuse styles and values across your application.
You can create themes by defining them in your config file:
```js
import { withPigment } from '@pigment-css/nextjs-plugin';

export default withPigment(nextConfig,
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

To access your themes, use a callback with the `styled()` and `css()` APIs:

```js
const Heading = styled('h1')(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.spacing.unit * 4,
  fontFamily: theme.typography.fontFamily,
}));
```

### CSS variables

Pigment CSS generates CSS variables from the theme values when these are wrapped by the `extendTheme` utility, creating a `vars` object:

```js
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';

export default withPigment(nextConfig,
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

### Color schemes

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

Pigment CSS uses the `prefers-color-scheme` media query by default to switch between color schemes:

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

### sx prop

Additionally, you can use the special `sx` prop, which lets you apply styles directly to any element.
When using the `sx` prop, Pigment CSS will replace it with `className` and `style` props at build time.
This will work on any element, including HTML elements, and 3rd party custom components (as long as it's JSX):

```js
<div sx={{ display: 'flex', flexDirection: 'column' }}>

<AnyComponent sx={{ fontSize: 12, color: 'red' }} />;
```

Note that if you want to use the `sx` prop on an HTML element, you'll need to augment the `HTMLAttributes` interface:

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
