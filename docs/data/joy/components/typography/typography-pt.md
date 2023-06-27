---
product: joy-ui
title: React Typography component
components: Typography
githubLabel: 'component: Typography'
---

# Typography

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

## Introduction

The `Typography` component helps you maintain a consistent design by offering a limited set of values to choose while also providing a few convenient props that makes common designs faster to build. Joy UI's uses [_Public Sans_](https://fonts.google.com/specimen/Public+Sans?query=public), a Google Font, as the default typeface.

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Typography from '@mui/joy/Typography';

export default function MyApp() {
  return <Typography>Hello world!</Typography>;
}
```

### System props

As a CSS utility component, `Typography` supports every [`system`](/system/properties/) properties.

```jsx
<Typography textColor="neutral.500" fontSize="sm" fontWeight="lg">
```

:::info
💡 **Tip:** The `color` prop is an exception, though! It actually refers to the palette being used and not specifically the text color. To override that instead, use the `textColor` prop.
:::

### Changing the semantic element

To control which HTML tag should be rendered in a given, one-off, situation, use the `component` prop.

```jsx
{
  /* There is already an h1 in the page so let's not duplicate it. */
}
<Typography level="h1" component="h2">
  h1. Heading
</Typography>;
```

To control this in a much more efficient way, change the HTML mapping tags at the theme level.

```js
const theme = extendTheme({
  components: {
    JoyTypography: {
      defaultProps: {
        levelMapping: {
          display1: 'h1',
          display2: 'h1',
          h1: 'h2',
          h2: 'h2',
          h3: 'h3',
          h4: 'h3',
          h5: 'h3',
          h6: 'h3',
          body1: 'p',
          body2: 'span',
          body3: 'span',
          body4: 'span',
          body5: 'span',
        },
      },
    },
  },
});
```

### Levels

The `Typography` component has access to the typographic level scale defined in the theme. Use the `level` prop to control the scale value.

:::info
**Keep in mind:** each level renders a specific HTML tag (e.g. "h1" renders as an `<h1>` element, "body1" renders as a `<p>`, etc.)
:::

{{"demo": "TypographyScales.js"}}

### Decorators

Use the `startDecorator` and/or `endDecorator` props to add supporting icons or elements to the typography.

{{"demo": "TypographyDecorators.js"}}

### Nested typography

Nested `Typography` components will render as a `<span>` tag by default, unless a value for the `component` prop in each component is specified.

```js
<Typography>
  Paragraph by default.
  <Typography fontWeight="lg">I am a span</Typography> {/* render as <span> */}
  <Typography component="strong">but strong</Typography> {/* render as <strong> */}
</Typography>
```

{{"demo": "NestedTypography.js"}}

## Create a new scale

To create your own typographic scale at the theme level, define the keys and values to `theme.typography` node.

```js
extendTheme({
  typography: {
    subtitle: {
      fontSize: 'var(--joy-fontSize-lg)',
      fontWeight: 'var(--joy-fontWeight-md)',
      // CSS selector is also supported!
      '& + p': {
        marginTop: '4px',
      },
    },
    label: {
      fontSize: 'var(--joy-fontSize-sm)',
      fontWeight: 'var(--joy-fontWeight-lg)',
      lineHeight: 'var(--joy-lineHeight-lg)',
      marginBottom: '3px',
    },
  },
});
```

You can also access the newly created levels from the `level` prop.

```js
<Typography level="subtitle">
<Typography level="label">
```

:::info
**Tip:** When using _TypeScript_, make sure to add module augmentation for the new theme values.

```ts
// in your theme or index file
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    subtitle: true;
    label: true;
  }
}
```

:::

## Remove the built-in scale

To start fresh with your own typographic scale, assign an `undefined` value to the built-in typography tokens in the theme.

```js
extendTheme({
  typography: {
    h1: undefined,
    h2: undefined,
    h3: undefined,
    h4: undefined,
    h5: undefined,
    h6: undefined,
    body1: undefined,
    body2: undefined,
    body3: undefined,
    // ...your scale
  },
});
```

Make sure to remove them from the types as well if using **TypeScript**.

```ts
// in your theme or index file
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    display1: false;
    display2: false;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    body1: false;
    body2: false;
    body3: false;
    body4: false;
    body5: false;
  }
}
```

## Accessibility

Here are a few tips to make sure you have an accessible typography component:

- **Color contrast**: always provide enough contrast between text and background. The minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) is 4.5:1.
- **Dynamic units**: use [relative units (rem)](/material-ui/customization/typography/#font-size) for `fontSize` to accommodate the user's settings.
- **Heading hierarchy**: [don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels. Remember to [separate the semantics from the style](#changing-the-semantic-element).

## Common examples

Examples showcasing how to compose designs with the `Typography` component and others as decorators.

{{"demo": "DecoratorExamples.js"}}
