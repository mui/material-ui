# The `sx` prop

<p class="description">A propriedade `sx` é um atalho para definir o estilo personalizado com acesso ao tema.</p>

The property is a superset of CSS that packages [all the style functions](/system/basics/#all-inclusive) that are exposed in `@mui/system`. Você pode especificar qualquer CSS válido usando este propriedade.

## Example

{{"demo": "Example.js", "bg": true, "defaultCodeOpen": true}}

No exemplo acima, você pode notar que alguns dos valores não são propriedades válidas do CSS. Isso porque as teclas `sx` são mapeadas para propriedades específicas do tema. Nas seções a seguir, você aprenderá como diferentes propriedades `sx` são mapeadas para partes específicas do tema.

## Theme aware properties

### Borders

The `border` property can receive only a number as a value. It creates a solid black border using the number as the width.

```jsx
<Box sx={{ border: 1 }} />
// equivalente à border: '1px solid black'
```

A propriedade `borderColor` pode receber uma string, que representa o caminho no `theme.palette`.

```jsx
<Box sx={{ borderColor: 'primary.main' }} />
// equivalente à borderColor: theme => theme.palette.primary.main
```

As propriedades `borderRadius` multiplicam o valor recebido pelo valor `theme.shape.borderRadius` (o padrão para o valor é `4px`).

```jsx
<Box sx={{ borderRadius: 2 }} />
// equivalente à borderRadius: theme => 2 * theme.shape.borderRadius
```

_Head to the [borders page](/system/borders/) for more details._

### Display

A propriedade `displayPrint` permite que você especifique o valor de `display`, que será aplicado somente para impressão.

```jsx
<Box sx={{ displayPrint: 'none' }} /> // equivalent to '@media print': { display: 'none' }
```

_Head to the [display page](/system/display/) for more details._

### Grid

The grid CSS properties `gap`, `rowGap` and `columnGap` multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`).

```jsx
<Box sx={{ gap: 2 }} />
// equivalent to gap: theme => theme.spacing(2)
```

_Head to the [grid page](/system/grid/) for more details._

### Palette

As propriedades `color` e `backgroundColor` podem receber uma string, que representa o caminho no `theme.palette`.

```jsx
<Box sx={{ color: 'primary.main' }} />
// equivalent to color: theme => theme.palette.primary.main
```

The `backgroundColor` property is also available trough its alias `bgcolor`.

```jsx
<Box sx={{ bgcolor: 'primary.main' }} />
// equivalent to backgroundColor: theme => theme.palette.primary.main
```

_Head to the [palette page](/system/palette/) for more details._

### Positions

The `zIndex` property maps its value to the `theme.zIndex` value.

```jsx
<Box sx={{ zIndex: 'tooltip' }} />
// equivalent to zIndex: theme => theme.zIndex.tooltip
```

_Head to the [positions page](/system/positions/) for more details._

### Shadows

The `boxShadow` property maps its value to the `theme.shadows` value.

```jsx
<Box sx={{ boxShadow: 1 }} />
// equivalent to boxShadow: theme => theme.shadows[1]
```

_Head to the [shadows page](/system/shadows/) for more details._

### Sizing

As propriedades de dimensionamento: `with`, `height`, `minHeight`, `maxHeight`, `minWidth` e `maxWidth` estão usando a seguinte função de transformação personalizada para o valor:

```js
function transform(value) {
  return value <= 1 ? `${value * 100}%` : value;
}
```

If the value is between [0, 1], it's converted to percent. Otherwise, it is directly set on the CSS property.

```jsx
<Box sx={{ width: 1/2 }} /> // equivalente a width: '50%'
<Box sx={{ width: 20 }} /> // equivalente a width: '20px'
```

_Head to the [sizing page](/system/sizing/) for more details._

### Spacing

The spacing properties: `margin`, `padding` and the corresponding longhand properties multiply the values they receive by the `theme.spacing` value (the default for the value is `8px`).

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

_Head to the [spacing page](/system/spacing/) for more details._

### Typography

As propriedades `fontFamily`, `fontSize`, `fontStyle`, `fontWeight` mapeiam seus valores para o valor de `theme.typography`.

```jsx
<Box sx={{ fontWeight: 'fontWeightLight' }} />
//equivalente à fontWeight: theme.typography.fontWeightLight
```

The same can be achieved by omitting the CSS property prefix `fontWeight`.

```jsx
<Box sx={{ fontWeight: 'light' }} />
//equivalente à fontWeight: theme.typography.fontWeightLight
```

There is additional `typography` prop available, which sets all values defined in the specific `theme.typography` variant.

```jsx
<Box sx={{ typography: 'body1' }} />
// equivalent to { ...theme.typography.body1 }
```

_Head to the [typography page](/system/typography/) for more details._

## Responsive values

All properties as part of the `sx` prop also have a support for defining different values for specific breakpoints. For more details on this, take a look at the [Responsive values section](/system/basics/#responsive-values).

## Callback values

Each property in the `sx` prop can receive a function callback as a value. This is useful when you want to use the `theme` for calculating some value.

```jsx
<Box sx={{ height: (theme) => theme.spacing(10) }} />
```

`sx` can also receive a callback when you need to get theme values that are object:

```jsx
<Box
  sx={(theme) => ({
    ...theme.typography.body,
    color: theme.palette.primary.main,
  })}
/>
```

## Array values

Array type is useful when you want to partially override some styles in the former index:

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

If `foo: true`, the `color: red; backgroundColor: grey;` is applied when hover.

If `bar: true`, the `color: red; backgroundColor: yellow;` is applied when hover regardless of `foo` value, because the higher index of the array has higher specificity.

> **Note**: Each index can be an `object` or `callback`

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

## Passing `sx` prop

If you want to receive `sx` prop from your component and pass it down to MUI's component, we recommend this approach:

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

The problem is that the type of the `flexDirection` prop is inferred as `string`, which is too wide. To fix this, you can cast the object/function passed to the `sx` prop to const:

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

### `fill` callback gives theme type as `any`

Since `sx` can be an array type, there is a conflict in type of `Array.fill` and CSS's `fill` property when define value as a callback. As a workaround, you can explicitly define the theme like this:

```tsx
import { Theme } from '@mui/material/styles';

<Box
  sx={{
    fill: (theme: Theme) => theme.palette.primary.main,
  }}
/>;
```

> Let us know or [submit a PR](https://github.com/mui/material-ui/pulls) if you have a proper way to fix this issue. 🙏

## Performance

If you are interested in the performance tradeoff, you can find more details [here](/system/basics/#performance-tradeoff).
