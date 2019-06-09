# 最小化打包文件大小

<p class="description">了解有关可用于减少打包文件大小的工具的详细信息。</p>

## 打包文件的大小是很重要的

Material-UI 的打包文件大小至关重要。 每次当我们有一个新的提交时，我们会为每个包以及那些包的至关重要的部分拍个快照（[查看最新的快照](/size-snapshot)）。 结合 [dangerJS](https://danger.systems/js/) 一起，我们可以在每个 Pull Request 中都可以查看[详细的打包文件的大小变化](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) 。

## 如何减少打包文件的体积？

为方便起见，Material-UI 在顶级 `material-ui` 的 import 上暴露其完整 API。 如果您正在使用 ES 6 的模块，以及一个支持 tree-shaking 的 bundle（ 要求 [`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/)，[带有 flag 的 `parcel 打包`](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) ，那么您则可以安全的使用命名导入，并且在您的 bundle 文件里面，预期会产生一个的最小配置的 Material-UI 组件。

```js
import { Button, TextField } from '@material-ui/core';
```

请注意 tree-shaking 通常只运用于生产环境的打包优化。 开发环境的打包则涵盖了完整的库，因此加载时间会比较慢。 在当您导入 `@material-ui/icons` 的时候，这个情况特别显著。 加载时间会大约比那些从顶层 API 的命名导入方式慢六倍。

如果您觉得这样不妥，您还有以下几个选择：

### 选项1

您可以使用路径导入，这样可以避免导入用不到的模块。 例如，相比这样导入：

```js
import { Button, TextField } from '@material-ui/core';
```

可以使用：

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

尽管这样直接导入并不会使用 [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js) 中的导出模式，但是对于那些公开的模块来说，此文件仍可以作为一个方便的参考。

请注意，我们只支持第一级和第二级的导入。 以下的这些例子是私有的，它们会给你的打包文件带来重复的模块。

```js
// 可以
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 第一级或者顶层

// 可以
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 第二级

// 不可以
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 第三极
```

### 选项2

**重要提示**：此方法只支持 `@material-ui/icons`。 若您经常重新启动您的开发构建，我们推荐你使用此方法。

另一个选项则是继续使用命名导入，但是通过 `babel` 的插件，仍然可以缩短启动时间。

请在以下插件中选择一个：

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 基于以下配置： 
        js
        [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm', // or '' if your bundler does not support ES modules
          camel2DashComponentName: false,
        },
        ];

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-import) 和 ` babel-plugin-import `的 api 是异曲同工的。 
        js
        [
        'transform-imports',
        {
          '@material-ui/icons': {
            transform: '@material-ui/icons/esm/${member}',
            // for bundlers not supporting ES modules use:
            // transform: '@material-ui/icons/${member}',
          },
        },
        ];

## ECMAScript

考虑到一些[支持的平台](/getting-started/supported-platforms/)，在 npm 上发布的包是和 [Babel](https://github.com/babel/babel) 一起被**编译**的。

我们同时也发布了这些组件的第二种版本。 您可以在 [`/es` 文件夹](https://unpkg.com/@material-ui/core@next/es/)下找到此版本。 所有非官方的语义都被编译成[ECMA-262 的标准](https://www.ecma-international.org/publications/standards/Ecma-262.htm)，仅此而已。 这样一来，针对不同的浏览器，您可以编译出不同的打包文件。 一些旧的浏览器需编译一些 JavaScript 的功能，这样会增加打包文件的大小。 ES2015 运行的时候的功能中不包含垫片。 IE11+ 和一些长青浏览器会支持所有必要的功能。 如果您需要支持其他浏览器，请考虑使用 [`@ babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill)。

⚠️为了使得用户打包文件中的重复代码最小化，我们**强烈阻止**库的作者使用`/es` 文件夹。