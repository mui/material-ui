---
title: React-компонент Таблица
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table (tаблица)

<p class="description">Таблицы отображают наборы данных. Они могут быть полностью модифицированы.</p>

[Tables](https://material.io/design/components/data-tables.html) display information in a way that’s easy to scan, so that users can look for patterns and insights. Они могут быть встроены в основной контент, например в карточки.

Таблицы могу включать в себя:

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

{{"demo": "pages/components/tables/SimpleTable.js", "bg": true}}

## Плотная компоновка таблицы

Простой пример таблицы с плотной компоновкой и без излишеств.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Сортировка и выбор строк

В этом примере демонстрируется использование `чекбокса` и кликабельных строк для выбора данных в настраиваемой `панели инструментов`. Здесь используется компонент `TableSortLabel` чтобы помочь стилизовать заголовки столбцов.

Таблица имеет фиксированную ширину для демонстрации горизонтальной прокрутки. Чтобы предотвратить прокрутку элементов управления нумерацией страниц, компонент TablePagination находится за пределами таблицы. (В [примерe «собственные действия элементов нумерации»](#custom-table-pagination-action) ниже показывается управление нумерацией таблиц с помощью TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Настраиваемые таблицы

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Пользовательские параметры разбивки на страницы

Возможна настройка параметров, отображаемых в "Строках на странице", используя `rowsPerPageOptions` prop. You should either provide an array of:

- **numbers**, each number will be used for the option's label and value.
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50]} />
    ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for language strings such as 'All').
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
    ```

### Пользовательские действия разбивки на страницы

Свойство `Action` компонента `TablePagination` позволяет реализовать собственную обработку пользовательский событий.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Фиксированный заголовок

Пример таблицы с прокручиваемыми строками и фиксированными заголовками столбцов. It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Объединение таблиц

Простой пример с объединением строк и столбцов.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Виртуализированная таблица

В следующем примере мы демонстрируем, как использовать [react-virtualized](https://github.com/bvaughn/react-virtualized) с компонентом `Table`. Он отображает 200 строк и c легкостью может еще больше. Virtualization helps with performance issues.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться:

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) представляет собой простой и мощный объект DataTable для React на основе Material-UI Table с некоторыми дополнительными функциями. They support many different use cases (editable, filtering, grouping, sorting, selection, i18n, tree data and more). You should check it out.

{{"demo": "pages/components/tables/MaterialTableDemo.js", "bg": true}}

### Прочее

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/): A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([paid license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Responsive data tables for Material-UI with filtering, sorting, search and more.
- [tubular-react](https://github.com/unosquare/tubular-react): A Material-UI table with local or remote data-source. Featuring filtering, sorting, free-text search, export to CSV locally, and aggregations.

## Доступность

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}