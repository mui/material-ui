---
title: Transition React component
components: Collapse, Fade, Grow, Slide, Zoom
---

# Transitions

<p class="description">Transitionは、UIを表現力豊かで使いやすくするのに役立ちます。</p>

Material-UIは、いくつかの基本的な [モーション](https://material.io/design/motion/) をアプリケーションコンポーネントに導入するために使用できる多くのトランジションを提供します。

サーバーレンダリングをより適切にサポートするために、Material-UIはいくつかの遷移コンポーネント（フェード、成長、ズーム、スライド）の子に `スタイル` プロパティ を提供します。 アニメーションが期待どおりに機能するには、 `スタイル` プロパティをDOMに適用する必要があります。

```jsx
// The `props` object contains a `style` property.
// You need to provide it to the `div` element as shown here.
function MyComponent(props) {
  return (
    <div {...props}>
      Fade
    </div>
  );
}

export default Main() {
  return (
    <Fade>
      <MyComponent />
    </Fade>
  );
}
```

## Collapse

子要素の上部から垂直方向に展開します。 `collapsedHeight` プロパティを使用して、展開されていないときの最小の高さを設定できます。

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade

透明から不透明にフェードインします。

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow

子要素の中心から外側に拡張し、同時にフェードインします。 透明から不透明へ。

次の例では、 `transform-origin`を変更する方法を示し、条件付きで適用します。 `timeout` プロパティを使用して、進入速度を変更します。

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide

画面の端からスライドします。 `direction` プロパティは、画面のどの端からトランジションを開始するかを制御します。

The Transition component's `mountOnEnter` property prevents the child component from being mounted until `in` is `true`. これにより、相対的に配置されたコンポーネントが画面外の位置からビューにスクロールするのを防ぐことができます。 同様に、 `unmountOnExit` プロパティは、画面外に遷移した後、DOMからコンポーネント を削除します。

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom

子要素の中心から外側に展開します。

この例は、入力遷移を遅らせる方法も示しています。

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionComponent prop

The components accept a `TransitionComponent` prop to customize the default transitions. You can use any of the above components or your own. It should respect the following conditions:

- Accepts an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow to unmount the children when in a closed state and fully transitioned.