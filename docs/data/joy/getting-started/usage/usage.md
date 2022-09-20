# Usage

<p class="description">Learn the basics of using Joy UI components.</p>

## Getting started

<<<<<<< HEAD
The following code snippet demonstrates a simple app that uses the Joy UI [Button](/joy-ui/react-button/) component:
=======
### Set up the `CssVarsProvider` component

Go to your `App.js` file and replace it with the code snippet below.

You should see the text `Hello from Joy` being rendered on your browser.
>>>>>>> master

```jsx
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

export default function App() {
  return (
    <CssVarsProvider>
      <Button>Hello World</Button>
    </CssVarsProvider>
  );
}
```

### CssVarsProvider

In the example above, you can see that the Button component is nested within `<CssVarsProvider />`.
This is not required, but it unlocks a whole host of customization options powered by CSS variables.
See [Using CSS variables](/joy-ui/customization/using-css-variables/) for more details.

## Shared props

Joy UI components are self-supporting and fully functional in isolation.

Each component has its own unique API, but all components accept the following shared props:

### components

The `components` prop is an object that lets you override any interior subcomponents—known as **slots**—of the base component itself.

:::info
Each component contains a root slot, and other appropriate slots based on the nature of the component.
For example, the Badge component contains two slots:

- `root`: the container element that wraps the children.
- `badge`: the badge element itself.
  :::

You can use the `components` prop to override default slots with either custom components or HTML elements.

For example, the [Badge](/joy-ui/react-badge/) component renders a `<span>` by default.
The code snippet below shows how to override this by assigning a `<div>` to the root slot:

```jsx
<Badge components={{ Root: 'div' }} />
```

### component

The (singular) `component` prop provides a shortcut to `components.Root`.
This is useful if you are only overriding the root element of the component.

The code snippet below shows how to override the root element of the [Badge](/joy-ui/react-badge/) component using the `component` prop:

```jsx
<Badge component="div" />
```

:::warning
If the root slot is customized with both the `component` and `components` props, then `component` will take precedence.
:::

### componentsProps

The `componentsProps` prop is an object that contains the props for all slots within a component.
You can use it to define additional custom props for a component's interior elements.

For example, the code snippet below shows how to add a custom CSS class to the badge slot of the Badge component:

```jsx
<Badge componentsProps={{ badge: { className: 'my-badge' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

All additional props placed on the primary component are also propagated into the root slot (just as if they were placed in `componentsProps.root`).

These two examples are equivalent:

```jsx
<Badge id="badge1">
```

```jsx
<Badge componentsProps={{ root: { id: 'badge1' } }}>
```

:::warning
If both `componentsProps.root` and additional props have the same keys but different values, the `componentsProps.root` props will take precedence.
This does not apply to classes or the `style` prop—they will be merged instead.
:::

### Best practices

If you are customizing a component like the [Button](/joy-ui/react-button/) that only has a root slot, you may prefer to use the more succinct `component` prop instead of `components`.

Overriding with `component` lets you apply the attributes of that element directly to the root.
For instance, if you replace the Button root with an `<li>` tag, you can add the `<li>` attribute `value` directly to the component.
If you did the same with `components.Root`, you would need to place this attribute on the `componentsProps.root` object in order to avoid a TypeScript error.
