---
title: React Accordion component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Accordion (拡張パネル)

<p class="description">Expansion panels(拡張パネル) には作成フローが含まれ、要素を簡単に編集できます。</p>

[拡張パネル](https://material.io/archive/guidelines/components/expansion-panels.html)は 独立した軽量のコンテナであるか、カードなどの大きなサーフェスに接続されています。

> **注：** 拡張パネルについては、[Material Design guidelines](https://material.io/)では説明されていませんが、Material-UIでは引き続きサポートされます。 以前は"expansion panel"としてしられていたものです。

## Simple Accordion

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Controlled Accordion

パネルのデフォルトの動作を拡張し、`Accordion`コンポーネントを使用してアコーディオンを作成します。

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## カスタマイズされた拡張パネル

コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 コンポーネントのカスタマイズ例を次に示します。 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Additional actions

`Checkbox`などのアクションまたはボタンを`AccordionSummary`の内部で使うために、フォーカスの伝播を止めて、アクション時にクリックイベントがパネルの開閉動作を呼ばないようにする必要があります。 また、アクションに `aria-label` を付与する必要があります。 そうしないと、入れ子になったアクションのラベルがアコーディオンの拡張を制御する親コンポーネントのボタンのラベルに含まれることになります。

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## パフォーマンス

Accordionsのコンテンツは、パネルが展開されていない場合でもデフォルトでマウントされます。 このデフォルトの動作では、サーバー側のレンダリングとSEOが考慮されています。 パネルの中で高価なコンポーネント ツリーをレンダリングしたり、単に多くのパネルをレンダリングする場合は、`TransitionProps` の `unmountOnExit` を有効にして、このデフォルトの動作を変更するのが良いでしょう。

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

他のパフォーマンス最適化と同様、これは特効薬ではありません。 まずボトルネックを特定してから、これらの最適化戦略を試してください。

## Secondary heading and Columns (第2の見出しと列)

複数の列を使用してコンテンツを構成でき、ユーザーを支援するためにヘルパーテキストをパネルに追加できます。

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

最適なアクセシビリティのために、 `AccordionSummary``id` と `aria-controls` を設定することをお勧めします。 `Accordion` は、パネルのコンテンツ領域に必要な `aria-labelledby` および `id` を導き出します。 最適なアクセシビリティのために、 `AccordionSummary``id` と `aria-controls` を設定することをお勧めします。 `Accordion` は、パネルのコンテンツ領域に必要な `aria-labelledby` および `id` を導き出します。
