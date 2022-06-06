---
product: joy-ui
title: React Typography component
components: Typography
githubLabel: 'component: Typography'
---

# Typography

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

## Level

Use `level` prop to change the scale of the text defined in `theme.typography`. The rendered html tag also changes based on the scale.

{{"demo": "TypographyScales.js"}}

### Change semantic element

- You can change the underlying element for a one-off situation with the `component` prop:

```jsx
{
  /* There is already an h1 in the page, let's not duplicate it. */
}
<Typography level="h1" component="h2">
  h1. Heading
</Typography>;
```

- You can change the mapping at the theme level:

```js
const theme = extendTheme({
  components: {
    JoyTypography: {
      defaultProps: {
        levelMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h3',
          h4: 'h3',
          h5: 'h3',
          h6: 'h3',
          body1: 'p',
          body2: 'span',
          body3: 'span',
        },
      },
    },
  },
});
```

### Add new typography

You can create your own scale at the theme level by defining keys and values to `theme.typography`:

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

Then, you will be able to use those levels from the `level` prop:

```js
<Typography level="subtitle">
<Typography level="label">
```

:::info
**TypeScript**: You need module augmentation to add those values to the theme:

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

If you want to start fresh with your own typography scale, provides `undefined` as a value to the built-in typography keys:

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
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    body1: false;
    body2: false;
    body3: false;
  }
}
```

## Decorators

Use `startDecorator` and/or `endDecorator` for adding extra info to the text. The typography uses flexbox if start or end decorator prop is provided to ensure the center alignment.

{{"demo": "TypographyDecorators.js"}}

### Common examples

These are some useful examples that demonstrate the composition of the typography and other components as decorators.

{{"demo": "DecoratorExamples.js"}}

## Nested typography

The nested typography will render as `<span>` by default unless the `component` prop is specified.

```js
<Typography>
  Paragraph by default.
  <Typography fontWeight="lg">I am a span</Typography> {/* render as <span> */}
  <Typography component="strong">but strong</Typography> {/* render as <strong> */}
</Typography>
```

## System props

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component.

```jsx
<Typography textColor="neutral.500" fontSize="sm" fontWeight="lg">
```

:::info
The `color` prop is an exception since it refers to the global variant palette. If you want to override the CSS color, use `textColor` prop instead.
:::

## Accessibility

A few key factors to follow for an accessible typography:

- **Color**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Font size**. Use [relative units (rem)](/material-ui/customization/typography/#font-size) to accommodate the user's settings.
- **Heading hierarchy**. [Don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels. In order to solve this problem, you need to [separate the semantics from the style](#changing-the-semantic-element).
