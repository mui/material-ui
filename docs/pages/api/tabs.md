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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--action"></a><a href="#props--action" title="link to the prop on this page" class="prop-name">action</a> | <span class="prop-type">ref</span> |  | Callback fired when the component mounts. This is useful when you want to trigger an action programmatically. It supports two actions: `updateIndicator()` and `updateScrollButtons()` |
| <a class="anchor-link" id="props--centered"></a><a href="#props--centered" title="link to the prop on this page" class="prop-name">centered</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the tabs will be centered. This property is intended for large views. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--indicatorColor"></a><a href="#props--indicatorColor" title="link to the prop on this page" class="prop-name">indicatorColor</a> | <span class="prop-type">'secondary'<br>&#124;&nbsp;'primary'</span> | <span class="prop-default">'secondary'</span> | Determines the color of the indicator. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" title="link to the prop on this page" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* We default to the index of the child (number) |
| <a class="anchor-link" id="props--orientation"></a><a href="#props--orientation" title="link to the prop on this page" class="prop-name">orientation</a> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The tabs orientation (layout flow direction). |
| <a class="anchor-link" id="props--ScrollButtonComponent"></a><a href="#props--ScrollButtonComponent" title="link to the prop on this page" class="prop-name">ScrollButtonComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">TabScrollButton</span> | The component used to render the scroll buttons. |
| <a class="anchor-link" id="props--scrollButtons"></a><a href="#props--scrollButtons" title="link to the prop on this page" class="prop-name">scrollButtons</a> | <span class="prop-type">'auto'<br>&#124;&nbsp;'desktop'<br>&#124;&nbsp;'on'<br>&#124;&nbsp;'off'</span> | <span class="prop-default">'auto'</span> | Determine behavior of scroll buttons when tabs are set to scroll:<br>- `auto` will only present them when not all the items are visible. - `desktop` will only present them on medium and larger viewports. - `on` will always present them. - `off` will never present them. |
| <a class="anchor-link" id="props--TabIndicatorProps"></a><a href="#props--TabIndicatorProps" title="link to the prop on this page" class="prop-name">TabIndicatorProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the tab indicator element. |
| <a class="anchor-link" id="props--textColor"></a><a href="#props--textColor" title="link to the prop on this page" class="prop-name">textColor</a> | <span class="prop-type">'secondary'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'inherit'</span> | <span class="prop-default">'inherit'</span> | Determines the color of the `Tab`. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">any</span> |  | The value of the currently selected `Tab`. If you don't want any selected `Tab`, you can set this property to `false`. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'standard'<br>&#124;&nbsp;'scrollable'<br>&#124;&nbsp;'fullWidth'</span> | <span class="prop-default">'standard'</span> | Determines additional display behavior of the tabs:<br> - `scrollable` will invoke scrolling properties and allow for horizontally  scrolling (or swiping) of the tab bar.  -`fullWidth` will make the tabs grow to use all the available space,  which should be used for small views, like on mobile.  - `standard` will render the default state. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTabs`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTabs-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--vertical"></a><a href="#css--vertical" class="prop-name">vertical</a> | <span class="prop-name">.MuiTabs-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--flexContainer"></a><a href="#css--flexContainer" class="prop-name">flexContainer</a> | <span class="prop-name">.MuiTabs-flexContainer</span> | Styles applied to the flex container element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--flexContainerVertical"></a><a href="#css--flexContainerVertical" class="prop-name">flexContainerVertical</a> | <span class="prop-name">.MuiTabs-flexContainerVertical</span> | Styles applied to the flex container element if `orientation="vertical"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--centered"></a><a href="#css--centered" class="prop-name">centered</a> | <span class="prop-name">.MuiTabs-centered</span> | Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--scroller"></a><a href="#css--scroller" class="prop-name">scroller</a> | <span class="prop-name">.MuiTabs-scroller</span> | Styles applied to the tablist element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--fixed"></a><a href="#css--fixed" class="prop-name">fixed</a> | <span class="prop-name">.MuiTabs-fixed</span> | Styles applied to the tablist element if `!variant="scrollable"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--scrollable"></a><a href="#css--scrollable" class="prop-name">scrollable</a> | <span class="prop-name">.MuiTabs-scrollable</span> | Styles applied to the tablist element if `variant="scrollable"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--scrollButtons"></a><a href="#css--scrollButtons" class="prop-name">scrollButtons</a> | <span class="prop-name">.MuiTabs-scrollButtons</span> | Styles applied to the `ScrollButtonComponent` component.
| <a class="anchor-link" title="link to the rule name on this page" id="css--scrollButtonsDesktop"></a><a href="#css--scrollButtonsDesktop" class="prop-name">scrollButtonsDesktop</a> | <span class="prop-name">.MuiTabs-scrollButtonsDesktop</span> | Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--indicator"></a><a href="#css--indicator" class="prop-name">indicator</a> | <span class="prop-name">.MuiTabs-indicator</span> | Styles applied to the `TabIndicator` component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tabs/Tabs.js) for more detail.

## Demos

- [Tabs](/components/tabs/)

