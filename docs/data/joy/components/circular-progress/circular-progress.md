---
product: joy-ui
title: React Circular Progress component
githubLabel: 'component: CircularProgress'
---

# Circular Progress

<p class="description">Circular Progress indicators, commonly known as spinners, express an unspecified wait time or display the length of a process.</p>

## Introduction

Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates.

- **Determinate** indicators display how long an operation will take.
- **Indeterminate** indicators visualize an unspecified wait time.

The animations of the components rely on CSS as much as possible to work even before the JavaScript is loaded.

{{"demo": "CircularProgressUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import CircularProgress from '@mui/joy/CircularProgress';

export default function MyApp() {
  return <CircularProgress />;
}
```

### Variants

The circular progress component supports the four global variants: `solid` (default), `soft`, `outlined` and `plain`.

{{"demo": "CircularProgressVariants.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors.

{{"demo": "CircularProgressColors.js"}}

### Sizes

The circular progress component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "CircularProgressSizes.js"}}
