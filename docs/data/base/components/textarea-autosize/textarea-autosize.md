---
product: base
title: Textarea Autosize React component
components: TextareaAutosize
githubLabel: 'component: TextareaAutosize'
---

# Textarea Autosize

<p class="description">The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Textarea Autosize is a utility component that replaces the native `<textarea>` HTML.

The height of the Textarea Autosize component automatically adjusts as a response to keyboard inputs and window resizing events.

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

Textarea Autosize behaves similarly to the native HTML`<textarea>`.

By default, an empty Textarea Autosize component renders as a single row, as shown in the following demo:

{{"demo": "EmptyTextarea.js"}}

## Customization

### Minimum height

Use the `minRows` prop to define the minimum height of the component:

{{"demo": "MinHeightTextarea.js"}}

### Maximum height

Use the `maxRows` prop to define the maximum height of the component:

{{"demo": "MaxHeightTextarea.js"}}
