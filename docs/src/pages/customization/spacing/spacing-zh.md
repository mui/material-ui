# 间距 Spacing

<p class="description">使用 theme.spacing() 助手来打造 UI 元素之间的一致的间距。</p>

Material-UI 默认使用的是 [设计指南上建议的 8px 缩放系数](https://material.io/design/layout/understanding-layout.html)。

```js
const theme = createMuiTheme();

theme.spacing(2) // = 8 * 2
```

## 自定义间距

您可以通过提供以下内容来更改间距转换值：

- 一个数字

```js
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2) // = 4 * 2
```

- 一个函数

```js
const theme = createMuiTheme({
  spacing: factor => `${0.25 * factor}rem`, // （Bootstrap 的策略）
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

- 一个数组

```js
const theme = createMuiTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

theme.spacing(2); // = 8
```

## 多个参数

` theme.spacing() ` 最多接受 4 个参数。 你可以使用参数来减少样板的代码。

```diff
-padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`, // '8px 16px'
+padding: theme.spacing(1, 2), // '8px 16px'
```

它也支持混合字符串值：

```js
margin: theme.spacing(1, 'auto'), // '8px auto'
```