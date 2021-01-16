---
title: React Autocomplete component
components: TextField, Popper, Autocomplete
githubLabel: 'component: Autocomplete'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#combobox'
---

# Autocomplete

<p class="description">オートコンプリートは、推奨オプションのパネルによって強化された通常のテキスト入力です。</p>

ウィジェットは、単一行テキストボックスの値を設定する際に以下の2通りの状況で役に立ちます。

1. テキストボックスの値が、予め決められた許容値の中から選ばないといけない場合。 例えば、位置の欄は [combo box](#combo-box)の中から選ばないといけない。
2. テキストボックスが任意の値を含む可能性があるが、ユーザーに可能性のある値の提案をすることが有効な場合。例えば、検索欄で近い、又は、以前の検索結果を示してユーザーの時間を節約する。[free solo](#free-solo).

"react-select"と"downshift"というパッケージの改良版であることを意識しています。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Combo box

テキストボックスの値は、予め決められた許容値の中から選ばないといけない

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Options structure

デフォルトでは、コンポーネントは以下の構造のオプションが設定可能です。

```ts
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

例えば：

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

However, you can use different structures by providing a `getOptionLabel` prop.

### Playground

以下の各例は、Autocompleteコンポーネントの各機能を示しています。

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Country select

248の国から一つ選びます。

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

### Controllable states

コンポーネントは、操作できる二つのステートを持ちます。

1. "value"ステートは `value`/`onChange` を組み合わせて使用します。 例えば、<kbd class="key">Enter</kbd>を押している状態。
2. "input value"ステートは`inputValue`/`onInputChange` を組み合わせて使用します。 この値は、テキストボックスに表示される値を示します。 この値は、テキストボックスに表示される値を示します。 この値は、テキストボックスに表示される値を示します。 この値は、テキストボックスに表示される値を示します。

> 二つのステートは解離しており、独立して管理される必要があります。

{{"demo": "pages/components/autocomplete/ControllableStates.js"}}

## Free solo

`freeSolo`をtureにすることで、テキストボックスに任意の値を含むことができます。

### Search input

提案付きの**検索欄**に使われることを主な使われ方として設計されています。 例えば、Google searchやreact-autowhatever

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Creatable

このモードを[combo box](#combo-box)のような体験(selectの拡張版) に使う意図であれば、以下のような設定をお勧めします。

- `selectOnFocus`でユーザーが選択した値を消せるようにする。
- `clearOnBlur` でユーザーが新しい値を入力できるようにする。
- `handleHomeEndKeys`でポップアップな内で<kbd class="key">Home</kbd> and <kbd class="key">End</kbd>キーを使ってフォーカスが移動できるようにする。
- 最後の選択肢に, 例えば`Add "YOUR SEARCH"`を追加する。

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

ユーザーが新しい値を入力する時に、ダイアログを表示することもできます。

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Grouped

You can group the options with the `groupBy` prop. If you do so, make sure that the options are also sorted with the same dimension that they are grouped by, otherwise you will notice duplicate headers.

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Disabled options

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

For advanced customization use cases, we expose a headless `useAutocomplete()` hook. JSXのレンダリングに関連する値以外は、Autocompleteコンポーネントとほぼ同じ値をとります。 Autocompleteコンポーネントは内部でこのhookを使用しています。 Autocompleteコンポーネントは内部でこのhookを使用しています。 Autocompleteコンポーネントは内部でこのhookを使用しています。

```jsx
import useAutocomplete from '@material-ui/core/useAutocomplete';
```

- 📦 [4.5 kB gzipped](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Customized hook

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

Head to the [Customized Autocomplete](#customized-autocomplete) section for a customization example with the `Autocomplete` component instead of the hook.

## Asynchronous requests

The component supports two different asynchronous use-cases:

- [Load on open](#load-on-open): it waits for the component to be interacted with to load the options.
- [Search as you type](#search-as-you-type): a new request is made for each keystroke.

### Load on open

It displays a progress state as long as the network request is pending.

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### Search as you type

If your logic is fetching new options on each keystroke and using the current value of the textbox to filter on the server, you may want to consider throttling requests.

Additionally, you will need to disable the built-in filtering of the `Autocomplete` component by overriding the `filterOptions` prop:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

### Google Maps place

Google マップの位置の自動保管用のカスタムUI

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

このデモでは、 [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial) APIをロードする必要があります。

> Google Maps JavaScript APIを使用する前に、サインアップして、決済アカウントを作成する必要があります。

## Multiple values

タグとも言える。ユーザーは一つ以上の値を選択することができます。

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Fixed options

インターフェースから削除されないように、特定のタグを固定する必要があるイベント中、チップスを無効化することができます。

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Checkboxes

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### Limit tags

`limitTags` でフォーカスしていない時に表示する選択肢の数に上限を設けられます。

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## サイズ

Fancy smaller inputs? `size`propを使用します。

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## カスタマイズ

### Custom input

`renderInput`でレンダリングされる入力をカスタマイズできます。 このrender propsの一つ目の引数は、継承する必要のあるpropsを含みます。 `ref` と `inputProps` の扱いに特に注意してください。

{{"demo": "pages/components/autocomplete/CustomInputAutocomplete.js"}}

### GitHub's picker

GitHubのラベルピッカーを再現したデモです。

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

[Customized hook](#customized-hook) 部分で、 コンポーネントの代わりに、`useAutocomplete`hookを使用したカスタマイズ例が見れます。

## Highlights

以下のデモはこちらに依存します。[autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), 提案されたテキストや自動保管コンポーネントをハイライトする小さいサイズの(1 kB)ユーティリティ

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Custom filter

`filterOptions`に流せるフィルターメソッドを作成できるファクトリーを露出しているコンポーネント デフォルトのフィルター挙動を変更するのに使うことができます。 デフォルトのフィルター挙動を変更するのに使うことができます。 デフォルトのフィルター挙動を変更するのに使うことができます。 デフォルトのフィルター挙動を変更するのに使うことができます。

```js
import { createFilterOptions } from '@material-ui/core/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### 引数

1. `config` (*Object* [optional]):

- `config.ignoreAccents` (*Boolean* [optional]): Defaults to `true`. 発音記号を削除する
- `config.ignoreCase` (*Boolean* [optional]): Defaults to `true`. すべて小文字にする。
- `config.limit` (*Number* [optional]): Default to null. 表示される推奨オプションの数を制限する。 例えば、 `config.limit` が `100`の時、頭の`100`個のマッチングオプションのみが表示されます。 バーチャライズせずに、大量の選択肢を扱うのに有効です。
- `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
- `config.stringify` (*Func* [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
- `config.trim` (*Boolean* [optional]): Defaults `false`. 末尾のスペースを削除します。

#### 戻り値

`filterOptions`: 返り値のフィルターメソッドは、`Autocomplete`コンポーネントの`filterOptions`propに直接渡すことができます。hookにも渡すことができます。

以下のデモでは、選択肢が前方一致する必要があります。

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### 高度な機能(Advanced)

fuzzy matchingのような高度なメカニズの為には [match-sorter](https://github.com/kentcdodds/match-sorter)を見ることをおすすめします。 例えば： 例えば： 例えば： 例えば：

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Virtualization

10,000のランダム生成された選択肢内で検索します。 10,000のランダム生成された選択肢内で検索します。 10,000のランダム生成された選択肢内で検索します。 [react-window](https://github.com/bvaughn/react-window)でリストをバーチャライズしています。 [react-window](https://github.com/bvaughn/react-window)でリストをバーチャライズしています。

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Events

If you would like to prevent the default key handler behavior, you can set the event's `defaultMuiPrevented` property to `true`:

```jsx
<Autocomplete
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      // Prevent's default 'Enter' behavior.
      event.defaultMuiPrevented = false;
      // your handler code
    }
  }}
