# Flexbox

<p class="description">Verwalten Sie schnell das Layout, die Ausrichtung und die Größe von Rasterspalten, Navigation, Komponenten und mehr mit einer umfassenden Suite von responsiven Flexbox-Dienstprogrammen.</p>

Wenn Sie **neu sind oder Flexbox nicht gut kennen**, empfehlen wir Ihnen, dies zu lesen: [CSS-Tricks Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Eigenschaften für das übergeordnete Element

### display

{{"demo": "pages/system/flexbox/Display.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box display="flex">…
```

### flex-direction

{{"demo": "pages/system/flexbox/FlexDirection.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box flexDirection="row">…
<Box flexDirection="row-reverse">…
```

### flex-wrap

{{"demo": "pages/system/flexbox/FlexWrap.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box flexWrap="nowrap">…
<Box flexWrap="wrap">…
```

### justify-content

{{"demo": "pages/system/flexbox/JustifyContent.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box justifyContent="flex-start">…
<Box justifyContent="flex-end">…
<Box justifyContent="center">…
```

### align-items

{{"demo": "pages/system/flexbox/AlignItems.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box alignItems="flex-start">…
<Box alignItems="flex-end">…
<Box alignItems="center">…
```

### align-content

{{"demo": "pages/system/flexbox/AlignContent.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box alignContent="flex-start">…
<Box alignContent="flex-end">…
```

## Eigenschaften für die untergeordneten Elemente

### order

{{"demo": "pages/system/flexbox/Order.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box order={2}>Item 1</Box>
<Box order={3}>Item 2</Box>
<Box order={1}>Item 3</Box>
```

### flex-grow

{{"demo": "pages/system/flexbox/FlexGrow.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box flexGrow={1}>Item 1</Box>
<Box>Item 2</Box>
<Box>Item 3</Box>
```

### flex-shrink

{{"demo": "pages/system/flexbox/FlexShrink.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box width="100%">Item 1</Box>
<Box flexShrink={1}>Item 2</Box>
<Box flexShrink={0}>Item 3</Box>
```

### align-self

{{"demo": "pages/system/flexbox/AlignSelf.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box>Item 1</Box>
<Box alignSelf="flex-end">Item 2</Box>
<Box>Item 3</Box>
```

## API

```js
import { flexbox } from '@material-ui/system';
```

| Inportname       | Eigenschaften    | CSS-Eigenschaft   | Theme-Schlüssel |
|:---------------- |:---------------- |:----------------- |:--------------- |
| `flexDirection`  | `flexDirection`  | `flex-direction`  | none            |
| `flexWrap`       | `flexWrap`       | `flex-wrap`       | none            |
| `justifyContent` | `justifyContent` | `justify-content` | none            |
| `alignItems`     | `alignItems`     | `align-items`     | none            |
| `alignContent`   | `alignContent`   | `align-content`   | none            |
| `order`          | `order`          | `order`           | none            |
| `flex`           | `flex`           | `flex`            | none            |
| `flexGrow`       | `flexGrow`       | `flex-grow`       | none            |
| `flexShrink`     | `flexShrink`     | `flex-shrink`     | none            |
| `alignSelf`      | `alignSelf`      | `align-self`      | none            |