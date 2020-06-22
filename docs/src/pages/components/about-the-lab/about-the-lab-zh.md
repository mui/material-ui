# 关于 lab

<p class="description">此依赖包包含了一些还在开发中的组件，它们还不能移到 core（核心）库中。</p>

核心库（core）和实验室（lab）的主要区别在于对组件进行版本管理的方式。 拥有独立的实验室版本，我们就可以在必要的时候发布一些会影响原本代码的改动，并且核心库遵循 [slower-moving 政策](https://material-ui.com/versions/#release-frequency)。

程序员在使用和测试组件后向项目报漏洞，维护者就知道更多关于组件的缺点：如缺少功能，访问问题、漏洞，API 设计等等。 一个组建被使用的时间越久，发现一个新的问题，以及因此需要引入重大更改的可能性就越小。

对于那些准备放到核心库里的组件，需要考虑以下几点：

* 它需要**被使用过**。 Material-UI 团队使用谷歌分析的数据（Google Analytics stats）去评估每个组件的使用情况。 如果一个 lab 的组件使用数据比较低，意味着它并不能全部正常工作，或者需求量比较小。
* 它需要和核心组件一样的高**代码质量**。 作为核心代码的一部分，它不需要很完美，但是这个组件应该要很可靠，这样其他开发者可以依赖它。 
    * 每个组件需要**类型定义**。 就目前来说，一个实验室组件不需要定义类型，但是当搬到核心代码之后就需要定义好类型了。
    * 需要比较高的**测试覆盖率（test coverage）**。 有一些实验室组件目前不带有一些综合的测试。
* 这个组建是否可以作为一个激励用户更新到最新版本的**杠杆**？ 一个社区的分裂程度越低越好。
* 短期内/中等时间，我们需要确认**破坏性的变更**极少发生。 例如，如果它需要一个新的功能并因此将有可能引入重大更改，那么最好推迟将其纳入核心库的进程。

## 安装

请在您的项目目录中用以下方式安装依赖包：

```sh
// 用 npm 安装
npm install @material-ui/lab

// 用 yarn 安装
yarn add @material-ui/lab
```

该 lab 和那些核心组件是对等依赖的。 若您还未在项目中使用 Material-UI，那可以按如下方式安装：

```sh
// 用 npm 安装
npm install @material-ui/core

// 用 yarn 安装
yarn add @material-ui/core
```

## TypeScript

为了从 theme 中的 [CSS重载](/customization/globals/#css) 和 [默认的属性自定义](/customization/globals/#default-props) 中获益，使用 TypeScript 的用户需要引入如下类型的 types。 TypeScript 在内部将实验室里可用的扩展组件和 [模块扩展(module augmentation)](/guides/typescript/#customization-of-theme) 一起使用，这样可以拓展默认的主题（theme）结构。

```tsx
import type '@material-ui/lab/themeAugmentation';

const theme = createMuiTheme({
  overrides: {
    MuiTimeline: {
      root: {
        backgroundColor: 'red',
      },
    },
  },
});
```