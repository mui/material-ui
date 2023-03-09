---
product: material-ui
title: React Slider（滑块）组件
components: Slider
githubLabel: 'component: slider'
materialDesign: https://m2.material.io/components/sliders
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
unstyled: /base/react-slider/
---

# Slider 滑块控件

<p class="description">用户可以使用滑块控件在某一范围内取值。</p>

滑块反映了一根条上的一系列值，用户可以从中选择单个值。 它们通常适用于调节一些设置，譬如调节设备音量、调整屏幕亮度，或者改变图像的滤镜。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 连续滑块（Continuous sliders）

用户可以使用连续的滑块组件在给定的范围内选择一个值。

{{"demo": "ContinuousSlider.js"}}

## 尺寸

For smaller slider, use the prop `size="small"`.

{{"demo": "SliderSizes.js"}}

## 间续滑块（Discrete sliders）

用户可以通过参考其值指示器，来将间续滑块调整为某一特定值。 通过设置 `marks={true}`，你可以针对每个步骤产生一个标记（mark）。

{{"demo": "DiscreteSlider.js"}}

### 小的步骤

您可以更改默认的步进增量。

{{"demo": "DiscreteSliderSteps.js"}}

### 自定义标记

通过将一个丰富的数组提供给 `marks` 属性，您可以定制标记。

{{"demo": "DiscreteSliderMarks.js"}}

### 受限制的值

通过将 `step={null}` 赋予给 `marks` 属性，您可以限制可供选择的值。

{{"demo": "DiscreteSliderValues.js"}}

### 标签总是可见

通过设置 `valueLabelDisplay="on"`，您可以强制缩略图的标签始终可见。

{{"demo": "DiscreteSliderLabel.js"}}

## 范围滑块

通过提供一个包含值的数组给 `value` 属性，您可以设置滑块的起始和终止值。

{{"demo": "RangeSlider.js"}}

### Minimum distance

You can enforce a minimum distance between values in the `onChange` event handler. By default, when you move the pointer over a thumb while dragging another thumb, the active thumb will swap to the hovered thumb. You can disable this behavior with the `disableSwap` prop. You can enforce a minimum distance between values in the `onChange` event handler. By default, when you move the pointer over a thumb while dragging another thumb, the active thumb will swap to the hovered thumb. You can disable this behavior with the `disableSwap` prop. You can enforce a minimum distance between values in the `onChange` event handler. By default, when you move the pointer over a thumb while dragging another thumb, the active thumb will swap to the hovered thumb. You can disable this behavior with the `disableSwap` prop. If you want the range to shift when reaching minimum distance, you can utilize the `activeThumb` parameter in `onChange`.

{{"demo": "MinimumDistanceSlider.js"}}

## 带输入框的滑块组件

In this example, an input allows a discrete value to be set.

{{"demo": "InputSlider.js"}}

## Color 颜色

{{"demo": "ColorSlider.js"}}

## 自定义滑块

你可以参考以下一些例子来自定义组件。 You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedSlider.js"}}

### Music player

{{"demo": "MusicPlayerSlider.js"}}

## 纵向滑块

{{"demo": "VerticalSlider.js"}}

**警告**： Chrome、Safari 和较新的 Edge 版本，即任何基于 WebKit 的浏览器都会将 `<Slider orientation="vertical" />` 暴露为水平状态（[chromium 问题 #1158217](https://bugs.chromium.org/p/chromium/issues/detail?id=1158217)）。 通过应用 `-webkit-appearance: slider-vertical;` 将滑块显示为垂直。

然而，应用 `-webkit-appearance: slider-vertical;` 之后会导致水平键的键盘导航（<kbd class="key">向左箭头</kbd>，<kbd class="key">向右箭头</kbd>）被反转（[chromium 问题 #1162640](https://bugs.chromium.org/p/chromium/issues/detail?id=1162640)）。 通常情况下，向上、向右应增加，向左、向下应减少数值。 如果你应用 `-webkit-appearance`，那么就可以阻止键盘导航水平方向键的功能，以实现真正的垂直滑块。 与改变方向相比，这可能会减少用户的困惑。

{{"demo": "VerticalAccessibleSlider.js"}}

## 轨道（Track）

轨道显示了允许用户选择的范围。

### 移除轨道

您可以通过设置 `track={false}` 来禁用轨道。

{{"demo": "TrackFalseSlider.js"}}

### 反转轨道

你可以通过设置 `track="inverted"` 来反转轨道。

{{"demo": "TrackInvertedSlider.js"}}

## 非线性缩放

你可以使用 `scale` 属性来表示不同范围的`值`。

在下面的演示中，_x_ 代表 _2^x_。 将 _x_ 增加 1 会使表示的值增加 _2_。

{{"demo": "NonLinearSlider.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/)

The component handles most of the work necessary to make it accessible. However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value. This is not required if the value matches the semantics of the label. You can change the name with the `getAriaValueText` or `aria-valuetext` prop.

## Limitations

### IE 11

The slider's value label is not centered in IE 11. The alignement is not handled to make customizations easier with the lastest browsers. You can solve the issue with:

```css
.MuiSlider-valueLabel {
  left: calc(-50% - 4px);
}
```
