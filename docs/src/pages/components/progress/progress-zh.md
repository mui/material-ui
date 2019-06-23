---
title: React Circular Progress（环形进度条）、Linear Progress（线形进度条）组件
components: CircularProgress, LinearProgress
---

# Progress（进度条）

<p class="description">Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process. The animation works with CSS, not JavaScript.</p>

[进度指示器](https://material.io/design/components/progress-indicators.html)能够将当前处理过程的状态通知用户，例如加载一个应用，提交一个表单或保存一些更新。 它们与应用程序状态进行通信并指示可用的操作，例如用户是否可从当前页面离开。

**定量**指示器显示一个操作消耗多长时间。

**不定量**指示器可视化了一个不确定的操作等待时间。

#### 一组进度条

在显示一系列过程的进度时，与其显示每个单独活动的进度，进度条指示器会展示整体的过程。

## 环状进度条

[Circular progress（环状进度条）](https://material.io/design/components/progress-indicators.html#circular-progress-indicators)同时支持了确定的和不确定的过程。

- **定量**环形指示器填充了不可见区域，指示器从0到360度推进，并用颜色来进行环形追踪。
- **不定量**环形指示器在沿着隐形的轨道移动时，随之变大变小。

### 不定量的环形进度条

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### 交互集成

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### 定量的环形进度条

{{"demo": "pages/components/progress/CircularDeterminate.js"}}

### 静态的环形进度条

{{"demo": "pages/components/progress/CircularStatic.js"}}

## 线性进度条

[线性进度条](https://material.io/design/components/progress-indicators.html#linear-progress-indicators)指示器.

### 不定量的线性进度条

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### 定量的线性进度条

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### 线性缓冲条

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### 线性查询

{{"demo": "pages/components/progress/LinearQuery.js"}}

## 非标准区间

进度条组件采用一个在0—100区间内的值。 作为默认的最小/最大值，屏幕阅读用户能够更便利地阅读。 但是有时，您可能会使用一些值超出这个范围的数据源。 通过这个例子，您可以轻松地将一个任意区间的值转换为0—100区间的值：

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

## 自定义进度条

以下是自定义组件的一些示例。您可以在[重写文档页面](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/progress/CustomizedProgressBars.js"}}

## 延时的出现

关于的响应时间，您需要知道这[3个重要的限制](https://www.nngroup.com/articles/response-times-3-important-limits/)。 `ButtonBase`组件的波纹效果，能够保证用户体验到实时反馈的系统。 通常情况下，在大于0.1秒且小于1.0秒间的延时不需要给与特殊的反馈。 但是在1.0秒后，您可以显示一个加载器来保证用户的思考流程不被打断。

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## 局限性

在加载的特别慢时，您可能丢失stroke dash的动画或看到环形进度会有一些半径随机的情况。 为了不阻碍主渲染进程，您应该在web worker中或批处理中运行密集操作的处理器。

![高负载](/static/images/progress/heavy-load.gif)

若这样不可行，您还可以借助 `disableShrink` 属性来缓解这个问题。详情请见[这个问题](https://github.com/mui-org/material-ui/issues/10327)。

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}