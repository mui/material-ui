---
filename: /packages/material-ui/src/ButtonBase/ButtonBase.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonBase API

<p class="description">The API documentation of the ButtonBase React component. Learn more about the properties and the CSS customization points.</p>

```js
import ButtonBase from '@material-ui/core/ButtonBase';
```

`ButtonBase` contains as few styles as possible.
It aims to be a simple building block for creating a button.
It contains a load of style reset and some focus/ripple logic.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">func</span> |  | Callback fired when the component mounts. This is useful when you want to trigger an action programmatically. It currently only supports `focusVisible()` action.<br><br>**Signature:**<br>`function(actions: object) => void`<br>*actions:* This object contains all possible actions that can be triggered programmatically. |
| <span class="prop-name">buttonRef</span> | <span class="prop-type">union:&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> |  | Use that property to pass a ref callback to the native button component. |
| <span class="prop-name">centerRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripples will be centered. They won't start at the cursor interaction position. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">element type</span> | <span class="prop-default">'button'</span> | The component used for the root node. Either a string to use a DOM element or a component.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the base button will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripple effect will be disabled.<br>⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure to highlight the element by applying separate styles with the `focusVisibleClassName`. |
| <span class="prop-name">disableTouchRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the touch ripple effect will be disabled. |
| <span class="prop-name">focusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the base button will have a keyboard focus ripple. `disableRipple` must also be `false`. |
| <span class="prop-name">focusVisibleClassName</span> | <span class="prop-type">string</span> |  | This property can help a person know which element has the keyboard focus. The class name will be applied when the element gain the focus through a keyboard interaction. It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo). The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md). A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components if needed. |
| <span class="prop-name">onFocusVisible</span> | <span class="prop-type">func</span> |  | Callback fired when the component is focused with a keyboard. We trigger a `onFocus` callback too. |
| <span class="prop-name">TouchRippleProps</span> | <span class="prop-type">object</span> |  | Properties applied to the `TouchRipple` element. |
| <span class="prop-name">type</span> | <span class="prop-type">enum:&nbsp;'submit'&nbsp;&#124;<br>&nbsp;'reset'&nbsp;&#124;<br>&nbsp;'button'<br></span> | <span class="prop-default">'button'</span> | Used to control the button's purpose. This property passes the value to the `type` attribute of the native button component. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">focusVisible</span> | Styles applied to the root element if keyboard focused.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ButtonBase/ButtonBase.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiButtonBase`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Buttons](/components/buttons/)

