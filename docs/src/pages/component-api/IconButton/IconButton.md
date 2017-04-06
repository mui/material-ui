IconButton
==========

```
<IconButton>account_circle</IconButton>
```

```
<IconButton><AccountCircle></IconButton>
```

Refer to the [Icons](/style/icons) section of the documentation
regarding the available icon options.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| accent | bool | false | If `true`, will use the theme's accent color. |
| children | node |  | The icon element. If a string is provided, it will be used as an icon font ligature. |
| className | string |  | The CSS class name of the root element. |
| contrast | bool | false | If `true`, the icon button will use the theme's contrast color. |
| disabled | bool | false | If `true`, the button will be disabled. |
| disableRipple | bool | false | If `true`, the ripple will be disabled. |
| iconClassName | string |  | The CSS class name of the icon element if child is a string. |

Any other properties supplied will be spread to the root element.
