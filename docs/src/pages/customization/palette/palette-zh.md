# Palette 调色板

<p class="description">使用调色板，您可以修改组件的颜色以迎合您的品牌形象。</p>

## 调色板的颜色

一个颜色图谱是在您的应用程序中，将一个调色板的颜色映射给一个特定意向。 主题提供了以下这些调色板的颜色（在 `theme.palette.` 中获取）：

- *primary* - 用于展示一个给用户的主要界面元素。 它是在您的应用屏幕和组件中显示最频繁的一个颜色。
- *secondary* - 用于展示一个给用户的次要界面元素。 它给予了更多的方法来强调和区分您的产品。 此颜色是可选的。
- *error* - 用于表示用户应该注意到的界面元素。
- *warning* - 用于呈现潜在的一些危险的操作或者重要的信息。
- *info* - 用于向用户呈现一些中立的且不一定重要的信息。
- *success* - 用于暗示一个用户触发的操作的成功完成。

如果想要了解更多关于色彩的知识，您可以查看 [色彩章节](/customization/color/)。

## 默认值

通过[主题资源管理器](/customization/default-theme/?expand-path=$.palette)或通过打开此页面上的开发工具控制台（dev tools console）（`window.theme.palette`），您可以浏览调色板的默认值。

{{"demo": "pages/customization/palette/Intentions.js", "bg": "inline", "hideToolbar": true}}

调色板的默认值是表现次要的图谱时，使用带有前缀 `A` （`A200` 等等）的阴影，而对于其他图谱则使用无前缀的阴影。

## Customization 个性化

您可以通过将一个调色板对象（palette object）作为主题的一部分来覆盖默认的调色板值。 如果存在以下任何情况：

- [`palette.primary`](/customization/default-theme/?expand-path=$.palette.primary)
- [`palette.secondary`](/customization/default-theme/?expand-path=$.palette.secondary)
- [`palette.error`](/customization/default-theme/?expand-path=$.palette.error)
- [`palette.warning`](/customization/default-theme/?expand-path=$.palette.warning)
- [`palette.info`](/customization/default-theme/?expand-path=$.palette.info)
- [`palette.success`](/customization/default-theme/?expand-path=$.palette.success)

若您提供了这些调色板颜色对象，它们将取代默认值。

调色板颜色值可以是[颜色（color）](/customization/color/#2014-material-design-color-palettes)对象，也可以是具有以下 TypeScript 接口指定的一个或多个键（key）的对象：

```ts
interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
```

### 使用一个颜色对象

定制一个颜色图谱的最简单方法是导入其提供的一种或多种颜色，并将它们应用于调色板上：

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

### 直接提供颜色

如果您希望提供更多的定制颜色，您也可以创建自己的颜色对象，或者直接为部分或全部的图谱使用的键（key）提供颜色。

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: 这将从 palette.primary.main 中进行计算，
      main: '#ff4400',
      // dark: 这将从 palette.primary.main 中进行计算，
      // contrastText: 这将计算与 palette.primary.main 的对比度
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: 这将从 palette.secondary.main 中进行计算，
      contrastText: '#ffcc00',
    },
    // 使用 `getContrastText()` 来最大化
    // 背景和文本的对比度
    contrastThreshold: 3,
    // 使用下面的函数用于将颜色的亮度在其调色板中
    // 移动大约两个指数。
    // 例如，从红色 500（Red 500）切换到 红色 300（Red 300）或 红色 700（Red 700）。
    tonalOffset: 0.2,
  },
});
```

如上面的例子一样，如果想要设置对象为使用包含"main"， “light”， “dark” 或 “contrastText” 这些键的定制颜色，则这些映射如下所示：

- 如果没有设置 “dark” 和 / 或 “light” 键，那么这将从 "main" 中根据 “色调偏移（tonalOffset）” 值来进行计算。
- 如果没有设置 “对比度文本（contrastText）”，那么这将根据 “对比度阈值（contrastThreshold）” 来计算出与 "main" 的对比度。

“色调偏移（tonalOffset）” 和 “对比度阈值（contrastThreshold）” 这两个值都可以根据需要进行定制。 “色调偏移（tonalOffset）” 值可以是一个 0 和 1 之间的数字，它将适用于亮色变量和暗色变量，或者是由以下 TypeScript 类型（type）指定的具有明暗变量的对象：

```ts
type PaletteTonalOffset = number | {
  light: number;
  dark: number;
};
```

“色调偏移（tonalOffset）” 的值越高，那么计算后的“light” 值就会变得更浅，“dark” 的值会变得更暗。 “对比度阈值（contrastThreshold）” 的值越高，那么背景色越会被认为是浅色的，这就会赋予一个深色的 “对比度文本（contrastText）”。

请注意，“对比度阈值（contrastThreshold）” 遵循的是一条非线性曲线。

### 示例

{{"demo": "pages/customization/palette/Palette.js", "defaultCodeOpen": true}}

### 添加新的颜色

您可以在主题的调色板内外添加新的颜色，如下所示：

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    neutral: {
      main: '#5c6ac4',
    },
  },
});
```

如果您正在使用 TypeScript，您也需要使用[module augmentation](/guides/typescript/#customization-of-theme) 来接受上述值。

```ts
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'],
    }
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color']
    }
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
```

## 选取颜色

需要灵感吗？ Material Design 团队已经建立了一个[调色板配置工具](/customization/color/#picking-colors)来帮助您选择颜色。

## 暗色模式

材质界面有两种调色板的类型，亮色（light）（默认值）和 暗色（dark）模式。 您可以通过设置 `type: 'dark'` 来运用暗色主题。 虽然它只是一个单一属性值的变化，但是在内部修改了些许调色板值。

```js
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

调色板的类型的调整，修改了如下的颜色：

{{"demo": "pages/customization/palette/DarkTheme.js", "bg": "inline", "hideToolbar": true}}

### 用户偏好

用户可能已经指定了一个亮色或者暗色主题的偏好。 用户表达其偏好的方法可以有所不同。 它可能是操作系统曝光的覆盖整个系统的设置，或由用户代理控制的设置。

您可以通过 [useMediaQuery](/components/use-media-query/) hook 和 [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) 的媒体查询来动态地利用此偏好设置。

例如，您可以自动启用暗色模式：

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes />
    </ThemeProvider>
  );
}
```