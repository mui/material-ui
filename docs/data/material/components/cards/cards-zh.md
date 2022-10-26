---
product: material-ui
title: React Card（卡片）组件
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: card'
materialDesign: https://m2.material.io/components/cards
---

# Card 卡片

<p class="description">卡片组件能够承载与单个主题相关的内容和操作。</p>

卡片是一个显示与单个主题相关的内容和可被操作的容器。

通过卡片组件，扫描相关的和可操作的信息更为便捷了。 像文本和图像这样的元素，则应按照清晰的布局来排列，以此呈现结构层次。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic card

尽管卡片支持多操作、多个 UI 控件和一个加长的菜单，但请不要滥用它，切记，卡片只能作为那些复杂且详细信息的一个入口。

{{"demo": "BasicCard.js", "bg": true}}

### 描边卡片

通过设置 `variant="outlined"` 来渲染一个描边卡片。

{{"demo": "OutlinedCard.js", "bg": true}}

## 复杂的交互情况

在桌面上，卡片内容是可以展开的。 （点击向下箭头的按钮来查看配方。）

{{"demo": "RecipeReviewCard.js", "bg": true}}

## Media 多媒体内容

下面的例子则一个使用图像来增强内容的卡片。

{{"demo": "MediaCard.js", "bg": true}}

默认情况下，我们结合 `<div>` 元素和一张 _背景图片_ 来展示多媒体元素。 在某些情况下它也可能会出现问题，例如，你想要显示一个视频或一张响应式的图片。 使用 `component` 属性可以解决这样的情况：

{{"demo": "ImgMediaCard.js", "bg": true}}

:::warning
⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. It's not supported by IE11.
:::

## 主要（Primary）操作

Often a card allow users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen or some other behavior. The action area of the card can be specified by wrapping its contents in a `CardActionArea` component.

{{"demo": "ActionAreaCard.js", "bg": true}}

A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap.

{{"demo": "MultiActionAreaCard.js", "bg": true}}

## UI 控件

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"demo": "MediaControlCard.js", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/card/).
