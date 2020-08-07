# Espaciado

<p class="description">Una amplia gama de tipos de utilidades de relleno y márgenes receptivos cortos para modificar la apariencia de un elemento.</p>

## Notación

La utilidad espacial convierte el abreviado del margen corto y los accesorios de relleno en márgenes y declaraciones CSS. Los props se nombran usando el formato `{property}{sides}`.

Donde *property* es una de:

- `m` - para clases que establecen *margen*
- `p` - para clases que establecen *padding*

Donde *sides* es uno de:

- `t` - para clases que establecen *margin-top* o *padding-top*
- `b` - para clases que establecen *margin-bottom* o *padding-bottom*
- `l` - para clases que establecen *margen-left* o *padding-left*
- `r` - para clases que establecen *margin-right* o *padding-right*
- `x` - para clases que establecen **-izquierda* y **-derecha*
- `y` - para clases que establecen **-top* y **-bottom*
- en blanco - para las clases que establecen un margen o un relleno en los 4 lados del elemento

## Transformación

Dependiendo del input y la configuración del tema, se aplica la siguiente transformación:

- input: `número` & theme: `número`: la propiedad se multiplica por el valor del tema.

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

## Ejemplo

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

## Centrado Horizontal

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box mx="auto">…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| Nombre del import | Prop | Propiedad CSS                   | Clave del tema                                                   |
|:----------------- |:---- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`         | `m`  | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mt` | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mr` | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mb` | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `ml` | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `mx` | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `p`  | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pt` | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pr` | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pb` | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `pl` | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `px` | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`         | `py` | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |


*Algunas personas encuentran confusión con la abreviatura del prop, puedes usar la versión completa si lo prefieres:*

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```

```diff
-<Box px={2} />
+<Box paddingX={2} />
```