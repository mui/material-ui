# 从 v0.x 版本迁移到 v1 版本

<p class="description">是的，v1 版本已经发布了！ 我们用了两年的努力达到了这个里程碑。</p>

## 常问问题

### 哇—— API 看起来完全不一样！ Does that mean 1.0 is completely different, I'll have to learn the basics all over again, and migrating will be practically impossible?

I'm glad you asked! The answer is no. The core concepts haven't changed. 您会注意到 API 提供了更多的灵活性，但这有一定的成本——一些更低级别的组件提取了较低的复杂性。

### 到底是什么带来了如此巨大的改变呢？

MUI was started [4 years ago](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46). 在此期间，整个个生态系统发展了很多，我们也学到了很多东西。 [@nathanmarks](https://github.com/nathanmarks/) started an ambitious task, rebuilding MUI from the **ground-up** taking advantage of this knowledge to address long-standing issues. 譬如这些主要的变化：

- 我们采用 CSS-in-JS 这个新的样式方案（更好的[自定义](/customization/how-to-customize/)的能力和整体性能）
- 新的主题处理 （有嵌套，自主支撑等。）
- Blazing fast documentation thanks to [Next.js](https://github.com/vercel/next.js)
- 更容易检测 [测试覆盖率](/guides/testing/) （99％以上，在所有主流浏览器上运行， [视觉回归测试](https://www.argos-ci.com/mui-org/material-ui)）
- 完全的 [服务器端渲染](/guides/server-rendering/) 支持
- 大范围地 [支持的浏览器](/getting-started/supported-platforms/)

### 我应该从哪里开始迁移？

1. Start by installing the v1.x version of MUI along side the v0.x version.

用 yarn：

```sh
yarn add material-ui
yarn add @mui/material
```

或者用 npm：

```sh
npm install material-ui
npm install @mui/material
```

然后

```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
import Button from '@mui/material/Button'; // v1.x
```

2. 在您的项目上运行 [迁移帮助程序](https://github.com/mui-org/material-ui/tree/master/packages/mui-codemod)。
3. `MuiThemeProvider` 对于v1.x.版本是可选的，但如果您有自定义主题，则可以同时使用该组件的v0.x和v1.x版本，如下所示：

```jsx
import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@mui/material/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = createMuiTheme({
  /* theme for v1.x */
});
const themeV0 = getMuiTheme({
  /* theme for v0.x */
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <V0MuiThemeProvider muiTheme={themeV0}>{/*Components*/}</V0MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
```

4. 之后，您可以自由地一次迁移一个组件实例。

## Components 组件

### Autocomplete

MUI doesn't provide a high-level API for solving this problem. 我们鼓励您去探索 [React 社区提供的解决方案](/components/autocomplete/) 。

在未来，我们将研究提供一个简单的组件来解决简单的用例： [＃9997](https://github.com/mui-org/material-ui/issues/9997)。

### Svg Icon（Svg图标）

Run [the migration helper](https://github.com/mui-org/material-ui/tree/master/packages/mui-codemod) on your project.

这将应用如下更改：

```diff
-import AddIcon from 'material-ui/svg-icons/Add';
+import AddIcon from '@mui/icons-material/Add';

<AddIcon />
```

### Flat Button（扁平按钮）

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from '@mui/material/Button';

-<FlatButton />
+<Button />
```

### Raised Button（凸起的按钮）

凸起按钮的升级的路径：

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from '@mui/material/Button';

-<RaisedButton />
+<Button variant="contained" />
```

### Subheader（副标题)

```diff
-import Subheader from 'material-ui/Subheader';
+import ListSubheader from '@mui/material/ListSubheader';

-<Subheader>Sub Heading</Subheader>
+<ListSubheader>Sub Heading</ListSubheader>
```

### Toggle（切换）

```diff
-import Toggle from 'material-ui/Toggle';
+import Switch from '@mui/material/Switch';

-<Toggle
-  toggled={this.state.checkedA}
-  onToggle={this.handleToggle}
-/>
+<Switch
+  checked={this.state.checkedA}
+  onChange={this.handleSwitch}
+/>
```

### Menu Item（菜单项）

```diff
-import MenuItem from 'material-ui/MenuItem';
+import MenuItem from '@mui/material/MenuItem';

-<MenuItem primaryText="Profile" />
+<MenuItem>Profile</MenuItem>
```

### Font Icon（字体图标）

```diff
-import FontIcon from 'material-ui/FontIcon';
+import Icon from '@mui/material/Icon';

-<FontIcon>home</FontIcon>
+<Icon>home</Icon>
```

### Circular Progress（环状进度条）

```diff
-import CircularProgress from 'material-ui/CircularProgress';
+import CircularProgress from '@mui/material/CircularProgress';

-<CircularProgress mode="indeterminate" />
+<CircularProgress variant="indeterminate" />
```

### Drop Down Menu（下拉式菜单）

```diff
-import DropDownMenu from 'material-ui/DropDownMenu';
+import Select from '@mui/material/Select';

-<DropDownMenu></DropDownMenu>
+<Select value={this.state.value}></Select>
```

### 未完待续...

您是否已成功迁移您的应用，并助社区一臂之力？ 要完成本迁移指南 [#7195](https://github.com/mui-org/material-ui/issues/7195)，还存在一个未决问题。 我们欢迎任何 pull request。
