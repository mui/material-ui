---
title: 切换按钮React组件
components: ToggleButton, ToggleButtonGroup
---

# 切换按钮

<p class="description">Toggle Buttons 可用于对相关选项进行分组。</p>

为了强调组合之间的关联，每一组 [Toggle buttons](https://material.io/design/components/buttons.html#toggle-button) 应该共享一个容器。

The `ToggleButtonGroup` will control the selected state of its child buttons when given its own `value` prop.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## 尺寸

想要更大或更小的按钮？ 你可以使用 `size` 属性。

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## 可访问性

ToggleButtonGroup has `role="group"`. You should provide an accessible label with `arial-label="label"`, `aria-labelledby="id"` or `<label>`.

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.