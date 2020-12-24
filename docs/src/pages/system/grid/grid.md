# Grid

<p class="description">Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive grid utilities.</p>

If you are **new to or unfamiliar with grid**, we encourage you to read this [CSS-Tricks grid](https://css-tricks.com/snippets/css/complete-guide-grid/) guide.

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

### grid-auto-rows

### gird-auto-flow

## Properties for the Children

### grid-column

### grid-row

### grid-area

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
