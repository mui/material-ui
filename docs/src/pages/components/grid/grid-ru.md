---
title: React-компонент Сетка
components: Grid
---

# Сетка

<p class="description">Сетка адаптивного макета Material Design адаптируется к размеру экрана и ориентации, обеспечивая согласованность макетов.</p>

[Сетка](https://material.io/design/layout/responsive-layout-grid.html) создает визуальную согласованность между макетами, позволяя гибко адаптироваться к разнообразным дизайнам. Адаптивный пользовательский интерфейс Material Design основан на сетке с 12 колонками.

## Как это работает

Система сетки реализована с помощью компонента `Grid`:

- Она использует [модуль Flexible Box CSS](https://www.w3.org/TR/css-flexbox-1/) для повышеной гибкости.
- Существует два типа макетов: *контейнеры* и *элементы*.
- Ширина элементов задается в процентах, поэтому они всегда гибко изменяют свой размер относительно родительского элемента.
- Элементы имеют отступы для создания промежутков между отдельными элементами.
- Существует пять контрольных точек прерывания сетки: xs, sm, md, lg и xl.

If you are **new to or unfamiliar with flexbox**, we encourage you to read this [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) guide.

## Интервал

Смысл адаптивной сетки не в равной ширине столбцов, а в равной ширине интервалов между ними. В Material Design величина отступов и ширина столбцов привязаны к базовой сетке с шагом в **8px**. Свойство `spacing` может принимать целочисленные значения от 0 до 10 включительно. По умолчанию расстояние между соседними элементами (GridItem) задано линейной функцией: `output(spacing) = spacing * 8px`, т.е. `spacing={2}` устанавливает значение интервала 16px.

Поведение функции `output` можно изменить, [отредактировав тему](/customization/spacing/).

{{"demo": "pages/components/grid/SpacingGrid.js"}}

## Адаптивные сетки

Адаптивные сетки используют столбцы, которые масштабируют и изменяют размер содержимого. Макет адаптивной сетки может использовать точки прерывания, чтобы определить, нужно ли кардинально изменить макет.

### Базовая сетка

Ширина столбца меняется во всех точках прерывания (от `xs` и выше).

{{"demo": "pages/components/grid/CenteredGrid.js"}}

### Сетка с точками прерывания

Некоторые столбцы имеют несколько значений ширины, что приводит к изменению макета в определенной точке прерывания.

{{"demo": "pages/components/grid/FullWidthGrid.js"}}

## Интерактивность

Ниже приведен интерактивный пример, который демонстрирует результаты различных настроек сетки:

{{"demo": "pages/components/grid/InteractiveGrid.js", "hideHeader": true}}

## Авто-разметка

Автоматическая разметка позволяет *элементам* равномерно распределять доступное пространство. Это также означает, что вы можете установить ширину одного *элемента*, а остальные будут автоматически изменять размер вокруг него.

{{"demo": "pages/components/grid/AutoGrid.js"}}

## Сложная сетка

Следующая демонстрация не соответствует спецификации Material Design, но иллюстрирует, как сетка может использоваться для создания сложных макетов.

{{"demo": "pages/components/grid/ComplexGrid.js"}}

## Вложенная сетка

Свойства `container` и `item` - это два независимых логических значения. Они могут быть объединены.

> Flex **контейнер** представляет собой блок, созданный элементом с вычисляемым свойством display `flex` или `inline-flex`. Дочерние элементы flex контейнера называются flex **элементы** и размещаются используя flex-модель.

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "pages/components/grid/NestedGrid.js"}}

## Ограничения

### Отрицательный margin

Есть одно ограничение с отрицательным margin, которое мы используем для добавления расстояния между элементами. Появится горизонтальная прокрутка, если отрицательный margin выходит за пределы `<body>`. Существует 3 обходных пути: 1. Не использовать отступы и не реализовывать их в пространстве пользователя. `spacing={0}` (по умолчанию). 2. Применение внутренних отступов (padding) к родителю с использованием, как минимум, половины значения отступа, имеющегося у дочернего элемента:

```jsx
  <body>
    <div style={{ padding: 20 }}>
      <Grid container spacing={5}>
        //...
      </Grid>
    </div>
  </body>
```

1. Добавление `overflow-x: hidden;` к родителю.

### white-space: nowrap;

Исходное значение для элементов Flex: `min-width: auto`. Это вызывает конфликт позиционирования, когда дети используют `white-space: nowrap;` Вы можете столкнуться со следующей проблемой:

```jsx
<Grid item xs>
  <Typography noWrap>
```

Чтобы элемент оставался в контейнере, необходимо установить `min-width: 0`. На практике вы можете использовать свойство `zeroMinWidth`:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "pages/components/grid/AutoGridNoWrap.js"}}

### direction: column | column-reverse

Though the `Grid` component has a `direction` property that allows values of `row`, `row-reverse`, `column`, and `column-reverse`, there are some features that are not supported within `column` and `column-reverse` containers. The properties which define the number of grids the component will use for a given breakpoint (`xs`, `sm`, `md`, `lg`, and `xl`) are focused on controlling width and do **not** have similar effects on height within `column` and `column-reverse` containers. If used within `column` or `column-reverse` containers, these properties may have undesirable effects on the width of the `Grid` elements.

## CSS макет сетки

Material-UI doesn't provide any CSS Grid functionality itself, but as seen below you can easily use CSS Grid to layout your pages.

{{"demo": "pages/components/grid/CSSGrid.js"}}