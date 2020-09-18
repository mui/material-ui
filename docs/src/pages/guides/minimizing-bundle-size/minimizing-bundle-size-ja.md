# バンドルサイズの最小化

<p class="description">バンドルサイズを削減できるツールについて学びましょう。</p>

## バンドルサイズは重要である

Material-UIはバンドルサイズについてとても気をつけている。 サイズのスナップショットを、全てのパッケージとその重要箇所において各コミットで取っている ([最新のスナップショット](/size-snapshot))。 [dangerJS](https://danger.systems/js/) と組み合わせることで、各プルリクエストにおいて、[バンドルサイズ変更の詳細](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459)を調査することができます。

## いつ、どのように、tree-shakingをするか？

Material-UIのtree-shakingは、モダンフレームワークにおいて設定なしに動作します。 Material-UIはすべてのAPIを上位の`material-ui`インポートで公開しています。 If you're using ES6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and still get an optimised bundle size automatically:

```js
import { Button, TextField } from '@material-ui/core';
```

⚠️ 以下の指示は開発時の初期化時間を改善したい場合、または、tree-shakingに対応していない古いバンドラーをしようしている場合にのみ必要です。

## 開発環境

開発時のバンドルはライブラリの全てを含むので、 **遅い起動時間**の原因となります。 これは、特に`@material-ui/icons`からインポートする場合に顕著です。 起動時間は、上位からの名前指定インポートがない場合に比べて、約6倍遅い場合もあります。

この課題を持っているのであれば、様々な対応を取ることができます。

### 選択肢 1

パス指定インポートを利用して、使用していないモジュールのインポートを避けることができます。 例えば：

```js
// 🚀 早い!
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

上位インポート(Babelを使用していない) の代わりに

```js
import { Button, TextField } from '@material-ui/core';
```

設定を必要としないので、この選択肢は全てのデモで利用しています。 コンポーネントを利用するパッケージ作成者には推奨されています。 最高のDXとUXをもたらすアプローチは[選択肢 2](#option-2)をみましょう。

このように直接インポートする場合 [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/index.js)のエクスポートを使用しないので、公開されているモジュールと同じくらいに手軽な参照として提供されます。

1, 2階層までのインポートのみ対応していることに注意してください。 これより深い階層はプライベートとみなされ、バンドルのモジュール重複などの問題を引き起こします。

```js
// ✅ OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1st or top-level

// ✅ OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2nd level

// ❌ NOT OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3rd level
```

`eslint`を使用している場合、 [`no-restricted-imports` ルール](https://eslint.org/docs/rules/no-restricted-imports)で問題のあるインポートを検知可能です。 以下の `.eslintrc`設定は、`@material-ui`からの問題のあるインポート文をハイライトします。

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@material-ui/*/*/*", "!@material-ui/core/test-utils/*"]
      }
    ]
  }
}
```

### 選択肢 2

この選択肢が、最良のユーザー体験と開発体験をもたらします。

- UX: Babelプラグインは、バンドラーがサポートしていない場合でも、トップレベルのtree-shakingを有効にします。
- DX: Babelプラグインは、開発モードでも選択肢1と同様の起動時間の速さをもたらします。
- この記法は、一つのインポート文で複数のモジュールに対応するのでコードの重複をへらします。 全体として、読みやすく、新しいモジュールをimportする際に間違いをする機会を削減します。

```js
import { Button, TextField } from '@material-ui/core';
```

ただし、以下の2つの手順を正しく適用する必要があります。

#### 1. Babelの設定

次のいずれかを選びます。

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)と以下の設定:

  `yarn add -D babel-plugin-import
`

  プロジェクトのルートディレクトリ に`.babelrc.js` を作成する。

  ```js
  const plugins = [
    [
      'babel-plugin-import',
      {
        'libraryName': '@material-ui/core',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        'libraryDirectory': 'esm',
        'camel2DashComponentName': false
      },
      'core'
    ],
    [
      'babel-plugin-import',
      {
        'libraryName': '@material-ui/icons',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        'libraryDirectory': 'esm',
        'camel2DashComponentName': false
      },
      'icons'
    ]
  ];

  module.exports = {plugins};
  ```

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)と以下の設定

  `yarn add -D babel-plugin-transform-imports
`

  プロジェクトのルートディレクトリ に`.babelrc.js` を作成する。

  ```js
  const plugins = [
    [
      'babel-plugin-transform-imports',
      {
        '@material-ui/core': {
          // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
          'transform': '@material-ui/core/esm/${member}',
          'preventFullImport': true
        },
        '@material-ui/icons': {
          // Use "transform: '@material-ui/icons/${member}'," if your bundler does not support ES modules
          'transform': '@material-ui/icons/esm/${member}',
          'preventFullImport': true
        }
      }
    ]
  ];

  module.exports = {plugins};
  ```

Create React Appを使用している場合、`.babelrc`の利用を許容しているいくつかのプロジェクトを使用する必要があります。

`yarn add -D react-app-rewired customize-cra
`

`config-overrides.js`をルートディレクトリ に作成します。

```js
"scripts": {
-  "start": "react-scripts start"
+  "start": "react-app-rewired start"
  }
```

必要に応じて、`babel-plugin-import`は`.babelrc`の代わりに、 [configuration](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options)を使うことで、`config-overrides.js`を通して設定可能です。

Modify your `package.json` start command:

```diff
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

注意: このようなエラーが発生する場合があります。

> Module not found: Can't resolve '@material-ui/core/makeStyles' in '/your/project'

これは、 `@material-ui/styles`が `core`を通して、再エクスポートされているからです。しかし、全てのインポートは許可されていません。

このようにインポートをしている

```js
import { makeStyles, createStyles } from '@material-ui/core';
```

修正は簡単です、インポートを別々にします。

```js
import { makeStyles, createStyles } from '@material-ui/core/styles';
```

大幅に速い起動時間をお楽しみください。

#### 2. すべてのインポートを変換する

Finally, you can convert your existing codebase to this option with this [top-level-imports](https://github.com/mui-org/material-ui/blob/next/packages/material-ui-codemod/README.md#top-level-imports) codemod. 以下のような 変更になります。

```diff
-import Button from '@material-ui/core/Button';
-import TextField from '@material-ui/core/TextField';
+import { Button, TextField } from '@material-ui/core';
```

## ECMAScript

npmに公開されたパッケージは[Babel](https://github.com/babel/babel)で**トランスパイル**されています。[対応するプラットフォーム](/getting-started/supported-platforms/)への互換性のためです。

ふたつめのバージョンも同様に公開されています。[`/es` フォルダー](https://unpkg.com/@material-ui/core/es/)に存在します。 全ての非公式構文は、 [ECMA-262 standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm)にトランスパイルされます。それ以上でもありません。 これは、異なるブラウザに対して別々のバンドルを作成するために使用できます。 古いブラウザはより多くのJavaScriptの機能をトランスパイル必要性があり、これはバンドルサイズの増加につながります。 ES2015のランタイムには、polyfillは含まれません。 IE11+ と evergreen browsersは必要な全ての機能をサポートしています。 他のブラウザへのサポートが必要な場合、[`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill)の使用を検討してください。

⚠️ ユーザーのバンドルで、重複の発生を最小限にするために、ライブラリの作成者は、`/es` フォルダーの使用は**明確に非推奨**としています。
