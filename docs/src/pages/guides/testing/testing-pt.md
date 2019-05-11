# Testando

<p class="description">Escrever os testes para impedir retrocessos e escrever um código melhor.</p>

Exemplos neste guia de uso [métodos globais de Mocha](https://mochajs.org/api/global.html), não [Jest](https://jestjs.io/docs/en/api).

## Interno

Nós levamos os testes a sério. Nós escrevemos e mantemos ** uma vasta gama ** de testes para que possamos iterar os componentes com confiança, por exemplo, os testes de regressão visual fornecidos por [ Argos-CI ](https://www.argos-ci.com/mui-org/material-ui) provaram ser realmente úteis. Para saber mais sobre nossos testes internos, você pode dar uma olhada no [ LEIA-ME ](https://github.com/mui-org/material-ui/blob/next/test/README.md).

Embora tenhamos atingido a conquista de 100% de cobertura de teste, não incentivamos nossos usuários a fazer o mesmo. [![Coverage Status](https://img.shields.io/codecov/c/github/mui-org/material-ui/next.svg)](https://codecov.io/gh/mui-org/material-ui/branch/next)

## Userspace

Que tal escrever testes no userspace? The Material-UI styling infrastructure uses some helper functions built on top of [enzyme](https://github.com/airbnb/enzyme) to make the process easier, which we are exposing. Você pode aproveitá-los, se assim preferir.

### Shallow rendering

Shallow rendering is useful to constrain your testing to a component as a unit. This also ensures that your tests aren't indirectly asserting behavior of child components. Shallow rendering was created to test components in isolation. This means without leaking child implementation details such as the context.

A função `createShallow()` pode ser utilizada para esta situação. Aside from wrapping the enzyme API, it provides a `dive` and `untilSelector` option.

### Full DOM rendering

Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs or may require the full lifecycle in order to fully test the component (e.g., `componentDidMount` etc.).

A função `createMount ()` é fornecida para esta situação. Além de envolver enzyme API, ela fornece uma função chamada `cleanUp`.

### Render to string

Rendering to a string is useful to test the behavior of the components that are used on the server. You can take advantage of this to assert the generated HTML string.

A função `createRender()` é ideal para isso. Isso é apenas um alias para enzyme API, que é apenas exposta para consistência.

## API

### `createShallow([options]) => shallow`

Generate an enhanced shallow function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/shallow.html) for further details on the `shallow` function.

#### Argumentos

1. `options` (*Object* [optional]) 
    - `options.shallow` (*Function* [optional]): The shallow function to enhance, it uses **enzyme by default**.
    - `options.untilSelector` (*String* [optional]): Recursively shallow renders the children until it can find the provided selector. It's useful to drill down higher-order components.
    - `options.dive` (*Boolean* [optional]): Shallow render the one non-DOM child of the current wrapper, and return a wrapper around the result.
    - The other keys are forwarded to the options argument of `enzyme.shallow()`.

#### Retornos

`shallow` (*shallow*): A função shallow.

#### Exemplos

```jsx
import { createShallow } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let shallow;

  before(() => {  // This is Mocha; in Jest, use beforeAll
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<MyComponent />);
  });
});
```

### `createMount([options]) => mount`

Generate an enhanced mount function with the needed context. Por favor, consulte [enzyme API documentation](https://airbnb.io/enzyme/docs/api/mount.html) para mais detalhes sobre o `suporte ` função.

#### Argumentos

1. `options` (*Object* [optional]) 
    - `options.mount` (*Function* [optional]): The mount function to enhance, it uses **enzyme by default**.
    - The other keys are forwarded to the options argument of `enzyme.mount()`.

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

Generate a render to string function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/render.html) for further details on the `render` function.

#### Argumentos

1. `options` (*Object* [optional]) 
    - `options.render` (*Function* [optional]): The render function to enhance, it uses **enzyme by default**.
    - The other keys are forwarded to the options argument of `enzyme.render()`.

#### Retornos

`render` (*Function*): A render to string function.

#### Exemplos

```jsx
import { createRender } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let render;

  before(() => {
    render = createRender();
  });

  it('should work', () => {
    const wrapper = render(<MyComponent />);
  });
});
```