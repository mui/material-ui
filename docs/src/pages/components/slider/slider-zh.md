---
title: React 滑块组件
components: Slider
---

# 滑块

<p class="description">用户可以使用滑块组件从某一范围内选取所需数值。</p>

[滑块](https://material.io/design/components/sliders.html) 反映了条形图上的一系列值，用户可以从中选择单个值。 滑块组件适用于调节设备音量、调整屏幕亮度，或者改变图像滤镜的强度。

- 

## 连续值滑块

用户可以使用连续值滑块从给定范围内选择某一数值。

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## 离散值滑块

用户可以通过调整滑块位置选取某些特定数值。这些数值会在数值指示器上显示。 以下是一些案例：

1. 在横轴上标记可选数值的位置：`marks={true}`
2. You can have custom marks by providing a rich array to the `marks` prop.
3. You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.
4. 数值标签始终可见： `valueLabelDisplay="on"`

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

## 双点滑块

{{"demo": "pages/components/slider/RangeSlider.js"}}

## 自定义滑块

以下是一些自定义滑块的案例。点击[自定义组件说明文档](/customization/components/)了解更多。

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## 带有输入框的滑块

{{"demo": "pages/components/slider/InputSlider.js"}}

## 纵向滑块

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## 无障碍设计

你可以通过调节组件设置使其满足无障碍设计的要求。要点如下：

- 为整个滑块组件添加一个标签 (`aria-label` or `aria-labelledby`)。
- 为数值标签的提示气泡添加有意义的名称， 除非数值的含义显而易见。 你可以通过`getAriaValueText` 或者 `aria-valuetext` 更改提示气泡的名称。