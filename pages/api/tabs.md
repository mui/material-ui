---
filename: /packages/material-ui/src/Tabs/Tabs.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tabs API

<p class="description">The API documentation of the Tabs React component. Learn more about the properties and the CSS customization points.</p>

```js
import Tabs from '@material-ui/core/Tabs';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">func</span> |  | Callback fired when the component mounts. This is useful when you want to trigger an action programmatically. It currently only supports `updateIndicator()` action.<br><br>**Signature:**<br>`function(actions: object) => void`<br>*actions:* This object contains all possible actions that can be triggered programmatically. |
| <span class="prop-name">centered</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the tabs will be centered. This property is intended for large views. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">indicatorColor</span> | <span class="prop-type">enum:&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'primary'<br></span> | <span class="prop-default">'secondary'</span> | Determines the color of the indicator. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* We default to the index of the child (number) |
| <span class="prop-name">ScrollButtonComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">TabScrollButton</span> | The component used to render the scroll buttons. |
| <span class="prop-name">scrollButtons</span> | <span class="prop-type">enum:&nbsp;'auto'&nbsp;&#124;<br>&nbsp;'desktop'&nbsp;&#124;<br>&nbsp;'on'&nbsp;&#124;<br>&nbsp;'off'<br></span> | <span class="prop-default">'auto'</span> | Determine behavior of scroll buttons when tabs are set to scroll<br>- `auto` will only present them when not all the items are visible. - `desktop` will only present them on medium and larger viewports. - `on` will always present them. - `off` will never present them. |
| <span class="prop-name">TabIndicatorProps</span> | <span class="prop-type">object</span> |  | Properties applied to the `TabIndicator` element. |
| <span class="prop-name">textColor</span> | <span class="prop-type">enum:&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'inherit'<br></span> | <span class="prop-default">'inherit'</span> | Determines the color of the `Tab`. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the currently selected `Tab`. If you don't want any selected `Tab`, you can set this property to `false`. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'standard'&nbsp;&#124;<br>&nbsp;'scrollable'&nbsp;&#124;<br>&nbsp;'fullWidth'<br></span> | <span class="prop-default">'standard'</span> | Determines additional display behavior of the tabs:<br> - `scrollable` will invoke scrolling properties and allow for horizontally  scrolling (or swiping) of the tab bar.  -`fullWidth` will make the tabs grow to use all the available space,  which should be used for small views, like on mobile.  - `standard` will render the default state. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">flexContainer</span> | Styles applied to the flex container element.
| <span class="prop-name">centered</span> | Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`.
| <span class="prop-name">scroller</span> | Styles applied to the tablist element.
| <span class="prop-name">fixed</span> | Styles applied to the tablist element if `!variant="scrollable"`.
| <span class="prop-name">scrollable</span> | Styles applied to the tablist element if `variant="scrollable"`.
| <span class="prop-name">scrollButtons</span> | Styles applied to the `ScrollButtonComponent` component.
| <span class="prop-name">scrollButtonsDesktop</span> | Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`.
| <span class="prop-name">indicator</span> | Styles applied to the `TabIndicator` component.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tabs/Tabs.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTabs`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tabs](/components/tabs/)

