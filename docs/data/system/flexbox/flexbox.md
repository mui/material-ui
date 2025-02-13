# Flexbox

<p class="description">Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities.</p>

If you are **new to or unfamiliar with flexbox**, we encourage you to read this [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) guide.

## Properties for the Parent

### display

{{"demo": "Display.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ display: 'flex' }}>…
<Box sx={{ display: 'inline-flex' }}>…
```

### flex-direction

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction" target="_blank" rel="noopener">flex-direction</a>
on MDN.

{{"demo": "FlexDirection.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ flexDirection: 'row' }}>…
<Box sx={{ flexDirection: 'row-reverse' }}>…
<Box sx={{ flexDirection: 'column' }}>…
<Box sx={{ flexDirection: 'column-reverse' }}>…
```

### flex-wrap

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap" target="_blank" rel="noopener">flex-wrap</a>
on MDN.

{{"demo": "FlexWrap.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ flexWrap: 'nowrap' }}>…
<Box sx={{ flexWrap: 'wrap' }}>…
<Box sx={{ flexWrap: 'wrap-reverse' }}>…
```

### justify-content

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content" target="_blank" rel="noopener">justify-content</a>
on MDN.

{{"demo": "JustifyContent.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ justifyContent: 'flex-start' }}>…
<Box sx={{ justifyContent: 'flex-end' }}>…
<Box sx={{ justifyContent: 'center' }}>…
<Box sx={{ justifyContent: 'space-between' }}>…
<Box sx={{ justifyContent: 'space-around' }}>…
<Box sx={{ justifyContent: 'space-evenly' }}>…
```

### align-items

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items" target="_blank" rel="noopener">align-items</a>
on MDN.

{{"demo": "AlignItems.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ alignItems: 'flex-start' }}>…
<Box sx={{ alignItems: 'flex-end' }}>…
<Box sx={{ alignItems: 'center' }}>…
<Box sx={{ alignItems: 'stretch' }}>…
<Box sx={{ alignItems: 'baseline' }}>…
```

### align-content

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-content" target="_blank" rel="noopener">align-content</a>
on MDN.

{{"demo": "AlignContent.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ alignContent: 'flex-start' }}>…
<Box sx={{ alignContent: 'flex-end' }}>…
<Box sx={{ alignContent: 'center' }}>…
<Box sx={{ alignContent: 'space-between' }}>…
<Box sx={{ alignContent: 'space-around' }}>…
<Box sx={{ alignContent: 'stretch' }}>…
```

## Properties for the Children

### order

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/order" target="_blank" rel="noopener">order</a>
on MDN.

{{"demo": "Order.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ order: 2 }}>Item 1</Box>
<Box sx={{ order: 3 }}>Item 2</Box>
<Box sx={{ order: 1 }}>Item 3</Box>
```

### flex-grow

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow" target="_blank" rel="noopener">flex-grow</a>
on MDN.

{{"demo": "FlexGrow.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ flexGrow: 1 }}>Item 1</Box>
<Box>Item 2</Box>
<Box>Item 3</Box>
```

### flex-shrink

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink" target="_blank" rel="noopener">flex-shrink</a>
on MDN.

{{"demo": "FlexShrink.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ width: '100%' }}>Item 1</Box>
<Box sx={{ flexShrink: 1 }}>Item 2</Box>
<Box sx={{ flexShrink: 0 }}>Item 3</Box>
```

### align-self

For more information please see
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-self" target="_blank" rel="noopener">align-self</a>
on MDN.

{{"demo": "AlignSelf.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box>Item 1</Box>
<Box sx={{ alignSelf: 'flex-end' }}>Item 2</Box>
<Box>Item 3</Box>
```

## API

```js
import { flexbox } from '@mui/system';
```

| Import name      | Prop             | CSS property      | Theme key |
| :--------------- | :--------------- | :---------------- | :-------- |
| `flexDirection`  | `flexDirection`  | `flex-direction`  | none      |
| `flexWrap`       | `flexWrap`       | `flex-wrap`       | none      |
| `justifyContent` | `justifyContent` | `justify-content` | none      |
| `alignItems`     | `alignItems`     | `align-items`     | none      |
| `alignContent`   | `alignContent`   | `align-content`   | none      |
| `order`          | `order`          | `order`           | none      |
| `flex`           | `flex`           | `flex`            | none      |
| `flexGrow`       | `flexGrow`       | `flex-grow`       | none      |
| `flexShrink`     | `flexShrink`     | `flex-shrink`     | none      |
| `alignSelf`      | `alignSelf`      | `align-self`      | none      |
