---
productId: joy-ui
title: React Tooltip component
components: Tooltip
githubLabel: 'component: tooltip'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
---

# Tooltip

<p class="description">Tooltips display informative text when users hover over, focus on, or tap an element.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

{{"demo": "TooltipUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Tooltip from '@mui/joy/Tooltip';

export default function MyApp() {
  return <Tooltip />;
}
```

### Variants

The tooltip component supports the four global variants: `solid` (default), `soft`, `outlined` and `plain`.

{{"demo": "TooltipVariants.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors with different variants.

{{"demo": "TooltipColors.js"}}

### Sizes

The tooltip component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "TooltipSizes.js"}}

## Positioned tooltips

The `Tooltip` has 12 **placement** choices.
They don't have directional arrows; instead, they rely on motion emanating from the source to convey direction.

{{"demo": "PositionedTooltips.js"}}

## Arrow tooltips

You can use the `arrow` prop to give your tooltip an arrow indicating which element it refers to.

{{"demo": "ArrowTooltips.js"}}

## Common examples

### GitHub tooltip

The `title` prop can receive a custom React element.

{{"demo": "GitHubTooltip.js"}}

## Accessibility

Here are a few tips for ensuring an accessible link component, based on [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/):

By default, the tooltip only labels its child element.
This is notably different from `title` which can either label **or** describe its child depending on whether the child already has a label.
For example, in:

```html
<button title="some more information">A button</button>
```

the `title` acts as an accessible description.
If you want the tooltip to act as an accessible description you can pass `describeChild`.
Note that you shouldn't use `describeChild` if the tooltip provides the only visual label. Otherwise, the child would have no accessible name and the tooltip would violate [success criterion 2.5.3 in WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html).

{{"demo": "AccessibilityTooltip.js"}}
