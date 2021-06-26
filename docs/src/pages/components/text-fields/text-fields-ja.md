---
title: Text Field コンポーネント
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Field (テキストフィールド)

<p class="description">Text fieldを使用すると、ユーザーはテキストを入力および編集できます。</p>

[テキストフィールド](https://material.io/design/components/text-fields.html) 使用すると、ユーザーはUIにテキストを入力できます。 通常、フォームとダイアログに表示されます。

## TextField

`TextField` ラッパーコンポーネントは、ラベル、入力、およびヘルプテキストを含む完全なフォームコントロールです。

Standard、Outlined、およびFilledのスタイルをサポートします。

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**備考:** `TextField`の標準のスタイルは[Material Design guidelines](https://material.io/) に記載されなくなりましたが([理由はこちら](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03))、Material-UIでは引き続きサポートされます。

## Form props

標準的なフォームの属性がサポートされています。(`required`, `disabled`, `type` など) 入力がどのように使用されるかなど、フィールドの入力に関するコンテキストを与えるために使用される `helperText` も同様です。 入力がどのように使用されるかなど、フィールドの入力に関するコンテキストを与えるために使用される `helperText` も同様です。

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## バリデーション

`error` プロパティでエラーの状態を切り替え、`helperText` プロパティでエラーについてのフィードバックを表示できます。

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

The `multiline` prop transforms the text field into a [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) or a [TextareaAutosize](/components/textarea-autosize/).

{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}

## Select (選択)

The `select` prop makes the text field use the [Select](/components/selects/) component internally.

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Icons

There are multiple ways to display an icon with a text field.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### 入力装飾 (Input Adornments)

これを行う主な方法は `InputAdornment` です。 これは、入力に接頭辞、接尾辞、またはアクションを追加するために使用できます。 たとえば、アイコンボタンを使用してパスワードを表示または非表示にすることができます。

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## サイズ

小さい入力欄が好きですか？ `size`プロパティを使用します。

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

## レイアウト

`margin` プロパティを使用して入力欄の垂直方向の間隔を変更することができます。 `margin` プロパティを使用して入力欄の垂直方向の間隔を変更することができます。 `none` (デフォルト) を使用すると、 `FormControl`に余白は適用されません。一方、 `dense` と `normal` では適用されます。 `dense` と `normal` は、仕様を満たすために他のスタイルを変更します。 `dense` と `normal` は、仕様を満たすために他のスタイルを変更します。

`fullWidth` を使用すると、入力欄の幅がコンテナ一杯になります。

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Uncontrolled vs Controlled

制御されている(controlled)コンポーネントと制御されていない(uncontrolled)コンポーネントがあります。

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## コンポーネント

`TextField` は小さなコンポーネントから構成されています。（ [`FormControl`](/api/form-control/)、 [`Input`](/api/input/)、 [`FilledInput`](/api/filled-input/)、 [`InputLabel`](/api/input-label/)、 [`OutlinedInput`](/api/outlined-input/)、 や [`FormHelperText`](/api/form-helper-text/)など ）また、フォーム入力を大幅にカスタマイズするために直接活用できます。

いくつかのネイティブHTML入力プロパティが `TextField` コンポーネントにないことに気づいたかもしれません。 これは故意です。 コンポーネントは最も使用されているプロパティの面倒を見ます、そしてそれは以下のデモで示される基本的なコンポーネントを使うことはユーザー次第です。 それでも、あなたは使用することができます `inputProps` （及び `InputProps`、 `InputLabelProps` あなたには、いくつかの決まり文句を避けたい場合はプロパティ）。

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## 入力

{{"demo": "pages/components/text-fields/Inputs.js"}}

## カラー

`color` プロパティは入力欄がフォーカスされた時のハイライト色を変更します。

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## カスタマイズされた入力 (Customized inputs)

コンポーネントのカスタマイズの例を次に示します。 コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

カスタマイズはCSSにとどまりません。コンポジションを使用してカスタムコンポーネントを作成し、アプリに独特の雰囲気を与えることができます。 カスタマイズはCSSにとどまりません。コンポジションを使用してカスタムコンポーネントを作成し、アプリに独特の雰囲気を与えることができます。 以下は、Googleマップに触発された [`InputBase`](/api/input-base/) コンポーネントを使用した例です。

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/text-field).

## 制限事項

### シュリンク

入力ラベルの「shrink」状態は必ずしも正しくありません。 入力が何かを表示しているとすぐに入力ラベルは縮小するはずです。 状況によっては、「shrink」状態（数値入力、日時入力、ストライプ入力）を判別できません。 重複があるかもしれません。 入力が何かを表示しているとすぐに入力ラベルは縮小するはずです。 状況によっては、「shrink」状態（数値入力、日時入力、ストライプ入力）を判別できません。 重複があるかもしれません。

![シュリンク](/static/images/text-fields/shrink.png)

この問題を回避するにはラベルの"shrink"状態を以下のように強制する必要があります。

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

または

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### フローティングラベル

フローティングラベルは絶対位置に配置され、ページのレイアウトには影響しません。 正しく表示するには、入力がラベルよりも大きいことを確認する必要があります。 正しく表示するには、入力がラベルよりも大きいことを確認する必要があります。

## サードパーティの入力ライブラリとの統合

サードパーティのライブラリを使って入力をフォーマットすることができます。 `inputComponent` プロパティを使用して、 `<input>` 要素のカスタム実装を提供する必要があります。 `inputComponent` プロパティを使用して、 `<input>` 要素のカスタム実装を提供する必要があります。

次のデモでは、[react-text-mask](https://github.com/text-mask/text-mask) と[react-number-format](https://github.com/s-yadav/react-number-format)ライブラリを使用します。 同じ概念を [（たとえば、react-stripe-element)に適用することもできます](https://github.com/mui-org/material-ui/issues/16037)。

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

指定された入力コンポーネントは、 `inputRef` プロパティを処理する必要があります。 このプロパティは、次のインターフェイスを実装する値で呼び出す必要があります。 このプロパティは、次のインターフェイスを実装する値で呼び出す必要があります。

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
function MyInputComponent(props) {
  const { component: Component, inputRef, ...other } = props;

  // implement `InputElement` interface
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // logic to focus the rendered component from 3rd party belongs here
    },
    // hiding the value e.g. react-stripe-elements
  }));

  // `Component` will be your `SomeThirdPartyComponent` from below
  return <Component {...other} />;
}

// usage
<TextField
  InputProps={{
    inputComponent: MyInputComponent,
    inputProps: { component: SomeThirdPartyComponent },
  }}
/>;
```

## アクセシビリティ

テキストフィールドにアクセスできるようにするには **、入力をラベルおよびヘルパーテキストにリンクする必要があります**。 The underlying DOM nodes should have this structure:

```jsx
<div class="form-control">
  <label for="my-input">Email address</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">We'll never share your email.</span>
</div>
```

- `TextField` コンポーネントを使用している場合は、一意の `id`を指定するだけです。
- コンポーネントを構成している場合は

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
```

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with [formik](https://jaredpalmer.com/formik).
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) Bindings for using Material-UI with [Redux Form](https://redux-form.com/).
- [mui-rff](https://github.com/lookfirst/mui-rff) Bindings for using Material-UI with [React Final Form](https://final-form.org/react).