---
filename: /packages/material-ui/src/Tab/Tab.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tab API

<p class="description">The API documentation of the Tab React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Tab from '@material-ui/core/Tab';
// or
import { Tab } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">unsupportedProp</span> |  | This prop isn't supported. Use the `component` prop if you need to change the children structure. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the tab will be disabled. |
| <a class="anchor-link" id="props--disableFocusRipple"></a><a href="#props--disableFocusRipple" title="link to the prop on this page" class="prop-name">disableFocusRipple</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <a class="anchor-link" id="props--disableRipple"></a><a href="#props--disableRipple" title="link to the prop on this page" class="prop-name">disableRipple</a> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" title="link to the prop on this page" class="prop-name">icon</a> | <span class="prop-type">node</span> |  | The icon element. |
| <a class="anchor-link" id="props--label"></a><a href="#props--label" title="link to the prop on this page" class="prop-name">label</a> | <span class="prop-type">node</span> |  | The label element. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">any</span> |  | You can provide your own value. Otherwise, we fallback to the child position index. |
| <a class="anchor-link" id="props--wrapped"></a><a href="#props--wrapped" title="link to the prop on this page" class="prop-name">wrapped</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Tab labels appear in a single row. They can use a second line if needed. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiTab`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTab-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--labelIcon"></a><a href="#css--labelIcon" class="prop-name">labelIcon</a> | <span class="prop-name">.MuiTab-labelIcon</span> | Styles applied to the root element if both `icon` and `label` are provided.
| <a class="anchor-link" title="link to the rule name on this page" id="css--textColorInherit"></a><a href="#css--textColorInherit" class="prop-name">textColorInherit</a> | <span class="prop-name">.MuiTab-textColorInherit</span> | Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="inherit"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--textColorPrimary"></a><a href="#css--textColorPrimary" class="prop-name">textColorPrimary</a> | <span class="prop-name">.MuiTab-textColorPrimary</span> | Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--textColorSecondary"></a><a href="#css--textColorSecondary" class="prop-name">textColorSecondary</a> | <span class="prop-name">.MuiTab-textColorSecondary</span> | Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--selected"></a><a href="#css--selected" class="prop-name">selected</a> | <span class="prop-name">.Mui-selected</span> | Pseudo-class applied to the root element if `selected={true}` (controlled by the Tabs component).
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}` (controlled by the Tabs component).
| <a class="anchor-link" title="link to the rule name on this page" id="css--fullWidth"></a><a href="#css--fullWidth" class="prop-name">fullWidth</a> | <span class="prop-name">.MuiTab-fullWidth</span> | Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component).
| <a class="anchor-link" title="link to the rule name on this page" id="css--wrapped"></a><a href="#css--wrapped" class="prop-name">wrapped</a> | <span class="prop-name">.MuiTab-wrapped</span> | Styles applied to the root element if `wrapped={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--wrapper"></a><a href="#css--wrapper" class="prop-name">wrapper</a> | <span class="prop-name">.MuiTab-wrapper</span> | Styles applied to the `icon` and `label`'s wrapper element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tab/Tab.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Tabs](/components/tabs/)

