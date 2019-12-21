---
title: Card コンポーネント
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Card (カード)

<p class="description">Cardは一つの主題に関してのコンテンツとアクションを含みます。</p>

[Card](https://material.io/design/components/cards.html) は、1つのトピックに関するコンテンツとアクションを表示する面です。

関連する実行可能な情報を容易にスキャンできる必要があります。 テキストや画像などの要素は、階層を明確に示すように配置する必要があります。

## シンプルなCard

Cardは複数のアクション、UIコントロール、およびオーバーフローメニューをサポートできますが制限してください。Cardがより複雑で詳細な情報への入り口であることを忘れてはいけません。

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

### Outlined Card

Set `variant="outlined` to render an outlined card.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## 複雑なインタラクション

デスクトップでは、Cardの内容が展開できる可能性があります。

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## メディア

内容を補助する為に画像を用いたCardの例。

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

デフォルトでは、メディアを表示する為に `<div>` 要素と *背景画像* の組み合わせを使用します。 状況によってこれは問題になることがあります。 例えば、動画やレスポンシブ画像を表示したいとします。 そのような場合は `component` プロパティを使用します。

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> `component="img"`の場合、CardMediaはイメージのセンタリングを`object-fit`に依存します。 IE 11ではサポートされていません。

## UIコントロール

Card内の補足的なアクションは、通常はカードの下部に配置されているアイコンとテキスト及びUIコントロールから明示的に呼び出されます。

これはメディアコントロール付きCardの例です。

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}