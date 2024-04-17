# How Pigment CSS works

Pigment CSS is a zero-runtime CSS-in-JS library. This means it does not have access to the end user's browser runtime which would be necessary to generate and insert authored CSS at runtime. Instead, it does all its processing at build time to pre-generate the CSS which then becomes part of the output bundle. This is why it cannot be consumed on its own. You must install the Pigment CSS plugin that corresponds to the framework you're using and configure your bundler accordingly—Pigment CSS currently supports Next.js and Vite.

- [Processor](#processor)
  - [1. Detection and evaluation](#1-detection-and-evaluation)
  - [2. Transformation and runtime replacement](#2-transformation-and-runtime-replacement)
  - [3. Extraction](#3-extraction)
- [Debugging](#debugging)

## Processor

Pigment CSS uses the [WyW-in-JS](https://wyw-in-js.dev/) library that also powers [Linaria](https://linaria.dev/). It features a [processor](https://wyw-in-js.dev/how-to/custom-tagged-template#creating-a-processor) which makes it possible to create custom logic that's triggered by the presence of different imports from the library. The processor looks through the source code for `styled()`, `css()`, and other function calls and extracts the arguments to be evaluated. These values are then handed back to Pigment CSS for additional parsing and evaluation.

For example, here's a simple implementation of the `css()` function:

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

This snippet uses the `css()` call to generate and assign a class name string to the `testClass` variable.

The corresponding (minimal) bundler configuration for this to work with the theme might look like:

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

When the source file above (`app.js`) goes through the bundler transform, Pigment CSS's bundler plugin looks for the call site of `css` imported from `@pigment-css/react` and prepares an intermediate source file to get the actual values of the arguments of the `css()` call. This happens through WyW-in-JS's processors. In this case, the simplified intermediate code is:

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

The above code is then evaluated through the use of the `node:module` [module](https://nodejs.org/docs/v20.11.1/api/modules.html#module) which returns the evaluated values of the parameters.

### 2. Transformation and runtime replacement

Once it has access to the actual values of the styles, Pigment CSS then does source code [transformation](https://github.com/mui/material-ui/blob/next/packages/pigment-css-react/src/processors/css.ts) in place to remove the `css()` call from the source and replace it with a static class name string:

```js
// app.js
import { css } from '@pigment-css/react';

const testClass = 'c1aiqtje';
```

### 3. Extraction

At the same time as the transformation in step 2, Pigment CSS also generates the CSS string for the above styles at build time. This generation happens through the internal use of the `@mui/system` and `emotion` packages. In the [detection and evaluation](#1-detection-and-evaluation) step, Pigment gets access to the callback function defined as the first argument of the `css()` call. Since it's a function, it's called by Pigment CSS which also passes an object containing the `theme` as the first argument. This `theme` is the same object that was defined as part of the bundler config and passed to Pigment CSS. The returned object then goes through the same transforms it would go through when using Material UI components directly with `emotion`. This also makes it possible to write shorthand properties—for example, the snippet below uses `p` for `padding` and `mr` for `margin-right`:

```js
import { css } from '@pigment-css/react';

const testClass = css(({ theme }) => ({
  p: 0,
  mr: 0,
  bgColor: 'relative',
}));
```

The output CSS string is then made part of the user code through the bundler-specific plugin:

```diff
 // app.js
 import { css } from '@pigment-css/react';
+import './app.pigment.css';

 const testClass = 'c1aiqtje';
```

In the snippet above, you can assume that the `./app.pigment.css` import is a virtual module (this file doesn't actually exist on the file system) with the contents generated in-memory. This implementation varies across various bundlers but the general idea is the same. Here, the contents of the `app.pigment.css` file would be:

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

Since Pigment CSS does all its processing at build time, debugging for errors works a little differently than it does with runtime CSS-in-JS. For example, when running the Emotion-based code snippet below (either in the browser or on the server) you'd be able to see the actual values of the `theme` object being logged at runtime in the browser console or server logs.

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

But if this same code were implemented with `@pigment-css/react` instead of `@emotion/styled`, you would see the theme being logged in your terminal at build time or during development (when you run `next dev`/`next build` or `vite dev`/`vite build` as appropriate). The actual output bundle won't have the code that logs the theme since it's already been replaced, as outlined in the steps above. In effect, the theme doesn't exist after bundling—it's reduced down to a collection of CSS variables.

Because of this, when debugging, you'll have to look in your terminal to locate issues specific to Pigment CSS. They'll start with `@pigment-css/` or `wyw-in-js` and include a short summary of why the issue is occurring. In many cases, issues arise related to the scope of the variables used to define the styles, so this is a good place to start looking if something isn't working as expected. Feel free to open a [new issue](https://github.com/mui/material-ui/issues/new/choose) when you encounter a problem that appears to be related to the Pigment CSS codebase itself.

<!-- @TODO: Add more about specific issues -->
