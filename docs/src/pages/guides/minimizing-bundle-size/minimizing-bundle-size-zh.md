# Minimizing Bundle Size 最小化打包文件大小

<p class="description">了解有关可用于减少打包文件大小的工具的详细信息。</p>

## 打包文件的大小是很重要的

Material-UI 的打包文件大小至关重要。 每一次提交代码时，我们都会对每个包和这些包的关键部分进行大小快照（size snapshots)（[查看最新的快照](/size-snapshot)）。 结合 [dangerJS](https://danger.systems/js/) 一起，我们可以在每个 Pull Request 中都可以查看[详细的打包文件的大小变化](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) 。

## 何时以及如何使用 tree-shaking?

在现代框架中，Material-UI 的 Tree-shaking 可开箱即用。 Material-UI 在导入顶层的 `material-ui` 时会提供出其完整的 API。 如果您使用的是 ES6 模块和支持 tree-shaking 的模块打包器（[`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)），那么您就可以安全地使用模块的名字进行导入并且自动获得压缩过的打包大小：

```js
import { Button, TextField } from '@material-ui/core';
```

⚠️ 只有当您想要优化您的开发启动时间，或者您使用的是不支持 tree-shaking 的较旧的模块打包器时，才需要以下说明。

## 开发者环境

开发者环境下的模块打包器能够包含完整的库，但这会造成**较慢的启动时间**。 如果您从 `@material-ui/icons` 这个库进行导入操作时，这一点尤其明显。 加载时间会大约比那些从顶层 API 的命名导入方式慢六倍。

如果您觉得这样不妥，您还有以下几个选择：

### 选项1

您可以使用路径导入，这样可以避免导入用不到的模块。 例如，使用：

```js
// 🚀 快速的
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

而不是像这样通过顶层的方式进行导入（不使用 Babel 插件）：

```js
import { Button, TextField } from '@material-ui/core';
```

这是我们在所有演示中记录的选项，因为它不需要配置。 我们鼓励库的创建者来扩充已有组件。 请前往带来最佳 DX 和 UX 的方法： [选项2](#option-2)。

尽管这样直接导入并不会使用 [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js) 中的导出，但是对于那些公开的模块来说，此文件仍可以作为一个方便的参考。

请注意，我们只支持第一级和第二级的导入。 再深入的导入就是私有的，它们会造成一些问题，譬如你的打包文件会产生重复的模块。

```js
// ✅ 可行
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^  第一级或者最上级

// ✅ 可行
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 第二级

// ❌ 不可行
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 第三级
```

如果您正在使用 `eslint`，您可以通过 [`no-restricted-imports` 规则](https://eslint.org/docs/rules/no-restricted-imports)拦截有问题的导入。 以下的 `.eslintrc` 配置将突出一些有问题的从 `@material-ui` 包的导入:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@material-ui/*/*/*", "!@material-ui/core/test-utils/*"]
      }
    ]
  }
}
```

### 选项2

此选项提供了最佳的用户体验和开发者体验：

- UX: 即使您的打包文件不支持，Babel 插件能够开启顶层的 tree-shaking 功能。
- DX: 在开发模式下，使用Babel 插件时，启动时间能够和方案 1 一样快。
- DX: 这种语法减少了代码的重复，只需要一次导入就可以实现多个模块。 总的来说，代码会变得更容易阅读，在导入一个新模块时，您也更不容易出错。
```js
import { Button, TextField } from '@material-ui/core';
```

但是，您需要正确地实施以下两步。

#### 1. 配置 Babel

请在以下插件中选择一个：

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的配置如下：

  `yarn add -D babel-plugin-import`

  在您的项目根目录创建一个 `.babelrc.js` 文件：

  ```js
  const plugins = [
    [
      'babel-plugin-import',
      {
        'libraryName': '@material-ui/core',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        'libraryDirectory': 'esm',
        'camel2DashComponentName': false
      },
      'core'
    ],
    [
      'babel-plugin-import',
      {
        'libraryName': '@material-ui/icons',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        'libraryDirectory': 'esm',
        'camel2DashComponentName': false
      },
      'icons'
    ]
  ];

  module.exports = {plugins};
  ```

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) 的配置如下：

  `yarn add -D babel-plugin-transform-imports`

  在您的项目根目录创建一个 `.babelrc.js` 文件：

  ```js
  const plugins = [
    [
      'babel-plugin-transform-imports',
      {
        '@material-ui/core': {
          // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
          'transform': '@material-ui/core/esm/${member}',
          'preventFullImport': true
        },
        '@material-ui/icons': {
          // Use "transform: '@material-ui/icons/${member}'," if your bundler does not support ES modules
          'transform': '@material-ui/icons/esm/${member}',
          'preventFullImport': true
        }
      }
    ]
  ];

  module.exports = {plugins};
  ```

如果您正在使用 Create React App，您将需要使用几个项目，让您可以使用 `.babelrc` 来配置，而无需 ejecting。

  `yarn add -D react-app-rewired customize-cra`

  在根目录创建一个 `config-overrides.js` 文件：

  ```js
  /* config-overrides.js */
  const { useBabelRc, override } = require('customize-cra')

  module.exports = override(
    useBabelRc()
  );
  ```

  如果您愿意，使用此 [配置](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options) ，那么就可以通过 `config-overrides.js` 而不是 `.babelrc` 来配置 `babel-plugin-import` 。

  修改您在 `package.json` 中的启动命令：

```diff
  "scripts": {
-  "start": "react-scripts start"
+  "start": "react-app-rewired start"
  }
```

  注意：您可能会遇到如下错误：

  > Module not found: Can't resolve '@material-ui/core/makeStyles' in '/your/project'

  这是因为 `@material-ui/styles` 通过 `核心（core）` 重新导出，但是不允许完整的导入模块。

  您的代码中可能存在这样的模块导入方式：

  ```js
  import { makeStyles, createStyles } from '@material-ui/core';
  ```

  要解决它也很简单，您只需要这样单独定义导入模块：

  ```js
  import { makeStyles, createStyles } from '@material-ui/core/styles';
  ```

  这样一来，你可以享受更快的启动时间了。

#### 2. 转换您的所有模块导入方式

最后，您可以使用这个 [顶级导入（top-level-imports）](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-codemod/README.md#top-level-imports) codemod 来转换现有的源码。 它将执行以下的差异：

```diff
-import Button from '@material-ui/core/Button';
-import TextField from '@material-ui/core/TextField';
+import { Button, TextField } from '@material-ui/core';
```

## ECMAScript

考虑到一些 [支持的平台](/getting-started/supported-platforms/)，在 npm 上发布的这个依赖包是和 [Babel](https://github.com/babel/babel) 一起被**编译**过的。

第二个版本的组件也已经发布，你可以在 [`/es` 文件夹](https://unpkg.com/@material-ui/core/es/) 下找到。 所有非官方的语义都被编译成 [ECMA-262 的标准](https://www.ecma-international.org/publications/standards/Ecma-262.htm)，仅此而已。 这样一来，针对不同的浏览器，您可以编译出不同的打包文件。 一些旧的浏览器需编译一些 JavaScript 的功能，这样会增加打包文件的大小。 ES2015 运行的时候的功能中不包含兼容性的库的补充（polyfills）。 IE11+ 和一些长青浏览器会支持所有必要的功能。 如果您需要支持其他浏览器，请考虑使用 [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill)。

⚠️为了最大限度地减少用户捆绑包中的代码重复，我们**强烈建议**库作者不要使用 `/es` 文件夹。
