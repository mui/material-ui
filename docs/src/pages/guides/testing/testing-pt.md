# Testando

<p class="description">Escreva testes para evitar regressões e ter uma boa qualidade de código.</p>

Exemplos neste guia usam [métodos globais do Mocha](https://mochajs.org/api/global.html), ao invés do [Jest](https://jestjs.io/docs/en/api).

## Interno

Nós levamos os testes a sério. Nós escrevemos e mantemos **uma vasta gama** de testes para que possamos iterar os componentes com confiança, por exemplo, os testes de regressão visual fornecidos por [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) provaram ser realmente úteis. Para saber mais sobre nossos testes internos, você pode dar uma olhada no [LEIA-ME](https://github.com/mui-org/material-ui/blob/master/test/README.md).

Embora tenhamos atingido a conquista de 100% de cobertura de teste, não incentivamos nossos usuários a fazer o mesmo. [![Taxa de Cobertura](https://img.shields.io/codecov/c/github/mui-org/material-ui/master.svg)](https://codecov.io/gh/mui-org/material-ui/branch/master)

## Espaço do usuário

Que tal escrever testes no espaço do usuário? A infraestrutura de estilos do Material-UI usa algumas funções auxiliares construídas sobre o [enzyme](https://github.com/airbnb/enzyme) para facilitar o processo, ao qual estamos expondo. Você pode aproveitá-los, se assim preferir.

### Renderização Rasa (Shallow)

A renderização rasa é útil para restringir seu teste a um componente como uma unidade. Isso também garante que seus testes não estão adquirindo indiretamente o comportamento de componentes filhos. A renderização rasa foi criada para testar componentes isoladamente. Isso significa sem vazar detalhes de implementação de filhos, como o contexto.

A função `createShallow()` pode ser utilizada para esta situação. Além de encapsular a API do enzyme, ela fornece uma opção `dive` e `untilSelector`.

### Renderização completa do DOM (Full)

A renderização total do DOM é ideal para casos em que você tem componentes que podem interagir com as APIs do DOM, ou podem exigir o ciclo de vida completo para testar completamente o componente (por exemplo, `componentDidMount` etc).

A função `createMount ()` é fornecida para esta situação. Além de envolver enzyme API, ela fornece uma função chamada `cleanUp`.

### Renderizar para string

Renderizar em uma string é útil para testar o comportamento dos componentes usados no servidor. Você pode aproveitar isso para confirmar a sequência HTML gerada.

A função `createRender()` é ideal para isso. Isso é apenas um alias para enzyme API, que é apenas exposta para consistência.

## API

### `createShallow([options]) => shallow`

Gere uma função superficial aprimorada com o contexto necessário. Por favor, consulte [a documentação da API enzyme ](https://airbnb.io/enzyme/docs/api/shallow.html) para mais detalhes sobre a função `shallow`.

#### Argumentos

1. `options` (*Object* [opcional]) 
    - `options.shallow` (*Function* [opcional]): A função superficial para melhorar, usa **enzyme por padrão**.
    - `options.untilSelector` (*String* [opcional]): Recursivamente, renderiza superficialmente o componente children até encontrar o seletor fornecido. É útil para detalhar os componentes de ordem mais alta.
    - `options.dive` (*Boolean* [opcional]): A função superficial renderiza o filho não-DOM do wrapper atual e retorna um wrapper em torno do resultado.
    - As outras chaves são encaminhadas para o argumento de opções de `enzyme.shallow()`.

#### Retornos

`shallow` (*shallow*): A função shallow.

#### Exemplos

```jsx
import { createShallow } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let shallow;

  before(() => {  // Isto é Mocha; em Jest, use beforeAll
    shallow = createShallow();
  });

  it('deve funcionar', () => {
    const wrapper = shallow(<MyComponent />);
  });
});
```

### `createMount([options]) => mount`

Gere uma função de montagem aprimorada com o contexto necessário. Por favor, consulte [a documentação da API enzyme ](https://airbnb.io/enzyme/docs/api/mount.html) para mais detalhes sobre a função `mount`.

#### Argumentos

1. `options` (*Object* [opcional]) 
    - `options.mount` (*Function* [opcional]): A função de montagem para melhorar, usa **enzyme por padrão**.
    - As outras chaves são encaminhadas para o argumento de opções de `enzyme.mount()`.

#### Retornos

`mount` (*mount*): A função mount.

#### Exemplos

```jsx
import { createMount } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = mount(<MyComponent />);
  });
});
```

### `createRender([options]) => render`

Gere uma função de render para string com o contexto necessário. Por favor, consulte [a documentação da API enzyme ](https://airbnb.io/enzyme/docs/api/render.html) para mais detalhes sobre a função `render`.

#### Argumentos

1. `options` (*Object* [opcional]) 
    - `options.render` (*Function* [opcional]): A função de renderização para melhorar, usa **enzyme por padrão**.
    - As outras chaves são encaminhadas para o argumento de opções de `enzyme.render()`.

#### Retornos

`render` (*Function*): Uma função render para string.

#### Exemplos

```jsx
import { createRender } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let render;

  before(() => {
    render = createRender();
  });

  it('deve funionar', () => {
    const wrapper = render(<MyComponent />);
  });
});
```