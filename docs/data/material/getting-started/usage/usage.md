# Usage

<p class="description">Learn the basics of working with Material UI components.</p>

## Getting started

The following code snippet demonstrates a simple app that uses the Material UI [Button](/material-ui/react-button/) component:

```jsx
import * as React from 'react';
import Button from '@mui/material/Button';

export default function MyApp() {
  return (
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}
```

You can play around with this code in the interactive Code Sandbox demo below.
Try changing the `variant` on the Button to `"outlined"` to see how the style changes:

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

## Shared props

Material UI components are self-supporting and fully functional in isolation.

Each component has its own unique API, but all _non-utility_ components accept the following shared props:

### components

The `components` prop is an object that lets you override any interior subcomponents—known as **slots**—of the base component itself.

:::info
Each component contains a root slot, and other appropriate slots based on the nature of the component.
For example, the [Badge](/material-ui/react-badge/) component contains two slots:

- `root`: the container element that wraps the children.
- `badge`: the badge element itself.
  :::

You can use the `components` prop to override default slots with either custom components or HTML elements.

For example, the Badge root renders a `<span>` by default.
The code snippet below shows how to override this by assigning a `<div>` to the root slot:

```jsx
<Badge components={{ Root: 'div' }} />
```

### component

The (singular) `component` prop provides a shortcut to `components.Root`.
This is useful if you are only overriding the root element of the component.

The code snippet below shows how to override the root element of the Badge component using the `component` prop:

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

If you are customizing a component like [Button](/material-ui/react-button/) that only has a root slot, you may prefer to use the more succinct `component` prop instead of `components`.

Overriding with `component` lets you apply the attributes of that element directly to the root.
For instance, if you replace the Button's root with an `<li>` tag, you can add the `<li>` attribute `value` directly to the component.
If you did the same with `components.Root`, you would need to place this attribute on the `componentsProps.root` object in order to avoid a TypeScript error.

## Globals

Since Material UI components are built to function in isolation, they don't require any kind of globally scoped styles.

For a better user experience and developer experience, we recommend adding the following globals to your app.

### Responsive meta tag

Material UI is a _mobile-first_ component library—we write code for mobile devices first, and then scale up the components as necessary using CSS media queries.

To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element:

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

### CssBaseline

Material UI provides an optional [CssBaseline](/material-ui/react-css-baseline/) component.
It fixes some inconsistencies across browsers and devices while providing resets that are better tailored to fit Material UI than alternative global style sheets like [normalize.css](https://github.com/necolas/normalize.css/).
