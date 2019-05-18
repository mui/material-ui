---
title: React Stepper（步骤条）组件
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---

# Steppers（步骤条）

<p class="description">步骤条通过编号的步骤来表示流程。它提供了类似向导的工作流程。</p>

[步骤条](https://material.io/archive/guidelines/components/steppers.html) 通过一系列逻辑和编号的步骤来显示当前操作的进度。 它们也可用于导航。 在保存一个步骤后，步骤条可能会显示短暂的反馈信息。

**步骤的类型**

- 可编辑的
- 不可编辑的
- 移动端支持的
- 可选的

**步骤条的类型**

- 水平的步骤条
- 垂直的步骤条
- 线性的步骤条
- 非线性的步骤条

> **请注意：** Material Design 文档中不再记录步骤条。

## 水平的线性步骤条

您可以在 `activeStep` 属性中传入一个初始值为0的当前步骤值来控制 `步骤条`。 您也可以借助 `orientation` 属性来设置 `步骤条</ code> 的方向。</p>

<p>这个例子把<code>optional` 属性放在第二个 `步骤` 的组件上，它展示了如何使用一个可选的步骤条。 请注意，您可以自行选择管理跳过一个可选的步骤。 一旦决定将一个特定步骤设置为可选的，您就必须配置这个属性 `completed={false}` 以表示即使激活的步骤索引超出了可选的步骤，步骤条并没有完成。

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js"}}

## 水平的非线性步进器

非线性步进器允许用户在任何点输入多步流程。

此示例类似于常规的水平步进器，但步骤不再基于` activeStep `属性自动设置` disabled = {true} `。

我们在这里使用` StepButton `来演示可点击的步骤标签以及设置` completed `。但是因为可以以非线性方式访问步骤，所以这取决于您自己的实现确定所有步骤何时完成（或者甚至是否需要完成）。

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js"}}

## 水平线性 - 可替换标签

通过在` Stepper `组件上设置` alternativeLabel `属性，可以将标签放置在步骤图标下方。

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

## 水平非线性 - 可替换标签

{{"demo": "pages/components/steppers/HorizontalNonLinearAlternativeLabelStepper.js"}}

## 水平非线性 - 错误步骤展示

{{"demo": "pages/components/steppers/HorizontalNonLinearStepperWithError.js"}}

## 垂直步进器

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

## 定制步进器

以下是自定义组件的一个示例。您可以在[重写文档页面](/customization/components/)中了解有关此内容的更多信息。

此组件使用自定义的 `StepConnector` 元素, 它根据 `active` 更改边框颜色, 并 ` completed ` 状态。

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

## 移动设备上的步进器

该组件实现了适用于移动设备的紧凑型步进器。 有关其详情, 请参阅 [移动步骤](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps)。

### 移动设备的步进器 - 文字

这本质上是被定位是一个后退/前进按钮。您必须自己实现文本描述，不过下面提供了一个示例供参考。

{{"demo": "pages/components/steppers/TextMobileStepper.js"}}

### 移动设备步进器 - 带轮播效果

这个实例与之前的非常相似，不同之处在于使用[ react-swipeable-views ](https://github.com/oliviertassinari/react-swipeable-views)以进行步骤转换。

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js"}}

### 移动设备的步进器 - 指示点

当步骤的数字不是特别明显时使用点状标记。

{{"demo": "pages/components/steppers/DotsMobileStepper.js"}}

### 移动设备步进器 - 进度条

当有许多步骤时，或者如果在此过程中需要插入步骤（基于对早期步骤的响应），请使用进度条。

{{"demo": "pages/components/steppers/ProgressMobileStepper.js"}}