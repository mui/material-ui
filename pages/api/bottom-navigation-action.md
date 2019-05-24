---
filename: /packages/material-ui/src/BottomNavigationAction/BottomNavigationAction.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# BottomNavigationAction API

<p class="description">The API documentation of the BottomNavigationAction React component. Learn more about the properties and the CSS customization points.</p>

```js
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">unsupportedProp</span> |  | This property isn't supported. Use the `component` property if you need to change the children structure. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The label element. |
| <span class="prop-name">showLabel</span> | <span class="prop-type">bool</span> |  | If `true`, the `BottomNavigationAction` will show its label. By default, only the selected `BottomNavigationAction` inside `BottomNavigation` will show its label. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | You can provide your own value. Otherwise, we fallback to the child position index. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">selected</span> | Styles applied to the root element if selected.
| <span class="prop-name">iconOnly</span> | Styles applied to the root element if `showLabel={false}` and not selected.
| <span class="prop-name">wrapper</span> | Styles applied to the span element that wraps the icon and label.
| <span class="prop-name">label</span> | Styles applied to the label's span element.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/BottomNavigationAction/BottomNavigationAction.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiBottomNavigationAction`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Bottom Navigation](/components/bottom-navigation/)

