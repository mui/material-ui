# 迁移到v5：开始

<p class="description">本指南解释了如何以及为什么要从Material UI v4迁移到v5。</p>

## Material UI v5的迁移

1. 着手进行 👈 _你在这里_
2. [突破性变化第一部分：样式和主题](/material-ui/migration/v5-style-changes/)
3. [突破性变化第二部分：组件](/material-ui/migration/v5-component-changes/)
4. [从JSS迁移](/material-ui/migration/migrating-from-jss/)
5. [故障排除](/material-ui/migration/troubleshooting/)

## 简介

这是一个由多部分组成的系列文件中的第一份文件，指导你将你的应用程序从Material UI v4升级到v5。

我们强烈建议运行我们的[codemods](#run-codemods)以提高效率--这些将自动解决v5中引入的许多[破坏性变化](#address-breaking-changes)。

V5最大的变化之一是将JSS替换为[Emotion](https://emotion.sh/docs/introduction)作为默认的样式解决方案。

请注意，你可以继续使用JSS为组件添加重写（例如`makeStyles`, `withStyles`），即使在迁移到v5之后。 一旦你完成了v5升级的其余部分，我们建议逐步转移到新的样式引擎上。

这个过程在[从JSS迁移](/material-ui/migration/migrating-from-jss/)中有所涉及。

:::info
需要参考旧版本的文档吗？ 在这里查看[v4的文档](https://v4.mui.com/)
:::

如果你正在使用Next.js，并且不确定如何配置SSR以与Emotion 和 JSS一起工作，请看这个[例子项目](https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript-v4-migration)
:::

## 为什么你应该迁移

Material UI v5与v4相比，包括许多错误修复和改进。

这些改进中最主要的是新的样式引擎，当涉及到动态样式时，它在性能上有了显著的进步，同时也提供了更愉快的开发者体验。

此外，v5是唯一完全支持React 18的版本，所以你需要迁移以利用最新的React功能。

想了解更多，请查看[关于Material UI v5](https://mui.com/blog/mui-core-v5/)发布的博文。

:::info
💡 在你进行的过程中创建小的提交，以确保顺利迁移。

如果你在途中遇到任何问题，请查看[故障排除](/material-ui/migration/troubleshooting/)文档。

对于那里没有解决的问题，请用这种标题格式[创建一个问题](https://github.com/mui/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.yml)。**[Migration] 你的问题的摘要**。
:::

## 支持的浏览器和Node版本

默认捆绑包在v5中已经改变。

The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

默认捆绑包支持以下最小版本:

<!-- #stable-snapshot -->

- Node 12 (up from 8)
- Chrome 90 (up from 49)
- Edge 91 (up from 14)
- Firefox 78 (up from 52)
- Safari 14 (macOS) and 12.5 (iOS) (up from 10)
- 以及更多（见[.browserslistrc（`稳定`条目）](https://github.com/mui/material-ui/blob/HEAD/.browserslistrc#L11)）。

Material UI不再支持IE 11。 如果你需要支持IE 11，请查看我们的[遗留捆绑包](/material-ui/guides/minimizing-bundle-size/#legacy-bundle)。

## 更新React和TypeScript版本

React的最低支持版本已经从v16.8.0提高到v17.0.0。

TypeScript的最小支持版本已经从v3.2提高到v3.5。

:::warning
我们尽量与[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)发布的类型保持一致（即在npm上以`@types`命名空间发布的包）。

我们不会在Material UI的主要版本中改变最小支持版本。

然而，我们一般建议不要使用比DefinitelyTyped的最低支持版本更早的TypeScript版本。
:::

如果你的项目包括这些软件包，你需要将它们更新到`最新`版本。

- `react-scripts`
- `@types/react`
- `@types/react-dom`

:::warning
📝 确保你的应用程序仍在运行，没有错误，并在继续下一步之前提交修改。
:::

## 设置`ThemeProvider`

在升级到v5之前，请确保`ThemeProvider`被定义在你的应用程序的根部和测试中--即使你使用的是默认主题--并且`useStyles`_没有_在`ThemeProvider`之前被调用。

最终你可能想[从JSS迁移到Emotion](/material-ui/migration/migrating-from-jss/)，但同时你可以继续使用JSS与`@mui/styles`包。 这个软件包需要`ThemeProvider`。

你的应用程序的根看起来应该是这样的:

```js
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that accesses the theme
  }
});

function App() {
  const classes = useStyles(); // ❌ If you have this, consider moving it
  // inside of a component wrapped with <ThemeProvider />
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

:::warning
📝 确保你的应用程序仍在运行，没有错误，并在继续下一步之前提交修改。
:::

## 更新MUI软件包

### Material UI v5 and `@mui/styles`

安装Material UI v5软件包。

With npm:

```sh
npm install @mui/material @mui/styles
```

With yarn:

```sh
yarn add @mui/material @mui/styles
```

如果你正在使用`@material-ui/lab`或`@material-ui/icons`，你将需要安装新的软件包。

### `@material-ui/lab`

With npm:

```sh
npm install @mui/lab
```

With yarn:

```sh
yarn add @mui/lab
```

### `@material-ui/icons`

With npm:

```sh
npm install @mui/icons-material
```

With yarn:

```sh
yarn add @mui/icons-material
```

### 日期和时间选择器

日期和时间选择器组件已被移至MUI X。 如果你正在使用`@material-ui/date-pickers`或`@mui/lab`软件包中的挑选器，你将需要迁移到`@mui/x-date-pickers`。 详见[从实验室](https://mui.com/x/migration/migration-pickers-lab/)迁移。

### 对等依赖关系

接下来，添加Emotion软件包。

With npm:

```sh
npm install @emotion/react @emotion/styled
```

With yarn:

```sh
yarn add @emotion/react @emotion/styled
```

#### styleled-components (可选)

如果你想使用Material UI v5的样式化组件而不是Emotion，请查看[Material UI安装指南](/material-ui/getting-started/installation/)。

请注意，如果你的应用程序使用服务器端渲染（SSR），那么Babel插件的样式化组件有一个[已知的错误](https://github.com/mui/material-ui/issues/29742)，它使`@mui/styled-engine-sc`（样式化组件的适配器）无法被使用。

我们强烈建议使用Emotion的默认设置来代替。

:::warning
📝 确保你的应用程序仍在运行，没有错误，并在继续下一步之前提交修改。
:::

### Replace all imports

随着v5的发布，所有相关软件包的名称都从`@material-ui/*`改为`@mui/*`，作为我们更新品牌的一部分。 详情见[本博文](/blog/material-ui-is-now-mui/)。

<details>
<summary>更新的软件包名称</summary>

```text
@material-ui/core -> @mui/material
@material-ui/unstyled -> @mui/base
@material-ui/icons -> @mui/icons-material
@material-ui/styles -> @mui/styles
@material-ui/system -> @mui/system
@material-ui/lab -> @mui/lab
@material-ui/types -> @mui/types
@material-ui/styled-engine -> @mui/styled-engine
@material-ui/styled-engine-sc ->@mui/styled-engine-sc
@material-ui/private-theming -> @mui/private-theming
@material-ui/codemod -> @mui/codemod
@material-ui/docs -> @mui/docs
@material-ui/envinfo -> @mui/envinfo
```

</details>

### 删除旧的软件包

一旦你安装了所有必要的软件包，并确保你的应用程序仍然运行，你可以通过运行`npm uninstall @material-ui/*`或`yarn remove @material-ui/*`来安全地删除旧的`@material-ui/*`软件包。

:::success
[预设安全的编码模式](#preset-safe)（下文有更详细的解释）会自动处理这个问题。
:::

## 修复CSS的特殊性（可选）

如果你想通过导入一个CSS文件来给组件应用样式，你需要提高特异性以能够针对正确的组件。

请考虑以下例子:

```js
import './style.css';
import Chip from '@mui/material/Chip';

const ChipWithGreenIcon = () => (
  <Chip
    classes={{ deleteIcon: 'green' }}
    label="delete icon is green"
    onDelete={() => {}}
  />
);
```

在这个例子中，为了正确地将特定的风格应用于`Chip`的删除图标，一种选择是增加你的CSS类的特异性，如下所示:

```css
.MuiChip-root .green {
  color: green;
}
```

相比之下，下面的CSS片段不会对删除图标应用该样式:

```css
.green {
  color: green;
}
```

## 运行codemods

以下代码模型将自动调整你的大部分代码，以考虑到v5中的突破性变化。

确保你的应用程序在运行每个codemod之后仍然运行无误，并在继续下一步之前提交修改。

### preset-safe

This codemod contains most of the transformers that are necessary for migration. 它应该只在**每个文件夹**中应用一次。

```sh
npx @mui/codemod v5.0.0/preset-safe <path>
```

:::info
If you want to run the transformers one by one, check out the [preset-safe codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#-preset-safe) for more details.
:::

### variant-prop

如果没有定义变量，这个codemod通过应用`variant="standard "`来转换`<TextField/>`、`<FormControl/>`、和`<Select/>`组件--默认的变量已经从v4的 `"standard "`变成了v5的` "outline"`。

如果你已经在主题中定义了`变量："outlined "`作为默认值，你就_不应该_使用这个codemod。
:::

```js
// ❌ if you have a theme setup like this, don't run this codemod.
// these default props can be removed later because `outlined` is the default value in v5
createMuiTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

如果你想在你的组件中保留`variant="standard"`，请运行这个codemod或者配置相应的默认主题props。

```sh
npx @mui/codemod v5.0.0/variant-prop <path>
```

更多细节，请查看[variant-prop codemod的README](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#variant-prop)。

### link-underline-hover

如果没有定义`underline`，这个codemod通过应用`underline="hover"`来转换组件`<Link />`--默认的`underline`已经从v4的` "hover "`变为v5的 `"always"`。

:::error
❗️ 如果你已经在主题中定义了underline，你就_不应该_使用这个代码模式。`"always "`作为主题中的默认值。
:::

```js
// if you have theme setup like this, ❌ don't run this codemod.
// this default props can be removed later because `always` is the default value in v5
createMuiTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'always',
      },
    },
  },
});
```

如果你想保留`underline="hover"`，请运行这个codemod，否则就配置相应的默认主题props。

```sh
npx @mui/codemod v5.0.0/link-underline-hover <path>
```

更多细节，请查看[link-underline-hover codemod README](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#link-underline-hover)。

## 关于重大变更

codemods处理了许多破坏性的变化，但其他的必须手动处理。

无论你是否选择使用codemods，你现在已经准备好进入两个[突破性变化](/material-ui/migration/v5-style-changes/)文档中的第一个。
