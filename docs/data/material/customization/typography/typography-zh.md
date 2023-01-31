# 文字铸排

<p class="description">主题会提供一套能够一起协调工作的类型大小，也提供了布局网格。</p>

## Font family

您可以使用 `theme.typography.fontFamily` 属性来更改 font family。

例如，这个例子使用是系统字体而不是默认的 Roboto 字体：

```js
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

### 自托管的字体

若想使用自托管的字体，请下载`ttf`，`woff`，以及/或者 `woff2` 格式的字体文件，然后将它们导入到你的代码中去。

⚠️ 这则需要在你的生成过程中有一个插件或者加载器，用它们可以处理 `ttf`， `woff` 和 `woff2` 文件的加载。 字体将 _不会_ 内嵌入你的资源文件包（bundle）。 它们将从您的网络服务器上而不是 CDN 中加载。

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
```

接下来，您需要做的是修改主题，来使用这一个新的字体。 In order to globally define Raleway as a font face, the [`CssBaseline`](/material-ui/react-css-baseline/) component can be used (or any other CSS solution of your choice).

```jsx
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: "local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2')";
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        }
      `,
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        fontFamily: 'Raleway',
      }}
    >
      Raleway
    </Box>
  </ThemeProvider>
);
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        fontFamily: 'Raleway',
      }}
    >
      Raleway
    </Box>
  </ThemeProvider>
);
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        fontFamily: 'Raleway',
      }}
    >
      Raleway
    </Box>
  </ThemeProvider>
);
```

Note that if you want to add additional `@font-face` declarations, you need to use the string CSS template syntax for adding style overrides, so that the previously defined `@font-face` declarations won't be replaced.

## 字体大小（Font size）

Material-UI 使用 `rem` 单元来定义字体的大小。 浏览器 `<html>` 元素的默认字体大小为 `16px`，但是浏览器提供了一个改变这个值的选项，所以 `rem` 单元能够让我们适应用户的设置，从而提供更好的无障碍设计的支持。 其实用户改变字体大小设置的原因多种多样，有不太好的视力，或者选择适应设备的最佳设置，这样在大小和查看距离上会有很大的差异。

若想更改 Material-UI 的字体大小，您可以提供一个 `fontSize` 属性。 它的默认值为 `14px`。

```js
const theme = createTheme({
  typography: {
    // 中文字符和日文字符通常比较大，
    // 所以选用一个略小的 fontsize 会比较合适。
    fontSize: 12,
  },
});
```

浏览器计算出来的字体大小遵循了以下数学方程式：

<div class="only-light-mode">
  <img alt="计算字体大小" style="width: 458px;" src="/static/images/font-size.svg" />
</div>
<div class="only-dark-mode">
  <img alt="计算字体大小" style="width: 458px;" src="/static/images/font-size-dark.svg" />
</div>

<!-- https://latex.codecogs.com/svg.latex?\dpi{200}&space;\text{computed}&space;=&space;\text{specification}\cdot\frac{\text{typography.fontSize}}{14}\cdot\frac{\text{html&space;fontsize}}{\text{typography.htmlFontSize}} -->

### 响应的字体大小

`theme.typography.*` [variant](#variants) 属性会直接映射到生成的 CSS。 You can use [media queries](/material-ui/customization/breakpoints/#api) inside them:

```js
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
```

{{"demo": "CustomResponsiveFontSizes.js"}}

To automate this setup, you can use the [`responsiveFontSizes()`](/material-ui/customization/theming/#responsivefontsizes-theme-options-theme) helper to make Typography font sizes in the theme responsive.

{{"demo": "ResponsiveFontSizesChart.js", "hideToolbar": true}}

您可以在下面的示例中看到这个操作。 Adjust your browser's window size, and notice how the font size changes as the width crosses the different [breakpoints](/material-ui/customization/breakpoints/):

```js
import { createTheme, responsiveFontSizes } from '@mui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "ResponsiveFontSizes.js"}}

### 流式文字大小

待完成：[#15251](https://github.com/mui/material-ui/issues/15251)。

### HTML 的字体大小

您可能想要更改 `<html>` 元素的默认字体大小。 例如，当您使用 [10px 简化](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/) 时。

:::warning
⚠️ Changing the font size can harm accessibility ♿️. Most browsers agreed on the default size of 16px, but the user can change it. For instance, someone with an impaired vision could have set their browser's default font size to something larger.
:::

The `theme.typography.htmlFontSize` property is provided for this use case, which tells MUI what the font-size on the `<html>` element is. This is used to adjust the `rem` value so the calculated font-size always match the specification.

```js
const theme = createTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
    htmlFontSize: 10,
  },
});
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

_You need to apply the above CSS on the html element of this page to see the below demo rendered correctly_

{{"demo": "FontSizeTheme.js"}}

## 变体

The typography object comes with [13 variants](/material-ui/react-typography/#component) by default:

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- subtitle2
- body1
- body2
- button 按钮
- caption 字幕
- overline

Each of these variants can be customized individually:

```js
const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

{{"demo": "TypographyVariants.js"}}

## 添加 & 禁用变体

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. Here is what you need to do:

**Step 1. Update the theme's typography object**

```js
const theme = createTheme({
  typography: {
    poster: {
      color: 'red',
    },
    // Disable h3 variant
    h3: undefined,
  },
});
```

**Step 2. Update the necessary typings (if you are using TypeScript)**

:::info
If you aren't using TypeScript you should skip this step.
:::

You need to make sure that the typings for the theme's `typography` variants and the `Typography`'s `variant` prop reflects the new set of variants.

<!-- Tested with packages/mui-material/test/typescript/augmentation/typographyVariants.spec.ts -->

```ts
declare module '@mui/core/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}
```

**Step 3. You can now use the new variant**

{{"demo": "TypographyCustomVariant.js", "hideToolbar": true}}

```jsx
<Typography variant="poster">poster</Typography>;

/* This variant is no longer supported */
<Typography variant="h3">h3</Typography>;
```

## 默认值

You can explore the default values of the typography using [the theme explorer](/material-ui/customization/default-theme/?expand-path=$.typography) or by opening the dev tools console on this page (`window.theme.typography`).
