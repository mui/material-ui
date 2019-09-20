# Material-UI Versions

<p class="description">このページに戻って、読んでいるドキュメントのバージョンをいつでも切り替えることができます。</p>

## 安定バージョン

本番環境では最新バージョンをお勧めします。

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## 最新バージョン

ここには、最新の未発表の文書とコードがあります。 これを使用して、変更点を確認し、Material-UIの貢献者により良いフィードバックを提供できます。

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## バージョン管理戦略

Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Material-UI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

訳文 Material-UIは厳密に[Semantic Versioning 2.0. 0](https://semver.org/)に従います。 Material-UIのバージョン番号には3つの部分があります：` major.minor.patch ` 。 バージョン番号は、リリースに含まれる変更のレベルに基づいて増分されます。

- **メジャーリリース**　には、重要な新機能が含まれています。一部の機能は含まれていますが、アップデート中の開発者支援は最小限に抑えられます。 新しいメジャーリリースに更新するときは、更新スクリプトの実行、コードのリファクタリング、追加テストの実行、および新しいAPIの学習が必要になる場合があります。
- **マイナーリリース**　重要な新機能が含まれています。 マイナーリリースは完全に下位互換性がある; アップデート中に開発者の支援は必要ありませんが、必要に応じて、リリースで追加された新しいAPI、機能、および機能を使用するようにアプリケーションとライブラリを変更できます。
- **パッチリリース**　リスクが低く、バグ修正と小さな新機能が含まれています。 更新中に開発者の支援は必要ありません。

## リリース頻度

定期的なリリーススケジュールは、Material-UIの継続的な進化に合わせて更新を計画および調整するのに役立ちます。

一般的に、次のリリースサイクルが期待できます。

- **メジャー** 6〜12か月ごとにリリースします。
- 1-3 **マイナー**各メジャーリリースのリリース。
- **パッチ**毎週リリース（緊急のバグ修正のためいつでも）。

## リリーススケジュール

> 免責事項：日付は一般的なガイダンスとして提供されており、必要に応じて高品質のコードの配信を確保するために調整される場合があります。

| Date     | Version                    |
|:-------- |:-------------------------- |
| 2018年5月✅ | `@material-ui/core` v1.0.0 |
| 2019年5月✅ | `@material-ui/core` v4.0.0 |
| ? ⏳      | `@material-ui/core` v5.0.0 |


You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

## サポートポリシー

Only the latest version of Material-UI is supported. [ LTSを提供するリソースがまだありません](https://en.wikipedia.org/wiki/Long-term_support)リリース。

## 廃止予定

時々**「重大な変更」 ** 、一部のAPIおよび機能のサポートの削除などが必要です。

これらの移行をできるだけ簡単にするには：

- 重大な変更の数は最小限に抑えられ、可能であれば移行ツールが提供されます。
- ここに記載されているサポート終了ポリシーに準拠しているため、アプリを最新のAPIとベストプラクティスに更新する時間があります。

### 廃止方針

- 廃止された機能は、変更ログでアナウンスします、可能であれば実行時に警告が表示されます。
- 廃止が発表された時、推奨されるアップデートの仕方が提供されます。
- 廃止猶予期間中の安定したAPIの既存使用をサポートしているため、その期間中もコードは機能し続けます。
- アプリの変更を必要とするピア依存の更新（React）は、メジャーリリースでのみ行われます。