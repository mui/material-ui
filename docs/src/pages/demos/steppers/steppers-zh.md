---
title: 步进器React组件
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---
# 步进器

<p class="description">步进器通过数字编号表示进度。</p>

[步进器](https://material.io/archive/guidelines/components/steppers.html) 通过一系列逻辑和编号步骤显示当前操作的进度。 它们也可用于导航。 在保存状态后，步进器可能会显示短暂的反馈信息。

**步骤类型**

- 可编辑
- 不可编辑
- 可移动
- 可选的

**步进器类型**

- 水平的
- 垂直的
- 线状
- 非线性的

> **Note:** Steppers are no longer documented in the Material Design documentation.

## 水平的步进器

可以通过更改一个初始值为0的当前步骤值`activeStep`来控制`Stepper` 使用` orientation </ code>属性设置<code> Stepper </ code>方向。</p>

<p>使用<code> orientation `属性设置`Step`组件方向。 请注意，您可以在跳过可选步骤时进行管理。 一旦为特定步骤确定了这一点，就必须设置` completed = {false} `以表示即使活动步骤索引超出了可选步骤，它也不会实际完成。

{{"demo": "pages/demos/steppers/HorizontalLinearStepper.js"}}

## 水平非线性的步进器

非线性步进器允许用户在任何点输入多步流程。

此示例类似于常规的水平步进器，但步骤不再基于` activeStep `属性自动设置` disabled = {true} `。

我们在这里使用` StepButton `来演示可点击的步骤标签以及设置` completed `。但是因为可以以非线性方式访问步骤，所以这取决于您自己的实现确定所有步骤何时完成（或者甚至是否需要完成）。

{{"demo": "pages/demos/steppers/HorizontalNonLinearStepper.js"}}

## 水平线性 - 可替换标签

通过在` Stepper `组件上设置` alternativeLabel `属性，可以将标签放置在步骤图标下方。

{{"demo": "pages/demos/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

## 水平非线性 - 可替换标签

{{"demo": "pages/demos/steppers/HorizontalNonLinearAlternativeLabelStepper.js"}}

## 水平非线性 - 错误步骤展示

{{"demo": "pages/demos/steppers/HorizontalNonLinearStepperWithError.js"}}

## 垂直步进器

{{"demo": "pages/demos/steppers/VerticalLinearStepper.js"}}

## 定制步进器

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here are examples of how you can change the look of a stepper.

This component uses a customized `StepConnector` element that changes border color based on the `active` and `completed` state.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/steppers/CustomizedStepper.js"}}

## 移动设备上的步进器

This component implements a compact stepper suitable for a mobile device. See [mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) for its inspiration.

### 移动设备的步进器 - 文字

This is essentially a back/next button positioned correctly. You must implement the textual description yourself, however, an example is provided below for reference.

{{"demo": "pages/demos/steppers/TextMobileStepper.js"}}

### 移动设备步进器 - 带轮播效果

This demo is very similar to the previous, the difference is the usage of [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) to make the transition of steps.

{{"demo": "pages/demos/steppers/SwipeableTextMobileStepper.js"}}

### 移动设备的步进器 - 指示点

Use dots when the number of steps isn’t large.

{{"demo": "pages/demos/steppers/DotsMobileStepper.js"}}

### 移动设备步进器 - 进度条

Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).

{{"demo": "pages/demos/steppers/ProgressMobileStepper.js"}}