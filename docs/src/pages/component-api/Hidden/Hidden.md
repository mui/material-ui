Hidden
======

Responsively hides children based on the selected implementation.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| component | union:&nbsp;string<br>&nbsp;Function<br>&nbsp;Element<*><br> |  | If string or Function, component is used as the root node and all other props are passed including children. If an Element, it will be rendered as-is and no other props are propagated. |
| only | union:&nbsp;Breakpoints<br>&nbsp;Array<Breakpoints><br> |  | Hide the given breakpoint(s). |
| xsUp | boolean |  | If true, screens this size and up will be hidden. |
| smUp | boolean |  | If true, screens this size and up will be hidden. |
| mdUp | boolean |  | If true, screens this size and up will be hidden. |
| lgUp | boolean |  | If true, screens this size and up will be hidden. |
| xlUp | boolean |  | If true, screens this size and up will be hidden. |
| xsDown | boolean |  | If true, screens this size and down will be hidden. |
| smDown | boolean |  | If true, screens this size and down will be hidden. |
| mdDown | boolean |  | If true, screens this size and down will be hidden. |
| lgDown | boolean |  | If true, screens this size and down will be hidden. |
| xlDown | boolean |  | If true, screens this size and down will be hidden. |
| implementation | union:&nbsp;'js'<br>&nbsp;'css'<br> | 'js' | Specify which implementation to use.  'js' is the default, 'css' works better for server side rendering. |

Any other properties supplied will be spread to the root element.
