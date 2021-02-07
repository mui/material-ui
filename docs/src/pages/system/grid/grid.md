# Grid

<p class="description">Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive grid utilities.</p>

If you are **new to or unfamiliar with grid**, you're encourage to read this [CSS-Tricks grid](https://css-tricks.com/snippets/css/complete-guide-grid/) guide.

## Properties for the Parent

### display

In order to define a `grid` container you must specify the `display` CSS property to have one of the values: `grid` or `inline-grid`.

{{"demo": "pages/system/grid/Display.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ display: 'grid' }}>…</Box>
<Box sx={{ display: 'inline-grid' }}>…</Box>
```

### grid-template-rows

The `grid-template-rows` property defines the line names and track sizing functions of the grid rows.

{{"demo": "pages/system/grid/GridTemplateRows.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>
```

### grid-template-columns

The `grid-template-columns` property defines the line names and track sizing functions of the grid columns.

{{"demo": "pages/system/grid/GridTemplateColumns.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Box>
```

### gap

The `gap: size` property specifies the gap between the different items inside the `grid`.

{{"demo": "pages/system/grid/Gap.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gap: 1, gridTemplateColumns: 'repeat(2, 0.5fr)' }}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</Box>
```

### row-gap & column-gap

The `row-gap` and `column-gap` gives the possibility for specifying the row and column gaps independently.

{{"demo": "pages/system/grid/RowAndColumnGap.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ columnGap: 1, rowGap: 2, gridTemplateColumns: 'repeat(2, 0.5fr)' }}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</Box>
```

### grid-template-areas

The `grid-template-area` property defines a grid template by referencing the names of the grid areas which are specified with the `grid-area` property.

{{"demo": "pages/system/grid/GridTemplateAreas.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box
  sx={{
    gridTemplateAreas: `"header header header header"
   "main main . sidebar"
   "footer footer footer footer"`,
  }}
>
  <Box sx={{ gridArea: 'header' }} />
  <Box sx={{ gridArea: 'main' }} />
  <Box sx={{ gridArea: 'sidebar' }} />
  <Box sx={{ gridArea: 'footer' }} />
</Box>
```

### grid-auto-columns

The `grid-auto-column` property specifies the size of an implicitly-created grid column track or pattern of tracks.

{{"demo": "pages/system/grid/GridAutoColumns.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridAutoColumns: '0.2fr' }}>
  <Box sx={{ gridRow: '1', gridColumn: '1 / 3' }}>1 / 3</GridItem>
  <Box sx={{ gridRow: '1', gridColumn: '4 / 5' }}>4 / 5</GridItem>
</Box>
```

You can see on the screenshot below that the third non-visible column have width of `0.2fr`, which is approximately `20%`.

<div style="display: flex; justify-content: center;">
  <img alt="grid-auto-column" src="/static/images/system/grid-auto-column.png" width="669" />
</div>

### grid-auto-rows

The `grid-auto-rows` property specifies the size of an implicitly-created grid row track or pattern of tracks.

{{"demo": "pages/system/grid/GridAutoRows.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridAutoRows: '40px' }}>
  {/* The third non-visible row has height of 40px */}
  <Box sx={{ gridColumn: '1', gridRow: '1 / 3' }}>1 / 3</Box>
  <Box sx={{ gridColumn: '1', gridRow: '4 / 5' }}>4 / 5</Box>
</Box>
```

### grid-auto-flow

The `grid-auto-flow` property controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid.

{{"demo": "pages/system/grid/GridAutoFlow.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ gridAutoFlow: 'row' }}>
  <Box sx={{ gridColumn: '1', gridRow: '1 / 3' }}>1</Box>
  <Box>2</Box>
  <Box>3</Box>
  <Box>4</Box>
  <Box sx={{ gridColumn: '5', gridRow: '1 / 3' }}>5</Box>
</Box>
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
