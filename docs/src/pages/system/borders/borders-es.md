# Borders

<p class="description">Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons, or any other element.</p>

## Border

Use border utilities to add or remove an element’s borders. Choose from all borders or one at a time.

### Additive

```jsx
<Box border={1}>…
<Box borderTop={1}>…
<Box borderRight={1}>…
<Box borderBottom={1}>…
<Box borderLeft={1}>…
```

{{"demo": "pages/system/borders/BorderAdditive.js"}}

### Subtractive

```jsx
<Box border={0}>…
<Box borderTop={0}>…
<Box borderRight={0}>…
<Box borderBottom={0}>…
<Box borderLeft={0}>…
```

{{"demo": "pages/system/borders/BorderSubtractive.js"}}

## Border color

```jsx
<Box borderColor="primary.main">…
<Box borderColor="secondary.main">…
<Box borderColor="error.main">…
<Box borderColor="grey.500">…
<Box borderColor="text.primary">…
```

{{"demo": "pages/system/borders/BorderColor.js"}}

## Border-radius

```jsx
<Box borderRadius="50%">…
<Box borderRadius="borderRadius">…
<Box borderRadius={16}>…
```

{{"demo": "pages/system/borders/BorderRadius.js"}}

## API

```js
import { borders } from '@material-ui/system';
```

| Nombre del import | Prop           | Propiedad CSS   | Clave del tema                                                   |
|:----------------- |:-------------- |:--------------- |:---------------------------------------------------------------- |
| `border`          | `border`       | `border`        | `borders`                                                        |
| `borderTop`       | `borderTop`    | `border-top`    | `borders`                                                        |
| `borderLeft`      | `borderLeft`   | `border-left`   | `borders`                                                        |
| `borderRight`     | `borderRight`  | `border-right`  | `borders`                                                        |
| `borderBottom`    | `borderBottom` | `border-bottom` | `borders`                                                        |
| `borderColor`     | `borderColor`  | `border-color`  | [`palette`](/customization/default-theme/?expend-path=$.palette) |
| `borderRadius`    | `borderRadius` | `border-radius` | [`shape`](/customization/default-theme/?expend-path=$.shape)     |