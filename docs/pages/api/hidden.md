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
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--implementation"></a><a href="#props--implementation" class="prop-name">implementation</a> | <span class="prop-type">'js'<br>&#124;&nbsp;'css'</span> | <span class="prop-default">'js'</span> | Specify which implementation to use.  'js' is the default, 'css' works better for server-side rendering. |
| <a class="anchor-link" id="props--initialWidth"></a><a href="#props--initialWidth" class="prop-name">initialWidth</a> | <span class="prop-type">'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'</span> |  | You can use this prop when choosing the `js` implementation with server-side rendering.<br>As `window.innerWidth` is unavailable on the server, we default to rendering an empty component during the first mount. You might want to use an heuristic to approximate the screen width of the client browser screen width.<br>For instance, you could be using the user-agent or the client-hints. https://caniuse.com/#search=client%20hint |
| <a class="anchor-link" id="props--lgDown"></a><a href="#props--lgDown" class="prop-name">lgDown</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <a class="anchor-link" id="props--lgUp"></a><a href="#props--lgUp" class="prop-name">lgUp</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |
| <a class="anchor-link" id="props--mdDown"></a><a href="#props--mdDown" class="prop-name">mdDown</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <a class="anchor-link" id="props--mdUp"></a><a href="#props--mdUp" class="prop-name">mdUp</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |
| <a class="anchor-link" id="props--only"></a><a href="#props--only" class="prop-name">only</a> | <span class="prop-type">'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'<br>&#124;&nbsp;Array&lt;'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'&gt;</span> |  | Hide the given breakpoint(s). |
| <a class="anchor-link" id="props--smDown"></a><a href="#props--smDown" class="prop-name">smDown</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <a class="anchor-link" id="props--smUp"></a><a href="#props--smUp" class="prop-name">smUp</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |
| <a class="anchor-link" id="props--xlDown"></a><a href="#props--xlDown" class="prop-name">xlDown</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <a class="anchor-link" id="props--xlUp"></a><a href="#props--xlUp" class="prop-name">xlUp</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |
| <a class="anchor-link" id="props--xsDown"></a><a href="#props--xsDown" class="prop-name">xsDown</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and down will be hidden. |
| <a class="anchor-link" id="props--xsUp"></a><a href="#props--xsUp" class="prop-name">xsUp</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, screens this size and up will be hidden. |

The component cannot hold a ref.

Any other props supplied will be provided to the root element (native element).

## Demos

- [Hidden](/components/hidden/)

