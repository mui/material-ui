# Minimizing bundle size

<p class="description">了解有关可用于减少打包文件大小的工具的详细信息。</p>

## 打包文件的大小是很重要的

The bundle size of MUI is taken very seriously. 每一次提交代码时，我们都会对每个包和这些包的关键部分进行大小快照（size snapshots)（[查看最新的快照](/size-snapshot)）。 结合 [dangerJS](https://danger.systems/js/) 一起，我们可以在每个 Pull Request 中都可以查看[详细的打包文件的大小变化](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) 。

## 何时以及如何使用 tree-shaking?

Tree-shaking of MUI works out of the box in modern frameworks. MUI exposes its full API on the top-level `material-ui` import. If you're using ES6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and still get an optimized bundle size automatically:

```js
import { Button, TextField } from '@mui/material';
```

⚠️ 只有当您想要优化您的开发启动时间，或者您使用的是不支持 tree-shaking 的较旧的模块打包器时，才需要以下说明。

## 开发者环境

开发者环境下的模块打包器能够包含完整的库，但这会造成**较慢的启动时间**。 This is especially noticeable if you import from `@mui/icons-material`. 加载时间会大约比那些从顶层 API 的命名导入方式慢六倍。

如果您觉得这样不妥，您还有以下几个选择：

### 选项1

您可以使用路径导入，这样可以避免导入用不到的模块。 例如，使用：

```js
// 🚀 Fast
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
```

instead of top-level imports (without a Babel plugin):

```js
import { Button, TextField } from '@mui/material';
```

This is the option we document in all the demos since it requires no configuration. It is encouraged for library authors that are extending the components. 请前往带来最佳 DX 和 UX 的方法： [选项2](#option-2)。

While importing directly in this manner doesn't use the exports in [the main file of `@mui/material`](https://unpkg.com/@mui/material), this file can serve as a handy reference as to which modules are public.

Be aware that we only support first and second-level imports. 再深入的导入就是私有的，它们会造成一些问题，譬如你的打包文件会产生重复的模块。

```js
// ✅ OK
import { Add as AddIcon } from '@mui/icons-material';
import { Tabs } from '@mui/material';
//                         ^^^^^^^^ 1st or top-level

// ✅ OK
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
//                              ^^^^ 2nd level

// ❌ NOT OK
import TabIndicator from '@mui/material/Tabs/TabIndicator';
//                                           ^^^^^^^^^^^^ 3rd level
```

如果您正在使用 `eslint`，您可以通过 [`no-restricted-imports` 规则](https://eslint.org/docs/rules/no-restricted-imports)拦截有问题的导入。 The following `.eslintrc` configuration will highlight problematic imports from `@mui` packages:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*", "!@mui/material/test-utils/*"]
      }
    ]
  }
}
```

### 选项2

此选项提供了最佳的用户体验和开发者体验：

- UX: The Babel plugin enables top-level tree-shaking even if your bundler doesn't support it.
- DX: 在开发模式下，使用Babel 插件时，启动时间能够和方案 1 一样快。
- DX: 这种语法减少了代码的重复，只需要一次导入就可以实现多个模块。 总的来说，代码会变得更容易阅读，在导入一个新模块时，您也更不容易出错。

```js
import { Button, TextField } from '@mui/material';
```

但是，您需要正确地实施以下两步。

#### 1. 配置 Babel

请在以下插件中选择一个：

- [babel-plugin-import](https://github.com/umijs/babel-plugin-import) with the following configuration:

  `yarn add -D babel-plugin-import`

  在您的项目根目录创建一个 `.babelrc.js` 文件：

  ```js
  const plugins = [
    [
      'babel-plugin-import',
      {
        libraryName: '@mui/material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@mui/icons-material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ];

  module.exports = { plugins };
  ```

- [babel-plugin-direct-import](https://github.com/umidbekk/babel-plugin-direct-import) with the following configuration:

  `yarn add -D babel-plugin-direct-import`

  Create a `.babelrc.js` file in the root directory of your project:

  ```js
  const plugins = [
    [
      'babel-plugin-direct-import',
      { modules: ['@mui/material', '@mui/icons-material'] },
    ],
  ];

  module.exports = { plugins };
  ```

如果您正在使用 Create React App，您将需要使用几个项目，让您可以使用 `.babelrc` 来配置，而无需 ejecting。

`yarn add -D react-app-rewired customize-cra`

在根目录创建一个 `config-overrides.js` 文件：

```js
/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());
```

如果您愿意，使用此 [配置](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options) ，那么就可以通过 `config-overrides.js` 而不是 `.babelrc` 来配置 `babel-plugin-import` 。

修改你的 `package.json` 命令：

```diff
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

这样一来，你可以享受更快的启动时间了。

#### 2. 转换您的所有模块导入方式

Finally, you can convert your existing codebase to this option with this [top-level-imports codemod](https://www.npmjs.com/package/@mui/codemod#top-level-imports). 它将执行以下的差异：

```diff
-import Button from '@mui/material/Button';
-import TextField from '@mui/material/TextField';
+import { Button, TextField } from '@mui/material';
```

## 可用的捆绑包

考虑到一些 [支持的平台](/getting-started/supported-platforms/)，在 npm 上发布的这个依赖包是和 [Babel](https://github.com/babel/babel) 一起被**编译**过的。

⚠️ Developers are **strongly discouraged** to import from any of the other bundles directly. Otherwise it's not guaranteed that dependencies used also use legacy or modern bundles. Instead, use these bundles at the bundler level with e.g [Webpack's `resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias):

```js
{
  resolve: {
    alias: {
      '@mui/base': '@mui/base/legacy',
      '@mui/lab': '@mui/lab/legacy',
      '@mui/material': '@mui/material/legacy',
      '@mui/styled-engine': '@mui/styled-engine/legacy',
      '@mui/system': '@mui/system/legacy',
    }
  }
}
```

### 现代的捆绑包

The modern bundle can be found under the [`/modern` folder](https://unpkg.com/@mui/material/modern/). 它的目标是最新发布的常青（evergreen）浏览器版本（Chrome、Firefox、Safari、Edge）。 这样一来，针对不同的浏览器，您可以编译出不同的打包文件。

### 旧版的捆绑包

如果你需要对 IE11 进行兼容支持，那么你不能在不适用转换（transpilation）的情况下使用默认或者 modern bundle。 However, you can use the legacy bundle found under the [`/legacy` folder](https://unpkg.com/@mui/material/legacy/). 你不需要编写额外的 polyfills 来转换它。
