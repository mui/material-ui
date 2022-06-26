---
product: joy-ui
title: React Switch component
githubLabel: 'component: switch'
unstyled: /base/react-switch/
---

# Switch

<p class="description">Switches toggle the state of a single setting on or off.</p>

## Introduction

Switches are the preferred way to adjust settings on mobile.
The option that the switch controls, as well as the state it's in,
should be made clear from the corresponding inline label.

{{"demo": "SwitchUsage.js"}}

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Component

### Controlled

Use `checked` and `onChange` to create a controlled switch:

{{"demo": "SwitchControlled.js"}}

### Label

You can use a `Typography` to label a `Switch`:

{{"demo": "SwitchLabel.js"}}

### Decorators

Use `startDecorator` and/or `endDecorator` to insert decorators:

{{"demo": "SwitchDecorators.js"}}

### CSS Variables

{{"demo": "SwitchVariables.js"}}

## Accessibility

- It will render an element with the `checkbox` role not `switch` role since this
  role isn't widely supported yet. Please test first if assistive technology of your
  target audience supports this role properly. Then you can change the role with
  `<Switch componentsProps={{ input: { role: 'switch' } }}>`
- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element.
- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) to the input slot inside `componentsProps` prop.

```jsx
<Switch value="checkedA" componentsProps={{ 'aria-label': 'Switch A' }} />
```

## Common examples

These are customization examples that demonstrate the flexibility of Joy switch.

### Track child

You can display some texts inside the track slot which some part is covered by the thumb.

{{"demo": "ExampleTrackChild.js"}}

### Thumb child

You can also display an icon on the thumb by passing it as a child to the thumb slot. The color is based on the state of the switch.

{{"demo": "ExampleThumbChild.js"}}

### Fluent

To customize Joy switch to look like [Fluent design Toggle](https://developer.microsoft.com/en-us/fluentui#/controls/web/toggle), the switch's variant and color are different between states:

- Unchecked: use `outlined` variant + `neutral` color.
- Checked: use `solid` variant + `primary` color.

{{"demo": "ExampleFluentSwitch.js"}}

### iOS

The `:active` is added to replicate when you press and hold the pointer on the switch. The thumb's width increases a little bit to represent the interaction.

The CSS property `width` and `left` of the thumb require to have the same transition to make the effect smooth.

{{"demo": "ExampleIosSwitch.js"}}

### Strapi

{{"demo": "ExampleStrapiSwitch.js"}}

### Material design

{{"demo": "ExampleMaterialSwitch.js"}}

### Chakra UI

{{"demo": "ExampleChakraSwitch.js"}}

### Tailwind UI

{{"demo": "ExampleTailwindSwitch.js"}}

### Mantine

{{"demo": "ExampleMantineSwitch.js"}}
