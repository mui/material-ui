---
title: 切换按钮 React 组件
components: ToggleButton, ToggleButtonGroup
---

# Toggle Button 切换按钮

<p class="description">Toggle Buttons 可用于对相关选项进行分组。</p>

为了强调组合之间的关联，每一组 [Toggle buttons](https://material.io/components/buttons#toggle-button) 应该共享一个容器。 The `ToggleButtonGroup` controls the selected state of its child buttons when given its own `value` prop.

## 单选

Text justification toggle buttons present options for left, right, center, full, and justified text with only one item available for selection at a time. 选择一个选项则会取消其他选项。

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## 多选

逻辑分组 (Logically-grouped) 的选项（如粗体，斜体和下划线）可以允许每次选择多个选项。

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## 尺寸

您想要一个大一点或者小一点的按钮吗？ 您可以使用 `size` 属性。

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Vertical buttons

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## 强制设置值

如果要强制至少一个按钮处于活动状态，则可以实现 handleChange 函数。

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## 单独的切换按钮

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## 自定义切换按钮

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## 可访问性

- ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- ToggleButton sets `aria-pressed="<bool>"` according to the button state. 您应该用 `aria-label` 标记每个按钮。