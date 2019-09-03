---
title: Expansion Panel React component
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panels

<p class="description">Expansion panels(拡張パネル) には作成フローが含まれ、要素を簡単に編集できます。</p>

[拡張パネル](https://material.io/archive/guidelines/components/expansion-panels.html)は 独立した軽量のコンテナであるか、カードなどの大きなサーフェスに接続されています。

> **注：** 拡張パネルについては、<a href=「https://material.io/」>Material Design guidelines</a>では説明されていませんが、Material-UIでは引き続きサポートされます。

## アクセシビリティ

最適なアクセシビリティのために、 `ExpansionPanelSummary``id` と `aria-controls` を設定することをお勧めします。 `ExpansionPanel` は、パネルのコンテンツ領域に必要な `aria-labelledby` および `id` を導き出します。

## Simple Expansion Panel

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Controlled Accordion

パネルのデフォルトの動作を拡張し、`ExpansionPanel`コンポーネントを使用してアコーディオンを作成します。

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## カスタマイズされた拡張パネル

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}

## パフォーマンス

ExpansionPanelsのコンテンツは、パネルが展開されていない場合でもデフォルトでマウントされます。 このデフォルトの動作では、サーバー側のレンダリングとSEOが考慮されています。 パネル内に高価なコンポーネントツリーをレンダリングするか、単に パネルを多数レンダリングする場合は、 `TransitionProps`： `<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`の `unmountOnExit` 有効にしてこのデフォルトの動作を変更することをお勧めします。 他のパフォーマンス最適化と同様、これは特効薬ではありません。 まずボトルネックを特定してから、これらの最適化戦略を試してください。

## Secondary heading and Columns (第2の見出しと列)

コンテンツを構造化するために複数の列を使用することができ、ユーザを支援するためにヘルパーテキストをパネルに追加することができる。

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}