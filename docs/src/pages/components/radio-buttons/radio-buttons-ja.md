---
title: Radio buttons コンポーネント
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio

<p class="description">ラジオボタンを使用すると、ユーザーはセットから1つのオプションを選択できます。</p>

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

ラジオボタンは、デフォルトで最も一般的に使用されるオプションで設定されています。

## RadioGroup

`RadioGroup` は、 `Radio` コンポーネントをグループ化するのに使用される便利なラッパーで、より簡単なAPIと、グループへの適切なキーボードアクセシビリティを提供します。

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

To lay out the buttons horizontally, set the `row` prop: `<RadioGroup row />`.

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## ラベルの配置

You can change the placement of the label with the `FormControlLabel` component's `labelPlacement` prop:

{{"demo": "pages/components/radio-buttons/FormControlLabelPlacement.js"}}

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

{{"demo": "pages/components/radio-buttons/ErrorRadios.js"}}

## カスタマイズされたラジオ

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## When to use

- [Checkboxと Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。 ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。
- ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```