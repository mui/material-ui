---
title: React 进度环和进度条组件
components: CircularProgress, LinearProgress
---

# Progress 进度条组件

<p class="description">Progress indicators（进度指示器）也称为微调器 (spinners) ，它表示了一个不明确的等待时间，或者显示处理过程的时间长短。 动画效果通过 CSS 实现，而不是 JavaScript。</p>

[进度指示器](https://material.io/design/components/progress-indicators.html)能够将当前处理过程的状态通知用户，例如加载一个应用，提交一个表单或保存一些更新。 它们与应用程序状态进行通信并指示可用的操作，例如用户是否可从当前页面离开。

- **定量**指示器显示一个操作消耗多长时间。
- **不定量**指示器可视化了一个不确定的操作等待时间。

在显示一系列过程的进度时，与其显示每个单独活动的进度，进度条指示器会展示整体的过程。

## 环状进度条

### 不定量的环形进度条

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### 定量的环形进度条

{{"demo": "pages/components/progress/CircularStatic.js"}}

### 交互集成

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### 带标签的环状进度条

{{"demo": "pages/components/progress/CircularWithValueLabel.js"}}

## 线性进度条

### 不定量的线性进度条

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### 定量的线性进度条

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### 线性缓冲条

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### 带标签的线性进度条

{{"demo": "pages/components/progress/LinearWithValueLabel.js"}}

## 非标准区间

进度条组件采用一个在 0 — 100 区间内的值。 作为默认的最小/最大值，屏幕阅读用户能够更便利地阅读。 但是有时，您可能会使用超出这个范围的数据源的一些值。 通过这个例子，您可以轻松地将一个任意区间的值转换为 0 — 100 区间的值：

```jsx
// MIN = 最小值
// MAX = 最大值
// 正常化值的函数（MIN / MAX 可相互协调）
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// 示例组件展示了在 render 函数中，利用`normalise`这个函数
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## 定制的进度条

你可以参考以下一些例子来自定义组件。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/progress/CustomizedProgressBars.js", "defaultCodeOpen": false}}

## 延时的出现

关于响应时间，有 [3个重要限制](https://www.nngroup.com/articles/response-times-3-important-limits/)。 `ButtonBase` 组件的波纹效果确保用户感受到系统是实时反馈的。 通常情况下，在多余0.1秒且小于1.0秒期间不需要特殊的反馈。 在1.0秒后，你可以显示一个加载器来保持用户的思考流程不被打断。

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## 局限性

在特别慢的加载时，可能丢失路径描边动画（stroke dash animation）或看到随机的环状进度条（CircularProgress）的环宽。 为了不阻碍主渲染进程，您应该在 web worker 中或批处理中运行密集操作的处理器。

![高负载](/static/images/progress/heavy-load.gif)

当这个方法不可行的时候，您可以利用 `disableShrink` 属性来缓解这个问题。 请查看 [这个问题](https://github.com/mui-org/material-ui/issues/10327)。

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}