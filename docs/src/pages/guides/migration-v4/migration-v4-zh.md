# 从 v4 迁移到 v5 版本

<p class="description">是的，我们已经发布了 v5 版本！</p>

你在找 v4 版本的文档吗？ [您可以在这里找到它们](https://material-ui.com/versions/) 。

> 此文档尚未完成。 您是否已经升级了站点并且遇到了一些并没有在此涉及的问题？ [请在 GitHub 添加您的更改](https://github.com/mui-org/material-ui/blob/HEAD/docs/src/pages/guides/migration-v4/migration-v4.md)。

## 简介

当你将站点从 Material-UI 的 v4 版本升级到 v5 版本时，这篇文章会为你提供一些参考。 您可能不会将这里所有涵盖的内容运用到你的站点上。 您可能不会将这里所有涵盖的内容运用到你的站点上。 我们会尽我们最大的努力让文档简单易懂，并尽可能有序地介绍，这样你可以迅速对 v5 版本游刃有余。

## 为什么您需要迁移呢

这篇文章介绍了 _如何_ 从 v4 版本迁移到 v5 版本。 关于 _为什么_ 需要迁移，我们在 [Medium 上发布了一篇博客](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701) 来详细说明。

## 更新您的依赖包

您需要做的第一件事，就是更新您的依赖包。

### 升级 Material-UI 的版本

若想要使用最新版本的 Material-UI，您必须更新 `package.json`。

```json
"dependencies": {
  "@material-ui/core": "^5.0.0-alpha.1"
}
```

或者运行

```sh
npm install @material-ui/core@next

或者

yarn add @material-ui/core@next
```

## 处理变化带来的系统崩溃

### 非转发类（non-ref-forwarding class）组件

对 `component` 属性中的非转发类组件或作为直接 `子类` 的支持已被放弃。 如果你使用了 `unstable_createStrictModeTheme` 或者在 `React.StrictMode` 中没有看到任何与 `findDOMNode` 相关的任何警告，那么你不需要做任何事情。 否则请查看我们指南中的 [“注意事项与参考文献”部分](/guides/composition/#caveat-with-refs) 来了解如何迁移。 这个变化几乎影响了所有使用 `component` 属性的组件或者将 `children` 传递给要求 `children` 作为元素的组件（例如 `<MenuList><CustomMenuItem /></MenuList>`）

### 主题

- 断点现在被当作值而不是范围来处理。 `down(key)` 的行为已更改为定义的媒体查询小于使用相应断点定义的值（不包含当前值）。 `between(start, end)` 也已更新，定义了媒体查询 start（包含）和 end（不包含）实际值之间的数值。 当使用 `down()`断点工具集时，你需要向上一步更新断点键。 当使用  `between(start, end)` 时，结束断点也应向上一步更新。 使用 `Hidden` 组件时也应该这样做。 下面列出了变动影响的例子：

```diff
-theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
+theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
```

```diff
-theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, md + 1) => [0, lg)
+theme.breakpoints.between('sm', 'lg') // '@media (min-width:600px) and (max-width:1279.95px)' - [0, lg)
```

```diff
-theme.breakpoints.between('sm', 'xl') // '@media (min-width:600px)'
+theme.breakpoints.up('sm') // '@media (min-width:600px)'
```

```diff
-<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
+<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
```

#### 变更

为了能实现更平滑的过渡，`adaptV4Theme` 助手允许你迭代升级到新的主题结构。

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createMuiTheme, adaptV4Theme } from '@material-ui/core/styles';

-const theme = createMuitheme({
+const theme = createMuitheme(adaptV4Theme({
  // v4 主题
-});
+}));
```

适配助手支持以下更改。

#### 修改前：

- 事实证明，“水槽（gutters）”这个抽象的概念还没有被频繁使用，所以是没有价值的。

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

- `theme.spacing` 现在默认返回以 px 为单位的单个数值。 这一改动改善了与 styled-components & emotion 的整合。

  修改前：

  ```
  theme.spacing(2) => 16
  ```

  修改后：

  ```
  theme.spacing(2) => '16px'
  ```

- `theme.palette.text.hint` 键在 Material-UI 组件中未使用，现已被删除。

```diff
import { createMuiTheme } from '@material-ui/core/styles';

-const theme = createMuitheme(),
+const theme = createMuitheme({
+  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
+});
```

```diff
import { createMuiTheme } from '@material-ui/core/styles';

-const theme = createMuitheme({palette: { type: 'dark' }}),
+const theme = createMuitheme({
+  palette: { type: 'dark', text: { hint: 'rgba(0, 0, 0, 0.38)' } },
+});
```

- 主题内的组件定义在 `components` 键下进行了重构，以便人们更容易地发现一个组件的定义。

- 为了更好地遵循通常用于描述该功能的“黑暗模式”术语，我们将 `theme.palette.type` 重命名为 `theme.palette.mode`。

```diff
import { createMuiTheme } from '@material-ui/core/styles';

-const theme = createMuitheme({palette: { type: 'dark' }}),
+const theme = createMuitheme({palette: { mode: 'dark' }}),
```

1. `属性`

```diff
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuitheme({
-  props: {
-    MuiButton: {
-      disableRipple: true,
-    },
-  },
+  components: {
+    MuiButton: {
+      defaultProps: {
+        disableRipple: true,
+      },
+    },
+  },
});
```

2. `覆盖`

```diff
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuitheme({
-  overrides: {
-    MuiButton: {
-      root: { padding: 0 },
-    },
-  },
+  components: {
+    MuiButton: {
+      styleOverrides: {
+        root: { padding: 0 },
+      },
+    },
+  },
});
```

### Alert 警告提示

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  ```diff
  -import Alert from '@material-ui/lab/Alert';
  -import AlertTitle from '@material-ui/lab/AlertTitle';
  +import Alert from '@material-ui/core/Alert';
  +import AlertTitle from '@material-ui/core/AlertTitle';
  ```


  ### Autocomplete 自动补全组件

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  ```diff
  -import Autocomplete from '@material-ui/lab/Autocomplete';
  -import useAutocomplete  from '@material-ui/lab/useAutocomplete';
  +import Autocomplete from '@material-ui/core/Autocomplete';
  +import useAutoComplete from '@material-ui/core/useAutocomplete';
  ```

### Avatar 头像组件

- 为保持一致性，我们将 `circle` 重命名为 `circular`。 可能的值应该是形容词，而不是名词。

  ```diff
  -<Avatar variant="circle">
  -<Avatar classes={{ circle: 'className' }}>
  +<Avatar variant="circular">
  +<Avatar classes={{ circular: 'className' }}>
  ```

### Badge 徽章

- 为保持一致性，我们将 `circle` 重命名为 `circular`，`rectangle` 重命名为 `rectangular`。 可能的值应该是形容词，而不是名词。

  ```diff
  -<Badge overlap="circle">
  -<Badge overlap="rectangle">
  +<Badge overlap="circular">
  +<Badge overlap="rectangular">
  <Badge classes={{
  - anchorOriginTopRightRectangle: 'className'
  - anchorOriginBottomRightRectangle: 'className'
  - anchorOriginTopLeftRectangle: 'className'
  - anchorOriginBottomLeftRectangle: 'className'
  - anchorOriginTopRightCircle: 'className'
  - anchorOriginBottomRightCircle: 'className'
  - anchorOriginTopLeftCircle: 'className'
  + anchorOriginTopRightRectangular: 'className'
  + anchorOriginBottomRightRectangular: 'className'
  + anchorOriginTopLeftRectangular: 'className'
  + anchorOriginBottomLeftRectangular: 'className'
  + anchorOriginTopRightCircular: 'className'
  + anchorOriginBottomRightCircular: 'className'
  + anchorOriginTopLeftCircular: 'className'
  }}>
  ```

### BottomNavigation 底部导航

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

### Button 按钮

- 按钮的 `颜色（color）` 属性默认情况下为 "primary"，同时 "default" 属性已被删除。 这使得按钮更接近于 Material Design 规范，并且也简化了 API。

  ```diff
  -<Button color="primary" />
  -<Button color="default" />
  +<Button />
  +<Button />
  ```

### CircularProgress 进度环

- `static` 变量已合并到 `determinate` 变量中，后者将采用前者的外观。 这是因为删除的这个变量很少有用。 这属于 Material Design 的例外情况，并且它在规范中已被删除。

  ```diff
  -<CircularProgress variant="determinate" />
  ```

  ```diff
  -<CircularProgress variant="static" classes={{ static: 'className' }} />
  +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  ```

> 注意：如果你之前已经定制了 determinate，那么你的定制可能不再有效。 所以请删除它们。

### Collapse 折叠

- `collapsedHeight` 属性已重命名为 `collapsedSize` 以便支持水平方向的大小。

  ```diff
  -<Collapse collapsedHeight={40}>
  +<Collapse collapsedSize={40}>
  ```

- 已更改 `classes.containe` 键以匹配其他组件的约定行为。

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### Dialog

- onE\* 过渡属性已被删除。 请使用 TransitionProps 来代替它。

  ```diff
  <Dialog
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

### Divider

- 你需要使用边框来代替背景色。 这个改动可以防止在缩放屏幕上出现高度不一致的情况。 对于需要自定义边框颜色的用户，你可以改变其需要覆盖的 CSS 属性。

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel（扩展面板）

- 为使用更通用的命名约定，我们将 `ExpansionPanel` 组件重命名为 `Accordion`：

  ```diff
  -import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  -import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  -import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  -import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
  +import Accordion from '@material-ui/core/Accordion';
  +import AccordionSummary from '@material-ui/core/AccordionSummary';
  +import AccordionDetails from '@material-ui/core/AccordionDetails';
  +import AccordionActions from '@material-ui/core/AccordionActions';

  -<ExpansionPanel>
  +<Accordion>
  -  <ExpansionPanelSummary>
  +  <AccordionSummary>
       <Typography>Location</Typography>
       <Typography>Select trip destination</Typography>
  -  </ExpansionPanelSummary>
  +  </AccordionSummary>
  -  <ExpansionPanelDetails>
  +  <AccordionDetails>
       <Chip label="Barbados" onDelete={() => {}} />
       <Typography variant="caption">Select your destination of choice</Typography>
  -  </ExpansionPanelDetails>
  +  </AccordionDetails>
     <Divider />
  -  <ExpansionPanelActions>
  +  <AccordionActions>
       <Button size="small">Cancel</Button>
       <Button size="small">Save</Button>
  -  </ExpansionPanelActions>
  +  </AccordionActions>
  -</ExpansionPanel>
  +</Accordion>
  ```

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<Accordion onChange={(event: React.ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
  ```

- 为保持一致性，我们将 `focused` 重命名为 `focusVisible`。

  ```diff
  <Accordion
    classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
    }}
  />
  ```

- Remove `display: flex` from AccordionDetails as its too opinionated.

### Fab

- 为保持一致性，我们将 `round` 重命名为 `circular`。 可能的值应该是形容词，而不是名词。

  ```diff
  -<Fab variant="round">
  +<Fab variant="circular">
  ```

### Chip

- 为保持一致性，我们将 `visuallyhidden` 重命名为 `visuallyHidden`：
  ```diff
  -<Chip variant="default">
  +<Chip variant="filled">
  ```

### Grid

- 为保持和 CSS 原生属性名字的一致性，我们将 `justify` 属性重命名为 `justifyContent`。

  ```diff
  -<Grid justify="center">
  +<Grid justifyContent="center">
  ```

### GridList

- 为保持和当前 Material Design 命名的一致性，我们将 `GridList` 组件重命名为 `ImageList`。
- 为保持和 CSS 属性名字的一致性，我们将 `spacing` 属性重命名为 `gap`。
- 我们将 GridList 的 `cellHeight` 属性重命名为 `rowHieght`。
- 添加 `variant` 属性到 GridList 中。
- 我们将 GridListItemBar 的 `actionPosition` 属性重命名为 `position`。 (也要注意相关的类名变化)。
- 使用 CSS object-fit。 如果要兼容 IE11，那么你可以使用 polyfill 来转换它，例如 https://www.npmjs.com/package/object-fit-images，或者继续使用 v4 组件。

```diff
-import GridList from '@material-ui/core/GridList';
-import GridListTile from '@material-ui/core/GridListTile';
-import GridListTileBar from '@material-ui/core/GridListTileBar';
+import ImageList from '@material-ui/core/ImageList';
+import ImageListItem from '@material-ui/core/ImageListItem';
+import ImageListItemBar from '@material-ui/core/ImageListItemBar';

-<GridList spacing={8} cellHeight={200}>
-  <GridListTile>
+<ImageList gap={8} rowHeight={200}>
+  <ImageListItem>
     <img src="file.jpg" alt="Image title" />
-    <GridListTileBar
+    <ImageListItemBar
       title="Title"
       subtitle="Subtitle"
     />
-  </GridListTile>
-</GridList>
+  </ImageListItem>
+</ImageList>
```

### Menu

- onE\* 过渡属性已被删除。 请使用 TransitionProps 来代替它。

  ```diff
  <Menu
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  >
  ```

### Modal

- 移除 `onRendered` 属性。 具体迁移方法根据你的使用情况而定，你可以在子元素上使用 [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)，也可以在子组件中使用 effect 钩子。

### 分页组件 Pagination

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  ```diff
  -import Pagination from '@material-ui/lab/Pagination';
  -import PaginationItem from '@material-ui/lab/PaginationItem';
  -import { usePagination } from '@material-ui/lab/Pagination';
  +import Pagination from '@material-ui/core/Pagination';
  +import PaginationItem from '@material-ui/core/PaginationItem';
  +import usePagination from '@material-ui/core/usePagination';
  ```

- 为保持一致性，我们将 `round` 重命名为 `circular`。 可能的值应该是形容词，而不是名词。

  ```diff
  -<Pagination shape="round">
  -<PaginationItem shape="round">
  +<Pagination shape="circular">
  +<PaginationItem shape="circular">
  ```

### Popover

- onE\* 过渡属性已被删除。 请使用 TransitionProps 来代替它。

  ```diff
  <Popover
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

### Portal

- 移除 `onRendered` 属性。 具体迁移方法根据你的使用情况而定，你可以在子元素上使用 [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)，也可以在子组件中使用 effect 钩子。

### Rating

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  ```diff
  -import Rating from '@material-ui/lab/Rating';
  +import Rating from '@material-ui/core/Rating';
  ```

- 为提高无障碍的可访问性，我们更改了默认的空图标。 如果你有自定义了 `icon` 属性，但没有使用 `emptyIcon` 属性，你可以用以下方法还原到以前的行为：

  ```diff
  <Rating
    icon={customIcon}
  + emptyIcon={null}
  />
  ```

- 为保持一致性，我们将 `visuallyhidden` 重命名为 `visuallyHidden`：

  ```diff
  <Rating
    classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
  ```

### RootRef

- 该组件已被移除。 你可以通过 `ref` 属性来获取对我们组件的底层 DOM 节点的引用。 该组件依赖 [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode)，在 [`React.StrictMode`  中已被弃用](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)。

  ```diff
  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
  ```

### Skeleton

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  ```diff
  -import Skeleton from '@material-ui/lab/Skeleton';
  +import Skeleton from '@material-ui/core/Skeleton';
  ```

- 为保持一致性，我们将 `circle` 重命名为 `circular`，`rect` 重命名为 `rectangular`。 可能的值应该是形容词，而不是名词。

  ```diff
  -<Skeleton variant="circle" />
  -<Skeleton variant="rect" />
  -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  +<Skeleton variant="circular" />
  +<Skeleton variant="rectangular" />
  +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  ```

### Slider

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<Slider onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

### Snackbar 消息条

- 现在在大屏幕上的消息条通知会在左下角显示。 这更符合 Gmail、Google Keep、material.io 等应用的行为。 你可以用以下方法恢复到以前的行为：

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- onE\* 过渡属性已被删除。 请使用 TransitionProps 来代替它。

  ```diff
  <Snackbar
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

### SpeedDial

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  ```diff
  -import SpeedDial from '@material-ui/lab/SpeedDial';
  -import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
  -import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
  +import SpeedDial from '@material-ui/core/SpeedDial';
  +import SpeedDialAction from '@material-ui/core/SpeedDialAction';
  +import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
  ```

### Stepper 步骤条组件

- 根组件（Paper）已经被 div 所取代。 Stepper 不再有立体效果，也不再继承 Paper 的属性。 这个改动是为了鼓励开发者进行组合使用。

  ```diff
  -<Stepper elevation={2}>
  -  <Step>
  -    <StepLabel>Hello world</StepLabel>
  -  </Step>
  -</Stepper>
  +<Paper square elevation={2}>
  +  <Stepper>
  +    <Step>
  +      <StepLabel>Hello world</StepLabel>
  +    </Step>
  +  </Stepper>
  +<Paper>
  ```

- 移除内置的 24px 边距。

  ```diff
  -<Stepper>
  -  <Step>
  -    <StepLabel>Hello world</StepLabel>
  -  </Step>
  -</Stepper>
  +<Stepper style={{ padding: 24 }}>
  +  <Step>
  +    <StepLabel>Hello world</StepLabel>
  +  </Step>
  +</Stepper>
  ```

### Table

- 如果你需要自定义表格分页的操作标签（actions labels），那么就必须使用 `getItemAriaLabel` 属性。 这是为了与 `Pagination` 组件保持一致。

  ```diff
  <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après
  + getItemAriaLabel={…}
  ```

### Tabs 选项卡

- TypeScript：`onChange` 中的 `event` 的类型不再是 `React.ChangeEvent`，而是`React.SyntheticEvent`。

  ```diff
  -<Tabs onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- 控制滚动按钮的 API 现已将其分成两个属性。

  - `scrollButtons` 属性根据可用空间来控制滚动按钮何时显示。
  - `allowScrollButtonsMobile` 属性将会移除系统针对隐藏移动端的滚动按钮的 CSS 媒体查询。

  ```diff
  -<Tabs scrollButtons="on" />
  -<Tabs scrollButtons="desktop" />
  -<Tabs scrollButtons="off" />
  +<Tabs scrollButtons allowScrollButtonsMobile />
  +<Tabs scrollButtons />
  +<Tabs scrollButtons={false} />
  ```

### TextField

- 最佳实践是将固定文本区域高度行为与动态文本区域高度行为分开。 要达到此效果，你需要像下面的示例一样使用 `minRows` 属性：

  ```diff
  -<TextField rows={2} maxRows={5} />
  +<TextField minRows={2} maxRows={5} />
  ```

- 为保持与 HTML 属性的一致性，我们将 `rowsMax` 属性重命名为 `maxRows`。

  ```diff
  -<TextField rowsMax={6}>
  +<TextField maxRows={6}>
  ```

### TextareaAutosize

- 我们移除了 `rows` 属性，你需要使用 `minRows` 属性来代替它。 这一变化旨在明确该属性的行为。

  ```diff
  -<TextareaAutosize rows={2} />
  +<TextareaAutosize minRows={2} />
  ```

- 为保持与 HTML 属性的一致性，我们将 `rowsMax` 属性重命名为 `maxRows`。

  ```diff
  -<TextareAutosize rowsMax={6}>
  +<TextareAutosize maxRows={6}>
  ```

- 为保持与 HTML 属性的一致性，我们将 `rowsMin` 属性重命名为 `minRows`。

  ```diff
  -<TextareAutosize rowsMin={1}>
  +<TextareAutosize minRows={1}>
  ```

### ToggleButton

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  ```diff
  -import ToggleButton from '@material-ui/lab/ToggleButton';
  -import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
  +import ToggleButton from '@material-ui/core/ToggleButton';
  +import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
  ```

### 文字排版

- 为了避免 [System](https://material-ui.com/system/basics/) 功能重复，我们替换了 `srOnly` 属性。

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/system';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">创建用户</Typography>
  +<Span>创建用户</Span>
  ```
