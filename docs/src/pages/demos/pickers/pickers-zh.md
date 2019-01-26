---
title: Date Picker, Time Picker React components
components: TextField
---
# 选择器

<p class="description">选择器提供了一种从预先设定的集合中选取单个值的简单方法。</p>

- 在移动端，选择器最适合在确认对话框中展示。
- 对于内联显示（如在一个表单中），请考虑使用紧凑型控件，如分段下拉按钮。

#### 注意

我们回归到 **原生输入控件**。

⚠️ 浏览器原生输入控件[并不完美](https://caniuse.com/#feat=input-datetime)。 Have a look at the [complementary projects](#complementary-projects) for richer solutions.

## 日期选择器

一个原生的 `type="date"` 日期选择器示例 ，它也可以用作日历：

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## 日期和时间选择器

一个原生的 `type="datetime-local"` 日期和时间选择器示例。

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

## 时间选择器

一个原生的 `type="time"` 时间选择器示例 。

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### material-ui-pickers

![stars](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[material-ui-pickers](https://material-ui-pickers.firebaseapp.com/) 提供遵循Material Design规范的日期和时间控件。

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### 其他

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker)：时间选择器。
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers)：日期和时间选择器。