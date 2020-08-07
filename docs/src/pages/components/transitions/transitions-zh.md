---
title: React 过渡动画组件
components: Collapse, Fade, Grow, Slide, Zoom
---

# Transitions 过渡动画

<p class="description">过渡动画使 UI 更富有表现力并且易于使用。</p>

Material-UI 提供了一系列的过渡效果，你可以将一些基本的[动作](https://material.io/design/motion/)添加到你的应用的组件中。

为了更好地支持服务端渲染，Material-UI 为某些过渡组件 (Fade, Grow, Zoom, Slide) 的子级提供了 `style` 属性。 为了让动画如期实现，您必须将 `style` 属性应用到DOM上。

```jsx
// `props` 对象包含一个 `style` 属性。
// 你需要将这个属性提供给 `div` 元素，如下所示。
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

从子元素的顶部垂直扩展开来。 使用 `collapsedHeight` 属性可以用于设置未扩展时的最小高度值。

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade 淡入淡出

从透明淡入至不透明。

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow 扩展

从子元素的中心向外扩展，同时从透明淡入至不透明。

第二个示例演示如何更改 `transform-origin` 属性，以及有条件地用 `timeout` 属性来改变元素进入的速度。

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide 滑动

从屏幕边缘滑入。 使用 `direction` 属性能够控制从屏幕的哪一个边缘开始过渡。

过渡组件的 `mountOnEnter` 属性，保证了只有 `in` 是`true`时，子组件才会被渲染。 这可以保证相对上定位好的组件不会从屏幕外面的位置滚动到视图中。 同样的， 在组件从屏幕中过渡完后，`unmountOnExit` 属性将次组件从 DOM 中移除。

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom 放大

从子元素的中心向外扩展。

此示例还演示了如何延迟过渡的开始。

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionComponent 属性

这些组件接收 `TransitionComponent` 属性来自定义默认的过渡动画。 您可以使用上述的任何组件或者是您自己的组件。 它应遵守以下条件：

- 接受一个 `in` 属性。 这对应于打开/关闭的状态。
- 当进入过渡时调用 `onEnter` 回调属性。
- 当退出过渡完成后应该调用 `onExited` 回调属性。 这两个回调属性保证了当在一个关闭的状态并展示完过渡动画时，才会移除子内容。

欲了解更多关于创建自定义过渡的信息，请访问 [React Transition Group Transition docs](http://reactcommunity.org/react-transition-group/transition)。