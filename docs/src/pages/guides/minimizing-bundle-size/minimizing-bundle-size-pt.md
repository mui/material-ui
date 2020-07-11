# Minimizando o tamanho do pacote

<p class="description">Saiba mais sobre as ferramentas que você pode usar para reduzir o tamanho do pacote.</p>

## Tamanho do pacote importa

O tamanho do pacote do Material-UI é levado muito a sério. Fotos contendo o tamanho do pacote são feitas em cada commit e partes críticas dos pacotes([veja a última foto](/size-snapshot)). Combinado com [dangerJS](https://danger.systems/js/) podemos inspecionar [alterações detalhadas no tamanho do pacote](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) em cada solicitação de Pull Request.

## Quando e como usar tree-shaking?

Tree-shaking no Material-UI funciona de uma forma moderna. Material-UI expõe sua API completa na importação de nível superior `material-ui`. Se você estiver usando módulos ES6 e um bundler que suporta tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` com uma propriedade definida](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) você pode usar com segurança importações nomeadas e ainda assim, obter automaticamente um tamanho otimizado do pacote:

```js
import { Button, TextField } from '@material-ui/core';
```

⚠️ As instruções a seguir são somente necessárias se você deseja otimizar o tempo de startup em desenvolvimento ou se você esta utilizando um bundler antigo que não suporte tree-shaking.

## Ambiente de desenvolvimento

Os pacotes de desenvolvimento podem conter a biblioteca completa que pode deixar **o tempo de inicialização mais lento**. Isso é especialmente perceptível se você importar de `@material-ui/icons`. Os tempos de inicialização podem ser aproximadamente 6 vezes mais lentos do que sem utilizar importações nomeadas da API de nível superior.

Se isso é um problema para você, tem várias opções:

### Opção 1

Você pode usar as importações de caminho para evitar puxar módulos não utilizados. Por exemplo, use:

```js
// 🚀 Rápida
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

em vez de importações de nível superior (sem um plugin do Babel):

```js
import { Button, TextField } from '@material-ui/core';
```

Esta é a opção que apresentamos em todas as demonstrações, pois não exige qualquer configuração. É o mais recomendável para autores de biblioteca que estendem os componentes. Vá até [Opção 2](#option-2) para uma abordagem que produz uma melhor DX e UX.

Ao importar diretamente dessa maneira acima, não utiliza as exportações em [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js), esse arquivo pode servir como uma referência útil para quais módulos são públicos.

Esteja ciente de que apenas damos suporte para as importações de primeiro e segundo nível. Qualquer coisa em níveis mais profundos é considerado privado e pode causar problemas, como a duplicação de módulos em seu pacote.

```js
// ✅ OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1° ou nível superior

// ✅ OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2° nível

// ❌ NÃO OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3° nível
```

Se você estiver usando `eslint` você pode capturar está problemática de importações com a regra [`no-restricted-imports`](https://eslint.org/docs/rules/no-restricted-imports). A configuração `.eslintrc` a seguir irá capturar as problemáticas das importações dos pacotes `@material-ui`:

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

### Opção 2

Esta opção fornece a melhor Experiência do Usuário e Experiência do Desenvolvedor:

- UX: O plugin Babel permite tree-shaking de nível superior, mesmo se o seu bundler não suporte.
- DX: O plugin Babel torna o tempo de inicialização no modo de desenvolvimento tão rápido quanto a opção 1.
- DX: Essa sintaxe reduz a duplicação de código, exigindo apenas uma única importação para vários módulos. Em geral, o código é mais fácil de ser lido, e é menos provável que você cometa um erro ao importar um novo módulo.
```js
import { Button, TextField } from '@material-ui/core';
```

No entanto, você precisa aplicar as duas etapas seguintes corretamente.

#### 1. Configure o Babel

Escolha um dos seguintes plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) com a seguinte configuração:

  `yarn add -D babel-plugin-import`

  Crie um arquivo `.babelrc.js` no diretório raiz do seu projeto:

  ```js
  const plugins = [
    [
      'babel-plugin-import',
      {
        'libraryName': '@material-ui/core',
        // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
        'libraryDirectory': 'esm',
        'camel2DashComponentName': false
      },
      'core'
    ],
    [
      'babel-plugin-import',
      {
        'libraryName': '@material-ui/icons',
        // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
        'libraryDirectory': 'esm',
        'camel2DashComponentName': false
      },
      'icons'
    ]
  ];

  module.exports = {plugins};
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
          // Use "transform: '@material-ui/core/${member}'," se o seu bundler não suportar módulos ES
          'transform': '@material-ui/core/esm/${member}',
          'preventFullImport': true
        },
        '@material-ui/icons': {
          // Use "transform: '@material-ui/icons/${member}'," se o seu bundler não suportar módulos ES
          'transform': '@material-ui/icons/esm/${member}',
          'preventFullImport': true
        }
      }
    ]
  ];

  module.exports = {plugins};
  ```

Se você estiver usando Create React App, você precisará usar alguns projetos que permitem a configuração por `.babelrc`, sem ejetar.

  `yarn add -D react-app-rewired customize-cra`

  Crie um arquivo `config-overrides.js` na pasta raiz:

  ```js
  /* config-overrides.js */
  const { useBabelRc, override } = require('customize-cra')

  module.exports = override(
    useBabelRc()
  );
  ```

  Se você desejar, `babel-plugin-import` pode ser configurado através de `config-overrides.js` ao invés de `.babelrc` usando esta [configuração](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options).

  Modifique seu comando start no `package.json`:

```diff
  "scripts": {
-  "start": "react-scripts start"
+  "start": "react-app-rewired start"
  }
```

  Nota: Você pode se deparar com erros como estes:

  > Module not found: Can't resolve '@material-ui/core/makeStyles' in '/seu/projeto'

  Isso acontece porque `@material-ui/styles` é reexportado através do `core`, mas a importação completa não é permitida.

  Você tem uma importação como essa no seu código:

  ```js
  import { makeStyles, createStyles } from '@material-ui/core';
  ```

  A correção é simples, defina a importação separadamente:

  ```js
  import { makeStyles, createStyles } from '@material-ui/core/styles';
  ```

  Desfrute do tempo de inicialização significativamente mais rápido.

#### 2. Converta todas as suas importações

Finalmente, você pode converter sua base de código existente com esse modificador de código [top-level-imports](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-codemod/README.md#top-level-imports). Ele executará as seguintes alterações:

```diff
-import Button from '@material-ui/core/Button';
-import TextField from '@material-ui/core/TextField';
+import { Button, TextField } from '@material-ui/core';
```

## ECMAScript

O pacote publicado no npm é **transpilado** com [Babel](https://github.com/babel/babel), para levar em consideração as [plataformas suportadas](/getting-started/supported-platforms/).

Uma segunda versão dos componentes é também publicada, essa versão pode ser encontrada na [pasta `/es`](https://unpkg.com/@material-ui/core/es/). Toda a sintaxe não oficial é transpilada para o [padrão ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm), nada mais. Isso pode ser usado para criar pacotes separados visando diferentes navegadores. Os navegadores mais antigos exigem mais recursos JavaScript para serem transpilados, o que aumenta o tamanho do pacote. Nenhum polyfill está incluído para os recursos de tempo de execução do ES2015. IE11+ e navegadores evergreen suportam todos os recursos necessários. Se você precisar de suporte para outros navegadores, considere usar [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill).

⚠️ Para minimizar a duplicação de código nos pacotes de usuários, autores de bibliotecas são **fortemente desencorajados** de usar a pasta `/es`.
