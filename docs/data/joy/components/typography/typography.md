---
product: joy-ui
title: React Typography component
githubLabel: 'component: Typography'
---

# Typography

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

## Levels

The `Typography` component has access to the typographic level scale defined in the theme.
Use the `level` prop to toggle between scale values.

Keep in mind that the rendered HTML tag will change depending on the scale (e.g. "h1" will render an `<h2>` element, whereas "body1" renders as `<p>`).

{{"demo": "TypographyScales.js"}}

### Change the semantic element

You can change the underlying element for an one-off situation with the `component` prop:

```jsx
{
  /* There is already an h1 in the page so let's not duplicate it. */
}
<Typography level="h1" component="h2">
  h1. Heading
</Typography>;
```

You can change the tag mapping at the theme level as well:

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

### Adding new typography

To create your own typographic scale at the theme level, define the keys and values to `theme.typography`;

```js
extendTheme({
  typography: {
    subtitle: {
      fontSize: 'var(--joy-fontSize-lg)',
      fontWeight: 'var(--joy-fontWeight-md)',
      // CSS selector is supported.
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

By doing that, you'll be able to use those levels from the `level` prop:

```js
<Typography level="subtitle">
<Typography level="label">
```

:::info
If using **TypeScript**, you need module augmentation to add those values to the theme:

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

### Remove built-in scale

If you want to start fresh with your own typographic scale, assign an `undefined` value to the built-in typography keys:

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

If you use **TypeScript**, you have to remove them from the types as well:

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

## Decorators

Use `startDecorator` and/or `endDecorator` for adding extra info to the text.
`Typography` uses flexbox when start or end decorator elements are provided to ensure the center alignment.

{{"demo": "TypographyDecorators.js"}}

### Common examples

These are examples that demonstrate the composition of the `Typography` component and other components as decorators.

{{"demo": "DecoratorExamples.js"}}

## Nested typography

Nested `Typography` components will render as a `<span>` tag by default, unless the a value for the `component` prop is specified.

```js
<Typography>
  Paragraph by default.
  <Typography fontWeight="lg">I am a span</Typography> {/* render as <span> */}
  <Typography component="strong">but strong</Typography> {/* render as <strong> */}
</Typography>
```

## System props

As a CSS utility component, `Typography` supports every [`system`](/system/properties/) properties.
You can use them as prop directly on the component.

```jsx
<Typography textColor="neutral.500" fontSize="sm" fontWeight="lg">
```

:::info
💡 The `color` prop is an exception.
It refers to the palette being used and not specifically the text color.
If you want to override that, use the `textColor` prop instead.
:::

## Accessibility

A few key factors to follow for an accessible typography:

- **Color**: provide enough contrast between text and background. Check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Font size**: use [relative units (rem)](/material-ui/customization/typography/#font-size) to accommodate the user's settings.
- **Heading hierarchy**: [don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels.
  In order to solve this problem, you need to [separate the semantics from the style](#changing-the-semantic-element).
