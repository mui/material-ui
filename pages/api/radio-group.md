---
filename: /packages/material-ui/src/RadioGroup/RadioGroup.js
title: API of RadioGroup
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# RadioGroup

<p class="description">The API documentation of the RadioGroup React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">name</span> | <span class="prop-type">string |   | The name used to reference the value of the control. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func |   | Callback fired when a radio button is selected.<br><br>**Signature:**<br>`function(event: object, value: string) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value`.<br>*value:* The `value` of the selected radio button |
| <span class="prop-name">value</span> | <span class="prop-type">string |   | Value of the selected radio button. |

Any other properties supplied will be spread to the root element ([FormGroup](/api/form-group)).

## Inheritance

The properties of the [FormGroup](/api/form-group) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Selection Controls](/demos/selection-controls)

