---
productId: material-ui
title: Textarea Autosize React component
components: TextareaAutosize
githubLabel: 'component: TextareaAutosize'
---

# Textarea Autosize

<p class="description">The Textarea Autosize component automatically adjusts its height to match the length of the content within.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader", "design": false}}

## Introduction

Textarea Autosize is a utility component that replaces the native `<textarea>` HTML.
Its height automatically adjusts as a response to keyboard inputs and window resizing events.

By default, an empty Textarea Autosize component renders as a single row, as shown in the following demo:

{{"component": "../data/material/components/textarea-autosize/demos/empty-textarea/index.ts", "defaultCodeOpen": false}}

## Basics

### Import

```jsx
import TextareaAutosize from '@mui/material/TextareaAutosize';
```

### Minimum height

Use the `minRows` prop to define the minimum height of the component:

{{"component": "../data/material/components/textarea-autosize/demos/min-height-textarea/index.ts"}}

### Maximum height

Use the `maxRows` prop to define the maximum height of the component:

{{"component": "../data/material/components/textarea-autosize/demos/max-height-textarea/index.ts"}}
