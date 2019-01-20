# 和其他库的比较

<p class="description">你在这里因为你想知道Material-UI是否可以更好为你解决一些具体的问题。 这也是我们希望在这里回答你的。</p>

这是无疑我们写的文档中最具挑战性的一页，但是我们着实觉得它是重要的。 也许你遇到了需要解决的问题, 并且已经用了另一个库来解决它们。

我们希望您的帮助使这份文档保持最新状态, 因为Javascript的世界更新地很快! 如果您注意到不准确或一些看起来不太正确的内容, 请通过[opening an issue](https://github.com/mui-org/material-ui/issues/new?title=[docs]+Inaccuracy+in+comparison+guide)了解。

我们介绍了以下库:

- [Material-UI](#material-ui)
- [Material Design Lite (MDL)](#material-design-lite-mdl)
- [Material Components Web (MDC-web)](#material-components-web-mdc-web)
- [Materialize](#materialize)
- [React Toolbox](#react-toolbox)

## Material-UI

![stars](https://img.shields.io/github/stars/mui-org/material-ui.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/core.svg)

我们会非常努力地避免偏见, 尽管作为核心团队, 我们显然很喜欢Material-UI ️❤️。 There are some problems we think it solves better than anything else out there; if we didn’t believe that, we wouldn’t be working on it 

我们非常想要公平和精确，所以无论什么库提供了显著的优势，我们都会列出他们。

## Material Design Lite (MDL)

![stars](https://img.shields.io/github/stars/google/material-design-lite.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-design-lite.svg)

Material Design Lite，是一个非常用心的对Material Design的实现，主要由谷歌的Developer Relations团队维护。 目前，**该项目已不再维护**， 请查看下文了解详细信息。

Material Components Web团队将MDC-web当作“MDL v2”来写，但在合作几个月之后，两个团队都认为最好将项目纳入Material Design团队的职权范围。 这种转变意味着项目的目标从仅仅 “使各种网站能够拥有Material Design的外观”，变为为整个互联网平台提供一个官方的Material Design实现。

## Material Components Web (MDC-web)

![stars](https://img.shields.io/github/stars/material-components/material-components-web.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-components-web.svg)

我们很高兴看到Google及其设计团队支持该项目。 这意味着，[Material Design 规范](https://material.io/design/) 将被保留，并获得持续的投入。

### 框架和库

Material-UI专注于React，当然，在Preact能够提供完全相同的API的前提下，我们也希望它能够尽快得到支持。 仅支持一种框架，意味着工作量更少，但完成的质量更高。

这也可以从多个角度来理解：

- 由于不需要满足很多约束条件，我们可以针对我们的目标框架做出具体的调整。 我们需要考虑的特殊情况也比较少。
- 我们也能够花更多时间优化React的应用场景。

MDC-web从一开始就被设计为完全兼容第三方JS框架和库。 关于MDC-web与第三方库集成的项目，请参考Github上的[README](https://github.com/material-components/material-components-web/#material-components-for-the-web)文档。

### 样式调整解决方案

[Material-UI尝试过多种样式调整的解决方案。](https://github.com/oliviertassinari/a-journey-toward-better-style) 我们的第一个版本使用了LESS，但在意识到其局限性之后，我们很快就开始寻找替代方案。 我们在第一次迁移后使用的是内联样式的解决方案。 这个方案有很多优点：

- 它使我们能够消除对用户的 less 工具链的依赖关系。 我们消除了安装过程中的一个麻烦。 （**更简便**）
- 它使我们能够在运行时更改主题，嵌套不同的主题，并且动态地更改样式。 （**更强大**）
- 它使我们能够将一个巨无霸CSS文件分成多个小文件，实现代码拆分，从而降低缩短页面的加载时间。 （**更快速**）
- 由于我们不需要处理CSS具体性问题，各样式表之间覆盖的结果也变得更加直观。 （**更简便**）

渐渐地，我们又发现了内联样式表地局限性，从而渐渐转向了CSS-in-JS的解决方案。 This transition was made without losing the enhancements the first migration introduced **We strongly think that CSS-in-JS is the future of the web platform**. You can [learn more about our new styling solution](/customization/css-in-js/) in the documentation.

MDC-web relies on SCSS as Bootstrap v4. The SCSS architecture is pretty close to LESS - a technology we replaced for its limitations.

### The vision

Our vision is to provide an elegant implementation of the Material Design guidelines **and more**.

> Material Design指导下的设计原则让Material-UI起航，但一款软件往往有着各式各样、方方面面的问题或诉求，这些原则就可能不会为我们的所有问题给出答案。 In addition to the guideline-specific implementation, we want Material-UI to become whatever is generally useful for application development, all in the spirit of the Material Design guidelines.
> 
> *[An extract taken from the [vision section](/discover-more/vision/) of the documentation.]*

We want to see businesses succeeding in taking advantage of Material-UI to ship an awesome UI to their users while having it match their brand, so we have invested a lot in the customization capabilities of Material-UI.

The only goal of MDC-Web is to be a Material Design implementation for the web platform. **Nothing more, nothing less**. They will not consider making changes to the components - especially UX changes - that would facilitate additional flexibility at the cost of breaking with the core Material Design system, as that is a non-goal of the project. *[source](https://github.com/mui-org/material-ui/issues/6799#issuecomment-299925174)*

### Tests

Both projects invest a lot in tests. At the time of writing, both projects have over 99% test coverage:

- Material-UI has 1200+ unit tests running on Chrome 49, Firefox 45, Safari 10 and Edge 14.
- MDC-web has 1200+ unit tests running on all the major browsers.

Still, there is one thing that sets Material-UI apart and it's key: We have [hundreds of visual regression tests](https://www.argos-ci.com/mui-org/material-ui) when MDC-web doesn't have any. With visual regression tests, you don't have to make any trade-off:

- You can spend less time making sure every contribution doesn't introduce unexpected regressions. The **less** time you spend on a single contribution, the **more** contributions you can accept.
- You can merge new contributions without digging much. Effectively, you are not waiting for users to report regressions. It's **efficient** and **improves the library quality**.

## Materialize

![stars](https://img.shields.io/github/stars/Dogfalo/materialize.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/materialize-css.svg)

### Browser support

Materialize supports a wider range of browsers than Material-UI does, for instance, they support IE 10 while [we only support IE 11](/getting-started/supported-platforms/). Only supporting IE 11 allows us to take full advantage of the flexbox layout. IE 10 has many issues with flexbox.

### 样式调整解决方案

Materialize uses SCSS, a styling architecture Material-UI moved away from 2 years ago. We explain why in the [MDC-web section](#styling-solution) above.

## React Toolbox

![stars](https://img.shields.io/github/stars/react-toolbox/react-toolbox.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-toolbox.svg)

### 样式调整解决方案

While both React Toolbox and Material-UI are betting on CSS-in-JS, we have taken a different trade-off. Material-UI has chosen **JSS** while React Toolbox started rewriting their library with **styled-components**. We picked JSS over styled-components for the following reason:

- JSS exposes a low-level API: 
  - We are free to model it to our unique needs, which has allowed us to build one of the most advanced override and theming mechanism.
  - It's not coupled to React like `styled-components` is. It has the potential to reach any 3rd party JS frameworks and libraries. The parallels can be made with SCSS. SCSS is compatible with any JavaScript frameworks and libraries, helping it to get traction in the community.
- JSS is [two times faster](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md) to mount components than styled-components is, with all the optimization turned on.

This is not to say that Material-UI is opinionated about how users write their styles. You can use styled-components if you would like to do so.