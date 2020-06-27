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



## Component name

The `MuiTab` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">unsupportedProp</span> |  | This prop isn't supported. Use the `component` prop if you need to change the children structure. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the tab will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The label element. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | You can provide your own value. Otherwise, we fallback to the child position index. |
| <span class="prop-name">wrapped</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Tab labels appear in a single row. They can use a second line if needed. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTab-root</span> | Styles applied to the root element.
| <span class="prop-name">labelIcon</span> | <span class="prop-name">.MuiTab-labelIcon</span> | Styles applied to the root element if both `icon` and `label` are provided.
| <span class="prop-name">textColorInherit</span> | <span class="prop-name">.MuiTab-textColorInherit</span> | Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="inherit"`.
| <span class="prop-name">textColorPrimary</span> | <span class="prop-name">.MuiTab-textColorPrimary</span> | Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`.
| <span class="prop-name">textColorSecondary</span> | <span class="prop-name">.MuiTab-textColorSecondary</span> | Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="secondary"`.
| <span class="prop-name">selected</span> | <span class="prop-name">.Mui-selected</span> | Pseudo-class applied to the root element if `selected={true}` (controlled by the Tabs component).
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}` (controlled by the Tabs component).
| <span class="prop-name">fullWidth</span> | <span class="prop-name">.MuiTab-fullWidth</span> | Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component).
| <span class="prop-name">wrapped</span> | <span class="prop-name">.MuiTab-wrapped</span> | Styles applied to the root element if `wrapped={true}`.
| <span class="prop-name">wrapper</span> | <span class="prop-name">.MuiTab-wrapper</span> | Styles applied to the `icon` and `label`'s wrapper element.

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

