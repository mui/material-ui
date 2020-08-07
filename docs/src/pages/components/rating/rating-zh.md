---
title: React 评分组件
components: Rating
---

# Rating 评分

<p class="description">评分组件带我们深入了解他人对产品的意见和体验。 用户还可以对自己购买的产品进行评价。</p>

## 简单的评分组件

{{"demo": "pages/components/rating/SimpleRating.js"}}

## 自定义的评分组件

你可以参考以下一些例子来自定义组件。 您可以在 [重写文档页](/customization/components/) 中了解有关此内容的更多信息。

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## 悬停反馈

当用户的鼠标悬停在评分组件上时，您可以展示标签以帮助他们选择分值。 以下案例使用了 `onChangeActive` 这一属性。

{{"demo": "pages/components/rating/HoverRating.js"}}

## 一半的评分

使用 `value` 属性可以让评分组件展示任何的浮点的评分值。 您可以使用 `precision` 属性定义可变化的最小增量值。

{{"demo": "pages/components/rating/HalfRating.js"}}

## 尺寸

您想要一个大一点或者小一点的评分组件吗？ 试着使用 `size` 属性吧。

{{"demo": "pages/components/rating/RatingSize.js"}}

## 无障碍设计

（WAI 教程：https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating）

这个组件的可访问性依赖于：

- 在使用单选框组（radio group）时，其字段在视觉上是被隐藏的。 它包含六个单选按钮，其中五个用于每个星，另一个用于 0 星，其默认情况下处于选中状态。 请确保您提供的 `name` 属性在父级表单中是独特的。
- 单选按钮的标签需要包含一个确切的文本（“一星”，“两星”，.......），并请确认当页面语言不是英语时，您提供了一个 `getLabelText` 属性。