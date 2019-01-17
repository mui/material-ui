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
// MIN = 最小预期值
// MAX = 最大预期值
// 这是使数值标准化的一个函数（MIN 和 MAX 可以被整合）
const normalise = value => (value - MIN) * 100 / (MAX - MIN);
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## Customized Progress

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can customize the components. The last demo demonstrates how you can build a Facebook like spinner.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/progress/CustomizedProgress.js"}}

## Delaying appearance

There are [3 important limits](https://www.nngroup.com/articles/response-times-3-important-limits/) to know around response time. The ripple effect of the `ButtonBase` component ensures that the user feels that the system is reacting instantaneously. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second. After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"demo": "pages/demos/progress/DelayingAppearance.js"}}

## 局限性

Under heavy load, you might lose the stroke dash animation or see random CircularProgress ring widths. You should run processor intensive operations in a web worker or by batch in order not to block the main rendering thread.

![heavy load](/static/images/progress/heavy-load.gif)

When it's not possible, you can leverage the `disableShrink` property to mitigate the issue. See https://github.com/mui-org/material-ui/issues/10327

{{"demo": "pages/demos/progress/CircularUnderLoad.js"}}