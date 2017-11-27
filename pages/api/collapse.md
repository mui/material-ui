---
filename: /src/transitions/Collapse.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Collapse



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Node |  | The content node to be collapsed. |
| classes | Object |  | Useful to extend the style applied to components. |
| collapsedHeight | string | '0px' | The height of the container when collapsed. |
| component | ElementType | 'div' | The component used for the root node. Either a string to use a DOM element or a component. The default value is a `button`. |
| containerProps | Object |  | Properties applied to the `Collapse` container. |
| <span style="color: #31a148">in *</span> | boolean |  | If `true`, the component will transition in. |
| timeout | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }&nbsp;&#124;<br>&nbsp;'auto'<br> | duration.standard | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `container`
- `entered`
- `wrapper`
- `wrapperInner`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/transitions/Collapse.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCollapse`.

## Inheritance

The properties of the [&lt;Transition /&gt;](https://reactcommunity.org/react-transition-group/#Transition) component are also available.

## Demos

- [Cards](/demos/cards)
- [Lists](/demos/lists)

