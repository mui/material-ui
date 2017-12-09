---
filename: /src/Hidden/Hidden.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Hidden

Responsively hides children based on the selected implementation.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Node |  | The content of the component. |
| implementation | union:&nbsp;'js'&nbsp;&#124;<br>&nbsp;'css'<br> | 'js' | Specify which implementation to use.  'js' is the default, 'css' works better for server side rendering. |
| initialWidth | number |  | You can use this property when choosing the `js` implementation with server side rendering.<br>As `window.innerWidth` is unavailable on the server, we default to rendering an empty componenent during the first mount. In some situation you might want to use an heristic to approximate the screen width of the client browser screen width.<br>For instance, you could be using the user-agent or the client-hints. http://caniuse.com/#search=client%20hint |
| lgDown | boolean | false | If true, screens before this size and down will be hidden. |
| lgUp | boolean | false | If true, screens this size and up will be hidden. |
| mdDown | boolean | false | If true, screens before this size and down will be hidden. |
| mdUp | boolean | false | If true, screens this size and up will be hidden. |
| only | union:&nbsp;Breakpoint&nbsp;&#124;<br>&nbsp;Array&lt;Breakpoint><br> |  | Hide the given breakpoint(s). |
| smDown | boolean | false | If true, screens before this size and down will be hidden. |
| smUp | boolean | false | If true, screens this size and up will be hidden. |
| xlDown | boolean | false | If true, screens before this size and down will be hidden. |
| xlUp | boolean | false | If true, screens this size and up will be hidden. |
| xsDown | boolean | false | If true, screens before this size and down will be hidden. |
| xsUp | boolean | false | If true, screens this size and up will be hidden. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Demos

- [Hidden](/layout/hidden)

