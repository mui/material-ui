---
title: React Date Picker（日期选择器）和 Time Picker（时间选择器）组件
components: TextField
---

# Pickers（选择器）

<p class="description">选择器提供了一种从预先设定的集合中选取单个值的简单方法。</p>

- 在移动端，选择器最适合在确认对话框中展示。
- 对于内联显示（如在一个表单中），请考虑使用紧凑型控件，如分段下拉按钮。

## 原生的选择器

⚠️ 浏览器原生输入控件[并不完美](https://caniuse.com/#feat=input-datetime)。 请参考[补充项目](#complementary-projects)来获得更丰富的解决方案。

### Date pickers（日期选择器）

这个例子通过 `type="time"` 而实现了原生的时间选择器。

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time pickers（日期和时间选择器）

这个例子通过 `type="datetime-local"` 实现了原生的日期和时间选择器。

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time pickers（时间选择器）

这个例子通过 `type="time"` 实现了原生的时间选择器。

{{"demo": "pages/components/pickers/TimePickers.js"}}

## 补充项目

对于更高级的用例，您可以使用这些：

### @material-ui/pickers

![stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm下载](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui-pickers](https://material-ui-pickers.dev/) 提供遵循 Material Design 规范的日期和时间控件。

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}