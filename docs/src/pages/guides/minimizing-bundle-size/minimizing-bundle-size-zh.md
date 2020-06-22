# Minimizing Bundle Size 最小化打包文件大小

<p class="description">了解有关可用于减少打包文件大小的工具的详细信息。</p>

## 打包文件的大小是很重要的

Material-UI 的打包文件大小至关重要。 每一次代码提交我们都会对每个包和这些包的关键部分的大小进行快照（[查看最新的快照](/size-snapshot)）。 结合 [dangerJS](https://danger.systems/js/) 一起，我们可以在每个 Pull Request 中都可以查看[详细的打包文件的大小变化](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) 。

## 何时以及如何使用 tree-shaking?

在现代框架中，Material-UI 的 Tree-shaking 可开箱即用。 Material-UI 在导入顶层的 `material-ui` 时会暴露出其完整的 API。 如果您使用的是 ES6 模块和支持 tree-shaking 的模块打包器（[`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)），那么您就可以安全的使用模块的名字进行导入并且自动获得压缩过的打包大小：

```js
import { Button, TextField } from '@material-ui/core';
```

⚠️ 只有当您想要优化您的开发启动时间，或者您使用的是不支持 tree-shaking 的较旧的模块打包器时，才需要以下说明。

## 开发者环境

开发者环境下的模块打包器能够包含完整的库，但这可能会导致**较慢的启动时间**。 如果您从 `@material-ui/icons` 这个库进行导入操作时，这一点尤其明显。 加载时间会大约比那些从顶层 API 的命名导入方式慢六倍。

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

这是我们在所有演示中记录的选项，因为它不需要配置。 It is encouraged for library authors extending the components. Head to [Option 2](#option-2) for the approach that yields the best DX and UX.

尽管这样直接导入并不会使用 [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js) 中的导出模式，但是对于那些公开的模块来说，此文件仍可以作为一个方便的参考。

请注意，我们只支持第一级和第二级的导入。 Anything deeper is considered private and can cause issues, such as module duplication in your bundle.

```js
// ✅ OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1st or top-level

// ✅ OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2nd level

// ❌ NOT OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3rd level
```

If you're using `eslint` you can catch problematic imports with the [`no-restricted-imports` rule](https://eslint.org/docs/rules/no-restricted-imports). The following `.eslintrc` configuration will highlight problematic imports from `@material-ui` packages:

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

This option provides the best User Experience and Developer Experience:

- UX: The Babel plugin enables top level tree-shaking even if your bundler doesn't support it.
- DX: The Babel plugin makes startup time in dev mode as fast as Option 1.
- DX: This syntax reduces the duplication of code, requiring only a single import for multiple modules. Overall, the code is easier to read, and you are less likely to make a mistake when importing a new module.
```js
import { Button, TextField } from '@material-ui/core';
```

However, you need to apply the two following steps correctly.

#### 1、 Configure Babel

请在以下插件中选择一个：

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) with the following configuration:

  `yarn add -D babel-plugin-import`

  Create a `.babelrc.js` file in the root directory of your project:

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

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) with the following configuration:

  `yarn add -D babel-plugin-transform-imports`

  Create a `.babelrc.js` file in the root directory of your project:

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

If you are using Create React App, you will need to use a couple of projects that let you use `.babelrc` configuration, without ejecting.

  `yarn add -D react-app-rewired customize-cra`

  Create a `config-overrides.js` file in the root directory:

  ```js
  /* config-overrides.js */
  const { useBabelRc, override } = require('customize-cra')

  module.exports = override(
    useBabelRc()
  );
  ```

  If you wish, `babel-plugin-import` can be configured through `config-overrides.js` instead of `.babelrc` by using this [configuration](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options).

  Modify your `package.json` start command:

```diff
  "scripts": {
-  "start": "react-scripts start"
+  "start": "react-app-rewired start"
  }
```

  Note: You may run into errors like these:

  > Module not found: Can't resolve '@material-ui/core/makeStyles' in '/your/project'

  This is because `@material-ui/styles` is re-exported through `core`, but the full import is not allowed.

  You have an import like this in your code:

  ```js
  import { makeStyles, createStyles } from '@material-ui/core';
  ```

  The fix is simple, define the import separately:

  ```js
  import { makeStyles, createStyles } from '@material-ui/core/styles';
  ```

  Enjoy significantly faster start times.

#### 2。 Convert all your imports

Finally, you can convert your existing codebase to this option with this [top-level-imports](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-codemod/README.md#top-level-imports) codemod. It will perform the following diffs:

```diff
-import Button from '@material-ui/core/Button';
-import TextField from '@material-ui/core/TextField';
+import { Button, TextField } from '@material-ui/core';
```

## ECMAScript

考虑到一些[支持的平台](/getting-started/supported-platforms/)，在 npm 上发布的包是和 [Babel](https://github.com/babel/babel) 一起被**编译**的。

A second version of the components is also published, which you can find under the [`/es` folder](https://unpkg.com/@material-ui/core/es/). 所有非官方的语义都被编译成[ECMA-262 的标准](https://www.ecma-international.org/publications/standards/Ecma-262.htm)，仅此而已。 这样一来，针对不同的浏览器，您可以编译出不同的打包文件。 一些旧的浏览器需编译一些 JavaScript 的功能，这样会增加打包文件的大小。 ES2015 运行的时候的功能中不包含垫片。 IE11+ 和一些长青浏览器会支持所有必要的功能。 如果您需要支持其他浏览器，请考虑使用 [`@ babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill)。

⚠️ In order to minimize duplication of code in users' bundles, library authors are **strongly discouraged** from using the `/es` folder.
