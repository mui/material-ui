# 过渡动画

<p class="description">主题键使您能够自定义使用跨 Material-UI 组件的各种过渡动画的持续时间和缓动效果，并且它也提供了一个用于创建自定义过渡动画的工具集。</p>

## API

### `theme.transitions.create(props, options) => transition
`

#### 参数

1. `props` (_String_ | _String[]_): Defaults to `['all']`. Provides a CSS property, or a list of CSS properties that should be transitioned.
2. `options` (*Object* [optional]):

- `options.duration` (_String_ | _Number_ [optional]): Defaults to `theme.transitions.duration.standard`. Provides the duration of the transition.
- `options.easing` (_String_ [optional]): Defaults to `theme.transitions.easing.easeInOut`. Provides the easing for the transition.
- `options.delay` (_String_ | _Number_ [optional]): Defaults to `0`. Provides the delay for the transition.

#### 返回结果

`transition`: A CSS transition value, which composes all CSS properties that should be transitioned, together with the defined duration, easing and duration.

使用 <code>theme.transitions.create()</code> 助手来为你的 UI 元素创建一致的过渡动画。</p>

```js
theme.transitions.create(['background-color', 'transform']);
```

#### 示例

{{"demo": "pages/customization/transitions/TransitionHover.js", "defaultCodeOpen": false}}

### `theme.transitions.getAutoHeightDuration(height) => duration`

#### 参数

1. `height` (_Number_): The height of the component.

#### 返回结果

`duration`: The calculated duration based on the height.

## 时长

你可以更改其中部分或全部的时长，或者提供你想要的时长（供 `create()` 助手使用）。 此示例显示了所有默认值（以毫秒为单位），但你只需要提供你想要更改或添加的键。

```js
const theme = createMuiTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // 最基本的建议时间
      standard: 300,
      // 这将用于复杂的动画中
      complex: 375,
      // 当有东西转进屏幕时建议使用
      enteringScreen: 225,
      // 当有东西转出屏幕时建议使用
      leavingScreen: 195,
    },
  },
});
```

## Easings

You can change some or all of the easing values, or provide your own, by providing a custom CSS <code>transition-timing-function</code> value.

```js
const theme = createMuiTheme({
  transitions: {
    easing: {
      // 这是最常见的缓和曲线（easing curve）。
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // 物体以全速从屏幕外进入屏幕，并在屏幕上以全速前进。
      // 缓慢减速至静止点。
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});
```

## 参考

请查看 [过渡](/components/transitions/) 页面来了解 Material-UI 中所包含的过渡组件。
