# Overriding component structure

<p class="description">Overriding component structure.</p>

## Shared props

Base components are self-supporting and fully functional in isolation.

Each component has its own unique API, but all _non-utility_ components accept the following shared props:

### slots

The `slots` prop is an object that lets you override any interior subcomponents—known as **slots**—of the base component itself.

:::info
Each component contains a root slot, and other appropriate slots based on the nature of the component.
For example, the Unstyled Badge contains two slots:

- `root`: the container element that wraps the children.
- `badge`: the badge element itself.
  :::

You can use the `slots` prop to override default slots with either custom components or HTML elements.

For example, the Unstyled Badge component renders a `<span>` by default.
The code snippet below shows how to override this by assigning a `<div>` to the root slot:

```jsx
<BadgeUnstyled slots={{ root: 'div' }} />
```

### component

The `component` prop provides a shortcut to `slots.root`.
This is useful if you are only overriding the root element of the component.

The code snippet below shows how to override the root element of the Unstyled Badge component using the `component` prop:

```jsx
<BadgeUnstyled component="div" />
```

:::warning
If the root slot is customized with both the `component` and `slots` props, then `component` will take precedence.
:::

### slotProps

The `slotProps` prop is an object that contains the props for all slots within a component.
You can use it to define additional custom props for a component's interior elements.

For example, the code snippet below shows how to add a custom CSS class to the badge slot of the Unstyled Badge component:

```jsx
<BadgeUnstyled slotProps={{ badge: { className: 'my-badge' } }} />
```

All additional props placed on the primary component are also propagated into the root slot (just as if they were placed in `slotProps.root`).

These two examples are equivalent:

```jsx
<BadgeUnstyled id="badge1">
```

```jsx
<BadgeUnstyled slotProps={{ root: { id: 'badge1' } }}>
```

:::warning
If both `slotProps.root` and additional props have the same keys but different values, the `slotProps.root` props will take precedence.
This does not apply to classes or the `style` prop—they will be merged instead.
:::

### Best practices

If you are customizing a component like the [Unstyled Button](/base/react-button/) that only has a root slot, you may prefer to use the more succinct `component` prop instead of `slots`.

Overriding with `component` lets you apply the attributes of that element directly to the root.
For instance, if you replace the Unstyled Button root with an `<li>` tag, you can add the `<li>` attribute `value` directly to the component.
If you did the same with `slots.root`, you would need to place this attribute on the `slotProps.root` object in order to avoid a TypeScript error.
