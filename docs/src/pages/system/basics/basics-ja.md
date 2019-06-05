# @material-ui/system

<p class="description">Styled system & style functions for building powerful design systems.</p>

## はじめに

`@material-ui/system` provides low-level utility functions called "*style functions*" for building powerful design systems. Some of the key features:

- ⚛️ Access the theme values directly from the component props.
- 🦋 Encourage UI consistency.
- 🌈 Write responsive style effortlessly.
- 🦎 Work with any theme object.
- 💅 Work with the most popular CSS-in-JS solutions.
- 📦 Less than [4 KB gzipped](https://bundlephobia.com/result?p=@material-ui/system).
- 🚀 [Fast enough](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uisystem) not to be a bottleneck at runtime.

It's important to understand that this package exposes pure (side-effect free) style functions with this signature: `({ theme, ...style }) => style`, **that's it**.

### Demo

In the rest of this *Getting Started* section we are using **styled-components** as the reference example (to emphasize the universality of this package). Alternatively, you can [use JSS](#interoperability). The demos are also based on the **default** Material-UI [theme object](/customization/default-theme/).

{{"demo": "pages/system/basics/Demo.js", "defaultCodeOpen": true}}

### インストール

```jsx
// usando npm
npm install @material-ui/system

// usando yarn
yarn add @material-ui/system
```

### Create a component

In order to use the `Box` component, you first need to create it. To start with, add a `spacing` and `palette` function to the style argument.

```jsx
import styled from 'styled-components';
import { spacing, palette } from '@material-ui/system';

const Box = styled.div`${spacing}${palette}`;

export default Box;
```

This Box component now supports new [spacing properties](/system/spacing/#api) and [color properties](/system/palette/#api). For instance, you can provide a padding property: `p` and a color property: `color`.

```jsx
<Box p="1rem" color="grey">Give me some space!</Box>
```

The component can be styled providing any valid CSS values.

### Theming

But most of the time, you want to rely on a theme's values to increase the UI consistency. It's preferable to have a predetermined set of padding and color values. Import the theme provider of your styling solution.

```jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  spacing: 4,
  palette: {
    primary: '#007bff',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* children */}
    </ThemeProvider>
  )
}

export default App
```

Now, you can provide a spacing multiplier value:

```jsx
<Box p={1}>4px</Box>
<Box p={2}>8px</Box>
<Box p={-1}>-4px</Box>
```

and a primary color:

```jsx
<Box color="primary">blue</Box>
```

### All-inclusive

To make the Box component more useful, we have been building a collection of style functions, here is the full list:

- [borders](/system/borders/#api)
- [display](/system/display/#api)
- [flexbox](/system/flexbox/#api)
- [palette](/system/palette/#api)
- [positions](/system/positions/#api)
- [shadows](/system/shadows/#api)
- [sizing](/system/sizing/#api)
- [spacing](/system/spacing/#api)
- [typography](/system/typography/#api)

If you are already using `@material-ui/core`, you can use our [prepackaged Box](/components/box/) component (using JSS internally):

```jsx
import Box from '@material-ui/core/Box';
```

## Interoperability

`@material-ui/system` works with most CSS-in-JS libraries, including JSS, styled-components, and emotion.

If you are already using `@material-ui/core`, we encourage you to start with the **JSS** solution to minimize bundle size.

### JSS

{{"demo": "pages/system/basics/JSS.js", "defaultCodeOpen": true}}

### Styled components

{{"demo": "pages/system/basics/StyledComponents.js", "defaultCodeOpen": true}}

### Emotion

{{"demo": "pages/system/basics/Emotion.js", "defaultCodeOpen": true}}

## Responsive

**All** the properties are responsive, we support 3 different APIs. It uses this default, but customizable, breakpoints theme structure:

```js
const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: key => `@media (min-width:${values[key]}px)`,
  },
};
```

### Array

```jsx
<Box p={[2, 3, 4]} />

/**
 * Outputs:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Object

```jsx
<Box p={{ xs: 2, sm: 3, md: 4 }} />

/**
 * Outputs:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Collocation

If you want to group the breakpoint values, you can use our `breakpoints()` helper.

```jsx
import { compose, spacing, palette, breakpoints } from '@material-ui/system';
import styled from 'styled-components';

const Box = styled.div`
  ${breakpoints(
    compose(
      spacing,
      palette,
    ),
  )}
`;

<Box
  p={2}
  sm={{ p: 3 } }
  md={{ p: 4 } }
/>

/**
 * Saídas:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

## Custom style props

### `style(options) => style function`

Use this helper to create your own style function.

We don't support all the CSS properties. It's possible that you want to support new ones. It's also possible that you want to change the theme path prefix.

#### Arguments

1. `options` (*Object*): 
  - `options.prop` (*String*): The property the style function will be triggered on.
  - `options.cssProperty` (*String|Boolean* [optional]): Defaults to `options.prop`. The CSS property used. You can disabled this option by providing `false`. When disabled, the property value will handle as a style object on it's own. It can be used for [rendering variants](#variants).
  - `options.themeKey` (*String* [optional]): The theme path prefix.
  - `options.transform` (*Function* [optional]): Apply a transformation before outputing a CSS value.

#### Returns

`style function`: The style function created.

#### 例

```js
import { style } from '@material-ui/system'

const borderColor = style({
  prop: 'bc',
  cssProperty: 'borderColor',
  themeKey: 'palette',
  transform: value => `${value} !important`,
});
```

### `compose(...style functions) => style function`

Merge multiple style functions into one.

#### Returns

`style function`: The style function created.

#### 例

```js
import { style, compose } from '@material-ui/system'

export const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

const palette = compose(textColor, bgcolor);
```

## Variants

The `style()` helper can also be used to maps properties to style objects in a theme. In this example, the `variant` property supports all the keys present in `theme.typography`.

{{"demo": "pages/system/basics/Variant.js", "defaultCodeOpen": true}}

## CSS property

If you want to support custom CSS values, you can use our `css()` helper. It will process the `css` property.

{{"demo": "pages/system/basics/CssProp.js", "defaultCodeOpen": true}}

## How it works

styled-system has done a great job at [explaining how it works](https://github.com/jxnblk/styled-system/blob/master/docs/how-it-works.md#how-it-works). It can help building a mental model for this "style function" concept.

## Real-world use case

In practice, a Box component can save you a lot of time. In this example, we demonstrate how to reproduce a Banner component.

{{"demo": "pages/system/basics/RealWorld.js"}}

## Prior art

`@material-ui/system` synthesizes ideas & APIs from several different sources:

- [Tachyons](https://tachyons.io/) was one of the first (2014) CSS libraries to promote the [Atomic CSS pattern](https://css-tricks.com/lets-define-exactly-atomic-css/) (or Functional CSS).
- Tachyons was later on (2017) followed by [Tailwind CSS](https://tailwindcss.com/). They have made Atomic CSS more popular.
- [Twitter Bootstrap](https://getbootstrap.com/docs/4.1/utilities/borders/) has slowly introduced atomic class names in v2, v3, and v4. We have used the way they group their "Helper classes" as inspiration.
- In the React world, [Styled System](https://github.com/jxnblk/styled-system) was one of the first (2017) to promote the style functions. It can be used as a generic Box component replacing the atomic CSS helpers as well as helpers to write new components.
- Large companies such as Pinterest, GitHub, and Segment.io are using the same approach in different flavours: 
  - [Evergreen Box](https://evergreen.segment.com/components/layout-primitives/)
  - [Gestalt Box](https://pinterest.github.io/gestalt/#/Box)
  - [Primer Box](https://primer.style/components/docs/Box)
- The actual implementation and the object responsive API was inspired by the [Smooth-UI's system](https://smooth-ui.smooth-code.com/docs-basics-system).