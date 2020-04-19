---
filename: /packages/material-ui/src/BottomNavigation/BottomNavigation.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# BottomNavigation API

<p class="description">The API documentation of the BottomNavigation React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import BottomNavigation from '@material-ui/core/BottomNavigation';
// or
import { BottomNavigation } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiBottomNavigation` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback.<br>*value:* We default to the index of the child. |
| <span class="prop-name">showLabels</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, all `BottomNavigationAction`s will show their labels. By default, only the selected `BottomNavigationAction` will show its label. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the currently selected `BottomNavigationAction`. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiBottomNavigation-root</span> | Styles applied to the root element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/BottomNavigation/BottomNavigation.js) for more detail.

## Demos

- [Bottom Navigation](/components/bottom-navigation/)

