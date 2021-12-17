# Minimizing bundle size

<p class="description">Saiba mais sobre as ferramentas que você pode usar para reduzir o tamanho do pacote.</p>

## Tamanho do pacote importa

The bundle size of MUI is taken very seriously. Fotos contendo o tamanho do pacote são feitas em cada commit e partes críticas dos pacotes([veja a última foto](/size-snapshot)). Combinado com [dangerJS](https://danger.systems/js/) podemos inspecionar [alterações detalhadas no tamanho do pacote](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) em cada solicitação de Pull Request.

## Quando e como usar tree-shaking?

Tree-shaking of MUI works out of the box in modern frameworks. MUI exposes its full API on the top-level `material-ui` import. If you're using ES6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and still get an optimized bundle size automatically:

```js
import { Button, TextField } from '@mui/material';
```

⚠️ As instruções a seguir são somente necessárias se você deseja otimizar o tempo de startup em desenvolvimento ou se você esta utilizando um bundler antigo que não suporte tree-shaking.

## Ambiente de desenvolvimento

Os pacotes de desenvolvimento podem conter a biblioteca completa que pode deixar **o tempo de inicialização mais lento**. This is especially noticeable if you import from `@mui/icons-material`. Os tempos de inicialização podem ser aproximadamente 6 vezes mais lentos do que sem utilizar importações nomeadas da API de nível superior.

Se isso é um problema para você, tem várias opções:

### Opção 1

Você pode usar as importações de caminho para evitar puxar módulos não utilizados. Por exemplo, use:

```js
// 🚀 Fast
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
```

instead of top-level imports (without a Babel plugin):

```js
import { Button, TextField } from '@mui/material';
```

This is the option we document in all the demos since it requires no configuration. It is encouraged for library authors that are extending the components. Vá até [Opção 2](#option-2) para uma abordagem que produz uma melhor DX e UX.

While importing directly in this manner doesn't use the exports in [the main file of `@mui/material`](https://unpkg.com/@mui/material), this file can serve as a handy reference as to which modules are public.

Be aware that we only support first and second-level imports. Qualquer coisa em níveis mais profundos é considerado privado e pode causar problemas, como a duplicação de módulos em seu pacote.

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

Se você estiver usando `eslint` você pode capturar está problemática de importações com a regra [`no-restricted-imports`](https://eslint.org/docs/rules/no-restricted-imports). The following `.eslintrc` configuration will highlight problematic imports from `@mui` packages:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*", "!@mui/material/test-utils/*"]
      }
    ]
  }
}
```

### Opção 2

Esta opção fornece a melhor Experiência do Usuário e Experiência do Desenvolvedor:

- UX: The Babel plugin enables top-level tree-shaking even if your bundler doesn't support it.
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
        libraryName: '@mui/material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@mui/icons-material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ];

  module.exports = { plugins };
  ```

- [babel-plugin-direct-import](https://github.com/umidbekk/babel-plugin-direct-import) with the following configuration:

  `yarn add -D babel-plugin-direct-import`

  Create a `.babelrc.js` file in the root directory of your project:

  ```js
  const plugins = [
    [
      'babel-plugin-direct-import',
      { modules: ['@mui/material', '@mui/icons-material'] },
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

Finally, you can convert your existing codebase to this option with this [top-level-imports codemod](https://www.npmjs.com/package/@mui/codemod#top-level-imports). Ele executará as seguintes alterações:

```diff
-import Button from '@mui/material/Button';
-import TextField from '@mui/material/TextField';
+import { Button, TextField } from '@mui/material';
```

## Pacotes disponíveis

O pacote publicado no npm é **transpilado** com [Babel](https://github.com/babel/babel), para levar em consideração as [plataformas suportadas](/getting-started/supported-platforms/).

⚠️ Developers are **strongly discouraged** to import from any of the other bundles directly. Otherwise it's not guaranteed that dependencies used also use legacy or modern bundles. Instead, use these bundles at the bundler level with e.g [Webpack's `resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias):

```js
{
  resolve: {
    alias: {
      '@mui/base': '@mui/base/legacy',
      '@mui/lab': '@mui/lab/legacy',
      '@mui/material': '@mui/material/legacy',
      '@mui/styled-engine': '@mui/styled-engine/legacy',
      '@mui/system': '@mui/system/legacy',
    }
  }
}
```

### Pacote moderno

The modern bundle can be found under the [`/modern` folder](https://unpkg.com/@mui/material/modern/). Ela tem como alvo as versões mais recentes de navegadores evergreen (Chrome, Firefox, Safari, Edge). Isso pode ser usado para criar pacotes separados visando diferentes navegadores.

### Pacote legado

Se você precisar suportar o IE 11, você não pode usar o pacote padrão ou moderno sem transpilação. However, you can use the legacy bundle found under the [`/legacy` folder](https://unpkg.com/@mui/material/legacy/). Você não precisa de nenhum polyfill adicional.
