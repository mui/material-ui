---
productId: joy-ui
title: React Switch component
components: Switch
githubLabel: 'component: switch'
unstyled: /base-ui/react-switch/
---

# Switch

<p class="description">Switches toggle the state of a single setting on or off.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Switches are very commonly used for adjusting settings on mobile.
The option that the switch controls, as well as the state it's in,
should be made clear from the corresponding inline label.

{{"demo": "SwitchUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Switch from '@mui/joy/Switch';

export default function MyApp() {
  return <Switch />;
}
```

### Controlled

To create a controlled switch, use the `checked` and `onChange` props.

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

{{"demo": "SwitchControlled.js"}}

:::info
By default, the color of the switch changes from `neutral` to `primary` when it is checked unless you specify the `color` prop directly to the component.
:::

### Label

When a `Switch` is used together with `FormControl` and `FormLabel`, the switch is labeled automatically. You can also use `FormHelperText` to include a description to the switch as well.

{{"demo": "SwitchControl.js"}}

An alternative way is to place the `Switch` component inside a label element. The `Typography` is used in this case to leverage the typography scale from the theme.

{{"demo": "SwitchLabel.js"}}

### Decorators

To insert icon decorators, use the `startDecorator` and/or `endDecorator` props.

{{"demo": "SwitchDecorators.js"}}

### Track child

Target the track's children using the `slotProps` prop to display a text inside of it.

{{"demo": "ExampleTrackChild.js"}}

:::warning
The track text **should not** be used to label the switch, you should use [proper methods](#label) to achieve it.
:::

### Thumb child

Similarly to the above, target the thumb's children to display icons inside of it.

{{"demo": "ExampleThumbChild.js"}}

## CSS variables playground

Play around with all the CSS variables available in the switch component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "SwitchVariables.js", "hideToolbar": true, "bg": "gradient"}}

## Common examples

### Fluent UI

Here's how you'd customize Joy UI's Switch to make it look like [Microsoft's Fluent UI](https://developer.microsoft.com/en-us/fluentui#/controls/web/toggle):

- Unchecked state: `outlined` variant and `neutral` color.
- Checked state: `solid` variant and `primary` color.

{{"demo": "ExampleFluentSwitch.js"}}

### iOS

Note how we've used the `:active` pseudo-class to replicate the small thumb size increase, which happens when you press and hold the switch.

{{"demo": "ExampleIosSwitch.js"}}

### Strapi

{{"demo": "ExampleStrapiSwitch.js"}}

### Chakra UI

{{"demo": "ExampleChakraSwitch.js"}}

### Tailwind UI

{{"demo": "ExampleTailwindSwitch.js"}}

### Mantine

{{"demo": "ExampleMantineSwitch.js"}}

## Accessibility

Here are a few tips to make sure you have an accessible switch component:

- The `Switch` will render with the `checkbox` role as opposed to `switch`.
  This is mainly because the latter isn't widely supported yet.
  However, if you believe your audience will support it, make sure to test with assistive technology.
  Use the `slotProps` prop to change the role:

  ```jsx
  <Switch slotProps={{ input: { role: 'switch' } }}>
  ```

- Every form control component should have proper labels.
  This includes radio buttons, checkboxes, and switches.
  In most cases, this is done using the `<label>` element.
  - If a label can't be applied, make sure to add an attribute (for example `aria-label`, `aria-labelledby`, `title`) to the input slot inside the `slotProps` prop.
  ```jsx
  <Switch value="checkedA" slotProps={{ 'aria-label': 'Switch A' }} />
  ```
