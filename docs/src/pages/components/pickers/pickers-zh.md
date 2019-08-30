---
title: Date picker, Time picker React components
components: TextField
---

# Date/Time pickers

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- 在移动端，选择器最适合在确认对话框中展示。
- 对于内联显示（如在一个表单中），请考虑使用紧凑型控件，如分段下拉按钮。

## @material-ui/pickers

![stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm下载](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date picker and time picker controls.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## 原生的选择器

⚠️ 浏览器原生输入控件[并不完美](https://caniuse.com/#feat=input-datetime)。 Have a look at [@material-ui/pickers](#material-ui-pickers) for a richer solution.

### Datepickers

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Date & Time pickers（日期和时间选择器）

这个例子通过 `type="datetime-local"` 实现了原生的日期和时间选择器。

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Time pickers（时间选择器）

这个例子通过 `type="time"` 实现了原生的时间选择器。

{{"demo": "pages/components/pickers/TimePickers.js"}}