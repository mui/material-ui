---
filename: /packages/material-ui-lab/src/Breadcrumbs/Breadcrumbs.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Breadcrumbs API

<p class="description">The API documentation of the Breadcrumbs React component. Learn more about the properties and the CSS customization points.</p>

```js
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">union:&nbsp;arrayOf&nbsp;&#124;<br>&nbsp;node<br></span> | <span class="prop-default">null</span> | A single `Breadcrumb` or an array of `Breadcrumb`s. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">itemsAfterCollapse</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | If max items is exceeded, the number of items to show after the ellipsis. |
| <span class="prop-name">itemsBeforeCollapse</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | If max items is exceeded, the number of items to show before the ellipsis. |
| <span class="prop-name">maxItems</span> | <span class="prop-type">number</span> | <span class="prop-default">8</span> | Specifies the maximum number of breadcrumbs to display. When there are more than the maximum number, only the first and last will be shown, with an ellipsis in between. |
| <span class="prop-name">separator</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;element<br></span> |   | Custom separator component. |
| <span class="prop-name">separatorText</span> | <span class="prop-type">string</span> | <span class="prop-default">'/'</span> | Custom text separator. |

Any other properties supplied will be spread to the root element (native element).

## Demos

- [Breadcrumbs](/lab/breadcrumbs/)

