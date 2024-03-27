# How Pigment CSS works

As already [stated](README.md), Pigment CSS is a zero-runtime CSS-in-JS library. This means it does not have access to the browser runtime of the end-user to generate and insert the authored CSS at runtime. So it has to do all its processing during the build time to pregenerate the CSS which are then made part of the output bundle. This is the reason it cannot be consumed on its own. You also have to install the specific Pigment CSS plugin and configure your bundler with it (currently, it supports Next.js and Vite with plans for more bundlers in future).

- [Processor](#processor)
  - [1. Detection and evaluation](#1-detection-and-evaluation)
  - [2. Transformation and runtime replacement](#2-transformation-and-runtime-replacement)
  - [3. Extraction](#3-extraction)
- [Debugging](#debugging)

## Processor

Pigment CSS uses [WyW-in-JS](https://wyw-in-js.dev/) library that also powers [Linaria](https://linaria.dev/). It has a concept of `processors` which enables custom logic around what to do when users use an import from the library.

As an example, let's look at the `css` that is import and used in the codebase:

```js
// app.js
import { css } from '@pigment-css/react';

const testClass = css(({ theme }) => ({
  lineHeight: '1.4375em',
  padding: 0,
  position: 'relative',
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.body1,
}));
```

This uses the `css` function to generate and assign a string className to `testClass` variable. The minimal bundler configuration for this to work with the `theme` might look like:

```js
// config.js
const customTheme = {
  palette: {
    text: {
      secondary: '#00e676',
    },
  },
  typography: {
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
      // ...others
    },
  },
};

const pigmentConfig = {
  theme: customTheme,
};
```

### 1. Detection and evaluation

When the source file above (`app.js`) goes through the bundler transform, the bundler plugin of Pigment CSS looks for the call site of `css` imported from `@pigment-css/react` and prepares an intermediate source file to get the actual values of the arguments of the `css` call. In this case, the simplified intermediate code is:

```js
const _exp1 = ({ theme }) => ({
  lineHeight: '1.4375em',
  padding: 0,
  position: 'relative',
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.body1,
});

module.exports = {
  _exp1,
};
```

The above code is then evaluated through the use of `node:module` [module](https://nodejs.org/docs/v20.11.1/api/modules.html#module) which returns the evaluated values of the parameters.

### 2. Transformation and runtime replacement

Now that it has access to the actual values of the styles, Pigment CSS does source code [transformation](https://github.com/mui/material-ui/blob/next/packages/pigment-css-react/src/processors/css.ts) in-place to remove the `css` call from the source and replaces it with a static class name string:

```js
// app.js
import { css } from '@pigment-css/react';

const testClass = 'c1aiqtje';
```

### 3. Extraction

At the same time, it generates the CSS string for the above styles at build time. This generation happens through the internal use of `@mui/system` and `emotion` packages. In the [Debugging and evaluation](#1-detection-and-evaluation) step, Pigment gets access to the callback function defined as the first argument of `css` function. Since its a function, it is called by Pigment which also passes an object containing the `theme` as the first argument. This `theme` is the same object that was defined as part of the bundler config and passed to Pigment. The returned object then goes through the same transforms it'd go through when using Material UI components directly with `emotion`. That's why, you can also write shorthand properties like:

```js
import { css } from '@pigment-css/react';

const testClass = css(({ theme }) => ({
  p: 0,
  mr: 0,
  bgColor: 'relative',
}));
```

The output CSS string is then made part of the user code through the bundler specific plugin:

```diff
 // app.js
 import { css } from '@pigment-css/react';
+import './app.pigment.css';

 const testClass = 'c1aiqtje';
```

Above, you can assume the import of `./app.pigment.css` to be a virtual module (this file doesn't actually exist on the file system) with the contents generated in-memory. This implementation varies across various bundlers but the general idea is the same. Here, the contents of the `app.pigment.css` file would be:

```css
.c1aiqtje {
  padding: 0;
  position: relative;
  color: #00e676;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 16;
  line-height: 1.5;
}
```

## Debugging

Since Pigment CSS does all it's heavy lifting at build-time, debugging for errors works a little differently for it. When using `emotion` with a code like:

```js
// app.js
import { css } from '@emotion/styled';

const Paragraph = css(({ theme }) => {
  console.log(theme);
  return {
    lineHeight: '1.4375em',
    padding: 0,
    position: 'relative',
    color: (theme.vars || theme).palette.text.secondary,
    ...theme.typography.body1,
  };
});
```

Running this code, either in browser or on server, you'd see the actual value of the theme being logged at runtime, either in browser console or your server logs.

But when this same code uses `@pigment-css/react` instead of `@emotion/styled` (with the bundler configured), you'll see the theme being logged in your terminal at build-time or during development. This can be either when you run `next dev`/`next build` when using Next.js or when you run `vite dev`/`vite build` when using Vite. The actual output bundle won't have the code that logs the theme since that has already been replaced as shown above. So the notion of `theme` doesn't exist after bundling and it's just reduced down to a collection of CSS variables.

So to debug why something is not working, you'll have to look into your terminal to see issues specific to Pigment CSS. They'll either start with `@pigment-css/` or `wyw-in-js` and have a small summary of why the issue is happening. It would mostly be related to the scope of variables being used to define the styles in most cases. Feel free to open a [new issue](https://github.com/mui/material-ui/issues/new/choose) when it seems like it is probably related to the internals of Pigment CSS.

<!-- @TODO: Add more about specific issues -->
