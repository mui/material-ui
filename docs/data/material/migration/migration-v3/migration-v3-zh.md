# 从 v3 迁移到 v4 版本

<p class="description">是的，我们已经发布了 v4 版本！</p>

您还在找 v3 版本的文档吗？ [您可以在这里找到它们](https://material-ui.com/versions/) 。

::info 本文件是一项正在进行的工作。 你是否升级了你的网站并遇到了这里没有涉及的问题？ [在GitHub上添加你的修改](https://github.com/mui/material-ui/blob/master/docs/data/material/migration/migration-v3/migration-v3.md)
:::

## 简介

这是一个将你的网站从Material UI v3升级到v4的参考。 虽然这里涵盖了很多内容，但你可能不需要为你的网站做所有事情。 我们会尽我们最大的努力让文档简单易懂，并尽可能有序地介绍，这样您可以迅速对 v4 版本游刃有余。

## 为什么您需要迁移呢

本文档页面涵盖了**如何**从v3迁移到v4。 **原因**[在Medium上的发布博文](https://mui.com/blog/material-ui-v4-is-out/)中有所阐述。

## 更新您的依赖包

你需要做的第一件事就是更新你的依赖关系。

### 更新Material UI版本

你需要更新你的`package.json`以使用最新版本的Material UI。

```json
"dependencies": {
  "@material-ui/core": "^4.0.0"
}
```

或者运行

```sh
npm install @material-ui/core

或者

yarn add @material-ui/core
```

### 更新 React 的版本

React的最低要求版本从`react@^16.3.0`增加到`react@^16.8.0`. 这使我们能够依赖[Hooks](https://legacy.reactjs.org/docs/hooks-intro.html)（我们不再使用类的API）。

### 更新Material UI风格版本

如果你之前使用`@material-ui/styles`与v3，你需要更新你的`package.json`以使用最新版本的Material UI Styles。

```json
"dependencies": {
  "@material-ui/styles": "^4.0.0"
}
```

或者运行

```sh
npm install @material-ui/styles

或者

yarn add @material-ui/styles
```

## 处理变化带来的系统崩溃

### Core

- 每个组件会提供他们的 ref。 这是通过使用 `React.forwardRef()` 实现的。 这回影响到内部的组件树和显示的名称，进而会使得 shallow 或者 snapshot 测试崩溃。 `innerRef` 不再返回一个实例的 ref（或者当内部组件是一个函数组件时，什么都不返回），而是返回一个它根组件的 ref。 我们已经将相应的 API 文档在根组件中列出。

### Styles（样式表单）

- ⚠️ Material UI依赖于JSS v10。 JSS v10与v9不能向后兼容。 请保证您的开发环境中未安装 JSS v9 版本。 （在您的 `package.json` 中删除 `react-jss` 会有所帮助）。 StylesProvider 组件替代了 JssProvider 组件。
- 请移除 `withTheme()` 中的第一个可选的参数。 （第一个参数是为从未出现的可能的未来选项的一个占位符。）

  它与[emotion API](https://emotion.sh/docs/introduction)和[styled-components API](https://styled-components.com)相匹配。

  ```diff
  -const DeepChild = withTheme()(DeepChildRaw);
  +const DeepChild = withTheme(DeepChildRaw);
  ```

- 重命名 `convertHexToRGB` 为 `hexToRgb`。

  ```diff
  -import { convertHexToRgb } from '@material-ui/core/styles/colorManipulator';
  +import { hexToRgb } from '@material-ui/core/styles';
  ```

- 设置 [keyframes API](https://cssinjs.org/jss-syntax/#keyframes-animation) 的范围。 您应该在您的代码中做出以下改变。 这对分离动画的逻辑有所帮助：

  ```diff
    rippleVisible: {
      opacity: 0.3,
  -   animation: 'mui-ripple-enter 100ms cubic-bezier(0.4, 0, 0.2, 1)',
  +   animation: '$mui-ripple-enter 100ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '@keyframes mui-ripple-enter': {
      '0%': {
        opacity: 0.1,
      },
      '100%': {
        opacity: 0.3,
      },
    },
  ```

### 主题

- `theme.palette.augmentColor()` 方法不再对输入框的颜色产生副作用。 若想要正确地使用它，您必须使用其返回值。

  ```diff
  -const background = { main: color };
  -theme.palette.augmentColor(background);
  +const background = theme.palette.augmentColor({ main: color });

  console.log({ background });
  ```

- —您可以从主题创建中安全地移除下一个变体：

  ```diff
  typography: {
  - useNextVariants: true,
  },
  ```

- 我们已经不再使用 `theme.spacing.unit`，您可以用新的 API 了：

  ```diff
  label: {
    [theme.breakpoints.up('sm')]: {
  -   paddingTop: theme.spacing.unit * 12,
  +   paddingTop: theme.spacing(12),
    },
  }
  ```

  提示：您可以提供多个参数：`theme.spacing(1, 2) // = '8px 16px'。 `

  您可以在项目中使用 [迁移小帮手](https://github.com/mui/material-ui/tree/master/packages/material-ui-codemod/README.md#theme-spacing-api) 来让您的迁移流程更加顺畅。

### 布局

- [Grid] 本着支持任意间距值并且摈弃心理上一直需要在 8 的基础上计数的目的，我们改变了 spacing 的 API:

  ```diff
    /**
     * 在类别为`item` 组件之间定义间距。
     * 它只能用于类型为 `container` 的组件。
     */
  -  spacing: PropTypes.oneOf([0, 8, 16, 24, 32, 40]),
  +  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ```

  从今往后，您可以使用主题来实现 [一个自定义的网格间距变换函数](https://material-ui.com/system/spacing/#transformation)。

- [Container] 从 `@material-ui/lab` 迁移到 `@material-ui/core`。

  ```diff
  -import Container from '@material-ui/lab/Container';
  +import Container from '@material-ui/core/Container';
  ```

### TypeScript

#### `value` 类型

Normalized `value` prop type for input components to use `unknown`. This affects `InputBase`, `NativeSelect`, `OutlinedInput`, `Radio`, `RadioGroup`, `Select`, `SelectInput`, `Switch`, `TextArea`, and `TextField`.

```diff
function MySelect({ children }) {
- const handleChange = (event: any, value: string) => {
+ const handleChange = (event: any, value: unknown) => {
    // handle value
  };

  return <Select onChange={handleChange}>{children}</Select>
}
```

这一变化在[TypeScript指南](/material-ui/guides/typescript/#handling-value-and-event-handlers)中得到了更详细的解释

### Button

- [Button] 删除不推荐使用的按钮变体（flat，raised 和 fab）：

  ```diff
  -<Button variant="raised" />
  +<Button variant="contained" />
  ```

  ```diff
  -<Button variant="flat" />
  +<Button variant="text" />
  ```

  ```diff
  -import Button from '@material-ui/core/Button';
  -<Button variant="fab" />
  +import Fab from '@material-ui/core/Fab';
  +<Fab />
  ```

  ```diff
  -import Button from '@material-ui/core/Button';
  -<Button variant="extendedFab" />
  +import Fab from '@material-ui/core/Fab';
  +<Fab variant="extended" />
  ```

- [ButtonBase] 传递给`组件`的属性的组件需要能接受一个 ref。 [构成指南](/material-ui/guides/composition/#caveat-with-refs)解释了迁移策略。

  当 `button` 属性设置为 true 时，这也适用于 `BottomNavigationAction`，`Button`，`CardActionArea`，`Checkbox`，`ExpansionPanelSummary`，`Fab`，`IconButton`，`MenuItem`，`Radio`，`StepButton`，`Tab`，`TableSortLabel` 以及 `ListItem`。

### Card（卡片）

- [CardActions] 将 `disableActionSpacing` 属性重命名为 `disableSpacing`。
- [CardActions] 移除 CSS 类中的 `disableActionSpacing`。
- [CardActions] 将 CSS 类 `action` 重命名为 `spacing`。

### ClickAwayListener

- [ClickAwayListener] 隐藏 react-event-listener 的属性。

### Dialog

- [DialogActions] 将 `disableActionSpacing` 属性重命名为 `disableSpacing`。
- [DialogActions] 将 CSS 类 `action` 重命名为 `spacing`。
- [DialogContentText] 不使用文字铸排变体 `subtitle1`，而使用 `body1`。
- [Dialog] 子组件能够接受一个 ref。 [构成指南](/material-ui/guides/composition/#caveat-with-refs)解释了迁移策略。

### Divider

- [Divider] 移除了弃用的 `inset` 属性：

  ```diff
  -<Divider inset />
  +<Divider variant="inset" />
  ```

### ExpansionPanel（扩展面板）

- [ExpansionPanelActions] 将 CSS 类 `action` 重命名为 `spacing`。
- [ExpansionPanel] 提高 `disabled` 和 `expanded` 样式规则的 CSS 优先级。
- [ExpansionPanel] 将 `CollapseProps` 属性重命名为 `TransitionProps`。

### Lists（列表）

- [List] 为了符合规范，我们重新在列表组件上做了调整 ：

  - 当使用头像时，您必须要使用 `ListItemAvatar` 组件。
  - 当使用左边的复选框时，您必须使用 `ListItemIcon` 组件。
  - 您必须要在图标按钮上设置 `edge` 属性。

- [List] `dense` 不再减少 `List` 元素的上下边距。
- [ListItem] 加强 `disabled` 和 `focusVisible` 样式规则的 CSS 特性。

### Menu

- [MenuItem] 删除 MenuItem 的固定高度。 浏览器将会自行根据间距和行高来计算高度。

### Modal

- [Modal] 子组件能够接受一个 ref。 [构成指南](/material-ui/guides/composition/#caveat-with-refs)解释了迁移策略。

  这也适用于 `Dialog` 和 `Popover` 。

- [Modal] 删除 Modal 组件类的自定义 API (独立使用时将减少-74％的打包大小)。
- [Modal] 现在忽略了 event.defaultPrevented。 即使当向下离开事件调用了 `event.preventDefault()`，新的逻辑也会关闭模态框。 `event.preventDefault()` 旨在禁用一些默认的行为，如单击一个复选框来选中它；点击按钮来提交表单；以及点击左键来移除文本输入框的光标等等。 只有一些特殊的 HTML 元素才具有这些默认的行为。 若您不想触发模态框的 `onClose` 事件，您需要使用 `event.stopPropagation()`。

### Paper

- [Paper] 减小默认的 elevation（阴影高度）。 为了适配卡片组件和扩展面板组件，请更改默认纸张的阴影高度：

  ```diff
  -<Paper />
  +<Paper elevation={2} />
  ```

  这也会影响 `扩展面板`。

### Portal

- [Portal] 当使用 `disablePortal`属性的时候，子元素需要能够接受一个 ref。 [构成指南](/material-ui/guides/composition/#caveat-with-refs)解释了迁移策略。

### Slide 滑动

- [Slide] 子组件能够接受一个 ref。 [构成指南](/material-ui/guides/composition/#caveat-with-refs)解释了迁移策略。

### Slider

- [Slider] 从 `@material-ui/lab` 迁移到 `@material-ui/core`。

  ```diff
  -import Slider from '@material-ui/lab/Slider'
  +import Slider from '@material-ui/core/Slider'
  ```

### Switch 开关

- [Switch] 重新编写实施的代码能够更容易覆盖样式表。 请重命名类的名字以匹配规范的用词：

  ```diff
  -icon
  -bar
  +thumb
  +track
  ```

### Snackbar（消息条）

- [Snackbar] 匹配新的规范。

  - 更改尺寸。
  - 将默认的过渡动画从 `Slide` 改成 `Grow`。

### SvgIcon（Svg 图标）

- [SvgIcon] 重命名 nativeColor - > htmlColor。 React 在 `for` 这个 HTML 属性上也遇到了同样的问题，他们选择命名这个属性为`htmlFor`。 此变化的原因大同小异。

  ```diff
  -<AddIcon nativeColor="#fff" />
  +<AddIcon htmlColor="#fff" />
  ```

### Tabs 选项卡

- [Tab] 为了简单起见，删除了`labelContainer`，`label` 和 `labelWrapped` 等类的 key。 这使得我们可以移走两个中间的 DOM 元素。 您应该可以将自定义的样式移到`根元素`的类的键上。

  ![一个更简单的标签项的 DOM 结构](https://user-images.githubusercontent.com/3165635/53287870-53a35500-3782-11e9-9431-2d1a14a41be0.png)

- [Tabs] 移除了弃用的

  ```diff
  -<Tabs fullWidth scrollable />
  +<Tabs variant="scrollable" />
  ```

### Table

- [TableCell] 移除了弃用的 `numeric` 属性：

  ```diff
  -<TableCell numeric>{row.calories}</TableCell>
  +<TableCell align="right">{row.calories}</TableCell>
  ```

- [TableRow] 删除了 CSS 属性中的固定高度。 浏览器将会自行根据间距和行高来计算单元格的高度。
- [TableCell] 将 `dense` 模式移至一个不同的属性：

  ```diff
  -<TableCell padding="dense" />
  +<TableCell size="small" />
  ```

- [TablePagination] 此组件不再修复无效的属性（`page`，`count`，`rowsPerPage`）组合。 相反的，它会给出一个警告。

### TextField

- [InputLabel] 凭借 InputLabel 组件的类 API，您应该可以覆盖 FormLabel 组件所有的样式表。 我们移除了 `FormLabelClasses` 属性。

  ```diff
  <InputLabel
  - FormLabelClasses={{ asterisk: 'bar' }}
  + classes={{ asterisk: 'bar' }}
  >
  Foo
  </InputLabel>
  ```

- [InputBase] 改变了默认的盒子模型的大小。 现如今它则使用以下的 CSS：

  ```css
  box-sizing: border-box;
  ```

  与 `fullWidth` 属性有关的问题迎刃而解。

- [InputBase] 从 `InputBase` 中移走了 `inputType` 类。

### Tooltip

- [Tooltip] 子组件能够接受一个 ref。 [构成指南](/material-ui/guides/composition/#caveat-with-refs)解释了迁移策略。
- [Tooltip] 相比以前任何聚焦都会出现，现在只会在 focus-visible 聚焦的时候出现。

### 文字铸排

- [Typography] 移除了各种弃用的铸排变体。 您可以通过执行以下的替换来升级：
  - display4 => h1
  - display3 => h2
  - display2 => h3
  - display1 => h4
  - headline => h5
  - title => h6
  - subheading => subtitle1
  - body2 => body1
  - body1 (default) => body2 (default)
- [Typography] 移除了固定的 `display: block` 这个默认的铸排样式。 您现在可以使用新的 `display?: 'initial' | 'inline' | 'block';` 属性。
- [Typography] 为了达到更好的排版效果，请重命名属性 `headlineMapping` 为 `variantMapping`。

  ```diff
  -<Typography headlineMapping={headlineMapping}>
  +<Typography variantMapping={variantMapping}>
  ```

- [Typography] 将默认的字体从 `body2` 换成 `body1`。 默认为 16px 的字体大小比默认为 14px 好。 Bootstrap，material.io，甚至本文档都使用的是 16px 作为默认字体大小。 像 Ant Design 一样使用 14px 是可以理解的，因为中国的用户使用了不同的字母表。 我们建议将 12px 作为日语的默认字体大小。
- [Typography] 移除了铸排变体的默认颜色。 大多数情况下，字体颜色应该是继承而来的。 这是网站的默认行为。
- [Typography] 按照 [该讨论](https://github.com/mui/material-ui/issues/13028) 的逻辑，我们将 `color="default"` 重命名为 `color="initial"`。 你不应该再使用 _default_，因为它缺少明确的语义。

### Node

- [是时候放弃对 node 6 的支持](https://github.com/nodejs/Release/blob/eb91c94681ea968a69bf4a4fe85c656ed44263b3/README.md#release-schedule)，而升级到 node 8 啦。

### UMD

- 这一变化简化了Material UI与CDN的使用:

  ```diff
  const {
    Button,
    TextField,
  -} = window['material-ui'];
  +} = MaterialUI;
  ```

  它与其他 React 的项目保持一致：

  - material-ui => MaterialUI
  - react-dom => ReactDOM
  - prop-types => PropTypes
