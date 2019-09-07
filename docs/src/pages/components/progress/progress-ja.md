---
title: Circular Progress, Linear Progress React component
components: CircularProgress, LinearProgress
---

# Progress

<p class="description">一般にスピナーと呼ばれる進行状況インジケータは、指定されていない待機時間を表したり、プロセスの長さを表示します。 アニメーションはJavaScriptではなくCSSで動作します。</p>

[進行状況インジケータ](https://material.io/design/components/progress-indicators.html) 、アプリの読み込み、フォームの送信、更新の保存など、進行中のプロセスのステータスについてユーザーに通知します。 アプリの状態を伝え、ユーザーが現在の画面から移動できるかどうかなど、利用可能なアクションを示します。

**Determinate** インジケータは、操作にかかる時間を表示します。

**Indeterminate**インジケータは、不特定の待機時間を視覚化します。

#### グループとしての進捗

一連のプロセスの進行状況を表示する場合、各アクティビティの進行状況ではなく、全体的な進行状況を示します。

## Circular

[Circular progress](https://material.io/design/components/progress-indicators.html#circular-progress-indicators) 、確定プロセスと不確定プロセスの両方をサポートします。

- **Determinate** 円形インジケーターは、インジケーターが0から360度に移動するときに、見えない円形のトラックを色で塗りつぶします。
- **Indeterminate** 円形インジケータは、不可視のトラックに沿って移動しながらサイズが拡大および縮小します。

### Circular Indeterminate

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Interactive Integration

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Circular Determinate

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Circular Static

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

## Linear

[Linear](https://material.io/design/components/progress-indicators.html#linear-progress-indicators) インジケーター。

### Linear Indeterminate

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Linear Determinate

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Linear Buffer

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Linear Query

{{"demo": "pages/components/progress/LinearQuery.js"}}

## Non-standard ranges

進捗コンポーネントは、0〜100の範囲の値を受け入れます。 これにより、これらがデフォルトの最小値/最大値であるスクリーンリーダーユーザーの作業が簡素化されます。 ただし、場合によっては、値がこの範囲外のデータソースを使用している場合があります。 範囲内の値を0〜100のスケールに簡単に変換する方法は次のとおりです。

```jsx
// MIN = Minimum expected value
// MAX = Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// Example component that utilizes the `normalise` function at the point of render.
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## カスタマイズされた進行状況バー

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/progress/CustomizedProgressBars.js"}}

## 外観の遅延

応答時間について知っておくべき重要な制限は [3つあります](https://www.nngroup.com/articles/response-times-3-important-limits/) 。 `ButtonBase` コンポーネントの波及効果により、ユーザーはシステムが瞬時に反応しているように感じます。 通常、0.1秒以上1.0秒未満の遅延の間、特別なフィードバックは必要ありません。 1.0秒後、ローダーを表示して、ユーザーの思考の流れが中断されないようにすることができます。

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## 制限

負荷が高いと、ストロークダッシュアニメーションが失われるか、ランダムなCircularProgressリング幅が表示される場合があります。 メインレンダリングスレッドをブロックしないように、プロセッサを集中的に使用する操作をWebワーカーで、またはバッチで実行する必要があります。

![heavy load](/static/images/progress/heavy-load.gif)

不可能な場合は、 `disableShrink` プロパティを活用して問題を軽減できます。 [この問題](https://github.com/mui-org/material-ui/issues/10327)参照してください。

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}