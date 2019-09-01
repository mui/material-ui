# Testando

<p class="description">Escreva testes para evitar regressões e ter uma boa qualidade de código.</p>

Exemplos neste guia usam [métodos globais do Mocha](https://mochajs.org/api/global.html), ao invés do [Jest](https://jestjs.io/docs/en/api).

## Interno

Material-UI has a wide **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) have proven to be really helpful. To learn more about the internal tests, you can have a look at the [README](https://github.com/mui-org/material-ui/blob/master/test/README.md).

## Espaço do usuário

What about writing tests in userspace? The Material-UI styling infrastructure uses some helper functions built on top of [enzyme](https://github.com/airbnb/enzyme) to make the process easier, which we are exposing. You can take advantage of them if you so choose. We use almost exclusively full DOM rendering APIs. We encourage you to do the same especially if your components rely on custom themes. Tests using shallow rendering APIs become more brittle with the amount of provider components they require.

### Renderização completa do DOM (Full)

Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs or may require the full lifecycle in order to fully test the component (e.g., `componentDidMount` etc.).

The `createMount()` function is provided for this situation. Aside from wrapping the enzyme API, it provides a `cleanUp` function.

### Renderização Rasa (Shallow)

Shallow rendering is useful to constrain your testing to a component as a unit. This also ensures that your tests aren't indirectly asserting behavior of child components. Shallow rendering was created to test components in isolation. This means without leaking child implementation details such as the context.

The `createShallow()` function can be used for this situation. Aside from wrapping the enzyme API, it provides a `dive` and `untilSelector` option.

### Renderizar para string

Rendering to a string is useful to test the behavior of the components that are used on the server. You can take advantage of this to assert the generated HTML string.

The `createRender()` function is ideal for this. This is just an alias for the enzyme API, which is only exposed for consistency.

## API

### `createMount([options]) => mount`

Generate an enhanced mount function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/mount.html) for further details on the `mount` function.

#### Argumentos

1. `options` (*Object* [optional]) 
  - `options.mount` (*Function* [opcional]): A função de montagem para melhorar, usa **enzyme por padrão**.
  - As outras chaves são encaminhadas para o argumento de opções de `enzyme.mount()`.

#### Retornos

`mount` (*mount*): A mount function.

#### Exemplos

```jsx
import { createMount } from '@material-ui/core/test-utils';
import { MuiThemeProvider } from '@material-ui/core/styles';

describe('<MyComponent />', () => {
  let mount;

  function MySuccessButton({ children }) {
    return (
      <MuiThemeProvider theme={{ success: { main: '#fff' } }}>
        {children}
      </MuiThemeProvider>
    );
  }

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = mount(<MockedTheme><MySuccessButton /></MockedTheme>);
  });
});
```

### `createShallow([options]) => shallow`

Generate an enhanced shallow function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/shallow.html) for further details on the `shallow` function.

#### Argumentos

1. `options` (*Object* [optional]) 
  - `options.shallow` (*Function* [opcional]): A função superficial para melhorar, usa **enzyme por padrão**.
  - `options.untilSelector` (*String* [opcional]): Recursivamente, renderiza superficialmente o componente children até encontrar o seletor fornecido. É útil para detalhar os componentes de ordem mais alta.
  - `options.dive` (*Boolean* [opcional]): A função superficial renderiza o filho não-DOM do wrapper atual e retorna um wrapper em torno do resultado.
  - As outras chaves são encaminhadas para o argumento de opções de `enzyme.shallow()`.

#### Retornos

`shallow` (*shallow*): A shallow function.

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

### `createRender([options]) => render`

Generate a render to string function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/render.html) for further details on the `render` function.

#### Argumentos

1. `options` (*Object* [optional]) 
  - `options.render` (*Function* [opcional]): A função de renderização para melhorar, usa **enzyme por padrão**.
  - As outras chaves são encaminhadas para o argumento de opções de `enzyme.render()`.

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

  it('deve funionar', () => {
    const wrapper = render(<MyComponent />);
  });
});
```