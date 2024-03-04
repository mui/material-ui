# Usage

<p class="description">Learn the basics of working with Base UI components.</p>

## Responsive meta tag

Base UI is a _mobile-first_ component library—we write code for mobile devices first, and then scale up the components as necessary using CSS media queries.

To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your `<head>` element:

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

## Shared props

Base components are self-supporting and fully functional in isolation.

Each component has its own unique API, but all _non-utility_ components accept the following shared props:

### slots

The `slots` prop is an object that lets you override any interior subcomponents—known as **slots**—of the base component itself.

:::info
Each component contains a root slot, and other appropriate slots based on the nature of the component.
For example, the Base UI Badge contains two slots:

- `root`: the container element that wraps the children.
- `badge`: the badge element itself.

  :::

You can use the `slots` prop to override default slots with either custom components or HTML elements.

For example, the Base UI Badge component renders a `<span>` by default.
The code snippet below shows how to override this by assigning a `<div>` to the root slot:

```jsx
<Badge slots={{ root: 'div' }} />
```

### slotProps

The `slotProps` prop is an object that contains the props for all slots within a component.
You can use it to define additional custom props for a component's interior elements.

For example, the code snippet below shows how to add a custom CSS class to the badge slot of the Base UI Badge component:

```jsx
<Badge slotProps={{ badge: { className: 'my-badge' } }} />
```

All additional props placed on the primary component are also propagated into the root slot (just as if they were placed in `slotProps.root`).

These two examples are equivalent:

```jsx
<Badge id="badge1">
```

```jsx
<Badge slotProps={{ root: { id: 'badge1' } }}>
```

:::warning
If both `slotProps.root` and additional props have the same keys but different values, the `slotProps.root` props will take precedence.
This does not apply to classes or the `style` prop—they will be merged instead.
:::

### Best practices

If you are customizing a component like the [Button](/base-ui/react-button/) that only has a root slot, you may prefer to use the more succinct `component` prop instead of `slots`.

Overriding with `component` lets you apply the attributes of that element directly to the root.
For instance, if you replace the Button root with an `<li>` tag, you can add the `<li>` attribute `value` directly to the component.
If you did the same with `slots.root`, you would need to place this attribute on the `slotProps.root` object in order to avoid a TypeScript error.

## Components vs. hooks

Base UI includes two kinds of building blocks: **components** and **hooks**.

:::info
Hooks encapsulate _logic_; components provide _structure_.
:::

Many Base UI components are implemented with the help of [React hooks](https://react.dev/reference/react/hooks).
You can use components or hooks—or a combination of both—when building custom components.

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
