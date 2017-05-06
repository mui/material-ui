GridList
========

```jsx
<GridList>
  <GridTile>
    <img src="image.jpg" />
    <GridTileTitlebar title="GridTile" />
  </GridTile>
</GridList>
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| cellHeight | union:&nbsp;number<br>&nbsp;[object Object]<br> | 180 | Number of px for one cell height. You can set `'auto'` if you want to let the children determine the height. |
| children | node |  | Grid Tiles that will be in Grid List. |
| className | string |  | The CSS `className` of the root element. |
| cols | number | 2 | Number of columns. |
| padding | number | 4 | Number of px for the padding/spacing between items. |
| style | object |  | Override the inline-styles of the root element. |

Any other properties supplied will be spread to the root element.
