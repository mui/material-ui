---
title: React Grid component
components: Grid
---

# Grid

<p class="description">El grid responsive de Material Design se adapta al tamaño y orientación de la pantalla, garantizando la consistencia en todos los diseños.</p>

La [cuadrícula](https://material.io/design/layout/responsive-layout-grid.html) crea consistencia visual en la distribución de elementos a la vez que permite flexibilidad en una amplia variedad de diseños. La IU responsive de Material Design se basa en una distribución de cuadrícula de 12 columnas.

> ⚠️ The `Grid` component shouldn't be confused with a data grid; it is closer to a layout grid. For a data grid head to [the `DataGrid` component](/components/data-grid/).

## Cómo funciona

El sistema de cuadrícula se implementa con el componente `Grid`:

- Utiliza el [módulo Flexible Box de CSS](https://www.w3.org/TR/css-flexbox-1/) para una gran flexibilidad.
- Hay dos tipos de layout:*contenedores (containers)* y *elementos (items)*.
- Los anchos de los elementos se establecen en porcentajes, por lo que siempre son fluidos y tienen un tamaño relativo al elemento principal.
- Los elementos tienen padding para crear el espacio entre los elementos individuales.
- Hay cinco puntos de interrupción de la cuadrícula: xs, sm, md, lg y xl.

Si recién comienzas y no estás familiarizado con flexbox, te recomendamos leer la siguiente guía [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Espaciado

La cuadrícula responsive se centra en anchos de espaciado coherentes, en lugar de en el ancho de columna. Los márgenes y columnas de Material Design siguen una cuadrícula con línea-base cuadrada de **8dp**. La propiedad de espaciado es un número entero entre 0 y 10 inclusive. Por defecto, el espaciado entre dos elementos de la cuadrícula sigue una función lineal: `output(spacing)= spacing * 8px`, por ejemplo, `spacing={2}` crea un espacio de 16px.

Esta función de transformación de la salida se puede personalizar [usando el tema](/customization/spacing/).

{{"demo": "pages/components/grid/SpacingGrid.js", "bg": true}}

## Grids fluidos

El fluid grid usa columnas que escalan y redimensionan el contenido. Un layout de fluid grid puede usar separaciones para determinar si el layout necesita cambiar dramaticamente.

### Grid básica

Los anchos de columna se aplican en todos los breakepoints (ej. `xs` y superiores).

{{"demo": "pages/components/grid/CenteredGrid.js", "bg": true}}

### Grid con breakpoints

Algunas columnas tienen varios anchos definidos, causando que el layout cambie en el correspondiente breakpoint definido.

{{"demo": "pages/components/grid/FullWidthGrid.js", "bg": true}}

## Explora

Debajo de esta línea hay una demostración interactiva que permite explorar el resultado visual de las distintas configuraciones:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## Auto-layout

El Auto-layout (autodiseño) hace que los *items* compartan el espacio disponible equitativamente. Esto también quiere decir que puede establecer el ancho de un *item* y los otro se dimensionarán a partir de él.

{{"demo": "pages/components/grid/AutoGrid.js", "bg": true}}

## Grid Compleja

El siguiente ejemplo no sigue las directrices de Material Design, pero ilustra cómo el grid puede ser usado para dar forma a layouts complejas.

{{"demo": "pages/components/grid/ComplexGrid.js", "bg": true}}

## Grid Anidada

Las propiedades `container` y `item` son booleaneas e independientes. Pueden ser combinadas. 

> Un **contenedor** de flex es la caja generada por un elemento con la propiedad computada display con el valor de `flex` o `inline-flex`. Los hijos en el flujo de un contenedor flex se denominan flex **items** y se establecen mediante el modelo de layout flex.

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js", "bg": true}}

## Limitaciones

### Margen negativo

Existe una limitación con el margen negativo que utilizamos para implementar el espaciado entre los elementos. Un scroll horizontal aparecerá si un margen negativo va más allá del `<body>`. Hay 3 soluciones disponibles:

1. No usar la función de espaciado e implementarla en el espacio de usuario `spacing={0}` (por defecto).
2. Aplicar padding al padre con al menos la mitad del valor de espaciado aplicado al hijo:

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

3. Añadiendo `overflow-x: hidden;` al padre.

### white-space: nowrap;

La configuración inicial en los elementos flex es `min-width: auto`. Esto causa un conflicto en el posicionamiento cuando el hijo está usando `white-space: nowrap;`. Puede experimentar este problema con: 

```jsx
<Grid item xs>
  <Typography noWrap>
```

Para que el item permanezca dentro del contenedor necesita establecer `min-width: 0`. En la practica, puede establecer la propiedad `zeroMinWidth`:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

Though the `Grid` component has a `direction` property that allows values of `row`, `row-reverse`, `column`, and `column-reverse`, there are some features that are not supported within `column` and `column-reverse` containers. The properties which define the number of grids the component will use for a given breakpoint (`xs`, `sm`, `md`, `lg`, and `xl`) are focused on controlling width and do **not** have similar effects on height within `column` and `column-reverse` containers. If used within `column` or `column-reverse` containers, these properties may have undesirable effects on the width of the `Grid` elements.

## CSS Grid Layout

Material-UI doesn't provide any CSS Grid functionality itself, but as seen below you can easily use CSS Grid to layout your pages.

{{"demo": "pages/components/grid/CSSGrid.js", "bg": true}}