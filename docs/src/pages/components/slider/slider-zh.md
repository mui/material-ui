---
title: React Slider（滑块）组件
components: Slider
---

# Slider 滑块控件

<p class="description">用户可以使用滑块控件在某一范围内取值。</p>

[滑块控件](https://material.io/design/components/sliders.html) 反映了条形图上的一系列值，用户可以从中选择单个值。 它们通常适用于调节一些设置，譬如调节设备音量、调整屏幕亮度，或者改变图像的滤镜。

- 📦 [22 kB 压缩大小](/size-snapshot) (但与其他 Material-UI 组件使用时只有+8 kB)。

## 连续滑块（Continuous sliders）

用户可以使用连续的滑块组件在给定的范围内选择一个值。

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## 间续滑块（Discrete sliders）

用户可以通过参考其值指示器，来将间续滑块调整为某一特定值。 以下是一些案例：

通过设置 `marks={true}`，你可以针对每个步骤产生一个标记（mark）。

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### 小的步骤

您可以更改默认的步进增量。

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### 自定义标记

通过将一个丰富的数组提供给 `marks` 属性，您可以定制标记。

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### 受限制的值

通过将 `step={null}` 赋予给 `marks` 属性，您可以限制可供选择的值。

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### 标签总是可见

通过设置 `valueLabelDisplay="on"`，您可以强制缩略图的标签始终可见。

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## 范围滑块

通过提供一个包含值的数组给 `value` 属性，您可以设置滑块的起始和终止值。

{{"demo": "pages/components/slider/RangeSlider.js"}}

## 带输入框的滑块组件

在这个例子中，我们允许给输入框设置一个离散值。

{{"demo": "pages/components/slider/InputSlider.js"}}

## 自定义滑块

你可以参考以下一些例子来自定义组件。 你可以参考以下一些例子来自定义组件。 您可以在 [重写文档页面](/customization/components/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## 纵向滑块

{{"demo": "pages/components/slider/VerticalSlider.js"}}

## 轨道（Track）

轨道显示了允许用户选择的范围。

### 移除轨道

您可以通过设置 `track={false}` 来禁用轨道。

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### 反转轨道

你可以通过设置 `track="inverted"` 来反转轨道。

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## 非线性缩放

你可以使用 `scale` 属性来表示不同范围的`值`。 例如，在下面的例子中，*x* 的值表示 *10^x*。

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

该组件处理了大部分必要的工作，使之应用无障碍访问。 但是，你需要确保：

- 每个滑块都带有一个方便用户的标签（`aria-label`、`aria-labelledby` 或 `getAriaLabel` 属性）。
- 每一个滑块的当前值都有一个方便用户阅读的文字。 如果值与标签的语义相匹配的话，则不需要此操作。 你可以通过`getAriaValueText` 或者 `aria-valuetext` 属性来更改名字。