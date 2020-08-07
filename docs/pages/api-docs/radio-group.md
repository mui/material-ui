---
filename: /packages/material-ui/src/RadioGroup/RadioGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# RadioGroup API

<p class="description">The API documentation of the RadioGroup React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import RadioGroup from '@material-ui/core/RadioGroup';
// or
import { RadioGroup } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).





## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">Array&lt;string&gt;<br>&#124;&nbsp;number<br>&#124;&nbsp;string</span> |  | The default `input` element value. Use when the component is not controlled. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | The name used to reference the value of the control. If you don't provide this prop, it falls back to a randomly generated name. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when a radio button is selected.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (string). |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | Value of the selected radio button. The DOM API casts this to a string. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([FormGroup](/api/form-group/)).

## Inheritance

The props of the [FormGroup](/api/form-group/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Radio Buttons](/components/radio-buttons/)

