# 测试

<p class="description">编写测试能够预防回归问题，并能够带来更好的代码。</p>

本指南使用[来自 Mocha 的全局方法](https://mochajs.org/api/global.html)，而不是使用 [Jest](https://jestjs.io/docs/en/api)。

## 内部

我们十分注重测试问题。 我们已编写并且维护了**一系列的** 测试，这样一来我们可以非常自信地迭代开发组件，例如，由 [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) 提供的可视化回归测试，亲测有效。 若您想要进一步了解内部测试，您可以查看 [README](https://github.com/mui-org/material-ui/blob/master/test/README.md)。

尽管我们已达到100％的测试覆盖率，但是我们不鼓励我们的用户也这样做。 [![覆盖率的情况](https://img.shields.io/codecov/c/github/mui-org/material-ui/master.svg)](https://codecov.io/gh/mui-org/material-ui/branch/master)

## 用户空间

在用户空间编写测试会如何呢？ Material-UI 的样式基础架构使用构建在 [enzyme](https://github.com/airbnb/enzyme) 的一些辅助函数之上来，这样一来整个流程会更简便，而这正是我们正在开源的。 若你愿意，你可以对它们加之利用。

### Shallow rendering（浅层渲染）

当把测试的组件当做一个小的单元时，浅层渲染起到了很好的约束作用。 这样也确保了你的测试不会间接地断言子组件的行为。 浅层渲染的目的是单独测试组件。 也就是说子元素的具体实现，如上下文信息，不会被泄漏。

`createShallow()` 函数可用于此情况。 除了包装 enzyme 的 API，它提还供 `dive` 和 `untilSelector` 的选项。

### 完整的 DOM 渲染

当你有组件可能会与 DOM API 产生交互，或者当为了完整测试组件而要求完整的生命周期时，用例会更趋向使用完整的 DOM 渲染（例如，`componentDidMount` 等等。）。

函数 `createMount()` 据此而开发。 除了封装 enzyme 的 API，它还提供了一个 `cleanUp` 函数。

### 渲染为字符串

当在测试服务器组件行为时，渲染为字符串会有帮助。 你可以依此来断言所生成的 HTML 字符串。

`createRender()` 函数非常适合这种情况。 这只是 enzyme API 的一个别名，为了保持一致性，用户也可以使用。

## API

### `createShallow([options]) => shallow`

在特定的情况下，您能够生成一个加强版的浅层函数。 若您想获取更多有关 `shallow`函数的详细信息，请参考 [enzyme API 文档 ](https://airbnb.io/enzyme/docs/api/shallow.html)。

#### 参数

1. `options` (*Object* [optional]) 
    - `options.shallow`(*Function* [optional])：用浅层函数来增强，它**默认使用 enzyme **。
    - `options.untilSelector`(*String* [optional])：递归地浅层渲染子项，直到找到提供的选择器。 进一步探索 higher-order components（高阶组件）是很有帮助的。
    - `options.dive` (*Boolean* [optional]): Shallow function renders the one non-DOM child of the current wrapper, and returns a wrapper around the result.
    - 其他的键则被转发到 `enzyme.shallow()` 的 options 参数当中。

#### 返回结果

`shallow`(*shallow*)：一个浅层函数。

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

### `createMount([options]) => mount`

在特定的情况下，您能够生成一个加强版的 mount 函数。 若您想获取更多有关 ` mount `函数的详细信息，请参考 [enzyme API 文档 ](https://airbnb.io/enzyme/docs/api/mount.html)。

#### 参数

1. `options` (*Object* [optional]) 
    - `options.mount` (*Function* [optional])：用 mount 函数来增强，它**默认使用 enzyme **。
    - 其他的键则被转发到 `enzyme.mount()` 的 options 参数当中。

#### 返回结果

`mount` (*mount*)：一个 mount 函数。

#### 示例

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

在特定的情况下，您能够生成一个加强版的字符串函数。 若您想获取更多有关 ` mount `函数的详细信息，请参考 [enzyme API 文档 ](https://airbnb.io/enzyme/docs/api/render.html)。

#### 参数

1. `options` (*Object* [optional]) 
    - `options.render` (*Function* [optional])：用渲染函数来增强，它**默认使用 enzyme **。
    - 其他的键则被转发到 `enzyme.render()` 的 options 参数当中。

#### 返回结果

`render` (*Function*)：渲染到字符串函数。

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