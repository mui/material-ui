Button
======

Buttons communicate the action that will occur when the user
touches them.

```jsx
<Button>Hello World</Button>
```

Props
-----


| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| accent | bool |  |  If true, the button will use the theme's accent color. |
| children | node |  |  The content of the button. |
| className | string |  |  The CSS class name of the root element. |
| component | union | 'button' |  The element or component used for the root node. |
| disabled | bool |  |  If true, the button will be disabled. |
| fab | bool |  |  If true, well use floating action button styling. |
| focusRipple | bool | true |  If true, the button will have a keyboard focus ripple. Ripple must also be true. |
| href | string |  |  The URL to link to when the button is clicked. If set, an `a` element will be used as the root node. |
| primary | bool |  |  If true, the button will use the theme's primary color. |
| raised | bool | false |  If true, the button will use raised styling. |
| ripple | bool | true |  If true, the button will have a ripple. |
