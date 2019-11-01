---
title: React-компонент Таблица
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Таблицы

<p class="description">Data tables display sets of data. They can be fully customized.</p>

[Таблицы](https://material.io/design/components/data-tables.html) отображают информацию так, чтобы ее было легко воспринимать визуально. Так чтобы пользователи видели шаблоны отображения данных. Они могут быть встроены в основной контент, например в карточки.

Таблицы могут включать в себя:

- Соответствующую визуализацию
- Навигацию
- Инструменты для запросов и манипулирования данными

При использовании таких инструментов их следует размещать непосредственно сверху или снизу таблицы.

## Структура

Таблица данных содержит 1 строку заголовка, в которой перечислены имена столбцов, за которыми следуют строки для данных.

Флажки должны сопровождать каждую строку, если пользователю необходимо выбрать или манипулировать данными.

Для доступности(accessibility) первый столбец должен быть элементом `<th>` с атрибутом `scope` со значением `"row"`. Это позволяет программам чтения с экрана идентифицировать значение ячейки по имени строки и столбца.

## Простая таблица

Простой пример без излишеств.

{{"demo": "pages/components/tables/SimpleTable.js"}}

## Плотная компоновка таблицы

Простой пример таблицы с плотной компоновкой и без излишеств.

{{"demo": "pages/components/tables/DenseTable.js"}}

## Сортировка и выбор строк

В этом примере демонстрируется использование `чекбокса` и кликабельных строк для выбора данных в настраиваемой `панели инструментов`. Здесь используется компонент `TableSortLabel` чтобы помочь стилизовать заголовки столбцов.

Таблица имеет фиксированную ширину для демонстрации горизонтальной прокрутки. Чтобы предотвратить прокрутку элементов управления нумерацией страниц, компонент TablePagination находится за пределами таблицы. (В [примерe «собственные действия элементов нумерации»](#custom-table-pagination-action) ниже показывается управление нумерацией таблиц с помощью TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js"}}

## Customized tables

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js"}}

### Custom pagination options

It's possible to customise the options shown in the "Rows per page" select using the `rowsPerPageOptions` prop. You should either provide an array of:

- **numbers**, each number will be used for the option's label and value.
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50]} />
    ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for language strings such as 'All').
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
    ```

### Custom pagination actions

The `Action` property of the `TablePagination` component allows the implementation of custom actions.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Fixed header

An example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js"}}

## Spanning Table

A simple example with spanning rows & columns.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Virtualized Table

In the following example, we demonstrate how to use [react-virtualized](https://github.com/bvaughn/react-virtualized) with the `Table` component. Он отображает 200 строк и c легкостью может еще больше. Virtualization helps with performance issues.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться:

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) is a simple and powerful Datatable for React based on Material-UI Table with some additional features. They support many different use cases (editable, filtering, grouping, sorting, selection, i18n, tree data and more). You should check it out.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### Прочее

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/): A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([paid license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Responsive data tables for Material-UI with filtering, sorting, search and more.
- [tubular-react](https://github.com/unosquare/tubular-react): A Material-UI table with local or remote data-source. Featuring filtering, sorting, free-text search, export to CSV locally, and aggregations.

## Доступность

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js"}}