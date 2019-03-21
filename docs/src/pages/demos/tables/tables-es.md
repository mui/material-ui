---
title: Componente de React Table
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---
# Tablas

<p class="description">Las tablas de datos muestran conjuntos de datos. Pueden ser totalmente personalizadas.</p>

[Las tablas de datos](https://material.io/design/components/data-tables.html) muestran información de una manera que es fácil de ojear, de modo que los usuarios pueden buscar patrones e información. Se pueden integrar en contenido principal, tal como tarjetas.

Las tablas de datos pueden incluir:

- Un elemento visual correspondiente
- Navegación
- Herramientas para consultar y manipular los datos

Cuando se incluyen herramientas, se deberían poner directamente arriba o debajo de la tabla.

## Estructura

Una tabla de datos contiene una cabecera en la parte superior con los nombres de las columnas, seguida por las filas de datos.

Un checkbox debe acompañar a cada fila por si el usuario necesita seleccionar o manipular datos.

Para facilitar la accesibilidad, la primera columna es un elemento `<th>`, con un `scope` de `"row"`. Esto permite a los lectores de pantalla identificar el valor de una celda por el nombre de su fila y columna.

## Tabla Sencilla

Un ejemplo sencillo sin florituras.

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## Tabla Densa

Un Ejemplo de una tabla densa sin florituras.

{{"demo": "pages/demos/tables/DenseTable.js"}}

## Ordenando & Seleccionando

Este ejemplo demuestra el uso del `Checkbox` y las filas cliqueables para seleccionar, con una `Toolbar` personalizado. Utiliza el componente `TableSortLabel` para ayudar a dar estilo a las cabeceras de las columnas.

La Tabla tiene un ancho fijo para demostrar el desplazamiento horizontal. Para evitar que se desplacen los controles de paginación, el componente TablePagination se usa fuera de la Tabla. (El [ejemplo de la 'Acción de paginación de tabla personalizado'](#custom-table-pagination-action) de abajo demuestra la paginación dentro del TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Tablas personalizadas

Si has estado leyendo la [página de documentación sobre overrides](/customization/overrides/) pero aún no tienes la confianza suficiente para usarlos, a continuación hay ejemplos de su uso para cambiar el estilo de un `TableCell`.

⚠️ A pesar de que la especificación de material design anima a usar temas, este ejemplo no es común.

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## Acción de paginación de tabla personalizada

El atributo `Action`del componente `TablePagination` permite implementar acciones personalizadas.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## Tabla Expandible

Un ejemplo sencillo con filas & columnas expandibles.

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## Tabla Virtualizada

En el siguiente ejemplo, demostramos como usar [react-virtualized](https://github.com/bvaughn/react-virtualized) con el componente `Table`. Renderiza 200 filas y fácilmente puede manejar más.

{{"demo": "pages/demos/tables/ReactVirtualizedTable.js"}}

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) Una tabla de datos para Material-UI con herramientas de paginación, ordenación, filtración, agrupación y revisión ([licencia customizada](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Tablas de datos responsivas para Material-UI con filtración, ordenación, búsqueda y más.
- [material-table](https://github.com/mbrn/material-table) DataTable basada en el componente de tabla con herramientas adicionales como búsqueda, filtración, ordenación y mucho más.
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) Tabla de Material-UI virtualizado.
- [mui-tables](https://parkerself.gitbook.io/mui-table/) Customizable table for managing complex data. Features a summary row, de-duplication & merging, as well as filtering, search, etc.