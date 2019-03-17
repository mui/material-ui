# 测试

<p class="description">编写测试以防止回归并编写更好的代码。</p>

Examples in this guide use [global methods from Mocha](https://mochajs.org/api/global.html), not [Jest](https://jestjs.io/docs/en/api).

## 内部

We take tests seriously. We have written and maintain **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) have proven to be really helpful. To learn more about our internal tests, you can have a look at the [README](https://github.com/mui-org/material-ui/blob/next/test/README.md).

While we have reached the 100% test coverage achievement, we don't encourage our users to do the same. [![Coverage Status](https://img.shields.io/codecov/c/github/mui-org/material-ui/next.svg)](https://codecov.io/gh/mui-org/material-ui/branch/next)

## 用户空间

What about writing tests in userspace? Material-UI样式基础架构使用构建在 [enzyme](https://github.com/airbnb/enzyme) 之上的一些辅助函数来使过程更容易，我们正在暴露。 You can take advantage of them if you so choose.

### 浅呈现

Shallow rendering is useful to constrain your testing to a component as a unit. This also ensures that your tests aren't indirectly asserting behavior of child components. Shallow rendering was created to test components in isolation. This means without leaking child implementation details such as the context.

`createShallow()` 函数可用于此情况。 除了包装酶API，它提供 `dive`untilSelector`直到选择` 选项。

### 完整的DOM渲染

Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs or may require the full lifecycle in order to fully test the component (e.g., `componentDidMount` etc.).

为这种情况提供了 `createMount()` 函数。 Aside from wrapping the enzyme API, it provides a `cleanUp` function.

### 渲染为字符串

Rendering to a string is useful to test the behavior of the components that are used on the server. You can take advantage of this to assert the generated HTML string.

`createRender()` 函数非常适合这种情况。 这只是enzyme API的别名，只是为了保持一致性而暴露。

## API

### `createShallow([options]) => shallow`

Generate an enhanced shallow function with the needed context. 有关 `shallow`函数的更多详细信息, 请参考[enzyme API 文档 ](https://airbnb.io/enzyme/docs/api/shallow.html),

#### 参数

1. `options` (*Object* [optional]) 
    - `options.shallow` （*Function* [optional]）：浅增强功能，默认使用 **酶**。
    - `options.untilSelector` （*String* [optional]）：递归浅呈现子项，直到找到提供的选择器。 向下钻取高阶组件非常有用。
    - `options.dive` (*Boolean* [optional])：Shallow渲染当前包装器的一个非DOM子节点，并返回结果周围的包装器。
    - 其他键被转发到 `enzyme.shallow（）`的options参数。

#### 返回结果

`shallow` （*shallow*）：浅函数。

#### 例子

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

Generate an enhanced mount function with the needed context. 有关 `mount` 功能的更多详细信息，请参阅 [enzyme API文档](https://airbnb.io/enzyme/docs/api/mount.html)。

#### 参数

1. `options` (*Object* [optional]) 
    - `options.mount` (*Function* [optional])：mount功能增强，默认使用 **酶**。
    - 其他键被转发到 `enzyme.mount()`的options参数。

#### 返回结果

`mount` (*mount*)：安装功能。

#### 例子

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

Generate a render to string function with the needed context. 有关 `render` 功能的更多详细信息，请参阅 [enzyme API文档](https://airbnb.io/enzyme/docs/api/render.html)。

#### 参数

1. `options` (*Object* [optional]) 
    - `options.render` (*Function* [optional])：渲染功能增强，默认使用 **enzyme**。
    - 其他键被转发到 `enzyme.render()`的options参数。

#### 返回结果

`render` (*Function*)：渲染到字符串函数。

#### 例子

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