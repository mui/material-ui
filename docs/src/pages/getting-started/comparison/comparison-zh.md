# 和其他库的比较

<p class="description">你在这里因为你想知道Material-UI是否可以更好为你解决一些具体的问题。 这也是我们希望在这里回答你的。</p>

这是无疑我们写的文档中最具挑战性的一页，但是我们着实觉得它是重要的。 也许您已经使用了其他的库来解决一些您遇到的问题。

我们希望您的帮助使这份文档保持最新状态, 因为Javascript的世界更新地很快! 如果您注意到不准确或一些看起来不太正确的内容, 请通过[opening an issue](https://github.com/mui-org/material-ui/issues/new?title=[docs]+Inaccuracy+in+comparison+guide)了解。

我们介绍了以下库:

- [Material-UI](#material-ui)
- [Material Design Lite (MDL)](#material-design-lite-mdl)
- [Material Components Web (MDC-web)](#material-components-web-mdc-web)
- [Materialize](#materialize)
- [React Toolbox](#react-toolbox)

## Material-UI

![stars](https://img.shields.io/github/stars/mui-org/material-ui.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/core.svg)

我们会非常努力地避免偏见, 尽管作为核心团队, 我们显然很喜欢Material-UI ️❤️。 我们认为它比其他库更好解决了一些问题；要不然，我们就不会持续地开发和维护它了。 

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

渐渐地，我们又发现了内联样式表地局限性，从而渐渐转向了CSS-in-JS的解决方案。 这种转变是在不失去第一次迁移引入的增强的情况下完成的 **我们强烈认为CSS-in-JS是Web平台的未来** 。 您可以[了解有关我们新造型解决方案的更多信息](/customization/css-in-js/)在文档中。

MDC-web依赖于SCSS作为Bootstrap v4。 SCSS架构与LESS- 非常接近，这是我们为其局限性而取代的技术。

### 愿景

我们的愿景是提供材料设计指南 **和更多的优雅实施**。

> Material Design指导下的设计原则让Material-UI起航，但一款软件往往有着各式各样、方方面面的问题或诉求，这些原则就可能不会为我们的所有问题给出答案。 除了特定于指南的实现之外，我们还希望Material-UI成为应用程序开发通常有用的任何内容，所有这些都符合Material Design准则的精神。
> 
> *[摘自文献的 [视觉部分](/discover-more/vision/)]*

我们希望看到企业采取材料-UI的优势，出货的真棒UI给他们的用户成功 ，而有它自己的品牌相匹配，所以我们在材质的UI定制功能投入了很多。

MDC-Web的唯一目标是成为Web平台的Material Design实现。 **没有更多，没有更少**。 他们不会考虑对组件进行更改 - 尤其是UX更改 - 这会以牺牲核心Material Design系统为代价来促进额外的灵活性，因为这是项目的非目标。 *[来源](https://github.com/mui-org/material-ui/issues/6799#issuecomment-299925174)*

### 测试

这两个项目都在测试中投入了很多。 在撰写本文时，两个项目的测试覆盖率均超过99％：

- Material-UI在Chrome 49，Firefox 45，Safari 10和Edge 14上运行了1200多个单元测试。
- MDC-web在所有主流浏览器上运行1200多个单元测试。

尽管如此，有一件事将Material-UI与众不同而且关键在于： 当MDC-web没有任何时候，我们有 [百个视觉回归测试](https://www.argos-ci.com/mui-org/material-ui)。 通过视觉回归测试，您无需进行任何权衡：

- 您可以花更少的时间确保每个贡献都不会引入意外的回归。 在 **小于** 时，你在一个单一的贡献花，在 **以上** 捐款可以接受。
- 你可以合并新的贡献，而不需要挖掘太多。 实际上，您不是在等待用户报告回归。 它是 **效率** 和 **提高了图书馆质量**。

## Materialize

![stars](https://img.shields.io/github/stars/Dogfalo/materialize.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/materialize-css.svg)

### 浏览器支持

Materialize支持比Material-UI更广泛的浏览器，例如， 支持IE 10，而 [支持IE 11](/getting-started/supported-platforms/)。 只支持IE 11，我们才能充分利用flexbox布局。 IE 10与flexbox有很多问题。

### 样式调整解决方案

Materialise使用SCSS，一种造型架构Material-UI从2年前开始移动。 我们在上面的 [MDC-web部分](#styling-solution) 解释了原因。

## React Toolbox

![stars](https://img.shields.io/github/stars/react-toolbox/react-toolbox.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-toolbox.svg)

### 样式调整解决方案

虽然React Toolbox和Material-UI都在押注CSS-in-JS，但我们采取了不同的权衡。 Material-UI选择了 **JSS** 而React Toolbox开始用 **样式组件重写他们的库**。 我们在样式组件上选择了JSS，原因如下：

- JSS公开了一个低级API： 
  - 我们可以根据我们的独特需求进行建模，这使我们能够构建最先进的覆盖和主题机制之一。
  - 它没有像 `样式的组件` 那样耦合到React。 它有可能覆盖任何第三方JS框架和库。 可以使用SCSS进行相似之处。 SCSS与任何JavaScript框架和库兼容，有助于它在社区中获得牵引力。
- JSS是 [快两倍](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md) 安装组件比风格的成分是，所有的优化开启。

这并不是说Material-UI是关于用户如何编写样式的观点。 如果您愿意，可以使用样式组件。