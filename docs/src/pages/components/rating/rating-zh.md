---
title: 评分 React 组件
components: Rating
---

# Rating 评分

<p class="description">评分可以展现用户对某一产品的大致态度和使用体验。 用户也可以为他们购买过的产品打分。</p>

## 简单评分

{{"demo": "pages/components/rating/SimpleRating.js"}}

## 自定义评分

这是一些自定义样式开关的例子 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## 悬停反馈

当用户的鼠标悬停在评分组件上时，您可以展示标签以帮助他们选择分值。 以下案例使用了 `onChangeActive` 这一属性。

{{"demo": "pages/components/rating/HoverRating.js"}}

## 半个评分

这种评分组件可以展示任何浮点数。此功能可通过 `value` 属性实现。 您可以使用 `precision` 属性定义最小步进值。

{{"demo": "pages/components/rating/HalfRating.js"}}

## 尺寸

想把评分组件变大或变小？ 您可以使用 `size` 属性。

{{"demo": "pages/components/rating/RatingSize.js"}}

## 可访问性

（WAI 教程：https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating）

这个组件的可访问性依赖于：

- 使用 radio group 时，其字段在视觉上是隐藏的。 它包含六个单选按钮，其中五个用于每个评分等级，另一个用于"显示" 0 个评分，其默认情况下处于选中状态。 确保您提供的 `name` prop 在父表单中唯一。
- 单选按钮的标签需要包含确切的文本（“一星”，“两星”，…）。当页面的语言不是英文时，请使用 `getLabelText` 这一属性。