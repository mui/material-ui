---
title: 滑块 React 组件
components: Slider
---

# Slider 滑块

<p class="description">用户可以使用滑块组件从某一范围内选取所需数值。</p>

[滑块](https://material.io/design/components/sliders.html) 反映了条形图上的一系列值，用户可以从中选择单个值。 滑块组件适用于调节设备音量、调整屏幕亮度，或者改变图像滤镜的强度。

- 📦 [22 kB gzipped](/size-snapshot) (但与其他Material-UI组件一起使用时，仅 +8 kB)

## 连续值滑块

用户可以使用连续值滑块从给定范围内选择某一数值。

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## 离散值滑块

离散滑块可以通过参考 (referencing) 其值指示器 (value indicator) 来调整为某一特定值。 以下是一些案例：

在横轴上标记可选数值的位置：`marks={true}`

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### Small steps

您可以更改默认的步进增量。

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### 自定义标记

您可以通过为 `marks` prop 提供一个含义数据的数组来获得自定义标记。

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### 受限制的值

您可以使用 `step={null} ` 来将可选值限制为 `marks` prop 提供的值。

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### 标签总是可见

数值标签始终可见： `valueLabelDisplay="on"`

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## 范围滑块

通过向 `value` prop 提供一个包含值的数组，可以设置滑块值的开始和结束。

{{"demo": "pages/components/slider/RangeSlider.js"}}

## 带输入的滑块

In this example an input allows a discrete value to be set.

{{"demo": "pages/components/slider/InputSlider.js"}}

## 自定义滑块

以下是自定义组件的一些例子。 您可以在[重写文档页面](/customization/components/)中了解更多有关此内容的信息。

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## 纵向滑块

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## 轨道

Track 显示可供用户选择的范围。

### 移除 track

track 可以通过设置 `track={false}` 来禁用。

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### 反转轨道

设置 `track="inverted"` 来反转轨道。

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## 非线性缩放

You can use the `scale` prop to represent the `value` on a different scale. 例如，下面的例子中，*x* 的值表示 *10^x*。

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

The component handles most of the work necessary to make it accessible. 但是，你需要确保：

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. 除非数值的含义显而易见。 你可以通过`getAriaValueText` 或者 `aria-valuetext` 更改提示气泡的名称。