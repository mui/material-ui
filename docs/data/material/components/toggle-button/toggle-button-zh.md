---
product: material-ui
title: Toggle button React component
components: ToggleButton, ToggleButtonGroup
githubLabel: 'component: toggle button'
materialDesign: 'https://m2.material.io/components/buttons#toggle-button'
---

# Toggle button

<p class="description">切换按钮组件可用于对相关选项进行分组。</p>

为了强调组合之间的关联，每一组切换按钮应该共享一个容器。 当给定切换按钮的 `value` 属性时，`ToggleButtonGroup` 就可以控制其子按钮的选择状态（selected state）。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 唯一的选择

在唯一的选择中，选择一个选项就会取消其他的选择状态。

In this example, text justification toggle buttons present options for left, center, right, and fully justified text (disabled), with only one item available for selection at a time.

**Note**: Exclusive selection does not enforce that a button must be active. For that effect see [enforce value set](#enforce-value-set).

{{"demo": "ToggleButtons.js"}}

## 多选

Multiple selection allows for logically-grouped options, like bold, italic, and underline, to have multiple options selected.

{{"demo": "ToggleButtonsMultiple.js"}}

## Size 大小

For larger or smaller buttons, use the `size` prop.

{{"demo": "ToggleButtonSizes.js"}}

## Color 颜色

{{"demo": "ColorToggleButton.js"}}

## 垂直排列的按钮

The buttons can be stacked vertically with the `orientation` prop set to "vertical".

{{"demo": "VerticalToggleButtons.js"}}

## 强制设置值

If you want to enforce that at least one button must be active, you can adapt your handleChange function.

```jsx
const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};

const handleDevices = (event, newDevices) => {
  if (newDevices.length) {
    setDevices(newDevices);
  }
};
```

{{"demo": "ToggleButtonNotEmpty.js"}}

## 单独的切换按钮

{{"demo": "StandaloneToggleButton.js"}}

## 自定义切换按钮

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedDividers.js", "bg": true}}

## 无障碍设计

### ARIA

- ToggleButtonGroup 具有 `role="group"`。 请您提供一个可访问的标签，标签包含 `aria-label="label"`，`aria-labelledby="id"` 或 `<label>`。
- ToggleButton 根据按钮的状态来设置 `aria-pressed="<bool>"`。 您应该用 `aria-label` 标记每个按钮。

### 键盘输入

At present, toggle buttons are in DOM order. Navigate between them with the tab key. The button behavior follows standard keyboard semantics.
