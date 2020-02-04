---
title: React Stepper（步骤条）组件
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---

# Stepper（步进器）

<p class="description">步进器通过数字编号表示进度。 It provides a wizard-like workflow.</p>

[步骤条](https://material.io/archive/guidelines/components/steppers.html) 通过一系列逻辑和编号的步骤来显示当前操作的进度。 它们也可用于导航。 在保存一个步骤后，步骤条可能会显示短暂的反馈信息。

- **Types of Steps**: Editable, Non-editable, Mobile, Optional
- **Types of Steppers**: Horizontal, Vertical, Linear, Non-linear

> **Note:** Steppers are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them.

## Horizontal Stepper

### 线性的步骤条

您可以在 `activeStep` 属性中传入一个初始值为0的当前步骤值来控制 `步骤条`。 您也可以借助 `orientation` 属性来设置 `步骤条` 的方向。

这个例子把`optional` 属性放在第二个 `步骤` 的组件上，它展示了如何使用一个可选的步骤条。 请注意，您可以自行选择管理跳过一个可选的步骤。 一旦决定将一个特定步骤设置为可选的，您就必须配置这个属性 `completed={false}` 以表示即使激活的步骤索引超出了可选的步骤，步骤条并没有完成。

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js", "bg": true}}

### Linear - Alternative Label

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js", "bg": true}}

### 定制步进器

以下是自定义组件的一个示例。 您可以在[样式重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/steppers/CustomizedSteppers.js", "bg": true}}

### 非线性的步骤条

非线性步进器允许用户在任何点输入多步流程。

此示例类似于常规的水平步进器，但步骤不再基于` activeStep `属性自动设置` disabled = {true} `。

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed` flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to determine when all steps are completed (or even if they need to be completed).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js", "bg": true}}

### Non-linear - Alternative Label

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

{{"demo": "pages/components/steppers/HorizontalNonLinearAlternativeLabelStepper.js", "bg": true}}

### Non-linear - Error Step

{{"demo": "pages/components/steppers/HorizontalNonLinearStepperWithError.js", "bg": true}}

## 垂直步进器

{{"demo": "pages/components/steppers/VerticalLinearStepper.js", "bg": true}}

## 移动设备上的步进器

该组件实现了适用于移动设备的紧凑型步进器。 有关其详情, 请参阅 [移动步骤](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps)。

### Text

This is essentially a back/next button positioned correctly. You must implement the textual description yourself, however, an example is provided below for reference.

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### Text with Carousel effect

这个实例与之前的非常相似，不同之处在于使用[ react-swipeable-views ](https://github.com/oliviertassinari/react-swipeable-views)以进行步骤转换。

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### Dots

当步骤的数字不是特别明显时使用点状标记。

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### Progress（进度条）

当有许多步骤时，或者如果在此过程中需要插入步骤（基于对早期步骤的响应），请使用进度条。

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}