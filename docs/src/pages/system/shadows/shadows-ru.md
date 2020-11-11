# Тени

<p class="description">Добавление или удаление теней для элементов с утилитами box-shadow.</p>

## Пример

The helpers allow you to control relative depth, or distance, between two surfaces along the z-axis. By default, there is 25 elevation levels.

{{"demo": "pages/system/shadows/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ boxShadow: 0 }}>…
<Box sx={{ boxShadow: 1 }}>…
<Box sx={{ boxShadow: 2 }}>…
<Box sx={{ boxShadow: 3 }}>…
```

## API

```js
import { shadows } from '@material-ui/system';
```

| Импорт      | Свойство    | Свойство CSS | В теме    |
|:----------- |:----------- |:------------ |:--------- |
| `boxShadow` | `boxShadow` | `box-shadow` | `shadows` |
