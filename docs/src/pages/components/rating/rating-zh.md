---
title: React 评分组件
components: Rating
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# Rating 评分

<p class="description">Ratings provide insight regarding others’ opinions and experiences, and can allow the user to submit a rating of thier own.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic rating

{{"demo": "pages/components/rating/BasicRating.js"}}

## Rating precision

使用 `value`  属性可以让评分组件展示任何的浮点的评分值。 您可以使用 `precision` 属性定义可变化的最小增量值。

{{"demo": "pages/components/rating/HalfRating.js"}}

## 悬停反馈

You can display a label on hover to help the user pick the correct rating value. 以下案例使用了 `onChangeActive` 这一属性。

{{"demo": "pages/components/rating/HoverRating.js"}}

## 尺寸

For larger or smaller ratings use the `size` prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Customized rating

你可以参考以下一些例子来自定义组件。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## 无障碍设计

([WAI tutorial](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

这个组件的可访问性依赖于：

- A radio group with its fields visually hidden. It contains six radio buttons, one for each star, and another for 0 stars that is checked by default. Be sure to provide a value for the `name` prop that is unique to the parent form.
- Labels for the radio buttons containing actual text (“1 Star”, “2 Stars”, …). Be sure to provide a suitable function to the `getLabelText` prop when the page is in a language other than English. You can use the [included locales](https://material-ui.com/guides/localization/), or provide your own.
- A visually distinct appearance for the rating icons. By default, the rating component uses both a difference of color and shape (filled and empty icons)to indicate the value. 如果你使用颜色作为唯一的方式来表示数值，那么数值信息也应该像下面这个示例一样以文本的形式来显示。 这对于符合 WCAG2.1 的 [成功标准 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) 非常重要。

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

The read only rating has a role of "img", and an aria-label that describes the displayed rating.

### 键盘输入

Because the rating component uses radio buttons, keyboard interaction follows the native browser behavior. Tab will focus the current rating, and cursor keys control the selected rating.

The read only rating is not focusable.
