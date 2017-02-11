Paper
=====

A piece of material paper.

```js
import Paper from 'material-ui/Paper';

const Component = () => <Paper elevation={8}>Hello World</Paper>;
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| className | string |  | The CSS class name of the root element. |
| elevation | number | 2 | Shadow depth, corresponds to `dp` in the spec. |
| rounded | bool | true | Set to false to disable rounded corners. |

Any other properties supplied will be spread to the root element.
