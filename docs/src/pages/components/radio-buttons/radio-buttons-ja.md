---
title: Radio buttons コンポーネント
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio

<p class="description">ラジオボタンを使用すると、ユーザーはセットから1つのオプションを選択できます。</p>

ユーザーが利用可能なすべてのオプションを確認する必要がある場合は、 [ラジオボタン](https://material.io/design/components/selection-controls.html#radio-buttons) 使用します。 使用可能なオプションを折りたたむことができる場合は、使用するスペースが少なくて済むため、ドロップダウンメニューを使用することを検討してください。

ラジオボタンは、デフォルトで最も一般的に使用されるオプションで設定されています。

`RadioGroup` は、 `Radio` コンポーネントをグループ化するのに使用される便利なラッパーで、より簡単なAPIと、グループへの適切なキーボードアクセシビリティを提供します。

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## スタンドアロンラジオボタン

`Radio` は、ラッパーなしでスタンドアロンでも使用できます。

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## ラベルの配置

ラベルの配置は自由に変更できます。

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## カスタマイズされたラジオ

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## When to use

- [Checkboxと Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- ラジオボタン、チェックボックス、スイッチなどのすべてのフォームコントロールにラベルを付ける必要があります。 ほとんどの場合、 `<label>` 要素（[FormControlLabel](/api/form-control-label/)）を使用して行われます。
- ラベルを使用できない場合は、入力コンポーネントに直接属性を追加する必要があります。 この場合、追加の属性（例： `aria-label`, `aria-labelledby`, `title`)を経由して `inputProps` プロパティを追加します。

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```