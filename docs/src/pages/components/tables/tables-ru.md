---
title: React-компонент Таблица
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Таблицы

<p class="description">Таблицы отображают массивы данных. Они могут быть полностью кастомизированны.</p>

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

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js"}}

## Настройка постраничной навигации

Свойство `Action` компонента `TablePagination` позволяет реализовать собственную обработку пользовательский событий.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Объединение таблиц

Простой пример с объединением строк и столбцов.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Виртуализированная таблица

В следующем примере мы покажем, как использовать [react-virtualized](https://github.com/bvaughn/react-virtualized) с компонентом `Table`. Он отображает 200 строк и c легкостью может еще больше. Virtualization helps with performance issues.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## Дополнительные проекты

Для более сложных вариантов использования вы можете воспользоваться:

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) is a simple and powerful Datatable for React based on Material-UI Table with some additional features. They support many different use cases (editable, filtering, grouping, sorting, selection, i18n, tree data and more). You should check it out.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### Прочее

- [dx-react-grid-material-ui<](https://devexpress.github.io/devextreme-reactive/react/grid/) Сетка данных для Material-UI с функциями навигации, сортировки, фильтрации, группировки и редактирования ([пользовательское соглашение](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Адаптируемые таблицы данных для Material-UI с фильтрацией, сортировкой, поиском и многим другим.