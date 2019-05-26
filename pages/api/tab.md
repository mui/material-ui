---
filename: /packages/material-ui/src/Tab/Tab.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tab API

<p class="description">The API documentation of the Tab React component. Learn more about the properties and the CSS customization points.</p>

```js
import Tab from '@material-ui/core/Tab';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">unsupportedProp</span> |  | This property isn't supported. Use the `component` property if you need to change the children structure. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the tab will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The label element. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | You can provide your own value. Otherwise, we fallback to the child position index. |
| <span class="prop-name">wrapped</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Tab labels appear in a single row. They can use a second line if needed. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">labelIcon</span> | Styles applied to the root element if both `icon` and `label` are provided.
| <span class="prop-name">textColorInherit</span> | Styles applied to the root element if `textColor="inherit"`.
| <span class="prop-name">textColorPrimary</span> | Styles applied to the root element if `textColor="primary"`.
| <span class="prop-name">textColorSecondary</span> | Styles applied to the root element if `textColor="secondary"`.
| <span class="prop-name">selected</span> | Styles applied to the root element if `selected={true}` (controlled by the Tabs component).
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}` (controlled by the Tabs component).
| <span class="prop-name">fullWidth</span> | Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component).
| <span class="prop-name">wrapped</span> | Styles applied to the root element if `wrapped={true}`.
| <span class="prop-name">wrapper</span> | Styles applied to the `icon` and `label`'s wrapper element.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tab/Tab.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTab`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tabs](/components/tabs/)

