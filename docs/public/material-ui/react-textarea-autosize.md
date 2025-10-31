---
productId: material-ui
title: Textarea Autosize React component
components: TextareaAutosize
githubLabel: 'component: TextareaAutosize'
---

# Textarea Autosize

The Textarea Autosize component automatically adjusts its height to match the length of the content within.

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

## Introduction

Textarea Autosize is a utility component that replaces the native `<textarea>` HTML.
Its height automatically adjusts as a response to keyboard inputs and window resizing events.

By default, an empty Textarea Autosize component renders as a single row, as shown in the following demo:

```tsx
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function EmptyTextarea() {
  return (
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Empty"
      style={{ width: 200 }}
    />
  );
}
```

## Basics

### Import

```jsx
import TextareaAutosize from '@mui/material/TextareaAutosize';
```

### Minimum height

Use the `minRows` prop to define the minimum height of the component:

```tsx
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MinHeightTextarea() {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
    />
  );
}
```

### Maximum height

Use the `maxRows` prop to define the maximum height of the component:

```tsx
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MaxHeightTextarea() {
  return (
    <TextareaAutosize
      maxRows={4}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
      style={{ width: 200 }}
    />
  );
}
```

# TextareaAutosize API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Textarea Autosize](https://mui.com/material-ui/react-textarea-autosize/)

## Import

```jsx
import TextareaAutosize from '@mui/material/TextareaAutosize';
// or
import { TextareaAutosize } from '@mui/material';
```

## Props

| Name    | Type               | Default | Required | Description |
| ------- | ------------------ | ------- | -------- | ----------- |
| maxRows | `number \| string` | -       | No       |             |
| minRows | `number \| string` | `1`     | No       |             |

> **Note**: The `ref` is forwarded to the root element.

> Any other props supplied will be provided to the root element (native element).

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/TextareaAutosize/TextareaAutosize.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/TextareaAutosize/TextareaAutosize.tsx)
