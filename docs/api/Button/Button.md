Button
======

Buttons communicate the action that will occur when the user
touches them.

Material buttons trigger an ink reaction on press. They may display
text, imagery, or both. Flat buttons and raised buttons are the
most commonly used types.

```js
import Button from 'material-ui/Button';

const Component = () => <Button>Hello World</Button>;
```

Props
-----


| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| accent | bool |  |   |
| children | node |  |   |
| className | string |  |   |
| component | union | 'button' |   |
| fab | bool |  |   |
| onBlur | function |  |   |
| onMouseDown | function |  |   |
| onMouseLeave | function |  |   |
| onMouseUp | function |  |   |
| onTouchEnd | function |  |   |
| onTouchStart | function |  |   |
| primary | bool |  |   |
| raised | bool | false |   |
| ripple | bool | true |   |
| type | string | 'button' |   |
