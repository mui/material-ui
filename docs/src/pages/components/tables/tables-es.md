---
title: Componente de React Table
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table (tabla)

<p class="description">Las tablas muestran conjuntos de datos. Pueden ser totalmente personalizadas.</p>

Las [tablas](https://material.io/design/components/data-tables.html) muestran información de una forma fácil de analizar, revelando así patrones e ideas a los usuarios. Se pueden integrar en contenido principal, tal como tarjetas.

Las tablas pueden incluir:

- Un elemento visual correspondiente
- Navegación
- Herramientas para consultar y manipular los datos

Cuando se incluyen herramientas, se deberían poner directamente arriba o debajo de la tabla.

## Estructura

Una tabla de datos contiene una cabecera en la parte superior con los nombres de las columnas, seguida por las filas de datos.

Un checkbox debe acompañar a cada fila por si el usuario necesita seleccionar o manipular datos.

Utiliza el componente `TableSortLabel` para ayudar a dar estilo a las cabeceras de las columnas. Esto permite a los lectores de pantalla identificar el valor de una celda por el nombre de su fila y columna.

## Tabla Sencilla

Un ejemplo sencillo sin florituras.

{{"demo": "pages/components/tables/SimpleTable.js", "bg": true}}

## Tabla Densa

Un Ejemplo de una tabla densa sin florituras.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Ordenando & Seleccionando

Este ejemplo demuestra el uso del `Checkbox` y las filas cliqueables para seleccionar, con una `Toolbar` personalizado. Utiliza el componente `TableSortLabel` para ayudar a dar estilo a las cabeceras de las columnas.

La Tabla tiene un ancho fijo para demostrar el desplazamiento horizontal. Para evitar que se desplacen los controles de paginación, el componente TablePagination se usa fuera de la Tabla. (El [ejemplo de la 'Acción de paginación de tabla personalizado'](#custom-pagination-actions) de abajo demuestra la paginación dentro del TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Tablas personalizadas

La siguiente tabla muestra un ejemplo de personalización del componente. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Opciones de paginación personalizada

Es posible personalizar las opciones en el item "Filas por página" usando la propiedad `rowsPerPageOptions`. Debes proveer alguna de estas opciones de array:

- **numbers**, cada número será usado para la etiqueta y el valor de la opción.
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50]} />
    ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for language strings such as 'All').
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
    ```

### Custom pagination actions

The `ActionsComponent` prop of the `TablePagination` component allows the implementation of custom actions.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Fixed header

An example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Collapsible table

An example of a table with expandable rows, revealing more information. It utilizes the [`Collapse`](/api/collapse/) component.

{{"demo": "pages/components/tables/CollapsibleTable.js", "bg": true}}

## Tabla Expandible

Un ejemplo sencillo con filas & columnas expandibles.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Tabla Virtualizada

En el siguiente ejemplo, demostramos como usar [react-virtualized](https://github.com/bvaughn/react-virtualized) con el componente `Table`. Renderiza 200 filas y fácilmente puede manejar más. La virtualización ayuda con problemas de rendimiento.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Proyectos relacionados

Para usos más avanzados tal vez puedas aprovercharte de:

### material-table

![estrellas](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![descargas npm](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) is a simple and powerful Datatable for React based on Material-UI Table with some additional features. They support many different use cases (editable, filtering, grouping, sorting, selection, i18n, tree data and more). You should check it out.

{{"demo": "pages/components/tables/MaterialTableDemo.js", "bg": true}}

### Otros

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/): A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([paid license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Responsive data tables for Material-UI with filtering, sorting, search and more.
- [tubular-react](https://github.com/unosquare/tubular-react): A Material-UI table with local or remote data-source. Featuring filtering, sorting, free-text search, export to CSV locally, and aggregations.

## Accesibilidad

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}