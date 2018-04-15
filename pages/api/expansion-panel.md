---
filename: /packages/material-ui/src/ExpansionPanel/ExpansionPanel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ExpansionPanel



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |  | The content of the expansion panel. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">CollapseProps</span> | <span class="prop-type">object |  | Properties applied to the `Collapse` element. |
| <span class="prop-name">defaultExpanded</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, expands the panel by default. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the panel will be displayed in a disabled state. |
| <span class="prop-name">expanded</span> | <span class="prop-type">bool |  | If `true`, expands the panel, otherwise collapse it. Setting this prop enables control over the panel. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func |  | Callback fired when the expand/collapse state is changed.<br><br>**Signature:**<br>`function(event: object, expanded: boolean) => void`<br>*event:* The event source of the callback<br>*expanded:* The `expanded` state of the panel |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `expanded`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/ExpansionPanel/ExpansionPanel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiExpansionPanel`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.

## Demos

- [Expansion Panels](/demos/expansion-panels)

