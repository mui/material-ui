Hidden
======

Responsively hides children based on the selected implementation.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| component | union:&nbsp;string<br>&nbsp;Function<br> |  | The component used for the root node. Either a string to use a DOM element or a component. |
| only | Breakpoints |  | Hide the given breakpoint. |
| xsUp | boolean |  | If true, screens this size and up will be hidden. If false, screens this size and up will not be hidden. |
| smUp | boolean |  | If true, screens this size and up will be hidden. If false, screens this size and up will not be hidden. |
| mdUp | boolean |  | If true, screens this size and up will be hidden. If false, screens this size and up will not be hidden. |
| lgUp | boolean |  | If true, screens this size and up will be hidden. If false, screens this size and up will not be hidden. |
| xlUp | boolean |  | If true, screens this size and up will be hidden. If false, screens this size and up will not be hidden. |
| xsDown | boolean |  | If true, screens this size and down will be hidden. If false, screens this size and down will not be hidden. |
| smDown | boolean |  | If true, screens this size and down will be hidden. If false, screens this size and down will not be hidden. |
| mdDown | boolean |  | If true, screens this size and down will be hidden. If false, screens this size and down will not be hidden. |
| lgDown | boolean |  | If true, screens this size and down will be hidden. If false, screens this size and down will not be hidden. |
| xlDown | boolean |  | If true, screens this size and down will be hidden. If false, screens this size and down will not be hidden. |
| implementation | union:&nbsp;'js'<br>&nbsp;'css'<br> | 'js' | Specify which implementation to use.  'js' is the default, 'css' works better for server side rendering. |

Any other properties supplied will be spread to the root element.
