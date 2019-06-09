---
title: Button コンポーネント
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Button

<p class="description">Buttonを使用すると、ユーザーは1回のタップでアクションを実行したり選択したりできます。</p>

[Button](https://material.io/design/components/buttons.html)は、ユーザが取りうるアクションを伝達します。一般的に次のようなUIのなかに配置されます。

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

ButtonGroupを使って分割ボタンを作成することもできます。この例のようにドロップダウンでボタンの動作を変更することも、関連する動作をすぐに起動するために使用することもできます。

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Floating Action Buttons

[floating action button](https://material.io/design/components/buttons-floating-action-button.html)(FAB) は画面上でもっとも重要で一般的なアクションを実行する際に使用します。 FABは画面の構成要素の中で最前面に配置され、一般的に円形で中央にアイコンが配置されます。 FABには次の二つのタイプがあります: regular extended

FABを使用するのは、それが画面の主なアクションを提示するための最も適切な方法である場合だけにしてください。

最も一般的なアクションを表すには、画面ごとに1つのフローティングアクションボタンのみをお勧めします。

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

デフォルトでは、フローティングアクションボタンは、拡大する素材として画面上にアニメーション表示されます。

複数の横方向の画面（タブ付き画面など）にまたがるフローティングアクションボタンは、一時的に消えてから、アクションが変わると再表示されます。

これを実現するにはズームトランジションを使用できます。 終了アニメーションと入力アニメーションの両方が同時にトリガーされるため、新しいフローティングアクションボタンのアニメーションが開始される前に終了するように` enterDelay `を使用します。

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js"}}

## サイズ

大きくても小さくてもいいですか？ `size` プロパティで設定してください。

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## アイコンとラベルの付いたButton

プレーンテキストよりもロゴを認識しやすいため、アプリケーションのUXを向上させるために特定のボタンのアイコンを表示したい場合があります。 たとえば、削除ボタンがある場合は、ゴミ箱アイコンでラベルを付けることができます。

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

アイコンボタンは通常、アプリバーとツールバーにあります。

アイコンは、アイテムへの星の追加や削除など、単一の選択肢を選択または選択解除できるトグルボタンにも適しています。

{{"demo": "pages/components/buttons/IconButtons.js"}}

## カスタムButton

コンポーネントのカスタマイズ例をいくつか示します。あなたはこれについてもっと詳しく知ることができます [上書きドキュメントのページ](/customization/components/)。

{{"demo": "pages/components/buttons/CustomizedButtons.js"}}



## 複雑なButton

テキストボタン、包含ボタン、フローティングアクションボタン、およびアイコンボタンは、同じコンポーネント（ `ButtonBase`上に構築されています。 この低レベルのコンポーネントを利用してカスタムインタラクションを構築できます。

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## サードパーティ製ルーティングライブラリ

一般的な使用例の1つは、ボタンを使用して新しいページへのナビゲーションを開始することです。 `ButtonBase` コンポーネントは、このユースケースを処理するためのプロパティを提供します 。 108/5000 ただし、特定のフォーカスについては` ButtonBase `には提供されているDOMノードが必要です。 これは、refをコンポーネントに添付し、 コンポーネントがこのrefを基になるDOMノードに転送することを期待することによって実現されます。 私たちのインタラクティブなコンポーネントの多くが` ButtonBase `に依存していることを考えると、あなたはどこでもそれを利用することができるはずです。

{{"demo": "pages/components/buttons/ButtonRouter.js", "defaultCodeOpen": true}}

*注意：Buttonコンポーネントの作成は、予期しないマウント解除を防ぐために必要です。 詳しくは[コンポーネントプロパティガイド](/guides/composition/#component-property)をご覧ください。*