---
title: Reactコンポーネントの切り替え
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switch

<p class="description">スイッチは、単一の設定の状態をオンまたはオフに切り替えます。</p>

[スイッチ](https://material.io/design/components/selection-controls.html#switches) は、モバイルの設定を調整するための好ましい方法です。 The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label.

{{"demo": "pages/components/switches/Switches.js"}}

## FormControlLabelを使用したスイッチ

`Switch` コンポーネントは `FormControlLabel`コンポーネントを説明のラベルとして使うことができます。

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## FormGroupを使用したスイッチ

`FormGroup` は、より簡単なAPIを提供する選択コントロールコンポーネントをグループ化するために使用される便利なラッパーです。 However, we encourage you to use a [Checkbox](/components/checkboxes/) instead.

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## カスタマイズされたスイッチ （Customized switches）

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## サイズ

小型のスイッチが好きですか？ `size`プロパティを使用します。

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## ラベルの配置

ラベルの配置は自由に変更できます。

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## When to use

- [Checkboxと スイッチ](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## アクセシビリティ

- It will render an element with the `checkbox` role not `switch` role since this role isn't widely supported yet. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with `<Switch inputProps={{ role: 'switch' }}>`
- ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。
- ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```