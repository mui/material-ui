---
filename: /packages/material-ui/src/Tabs/Tabs.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tabs API

<p class="description">The API documentation of the Tabs React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Tabs from '@material-ui/core/Tabs';
// or
import { Tabs } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiTabs` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">ref</span> |  | Callback fired when the component mounts. This is useful when you want to trigger an action programmatically. It supports two actions: `updateIndicator()` and `updateScrollButtons()` |
| <span class="prop-name">aria-label</span> | <span class="prop-type">string</span> |  | The label for the Tabs as a string. |
| <span class="prop-name">aria-labelledby</span> | <span class="prop-type">string</span> |  | An id or list of ids separated by a space that label the Tabs. |
| <span class="prop-name">centered</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the tabs will be centered. This property is intended for large views. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">indicatorColor</span> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'secondary'</span> | Determines the color of the indicator. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* We default to the index of the child (number) |
| <span class="prop-name">orientation</span> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The tabs orientation (layout flow direction). |
| <span class="prop-name">ScrollButtonComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">TabScrollButton</span> | The component used to render the scroll buttons. |
| <span class="prop-name">scrollButtons</span> | <span class="prop-type">'auto'<br>&#124;&nbsp;'desktop'<br>&#124;&nbsp;'off'<br>&#124;&nbsp;'on'</span> | <span class="prop-default">'auto'</span> | Determine behavior of scroll buttons when tabs are set to scroll:<br>- `auto` will only present them when not all the items are visible. - `desktop` will only present them on medium and larger viewports. - `on` will always present them. - `off` will never present them. |
| <span class="prop-name">selectionFollowsFocus</span> | <span class="prop-type">bool</span> |  | If `true` the selected tab changes on focus. Otherwise it only changes on activation. |
| <span class="prop-name">TabIndicatorProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the tab indicator element. |
| <span class="prop-name">TabScrollButtonProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`TabScrollButton`](/api/tab-scroll-button/) element. |
| <span class="prop-name">textColor</span> | <span class="prop-type">'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'inherit'</span> | Determines the color of the `Tab`. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the currently selected `Tab`. If you don't want any selected `Tab`, you can set this property to `false`. |
| <span class="prop-name">variant</span> | <span class="prop-type">'fullWidth'<br>&#124;&nbsp;'scrollable'<br>&#124;&nbsp;'standard'</span> | <span class="prop-default">'standard'</span> | Determines additional display behavior of the tabs:<br> - `scrollable` will invoke scrolling properties and allow for horizontally  scrolling (or swiping) of the tab bar.  -`fullWidth` will make the tabs grow to use all the available space,  which should be used for small views, like on mobile.  - `standard` will render the default state. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTabs-root</span> | Styles applied to the root element.
| <span class="prop-name">vertical</span> | <span class="prop-name">.MuiTabs-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">flexContainer</span> | <span class="prop-name">.MuiTabs-flexContainer</span> | Styles applied to the flex container element.
| <span class="prop-name">flexContainerVertical</span> | <span class="prop-name">.MuiTabs-flexContainerVertical</span> | Styles applied to the flex container element if `orientation="vertical"`.
| <span class="prop-name">centered</span> | <span class="prop-name">.MuiTabs-centered</span> | Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`.
| <span class="prop-name">scroller</span> | <span class="prop-name">.MuiTabs-scroller</span> | Styles applied to the tablist element.
| <span class="prop-name">fixed</span> | <span class="prop-name">.MuiTabs-fixed</span> | Styles applied to the tablist element if `!variant="scrollable"`.
| <span class="prop-name">scrollable</span> | <span class="prop-name">.MuiTabs-scrollable</span> | Styles applied to the tablist element if `variant="scrollable"`.
| <span class="prop-name">scrollButtons</span> | <span class="prop-name">.MuiTabs-scrollButtons</span> | Styles applied to the `ScrollButtonComponent` component.
| <span class="prop-name">scrollButtonsDesktop</span> | <span class="prop-name">.MuiTabs-scrollButtonsDesktop</span> | Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`.
| <span class="prop-name">indicator</span> | <span class="prop-name">.MuiTabs-indicator</span> | Styles applied to the `TabIndicator` component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tabs/Tabs.js) for more detail.

## Demos

- [Tabs](/components/tabs/)

