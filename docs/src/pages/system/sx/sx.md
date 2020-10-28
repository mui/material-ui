# The `sx` prop

<p class="description">Utility for styling elements inline, using the theme values.</p>

## Getting started

Each `@material-ui/core` component supports the `sx` prop. The prop is a superset of CSS, that let's you add any CSS to the underlaying component, while mapping values to different theme keys. This should help you to keep your application look consistent.

You should use this prop whenever you need to add a style override to a Material-UI component. If you repeatedly add the same styles on a component, then `styled()` is better alternative, as it allows you to specify the overrides only once, and reuse them in all component instances.

{{"demo": "pages/system/sx/GettingStarted.js", "defaultCodeOpen": true}}

# Property to theme key mapping

You can explore the [System API](/system/api/) page to discover how the different CSS (and custom) properties are mapped to the theme keys.

## Value as a function

If you wish to use the theme for a CSS property that is not supported by the system, you can use a function as the value, in which you can  access the theme object.

{{"demo": "pages/system/sx/ValueAsFunction.js", "defaultCodeOpen": true}}

# Breakpoints

If you would like to have responsive values for some CSS property, you may use the breakpoints shorthand syntax. We offer two ways of defining the breakpoints:

## Breakpoints as array

The first option is to define your breakpoints as an array, from the smallest to the largest breakpoint.

{{"demo": "pages/system/sx/BreakpointsAsArray.js", "defaultCodeOpen": true}}

## Breakpoints as object

The second option for defining breakpoints is to define them as object, using the breakpoints as keys. Here is an example of how you may define the previous example by using the object syntax.

{{"demo": "pages/system/sx/BreakpointsAsObject.js", "defaultCodeOpen": true}}

## Custom breakpoints

You can also specify your own custom breakpoints and use them as keys when defining the breakpoints object. Here is an example of how to do that.

```jsx
import * as React from 'react';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

export default function CustomBreakpoints() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: {
            tablet: 100,
            laptop: 300,
            desktop: 500,
          },
        }}
      >
        This box has a responsive width
      </Box>
    </ThemeProvider>
  );
}
```

If you are using TypeScript, you would also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```
