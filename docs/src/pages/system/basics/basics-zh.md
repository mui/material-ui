# @material-ui/system

<p class="description">风格的功能对于建设强大的设计系统。</p>

> 这两个英语希腊每天都会 `@材料-ui/系统` 是实验性的(阿尔法版)。 我们正在努力使它稳定的材料-UI v4。

## 开始

`@材料-ui/系统` 提供了低水平的实用功能，名为"*式功能*"建立强大的设计系统。 一些关键特点：

- 蜡每天都会访问的主题价值观直接来自组件的道具。
- 🦋鼓励UI的一致性。
- 🌈写的响应式毫不费力。
- 🦎工作的任何主题的对象。
- 💅工作的最受欢迎的CSS-在-JS解决方案。
- 📦低于 [4KB压缩](https://bundlephobia.com/result?p=@material-ui/system)的。
- 🚀 [足够快](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uisystem) 不是一个瓶颈。

重要的是要明白，这包暴露了纯(副作用)风格的功能，与此签署： `({ theme, ...style })=> 式`, **就是这**的。

### Demo

在剩下的这 *开始* 部分，我们正在使用 **风格的部件** 作为参考的例子(强调的普遍性，这包)。 Alternativaly，你可以 [使用调](#interoperability)的。 该演示，也是基于 **默认** 材料-UI [主题对象](/customization/default-theme/)的。

```jsx
进口 { palette, spacing, typography } 从'@材料-ui/系统';
导风格，从'的风格-成分';

const框=风格。div`${palette}${spacing}${typography}`;
//或进口 { unstable_Box as Box } 从'@材料-ui/core/框';

<Box
  color="primary.main"
  bgcolor="background.paper"
  fontFamily="h6.fontFamily"
  fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' } }
  p={{ xs: 2, sm: 3, md: 4} }
>
  @材料-ui/系统
</Box>
```

{{"demo": "pages/system/basics/Demo.js"}}

### 安装

```jsx
//npm
npm install@材料-ui/系统

//纱
纱增加@材料-ui/系统
```

### 创建一种组分

为了使用 `框` 成分，首先需要创建它。 开始，增加一个 `间隔` 和 `色` 功能的风参数。

```jsx
进口的风格从'的风格-成分';
进 { spacing, palette } 从'@材料-ui/系统';

const框=风格。div`${spacing}${palette}`;

出口默认箱；
```

这个盒子组件现在支持新 [距性](/system/spacing/#api) 和 [色性](/system/palette/#api)的。 例如，可以提供一种填补财产： `p` 和一个颜色的财产： `色`的。

```jsx
<Box p="1rem" color="grey">让我点空间!</Box>
```

组件可以被风格提供任何有效的CSS值。

### Theming

但大部分时间，你想依靠一个主题的价值增加UI的一致性。 这是最好有一个预设的填充和色彩的价值观。 进口的主题提供者的定型解决方案。

```jsx
进口作出反应，从'应'
进 { ThemeProvider } 从'的风格-成分'

const主题={
  间距：4,
  的调色板： {
    primary: '#007bff',
  },
};

功能的应用程序(){
  返回(
    <ThemeProvider theme={theme}>
      {/*儿童*/}
    </ThemeProvider>
  )
}

出口默认程序
```

现在，你可以提供一个间距乘数值:

```jsx
<Box p={1}>4px</Box>
<Box p={2}>8px</Box>
<Box p={-1}>-4px</Box>
```

和一个主要颜色：

```jsx
<Box color="primary">蓝</Box>
```

### 所有包容各方的

使箱组件更有用的，我们已建立的集合式功能，这是完整的清单：

- [borders](/system/borders/#api)
- [display](/system/display/#api)
- [flexbox](/system/flexbox/#api)
- [palette](/system/palette/#api)
- [positions](/system/positions/#api)
- [shadows](/system/shadows/#api)
- [sizing](/system/sizing/#api)
- [spacing](/system/spacing/#api)
- [typography](/system/typography/#api)

如果你已经在使用 `@材料-ui/核心`，你可以用我们的 [预先包装的盒](/utils/box/) 部件(用调内部):

```jsx
进口 { unstable_Box as Box } 从'@材料-ui/core/框';
```

## 互操作性

`@材料-ui/系统` 适用于大多数CSS-在-JS库，包括调，风格的部件和情感。

如果你已经在使用 `@材料-ui/核心`，我们鼓励你开始与 **调** 解决方案，以尽量减少束的大小。

### JSS

```jsx
进口 { palette, spacing, compose } 从'@材料-ui/系统';
进 { styled } 从'@材料-ui/式';

const框=风格(撰写(间隔板));
```

{{"演示":"pages/system/basics/JSS.js"}}

### 风格的部件

```jsx
进口 { palette, spacing } 从'@材料-ui/系统';
导风格，从'的风格-成分';

const框=风格。div`${palette}${spacing}`;
```

{{"演示":"pages/system/basics/StyledComponents.js"}}

### Emotion

```jsx
进口 { spacing, palette } 从'@材料-ui/系统';
导风格，从'@情绪/风格的';

const框=风格。div`${palette}${spacing}`;
```

{{"演示":"pages/system/basics/Emotion.js"}}

## 响应

**所有** 的性质敏感，我们支持3个不同的Api。 它使用这种默认，但是定制的，断点的主题结构：

```js
const值={
  xs:0,
  sm：600,
  md:960,
  lg：1280年，
  xl：1920年，
};

const主题={
  断点:{
    键：['x','sm','md','lg','xl'],
    ：key=> `@媒体(min-宽:${值[key]}px)`,
  },
};
```

### 阵列

```jsx
<Box p={[2, 3, 4]} />

/**
 * 产出：
 *
 *填充:16像素；以
 *@媒体(最宽：600像素){
 *填充：24px;
 *}
 *@媒体(最宽：960px){
 *填充:32;
 *}
*/
```

### 对象

```jsx
<Box p={{ xs: 2, sm: 3, md: 4 }} />

/**
 * 产出：
 *
 *填充:16像素；以
 *@媒体(最宽：600像素){
 *填充：24px;
 *}
 *@媒体(最宽：960px){
 *填充:32;
 *}
*/
```

### 搭配

如果你想要小组断点的价值观，可以使用我们的 `断点()` 帮手。

```jsx
进口{撰写、间隔、调色板、断点}从'@材料-ui/系统';
导风格，从'的风格-成分';

const框=风格。div`
  ${断点(
    撰写(
      间隔，
      调色板,
    ),
  )}
`;

<Box
  p={2}
  sm={{ p: 3 } }
  md={{ p: 4 } }
/>

/**
 * 产出：
 *
 *填充:16像素；以
 *@媒体(最宽：600像素){
 *填充：24px;
 *}
 *@媒体(最宽：960px){
 *填充:32;
 *}
*/
```

## 定风格的道具

### `风格(选择)=> 风格的功能`

使用这种帮助来创建自己风格的功能。

我们不支持所有CSS性质。 这是可能的，你要支持新的。 这也有可能是你想改变的主题路径的前缀。

#### 参数

1. `选项` (*目*): 
  - `的选择。托` (*串*)：酒店的风格功能将被触发。
  - `的选择。cssProperty` (*串|布尔* [optional]):默认 `的选择。托`的。 CSS财产使用。 你可以无障碍这一选项，通过提供 `假`的。 当残疾人、财产的价值将处理作为一种风格的对象。 它可以用于 [呈现的变](#variants)的。
  - `的选择。themeKey` (*串* [optional])：主题路径的前缀。
  - `的选择。变换` (*功能* [optional])：申请转换之前，将输出CSS值。

#### 返回结果

`式功能`：式功能创建。

#### 例子

```js
进口 { style } 从'@材料-ui/系统'

const属性=风格({
  支柱:'bc',
  cssProperty:'的属性',
  themeKey:'的调色板',
  转变：数值=> `${value} !重要`时，
});
```

### `组成(...风格的功能)=> 风格的功能`

合并的多式的功能合为一体。

#### 返回结果

`式功能`：式功能创建。

#### 例子

```js
进口 { style, compose } 从'@材料-ui/系统'

出口const文字颜色=风格({
  支柱:'color',
  themeKey:'的调色板',
});

出口const bgcolor=风格({
  支柱:'bgcolor',
  cssProperty:'backgroundColor',
  themeKey:'的调色板',
});

const色=撰写(文字颜色的，bgcolor);
```

## 变种

该 `style()` 帮助也可用于地图中性风格的对象，在一个主题。 在这个例子中， `变` 性支持所有的钥匙存在 `的主题。排版`的。

```jsx
进口作出反应，从'应';
导风格， { ThemeProvider } 从'的风格-成分';
进 { style, typography } 从'@材料-ui/系统';

const变=风格({
  支柱:'变的'，
  cssProperty:假，
  themeKey:'排版',
});

// ⚠ 文本已经定义是在全球背景下:
//https://developer.mozilla.org/en-US/docs/Web/API/Text/Text中。
const Text=风格。跨越`
  字体的家庭：黑体；以
  ${variant}
  ${typography}
`;

const主题={
  版：{
    h1： {
      fontSize: 30,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: 25,
      lineHeight: 1.5,
    },
  },
};

// 呈现的主题。排版。h1式的对象。
<Text variant="h1">变=h1</Text>
```

{{"demo": "pages/system/basics/Variant.js"}}

## CSS property

如果你想要支持的定义CSS值，可以使用我们的 `css()` 帮手。 它将处理的 `css` 财产。

```jsx
进口{撰写、间隔、调色板、css}从'@材料-ui/系统';
导风格，从'的风格-成分';

const框=风格。div`
  ${css(
    撰写(
      间隔，
      调色板,
    ),
  )}
`;

<Box color="white" css={{ bgcolor: 'palevioletred', p: 1, textTransform: 'uppercase' }}>
  CssProp
</Box>
```

{{"demo": "pages/system/basics/CssProp.js"}}

## 工作方式

风格的系统已经做了很多工作在 [解释它是如何工作的](https://github.com/jxnblk/styled-system/blob/master/docs/how-it-works.md#how-it-works)的。 它可以帮助建设一个心理模型对于这种"风格的功能"概念。

## 真实世界中的使用情况

在实践中，一个盒子成分可以节省很多时间。 在这个例子中，我们表明如何再现旗帜的组成部分。

{{"demo": "pages/system/basics/RealWorld.js"}}

## 现有技术

`@材料-ui/系统` 综合的想法 & Api从几个不同的来源：

- [Tachyons](https://tachyons.io/) 是一个第(2014年)CSS库，以促进 [原子CSS模式](https://css-tricks.com/lets-define-exactly-atomic-css/) (或功能CSS)。
- Tachyons后来在(2017年)，其次是 [顺风CSS](https://tailwindcss.com/)的。 他们已经由原子CSS更受欢迎。
- [Twitter的引导](https://getbootstrap.com/docs/4.1/utilities/borders/) 已经慢慢介绍了原子类名在v2，v3,和v4。 我们必须用他们的集团，他们的"助手类"作为灵感。
- 在作出反应的世界， [风格系统](https://github.com/jxnblk/styled-system) 是一个第(2017年)，以促进风格的功能。 它可以作为一个通用框部件替换原子CSS佣工及佣工中写入新的组成。
- 这样的大公司访问网站审查，并且段。io都使用同样的方法在不同的口味的： 
  - [绿箱](https://evergreen.segment.com/components/layout-primitives)
  - [完形盒](https://pinterest.github.io/gestalt/#/Box)
  - [底涂框](https://primer.style/components/docs/Box)
- 实际执行情况和对象响应API的灵感来自于 [顺利-UI的系统](https://smooth-ui.smooth-code.com/docs-basics-system)的。