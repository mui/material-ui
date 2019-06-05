---
filename: /packages/material-ui/src/RadioGroup/RadioGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# RadioGroup API

<p class="description">The API documentation of the RadioGroup React component. Learn more about the properties and the CSS customization points.</p>

```js
import RadioGroup from '@material-ui/core/RadioGroup';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">any</span> |  | The default `input` element value, useful when not controlling the component. |
| <span class="prop-name">name</span> | <span class="prop-type">string</span> |  | The name used to reference the value of the control. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when a radio button is selected.<br><br>**Signature:**<br>`function(event: object, value: string) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value`.<br>*value:* The `value` of the selected radio button |
| <span class="prop-name">value</span> | <span class="prop-type">string</span> |  | Value of the selected radio button. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([FormGroup](/api/form-group/)).

## Inheritance

The properties of the [FormGroup](/api/form-group/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Radio Buttons](/components/radio-buttons/)

