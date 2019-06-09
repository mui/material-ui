---
title: CheckBox コンポーネント
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkbox

<p class="description">Checkboxコンポーネントにより、ユーザーの選択が一つ以上の項目から設定します。</p>

[CheckBox コンポーネント](https://material.io/design/components/selection-controls.html#checkboxes) を使用してオプションをオンまたはオフにすることができます。

リストに複数のオプションを持っている場合は、 Checkboxを使用して代わりのオン/オフスイッチのスペースを保存することができます。 選択肢が1つしかない場合は、チェックボックスを使用せずに代わりにオン/オフスイッチを使用します。

{{"demo": "pages/demos/checkboxes/Checkboxes.js"}}

`Checkbox`コンポーネントは` FormControlLabel<code>コンポーネントを説明のラベルとして使うことができます。</p>

<p>{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}</p>

<h2>FormGroupのCheckbox</h2>

<p><code>FormGroup` は、より簡単なAPIを提供する選択コントロールコンポーネントをグループ化するために使用される便利なラッパーです。

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## ラベルの配置

ラベルの配置は自由に変更できます。

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## アクセシビリティ

ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。

ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' } }
/>
```

## ガイド

- [Checkboxと Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)