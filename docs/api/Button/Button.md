Button
======

```jsx
<Button>Hello World</Button>
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| accent | bool | false | If `true`, the button will use the theme's accent color. |
| <span style="color: #31a148">children *</span> | node |  | The content of the button. |
| className | string |  | The CSS class name of the root element. |
| compact | bool | false | Uses a smaller minWidth, ideal for things like card actions. |
| component | union:&nbsp;string<br>&nbsp;func<br> | 'button' | The component used for the root node. Either a string to use a DOM element or a ReactElement. |
| contrast | bool | false | If true, will use the theme's contrast color. |
| disabled | bool | false | If `true`, the button will be disabled. |
| fab | bool | false | If `true`, well use floating action button styling. |
| focusRipple | bool | true | If `true`, the button will have a keyboard focus ripple. Ripple must also be true. |
| href | string |  | The URL to link to when the button is clicked. If set, an `a` element will be used as the root node. |
| primary | bool | false | If `true`, the button will use the theme's primary color. |
| raised | bool | false | If `true`, the button will use raised styling. |
| ripple | bool | true | If `true`, the button will have a ripple. |

Any other properties supplied will be spread to the root element.
