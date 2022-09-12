---
product: base
title: Textarea Autosize React component
components: TextareaAutosize
githubLabel: 'component: TextareaAutosize'
---

# Textarea autosize

<p class="description">The TextareaAutosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.</p>

## Introduction

`TextareaAutosize` is a utility component that replaces the native `<textarea>` HTML element.

The height of the `TextareaAutosize` component automatically adjusts as a response to keyboard inputs and window resizing events.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function MyApp() {
  return <TextareaAutosize />;
}
```

### Basics

`TextareaAutosize` behaves similarly to the native HTML`<textarea>`.

By default, an empty `TextareaAutosize` component renders as a single row, as shown in the following demo:

{{"demo": "EmptyTextarea.js"}}

## Customization

### Minimum height

Use the `minRows` prop to define the minimum height of the component:

{{"demo": "MinHeightTextarea.js"}}

### Maximum height

Use the `maxRows` prop to define the maximum height of the component:

{{"demo": "MaxHeightTextarea.js"}}
