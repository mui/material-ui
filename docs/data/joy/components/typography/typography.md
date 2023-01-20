---
product: joy-ui
title: React Typography component
githubLabel: 'component: Typography'
---

# Typography

<p class="description">The Typography component helps present design and content clearly and efficiently.</p>

## Introduction

The Typography component helps maintain a consistent design by providing a limited set of values to choose from and convenient props for building common designs faster.

## Basics

```jsx
import Typography from '@mui/joy/Typography';
```

The Typography component wraps around its content, and displays text with specific typographic styles and properties.

{{"demo": "TypographyBasics.js"}}

## Customization

### System props

As a CSS utility component, Typography supports every [MUI System](/system/properties/) property.
These properties can be used to customize the styling of the component and make it fit seamlessly with the overall design.

:::warning
Note that the `color` prop is an exception, it refers to the palette instead of the text color specifically. To set the text color, use the `textColor` prop.
:::

```jsx
<Typography textColor="neutral.500" fontSize="sm" fontWeight="lg">
```

### Levels

The `level` prop gives access to a pre-defined scale of typographic values defined in the theme.
These values include various heading levels (h1, h2, h3, etc.) as well as body text levels (body1, body2, etc) and can be used to apply consistent typography throughout your application.
Additionally, you can also use the level prop to control the font size, weight, line height, and other typographic properties.

:::warning
Keep in mind that each level renders a specific HTML tag (e.g. "h1" renders as an `<h1>` element, "body1" renders as a `<p>`, etc.)
:::

{{"demo": "TypographyScales.js"}}

### Semantic elements

To customize the semantic element used, you can use the `component` prop.
This can be useful in situations where you want to use a different semantic element than the one that was assigned by the `level` prop.
The content will be rendered as the desired semantic element, which can improve accessibility, SEO, consistency, readability and reusability of the webpage.

```jsx
{
  /* There's already an h1 on the page so let's not add another one. */
}
<Typography level="h1" component="h2">
  h1. Heading
</Typography>;
```

In a more efficient way, you can change the HTML mapping tags at the theme level.

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

### Nested Typography

Nested Typography components will be rendered as a `<span>` element by default, unless a custom semantic element is specified using the `component` prop in each component.

```js
<Typography>
  Paragraph by default.
  <Typography fontWeight="lg">I am a span</Typography> {/* render as <span> */}
  <Typography component="strong">but strong</Typography> {/* render as <strong> */}
</Typography>
```

{{"demo": "NestedTypography.js"}}

### Decorators

Use the `startDecorator` and `endDecorator` props to add supporting icons or elements to the typography.

{{"demo": "TypographyDecorators.js"}}

## Typography scale

To create a custom typographic scale, you can define the keys and values in the `theme.typography` node at the theme level.

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

:::warning
When using _TypeScript_, make sure to add module augmentation for the new theme values.

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

### Removing the scale

In order to establish a customized scale, you can clear the built-in values by assigning `undefined` to them in the theme.

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

When using TypeScript, be sure to also remove the built-in typography tokens from the types.

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

Here are some factors to ensure that your Typography components are accessible:

- Ensure sufficient color contrast between text and background, using a minimum of [WCAG 2.0's color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) of 4.5:1.
- Use [relative units](/material-ui/customization/typography/#font-size) such as rem for `fontSize` to accommodate the user's settings.
- Use a consistent [heading hierarchy](https://www.w3.org/WAI/tutorials/page-structure/headings/), and avoid skipping levels.
- Keep semantics and style separate by using the appropriate semantic elements(#semantic-elements).

## Common examples

Examples showcasing how to compose designs with the Typography component and others as decorators.

{{"demo": "DecoratorExamples.js"}}

## Anatomy

The Typography component is composed of a semantic element, as defined by the `level` prop, which serves as the root element and wraps around the content:

```html
<h1 class="JoyTypography-root JoyTypography-h1"><--- Text ---></h1>
<p class="JoyTopography-root JoyTopography-body1"><--- Text ---></p>
<span class="JoyTopography-root JoyTopography-body3"><--- Text ---></span>
```

:::info
By default, Typography components are rendered as `<p>` element. However, if a [nested element](#nested-typography) is used, it will be rendered as a `<span>`.
:::

```js
<Typography>Hello world.</Typography>
```

```html
<p>Hello world.</p>
```
