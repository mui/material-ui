---
filename: /src/ExpansionPanel/ExpansionPanelSummary.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ExpansionPanelSummary



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Node |  | The content of the expansion panel summary. |
| classes | Object | {} | Allows to [extend the style](#css-api) applied to components. |
| disabled | boolean | false | If `true`, the summary will be displayed in a disabled state. |
| expandIcon | Node | null | The icon to display as the expand indicator. |
| expanded | boolean |  | If `true`, expands the summary, otherwise collapse it. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `items`
- `action`
- `button`
- `expanded`
- `focused`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/callemall/material-ui/tree/v1-beta/src/ExpansionPanel/ExpansionPanelSummary.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiExpansionPanelSummary`.

## Inheritance

The properties of the [&lt;ButtonBase /&gt;](/api/button-base) component are also available.

## Demos

- [Expansion Panels](/demos/expansion-panels)

