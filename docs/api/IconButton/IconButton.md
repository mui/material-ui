IconButton
==========

@see https://material.google.com/components/buttons.html

```js
import IconButton from 'material-ui/IconButton';

const Component = () => <IconButton>delete</IconButton>;
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| accent | bool | false | If true, will use the theme's accent color. |
| children | node |  | The icon element. If a string is passed, it will be used as a material icon font ligature. |
| className | string |  | The CSS class name of the root element. |
| contrast | bool | false | If true, will use the theme's contrast color. |
| disabled | bool | false | If `true`, the button will be disabled. |
| ripple | bool | true | If false, the ripple effect will be disabled. |

Any other properties supplied will be spread to the root element.
