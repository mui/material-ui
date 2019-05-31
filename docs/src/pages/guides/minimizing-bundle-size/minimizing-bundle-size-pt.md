# Minimizando o tamanho do pacote

<p class="description">Saiba mais sobre as ferramentas que você pode aproveitar para reduzir o tamanho do pacote.</p>

## Tamanho do pacote importa

O tamanho do pacote de Material-UI é levado muito a sério. Tiramos snapshots de tamanho em cada commit, para cada pacote e partes críticas desses pacotes ([veja o último snapshot](/size-snapshot)). Combinado com [dangerJS](https://danger.systems/js/) podemos inspecionar [alterações detalhadas no tamanho do pacote](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) em cada solicitação de Pull Request.

## Como reduzir o tamanho do pacote?

Por conveniência, o Material-UI expõe sua API completa em nível superior na importação de `material-ui`. Se você estiver usando módulos ES 6 e um empacotador que suporte [tree-shaking](https://pt.stackoverflow.com/a/317844) ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` com a opção](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)), você pode seguramente usar importações nomeadas e ter apenas um conjunto mínimo de componentes do Material-UI em seu pacote:

```js
import { Button, TextField } from '@material-ui/core';
```

Esteja ciente que tree-shaking é uma otimização, que geralmente é aplicada somente aos pacotes de produção. Pacotes de desenvolvimento irá conter a biblioteca completa, que pode levar tempos de inicialização mais lentos. Isso é especialmente perceptível se você importar de `@material-ui/icons`. Os tempos de inicialização podem ser aproximadamente 6 vezes mais lentos do que sem utilizar importações nomeadas da API de nível superior.

Se isso é um problema para você, você tem várias opções:

### Opção 1

Você pode usar as importações de caminho para evitar a extração de módulos não utilizados. Por exemplo, em vez de:

```js
import { Button, TextField } from '@material-ui/core';
```

use:

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

Ao importar diretamente dessa maneira, não utiliza as exportações em [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js), esse arquivo pode servir como uma referência útil para quais módulos são públicos.

Esteja ciente de que apenas damos suporte para as importações de primeiro e segundo níveis. Qualquer coisa abaixo do segundo nível, é considerada privada e pode causar duplicação de módulo no seu pacote.

```js
// OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1º ou nível superior

// OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2º nível

// NÃO OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3º nível
```

### Opção 2

**Nota importante**: Isso é suportado apenas por `@material-ui/icons`. Recomendamos essa abordagem se você frequentemente reiniciar sua compilação de desenvolvimento.

Outra opção é continuar usando importações nomeadas, podemos então melhorar o tempo de inicialização usando plugins `babel`.

Escolha um dos seguintes plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) com a seguinte configuração: 
        js
        [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm', // ou '' se o seu empacotador não suportar módulos ES
          camel2DashComponentName: false,
        },
        ];

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-import) tem uma api diferente de `babel-plugin-import`, mas faz a mesma coisa. 
        js
        [
        'transform-imports',
        {
          '@material-ui/icons': {
            transform: '@material-ui/icons/esm/${member}',
            // para empacotador que não suporta módulos ES:
            // transform: '@material-ui/icons/${member}',
          },
        },
        ];

## ECMAScript

O pacote publicado no npm é **transpilado**, com [Babel](https://github.com/babel/babel), para levar em consideração as [plataformas suportadas](/getting-started/supported-platforms/).

Também publicamos uma segunda versão dos componentes. Você pode encontrar esta versão sob a [pasta `/es`](https://unpkg.com/@material-ui/core@next/es/). Toda a sintaxe não oficial é transpilada para o padrão [ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm), nada mais. Isso pode ser usado para criar pacotes separados visando diferentes navegadores. Os navegadores mais antigos exigem mais recursos JavaScript para serem transpilados, o que aumenta o tamanho do pacote. Nenhum polyfill está incluído para os recursos de tempo de execução do ES2015. IE11+ e navegadores evergreen suportam todos os recursos necessários. Se você precisar de suporte para outros navegadores, considere usar [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill).

⚠️ Para minimizar a duplicação de código nos pacotes dos usuários, nós **desencorajamos fortemente** autores de bibliotecas de usar a pasta `/es`.