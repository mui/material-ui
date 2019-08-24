---
title: React 滑块组件
components: Slider
---

# Slider

<p class="description">用户可以使用滑块组件从某一范围内选取所需数值。</p>

[滑块](https://material.io/design/components/sliders.html) 反映了条形图上的一系列值，用户可以从中选择单个值。 滑块组件适用于调节设备音量、调整屏幕亮度，或者改变图像滤镜的强度。

- 📦 [22 kB gzipped](/size-snapshot) (but only 8 kB without @material-ui/styles).

## 离散值滑块

Discrete sliders can be adjusted to a specific value by referencing its value indicator. By order of demos:

1. 在横轴上标记可选数值的位置：`marks={true}`
2. You can change the default step increment.
3. You can have custom marks by providing a rich array to the `marks` prop.
4. You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.
5. 数值标签始终可见： `valueLabelDisplay="on"`

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

## 自定义滑块

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## 连续值滑块

用户可以使用连续值滑块从给定范围内选择某一数值。

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## 双点滑块

{{"demo": "pages/components/slider/RangeSlider.js"}}

## 带有输入框的滑块

{{"demo": "pages/components/slider/InputSlider.js"}}

## 纵向滑块

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## 无障碍设计

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- 为整个滑块组件添加一个标签 (`aria-label` or `aria-labelledby`)。
- 为数值标签的提示气泡添加有意义的名称， 除非数值的含义显而易见。 你可以通过`getAriaValueText` 或者 `aria-valuetext` 更改提示气泡的名称。