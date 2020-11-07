# Material-UI System

<p class="description">Utility-first style functions for rapidly building custom design systems.</p>

Material-UI comes with dozens or **ready-to-use** components in the core.
These components are an incredible starting point but when it comes to make your site stand out with a custom design, they can be challenging to customize. Introducing the system:

The **system** lets you quickly build custom UI components leveraging the design tokens defined in your theme.

## Demo

_(Resize the window to see the responsive breakpoints)_

{{"demo": "pages/system/basics/Demo.js", "bg": true, "defaultCodeOpen": true}}

## Installation

```jsx
// with npm
npm install @material-ui/system

// with yarn
yarn add @material-ui/system
```

## Why utility-first?

Compare how the same stat component can be built with two different APIs.

{{"demo": "pages/system/basics/Why.js", "bg": true, "defaultCodeOpen": false}}

- ❌ using the standard styled-components API:

```jsx
const StatWrapper = styled('div')(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme.shadows[1]};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(2)};
  min-width: 300px;
`,
);

const StatHeader = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
`,
);

const StyledTrend = styled(TrendingUpIcon)(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  font-size: 16px;
  vertical-alignment: sub;
`,
);

const StatValue = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  font-size: 34px;
  font-weight: ${theme.typography.fontWeightMedium};
`,
);

const StatDiff = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  display: inline;
  font-weight: ${theme.typography.fontWeightMedium};
  margin-left: ${theme.spacing(0.5)};
  margin-right: ${theme.spacing(0.5)};
`,
);

const StatPrevious = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  display: inline;
  font-size: 12px;
`,
);

return (
  <StatWrapper>
    <StatHeader>Sessions</StatHeader>
    <StatValue>{'98.3 K'}</StatValue>
    <StyledTrend />
    <StatDiff>{'18.77%'}</StatDiff>
    <StatPrevious>{'vs last week'}</StatPrevious>
  </StatWrapper>
);
```

- ✅ using the system:

```jsx
/* prettier-ignore */
<Box sx={{ bgcolor: 'background.paper', boxShadow: 1, borderRadius: 'borderRadius', p: 2, minWidth: 300 }}>
  <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
  <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'fontWeightMedium' }}>
    {'98.3 K'}
  </Box>
  <Box component={TrendingUpIcon} sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }} />
  <Box sx={{ color: 'success.dark', display: 'inline', fontWeight: 'fontWeightMedium', mx: 0.5 }}>
    {'18.77%'}
  </Box>
  <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
    {'vs last week'}
  </Box>
</Box>
```

The system focus on solving 3 main problems:

**1. Switching context wastes time.**

There's no need to constantly jump between the usage of the styled components and where they are defined. With the system, those descriptions are right where you need them.

**2. Naming things is hard.**

Have you ever found yourself struggling to find a good name for a styled component?
The system maps the styles directly to the element.
All you have to do is worry about actual style properties.

**3. Enforcing consistency in UIs is hard.**

This is especially true when more than one person is building the application, as there has to be some coordination amongst members of the team regarding choice of design tokens and how they are used, what parts of the theme structure should be used with what CSS properties, and so on.

The system provide direct access to the value in the theme. It makes it easier to design with constraints.

## The `sx` prop

The `sx` prop, as part of the system, solves these problems by providing a simple way of applying the correct design tokens for specific CSS properties directly to a React element. The [demo above](#demo) shows how it can be used in Material-UI components.

This prop provides a superset of CSS that maps values directly from the theme, depending on the CSS property used. In addition, it allows a simple way of defining responsive values that correspond to the breakpoints defined in the theme.

With it you can easily build your custom visual components, such as card, badge, chip, exactly as your design system specifies. In the sections following this one, we will dive deeper into the features of the sx prop.

## Usage

### Design tokens in the theme

You can explore the [System properties](/system/properties/) page to discover how the different CSS (and custom) properties are mapped to the theme keys.

### Shorthands

There are lots of shorthands available for the CSS properties. Here are few examples:

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

These are documented in the following sections, for instance, [the spacing](/system/spacing/).

### Superset of CSS

As the prop supports a superset of CSS, you can use child or pseudo selectors, media queries, raw CSS values etc. Here are few examples:

- Using pseudo selectors:

  ```jsx
  <Box
    sx={{
      // some styles
      ":hover": {
        boxShadow: 6,
      },
    }}
  >
  ```

- Using media queries:

  ```jsx
  <Box
    sx={{
      // some styles
      '@media print': {
        width: 300,
      },
    }}
  >
  ```

- Using nested selector:

  ```jsx
  <Box
    sx={{
      // some styles
      '& .ChildSelector': {
        bgcolor: 'primary.main',
      },
    }}
  >
  ```

### Responsive values

If you would like to have responsive values for a CSS property, you can use the breakpoints shorthand syntax. There are two ways of defining the breakpoints:

#### 1. Breakpoints as an array

The first option is to define your breakpoints as an array, from the smallest to the largest breakpoint.

{{"demo": "pages/system/basics/BreakpointsAsArray.js"}}

#### 2. Breakpoints as an object

The second option for defining breakpoints is to define them as an object, using the breakpoints as keys. Here is the previous example again, using the object syntax.

{{"demo": "pages/system/basics/BreakpointsAsObject.js"}}

### Custom breakpoints

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

If you are using TypeScript, you will also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

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

### Theme getter

If you wish to use the theme for a CSS property that is not supported natively by the system, you can use a function as the value, in which you can access the theme object.

{{"demo": "pages/system/basics/ValueAsFunction.js"}}

## Implementations

The `sx` prop can be used in four different locations:

### 1. Core components

All core Material-UI components will support the `sx` prop.

### 2. Box

[`Box`](/components/box/) is a lightweight component that gives access to the `sx` prop, and can be used as a utility component, and as a wrapper for other components.

### 3. Custom components

In addition to Material-UI components, you can add the `sx` prop to your custom components too, by using the `experimentalStyled` utility from `@material-ui/core/styles`.

```jsx
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Div = styled('div')``;
```

> **Note:**
>
> You should use this prop whenever you need to add or override a component style. If you find you are repeatedly applying the same styles to a component, then `styled()` may be a better option, as it allows you to specify the styles only once, and reuse them in all component instances. See [Customizing components](/customization/components/) for all the alternatives.

### 4. Any element with the babel plugin

TODO [#23220](https://github.com/mui-org/material-ui/issues/23220).

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
