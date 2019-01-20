# 最小化捆绑包大小

<p class="description">了解有关可用于减少捆绑包大小的工具的详细信息。</p>

## 捆绑尺寸很重要

Material-UI的包大小非常严重，因此使用 [大小限制](https://github.com/ai/size-limit) 来防止引入任何大小的回归。 每次提交时都会检查包的大小：

- 导入 **所有组件**。 这让我们可以发现任何 [不需要的包大小增加](https://github.com/mui-org/material-ui/blob/master/.size-limit.js#L30)。
- 导入 **单个组件**。 这让我们估计 [核心依赖关系](https://github.com/mui-org/material-ui/blob/master/.size-limit.js#L24)的开销。 （样式，主题等：~18 kB gzipped）

## 如何减少捆绑尺寸？

为方便起见，Material-UI在顶级 `material-ui` 导入上公开其完整API。 使用这是好的，如果你有树摇工作， 然而，在树上摇晃不支持或在构建链构成的情况下， **这将导致整个库及其依赖要包含** 在您的客户端包。

您有几种方法可以克服这种情况：

### 选项1

您可以直接从 `material-ui /` 导入，以避免拉入未使用的模块。 例如，而不是：

```js
import { Button, TextField } from '@material-ui/core';
```

使用：

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

虽然以这种方式直接导入不使用 [`material-ui / index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js)的导出，但此文件可以作为公共哪些模块的方便参考。 任何未在此处列出的内容都应被视为 **私有**，如有更改，恕不另行通知。 例如， `Tabs` 组件是公共模块，而 `TabIndicator` 是私有模块。

### 选项2

另一种选择是继续使用缩短的导入，如下所示，但由于 **Babel插件**，仍然优化了捆绑的大小：

```js
import { Button, TextField } from '@material-ui/core';
```

选择以下插件之一：

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 可以自定义，并且有足够的调整与Material-UI一起使用。
- [babel-transform-imports](https://bitbucket.org/amctheatres/babel-transform-imports) 有一个不同的api而不是 `babel-plugin-import` 但是做同样的事情。
- [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) 旨在开箱即用，包含所有 `package.json`。

**重要说明**：在向项目添加树摇动功能之前，这两个选项 *都应该是临时的*。

## ECMAScript中

在npm上发布的包是 **转换为**，带有 [Babel](https://github.com/babel/babel)，以考虑 [支持的平台](/getting-started/supported-platforms/)。

我们还发布了第二个版本的组件，以针对 **常绿浏览器**。 您可以在 [`/ es` 文件夹](https://unpkg.com/@material-ui/core/es/)下找到此版本。 所有非官方语法都被转换为 [ECMA-262标准](https://www.ecma-international.org/publications/standards/Ecma-262.htm)，仅此而已。 这可用于制作针对不同浏览器的单独捆绑包。 较旧的浏览器将需要更多的JavaScript功能进行转换， 会增加捆绑包的大小。 ES2015运行时功能不包含任何填充。 IE11 +和常绿的浏览器支持所有的 必要的功能。 如果您需要支持其他浏览器，请考虑使用 [`@ babel / polyfill`](https://www.npmjs.com/package/@babel/polyfill)。

⚠️为了最小化在用户的束的重复代码，我们 **强烈阻止** 从使用库作者 `/ ES` 的文件夹。