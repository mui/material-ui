---
title: React Stepper 步骤条组件
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---

# Stepper 步进器 

<p class="description">步进器通过数字编号表示进度。 使用步进器可以提供类似于安装向导的用户流。</p>

[步骤条](https://material.io/archive/guidelines/components/steppers.html) 通过一系列逻辑和编号的步骤来显示当前操作的进度。 它们也可用于导航。 在保存一个步骤后，步骤条可能会显示短暂的反馈信息。

- **节点类型**：可编辑节点，不可编辑节点，移动节点，非强制节点
- **步进器类型**：横向步进器，竖向步进器，线性步进器，非线性步进器

> **注意：**步进器不再出现在 [Material Design 指南](https://material.io/) 中, 但 Material-UI 会继续支持步进器。

## 横向步进器

### 线性的步骤条

您可以在 `activeStep` 属性中传入一个初始值为0的当前步骤值来控制 `步骤条`。 您也可以借助 `orientation` 属性来设置 `步骤条` 的方向。

这个例子把`optional` 属性放在第二个 `步骤` 的组件上，它展示了如何使用一个可选的步骤条。 请注意，您可以自行选择管理跳过一个可选的步骤。 一旦决定将一个特定步骤设置为可选的，您就必须配置这个属性 `completed={false}` 以表示即使激活的步骤索引超出了可选的步骤，步骤条并没有完成。

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js", "bg": true}}

### 线性步骤条 - 备选标签

您可以将标签放置在节点图标之下。请在 `Stepper` 组件中设置 `alternativeLabel` 这一属性。

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js", "bg": true}}

### 定制步进器

以下是自定义组件的一个示例。 您可以在[样式重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/steppers/CustomizedSteppers.js", "bg": true}}

### 非线性的步骤条

非线性步进器允许用户在任何点输入多步流程。

此示例类似于常规的水平步进器，但步骤不再基于` activeStep `属性自动设置` disabled = {true} `。

在这里使用 `StepButton` 演示了一个可单击的步进器标签，并且设置了 `completed` 标志。 但是，由于可以以非线性方式访问每个步骤，因此需要由您自己的实现来确定何时完成所有步骤（甚至是是否需要完成）。

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js", "bg": true}}

### 非线性步骤条 - 备选标签

您可以将标签放置在节点图标之下。请在 `Stepper` 组件中设置 `alternativeLabel` 这一属性。

{{"demo": "pages/components/steppers/HorizontalNonLinearAlternativeLabelStepper.js", "bg": true}}

### 非线性步骤条 - 错误步骤

{{"demo": "pages/components/steppers/HorizontalNonLinearStepperWithError.js", "bg": true}}

## 垂直步骤条

{{"demo": "pages/components/steppers/VerticalLinearStepper.js", "bg": true}}

## 移动设备上的步进器

该组件实现了适用于移动设备的紧凑型步进器。 有关其详情, 请参阅 [移动步骤](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps)。

### 文本

本质上，这是一个被正确定位的 back/next 按钮。 您必须自己实现文本描述，但是，下面提供了一个参考示例。

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### 文本与幻灯片效果

这个实例与之前的非常相似，不同之处在于使用[ react-swipeable-views ](https://github.com/oliviertassinari/react-swipeable-views)以进行步骤转换。

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### 点状

当步骤的数字不是特别明显时使用点状标记。

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### 进度条

当有许多步骤时，或者如果在此过程中需要插入步骤（基于对早期步骤的响应），请使用进度条。

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}