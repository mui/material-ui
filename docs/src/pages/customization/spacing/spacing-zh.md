# 间距

<p class="description">Use the theme.spacing() helper to create consistent spacing between the elements of your UI.</p>

Material-UI默认使用[8px的缩放系数](https://material.io/design/layout/understanding-layout.html) 。

```js
const styles = theme => ({
  root: {
    // JSS使用px作为此CSS属性的默认单位。
    padding: theme.spacing(2), // = 8 * 2
  },
});
```

您可以通过提供以下内容来更改间距转换值：

- 一个数字

```js
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2) // = 4 * 2
```

- a function

```js
const theme = createMuiTheme({
  spacing: factor => `${0.25 * factor}rem`, // (Bootstrap strategy)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

- an array

```js
const theme = createMuiTheme({
  spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

theme.spacing(2); // = 8
```

## 多个参数

` theme.spacing() ` 最多接受4个参数。 您可以使用参数来减少样板：

```diff
<br />-  padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
+  padding: theme.spacing(1, 2), // '8px 16px'
```