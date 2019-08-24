---
title: Select React component
components: Select, NativeSelect
---

# Selects

<p class="description">選択コンポーネントは、オプションのリストからユーザー提供の情報を収集するために使用されます。</p>

## 簡単な選択

メニューは、現在選択されているメニュー項目が放出要素の上に表示されるように、放出要素の上に配置されます。

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## ネイティブを選択

プラットフォームのネイティブ選択を使用することで、モバイルでのユーザーエクスペリエンスを向上させることができます。 このようなパターンを許容します。

{{"demo": "pages/components/selects/NativeSelects.js"}}

## カスタマイズされた選択

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [overrides documentation page](/customization/components/)を参照してください。

最初のステップは、 `InputBase` コンポーネントのスタイル設定です。 スタイルを設定したら、テキストフィールドとして直接使用するか、select `input` プロパティに提供して、 `select` フィールドを作成できます。

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## 複数選択

`Select` コンポーネントは、複数の選択を処理できます。 `multiple` プロパティで有効になります。

単一選択の場合と同様に、 `onChange` コールバックで `event.target.value` にアクセスすることにより、新しい値を引き出すことができます。 常に配列です。

{{{{"demo": "pages/components/selects/MultipleSelect.js"}}

## 制御開選択

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## ダイアログ付き

Material Designの仕様では推奨されていませんが、ダイアログ内でselectを使用できます。

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Text Fields

The `TextField` wrapper component is a complete form control including a label, input and help text. このセクション</a>で、選択モード 例を見つけることができます。</p>