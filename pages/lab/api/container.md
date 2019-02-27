---
filename: /packages/material-ui-lab/src/Container/Container.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Container API

<p class="description">The API documentation of the Container React component. Learn more about the properties and the CSS customization points.</p>

```js
import Container from '@material-ui/lab/Container';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node</span> |   |  |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">fixed</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Set the max-width to match the min-width of the current breakpoint. This is useful if you'd prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport. It's fluid by default. |
| <span class="prop-name">maxWidth</span> | <span class="prop-type">enum:&nbsp;'xs', 'sm', 'md', 'lg', 'xl', false<br></span> | <span class="prop-default">'lg'</span> | Determine the max-width of the container. The container width grows with the size of the screen. Set to `false` to disable `maxWidth`. |

Any other properties supplied will be spread to the root element (native element).

## Demos

- [Layout](/lab/layout/)

