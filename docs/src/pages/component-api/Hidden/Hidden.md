# Hidden

Responsively hides children based on the selected implementation.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | The content of the component. |
| implementation | union:&nbsp;'js'<br>&nbsp;'css'<br> | 'js' | Specify which implementation to use.  'js' is the default, 'css' works better for server side rendering. |
| lgDown | boolean | false | If true, screens this size and down will be hidden. |
| lgUp | boolean | false | If true, screens this size and up will be hidden. |
| mdDown | boolean | false | If true, screens this size and down will be hidden. |
| mdUp | boolean | false | If true, screens this size and up will be hidden. |
| only | union:&nbsp;Breakpoint<br>&nbsp;Array<Breakpoint><br> |  | Hide the given breakpoint(s). |
| smDown | boolean | false | If true, screens this size and down will be hidden. |
| smUp | boolean | false | If true, screens this size and up will be hidden. |
| xlDown | boolean | false | If true, screens this size and down will be hidden. |
| xlUp | boolean | false | If true, screens this size and up will be hidden. |
| xsDown | boolean | false | If true, screens this size and down will be hidden. |
| xsUp | boolean | false | If true, screens this size and up will be hidden. |

Any other properties supplied will be spread to the root element.

