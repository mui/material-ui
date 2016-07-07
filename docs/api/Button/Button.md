Button
======

Buttons communicate the action that will occur when the user
touches them.

@see https://material.google.com/components/buttons.html

```js
import Button from 'material-ui/Button';

const Component = () => <Button>Hello World</Button>;
```

Props
-----


| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| accent | boolean |  |  If true, the button will use the theme's accent color. |
| children | Element |  |  The content of the button. |
| className | string |  |  The CSS class name of the root element. |
| component | union | 'button' |  The element or component used for the root node. |
| disabled | boolean |  |  If true, the button will be disabled. |
| fab | boolean |  |  If true, well use floating action button styling. |
| focusRipple | boolean | true |  If true, the button will have a keyboard focus ripple. Ripple must also be true. |
| href | string |  |  The URL to link to when the button is clicked. If set, an `a` element will be used as the root node. |
| primary | boolean |  |  If true, the button will use the theme's primary color. |
| raised | boolean | false |  If true, the button will use raised styling. |
| ripple | boolean | true |  If true, the button will have a ripple. |
