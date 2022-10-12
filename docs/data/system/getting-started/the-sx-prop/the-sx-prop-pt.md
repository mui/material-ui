# The sx prop

<p class="description">The sx prop is a shortcut for defining custom styles that has access to the theme.</p>

The `sx` prop lets you work with a superset of CSS that packages all of the style functions exposed in `@mui/system`. You can specify any valid CSS using this prop, as well as many _theme-aware_ properties that are unique to MUI System.

## Basic example

The following demo illustrates how to work with the `sx` prop. Note that not all of the values are valid CSS properties—that's because the `sx` keys are mapped to specific properties of the theme. The rest of this document explores this concept in more detail.

{{"demo": "Example.js", "bg": true, "defaultCodeOpen": true}}

## Theme-aware properties

### Borders

The `border` property can only receive a number as a value. It creates a solid black border using the number to define the width in pixels:

```jsx
<Box sx={{ border: 1 }} />
// equivalente à border: '1px solid black'
```

The `borderColor` property can receive a string, which represents the path in `theme.palette`:

```jsx
<Box sx={{ borderColor: 'primary.main' }} />
// equivalente à borderColor: theme => theme.palette.primary.main
```

The `borderRadius` property multiplies the value it receives by the `theme.shape.borderRadius` value (the default for this value is `4px`).

```jsx
<Box sx={{ borderRadius: 2 }} />
// equivalente à borderRadius: theme => 2 * theme.shape.borderRadius
```

Read more on the [Borders page](/system/borders/).

### Display

The `displayPrint` property allows you to specify a CSS `display` value that will only be applied when printing:

```jsx
<Box sx={{ displayPrint: 'none' }} /> // equivalent to '@media print': { display: 'none' }
```

Read more on the [Display page](/system/display/).

### Grid

The CSS Grid properties `gap`, `rowGap` and `columnGap` multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`).

```jsx
<Box sx={{ gap: 2 }} />
// equivalent to gap: theme => theme.spacing(2)
```

Read more on the [Grid page](/system/grid/).

### Palette

The `color` and `backgroundColor` properties can receive a string, which represents the path in `theme.palette`:

```jsx
<Box sx={{ color: 'primary.main' }} />
// equivalent to color: theme => theme.palette.primary.main
```

The `backgroundColor` property is also available through its alias `bgcolor`:

```jsx
<Box sx={{ bgcolor: 'primary.main' }} />
// equivalent to backgroundColor: theme => theme.palette.primary.main
```

Read more on the [Palette page](/system/palette/).

### Positions

The `zIndex` property maps its value to the `theme.zIndex` value:

```jsx
<Box sx={{ zIndex: 'tooltip' }} />
// equivalent to zIndex: theme => theme.zIndex.tooltip
```

Read more on the [Positions page](/system/positions/).

### Shadows

The `boxShadow` property maps its value to the `theme.shadows` value:

```jsx
<Box sx={{ boxShadow: 1 }} />
// equivalent to boxShadow: theme => theme.shadows[1]
```

Read more on the [Shadows page](/system/shadows/).

### Sizing

The sizing properties `width`, `height`, `minHeight`, `maxHeight`, `minWidth`, and `maxWidth` use the following custom transform function for the value:

```js
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
```

If the value is between [0, 1], it's converted to a percentage. Otherwise, it is directly set on the CSS property:

```jsx
<Box sx={{ width: 1/2 }} /> // equivalente a width: '50%'
<Box sx={{ width: 20 }} /> // equivalente a width: '20px'
```

Read more on the [Sizing page](/system/sizing/).

### Spacing

The spacing properties `margin`, `padding`, and the corresponding longhand properties multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`):

```jsx
<Box sx={{ margin: 2 }} />
// equivalent to margin: theme => theme.spacing(2)
```

The following aliases are available for the spacing properties:

| Prop | CSS property                    |
|:---- |:------------------------------- |
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

