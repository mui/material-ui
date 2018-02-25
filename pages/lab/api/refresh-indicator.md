---
filename: /packages/material-ui-lab/src/RefreshIndicator/RefreshIndicator.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# RefreshIndicator



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">percentage</span> | <span class="prop-type">number | <span class="prop-default">0</span> | The confirmation progress to fetch data. Max value is 100. |
| <span class="prop-name">size</span> | <span class="prop-type">number | <span class="prop-default">40</span> | Size in pixels. |
| <span class="prop-name">status</span> | <span class="prop-type">enum:&nbsp;'ready'&nbsp;&#124;<br>&nbsp;'loading'&nbsp;&#124;<br>&nbsp;'hide'<br> | <span class="prop-default">'hide'</span> | The display status of the indicator. If the status is "ready", the indicator will display the ready state arrow. If the status is "loading", it will display the loading progress indicator. If the status is "hide", the indicator will be hidden. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui-lab/src/RefreshIndicator/RefreshIndicator.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiRefreshIndicator`.

## Demos

- [Refresh Indicator](/lab/refresh-indicator)

