---
title: React 环形、线装进度组件
components: CircularProgress, LinearProgress
---
# 进度

<p class="description">进度指示器用以表示一个不确定的等待时间或显示一个处理过程的时间长短。</p>

[进度指示器](https://material.io/design/components/progress-indicators.html) 通知用户当前处理过程的状态，例如加载一个应用，提交一个表单或保存一些更新。 它们与应用程序状态进行通信并指示可用的操作，例如用户是否可从当前页面离开。

**确定的** 指示器显示一个操作消耗多长时间。

**未确定**指示器可视化一个不确定的操作等待时间。

#### 进度指示器组

当显示一系列过程的进度时，表示全部的过程而不是每个单独活动的进度。

## 环形

[圆形进度指示器](https://material.io/design/components/progress-indicators.html#circular-progress-indicators)支持确定过程和不确定过程。

- **确定的** 环形指示器填充不可见区域，以颜色环形追踪，作为指示器从0至360度移动。
- **不确定** 环形指示器在沿着不可见轨道移动时，随之变大变小。

### 不确定环形

{{"demo": "pages/demos/progress/CircularIndeterminate.js"}}

### 交互集成

{{"demo": "pages/demos/progress/CircularIntegration.js"}}

### 确定环形

{{"demo": "pages/demos/progress/CircularDeterminate.js"}}

### 静态环形

{{"demo": "pages/demos/progress/CircularStatic.js"}}

## 线状

[线状进度](https://material.io/design/components/progress-indicators.html#linear-progress-indicators) 指示器.

### 不确定线状

{{"demo": "pages/demos/progress/LinearIndeterminate.js"}}

### 确定线状

{{"demo": "pages/demos/progress/LinearDeterminate.js"}}

### 缓冲线状

{{"demo": "pages/demos/progress/LinearBuffer.js"}}

### 查询线状

{{"demo": "pages/demos/progress/LinearQuery.js"}}

## 非标准范围

进度组件接受一个 0 - 100 范围的值。 作为默认的最小/最大值，这简化了屏幕阅读用户的使用。 但是有时，你可能会使用值超出这个范围的数据源。 这里告诉您如何轻松的将一个任意范围的值转换为0 - 100区间的值。

```jsx
// MIN = 最小值
// MAX = 最大值
// 正常化值的函数（MIN / MAX 可相互协调）
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// 在 render 函数中，利用`正常化`函数的示例组件
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## 自定义进度

如果您一直在阅读 [覆盖文档页面](/customization/overrides/) 但是您没有信心进入， 这里是一个如何自定义组件的示例。 最后一个演示将给你示范如何构建类似 Facebook 的 spinner。

⚠️虽然材料设计规范鼓励主题，但这些例子是不合适的。

{{"demo": "pages/demos/progress/CustomizedProgress.js"}}

## 延迟展现

关于响应时间，有 [3个重要限制](https://www.nngroup.com/articles/response-times-3-important-limits/)。 `ButtonBase`组件的波纹效果确保用户感受到系统是实时反馈的。 通常情况下，在多余0.1秒且小于1.0秒期间不需要特殊的反馈。 在1.0秒后，你可以显示一个加载器来保持用户的思考流程不被打断。

{{"demo": "pages/demos/progress/DelayingAppearance.js"}}

## 局限性

在特别慢的加载时，可能丢失stroke dash动画或看到环形进度的半径随机的情况。 为了不阻塞主渲染进程，应该在web worker中或批处理中执行密集操作的处理器。

![慢加载](/static/images/progress/heavy-load.gif)

当不能这样做的时候，你可以借助 `disableShrink` 特性来减轻这个问题。 见 https://github.com/mui-org/material-ui/issues/10327

{{"demo": "pages/demos/progress/CircularUnderLoad.js"}}