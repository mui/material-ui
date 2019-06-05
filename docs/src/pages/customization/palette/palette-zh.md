# Palette（调色）

<p class="description">The palette enables you to modify the color of the components to suit your brand.</p>

## Intentions

A color intention is a mapping of a palette to a given intention within your application.

The theme exposes the following color intentions:

- primary - used to represent primary interface elements for a user.
- secondary - used to represent secondary interface elements for a user.
- error - used to represent interface elements that the user should be made aware of.

The default palette uses the shades prefixed with `A` (`A200`, etc.) for the secondary intention, and the un-prefixed shades for the other intentions.

If you want to learn more about color, you can check out [the color section](/customization/color/).

## Custom palette

您可以通过在主题中包含 `palette` 对象来覆盖默认调色板值。

If any of the [`palette.primary`](/customization/default-theme/?expend-path=$.palette.primary), [`palette.secondary`](/customization/default-theme/?expend-path=$.palette.secondary) or [`palette.error`](/customization/default-theme/?expend-path=$.palette.error) 'intention' objects are provided, they will replace the defaults.

The intention value can either be a [color](/customization/color/) object, or an object with one or more of the keys specified by the following TypeScript interface:

```ts
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};
```

**Using a color object**

The simplest way to customize an intention is to import one or more of the provided colors and apply them to a palette intention:

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

If the intention key receives a color object as in the example above, the following mapping is used to populate the required keys:

```js
palette: {
  primary: {
    light: palette.primary[300],
    main: palette.primary[500],
    dark: palette.primary[700],
    contrastText: getContrastText(palette.primary[500]),
  },
  secondary: {
    light: palette.secondary.A200,
    main: palette.secondary.A400,
    dark: palette.secondary.A700,
    contrastText: getContrastText(palette.secondary.A400),
  },
  error: {
    light: palette.error[300],
    main: palette.error[500],
    dark: palette.error[700],
    contrastText: getContrastText(palette.error[500]),
  },
},
```

This example illustrates how you could recreate the default palette values:

```js
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
```

**Providing the colors directly**

If you wish to provide more customized colors, you can either create your own color object, or directly supply colors to some or all of the intention's keys:

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});
```

如在上面的示例中，如果意图对象使用任何的包含自定义颜色 `main`， `light`， `dark` 或 `contrastText` 键，这些地图如下：

- If the `dark` and / or `light` keys are omitted, their value(s) will be calculated from `main`, according to the `tonalOffset` value.

- 如果 `contrastText` 被省略了，它的值将被计算同对比 `main`， 根据`contrastThreshold` 值。

Both the `tonalOffset` and `contrastThreshold` values may be customized as needed. A higher value for `tonalOffset` will make calculated values for `light` lighter, and `dark` darker. A higher value for `contrastThreshold` increases the point at which a background color is considered light, and given a dark `contrastText`.

Note that `contrastThreshold` follows a non-linear curve.

## 示例

{{"demo": "pages/customization/palette/Palette.js"}}

## 颜色工具

Need inspiration? The Material Design team has built an awesome [palette configuration tool](/customization/color/#color-tool) to help you.

## Type (light /dark theme)

Material-UI comes with two theme variants, light (the default) and dark.

您可以通过将 `type` 设置为 `dark`来使主题变暗。 While it's only a single property value change, internally it modifies the value of the following keys:

- `palette.text`
- `palette.divider`
- `palette.background`
- `palette.action`

```js
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

{{"demo": "pages/customization/palette/DarkTheme.js", "hideEditButton": true}}