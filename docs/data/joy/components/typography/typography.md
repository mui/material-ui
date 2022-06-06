---
product: joy-ui
title: React Typography component
components: Typography
githubLabel: 'component: Typography'
---

# Typography

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

## System props

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component.
For instance, a margin-top:

```jsx
<Typography mt={2}>
```

## Accessibility

A few key factors to follow for an accessible typography:

- **Color**. Provide enough contrast between text and its background, check out the minimum recommended [WCAG 2.0 color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Font size**. Use [relative units (rem)](/material-ui/customization/typography/#font-size) to accommodate the user's settings.
- **Heading hierarchy**. [Don't skip](https://www.w3.org/WAI/tutorials/page-structure/headings/) heading levels. In order to solve this problem, you need to [separate the semantics from the style](#changing-the-semantic-element).
