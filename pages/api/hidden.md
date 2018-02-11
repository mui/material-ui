---
filename: /src/Hidden/Hidden.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Hidden

Responsively hides children based on the selected implementation.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| implementation | enum:&nbsp;'js'&nbsp;&#124;<br>&nbsp;'css'<br> | 'js' | Specify which implementation to use.  'js' is the default, 'css' works better for server side rendering. |
| initialWidth | enum:&nbsp;'xs', 'sm', 'md', 'lg', 'xl'<br> |  | You can use this property when choosing the `js` implementation with server side rendering.<br>As `window.innerWidth` is unavailable on the server, we default to rendering an empty componenent during the first mount. In some situation you might want to use an heristic to approximate the screen width of the client browser screen width.<br>For instance, you could be using the user-agent or the client-hints. http://caniuse.com/#search=client%20hint |
| lgDown | bool | false | If true, screens this size and down will be hidden. |
| lgUp | bool | false | If true, screens this size and up will be hidden. |
| mdDown | bool | false | If true, screens this size and down will be hidden. |
| mdUp | bool | false | If true, screens this size and up will be hidden. |
| only | union:&nbsp;enum:&nbsp;'xs', 'sm', 'md', 'lg', 'xl'<br>&nbsp;&#124;<br>&nbsp;arrayOf<br> |  | Hide the given breakpoint(s). |
| smDown | bool | false | If true, screens this size and down will be hidden. |
| smUp | bool | false | If true, screens this size and up will be hidden. |
| xlDown | bool | false | If true, screens this size and down will be hidden. |
| xlUp | bool | false | If true, screens this size and up will be hidden. |
| xsDown | bool | false | If true, screens this size and down will be hidden. |
| xsUp | bool | false | If true, screens this size and up will be hidden. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Demos

- [Hidden](/layout/hidden)

