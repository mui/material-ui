---
title: Text Field コンポーネント
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Fields

<p class="description">Text fieldを使用すると、ユーザーはテキストを入力および編集できます。</p>

[Text field](https://material.io/design/components/text-fields.html) 、ユーザーはUIにテキストを入力できます。それらは通常フォームやダイアログに現れます。

## TextField

`TextField` ラッパーコンポーネントは、ラベル、入力、およびヘルプテキストを含む完全なフォームコントロールです。

{{"demo": "pages/components/text-fields/TextFields.js"}}

> **注：** このバージョンのテキストフィールドは、Material Designのドキュメントには記載されていません。

## Outlined

`TextField` はアウトラインスタイルをサポートします。

{{"demo": "pages/components/text-fields/OutlinedTextFields.js"}}

## Filled

`TextField` はアウトラインスタイルをサポートします。

{{"demo": "pages/components/text-fields/FilledTextFields.js"}}

## コンポーネント

`TextField ` は小さなコンポーネントから構成されています。（ [`FormControl`](/api/form-control/)、 [`Input`](/api/input/)、 [`FilledInput`](/api/filled-input/)、 [`InputLabel`](/api/input-label/)、 [`OutlinedInput`](/api/outlined-input/)、 や [`FormHelperText`](/api/form-helper-text/)など ）また、フォーム入力を大幅にカスタマイズするために直接活用できます。

いくつかのネイティブHTML入力プロパティが `TextField` コンポーネントにないことに気づいたかもしれません。 これは故意です。 コンポーネントは最も使用されているプロパティの面倒を見ます、そしてそれは以下のデモで示される基本的なコンポーネントを使うことはユーザー次第です。 それでも、あなたは使用することができます `inputProps` （及び `InputProps`、 `InputLabelProps` あなたには、いくつかの決まり文句を避けたい場合はプロパティ）。

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Customized inputs

コンポーネントのカスタマイズ例をいくつか示します。あなたはこれについてもっと詳しく知ることができます [オーバライドドキュメントのページ](/customization/components/)。

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

カスタマイズはCSSにとどまりません。コンポジションを使用してカスタムコンポーネントを作成し、アプリに独特の雰囲気を与えることができます。 以下は、Googleマップに触発された [`InputBase`](/api/input-base/) コンポーネントを使用した例です。

{{"demo": "pages/components/text-fields/CustomizedInputBase.js"}}

## Input Adornments

`Input` は `InputAdornment `提供を許可します。 これらは、入力に接頭辞、接尾辞、またはアクションを追加するために使用できます。 たとえば、アイコンボタンを使用してパスワードを表示または非表示にすることができます。

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

### アイコン付き

アイコンは、先頭または末尾として指定できます。

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Filled Input Adornments

{{"demo": "pages/components/text-fields/FilledInputAdornments.js"}}

### Outlined Input Adornments

{{"demo": "pages/components/text-fields/OutlinedInputAdornments.js"}}

## レイアウト

` TextField `、` FormControl `を使用すると、` margin `を指定して入力の縦方向の間隔を変更できます。 `none`（デフォルト）を使用すると`FormControl`に余白は適用されませんが、 `dense`と `normal`は他のスタイルを仕様に合わせて変更します。

{{"demo": "pages/components/text-fields/TextFieldMargins.js"}}

## 制限

入力ラベルの「shrink」状態は必ずしも正しくありません。 入力が何かを表示しているとすぐに入力ラベルは縮小するはずです。 状況によっては、「shrink」状態（数値入力、日時入力、ストライプ入力）を判別できません。 重複があるかもしれません。

![shrink](/static/images/text-fields/shrink.png)

To workaround the issue, you can force the "shrink" state of the label.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

or

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

## Formatted inputs

You can use third-party libraries to format an input. You have to provide a custom implementation of the `<input>` element with the `inputComponent` property. The provided input component should handle the `inputRef` property. The property should be called with a value implementing the [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) interface.

The following demo uses the [react-text-mask](https://github.com/text-mask/text-mask) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries.

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

## アクセシビリティ

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure.

```jsx
<div class="form-control">
  <label for="my-input">Email address</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">We'll never share your email.</span>
</div>
```

- If you are using the `TextField` component, you just have to provide a unique `id`.
- If you are composing the component:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
```

## Complementary projects

For more advanced use cases you might be able to take advantage of:

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) A set of wrapper components to facilitate using Material UI with Redux Form.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with formik.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) A set of wrapper components to facilitate using Material UI with Final Form.