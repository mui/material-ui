---
product: joy-ui
title: React Alert component
---

# Alert

<p class="description">An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.</p>

## Introduction

{{"demo": "AlertUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Alert from '@mui/joy/Alert';

export default function MyApp() {
  return <Alert />;
}
```

### Variants

The alert component supports the four global variants: `solid` (default), `soft`, `outlined` and `plain`.

{{"demo": "AlertVariants.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors with different variants.

{{"demo": "AlertColors.js"}}

### With icons

You can add an icon as a decorator via the `icon` prop.

{{"demo": "AlertIcons.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
