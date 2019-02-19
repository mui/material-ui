# 常见问题解答

<p class="description">您在一个特定的问题上停滞不前吗？ 您可以先在我们的常见 FAQ (问题解答) 中检索一下常见问题。</p>

如果您仍然无法找到您想要的内容, 您可以在[ gitter ](https://gitter.im/mui-org/material-ui) 社区中发起咨询。 对于如何提问，和其他并非功能性问题的，请使用[StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) 提问，请不要使用 Github 的 issues板块。 在 StackOverflow 里面有一个 ` material-ui `的标签， 您可以用它来标记你的问题。

## 为什么我的组件在生产版本中没有正确地渲染？

这样一个n°1问题很可能是当你的代码在生产模式下 bundle （打包）后，有一些class name（类名称）会产生冲突。 如果想要 material-ui 正常工作, 页面上所有组件的 `clsx` 值必须由 [类名称生成器 ](/customization/css-in-js/#creategenerateclassname-options-class-name-generator) 的单个实例生成。

若要更正此问题, 需要初始化页面上的所有组件, 以便它们之间只有 **1个类名称生成器 **。

在很多情况下，您可能最终会意外地使用两个类名生成器：

- 比如你一不小心 **打包**了 两个版本的 Material-UI。 你可能错误地将一个依赖和 material-ui 设置为同版本依赖了。
- 对于你的React Tree（React树控件）而言，你在使用`JssProvider`构建**subject（分支）**。
- 您正在使用打包根据，而它拆分代码的方式导致创建了多个类名生成器的实例。 >如果你正使用带有[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 的webpack，请尝试在[`optimizations(优化项)`下</code>配置 `runtimeChunk</2></a> 。</li>
</ul>

<p>总的来说，通过在其组件树顶部的<a href="/customization/css-in-js/#jssprovider"><code>JssProvider`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk)来包装每个 Material-UI 应用程序，**并且在他们之间使用单个类名称生成器**，能够简单地解决这个问题。</p> 
    [这是一个详细的解析例子](/customization/css-in-js/#jssprovider)。 任何解决方案的最后一部分将根据您使用的打包工具而有所不同，但总体目标是确保包括上述第一段代码块的公共模块只被加载且运行一次。
    
    ⚠️你赶时间吗？ 放心，我们提供了[`dangerouslyUseGlobalCSS`](/customization/css-in-js/#global-css)这个选项，以使类名称的**确定性**成为一个快速的解决方案：.
    
    ## 为什么当打开Modal（模态框）时，fixed positioned（位置固定的）元素会移动？
    
    一旦打开模态框，我们就会禁用滚动。 而模态框是应该是唯一的交互式内容时，这可以防止与背景交互，但是，删除滚动条可以恢复**fixed positioned(固定位置的)元素**的移动。 在这种情况下，您可以应用全局`.mui-fixed`类名称来告知 Material-UI 来处理这些元素。
    
    ## 如何在全局禁用 ripple effect（涟漪效果）？
    
    涟漪效应完全来自` BaseButton `零件。 您可以通过在您的主题中提供以下内容，来全局地禁用涟漪效果：
    
    ```js
    import { createMuiTheme } from '@material-ui/core';
    
    const theme = createMuiTheme({
      props: {
        // Name of the component ⚛️
        MuiButtonBase: {
          // The properties to apply
          disableRipple: true, // No more ripple, on the whole application 
        },
      },
    });
    ```
    
    ## 如何禁用全局动画？
    
    您可以通过在主题中提供以下内容来禁用全局动画：
    
    ```js
    import { createMuiTheme } from '@material-ui/core';
    
    const theme = createMuiTheme({
      transitions: {
        // 这样就得到了全局的 `transition: none;`
        create: () => 'none',
      },
    });
    ```
    
    有时您会在某些情况下才使用这种行为，例如在测试期间或者在一些低端设备上，在这些情况下，您可以动态地更改主题的值。
    
    ## 是否必须使用 JSS 给我的 app 添加样式？
    
    我们强烈推荐这种方式，原因如下：
    
    - JSS 是已经内置的插件，所以它不会产生额外的应用包体尺寸。
    - 它速度很快 & 内存占用率更低。
    - 它的 [API](https://cssinjs.org/json-api/)干净并且前后一致。
    - 它支持大量的进阶功能，可以通过自身和 [插件](https://cssinjs.org/plugins/)实现。
    
    然而，您可能已经在你的应用程序上添加了一些使用其他样式的Material-UI组件，或者已经熟悉了一个完全不同的API而不想学习新的？ 在这种情况下，请转到[Style Library Interoperability（样式库互用）](/guides/interoperability/) 部分，在哪里你可以找到我们提供的用其他样式库来替换 Material-UI 组件样式的简单方法。
    
    ## 我到底应该使用 inline-style 还是 classes 呢?
    
    根据经验，仅对动态样式属性使用内联样式。 CSS 替代方案也有更多优势，例如：
    
    - 自动前缀
    - 更好的调试
    - media queries（媒体查询）
    - keyframes
    ## 如何使用 react-router？
    
    我们在`ButtonBase` 组件里面解析了如何使用带有[第三方routing的库](/demos/buttons/#third-party-routing-library)。 大量我们的交互式组件的内部也使用了它：如`Button`，`MenuItem`，`<ListItem button />` ，`Tab`等。 您可以使用相同的解决方案。
    
    ## How do I combine the `withStyles()` and `withTheme` HOCs?
    
    其实有许多不同的选择可以实现：
    
    **`withTheme`选项：**
    
    ```js
    export default withStyles(styles, { withTheme: true })(Modal);
    ```
    
    **`compose()` 辅助功能:**
    
    ```js
    import { compose } from 'recompose';
    
    export default compose(
      withTheme,
      withStyles(styles)
    )(Modal);
    ```
    
    **原始功能链：**
    
    ```js
    export default withTheme(withStyles(styles)(Modal));
    ```
    
    ## 如何访问 DOM 元素？
    
    使用 [`RootRef`](/api/root-ref/) 帮助程序来包装组件。
    
    ## 为什么我的应用程序看到的颜色和文档里的颜色大相径庭？
    
    文档网站使用了一个自定义的主题。 因此，调色板和 Material-UI 传播的默认的主题是截然不同的。 请参考[这页](/customization/themes/) 来了解自定义主题。
    
    ## Material-UI 很棒。 我该如何支持该项目？
    
    有很多方法可以支持 Material-UI：
    
    - 帮助改进[这篇文档](https://github.com/mui-org/material-ui/tree/next/docs).
    - 帮助他人开始使用。
    - [口口相传](https://twitter.com/MaterialUI)。
    - Answer questions on [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) or on [Spectrum](https://spectrum.chat/material-ui).
    
    如果您在商业项目中使用了Material-UI，并希望通过成为我们的**赞助商</0 >来支持我们的持续发展，或者您一个业余项目或者爱好项目，并想成为我们的支持者， 您都可以通过[OpenCollective](https://opencollective.com/material-ui)实现。</p> 
    
    我们队所有筹集的资金都是透明化管理的，而赞助商在 README 和 Material-UI 主页上都会获得认可。