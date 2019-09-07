# 测试

<p class="description">编写测试能够预防回归问题，并能够带来更好的代码。</p>

本指南使用[来自 Mocha 的全局方法](https://mochajs.org/api/global.html)，而不是使用 [Jest](https://jestjs.io/docs/en/api)。

## 内部

Material-UI has a wide **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) have proven to be really helpful. To learn more about the internal tests, you can have a look at the [README](https://github.com/mui-org/material-ui/blob/master/test/README.md).

## 用户空间

What about writing tests in userspace? The Material-UI styling infrastructure uses some helper functions built on top of [enzyme](https://github.com/airbnb/enzyme) to make the process easier, which we are exposing. You can take advantage of them if you so choose. We use almost exclusively full DOM rendering APIs. We encourage you to do the same especially if your components rely on custom themes. Tests using shallow rendering APIs become more brittle with the amount of provider components they require.

### 完整的 DOM 渲染

Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs or may require the full lifecycle in order to fully test the component (e.g., `componentDidMount` etc.).

The `createMount()` function is provided for this situation. Aside from wrapping the enzyme API, it provides a `cleanUp` function.

### Shallow rendering（浅层渲染）

Shallow rendering is useful to constrain your testing to a component as a unit. This also ensures that your tests aren't indirectly asserting behavior of child components. Shallow rendering was created to test components in isolation. This means without leaking child implementation details such as the context.

The `createShallow()` function can be used for this situation. Aside from wrapping the enzyme API, it provides a `dive` and `untilSelector` option.

### 渲染为字符串

Rendering to a string is useful to test the behavior of the components that are used on the server. You can take advantage of this to assert the generated HTML string.

The `createRender()` function is ideal for this. This is just an alias for the enzyme API, which is only exposed for consistency.

## API

### `createMount([options]) => mount`

Generate an enhanced mount function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/mount.html) for further details on the `mount` function.

#### 参数

1. `options` (*Object* [optional]) 
  - `options.mount` (*Function* [optional])：用 mount 函数来增强，它**默认使用 enzyme **。
  - 其他的键则被转发到 `enzyme.mount()` 的 options 参数当中。

#### 返回结果

`mount` (*mount*): A mount function.

#### 示例

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

  it(”应该成功“, () => {
    const wrapper = mount(<MockedTheme><MySuccessButton /></MockedTheme>);
  });
});
```

### `createShallow([options]) => shallow`

Generate an enhanced shallow function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/shallow.html) for further details on the `shallow` function.

#### 参数

1. `options` (*Object* [optional]) 
  - `options.shallow`(*Function* [optional])：用浅层函数来增强，它**默认使用 enzyme **。
  - `options.untilSelector`(*String* [optional])：递归地浅层渲染子项，直到找到提供的选择器。 进一步探索 higher-order components（高阶组件）是很有帮助的。
  - `options.dive` (*Boolean* [optional])：浅层函数能够渲染当前包装器的一个非 DOM 的子节点，并返回一个含有结果的包装器。
  - 其他的键则被转发到 `enzyme.shallow()` 的 options 参数当中。

#### 返回结果

`shallow` (*shallow*): A shallow function.

#### 示例

```jsx
mport { createShallow } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let shallow;

  before(() => {  // 这个是 Mocha；而在 Jest 中, 请使用 beforeAll
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<MyComponent />);
  });
});
```

### `createRender([options]) => render`

Generate a render to string function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/render.html) for further details on the `render` function.

#### 参数

1. `options` (*Object* [optional]) 
  - `options.render` (*Function* [optional])：用渲染函数来增强，它**默认使用 enzyme **。
  - 其他的键则被转发到 `enzyme.render()` 的 options 参数当中。

#### 返回结果

`render` (*Function*): A render to string function.

#### 示例

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