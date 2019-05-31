# 最小化打包文件大小

<p class="description">了解有关可用于减少打包文件大小的工具的详细信息。</p>

## 打包文件的大小是很重要的

Material-UI 的打包文件大小至关重要。 每次当我们有一个新的提交时，我们会为每个包以及那些包的至关重要的部分拍个快照（[查看最新的快照](/size-snapshot)）。 结合 [dangerJS](https://danger.systems/js/) 一起，我们可以在每个 Pull Request 中都可以查看[详细的打包文件的大小变化](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) 。

## 如何减少打包文件的体积？

为方便起见，Material-UI 在顶级 `material-ui` 的 import 上暴露其完整 API。 如果您正在使用 ES 6 的模块，以及一个支持 tree-shaking 的 bundle（ 要求 [`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/)，[带有 flag 的 `parcel 打包`](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) ，那么您则可以安全的使用命名的 imports，并且在您的 bundle 文件里面，预期会产生一个的最小配置的 Material-UI 组件。

```js
import { Button, TextField } from '@material-ui/core';
```

请注意 tree-shaking 通常只运用于生产环境的打包优化。 开发环境的打包则涵盖了完整的库，因此加载时间会比较慢。 在当您导入 `@material-ui/icons` 的时候，这个情况特别显著。 加载时间会大约比那些从顶层 API 的名字导入方式慢六倍。

如果你认为这将是一个问题，你可以有以下几种选择：

### 选项1

你可以按需引入，以避免导入不需要用到的模块 全局导入是这样的

```js
import { Button, TextField } from '@material-ui/core';
```

现在我们根据需要引入部分组件

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

While importing directly in this manner doesn't use the exports in [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js), this file can serve as a handy reference as to which modules are public.

Be aware that we only support first and second leve imports. Anything below is considered private and can cause module duplication in your bundle.

```js
// OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1st or top-level

// OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2nd level

// NOT OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3rd level
```

### 选项2

**Important note**: This is only supported for `@material-ui/icons`. We recommend this approach if you often restart your development build.

Another option is to keep using named imports, but still have shorter start up times by using `babel` plugins.

Pick one of the following plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) with the following configuration: 
        js
        [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm', // or '' if your bundler does not support ES modules
          camel2DashComponentName: false,
        },
        ];

- [<0> babel-plugin-transform-imports </0>](https://www.npmjs.com/package/babel-plugin-transform-import) 和` babel-plugin-import `的api不同，但做了同样的事情。 
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

## ECMAScript中

The package published on npm is **transpiled**, with [Babel](https://github.com/babel/babel), to take into account the [supported platforms](/getting-started/supported-platforms/).

We also publish a second version of the components. 您可以在< [`/es` folder](https://unpkg.com/@material-ui/core@next/es/)下找到此版本 。 All the non-official syntax is transpiled to the [ECMA-262 standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm), nothing more. This can be used to make separate bundles targeting different browsers. Older browsers will require more JavaScript features to be transpiled, which increases the size of the bundle. No polyfills are included for ES2015 runtime features. IE11+ and evergreen browsers support all the necessary features. If you need support for other browsers, consider using [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill).

⚠️为了最小化在用户的束的重复代码，我们 **强烈阻止** 从使用库作者 `/es` 的文件夹。