---
title: React过渡动画组件
components: 折叠(Collapse), 淡入淡出(Fade), 增长(Grow), 滑动(Slide), 缩放(Zoom)
---
# 过渡(Transitions)

<p class="description">过渡动画使UI更富有表现力并且易于使用。</p>

Material-UI提供了一系列的过渡效果, 你可以将一些 [动作](https://material.io/design/motion/) 添加到你的应用的组件中.

为了更好地支持服务端渲染, Material-UI 为某些过渡组件 (Fade, Grow, Zoom, Slide) 的子级提供了 `style` 属性。 为了让动画如期实现, 必须将`style`属性应用到DOM上.

```jsx
// 'props'对象包含一个'style'属性.
// 你需要将这个属性提供给 "div" 元素, 如下所示。
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

## 折叠(Collapse)

从子元素的顶部垂直展开。 `collapsedHeight` 属性可用于设置未展开时的最小高度。

{{"demo": "pages/utils/transitions/SimpleCollapse.js"}}

## 淡入淡出(Fade)

从透明淡入至不透明。

{{"demo": "pages/utils/transitions/SimpleFade.js"}}

## 扩展(Grow)

从子元素的中心向外扩展, 同时从透明淡入至不透明。

第二个示例演示如何更改 `transform-origin`属性, 和有条件地使用 `timeout` 属性来更改元素进入的速度。

{{"demo": "pages/utils/transitions/SimpleGrow.js"}}

## 滑动(Slide)

从屏幕的边缘滑入。`direction` 属性控制了动画开始时，元素过渡的方向。

过渡(Transition)组件的 `mountOnEnter`属性保证了只有`in` 是`true`时，子组件才会被渲染。 只有。 这可以保证相对上定位好的组件不会从屏幕外面的位置滚动到视图中。 同样的， 在组件从屏幕中过渡完后，`unmountOnExit` 属性将次组件从DOM中移除。

{{"demo": "pages/utils/transitions/SimpleSlide.js"}}

## 放大

从子元素的中心向外扩展。

此示例还演示了如何延迟开始过渡。

{{"demo": "pages/utils/transitions/SimpleZoom.js"}}