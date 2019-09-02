# Minimizando o tamanho do pacote

<p class="description">Saiba mais sobre as ferramentas que você pode aproveitar para reduzir o tamanho do pacote.</p>

## Tamanho do pacote importa

O tamanho do pacote de Material-UI é levado muito a sério. We take size snapshots on every commit for every package and critical parts of those packages ([view the latest snapshot](/size-snapshot)). Combinado com [dangerJS](https://danger.systems/js/) podemos inspecionar [alterações detalhadas no tamanho do pacote](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) em cada solicitação de Pull Request.

## Como reduzir o tamanho do pacote?

Por conveniência, o Material-UI expõe sua API completa em nível superior na importação de `material-ui`. If you're using ES6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and expect only a minimal set of Material-UI components in your bundle:

```js
import { Button, TextField } from '@material-ui/core';
```

⚠️ Be aware that tree-shaking is an optimization that is usually only applied to production bundles. Development bundles will contain the full library which can lead to **slower startup times**. Isso é especialmente perceptível se você importar de `@material-ui/icons`. Os tempos de inicialização podem ser aproximadamente 6 vezes mais lentos do que sem utilizar importações nomeadas da API de nível superior.

Se isso é um problema para você, você tem várias opções:

### Opção 1

Você pode usar as importações de caminho para evitar a extração de módulos não utilizados. Por exemplo, em vez de:

```js
import { Button, TextField } from '@material-ui/core';
```

use:

```js
// 🚀 Fast
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

This is the option we document in **all** the demos because it requires no configuration. We encourage it for library authors extending our components. Head to [Option 2](#option-2) for the approach that yields the best DX and UX.

Ao importar diretamente dessa maneira, não utiliza as exportações em [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js), esse arquivo pode servir como uma referência útil para quais módulos são públicos.

Esteja ciente de que apenas damos suporte para as importações de primeiro e segundo nível. Qualquer coisa abaixo do segundo nível, é considerada privada e pode causar duplicação de módulo no seu pacote.

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

### Opção 2

This option provides the best DX and UX. However, you need to apply the following steps correctly.

#### 1. Configure Babel

Escolha um dos seguintes plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) with the following configuration:
    
    `yarn add -D babel-plugin-import`
    
    Create a `.babelrc.js` file in the root directory of your project:

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

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) with the following configuration:

  `yarn add -D babel-plugin-transform-imports`

  Create a `.babelrc.js` file in the root directory of your project:

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

If you are using Create React App, you will need to use a couple of projects that let you use `.babelrc` configuration, without ejecting. 

  `yarn add -D react-app-rewired customize-cra`

  Create a `config-overrides.js` file in the root directory:

  ```js
  /* config-overrides.js */
  const { useBabelRc, override } = require('customize-cra')

  module.exports = override(
    useBabelRc()
  );  
  ```

  If you wish, `babel-plugin-import` can be configured through `config-overrides.js` instead of `.babelrc` by using this [configuration](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options).

  Modify your `package.json` start command:

```diff
  "scripts": {
-  "start": "react-scripts start"
+  "start": "react-app-rewired start"
  }
```

    Note: You may run into errors like these:
    

        Module not found: Can't resolve '@material-ui/core/makeStyles' in '/your/project'
        Module not found: Can't resolve '@material-ui/core/createStyles' in '/your/project'
      ```
    
      This is because `@material-ui/styles` is re-exported through `core`, but the full import is not allowed.
    
      You have an import like this in your code:
    
      `import {makeStyles, createStyles} from '@material-ui/core';`
    
      The fix is simple, define the import separately:
    
      `import {makeStyles, createStyles} from '@material-ui/core/styles';`
    
      Enjoy significantly faster start times.
    
    #### 2. Convert all your imports
    
    Finally, you can convert your exisiting codebase to this option with our [top-level-imports](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-codemod/README.md#top-level-imports) codemod.
    It will perform the following diffs:
    
    ```diff
    -import Button from '@material-ui/core/Button';
    -import TextField from '@material-ui/core/TextField';
    +import { Button, TextField } from '@material-ui/core';
    

## ECMAScript

O pacote publicado no npm é **transpilado**, com [Babel](https://github.com/babel/babel), para levar em consideração as [plataformas suportadas](/getting-started/supported-platforms/).

Também publicamos uma segunda versão dos componentes. Você pode encontrar esta versão sob a [pasta `/es`](https://unpkg.com/@material-ui/core/es/). Toda a sintaxe não oficial é transpilada para o padrão [ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm), nada mais. Isso pode ser usado para criar pacotes separados visando diferentes navegadores. Os navegadores mais antigos exigem mais recursos JavaScript para serem transpilados, o que aumenta o tamanho do pacote. Nenhum polyfill está incluído para os recursos de tempo de execução do ES2015. IE11+ e navegadores evergreen suportam todos os recursos necessários. Se você precisar de suporte para outros navegadores, considere usar [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill).

⚠️ Para minimizar a duplicação de código nos pacotes dos usuários, nós **desencorajamos fortemente** autores de bibliotecas de usar a pasta `/es`.