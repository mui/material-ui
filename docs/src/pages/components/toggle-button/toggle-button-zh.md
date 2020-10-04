---
title: React 切换按钮组件
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: ToggleButton'
materialDesign: 'https://material.io/components/buttons#toggle-button'
---

# Toggle Button 切换按钮

<p class="description">切换按钮组件可用于对相关选项进行分组。</p>

为了强调组合之间的关联，每一组 [Toggle buttons](https://material.io/components/buttons#toggle-button) 应该共享一个容器。 当给定切换按钮的 `value` 属性时，`ToggleButtonGroup` 就可以控制其子按钮的选择状态（selected state）。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 唯一的选择

With exclusive selection, selecting one option deselects any other.

In this example text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## 多选

Multiple selection allows for logically-grouped options, like bold, italic, and underline, to have multiple options selected.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## 尺寸

您想要一个大一点或者小一点的按钮吗？ 我们提供了 `size` 这个属性供您调整。

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## 垂直排列的按钮

The buttons can be stacked vertically with the `orientation` prop set to "vertical".

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## 强制设置值

If you want to enforce that at least one button must be active, you can adapt your handleChange function.

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

### ARIA

- ToggleButtonGroup 具有 `role="group"`。 请您提供一个可访问的标签，标签包含 `aria-label="label"`，`aria-labelledby="id"` 或 `<label>`。
- ToggleButton 根据按钮的状态来设置 `aria-pressed="<bool>"`。 您应该用 `aria-label` 标记每个按钮。

### 键盘输入

At present, toggle buttons are in DOM order. Navigate between them with the tab key. The button behavior follows standard keyboard semantics.
