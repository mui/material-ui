---
title: React Transition（过渡动画）组件
components: Collapse, Fade, Grow, Slide, Zoom
---

# Transitions（过渡动画）

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

## Collapse（折叠）

Expand vertically from the top of the child element. The `collapsedHeight` property can be used to set the minimum height when not expanded.

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade（淡入淡出）

从透明淡入至不透明。

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow（扩展）

从子元素的中心向外扩展，同时从透明淡入至不透明。

第二个示例演示如何更改 `transform-origin` 属性，以及有条件地用 `timeout` 属性来改变元素进入的速度。

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide（滑动）

Slide in from the edge of the screen. The `direction` property controls which edge of the screen the transition starts from.

The Transition component's `mountOnEnter` property prevents the child component from being mounted until `in` is `true`. 这可以保证相对上定位好的组件不会从屏幕外面的位置滚动到视图中。 同样的， 在组件从屏幕中过渡完后，`unmountOnExit` 属性将次组件从 DOM 中移除。

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

## Zoom（放大）

从子元素的中心向外扩展。

此示例还演示了如何延迟过渡的开始。

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## TransitionComponent prop

The components accept a `TransitionComponent` prop to customize the default transitions. You can use any of the above components or your own. It should respect the following conditions:

- Accepts an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow to unmount the children when in a closed state and fully transitioned.