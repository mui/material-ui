---
components: CssBaseline, ScopedCssBaseline
---

# CSS Baseline

<p class="description">Material-UI предоставляет компонент CssBaseline, чтобы создать элегантную, согласованную и простую основу для работы.</p>

## Global reset

You might be familiar with [normalize.css](https://github.com/necolas/normalize.css), a collection of HTML element and attribute style-normalizations.

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}
```

## Scoping on children

However, you might be progressively migrating a website to Material-UI, using a global reset might not be an option. It's possible to apply the baseline only to the children by using the `ScopedCssBaseline` component.

```jsx
import React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* The rest of your application */}
      <MyApp />
    </ScopedCssBaseline>
  );
}
```

⚠️ Make sure you import `ScopedCssBaseline` first to avoid box-sizing conflicts as in the above example.

## Approach

### Страница

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- Поля во всех браузерах удалены.
- The default Material Design background color is applied. It's using [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) for standard devices and a white background for print devices.

### Расположение

- `box-sizing` is set globally on the `<html>` element to `border-box`. Every element—including `*::before` and `*::after` are declared to inherit this property, which ensures that the declared width of the element is never exceeded due to padding or border.

### Оформление текста

- No base font-size is declared on the `<html>`, but 16px is assumed (the browser default). You can learn more about the implications of changing the `<html>` default font size in [the theme documentation](/customization/typography/#typography-html-font-size) page.
- Set the `theme.typography.body2` style on the `<body>` element.
- Set the font-weight to `theme.typography.fontWeightBold` for the `<b>` and `<strong>` elements.
- Custom font-smoothing is enabled for better display of the Roboto font.

## Кастомизация

Head to the [global customization](/customization/globals/#global-css) section of the documentation to change the output of these components.