# Overriding component structure

<p class="description">Learn how to override the default DOM structure of Joy UI components.</p>

Joy UI components are designed to suit the widest possible range of use cases, but you may occasionally need to change how a component's structure is rendered in the DOM.

To understand how to do this, it helps to have an accurate mental model of MUI components.

## The mental model

A component's structure is determined by the elements that fill that component's **slots**.
Slots are most commonly filled by HTML tags, but may also be filled by React components.

All components contain a root slot that defines their primary node in the DOM tree; more complex components also contain additional interior slots named after the elements they represent.

All _non-utility_ Joy UI components accept two props for overriding their rendered HTML structure:

- `component`—to override the root slot
- `slots`—to override any interior slots (when present) as well as the root

Additionally, you can pass custom props to interior slots using `slotProps`.

## The root slot

The root slot represents the component's outermost element.
For simpler components, the root slot is often filled by the native HTML element that the component is intended to replace.

For example, the [Button's](/joy-ui/react-button/) root slot is a `<button>` element.
This component _only_ has a root slot; more complex components may have additional [interior slots](#interior-slots).

### The component prop

Use the `component` prop to override a component's root slot.
The demo below shows how to replace the Button's `<button>` tag with a `<div>`:

{{"demo": "OverridingRootSlot.js"}}

:::info
If you provide a non-interactive element like a `<div>` or a `<span>`, the Button will automatically add the necessary accessibility attributes.
Try inspecting the demo Button above in your browser's dev tools to see this feature in action.
:::

## Interior slots

Complex components are composed of one or more interior slots in addition to the root.
These slots are often (but not necessarily) nested within the root.

For example, the [Slider](/joy-ui/react-slider/) is composed of a root `<span>` that houses several interior slots named for the elements they represent: track, thumb, rail, and so on.

### The slots prop

Use the `slots` prop to override a component's interior slots.
The example below shows how to override the listbox slot in the [Select](/joy-ui/react-select/) component—a `<ul>` by default—with an `<ol>`:

{{"demo": "OverridingInternalSlot.js"}}

Note that you can also use the `slots` prop to override the root slot:

```jsx
// This:
<Select slots={{ Root: 'span' }} />

// ...is the same as this:
<Select slots="span">
```

But if you try to override the root slot with both `component` and `slots`, then `component` will take precedence:

```jsx
// This:
<Select component="div" slots={{ root: 'span' }} />

// ...renders as this:
<div class="MuiSelectUnstyled-root" />
```

### The slotProps prop

The `slotProps` prop is an object that contains the props for all slots within a component.
You can use it to define additional custom props to pass to a component's interior slots.

For example, the code snippet below shows how to add a custom CSS class to the badge slot of the [Badge](/joy-ui/react-badge/) component:

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

## Best practices

If you are customizing a simpler component like the Unstyled Button that only has a root slot, you may prefer to use the more succinct `component` prop instead of `slots`.

Overriding with `component` lets you apply the attributes of that element directly to the root.
For instance, if you replace the Unstyled Button root with an `<li>` tag, you can add the `<li>` attribute `value` directly to the component.
If you did the same with `slots.root`, you would need to place this attribute on the `slotProps.root` object in order to avoid a TypeScript error.

Be mindful of your rendered DOM structure when overriding the slots of more complex components.
You can easily break the rules of semantic and accessible HTML if you deviate too far from the default structure—for instance, by unintentionally nesting block-level elements inside of inline elements.
Joy UI components automatically correct semantically incorrect HTML—see [Automatic adjustment](/joy-ui/main-features/automatic-adjustment/) for details.
