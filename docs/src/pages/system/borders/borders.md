# Borders

<p class="description">Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons, or any other element.</p>

## Border

Use border utilities to add or remove an element’s borders. Choose from all borders or one at a time.

### Additive

{{"demo": "pages/system/borders/BorderAdditive.js", "defaultCodeOpen": false}}

```jsx
<Box border={1}>…
<Box borderTop={1}>…
<Box borderRight={1}>…
<Box borderBottom={1}>…
<Box borderLeft={1}>…
```

### Subtractive

{{"demo": "pages/system/borders/BorderSubtractive.js", "defaultCodeOpen": false}}

```jsx
<Box border={0}>…
<Box borderTop={0}>…
<Box borderRight={0}>…
<Box borderBottom={0}>…
<Box borderLeft={0}>…
```

## Border color

{{"demo": "pages/system/borders/BorderColor.js", "defaultCodeOpen": false}}

```jsx
<Box borderColor="primary.main">…
<Box borderColor="secondary.main">…
<Box borderColor="error.main">…
<Box borderColor="grey.500">…
<Box borderColor="text.primary">…
<Box borderColor="text.primary">…
<Box borderTopColor="primary.main" 
  borderRightColor="secondary.main" 
  borderBottomColor="error.main"
  borderLeftColor="grey.500"
/>
```

## Border-radius

{{"demo": "pages/system/borders/BorderRadius.js", "defaultCodeOpen": false}}

```jsx
<Box borderRadius="50%">…
<Box borderRadius="borderRadius">…
<Box borderRadius={16}>…
```

## API

```js
import { borders } from '@material-ui/system';
```

| Import name | Prop | CSS property | Theme key |
|:------------|:-----|:-------------|:----------|
| `border` | `border` | `border` | `borders` |
| `borderColor` | `borderColor` | `border-color` | [`palette`](/customization/default-theme/?expend-path=$.palette) |
| `borderTop` | `borderTop` | `border-top` | `borders` |
| `borderTopColor` | `borderTopColor` | `border-top-color` | [`palette`](/customization/default-theme/?expend-path=$.palette) |
| `borderRight` | `borderRight` | `border-right` | `borders` |
| `borderRightColor` | `borderRightColor` | `border-right-color` | [`palette`](/customization/default-theme/?expend-path=$.palette) |
| `borderBottom` | `borderBottom` | `border-bottom` | `borders` |
| `borderBottomColor` | `borderBottomColor` | `border-bottom-color` | [`palette`](/customization/default-theme/?expend-path=$.palette) |
| `borderLeft` | `borderLeft` | `border-left` | `borders` |
| `borderLeftColor` | `borderLeftColor` | `border-left-color` | [`palette`](/customization/default-theme/?expend-path=$.palette) |
| `borderRadius` | `borderRadius` | `border-radius` | [`shape`](/customization/default-theme/?expend-path=$.shape) |
