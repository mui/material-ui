# Usage

<p class="description">Learn the basics of working with MUI Base components.</p>

## Quickstart

The following code snippet demonstrates a simple app that uses the MUI Base [Button](/base/react-button/) component:

```jsx
import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

export default function MyApp() {
  return (
    <div>
      <ButtonUnstyled>Hello World</ButtonUnstyled>
    </div>
  );
}
```

You can play around with this code in the interactive Code Sandbox demo below.
Try importing an [Unstyled Input](/base/react-input/) component and adding it to the `<div>`:

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

## Components vs. hooks

MUI Base includes two kinds of building blocks: **components** and **hooks**.

:::info
💡 Hooks encapsulate _logic_; components provide _structure_.
:::

Many Base components are implemented with the help of hooks.
(Visit the [React documentation on hooks](https://reactjs.org/docs/hooks-intro.html) to get up to speed on this concept.)

You can use components or hooks—or a combination thereof—when building custom components.

In general, we recommend that you begin building with the component, and if you find that you are too limited by the customization options available, then consider refactoring your component to use the corresponding hook instead.

Each option has its own trade-offs:

### Components

#### Pros

- Usually require less code to implement
- Equipped with accessibility features by default

#### Cons

- Less control over the structure of the rendered HTML

### Hooks

#### Pros

- Complete control over rendered HTML structure

#### Cons

- Usually require more code to implement
- Extra steps necessary to make the resulting component accessible

Details on usage of hooks can be found in their corresponding component docs.
