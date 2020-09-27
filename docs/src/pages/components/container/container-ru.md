---
title: Container React component
components: Container
githubLabel: 'component: Container'
---

# Container

<p class="description">Container центрирует содержимое по горизонтали. Это базовый элемент всех макетов.</p>

Несмотря на то, что контейнеры могут быть вложенными, большинство макетов не требуют вложенного контейнера.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Fluid

A fluid container width is bounded by the `maxWidth` prop value.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## Fixed

Если вы предпочитаете разрабатывать с использованием определенного набора размеров вместо адаптивного размещения элементов, вы можете добавить свойство `fixed` к контейнеру. Максимальная ширина соотвествует минимальной ширине текущей точки останова.

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```
