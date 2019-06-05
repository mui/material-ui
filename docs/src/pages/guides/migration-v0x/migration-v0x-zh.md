# Migration From v0.x to v1

<p class="description">是的，v1已经发布了！ 利用2年的努力。</p>

## 常问问题

### 哇 - API有所不同！ 这是否意味着1.0完全不同，我将不得不重新学习基础知识，迁移几乎是不可能的？

我很高兴你问！ 答案是不。核心概念没有改变。 您会注意到API提供了更大的灵活性，但这需要付出代价。 我们一直在制作较低级别的组件，从而减少了复杂性。

### 是什么推动了这么大的变化？

材料的UI开始 [3年前](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46)。 从那时起，生态系统发展了很多，我们也学到了很多东西。 [@nathanmarks](https://github.com/nathanmarks/) 启动一项雄心勃勃的任务，从重建材料的UI **地面行动** 采取这方面的知识优势，以解决长期存在的问题。 列举一些主要变化：

- New styling solution using CSS-in-JS (better [customization](/customization/components/) power, better performance)
- 新 [主题处理](/customization/themes/) （嵌套，自支撑等）
- 感谢 [Next.js](https://github.com/zeit/next.js)快速创建文档
- 方式更好 [测试覆盖率](/guides/testing/) （99％以上，在所有主流浏览器上运行， [视觉回归测试](https://www.argos-ci.com/mui-org/material-ui)）
- 完全 [服务器端渲染](/guides/server-rendering/) 支持
- 广泛的 [支持的浏览器](/getting-started/supported-platforms/)

### 我应该从哪里开始迁移？

1. 首先在v0.x版本旁边安装v1.x版本的Material-UI。
    
    带纱：
    
    ```sh
    yarn add material-ui
    yarn add @material-ui/core
    ```
    
    或者用npm：
    
    ```sh
    npm install material-ui
    npm install @material-ui/core
    ```
    
    然后
    
    ```js
    import FlatButton from 'material-ui/FlatButton'; // v0.x
    import Button from '@material-ui/core/Button'; // v1.x
    ```

2. 在项目上运行 [迁移帮助程序](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod)。

3. `MuiThemeProvider` 对于v1.x.是可选的，但如果您有自定义主题，则可以同时使用该组件的v0.x和v1.x版本，如下所示：
    
    ```jsx
    import React from 'react';
    import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
    import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
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
        <V0MuiThemeProvider muiTheme={themeV0}>
          {/*Components*/}
        </V0MuiThemeProvider>
      </MuiThemeProvider>
    );
    }
    
    export default App;
    ```

4. 之后，您可以自由迁移一个组件实例。

## 组件

### 自动补全

Material-UI不提供用于解决此问题的高级API。 You're encouraged you to explore [the solutions the React community has built](/components/autocomplete/).

在未来，我们将研究提供一个简单的组件来解决简单的用例： [＃9997](https://github.com/mui-org/material-ui/issues/9997)。

### Svg图标

在项目上运行 [迁移帮助程序](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod)。

这将应用如下更改：

```diff
-import AddIcon from 'material-ui/svg-icons/Add';
+import AddIcon from '@material-ui/icons/Add';

<AddIcon />
```

### Flat Button

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from '@material-ui/core/Button';

-<FlatButton />
+<Button />
```

### Raised Button

RaisedButton升级路径：

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from '@material-ui/core/Button';

-<RaisedButton />
+<Button variant="contained" />
```

### Subheader

```diff
-import Subheader from 'material-ui/Subheader';
+import ListSubheader from '@material-ui/core/ListSubheader';

-<Subheader>Sub Heading</Subheader>
+<ListSubheader>Sub Heading</ListSubheader>
```

### Toggle

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

### Menu Item

```diff
-import MenuItem from 'material-ui/MenuItem';
+import MenuItem from '@material-ui/core/MenuItem';

-<MenuItem primaryText="Profile" />
+<MenuItem>Profile</MenuItem>
```

### 字体图标

```diff
-import FontIcon from 'material-ui/FontIcon';
+import Icon from '@material-ui/core/Icon';

-<FontIcon>home</FontIcon>
+<Icon>home</Icon>
```

### Circular Progress

```diff
-import CircularProgress from 'material-ui/CircularProgress';
+import CircularProgress from '@material-ui/core/CircularProgress';

-<CircularProgress mode="indeterminate" />
+<CircularProgress variant="indeterminate" />
```

### Drop Down Menu

```diff
-import DropDownMenu from 'material-ui/DropDownMenu';
+import Select from '@material-ui/core/Select';

-<DropDownMenu></DropDownMenu>
+<Select value={this.state.value}></Select>
```

### 继续…

您是否已成功迁移您的应用，并希望帮助社区？ 请帮助我们！ 我们有一个未解决的问题，以完成此迁移指南 [＃7195](https://github.com/mui-org/material-ui/issues/7195)。 Any pull request is welcomed