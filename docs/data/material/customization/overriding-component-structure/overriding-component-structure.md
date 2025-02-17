# Overriding component structure

<p class="description">Learn how to override the default DOM structure of Material UI components.</p>

Material UI components are designed to suit the widest possible range of use cases, but you may occasionally need to change how a component's structure is rendered in the DOM.

To understand how to do this, it helps to have an accurate mental model of the components.

## The mental model

A component's structure is determined by the elements that fill that component's **slots**.
Slots are most commonly filled by HTML tags, but may also be filled by React components.

All components contain a root slot that defines their primary node in the DOM tree; more complex components also contain additional interior slots named after the elements they represent.

All _non-utility_ Material UI components accept two props for overriding their rendered HTML structure:

- `component`—to override the root slot
- `slots`—to replace any interior slots (when present) as well as the root

Additionally, you can pass custom props to interior slots using `slotProps`.

## The root slot

The root slot represents the component's outermost element. It is filled by a styled component with an appropriate HTML element.

For example, the [Button's](/material-ui/react-button/) root slot is a `<button>` element.
This component _only_ has a root slot; more complex components may have additional [interior slots](#interior-slots).

### The component prop

Use the `component` prop to override a component's root slot.
The demo below shows how to replace the Button's `<button>` tag with a `<a>` to create a link button:

{{"demo": "OverridingRootSlot.js"}}

:::info
The props `href`, `target`, and `rel` are specific to `<a>` tag. Be sure to use the appropriate attributes when you provide a custom `component` prop.
:::

## Interior slots

Complex components are composed of one or more interior slots in addition to the root.
These slots are often (but not necessarily) nested within the root.

For example, the [Autocomplete](/material-ui/react-autocomplete/) is composed of a root `<div>` that houses several interior slots named for the elements they represent: input, startDecorator, endDecorator, clearIndicator, popupIndicator and so on.

### The slots prop

Use the `slots` prop to replace a component's interior slots.
The example below shows how to replace the popper slot in the [Autocomplete](/material-ui/react-autocomplete/) component to remove the popup functionality:

{{"demo": "OverridingInternalSlot.js"}}

### The slotProps prop

The `slotProps` prop is an object that contains the props for all slots within a component.
You can use it to define additional custom props to pass to a component's interior slots.

For example, the code snippet below shows how to add a custom `data-testid` to the popper slot of the [Autocomplete](/material-ui/react-autocomplete/) component:

```jsx
<Autocomplete slotProps={{ popper: { 'data-testid': 'my-popper' } }} />
```

All additional props placed on the primary component are also propagated into the root slot (just as if they were placed in `slotProps.root`).
These two examples are equivalent:

```jsx
<Autocomplete id="badge1">
```

```jsx
<Autocomplete slotProps={{ root: { id: 'badge1' } }}>
```

:::warning
If both `slotProps.root` and additional props have the same keys but different values, the `slotProps.root` props will take precedence.
This does not apply to classes or the `style` prop—they will be merged instead.
:::

## Best practices

Use `component` or `slotProps.{slot}.component` prop to override the element by preserving the styles of the slot.

Use `slots` prop to replace the slot's styles and functionality with your custom component.

Overriding with `component` lets you apply the attributes of that element directly to the root.
For instance, if you override the Button's root with an `<li>` tag, you can add the `<li>` attribute `value` directly to the component.
If you did the same with `slots.root`, you would need to place this attribute on the `slotProps.root` object in order to avoid a TypeScript error.

Be mindful of your rendered DOM structure when overriding the slots of more complex components.
You can easily break the rules of semantic and accessible HTML if you deviate too far from the default structure—for instance, by unintentionally nesting block-level elements inside of inline elements.

## History of the pattern

Prior to Material UI v6, majority of the components lacked the ability to override their structure.
Some components had `*Props` props that allowed you to pass props to a specific slot, but this was not a consistent pattern across the library.

In v6, those props were deprecated in favor of the `slots` and `slotProps` props, which allow for more granular control over the structure of a component and make the API more consistent across the library.

The summary of the benefits of the new pattern is as follows:

- The `slotProps` provided to [theme default props](/customization/theme-components/#theme-default-props) are merged with the instance `slotProps` prop. This is useful for building custom themes or use Material UI as a design system component library.
- Most components have a `slots` prop that allows developers to replace the entire slot with a custom one. For example, developers can remove the popper behavior from the Autocomplete component by replacing `popper` slot with a `div` as [shown above](#the-slots-prop).
- Integrate better with [Tailwind CSS](https://tailwindcss.com/) because developers can provide utility classes to the slots through `slotProps.*.className`.

To see the available slots for a component, refer to the component API documentation at slots section.
