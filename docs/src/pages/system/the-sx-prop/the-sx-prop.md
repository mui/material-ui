# The `sx` prop

<p class="description">The `sx` prop is a shortcut for defining custom style overrides for the components, using the theme.</p>
The property is a superset of CSS that packages [all the style functions](/system/basics/#all-inclusive) that are exposed in `@material-ui/system`.
You can specify any valid CSS using this prop.

## Example

{{"demo": "pages/system/the-sx-prop/Example.js", "bg": true, "defaultCodeOpen": false}}

On the example above, you can notice that some of the values are not valid CSS properties.
This is because the `sx` keys are mapped to specific properties of the theme.
In the following sections, you will learn how different CSS properties are mapped to specigic parts of the theme.

## Borders

The `border` property can receive only a number as a value and and it will create a solid black border using the number as the width.

```jsx
<Box sx={{ border: 1 }} /> // equivalent to border: '1px solid black'
```

The `borderColor` property can receive a string, which represents the path in the `theme.palette`.

```jsx
<Box sx={{ borderColor: 'primary.main' }} /> // equivalent as borderColor: theme => theme.palette.primary.main
```

The `borderRadius` properties multiples the value it receives by the `theme.shape.borderRadius` value (the default for the value is `4px`).

```jsx
<Box sx={{ borderRadius: 2 }} /> // equivalent as borderRadius: theme => 2 * theme.shape.borderRadius
```

## Display

The `displayPrint` property allows you to specify CSS `display` value, that will be applied only for priting.

```jsx
<Box sx={{ displayPrint: 'none' }} /> // equivalent as '@media print': { display: 'none' }
```

## Grid

The grid CSS properties `gap`, `rowGap` and `columnGap` multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`).

```jsx
<Box sx={{ gap: 2 }} /> // equivalent as gap: theme => theme.spacing(2)
```

## Palette

The `color` and `backgroundColor` properties can receive a string, which represents the path in the `theme.palette`.

```jsx
<Box sx={{ color: 'primary.main' }} /> // equivalent as color: theme => theme.palette.primary.main
```

The `backgroundColor` property is also available trough its alias `bgcolor`.

```jsx
<Box sx={{ bgcolor: 'primary.main' }} /> // equivalent as backgroundColor: theme => theme.palette.primary.main
```

## Positions

The `zIndex` property maps its value to the `theme.zIndex` value.

```jsx
<Box sx={{ zIndex: 'tooltip' }} /> // equivalent as backgroundColor: theme => theme.zIndex.tooltip
```

## Shadows

The `boxShadow` property maps its value to the `theme.shadows` value.

```jsx
<Box sx={{ boxShadow: 1 }} /> // equivalent as boxShadow: theme => theme.shadows[1]
```

## Sizing

The sizing properties: `width`, `height`, `minHeight`, `maxHeight`, `minWidth` and `maxWidth` are using the following custom transform function for the value:

```js
function transform(value) {
  return value <= 1 ? `${value * 100}%` : value;
}
```

Basically, if the value is between [0, 1] it is converted to percent, otherwise it is directly set on the CSS property.

```jsx
<Box sx={{ width: 0.5 }} /> // equivalent as width: '50%'
<Box sx={{ width: 20 }} /> // equivalent as width: '20px'
```

## Spacing

The spacing properties: `margin`, `padding` and the corresponding longhand properties multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`).

```jsx
<Box sx={{ margin: 2 }} /> // equivalent as margin: theme => theme.spacing(2)
```

The following aliases are availabel for the spacing properties:

| Prop | CSS property                    |
| :--- | :------------------------------ |
| `m`  | `margin`                        |
| `mt` | `margin-top`                    |
| `mr` | `margin-right`                  |
| `mb` | `margin-bottom`                 |
| `ml` | `margin-left`                   |
| `mx` | `margin-left`, `margin-right`   |
| `my` | `margin-top`, `margin-bottom`   |
| `p`  | `padding`                       |
| `pt` | `padding-top`                   |
| `pr` | `padding-right`                 |
| `pb` | `padding-bottom`                |
| `pl` | `padding-left`                  |
| `px` | `padding-left`, `padding-right` |
| `py` | `padding-top`, `padding-bottom` |

## Typography

The `fontFamily`, `fontSize`, `fontStyle`, `fontWeight` properties map their value to the `theme.typgraphy` value.

```jsx
<Box sx={{ fontWeight: 'fontWeightLight' }} /> // equivalent as fontWeight: theme.typography.fontWeightLight
```

The same can be achieved by ommiting the CSS property prefix `fontWeight`.

```jsx
<Box sx={{ fontWeight: 'light' }} /> // equivalent as fontWeight: theme.typography.fontWeightLight
```

There is additional `typography` prop available, which sets all values defined in the specific `theme.typography` variant.

```jsx
<Box sx={{ typography: 'body1' }} /> // equivalent as { ...theme.typography.body1 }
```

## Responsive values

All properties as part of the `sx` prop also have a support for defining different values for specific breakpoints. For more details on this, take a look at the [Responsive values section](/system/basics/#responsive-values).
