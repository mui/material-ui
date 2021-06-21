---
title: React Table component
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

Un ejemplo sencillo sin florituras.

Una tabla de datos contiene una cabecera en la parte superior con los nombres de las columnas, seguida por las filas de datos.

## Ordenando & Seleccionando

The `Table` component has a close mapping to the native `<table>` elements. This constraint makes building rich data tables challenging.

The [`DataGrid` component](/components/data-grid/) is designed for use-cases that are focused around handling a large amounts of tabular data. While it comes with a more rigid structure, in exchange, you gain more powerful features.

{{"demo": "pages/components/tables/DataTable.js", "bg": "inline"}}

## Tabla Sencilla

Un checkbox debe acompañar a cada fila por si el usuario necesita seleccionar o manipular datos.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Tabla Densa

Este ejemplo demuestra el uso del `Checkbox` y las filas cliqueables para seleccionar, con una `Toolbar` personalizado. Utiliza el componente `TableSortLabel` para ayudar a dar estilo a las cabeceras de las columnas.

La Tabla tiene un ancho fijo para demostrar el desplazamiento horizontal. Para evitar que se desplacen los controles de paginación, el componente TablePagination se usa fuera de la Tabla. (El [ejemplo de la 'Acción de paginación de tabla personalizado'](#custom-pagination-actions) de abajo demuestra la paginación dentro del TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Tablas personalizadas

He aquí un ejemplo de personalización del componente. You can learn more about this in the [overrides documentation page](/customization/components/).

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

La propiedad `ActionsComponent` del componente `TablePagination` permite la implementación de acciones personalizadas.

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

En el siguiente ejemplo, demostramos como usar [react-virtualized](https://github.com/bvaughn/react-virtualized) con el componente `Table`. Renderiza 200 filas y puede manejar más con facilidad. La virtualización ayuda con problemas de rendimiento.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Accesibilidad

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}