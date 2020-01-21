---
title: Container React component
components: Container
---

# Container

<p class="description">Container центрирует содержимое по горизонтали. Это базовый элемент всех макетов.</p>

Несмотря на то, что контейнеры могут быть вложенными, большинство макетов не требуют вложенного контейнера.

## Fluid

Ширина Fluid Container ограничена значением его свойства `maxWidth`.

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