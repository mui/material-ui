---
title: React 日期、时间选择器组件
components: TextField
---
# 选择器

<p class="description">选择器提供了一种从预先设定的集合中选取单个值的简单方法。</p>

- 在移动端，选择器最适合在确认对话框中展示。
- 对于内联显示（如在一个表单中），请考虑使用紧凑型控件，如分段下拉按钮。

#### 注意

We are falling back to **native input controls**. 如果你有兴趣实现或者已经实现了一个符合 Material Design 的且用户体验良好的富选择器，请在[ #4787 ](https://github.com/mui-org/material-ui/issues/4787)和[ #4796 ](https://github.com/mui-org/material-ui/issues/4796)告诉我们。 We could add [a link to or a demo](#complementary-projects) of your project in the documentation.

⚠️ 浏览器原生输入控件[并不完美](https://caniuse.com/#feat=input-datetime)。

## 日期选择器

A native date picker example with `type="date"`, it can be used as a calendar too.

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## Date & Time pickers

A native date & time picker example with `type="datetime-local"`.

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

## Time pickers

A native time picker example with `type="time"`.

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## 补充项目

For more advanced use cases you might be able to take advantage of.

### material-ui-pickers

![stars](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[material-ui-pickers](https://material-ui-pickers.firebaseapp.com/) provides date and time controls that follow the Material Design spec.

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### Other

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker): time pickers.
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers): date pickers and time pickers.