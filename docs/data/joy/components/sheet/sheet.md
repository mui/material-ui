---
product: joy-ui
title: React Sheet component
---

# Sheet

<p class="description">Sheet is a useful surface component that implements the global variant feature.</p>

## Introduction

The `Sheet` container is a generic container.
It's a sibling to the `Box` component with the difference being that it supports Joy UI's global variants out of the box.

{{"demo": "SheetUsage.js", "hideToolbar": true, "bg": true}}

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Sheet from '@mui/joy/Sheet';

export default function MyApp() {
  return <Sheet>Holy sheet!</Sheet>;
}
```

### Basic usage

The `Sheet` also has access to the `color` prop, allowing you to access every palette of the theme.

Use the `Sheet` component as a generic container for your components.
You can play around with variants, color, and elevation to achieve the desired result.

{{"demo": "SimpleSheet.js"}}
