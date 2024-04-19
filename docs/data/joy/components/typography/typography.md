---
productId: joy-ui
title: React Typography component
components: Typography
githubLabel: 'component: Typography'
---

# Typography

<p class="description">The Typography component helps present design and content clearly and efficiently.</p>

## Introduction

The Typography component helps maintain a consistent design by providing a limited set of values to choose from and convenient props for building common designs faster.

{{"demo": "TypographyUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Typography from '@mui/joy/Typography';
```

The Typography component wraps around its content, and displays text with specific typographic styles and properties.

{{"demo": "TypographyBasics.js"}}

### Heading

Use `h1` through `h4` to render a headline. The produced HTML element will match the semantic [headings](https://www.w3.org/WAI/tutorials/page-structure/headings/) of the page structure.

{{"demo": "TypographyHeadline.js"}}

:::info
The `h5` and `h6` levels are not provided by default given that they are not commonly used. However, you can add them by [customizing the theme's typography](#typography-scale).
:::

### Title and body

Aside from the heading typographic levels, the Typography component also provides the `title-*` and `body-*` type levels.

To ensure proper information hierarchy, we recommend combining them using either the same size or a lower one. For example, using `title-lg` with `body-lg` or `title-md` with `body-sm`.

{{"demo": "TypographyTitleBody.js"}}

### Nested Typography

The Typography component renders as a `<p>` by default.
Nested Typography components are rendered as `<span>` elements (unless customized by [the `component` prop](#semantic-elements)).

{{"demo": "NestedTypography.js"}}

## Customization

### System props

As a CSS utility component, Typography supports every [MUI System](/system/properties/) property.
These properties can be used to customize the styling of the component and make it fit seamlessly with the overall design.

:::warning
Note that the `color` prop is an exception, it refers to the palette instead of the text color specifically. To set the text color, use the `textColor` prop.
:::

```jsx

// Using the neutral color palette that defaults to the 500 value
<Typography color="neutral" fontSize="sm" fontWeight="lg" />

// Changing the specific element's color to neutral
<Typography textColor="neutral.300" fontSize="sm" fontWeight="lg" >

```

### Levels

The `level` prop gives access to a pre-defined scale of typographic values defined in the theme.
These values include various heading levels (h1, h2, h3, etc.) as well as body text levels (body-md, body-sm, etc) and can be used to apply consistent typography throughout your application.
Additionally, you can also use the level prop to control the font size, weight, line height, and other typographic properties.

:::warning
Keep in mind that each level renders a specific HTML tag (for example "h1" renders as an `<h1>` element, "body-md" renders as a `<p>`, etc.)
:::

{{"demo": "TypographyScales.js"}}

### Semantic elements

To customize the semantic element used, you can use the `component` prop.
This can be useful in situations where you want to use a different semantic element than the one assigned by the `level` prop.
The component will render as the HTML element defined by `component`, but with the styles assigned to its respective `level`.

```jsx
// There's already an h1 on the page so let's not add another one.

<Typography level="h1" component="h2">
  I render as an h2, but I have h1 styles
</Typography>
```

In a more efficient way, you can change the HTML mapping tags at the theme level.

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
          'title-lg': 'p',
          'title-md': 'p',
          'title-sm': 'p',
          'body-md': 'p',
          'body-sm': 'p',
          'body-xs': 'span',
        },
      },
    },
  },
});
```

### Decorators

Use the `startDecorator` and `endDecorator` props to add supporting icons or elements to the Typography.

{{"demo": "TypographyDecorators.js"}}

### Typography scale

To create a custom typographic scale, you can define the keys and values in the `theme.typography` node at the theme level.

```js
extendTheme({
  typography: {
    subtitle: {
      fontSize: 'var(--joy-fontSize-lg)',
      fontWeight: 'var(--joy-fontWeight-md)',
      // CSS selectors are also supported!
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

You can also access the newly created levels from the `level` prop:

```js
<Typography level="subtitle">
<Typography level="label">
```

:::warning
When using TypeScript, make sure to add module augmentation for the new theme values.

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

#### Removing the default scale

To remove any unused typographic levels (for example, if you're building your own fully custom scale), you can clear the built-in values by assigning `undefined` to them in the theme.

```js
extendTheme({
  typography: {
    h1: undefined,
    h2: undefined,
    h3: undefined,
    h4: undefined,
    'title-lg': undefined,
    'title-md': undefined,
    'title-sm': undefined,
    'body-lg': undefined,
    'body-md': undefined,
    'body-sm': undefined,
    'body-xs': undefined,
    // ...your scale
  },
});
```

When using TypeScript, be sure to also remove the built-in typography tokens from the types.

```ts
// in your theme or index file
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    'title-lg': false;
    'title-md': false;
    'title-sm': false;
    'body-lg': false;
    'body-md': false;
    'body-sm': false;
    'body-xs': false;
  }
}
```

## Common examples

The demo below illustrates multiple uses of the Typography component with others as [decorators](#decorators).

{{"demo": "DecoratorExamples.js"}}

## Accessibility

Here are some factors to ensure that your Typography components are accessible:

- Ensure sufficient color contrast between text and background, using a minimum of [WCAG 2.0's color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) of 4.5:1.
- Use [relative units](/material-ui/customization/typography/#font-size) such as rem for `fontSize` to accommodate the user's settings.
- Use a consistent [heading hierarchy](https://www.w3.org/WAI/tutorials/page-structure/headings/), and avoid skipping levels.
- Keep semantics and style separate by using the appropriate semantic elements(#semantic-elements).

## Anatomy

The Typography component is composed of a single root `<p>` that's assigned the `body-md` class, unless these defaults are overridden by the [`level`](#levels) and/or [`component`](#semantic-elements) props.

When one Typography component is nested within another, the nested component renders as a `<span>` (unless customized as described above).

```html
<p class="MuiTypography-root MuiTypography-body-md">
  <!-- Typography content -->
  <span class="MuiTypography-root MuiTypography-inherit">
    <!-- Nested Typography content -->
  </span>
</p>
```
