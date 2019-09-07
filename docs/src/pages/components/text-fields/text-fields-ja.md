---
title: Text Field コンポーネント
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Fields

<p class="description">Text fieldを使用すると、ユーザーはテキストを入力および編集できます。</p>

[テキストフィールド](https://material. io/design/components/text-fields. html) 使用すると、ユーザーはUIにテキストを入力できます。 通常、フォームとダイアログに表示されます。

## TextField

`TextField` ラッパーコンポーネントは、ラベル、入力、およびヘルプテキストを含む完全なフォームコントロールです。

{{"demo": "pages/components/text-fields/TextFields.js"}}

> **Note:** ：このバージョンのテキストフィールドについては、[Material Design guidelines](https://material.io/)では説明されていませんが、Material-UIでは引き続きサポートされます。

## アウトライン (Outlined)

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

## カスタマイズされた入力 (Customized inputs)

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

カスタマイズはCSSにとどまりません。コンポジションを使用してカスタムコンポーネントを作成し、アプリに独特の雰囲気を与えることができます。 以下は、Googleマップに触発された [`InputBase`](/api/input-base/) コンポーネントを使用した例です。

{{"demo": "pages/components/text-fields/CustomizedInputBase.js"}}

## 入力装飾 (Input Adornments)

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

### シュリンク

入力ラベルの「shrink」状態は必ずしも正しくありません。 入力が何かを表示しているとすぐに入力ラベルは縮小するはずです。 状況によっては、「shrink」状態（数値入力、日時入力、ストライプ入力）を判別できません。 重複があるかもしれません。

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

フローティングラベルは絶対位置に配置され、ページのレイアウトには影響しません。 正しく表示するには、入力がラベルよりも大きいことを確認する必要があります。

## サードパーティの入力ライブラリとの統合

サードパーティのライブラリを使って入力をフォーマットすることができます。 `inputComponent` プロパティを使用して、 `<input>` 要素のカスタム実装を提供する必要があります。

次のデモでは、[react-text-mask](https://github.com/text-mask/text-mask) と[react-number-format](https://github.com/s-yadav/react-number-format)ライブラリを使用します。 同じ概念を [（たとえば、react-stripe-element)に適用することもできます](https://github.com/mui-org/material-ui/issues/16037)。

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

指定された入力コンポーネントは、 `inputRef` プロパティを処理する必要があります。 このプロパティは、次のインターフェイスを実装する値で呼び出す必要があります。

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

テキストフィールドにアクセスできるようにするには **、入力をラベルおよびヘルパーテキストにリンクする必要があります**。 基礎となるDOMノードにはこの構造が必要です。

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

## Complementary projects

より高度なユースケースのためにあなたは利用することができるかもしれません：

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) Redux FormでMaterial UIを使用しやすくするラッパーコンポーネントのセット。
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) formikでMaterial-UIを使うためのバインディング。
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) Final FormでMaterial UIを使いやすくするためのラッパーコンポーネントのセット。