# Цвет

<p class="description">Используйте цвет, чтобы передать смысл. Вы получаете доступ ко всем цветам в спецификации Material Design из коробки.</p>

[Система цветов](https://material.io/design/color/) Material Design может быть использована для создания цветовой темы, которая отражает ваш бренд или стиль.

## Цветовая система

### Важные термины

#### "Палитра"

Палитра - это набор цветов, то есть тонов и их оттенков. Материал-UI предоставляет все цвета из руководящих принципов Material Design. [This color palette](#color-palette) has been designed with colors that work harmoniously with each other.

#### "Оттенок" и "Тень"

Отдельно взятый цвет в палитре состоит из цветового тона, например «красный», и оттенка, например «500». «red 50» - самый светлый оттенок красного (* розовый! *), а «red 900» самый темный. Кроме того, большинство тонов имеют «акцентные» оттенки с префиксом `A`.

### Примеры

Цветовая палитра Material Design включает в себя основные и акцентные цвета, которые можно использовать для иллюстрации или для разработки цвета вашего бренда. Они создавались таким образом, чтобы гармонировать друг с другом.

Вы можете обратиться к дополнительным первичным и акцентным цветам (таким как «red 500» & «purple A200»), например:

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent = purple.A200; // #E040FB (alternative method)
```

### Цветовая палитра

Зная тон *HUE* (red, pink и т. д.) и оттенок *SHADE* (500, 600 и т. д.), можно импортировать цвет следующим образом:

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideHeader": true}}

## Инструменты для работы с цветом

Используйте палитру и слайдеры, расположенные ниже, чтобы опробовать цветовую схему [material.io/design/color](https://material.io/design/color/) на документации Material-UI. Либо можете ввести шестнадцатеричные значения в текстовые поля Primary и Secondary.

{{"demo": "pages/customization/color/ColorTool.js", "hideHeader": true}}

The output shown in the color sample can be pasted directly into a [`createMuiTheme()`](/customization/themes/#createmuitheme-options-theme) function (to be used with [`MuiThemeProvider`](/customization/themes/#theme-provider)):

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});
```

Only the `main` shades need be provided (unless you wish to further customize `light`, `dark` or `contrastText`), as the other colors will be calculated by `createMuiTheme()`, as described in the [Theme customization](/customization/palette/) section.

If you are using the default primary and / or secondary shades then by providing the color object, `createMuiTheme()` will use the appropriate shades from the material color for main, light and dark.

### Официальный инструмент для работы с цветом

The Material Design team has also built an awesome palette configuration tool: [material.io/tools/color](https://material.io/tools/color/). This can help you create a color palette for your UI, as well as measure the accessibility level of any color combination.

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336">
  <img src="/static/images/color/colorTool.png" alt="Официальный инструмент для работы с цветом" style="width: 574px" />
</a>

The output can be fed into `createMuiTheme()` function:

```jsx
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

### Инструменты, созданные сообществом

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/) Это онлайн-инструмент для создания тем Material-UI с помощью Material Design Color Tool.
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/) Инструмент с функцией предварительного просмотра в реальном времени, который позволяет создавать темы для ваших Material-UI приложений, просто выбирая цвета.
- [Material palette generator](https://material.io/inline-tools/color/): Этот инструмент можно использовать для создания палитры на основе любого выбранного цвета.