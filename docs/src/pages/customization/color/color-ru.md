# Цвет

<p class="description">Используйте цвет, чтобы передать смысл. Вы получаете доступ ко всем цветам в спецификации Material Design из коробки.</p>

[Система цветов](https://material.io/design/color/) Material Design может быть использована для создания цветовой темы, которая отражает ваш бренд или стиль.

## Picking colors

### Официальный инструмент для работы с цветом

The Material Design team has also built an awesome palette configuration tool: [material.io/resources/color/](https://material.io/resources/color/). This can help you create a color palette for your UI, as well as measure the accessibility level of any color combination.

<a href="https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336" target="_blank" rel="noopener nofollow">
  <img src="/static/images/color/colorTool.png" alt="Официальный инструмент для работы с цветом" style="width: 574px" />
</a>
  
  


The output can be fed into `createMuiTheme()` function:

```js
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

### Песочница

To test a [material.io/design/color](https://material.io/design/color/) color scheme with the Material-UI documentation, simply select colors using the palette and sliders below. Либо можете ввести шестнадцатеричные значения в текстовые поля Primary и Secondary.

{{"demo": "pages/customization/color/ColorTool.js", "hideToolbar": true, "bg": true}}

The output shown in the color sample can be pasted directly into a [`createMuiTheme()`](/customization/theming/#createmuitheme-options-theme) function (to be used with [`ThemeProvider`](/customization/theming/#theme-provider)):

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});
```

Only the `main` shades need be provided (unless you wish to further customize `light`, `dark` or `contrastText`), as the other colors will be calculated by `createMuiTheme()`, as described in the [Theme customization](/customization/palette/) section.

If you are using the default primary and / or secondary shades then by providing the color object, `createMuiTheme()` will use the appropriate shades from the material color for main, light and dark.

### Инструменты, созданные сообществом

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/): A tool to generate themes for your Material-UI applications by just selecting the colors and having a live preview.
- [Material palette generator](https://material.io/inline-tools/color/): Этот инструмент можно использовать для создания палитры на основе любого выбранного цвета.

## 2014 Material Design color palettes

These color palettes, originally created by Material Design in 2014, are comprised of colors designed to work together harmoniously, and can be used to develop your brand palette. To generate your own harmonious palettes, use the palette generation tool.

### Важные термины

- **Palette**: A palette is a collection of colors, i.e. hues and their shades. Материал-UI предоставляет все цвета из руководящих принципов Material Design. [This color palette](#color-palette) has been designed with colors that work harmoniously with each other.
- Зная тон *HUE* (red, pink и т. д.) и оттенок *SHADE* (500, 600 и т. д.), можно импортировать цвет следующим образом:

### Цветовая палитра

Зная тон *HUE* (red, pink и т. д.) и оттенок *SHADE* (500, 600 и т. д.), можно импортировать цвет следующим образом:

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideToolbar": true, "bg": "inline"}}

### Примеры

For instance, you can refer to complementary primary and accent colors, "red 500" and "purple A200" like so:

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #f44336
const accent = purple['A200']; // #e040fb
const accent = purple.A200; // #e040fb (alternative method)
```