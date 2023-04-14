# Usage

<p class="description">Learn the basics of working with Base UI components.</p>

## Getting started

The following code snippet demonstrates a simple app that uses the Base UI [`ButtonUnstyled`](/base/react-button/) component:

```jsx
import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

function App() {
  return (
    <div>
      <ButtonUnstyled>Hello World</ButtonUnstyled>
    </div>
  );
}
```

You can play around with this code in the interactive Code Sandbox demo below. Try importing an `InputUnstyled` component and adding it to the `<div>`:

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

## Shared props

Base components are self-supporting and fully functional in isolation.

Each component has its own unique API, but all components accept the following shared props:

### components

The `components` prop is an object that lets you override any interior subcomponents ("slots") of the base component itself.

:::info
Each component contains a `Root` slot, and many complex components (such as [`BadgeUnstyled`](/base/react-badge/)) are composed of additional subcomponents that can be customized.
:::

You can use the `components` prop to replace subcomponents with either custom components or HTML elements.

For example, the [`BadgeUnstyled`](/base/react-badge/) component renders a `<span>` by default. The code snippet below shows how to override this by assigning a `<div>` to the `Root` element:

```jsx
<BadgeUnstyled components={{ Root: 'div' }} />
```

### component

The (singular) `component` prop provides a shortcut to `components.Root`. This is useful if you are only overriding the `Root` element of the component.

The code snippet below shows how to override the `Root` element of the [`BadgeUnstyled`](/base/react-badge/) component using the `component` prop:

```jsx
<BadgeUnstyled component="div" />
```

:::warning
**Note**: if both `components.Root` and `component` are specified, `component` takes precedence.
:::

### componentsProps

The `componentsProps` prop is an object that contains the props for all slots within a component. You can use it to define additional custom props for a component's interior elements.

For example, the code snippet below shows how to add a custom CSS class to the `badge` slot of the `BadgeUnstyled` component:

```jsx
<BadgeUnstyled componentsProps={{ badge: { className: 'my-badge' } }} />
```

All additional props placed on the primary component are also propagated into the `Root` slot (just as if they were placed in `componentsProps.root`).

These two examples are equivalent:

```jsx
<BadgeUnstyled id="badge1">
```

```jsx
<BadgeUnstyled componentsProps={{ root: { id: 'badge1' } }}>
```

:::warning
If both `componentsProps.root` and additional props have the same keys but different values, the `componentsProps.root` props will take precedence. This does not apply to classes and the `style` prop (they will be merged instead).
:::

## Components vs. hooks

Base UI includes two kinds of building blocks: **components** and **hooks**.

:::info
💡 Hooks encapsulate _logic_; components provide _structure_.
:::

Many Base components are implemented with the help of hooks. (Visit the [React documentation on hooks](https://legacy.reactjs.org/docs/hooks-intro.html) to get up to speed on this concept.)

You can use components or hooks—or a combination thereof—when building custom components. Each option has its own trade-offs:

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
