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
- Mobile
- 可选的

**步进器类型**

- 水平的
- 垂直的
- 线状
- 非线性的

> **注意：材料设计文档中不再记录** 步进器。

## 水平的步进器

可以通过更改一个初始值为0的当前步骤值`activeStep`来控制`Stepper` 使用`orientation`属性设置` Stepper </ code>方向。</p>

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

如果您有阅读[重写样式文档页面](/customization/overrides/) 但你还不是很自信能够完全掌握， 以下是如何更改一个消息条(Stepperr)的主要颜色的示例

此组件使用自定义的 `StepConnector` 元素, 它根据 `active` 更改边框颜色, 并 ` completed ` 状态。

⚠️虽然材料设计规范鼓励主题，但这些例子是不合适的。

{{"demo": "pages/demos/steppers/CustomizedStepper.js"}}

## 移动设备上的步进器

该组件实现了适用于移动设备的紧凑型步进器。 有关其详情, 请参阅 [移动步骤](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps)。

### 移动设备的步进器 - 文字

这本质上是被定位是一个后退/前进按钮。您必须自己实现文本描述，不过下面提供了一个示例供参考。

{{"demo": "pages/demos/steppers/TextMobileStepper.js"}}

### 移动设备步进器 - 带轮播效果

这个实例与之前的非常相似，不同之处在于使用[ react-swipeable-views ](https://github.com/oliviertassinari/react-swipeable-views)以进行步骤转换。

{{"demo": "pages/demos/steppers/SwipeableTextMobileStepper.js"}}

### 移动设备的步进器 - 指示点

当步骤的数字不是特别明显时使用点状标记。

{{"demo": "pages/demos/steppers/DotsMobileStepper.js"}}

### 移动设备步进器 - 进度条

当有许多步骤时，或者如果在此过程中需要插入步骤（基于对早期步骤的响应），请使用进度条。

{{"demo": "pages/demos/steppers/ProgressMobileStepper.js"}}