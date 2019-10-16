---
title: Snackbar React component
components: Snackbar, SnackbarContent
---

# スナックバー

<p class="description">Snackbars provide brief messages about app processes. The component is also known as a toast.</p>

[スナックバー](https://material.io/design/components/snackbars.html) は、アプリが実行したプロセスまたは実行するプロセスをユーザーに通知します。 一時的に画面の下部に表示されます。 ユーザーの操作を中断したり、ユーザー入力を消去したりする必要はありません。

スナックバーには、実行された操作に直接関連する1行のテキストが含まれます。 テキストアクションは含まれますが、アイコンは含まれません。 それら使うことで通知を表示できます。

#### 頻度

一度に表示できるsnackbarは1つだけです。

## シンプルなスナックバー

Google Keepのスナックバーの動作を再現することを目的とした基本的なスナックバー。

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## カスタマイズされたスナックバー

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## 配置されたスナックバー

スナックバーの配置をより柔軟にする必要がある場合があります。

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## メッセージの長さ

メッセージの長さが異なるスナックバー。

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## Transitions

### 連続スナックバー

複数のsnackbarの更新が必要な場合は、一度に1つずつ表示されます。

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### スナックバーとフローティングアクションボタン（FAB）

スナックバーはFAB（モバイル）の上に表示されます。

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 500}}

### トランジションの変更

[Grow](/components/transitions/#grow) はデフォルトのトランジションですが、別のトランジションを使用できます。

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### スライド方向の制御

[スライド](/components/transitions/#slide) トランジションの方向を変更できます。

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

### notistack

![Stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npmダウンロード](https://img.shields.io/npm/dm/notistack.svg)

次の例では、 [notistack](https://github.com/iamhosseindhv/notistack)の使用方法を示します。 snackbars(オープン/クローズの状態に対処する必要はありません。) を簡単に表示できます。 It also enables you to stack them on top of one another (although this is discouraged by the specification).

{{"demo": "pages/components/snackbars/IntegrationNotistack.js"}}