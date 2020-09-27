# Spacing(間隔)

<p class="description">簡単に要素のmarginとpaddingをレスポンシブに変更するためのユーティリティクラスです。</p>

## 表記

スペースユーティリティは、簡易マージンとパディングプロップをマージンとパディングのCSS宣言に変換します。 プロップには、`{property}{sides}`という形式で名前が付けられます。 プロップには、`{property}{sides}`という形式で名前が付けられます。

*property*は次のいずれかであり

- `m` - *margin*を設定するためのclass
- `p` - *padding*を設定するためのclass

*sides* は次のいずれかである。

- `t` - *margin-top*もしくは *padding-top*を設定するためのclass
- `t` - *margin-bottom*もしくは *padding-bottom*を設定するためのclass
- `t` - *margin-left*もしくは *padding-left*を設定するためのclass
- `t` - *margin-right*もしくは *padding-right*を設定するためのclass
- `x` - 水平方向（**-left* および **-right*）を設定するためのclass
- `y` - 垂直方向( **-top* および **-bottom*) を設定するためのclass
- (指定なし) - HTML要素の四方向のmarginもしくはpaddingを設定するためのクラス

## 変形

入力内容とTheme (テーマ) 設定によって、以下の様に間隔の変更ができます。

- 入力: `number` & テーマ: `number`: テーマに設定された間隔を入力された数字倍に変形します。.

```jsx
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

- 入力: `number` & テーマ: `配列`: テーマに設定された値を配列としてインデックスから参照できます。

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

- 入力: `number` & テーマ: `関数`: 入力された値が関数に渡され、結果をプロパティとして利用します。

```jsx
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```

- 入力: `string`: 入力された値はそのまま生のCSSの値として適用されます。

```jsx
<Box m="2rem" /> // margin: 2rem;
<Box mx="auto" /> // margin-left: auto; margin-right: auto;
```

## 例

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

## 水平方向に中央寄せする

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box mx="auto">…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| Import name | Prop | CSS property                    | Theme key                                                        |
|:----------- |:---- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`   | `m`  | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mt` | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mr` | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mb` | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `ml` | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `mx` | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `p`  | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pt` | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pr` | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pb` | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `pl` | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `px` | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`   | `py` | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |


*もしPropsの略称が難しいと感じた場合、正称を使用することもできます。*

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```

```diff
-<Box px={2} />
+<Box paddingX={2} />
```