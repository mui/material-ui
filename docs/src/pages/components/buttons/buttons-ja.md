---
title: Button コンポーネント
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Button

<p class="description">Buttonを使用すると、ユーザーは1回のタップでアクションを実行したり選択したりできます。</p>

[ボタン](https://material.io/design/components/buttons.html) 、ユーザーが実行できるアクションを伝えます。 これらは通常、UI全体の次のような場所に配置されます。

- Dialogs
- Modal window
- Form
- Card
- Toolbar

## Contained Buttons

[Contained button](https://material.io/design/components/buttons.html#contained-button)は、力強く、強調と塗りつぶしによって区別されるようなボタンです。 アプリケーションの初歩的なアクションが含まれます。

一番最後のデモは、アップロード用のボタンの例になっています。

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Text Buttons

[Text button](https://material.io/design/components/buttons.html#text-button)は、一般的にそれほど目立たせる必要のないアクションに対して用いられます。例えば、次のようなコンポーネントの中で用いられます。

- Dialog
- Card

Cardの中でText Buttonを用いることで、Cardの内容に重点を置くことができます。

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined buttons](https://material.io/design/components/buttons.html#outlined-button) are medium-emphasis buttons. 重要なアクションを含みますが、アプリ内では最も重要ではない、といった場合に使われます。

### 代替手段

Outlined buttonは、Contained buttonと比べると強調が弱く、 Text buttonと比べると強調の強いボタンです。

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Grouped Buttons

ButtonGroupコンポーネントは、アウトラインボタン（デフォルト）または含まれているボタンをグループ化するために使用できます。

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

## Split Button

ButtonGroupは分割ボタンの作成にも使用できます。 この例のようにドロップダウンでボタンの動作を変更することも、関連する動作をすぐに起動するために使用することもできます。

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Floating Action Buttons

[floating action button](https://material.io/design/components/buttons-floating-action-button.html)(FAB) は画面上でもっとも重要で一般的なアクションを実行する際に使用します。 FABは画面の構成要素の中で最前面に配置され、一般的に円形で中央にアイコンが配置されます。 FABには次の二つのタイプがあります: regular extended

FABを使用するのは、それが画面の主なアクションを提示するための最も適切な方法である場合だけにしてください。

最も一般的なアクションを表すには、画面ごとに1つのフローティングアクションボタンのみをお勧めします。

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

デフォルトでは、フローティングアクションボタンは、拡大する素材として画面上にアニメーション表示されます。

複数の横方向の画面（タブ付き画面など）にまたがるフローティングアクションボタンは、一時的に消えてから、アクションが変わると再表示されます。

これを実現するにはズームトランジションを使用できます。 終了アニメーションと入力アニメーションの両方が同時にトリガーされるため、新しいフローティングアクションボタンのアニメーションが開始される前に終了するように` enterDelay `を使用します。

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js", "bg": true}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## サイズ

大きなボタンと小さなボタンがありますか? `size`プロパティを使用します。

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons with icons and label

ロゴはプレーンテキストよりも認識しやすいため、ボタンにアイコンを追加してアプリケーションのUXを強化したい場合があります。 たとえば、削除ボタンにごみ箱アイコンを付けるような場合です。

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

アイコンだけのボタンは、App BarやToolbarでよく使われます。

アイコンは、アイテムを一つ選択したり、アイテムに星を追加または削除するなど選択/解除できるトグルボタンにも適しています。

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Customized buttons

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/button).

## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## サードパーティ製ルーティングライブラリ

One common use case is to use the button to trigger navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. However for certain focus polyfills `ButtonBase` requires the DOM node of the provided component. This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Here is an [integration example with react-router](/guides/composition/#button).

## 制限事項

### Cursor not-allowed

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **CSS only**. You can remove the pointer events style on the disabled state of the `<button>` element:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

However:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/components/tooltips/#disabled-elements)
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **DOM change**. You can wrap the button:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

This has the advantage of supporting any element, for instance, a link `<a>` element.