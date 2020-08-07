---
components: Typography
---

# Typography

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

Too many type sizes and styles at once can spoil any layout.
A [typographic scale](https://material.io/design/typography/#type-scale) has a limited set of type sizes that work well together along with the layout grid.

## General

The *Roboto* font will **not** be automatically loaded by Material-UI.
The developer is responsible for loading all fonts used in their application.
Roboto Font has a few easy ways to get started. For more advanced configuration, check out
[the theme customization section](/customization/typography/).

## Roboto Font CDN

Shown below is a sample link markup used to load the Roboto font from a CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Install with npm

You can [install it](https://www.npmjs.com/package/fontsource-roboto) by typing the below command in your terminal:

`npm install fontsource-roboto`

Then, you can import it in your entry-point.

```js
import 'fontsource-roboto';
```

For more info check out [Fontsource](https://github.com/DecliningLotus/fontsource/blob/master/packages/roboto/README.md).

⚠️ Be careful when using this approach.
Make sure your bundler doesn't eager load all the font variations (100/300/400/500/700/900, italic/regular, SVG/woff). Fontsource can be configured to load specific subsets, weights and styles.
Inlining all the font files can significantly increase the size of your bundle.
Material-UI default typography configuration only relies on 300, 400, 500, and 700 font weights.

## Component

{{"demo": "pages/components/typography/Types.js"}}

## Theme

In some situations you might not be able to use the `Typography` component.
Hopefully, you might be able to take advantage of the [`typography`](/customization/default-theme/?expand-path=$.typography) keys of the theme.

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Changing the semantic element

The Typography component uses the `variantMapping` property to associate a UI variant with a semantic element.
It’s important to realize that the style of a typography is independent from the semantic underlying element.

- You can change the underlying element for a one time occasion with the `component` property:

```jsx
{/* There is already an h1 in the page, let's not duplicate it. */}
<Typography variant="h1" component="h2">
  h1. Heading
</Typography>
```

- You can change the mapping [globally using the theme](/customization/globals/#default-props):

```js
const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});
```

## Accessibility

A few key factors to follow for an accessible typography:

- **Color**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Font size**. Use [relative units (rem)](/customization/typography/#font-size) to accommodate the user's settings.
- **Heading hierarchy**. [Don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels. In order to solve this problem, you need to [separate the semantics from the style](#changing-the-semantic-element).
