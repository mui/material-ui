# Minimizando o tamanho do pacote

<p class="description">Saiba mais sobre as ferramentas que você pode usar para reduzir o tamanho do pacote.</p>

## Tamanho do pacote importa

O tamanho do pacote do Material-UI é levado muito a sério. Size snapshots are taken on every commit for every package and critical parts of those packages ([view the latest snapshot](/size-snapshot/)). Combinado com [dangerJS](https://danger.systems/js/) podemos inspecionar [alterações detalhadas no tamanho do pacote](https://github.com/mui/material-ui/pull/14638#issuecomment-466658459) em cada solicitação de Pull Request.

## Quando e como usar tree-shaking?

Tree-shaking no Material-UI funciona de uma forma moderna. MUI exposes its full API on the top-level `@mui` imports. If you're using ES6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and still get an optimized bundle size automatically:

```js
import { Button, TextField } from '@material-ui/core';
```

⚠️ As instruções a seguir são somente necessárias se você deseja otimizar o tempo de startup em desenvolvimento ou se você esta utilizando um bundler antigo que não suporte tree-shaking.

## Ambiente de desenvolvimento

Os pacotes de desenvolvimento podem conter a biblioteca completa que pode deixar **o tempo de inicialização mais lento**. This is especially noticeable if you use named imports from `@mui/icons-material`, which can be up to six times slower than the default import. For example, between the following two imports, the first (named) can be significantly slower than the second (default):

```js
// 🐌 Named
import { Delete } from '@mui/icons-material';
```

```js
// 🚀 Default
import Delete from '@mui/icons-material/Delete';
```

If this is an issue for you, you have two options:

### Option one: use path imports

Você pode usar as importações de caminho para evitar puxar módulos não utilizados. Por exemplo, use:

```js
// 🚀 Fast
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
```

em vez de importações de nível superior (sem um plugin do Babel):

```js
import { Button, TextField } from '@mui/material';
```

Esta é a opção que apresentamos em todas as demonstrações, pois não exige qualquer configuração. É o mais recomendável para autores de biblioteca que estendem os componentes. Vá até [Opção 2](#option-2) para uma abordagem que produz uma melhor DX e UX.

Ao importar diretamente desta maneira, não usa as exportações do [arquivo principal do `@material-ui/core`](https://unpkg.com/@material-ui/core), este arquivo pode servir como uma referência útil para quais módulos são públicos.

Esteja ciente de que apenas damos suporte para as importações de primeiro e segundo nível. Qualquer coisa em níveis mais profundos é considerado privado e pode causar problemas, como a duplicação de módulos em seu pacote.

```js
// ✅ OK
import { Add as AddIcon } from '@mui/icons-material';
import { Tabs } from '@mui/material';
//                         ^^^^^^^^ 1st or top-level

// ✅ OK
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
//                              ^^^^ 2nd level

// ❌ NOT OK
import TabIndicator from '@mui/material/Tabs/TabIndicator';
//                                           ^^^^^^^^^^^^ 3rd level
```

If you're using `eslint` you can catch problematic imports with the [`no-restricted-imports` rule](https://eslint.org/docs/latest/rules/no-restricted-imports). A configuração `.eslintrc` a seguir irá capturar as problemáticas das importações dos pacotes `@material-ui`:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*"]
      }
    ]
  }
}
```

### Option two: use a Babel plugin

This option provides the best user experience and developer experience:

- UX: O plugin Babel permite tree-shaking de nível superior, mesmo se o seu bundler não suporte.
- DX: O plugin Babel torna o tempo de inicialização no modo de desenvolvimento tão rápido quanto a opção 1.
- DX: Essa sintaxe reduz a duplicação de código, exigindo apenas uma única importação para vários módulos. Em geral, o código é mais fácil de ser lido, e é menos provável que você cometa um erro ao importar um novo módulo.

```js
import { Button, TextField } from '@mui/material';
```

No entanto, você precisa aplicar as duas etapas seguintes corretamente.

#### 1. Configure o Babel

Escolha um dos seguintes plugins:

- [babel-plugin-import](https://github.com/umijs/babel-plugin-import) with the following configuration:

  `yarn add -D babel-plugin-import`

  Crie um arquivo `.babelrc.js` no diretório raiz do seu projeto:

  ```js
  const plugins = [
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ];

  module.exports = { plugins };
  ```

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) com a seguinte configuração:

  `yarn add -D babel-plugin-transform-imports`

  Crie um arquivo `.babelrc.js` no diretório raiz do seu projeto:

  ```js
  const plugins = [
    [
      'babel-plugin-transform-imports',
      {
        '@material-ui/core': {
          transform: '@material-ui/core/${member}',
          preventFullImport: true,
        },
        '@material-ui/icons': {
          transform: '@material-ui/icons/${member}',
          preventFullImport: true,
        },
      },
    ],
  ];

  module.exports = { plugins };
  ```

Se você estiver usando Create React App, você precisará usar alguns projetos que permitem a configuração por `.babelrc`, sem ejetar.

`yarn add -D react-app-rewired customize-cra`

Crie um arquivo `config-overrides.js` na pasta raiz:

```js
/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());
```

Se você desejar, `babel-plugin-import` pode ser configurado através de `config-overrides.js` ao invés de `.babelrc` usando esta [configuração](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options).

Modifique seu comando start no `package.json`:

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

Desfrute do tempo de inicialização significativamente mais rápido.

#### 2. Converta todas as suas importações

Finalmente, você pode converter sua base de código existente com esse [codemod top-level-imports](https://www.npmjs.com/package/@material-ui/codemod#top-level-imports). Ele executará as seguintes alterações:

```diff
-import Button from '@mui/material/Button';
-import TextField from '@mui/material/TextField';
+import { Button, TextField } from '@mui/material';
```

## Pacotes disponíveis

The package published on npm is **transpiled**, with [Babel](https://github.com/babel/babel), to take into account the [supported platforms](/material-ui/getting-started/supported-platforms/).

⚠️ Para minimizar a duplicação de código nos pacotes de usuários, autores de biblioteca são **fortemente desencorajados** a importar de qualquer um dos outros pacotes. Otherwise it's not guaranteed that dependencies used also use legacy or modern bundles. Instead, use these bundles at the bundler level with e.g [Webpack's `resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias):

```js
{
  resolve: {
    alias: {
      '@mui/base': '@mui/base/legacy',
      '@mui/lab': '@mui/lab/legacy',
      '@mui/material': '@mui/material/legacy',
      '@mui/styled-engine': '@mui/styled-engine/legacy',
      '@mui/system': '@mui/system/legacy',
      '@mui/utils': '@mui/utils/legacy',
    }
  }
}
```

### Pacote moderno

O pacote moderno pode ser encontrado sob a [pasta `/modern`](https://unpkg.com/@material-ui/core/modern/). Ela tem como alvo as versões mais recentes de navegadores evergreen (Chrome, Firefox, Safari, Edge). Isso pode ser usado para criar pacotes separados visando diferentes navegadores.

### Pacote legado

Se você precisar suportar o IE 11, você não pode usar o pacote padrão ou moderno sem transpilação. No entanto, você pode usar o pacote legado encontrado sob [pasta `/legacy`](https://unpkg.com/@material-ui/core/legacy/). Você não precisa de nenhum polyfill adicional.
