# Overriding component structure

<p class="description">Learn how to override the default DOM structure of Base UI components.</p>

Base UI components are designed to suit the widest possible range of use cases, but you may occasionally need to change how a component's structure is rendered in the DOM.

To understand how to do this, it helps to have an accurate mental model of the components.

## The mental model

A component's structure is determined by the elements that fill that component's **slots**.
Slots are most commonly filled by HTML tags, but may also be filled by React components.

All components contain a root slot that defines their primary node in the DOM tree; more complex components also contain additional interior slots named after the elements they represent.

All _non-utility_ Base UI components accept [the `slots` prop](#the-slots-prop) for overriding their rendered HTML structure.

Additionally, you can pass custom props to [interior slots](#interior-slots) using `slotProps`.

## The root slot

The root slot represents the component's outermost element.
For simpler components, the root slot is often filled by the native HTML element that the component is intended to replace.

For example, the [Button's](/base-ui/react-button/) root slot is a `<button>` element.
This component _only_ has a root slot; more complex components may have additional interior slots.

## Interior slots

Complex components are composed of one or more interior slots in addition to the root.
These slots are often (but not necessarily) nested within the root.

For example, the [Slider](/base-ui/react-slider/) is composed of a root `<span>` that houses several interior slots named for the elements they represent: track, thumb, rail, and so on.

### The slots prop

Use the `slots` prop to replace the elements in a component's slots, including the root.
The example below shows how to override the listbox slot in the [Select](/base-ui/react-select/) component—a `<ul>` by default—with an `<ol>`:

{{"demo": "OverridingInternalSlot.js"}}

### The slotProps prop

The `slotProps` prop is an object that contains the props for all slots within a component.
You can use it to define additional custom props to pass to a component's interior slots.

For example, the code snippet below shows how to add a custom CSS class to the badge slot of the [Badge](/base-ui/react-badge/) component:

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

Be mindful of your rendered DOM structure when overriding the slots of more complex components.
You can easily break the rules of semantic and accessible HTML if you deviate too far from the default structure—for instance, by unintentionally nesting block-level elements inside of inline elements.
