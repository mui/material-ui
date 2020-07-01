# テスト

<p class="description">テスト書いて、リグレッションを防ぎ、より良いコードを作成します。</p>

このガイドの例では、Mochaの[グローバルメソッドを使用しています](https://mochajs.org/api/global.html) 、[ Jestではありません](https://jestjs.io/docs/en/api) 。

## Internal

To learn more about the internal tests, you can have a look at the [README](https://github.com/mui-org/material-ui/blob/master/test/README.md). Material-UI has **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) have proven to be really helpful.

## Userspace

What about writing tests in userspace? The Material-UI styling infrastructure uses some helper functions built on top of [enzyme](https://github.com/airbnb/enzyme) to make the process easier, which we are exposing. You can take advantage of them if you so choose. We use almost exclusively full DOM rendering APIs. We encourage you to do the same especially if your components rely on custom themes. Tests using shallow rendering APIs become more brittle with the amount of provider components they require.

### Full DOM rendering

Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs or may require the full lifecycle in order to fully test the component (e.g., `componentDidMount` etc.).

The `createMount()` function is provided for this situation. Aside from wrapping the enzyme API, it provides a `cleanUp` function.

### Shallow rendering

Shallow rendering is useful to constrain your testing to a component as a unit. This also ensures that your tests aren't indirectly asserting behavior of child components. Shallow rendering was created to test components in isolation. This means without leaking child implementation details such as the context.

The `createShallow()` function can be used for this situation. Aside from wrapping the enzyme API, it provides a `dive` and `untilSelector` option.

### Render to string

Rendering to a string is useful to test the behavior of the components that are used on the server. You can take advantage of this to assert the generated HTML string.

The `createRender()` function is ideal for this. This is just an alias for the enzyme API, which is only exposed for consistency.

## API

### `createMount([options]) => mount`

Generate an enhanced mount function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/mount.html) for further details on the `mount` function.

#### 引数

1. `オプション` (*オプジェクト* [任意]) 
  - `options.mount` (*Function* [optional]): The mount function to enhance, it uses **enzyme by default**.
  - The other keys are forwarded to the options argument of `enzyme.mount()`.

#### 戻り値

`mount` (*mount*): A mount function.

#### 例

```jsx
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';

describe('<MyComponent />', () => {
  let mount;

  function MySuccessButton({ children }) {
    return (
      <ThemeProvider theme={{ success: { main: '#fff' } }}>
        {children}
      </ThemeProvider>
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

#### 引数

1. `オプション` (*オプジェクト* [任意]) 
  - `options.shallow` (*Function* [optional]): The shallow function to enhance, it uses **enzyme by default**.
  - `options.untilSelector` (*String* [optional]): Recursively shallow renders the children until it can find the provided selector. It's useful to drill down higher-order components.
  - `options.dive` (*Boolean* [optional]): Shallow function renders the one non-DOM child of the current wrapper, and returns a wrapper around the result.
  - The other keys are forwarded to the options argument of `enzyme.shallow()`.

#### 戻り値

`shallow` (*shallow*): A shallow function.

#### 例

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

### `createRender([options]) => render`

Generate a render to string function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/render.html) for further details on the `render` function.

#### 引数

1. `オプション` (*オプジェクト* [任意]) 
  - `options.render` (*Function* [optional]): The render function to enhance, it uses **enzyme by default**.
  - The other keys are forwarded to the options argument of `enzyme.render()`.

#### 戻り値

`render` (*Function*): A render to string function.

#### 例

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