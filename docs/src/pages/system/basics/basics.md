# Material-UI System

<p class="description">Utility-first style functions for rapidly building custom designs & systems.</p>

The system lets you quickly build custom UI components leverating the design tokens defined in your theme.

## Demo

{{"demo": "pages/system/basics/Demo.js"}}

## Why

There are several reasons for why you may need the system offered by Material-UI. Here are few of them:

### 1. Building consistent UIs is hard

This is especially true, when there is at least more than one person building the application. There has to be some synchronization to what are the design tokens and how are those used. What parts of the theme structure should be used with what CSS properties etc.

### 2. Switching context between JS and CSS

Often we find ourselves jumping from the JS to the CSS files, or from the components definition to the instance usage in order to conclude where and how some styles are defined. This is particularly true as the complexity (LOCs/# of elements) of the component we are working on increases. We could save a lot of time by removing this contraint.

### 3. Less code to type

Usually when defining styles for a react component we need to either define a separate stylesheet, use some kind of factory for creating the component (`styled()`), or use some kind of hook for generating the styles (for example `makeStyles()` & `useStyles()`), which not only means we need to switch the context from where we are currently in the code, but we need to also type much more code than the actual styles we want to have on some element.

## How do we solve this?

In order to solve these issues, we need to have a simple way of pulling & wiring the correct design tokens for specific CSS properties, and adding them directly on the react element where we want the styles to be applied, by a prop, that can be easily discoverable.

The `sx` prop, as part of the system is the solution we see for solving these problems. In the example above, you may see how it can be used on the MUI components.

The property behaves as a superset of CSS that offers mapping values from the theme directly, by pulling specific values depending on the CSS property used. In addition to this, it allows a simple way of defining responsive values, that corresponds to the breakpoints values defined in the theme.

With it you can build easily your custom visual components, like `Card`, `Badge`, `Chip` that could accept the props & behave exactlly as your design system specifies.

In the next sections, we will dive deeper into all features of the `sx` prop.

## Installation

```jsx
// with npm
npm install @material-ui/system

// with yarn
yarn add @material-ui/system
```

## The `sx` prop

The `sx` prop is a superset of CSS, that let's you add any CSS to the underlaying component, while mapping values to different theme keys. This should help you to keep your application look consistent. The prop is available in all `@material-ui/core` components.

You can include this prop in your own components too by using the `experimentalStyled` utility from `@material-ui/core/styles` for creating your custom component.

```jsx
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Div = styled('div')``;
```

<b>Note:</b>

You should use this prop whenever you need to add a style override to a Material-UI component. If you repeatedly add the same styles on a component, then `styled()` is better alternative, as it allows you to specify the overrides only once, and reuse them in all component instances.

### Design tokens in the theme

You can explore the [System properties](/system/properties/) page to discover how the different CSS (and custom) properties are mapped to the theme keys.

### Many shorthands

We offer lots of shorthands on the CSS properties. Here are few examples:

```jsx
  <Box
    sx={{
      boxShadow: 1, // theme.shadows[1]
      color: 'primary.main', // theme.palette.primary.main
      m: 1, // margin: theme.spacing(1)
      p: {
        sx: 1, // [theme.breakpoints.up('sx')]: : { padding: theme.spacing(1) }
      },
      zIndex: 'tooltip', // theme.zIndex.tooltip
    }}
  >
```

### Superset of CSS

As the property is a superset of CSS, you can use child or pseudo selectors, media queries, raw css values etc. Here are few examples:

```jsx
  // Using pseudo selectors
  <Box
    sx={{
      // some styles
      ":hover": {
        '& .ChildSelector': {
          bgcolor: `${props.color}.dark`,
        },
        '& .OtherChildSelector': {
          color: `${props.color}.dark`,
        },
        boxShadow: 6,
      },
    }}
  >
```

```jsx
  // Using media queries
  <Box
    sx={{
      // some styles
      "@media screen and (max-width: 992px)": {
        width: 300,
      },
    }}
  >
```

## Usage

It can be used from 3 different sources:

### Box

The `Box` component is a light component that gives you access to this functionality.

### Babel plugin

TODO: For #23220

### Core components

All core Material-UI components will suppor the `sx` prop.

## Responsive values

If you would like to have responsive values for a CSS property, you can use the breakpoints shorthand syntax. There are two ways of defining the breakpoints:

### 1. Breakpoints as an array

The first option is to define your breakpoints as an array, from the smallest to the largest breakpoint.

{{"demo": "pages/system/basics/BreakpointsAsArray.js"}}

### 2. Breakpoints as an object

The second option for defining breakpoints is to define them as an object, using the breakpoints as keys. Here is the previous example again, using the object syntax.

{{"demo": "pages/system/basics/BreakpointsAsObject.js"}}

## Custom breakpoints

You can also specify your own custom breakpoints, and use them as keys when defining the breakpoints object. Here is an example of how to do that.

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

## Theme getter

If you wish to use the theme for a CSS property that is not supported by the system, you can use a function as the value, in which you can access the theme object.

{{"demo": "pages/system/basics/ValueAsFunction.js"}}

## Prior art

`@material-ui/system` synthesizes ideas & APIs from several different sources:

- [Tachyons](https://tachyons.io/) was one of the first (2014) CSS libraries to promote the [Atomic CSS pattern](https://css-tricks.com/lets-define-exactly-atomic-css/) (or Functional CSS).
- Tachyons was later on (2017) followed by [Tailwind CSS](https://tailwindcss.com/). They have made Atomic CSS more popular.
- [Twitter Bootstrap](https://getbootstrap.com/docs/4.1/utilities/borders/) has slowly introduced atomic class names in v2, v3, and v4. The way they group their "Helper classes" was used as inspiration.
- In the React world, [Styled System](https://github.com/jxnblk/styled-system) was one of the first (2017) to promote the style functions.
  It can be used as a generic Box component replacing the atomic CSS helpers as well as helpers to write new components.
- Large companies such as Pinterest, GitHub, and Segment.io are using the same approach in different flavours:
  - [Evergreen Box](https://evergreen.segment.com/components/layout-primitives/)
  - [Gestalt Box](https://pinterest.github.io/gestalt/#/Box)
  - [Primer Box](https://primer.style/components/docs/Box)
- The actual implementation and the object responsive API was inspired by the [Smooth-UI's system](https://smooth-ui.smooth-code.com/docs-basics-system).
