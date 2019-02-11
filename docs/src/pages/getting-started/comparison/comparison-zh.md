# 和其他库的一些对比

<p class="description">您在浏览这个文档是因为您想知道 Material-UI 是否可以更好地帮助您解决一些具体的问题。 这也是我们希望能够在此帮您解答的。</p>

这是无疑我们所有文档中最具挑战性的一篇，但是我们觉得它是非常重要的。 很有可能您可能用其他库来解决了您遇到的问题。

我们希望您的帮助使这份文档保持更新, 因为 Javascript 一直都在推陈出新 ！ 如果您注意到一些不看起来不精确或者太正确的内容, 请通过[opening an issue](https://github.com/mui-org/material-ui/issues/new?title=[docs]+Inaccuracy+in+comparison+guide)告诉我们。

我们介包含了以下的一些库:

- [Material-UI](#material-ui)
- [Material Design Lite (MDL)](#material-design-lite-mdl)
- [Material Components Web (MDC-web)](#material-components-web-mdc-web)
- [Materialize](#materialize)
- [React Toolbox](#react-toolbox)

## Material-UI

![评星](https://img.shields.io/github/stars/mui-org/material-ui.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/core.svg)

我们会尽可能地避免偏见, 但是作为核心团队, 我们显然是非常喜欢Material-UI ️❤️的。 在一些问题上， 我们认为它比其他库提供了更好的解决方案；否则我们也不会致力于开发维护它了。 

我们想尽可能的公平和精确，所以无论其他库有什么显著的优势，我们都会尽量列出他们的。

## Material Design Lite (MDL)

![评星](https://img.shields.io/github/stars/google/material-design-lite.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-design-lite.svg)

Material Design Lite非常用心地实施了对Material Design，它主要由谷歌的Developer Relations团队维护。 目前，**该项目已无人维护**， 所以，到底发生了什么呢？

起初，Material Components Web 团队将 MDC-web 当作“MDL v2”来开发，但在合作几个月之后，两个团队都认为最好将项目纳入 Material Design 团队的负责范围。 这种转变意味着项目的目标从仅仅在不同网站上“能够拥有 Material Design 的外观”，变为为整个互联网平台提供一个官方的 Material Design 实现。

## Material Components Web (MDC-web)

![评星](https://img.shields.io/github/stars/material-components/material-components-web.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-components-web.svg)

我们很高兴看到Google及其设计团队支持该项目。 这意味着，[Material Design 规范](https://material.io/design/) 将被保留，并获得持续的投入。

### 框架和库

Material-UI 只专注于 React 库，当然，在 Preact 能够提供完全相同的 API 的前提下，我们也希望 Material-UI 它能够尽快支持 Preact。 仅支持一种框架，意味着我们会有更少的工作量，但更高的质量。

这也可以从多个角度来理解：

- 有了更少的约束条件，我们可以针对我们的目标框架做出具体的调整。 我们需要考虑的特殊情况也比较少。
- 我们也能够花更多时间优化 React 的应用场景。

MDC-web 从一开始就被设计为完全兼容第三方 JS 框架和库。 关于 MDC-web 与第三方库集成的项目，请参考 Github上 的[README](https://github.com/material-components/material-components-web/#material-components-for-the-web)文档。

### 样式调整解决方案

[Material-UI尝试过多种样式调整的解决方案。](https://github.com/oliviertassinari/a-journey-toward-better-style) 我们的第一个版本使用了 LESS，但在意识到其局限性之后，我们很快就开始寻找替代方案。 我们在第一次迁移后使用的是内联样式的解决方案。 这个方案有很多优点：

- 它使我们能够移除用户对 LESS 工具链的依赖。 我们清除了在安装过程中的一个重要的麻烦。 （**更简便**）
- 它使我们能够在运行时更改主题，嵌套不同的主题，并且动态地更改样式。 （**更强大**）
- 它使我们能够将一个巨无霸 CSS 文件分成多个小文件，实现代码拆分，从而降低缩短页面的加载时间。 （**更快速**）
- 由于我们不需要处理 CSS 具体性问题，各样式表之间覆盖的结果也变得更加直观。 （**更简便**）

渐渐地，我们又发现了内联样式表地局限性，从而渐渐转向了 JS 嵌套 CSS (CSS-in-JS) 的解决方案。 这样的转变能保证第一次迁移做出的改善依旧被保留。 **我们强烈认为 JS 嵌套 CSS (CSS-in-JS) 是Web平台发展的未来** 。 您可以在文档中[了解更多关于我们的新的样式表的解决方案](/customization/css-in-js/)。

MDC-web 作为 Bootstrap v4 依赖于 SCSS。 SCSS 架构与 LESS 非常接近 -- 因为此局限性我们也取代了它。

### 愿景

我们的愿景是提供一份关于实施 Material Design 的优雅的指南，以及**和更多**。

> Material Design 的设计原则是一个很棒的出发点，但是它并没有由为一款应用的不同诉求给出完整的答案。 除遵循指南精心打造各类组件以外，我们还希望 Material-UI 秉着 Material Design 的设计精神，努力成为那个软件UI开发的‘百宝箱’。
> 
> *[从文档的[远景部分](/discover-more/vision/)摘录。]*

我们希望看到企业使用 Material-UI 成功地向他们的用户展现一个很棒的UI 的同时，能够与他们自身的品牌匹配，鉴于此因我们在 Material-UI 的自定义功能上投入了大量的精力。

MDC-Web 的只旨在在 Web 平台上实现 Material Design。 **不多也不少**。 他们并不会考虑到对组件进行更改 - 尤其是UX的变更 - 这会以牺牲核心 Material Design 系统为代价来增加额外的弹性，而这并不是这个项目的主要目标。 *[来源](https://github.com/mui-org/material-ui/issues/6799#issuecomment-299925174)*

### 测试

这两个项目都在测试中投入了巨大的精力。 在撰写本文时，两个项目的测试覆盖率均超过99％：

- Material-UI 在Chrome 49，Firefox 45，Safari 10和Edge 14上运行了1200多个单元测试。
- MDC-web 在所有主流浏览器上运行1200多个单元测试。

尽管如此，Material-UI 与众不同的一点在于：我们有 [上百个视觉回归测试](https://www.argos-ci.com/mui-org/material-ui)，而 MDC-web 并没有做到这一点。 通过视觉回归测试，您无需进行任何权衡：

- 您不会浪费时间来担心新的组件贡献会带来意想不到的回归麻烦。 你花在一个单一贡献上的时间 **越少**, 你能接受的贡献 **越多** 。
- 你可以合并新的贡献，而不需要深究太多。 实际上，您不用等待用户报告回归。 这个特点非常 **有效** ，它还**提高了整个库的质量**。

## Materialize

![评星](https://img.shields.io/github/stars/Dogfalo/materialize.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/materialize-css.svg)

### 浏览器支持

相比 Material-UI，Materialize 能够支持更广泛的浏览器，例如，他们支持IE 10，而 [我们只支持IE 11](/getting-started/supported-platforms/)。 我们只支持IE 11的原因是想充分利用 flexbox 布局。 IE 10 一直 和flexbox 有很多兼容问题。

### 样式调整解决方案

Materialise 使用了 SCSS 样式架构，而 Material-UI 在2年前就摈弃了。 我们在以上[MDC-web部分](#styling-solution)解释过。

## React Toolbox

![评星](https://img.shields.io/github/stars/react-toolbox/react-toolbox.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/react-toolbox.svg)

### 样式调整解决方案

虽然 React Toolbox 和 Material-UI 都在侧重于 CSS-in-JS，但我们采取了不同折中方案。 Material-UI选择了**JSS**而 React Toolbox 开始用 **styled-components**重新编写他们的库。 我们在styled-components 和 JSS中选择了后者，原因如下：

- JSS 公开了一个低级别的 API： 
  - 我们可以根据我们的独特的需求进行建模，这样能够构建最高级的机制之一，而这机制拥有最先进的覆盖和主题选择特性。
  - 它没有像 `styled-components` 那样耦合到 React 中。 在覆盖任何第三方 JS 框架和库上它有极高的潜力。 这些相似之处可以用 SCSS 进行。 SCSS 与任何J avaScript 框架和库兼容，这样让它在社区中受到瞩目。
- 在所有优化开启的状态下， JSS插入组件的速度比styled-components[快两倍](https://github.com/A-gambit/CSS-IN-JS-Benchmarks/blob/master/RESULT.md)。

这并不是说 Material-UI 在用户如何编写样式表上一意孤行。 如果您愿意的话，您还是可以使用 styled-components。