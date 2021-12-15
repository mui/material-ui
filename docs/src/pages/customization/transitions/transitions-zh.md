# Transitions

<p class="description">The theme key enables you to customize the durations and easings of the various transitions used across MUI components, and offers a utility for creating custom transitions.</p>

## API

### `theme.transitions.create(props, options) => transition
`

#### Arguments

1. `props` (_string_ | _string[]_): Defaults to `['all']`. 这将提供一个 CSS 属性，或者提供一个应该具有动画效果的 CSS 属性列表。
2. `options` (_object_ [optional]):

- `options.duration` (_string_ | _number_ [optional]): Defaults to `theme.transitions.duration.standard`. 这将提供动画效果的时长。
- `options.easing` (_string_ [optional])：默认为 `theme.transitions.easing.easeInOut`。 这将为动画提供缓动效果。
- `options.delay` (_string_ | _number_ [optional]): Defaults to `0`. 这将为动画提供延迟效果。

#### Returns

`transition`：CSS 的过渡动画（transition ）值，它包含了所有需要应用其过渡动画的 CSS 属性，也包含了所定义的持续时间、缓动效果和作用延迟。

使用 <code>theme.transitions.create()</code> 助手来为你的 UI 元素创建一致的过渡动画。</p>

```js
theme.transitions.create(['background-color', 'transform']);
```

#### Example

{{"demo": "pages/customization/transitions/TransitionHover.js", "defaultCodeOpen": false}}

### `theme.transitions.getAutoHeightDuration(height) => duration`

#### Arguments

1. `height` (_number_): The height of the component.

#### Returns

`duration`：基于高度计算出来的时长。

## 时长

你可以更改其中部分或全部的时长，或者提供你想要的时长（供 `create()` 助手使用）。 此示例显示了所有默认值（以毫秒为单位），但你只需要提供你想要更改或添加的键。

```js
const theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
});
```

## 缓动

你可以通过提供一个自定义的 CSS <code>transition-timing-function</code> 值来改变部分或全部的缓动值，或者提供你自己的缓动值。

```js
const theme = createTheme({
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // 物体以全速从屏幕外进入屏幕，并在屏幕上以全速前进。
      // 缓慢减速至静止点。
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // 物体以全速离开屏幕。 它们在屏幕外不会减速。
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // 锐化曲线是由可能随时返回屏幕的对象使用的。
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});
```

## 参考

Check out the [Transitions](/components/transitions/) page to explore the transition components that are included with MUI.
