# Usage

<p class="description">Learn the basics of working with MUI Base components.</p>

## Getting started

The following code snippet demonstrates a simple app that uses the MUI Base[Button](/base/react-button/) component:

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

## Shared props

Base components are self-supporting and fully functional in isolation.

Each component has its own unique API, but all _non-utility_ components accept the following shared props:

### components

The `components` prop is an object that lets you override any interior subcomponents—known as **slots**—of the base component itself.

:::info
Each component contains a root slot, and other appropriate slots based on the nature of the component.
For example, the Unstyled Badge contains two slots:

- `root`: the container element that wraps the children.
- `badge`: the badge element itself.
  :::

You can use the `components` prop to override default slots with either custom components or HTML elements.

For example, the [Unstyled Badge](/base/react-badge/) component renders a `<span>` by default.
The code snippet below shows how to override this by assigning a `<div>` to the root slot:

```jsx
<BadgeUnstyled components={{ Root: 'div' }} />
```

### component

The (singular) `component` prop provides a shortcut to `components.Root`.
This is useful if you are only overriding the root element of the component.

The code snippet below shows how to override the root element of the [Unstyled Badge](/base/react-badge/) component using the `component` prop:

```jsx
<BadgeUnstyled component="div" />
```

:::warning
If the root slot is customized with both the `component` and `components` props, then `component` will take precedence.
:::

### componentsProps

The `componentsProps` prop is an object that contains the props for all slots within a component.
You can use it to define additional custom props for a component's interior elements.

For example, the code snippet below shows how to add a custom CSS class to the badge slot of the Unstyled Badge component:

```jsx
<BadgeUnstyled componentsProps={{ badge: { className: 'my-badge' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

All additional props placed on the primary component are also propagated into the root slot (just as if they were placed in `componentsProps.root`).

These two examples are equivalent:

```jsx
<BadgeUnstyled id="badge1">
```

```jsx
<BadgeUnstyled componentsProps={{ root: { id: 'badge1' } }}>
```

:::warning
If both `componentsProps.root` and additional props have the same keys but different values, the `componentsProps.root` props will take precedence.
This does not apply to classes or the `style` prop—they will be merged instead.
:::

### Best practices

If you are customizing a component like [Unstyled Button](/base/react-button/) that only has a root slot, you may prefer to use the more succinct `component` prop instead of `components`.

Overriding with `component` lets you apply the attributes of that element directly to the root.
For instance, if you replace the Unstyled Button's root with an `<li>` tag, you can add the `<li>` attribute `value` directly to the component.
If you did the same with `components.Root`, you would need to place this attribute on the `componentsProps.root` object in order to avoid a TypeScript error.

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
