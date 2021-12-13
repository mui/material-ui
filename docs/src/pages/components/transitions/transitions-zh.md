---
title: React Transition（过渡动画）组件
components: Collapse, Fade, Grow, Slide, Zoom
githubLabel: 'component: Transition'
---

# Transitions

<p class="description">过渡动画有利于增强 UI 的表现力并且让人更易于使用。</p>

MUI provides transitions that can be used to introduce some basic [motion](https://material.io/design/motion/) to your applications.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Collapse 折叠

Expand from the start edge of the child element. Use the `orientation` prop if you need a horizontal collapse. The `collapsedSize` prop can be used to set the minimum width/height when not expanded.

{{"demo": "pages/components/transitions/SimpleCollapse.js", "bg": true}}

## Fade 淡入淡出

从透明淡入至不透明。

{{"demo": "pages/components/transitions/SimpleFade.js", "bg": true}}

## Grow 扩展

Expands outwards from the center of the child element, while also fading in from transparent to opaque.

The second example demonstrates how to change the `transform-origin`, and conditionally applies the `timeout` prop to change the entry speed.

{{"demo": "pages/components/transitions/SimpleGrow.js", "bg": true}}

## Slide 滑动

从屏幕边缘滑入。 The `direction` prop controls which edge of the screen the transition starts from.

The Transition component's `mountOnEnter` prop prevents the child component from being mounted until `in` is `true`. This prevents the relatively positioned component from scrolling into view from its off-screen position. Similarly, the `unmountOnExit` prop removes the component from the DOM after it has been transition off-screen.

{{"demo": "pages/components/transitions/SimpleSlide.js", "bg": true}}

### Slide relative to a container

The Slide component also accepts `container` prop, which is a reference to a DOM node. If this prop is set, the Slide component will slide from the edge of that DOM node.

{{"demo": "pages/components/transitions/SlideFromContainer.js"}}

## Zoom 放大

从子元素的中心向外扩展。

此示例还演示了如何延迟过渡的开始。

{{"demo": "pages/components/transitions/SimpleZoom.js", "bg": true}}

## Child requirement

- **Forward the style**: To better support server rendering, MUI provides a `style` prop to the children of some transition components (Fade, Grow, Zoom, Slide). The `style` prop must be applied to the DOM for the animation to work as expected.
- **Forward the ref**: The transition components require the first child element to forward its ref to the DOM node. For more details about ref, check out [Caveat with refs](/guides/composition/#caveat-with-refs)
- **Single element**: The transition components require only one child element (`React.Fragment` is not allowed).

```jsx
// 'props' 对象包含一个 'style' 属性。
// 你需要将这个属性提供给 `div` 元素，如下所示。
const MyComponent = React.forwardRef((props, ref) {
  return (
    <div ref={ref} {...props}>
      Fade
    </div>
  );
})

export default Main() {
  return (
    <Fade>
      {/* MyComponent must the only child */}
      <MyComponent />
    </Fade>
  );
}
```

## TransitionGroup

To animate a component when it is mounted or unmounted, you can use the [`TransitionGroup`](http://reactcommunity.org/react-transition-group/transition-group/) component from _react-transition-group_. As components are added or removed, the `in` prop is toggled automatically by `TransitionGroup`.

{{"demo": "pages/components/transitions/TransitionGroupExample.js"}}

## TransitionComponent 属性

Some MUI components use these transitions internally. These accept a `TransitionComponent` prop to customize the default transition. 您可以使用上述的任何组件或者是您自己的组件。 它应遵守以下条件：

- 接受一个 `in` 属性。 This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. 这两个回调属性保证了当在一个关闭的状态并展示完过渡动画时，才会移除子内容。

For more information on creating a custom transition, visit the _react-transition-group_ [`Transition` documentation](http://reactcommunity.org/react-transition-group/transition/). You can also visit the dedicated sections of some of the components:

- [Modal](/components/modal/#transitions)
- [Dialog](/components/dialogs/#transitions)
- [Popper](/components/popper/#transitions)
- [Snackbar](/components/snackbars/#transitions)
- [Tooltip](/components/tooltips/#transitions)
