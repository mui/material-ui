# 测试

<p class="description">编写测试能够预防回归问题，并能够带来更好的代码。</p>

本指南使用 [来自 Mocha 的全局方法](https://mochajs.org/api/global.html)，而不是使用 [Jest](https://jestjs.io/docs/en/api)。

## 内部

Material-UI 的 测试范围 **很广**，因此我们有信心 对组件进行迭代，例如，[Argos-CI](https://www.argos-ci.com/mui-org/material-ui) 提供的可视化回归测试已被证明非常有用。 若您想要进一步了解内部测试，您可以查看一下 [README](https://github.com/mui-org/material-ui/blob/master/test/README.md)。

## 用户空间

在用户空间编写测试会如何呢？ Material-UI 的样式基础架构使用构建在 [enzyme](https://github.com/airbnb/enzyme) 的一些辅助函数之上，这样一来整个流程会更简便，而这正是我们正在开源的。 若你愿意，你可以对它们加之利用。 我们几乎只使用完整的 DOM 渲染 API。 尤其若您的组件依赖于自定义主题，我们建议您执行相同的操作。 使用浅层渲染 API 的测试会变得更脆弱，因为他们需要一定量的 provider 组件。

### 完整的 DOM 渲染

当你有组件可能会与 DOM API 产生交互，或者当为了完整测试组件而要求完整的生命周期时，用例会更趋向使用完整的 DOM 渲染（例如，`componentDidMount` 等等。）

为这种情况我们提供了 `createMount()` 函数。 除了封装 enzyme 的 API 之外，它还提供了一个 `cleanUp` 函数。

### Shallow rendering（浅层渲染）

当把测试的组件当做一个小的单元时，浅层渲染起到了很好的约束作用。 这样也确保了你的测试不会间接地断言子组件的行为。 浅层渲染的目的是单独测试组件。 也就是说子元素的具体实现，如上下文信息，不会被泄漏。

`createShallow()` 函数可用于此情况。 除了包装的 enzyme API之外，它还提供了一个 `dive` 和 `untilSelector` 选项。

### 渲染为字符串

当在测试服务器组件行为时，渲染为字符串会有帮助。 你可以依此来断言所生成的 HTML 字符串。

`createRender()` 函数非常适合这种情况。 这只是 enzyme API 的一个别名，而为了保持一致性而公开。

## API

### `createMount([options]) => mount`

在特定的情况下，您能够生成一个加强版的 mount 函数。 有关 `mount` 函数的更多详细信息，请参阅 [enzyme API文档](https://airbnb.io/enzyme/docs/api/mount.html)。

#### 参数

1. `options` (*Object* [optional]) 
  - `options.mount` (*Function* [optional])：用 mount 函数来增强，它**默认使用 enzyme **。
  - 其他的键则被转发到 `enzyme.mount()` 的 options 参数当中。

#### 返回结果

`mount` (*mount*)：一个 mount 函数。

#### 示例

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

在特定的情况下，您能够生成一个加强版的浅层函数。 有关 `shallow` 函数的更多详细信息，请参考 [enzyme API 文档](https://airbnb.io/enzyme/docs/api/shallow.html)。

#### 参数

1. `options` (*Object* [optional]) 
  - `options.shallow`(*Function* [optional])：用浅层函数来增强，它**默认使用 enzyme **。
  - `options.untilSelector`(*String* [optional])：递归地浅层渲染子项，直到找到提供的选择器。 进一步探索 higher-order components（高阶组件）是很有帮助的。
  - `options.dive` (*Boolean* [optional])：浅层函数能够渲染当前包装器的一个非 DOM 的子节点，并返回一个含有结果的包装器。
  - 其他的键则被转发到 `enzyme.shallow()` 的 options 参数当中。

#### 返回结果

`shallow` （*shallow*）：一个 shallow 函数。

#### 示例

```jsx
mport { createShallow } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let shallow;

  before(() => {  // 这个是 Mocha 的用例；而在 Jest 中, 请使用 beforeAll
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<MyComponent />);
  });
});
```

### `createRender([options]) => render`

在特定的情况下，您能够生成一个加强版的字符串函数。 若您想获取更多有关 ` render `函数的详细信息，请参考 [enzyme API 文档 ](https://airbnb.io/enzyme/docs/api/render.html)。

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