---
title: React 切换按钮组件
components: ToggleButton, ToggleButtonGroup
---

# Toggle Button 切换按钮

<p class="description">切换按钮组件可用于对相关选项进行分组。</p>

为了强调相关 [切换按钮](https://material.io/components/buttons#toggle-button)的关联，每一个组应该共享一个容器。 当给定切换按钮的 `value` 属性时，`ToggleButtonGroup` 就可以控制其子按钮的选择状态（selected state）。

## 唯一的选择

文本对齐的切换按钮提供了 left，right，center，full 和 justified 的选项，但是每次只能选择一个项目。 选择一个选项则会取抵消其他的选项。

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## 多选

有一些逻辑分组 (Logically-grouped) 的选项，如粗体，斜体和下划线，则允许同时选择多个选项。

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## 尺寸

您想要一个大一点或者小一点的按钮吗？ 试着使用 `size` 属性吧。

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## 垂直排列的按钮

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## 强制设置值

如果您想约束至少一个按钮处于活动状态，请尝试调整 handleChange 函数。

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

## 无障碍设计

- ToggleButtonGroup 具有 `role="group"`。 请您提供一个可访问的标签，标签包含 `aria-label="label"`，`aria-labelledby="id"` 或 `<label>`。
- ToggleButton 根据按钮的状态来设置 `aria-pressed="<bool>"`。 您应该用 `aria-label` 标记每个按钮。