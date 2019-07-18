---
filename: /packages/material-ui/src/ExpansionPanelSummary/ExpansionPanelSummary.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ExpansionPanelSummary API

<p class="description">The API documentation of the ExpansionPanelSummary React component. Learn more about the properties and the CSS customization points.</p>

```js
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the expansion panel summary. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">expandIcon</span> | <span class="prop-type">node</span> |  | The icon to display as the expand indicator. |
| <span class="prop-name">IconButtonProps</span> | <span class="prop-type">object</span> |  | Properties applied to the `IconButton` element wrapping the expand icon. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">expanded</span> | Styles applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`.
| <span class="prop-name">focused</span> | Styles applied to the root and children wrapper elements when focused.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">content</span> | Styles applied to the children wrapper element.
| <span class="prop-name">expandIcon</span> | Styles applied to the `IconButton` component when `expandIcon` is supplied.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ExpansionPanelSummary/ExpansionPanelSummary.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiExpansionPanelSummary`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Expansion Panels](/components/expansion-panels/)

