IconButton
==========

```jsx
<IconButton>account_circle</IconButton>
```

You can refer to the [Icons](/style/icons) section of the documentation
regarding the available icons.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| accent | bool | false | If true, will use the theme's accent color. |
| children | node |  | The icon element. If a string is passed, it will be used as a material icon font ligature. As a prerequisite, you must include the material icon font. |
| className | string |  | The CSS class name of the root element. |
| contrast | bool | false | If true, will use the theme's contrast color. |
| disabled | bool | false | If `true`, the button will be disabled. |
| disableRipple | bool | false | If `true`, the ripple will be disabled. |
| iconClassName | string |  | The CSS class name of the icon element if child is a string. |

Any other properties supplied will be spread to the root element.
