# 常见问题解答

<p class="description">坚持一个特定的问题？ 在我们的常见问题解答中首先检查一些常见问题。</p>

如果您仍然无法找到您想要的内容, 您可以在[ gitter ](https://gitter.im/mui-org/material-ui)中询问社区。 对于怎么去做的问题和其他非问题，请使用[ StackOverflow ](https://stackoverflow.com/questions/tagged/material-ui)而不是Github issues。 有一个名为` material-ui `的StackOverflow标签, 可用于标记您的问题。

## 为什么我的组件在生产版本中没有正确呈现？

一旦您的代码在生产包中，这可能是由于类名冲突而发生的n°1问题。 要使Material-UI起作用，页面上所有组件的 `classNames` 值必须由 [类名生成器](/customization/css-in-js/#creategenerateclassname-options-class-name-generator)的单个实例生成。

要纠正此问题，需要初始化页面上的所有组件，以便它们之间只有 **个类名生成器**。

您最终可能会在各种情况下意外使用两个类名生成器：

- 你一不小心 **束** 两个版本材质的UI。 您可能有一个依赖项没有正确设置Material-UI作为对等依赖项。
- 您正在使用`JssProvider`对于**子集**你的React Tree。
- 您正在使用捆绑器，它以某种方式拆分代码，从而导致创建多个类名生成器实例。 >如果您使用带有[ SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 的webpack，尝试配置[ `runtimeChunk`在`优化下设置`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk) 。

总的来说，通过将每个Material-UI应用程序包含在其组件树 **顶部的 [`JssProvider`](/customization/css-in-js/#jssprovider) 组件并使用它们之间共享的单个类名生成器**，可以很容易地从这个问题中恢复。

[分辨率示例](/customization/css-in-js/#jssprovider)。 任何解决方案的最后一部分将根据您使用的Bundler而有所不同，但总体目标是确保包含上述第一个代码段的公共模块仅加载并运行一次。

⚠️你赶时间吗？ 放心，我们提供一个选项，以使这类名**确定性**作为一个快速逃生舱口：[`dangerouslyUseGlobalCSS`](/customization/css-in-js/#global-css).

## 为什么固定定位元素在打开模态时会移动？

一旦打开模态，我们就会阻止滚动。 当模态应该是唯一的交互式内容时，这可以防止与背景交互，但是，删除滚动条可以使 **固定定位元素** 移动。 在这种情况下，您可以应用全局 `.mui-fixed` 类名称来告诉Material-UI处理这些元素。

## 如何全局禁用涟漪效应？

涟漪效应完全来自` BaseButton `零件。 您可以通过在主题中提供以下内容来全局禁用涟漪效果：

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // 组件的名称 ⚛️
    MuiButtonBase: {
      // 要应用的属性
      disableRipple: true, // Zài zhěnggè yìngyòng chéngxù zhōng méiyǒu gèng duō de liányī
    },
  },
});
```

## 如何在全局禁用动画？

您可以通过在主题中提供以下内容来全局禁用动画：

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // 所以我们到处都有 `transition: none;`
    create: () => 'none',
  },
});
```

有时您会有条件地启用此行为，例如在测试期间或在低端设备上， 在这些情况下，您可以动态更改主题值。

## 我是否必须使用JSS来设计我的应用程序？

强烈推荐：

- 它内置，因此不会产生额外的捆绑大小开销。
- 它速度快 & 内存使用效率。
- 它有一个干净，一致的 [API](https://cssinjs.org/json-api/)。
- 它支持许多高级功能，无论是本机还是通过 [插件](https://cssinjs.org/plugins/)。

但是，您可能正在向已经使用其他样式解决方案的应用程序添加一些Material-UI组件， 或者已经熟悉不同的API，并且不想学习新的？ 在这种情况下，请转到 [样式库互操作性](/guides/interoperability/) 部分， 我们将展示使用替代样式库重新设置Material-UI组件是多么简单。

## 我什么时候应该使用 inline-style vs classes?

根据经验，仅对动态样式属性使用内联样式。 CSS替代方案提供了更多优势，例如：

- 自动前缀
- 更好的调试
- 媒体查询
- 关键帧

## 我如何使用react-router？

我们已经记录了如何使用带有 `ButtonBase` 组件的 [第三方路由库](/demos/buttons/#third-party-routing-library)。 我们的许多交互式组件在内部使用它： `Button`，`MenuItem`，`<ListItem button />` ，`Tab`等 您可以使用相同的解决方案。

## 我怎么结合在`withStyles()`和`withTheme()`HOCs?

有许多不同的选择：

**`withTheme`选项：**

```js
export default withStyles(styles, { withTheme: true })(Modal);
```

**`compose()` 辅助功能:**

```js
import { compose } from 'recompose';

export default compose(
  withTheme(),
  withStyles(styles)
)(Modal);
```

**原始功能链：**

```js
export default withTheme()(withStyles(styles)(Modal));
```

## 如何访问DOM元素？

使用 [`RootRef`](/api/root-ref/) 帮助程序包装组件。

## 为什么我看到的颜色与我在这里看到的颜色不同？

文档站点使用自定义主题。 因此，调色板 从默认的主题，材料，UI船舶不同。 请参阅 [这 页](/customization/themes/) 了解主题定制。

## Material-UI很棒。 我该如何支持该项目？

有很多方法可以支持Material-UI：

- 提高 [的文档](https://github.com/mui-org/material-ui/tree/master/docs)。
- 帮助他人入门。
- [传播单词](https://twitter.com/MaterialUI)。
- 回答 [StackOverflow在存储库中对标记为问题](https://stackoverflow.com/questions/tagged/material-ui) </a> 或 问题提出疑问。</li> </ul> 
    
    如果您在商业项目中使用材料的用户界面，并希望通过成为支持其持续发展 **赞助商**， 或侧或业余爱好项目，并想成为一个靠山，你可以通过做 [OpenCollective](https://opencollective.com/material-ui)。
    
    筹集的所有资金都是透明管理的，赞助商在README和Material-UI主页上获得认可。