/>
```

## 制限事項

### autocomplete/autofill

ブラウザは入力補助のために経験則を持っています。 しかし、これはコンポーネントのUXを損なう可能性があります。

By default, the component disables the **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute. Google Chrome does not currently support this attribute setting ([Issue 587466](https://bugs.chromium.org/p/chromium/issues/detail?id=587466)). A possible workaround is to remove the `id` to have the component generate a random one.

In addition to remembering past entered values, the browser might also propose **autofill** suggestions (saved login, address, or payment details). autofillを避けたい場合、以下の方法を取れます。

- ブラウザが判断できない命名を入力欄に使う。 例: `id="country"`の代わりに、`id="field1"`を使う idを空にした場合、コンポーネントはランダムなidを保管します。
- Set `autoComplete="new-password"` (some browsers will suggest a strong password for inputs with this attribute setting):

  ```jsx
  <TextField
    {...params}
    inputProps={{
      ...params.inputProps,
      autoComplete: 'new-password',
    }}
  />
  ```

Read [the guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for more details.

### iOS VoiceOver

iOS Safariのボイスオーバーは`aria-owns` を十分にサポートしていません。 `disablePortal`を用いて、この問題を回避できます。 `disablePortal`を用いて、この問題を回避できます。 `disablePortal`を用いて、この問題を回避できます。 `disablePortal`を用いて、この問題を回避できます。

### ListBox コンポーネント

`Listbox コンポーネント` のカスタムプロパティを提供する場合、意図するスクロールコンテナの `role` 属性として `listbox` が設定されていることを確認する必要があります。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。 これにより、例えばキーボードを使用して移動する場合など、スクロールの正しい動作が保証されます。

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

テキストボックスに対して、ラベルの使用を奨励しています。 コンポーネントは WAI-ARIA オーサリングを実装しています。