Read more on the [Spacing page](/system/spacing/).

### Typography

The `fontFamily`, `fontSize`, `fontStyle`, `fontWeight` properties map their value to the `theme.typography` value:

```jsx
<Box sx={{ fontWeight: 'fontWeightLight' }} />
//equivalente à fontWeight: theme.typography.fontWeightLight
```

The same can be achieved by omitting the CSS property prefix `fontWeight`:

```jsx
<Box sx={{ fontWeight: 'light' }} />
//equivalente à fontWeight: theme.typography.fontWeightLight
```

There is an additional `typography` prop available, which sets all values defined in the specific `theme.typography` variant:

```jsx
<Box sx={{ typography: 'body1' }} />
// equivalent to { ...theme.typography.body1 }
```

Read more on the [Typography page](/system/typography/).

## Responsive values

All properties associated with the `sx` prop also support responsive values for specific breakpoints.

Read more on the [Usage page—Responsive values](/system/getting-started/usage/#responsive-values).

## Callback values

Each property in the `sx` prop can receive a function callback as a value. This is useful when you want to use the `theme` for calculating a value:

```jsx
<Box sx={{ height: (theme) => theme.spacing(10) }} />
```

The `sx` prop can also receive a callback when you need to get theme values that are objects:

```jsx
<Box
  sx={(theme) => ({
    ...theme.typography.body,
    color: theme.palette.primary.main,
  })}
/>
```

## Array values

Array types are useful when you want to partially override some styles in the former index:

```jsx
<Box
  sx={[
    {
      '&:hover': {
        color: 'red',
        backgroundColor: 'white',
      },
    },
    foo && {
      '&:hover': { backgroundColor: 'grey' },
    },
    bar && {
      '&:hover': { backgroundColor: 'yellow' },
    },
  ]}
/>
```

When you hover on this element, `color: red; backgroundColor: white;` is applied.

If `foo: true`, then `color: red; backgroundColor: grey;` is applied when hovering.

If `bar: true`, then `color: red; backgroundColor: yellow;` is applied when hovering regardless of `foo` value, because the higher index of the array has higher specificity.

:::info
Each index can be an object or a callback.
:::

```jsx
<Box
  sx={[
    { mr: 2, color: 'red' },
    (theme) => ({
      '&:hover': {
        color: theme.palette.primary.main,
      },
    }),
  ]}
/>
```

## Passing the sx prop

If you want to receive the `sx` prop from a custom component and pass it down to an MUI component, we recommend this approach:

{{"demo": "PassingSxProp.js", "bg": true, "defaultCodeOpen": true}}

## TypeScript usage

A frequent source of confusion with the `sx` prop is TypeScript's [type widening](https://mariusschulz.com/blog/literal-type-widening-in-typescript), which causes this example not to work as expected:

```ts
const style = {
  flexDirection: 'column',
};

export default function App() {
  return <Button sx={style}>Example</Button>;
}
//    Type '{ flexDirection: string; }' is not assignable to type 'SxProps<Theme> | undefined'.
//    Type '{ flexDirection: string; }' is not assignable to type 'CSSSelectorObject<Theme>'.
//      Property 'flexDirection' is incompatible with index signature.
//        Type 'string' is not assignable to type 'SystemStyleObject<Theme>'.
```

The problem is that the type of the `flexDirection` prop is inferred as `string`, which is too wide. To fix this, you can cast the object/function passed to the `sx` prop to `const`:

```ts
const style = {
  flexDirection: 'column',
} as const;

export default function App() {
  return <Button sx={style}>Example</Button>;
}
```

Alternatively, you can pass the style object directly to the `sx` prop:

```ts
export default function App() {
  return <Button sx={{ flexDirection: 'column' }}>Example</Button>;
}
```

## Performance

To learn more about the performance tradeoffs of the `sx` prop, check out [Usage–Performance tradeoffs](/system/getting-started/usage/#performance-tradeoffs).
