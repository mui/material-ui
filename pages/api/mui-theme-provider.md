---
filename: /packages/material-ui/src/styles/MuiThemeProvider.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MuiThemeProvider

This component takes a `theme` property.
It makes the `theme` available down the React tree thanks to React context.
This component should preferably be used at **the root of your component tree**.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |  | You can wrap a node. |
| <span class="prop-name">disableStylesGeneration</span> | <span class="prop-type">bool |  | You can disable the generation of the styles with this option. It can be useful when traversing the React tree outside of the HTML rendering step on the server. Let's say you are using react-apollo to extract all the queries made by the interface server side. You can significantly speed up the traversal with this property. |
| <span class="prop-name">sheetsManager</span> | <span class="prop-type">object |  | The sheetsManager is used to deduplicate style sheet injection in the page. It's deduplicating using the (theme, styles) couple. On the server, you should provide a new instance for each request. |
| <span class="prop-name required">theme *</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br> |  | A theme object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

