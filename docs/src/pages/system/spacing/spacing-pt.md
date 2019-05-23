# Espaçamento

<p class="description">A wide range of shorthand responsive margin and padding utility classes to modify an element’s appearance.</p>

## Notation

The space utility converts shorthand margin and padding props to margin and padding CSS declarations. The props are named using the format `{property}{sides}`.

Where *property* is one of:

- `m` - for classes that set *margin*
- `p` - for classes that set *padding*

Where *sides* is one of:

- `t` - for classes that set *margin-top* or *padding-top*
- `b` - for classes that set *margin-bottom* or *padding-bottom*
- `l` - for classes that set *margin-left* or *padding-left*
- `r` - for classes that set *margin-right* or *padding-right*
- `x` - for classes that set both **-left* and **-right*
- `y` - for classes that set both **-top* and **-bottom*
- blank - for classes that set a margin or padding on all 4 sides of the element

## Transformation

Depending on the input and the theme configuration, the following transformation is applied:

- input: `number` & theme: `number`: the property is multiplied by the theme value.

```jsx
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

- input: `number` & theme: `array`: the property is value is used as the array index.

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

- input: `number` & theme: `function`: the function is called with the property value.

```jsx
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```

- input: `string`: the property is passed as raw CSS value.

```jsx
<Box m="2rem" /> // margin: 2rem;
<Box mx="auto" /> // margin-left: auto; margin-right: auto;
```

## Exemplo

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

{{"demo": "pages/system/spacing/Demo.js"}}

## Horizontal centering

```jsx
<Box mx="auto">…
```

{{"demo": "pages/system/spacing/HorizontalCentering.js"}}

## API

```js
import { spacing } from '@material-ui/system';
```

| Nome da importação | Prop | Propriedade CSS                 | Chave do tema                                                    |
|:------------------ |:---- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`          | `m`  | `margin`                        | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `mt` | `margin-top`                    | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `mr` | `margin-right`                  | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `mb` | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `ml` | `margin-left`                   | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `mx` | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `p`  | `padding`                       | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `pt` | `padding-top`                   | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `pr` | `padding-right`                 | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `pb` | `padding-bottom`                | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `pl` | `padding-left`                  | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `px` | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`          | `py` | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |

*Some people find the property shorthand confusing, you can use the full version if you prefer:*

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```