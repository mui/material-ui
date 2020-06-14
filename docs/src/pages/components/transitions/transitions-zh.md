---
title: React Transition 过渡动画组件
components: Collapse, Fade, Grow, Slide, Zoom
---

# Transitions 过渡动画

<p class="description">过渡动画使 UI 更富有表现力并且易于使用。</p>

Material-UI提供了一系列的过渡效果, 你可以将一些基本的 [动作](https://material.io/design/motion/) 添加到你的应用的组件中.

为了更好地支持服务端渲染, Material-UI 为某些过渡组件 (Fade, Grow, Zoom, Slide) 的子级提供了 `style` 属性。 为了让动画如期实现, 必须将 `style` 属性应用到DOM上.

```jsx
// 'props'对象包含一个'style'属性。
// 你需要将这个属性提供给 "div" 元素，如下所示。
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

## Collapse 折叠

从子元素顶部垂直扩展。 `collapsedHeight` 属性可以用于设置未扩展时的最小高度值。

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade 淡入淡出

从透明淡入至不透明。

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow 扩展

从子元素的中心向外扩展，同时从透明淡入至不透明。

第二个示例演示如何更改 `transform-origin` 属性，以及有条件地用 `timeout` 属性来改变元素进入的速度。

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide 滑动

从屏幕边缘滑入。 `direction` 属性控制从屏幕的哪一个边缘开始。

过渡组件的 `mountOnEnter` 属性使子组件无法被挂载，直到 `in` 为 `true`。 这可以保证相对上定位好的组件不会从屏幕外面的位置滚动到视图中。 同样的， 在组件从屏幕中过渡完后，`unmountOnExit` 属性将次组件从 DOM 中移除。

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom 放大

从子元素的中心向外扩展。

此示例还演示了如何延迟过渡的开始。

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionComponent prop

这些组件接收 `TransitionComponent` prop 以自定义默认的过渡。 您可以使用上述的任何组件或者是您自己的组件。 它应遵守以下条件：

- 在 prop 中应该有一个 `in` 属性。 这对应于 打开/关闭 状态。
- 当进入过渡时调用 `onEnter` 回调属性。
- 当退出过渡完成后应该调用 `onExited` 回调属性。 这两个回调允许在关闭并完全过渡 (when closed and fully transitioned) 时卸载子内容。

欲了解更多关于创建自定义过渡的信息，请访问 [React Transition Group Transition docs](http://reactcommunity.org/react-transition-group/transition)。