# 从v0.x版本迁移到v1版本

<p class="description">是的，v1版本已经发布了！ 我们用了两年的努力达到了这个里程碑。</p>

## 常问问题

### 哇—— API 看起来完全不一样！ 这是否意味着1.0完全不同，而我得重新学习基础知识，而迁移是几乎不可能的？

我很高兴你问了！ 答案是不。我们的核心概念并没有改变。 您会注意到 API 的灵活性更强了，但这是有一些代价的。 我们一直在实现一些较低级别的组件，并且减少了复杂性。

### 到底是什么带来了如此巨大的改变呢？

Material-UI 这个项目是从[4年前](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46)开始的。 在此期间，整个个生态系统发展了很多，我们也学到了很多东西。 [@nathanmarks](https://github.com/nathanmarks/) 启动了一项雄心勃勃的任务，将 Material-UI **重新启动**，并利用我们学到的知识，来解决一些长期存在的问题。 譬如这些主要的变化：

- 我们采用 CSS-in-JS 这个新的样式方案（更好的[自定义](/customization/components/)的能力和整体性能）
- 新的 [主题处理](/customization/themes/) （有嵌套，自主支撑等。）
- 感谢 [Next.js](https://github.com/zeit/next.js) 超快地创建文档
- 更容易检测 [测试覆盖率](/guides/testing/) （99％以上，在所有主流浏览器上运行， [视觉回归测试](https://www.argos-ci.com/mui-org/material-ui)）
- 完全[服务器端渲染](/guides/server-rendering/)支持
- 大范围地[支持的浏览器](/getting-started/supported-platforms/)

### 我应该从哪里开始迁移？

1. 首先，和v0.x版本一起，安装v1.x版本的 Material-UI。
    
    用 yarn：
    
    ```sh
    yarn add material-ui
    yarn add @material-ui/core
    ```
    
    或者用 npm：
    
    ```sh
    npm install material-ui
    npm install @material-ui/core
    ```
    
    然后
    
    ```js
    import FlatButton from 'material-ui/FlatButton'; // v0.x
    import Button from '@material-ui/core/Button'; // v1.x
    ```

2. 在您的项目上运行 [迁移帮助程序](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod)。

3. `MuiThemeProvider` 对于v1.x.版本是可选的，但如果您有自定义主题，则可以同时使用该组件的v0.x和v1.x版本，如下所示：
    
    ```jsx
    import React from 'react';
    import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
    import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
    import getMuiTheme from 'material-ui/styles/getMuiTheme';
    
    const theme = createMuiTheme({
    /* v1.x版本的主题 */
    });
    const themeV0 = getMuiTheme({
    /* v0.x 版本的主题*/
    });
    
    function App() {
    return (
      <MuiThemeProvider theme={theme}>
        <V0MuiThemeProvider muiTheme={themeV0}>
          {/*Components*/}
        </V0MuiThemeProvider>
      </MuiThemeProvider>
    );
    }
    
    export default App;
    ```

4. 之后，您可以自由地一次迁移一个组件实例。

## 组件

### Autocomplete（自动补全）

Material-UI 不提供用于解决此问题的高级 API。 我们鼓励您去探索 [React 社区提供的解决方案](/components/autocomplete/) 。

在未来，我们将研究提供一个简单的组件来解决简单的用例： [＃9997](https://github.com/mui-org/material-ui/issues/9997)。

### Svg Icon（Svg图标）

在您的项目上运行 [迁移帮助程序](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod)。

这将应用如下更改：

```diff
-import AddIcon from 'material-ui/svg-icons/Add';
+import AddIcon from '@material-ui/icons/Add';

<AddIcon />
```

### Flat Button（扁平按钮）

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from '@material-ui/core/Button';

-<FlatButton />
+<Button />
```

### Raised Button（凸起的按钮）

凸起按钮的升级的路径：

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from '@material-ui/core/Button';

-<RaisedButton />
+<Button variant="contained" />
```

### Subheader（副标题)

```diff
-import Subheader from 'material-ui/Subheader';
+import ListSubheader from '@material-ui/core/ListSubheader';

-<Subheader>Sub Heading</Subheader>
+<ListSubheader>Sub Heading</ListSubheader>
```

### Toggle（切换）

```diff
-import Toggle from 'material-ui/Toggle';
+import Switch from '@material-ui/core/Switch';

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
+import MenuItem from '@material-ui/core/MenuItem';

-<MenuItem primaryText="Profile" />
+<MenuItem>Profile</MenuItem>
```

### Font Icon（字体图标）

```diff
-import FontIcon from 'material-ui/FontIcon';
+import Icon from '@material-ui/core/Icon';

-<FontIcon>home</FontIcon>
+<Icon>home</Icon>
```

### Circular Progress（环状进度条）

```diff
-import CircularProgress from 'material-ui/CircularProgress';
+import CircularProgress from '@material-ui/core/CircularProgress';

-<CircularProgress mode="indeterminate" />
+<CircularProgress variant="indeterminate" />
```

### Drop Down Menu（下拉式菜单）

```diff
-import DropDownMenu from 'material-ui/DropDownMenu';
+import Select from '@material-ui/core/Select';

-<DropDownMenu></DropDownMenu>
+<Select value={this.state.value}></Select>
```

### 未完待续...

您是否已成功迁移您的应用，并助社区一臂之力？ 请帮助我们！ 我们有一个未解决的问题，以完成此迁移指南 [＃7195](https://github.com/mui-org/material-ui/issues/7195)。 我们欢迎任何 pull request。