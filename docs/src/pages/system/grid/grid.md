# Grid

<p class="description">Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive grid utilities.</p>

If you are **new to or unfamiliar with grid**, you're encourage to read this [CSS-Tricks grid](https://css-tricks.com/snippets/css/complete-guide-grid/) guide.

## Properties for the Parent

### display

{{"demo": "pages/system/grid/Display.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ display: 'grid' }}>…
<Box sx={{ display: 'inline-grid' }}>…
```

### grid-template-rows

{{"demo": "pages/system/grid/GridTemplateRows.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridTemplateRows: '25% 80px auto' }}>…
```

### grid-template-columns

{{"demo": "pages/system/grid/GridTemplateColumns.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridTemplateColumns: '40px 50px auto 50px 40px' }}>…
```

### row-gap

{{"demo": "pages/system/grid/RowGap.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ rowGap: '10px' }}>…
```

### column-gap

{{"demo": "pages/system/grid/ColumnGap.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ columnGap: '10px' }}>…
```

### gap

{{"demo": "pages/system/grid/Gap.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gap: '10px' }}>…
```

### grid-template-areas

{{"demo": "pages/system/grid/GridTemplateAreas.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridTemplateAreas:
  `"header header header header"
   "main main . sidebar"
   "footer footer footer footer"`
}}>…
```

### grid-auto-columns

{{"demo": "pages/system/grid/GridAutoColumns.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridAutoColumns: '60px' }}>…
```

### grid-auto-rows

{{"demo": "pages/system/grid/GridAutoRows.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridAutoRows: '20px' }}>…
```

### grid-auto-flow

{{"demo": "pages/system/grid/GridAutoFlow.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridAutoFlow: 'row' }}>…
```

## Properties for the Children

### grid-column

The `grid-column` property is a shorthand for `grid-column-start` + `grid-column-end`. You can see how it's used in the [grid-auto-columns example](/system/grid/#grid-auto-columns).

```jsx
<Box sx={{ gridColumn: '1 / 3' }}>…
```

### grid-row

The `grid-row` property is a shorthand for `grid-row-start` + `grid-row-end`. You can see how it's used in the [grid-auto-rows example](/system/grid/#grid-auto-rows).

```jsx
<Box sx={{ gridRow: '1 / 3' }}>…
```

### grid-area

The `grid-area` property allows you to give an item a name so that it can be referenced by a template created with the `grid-template-areas` property. You can see how it's used in the [grid-template-area example](/system/grid/#grid-template-areas).

```jsx
<Box sx={{ gridArea: 'header' }}>…
```

## API

```js
import { flexbox } from '@material-ui/system';
```

| Import name           | Prop                  | CSS property            | Theme key |
| :-------------------- | :-------------------- | :---------------------- | :-------- |
| `gap`                 | `gap`                 | `gap`                   | none      |
| `columnGap`           | `columnGap`           | `column-gap`            | none      |
| `rowGap`              | `rowGap`              | `row-gap`               | none      |
| `gridColumn`          | `gridColumn`          | `grid-column`           | none      |
| `gridRow`             | `gridRow`             | `grid-row`              | none      |
| `gridAutoFlow`        | `gridAutoFlow`        | `grid-auto-flow`        | none      |
| `gridAutoColumns`     | `gridAutoColumns`     | `grid-auto-columns`     | none      |
| `gridAutoRows`        | `gridAutoRows`        | `grid-auto-rows`        | none      |
| `gridTemplateColumns` | `gridTemplateColumns` | `grid-template-columns` | none      |
| `gridTemplateRows`    | `gridTemplateRows`    | `grid-template-rows`    | none      |
| `gridTemplateAreas`   | `gridTemplateAreas`   | `grid-template-areas`   | none      |
| `gridArea`            | `gridArea`            | `grid-area`             | none      |
