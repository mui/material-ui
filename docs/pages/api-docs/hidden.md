---
filename: /packages/material-ui/src/Hidden/Hidden.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Hidden API

<p class="description">The API documentation of the Hidden React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Hidden from '@material-ui/core/Hidden';
// or
import { Hidden } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Responsively hides children based on the selected implementation.



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">implementation</span> | <span class="prop-type">'js'<br>&#124;&nbsp;'css'</span> | <span class="prop-default">'js'</span> | Specify which implementation to use.  'js' is the default, 'css' works better for server-side rendering. |
| <span class="prop-name">initialWidth</span> | <span class="prop-type">'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'</span> |  | You can use this prop when choosing the `js` implementation with server-side rendering.<br>As `window.innerWidth` is unavailable on the server, we default to rendering an empty component during the first mount. You might want to use an heuristic to approximate the screen width of the client browser screen width.<br>For instance, you could be using the user-agent or the client-hints. https://caniuse.com/#search=client%20hint |
| <span class="prop-name">lgDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <span class="prop-name">lgUp</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |
| <span class="prop-name">mdDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <span class="prop-name">mdUp</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |
| <span class="prop-name">only</span> | <span class="prop-type">'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'<br>&#124;&nbsp;Array&lt;'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'&gt;</span> |  | Hide the given breakpoint(s). |
| <span class="prop-name">smDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <span class="prop-name">smUp</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |
| <span class="prop-name">xlDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <span class="prop-name">xlUp</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |
| <span class="prop-name">xsDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <span class="prop-name">xsUp</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |

The component cannot hold a ref.

Any other props supplied will be provided to the root element (native element).

## Demos

- [Hidden](/components/hidden/)

