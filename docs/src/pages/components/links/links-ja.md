---
components: Link
---

# リンク

<p class="description">Linkコンポーネントを使用すると、テーマの色とタイポグラフィスタイルでアンカー要素を簡単にカスタマイズできます。</p>

## 簡単なリンク

Linkコンポーネントは、 [Typography](/api/typography/) コンポーネントの上に構築されています。 そのプロパティを活用できます。 そのプロパティを活用できます。

{{"demo": "pages/components/links/Links.js"}}

ただし、Linkコンポーネントには、Typographyコンポーネントとは異なるデフォルトプロパティがあります。

- リンクが目立つようにするには、`color="primary"`とします。
- ほとんどの場合、リンクはタイポグラフィコンポーネントの子として使用されるため、`variant="inherit"` となります。

## セキュリティ

リンクで `target="_blank"` を使用する場合は、サードパーティのコンテンツにリンクする際に、`rel="noopener"` または`rel="noreferrer"`を必ず設定することを[推奨します。](https://developers.google.com/web/tools/lighthouse/audits/noopener)

- `rel="noopener"` は、新しいページがにアクセスできないように`window.opener`プロパティを使用し、別のプロセスで実行されるようにします。 これがないと、ターゲットページがページを悪意のあるURLにリダイレクトする可能性があります。 これがないと、ターゲットページがページを悪意のあるURLにリダイレクトする可能性があります。
- `rel="noreferrer"` は同じ効果を持ちますが、*Referer* ヘッダーが新しいページに送信されなくなります。 ⚠️リファラーヘッダーを削除すると、分析に影響します。 ⚠️リファラーヘッダーを削除すると、分析に影響します。

## サードパーティ製ルーティングライブラリ

One common use case is to perform navigation on the client only, without an HTTP round-trip to the server. `Link` コンポーネントには、このユースケースを処理するためのプロパティが用意されています。：`component`

こちらは [react-routerとの統合例](/guides/composition/#link).

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- リンクのコンテンツを提供するときは、「ここをクリック」や「移動」などの一般的な説明は避けてください。 リンクのコンテンツを提供するときは、「ここをクリック」や「移動」などの一般的な説明は避けてください。 代わりに、 [特定の説明](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text)使用します。
- 最高のユーザーエクスペリエンスを得るには、ページ上のテキストからリンクを目立たせる必要があります。
- リンクに意味のあるhrefがない場合、[`<button>`要素を使用してレンダリングする必要があります。](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md)

{{"demo": "pages/components/links/ButtonLink.js"}}