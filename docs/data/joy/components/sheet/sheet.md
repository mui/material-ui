---
productId: joy-ui
title: React Sheet component
components: Sheet
---

# Sheet

<p class="description">Sheet is a generic container that supports Joy UI's global variants.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

The `Sheet` container is a generic container.
It's a sibling to the [`Box`](/system/react-box/) component, and equivalent to Material UI's [`Paper`](/material-ui/react-paper/), with the difference being that it supports Joy UI's global variants out of the box.

{{"demo": "SheetUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Sheet from '@mui/joy/Sheet';

export default function MyApp() {
  return <Sheet>Holy sheet!</Sheet>;
}
```

### Basic usage

The `Sheet` component, in addition to the variants, also has access to the `color` prop, allowing you to use every palette of the theme.

{{"demo": "SimpleSheet.js"}}
