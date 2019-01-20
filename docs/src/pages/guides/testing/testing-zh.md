# 测试

<p class="description">编写测试以防止回归并编写更好的代码。</p>

## 内部

我们认真对待测试。 我们已经编写并维持 **大范围** 的测试，以便我们能够 迭代与器件的可靠性，例如，通过提供的视觉回归测试 [的Argos-CI](https://www.argos-ci.com/mui-org/material-ui) 已被证明是真的很有帮助。 要了解有关内部测试的更多信息，您可以查看 [README](https://github.com/mui-org/material-ui/blob/master/test/README.md)。

虽然我们已达到100％的测试覆盖率，但我们不鼓励用户也这样做。 [![覆盖状态](https://img.shields.io/codecov/c/github/mui-org/material-ui/master.svg)](https://codecov.io/gh/mui-org/material-ui/branch/master)

## 用户空间

在用户空间编写测试怎么样？ Material-UI样式基础架构使用构建在 [enzyme](https://github.com/airbnb/enzyme) 之上的一些辅助函数来使过程更容易，我们正在暴露。 如果您愿意，可以利用它们。

### 浅呈现

浅呈现对于将测试约束为一个单元非常有用。 这还可以确保您的测试不会间接断言子组件的行为。 创建了浅层渲染以单独测试组件。 这意味着不会泄漏子实现细节，例如上下文。

`createShallow()` 函数可用于此情况。 除了包装酶API，它提供 `dive`untilSelector`直到选择` 选项。

### 完整的DOM渲染

完整的DOM渲染非常适用于您拥有可能与DOM API交互的组件或可能需要完整生命周期才能完全测试组件的用例（例如， `componentDidMount` 等）。

为这种情况提供了 `createMount()` 函数。 除了包装酶API之外，它还提供了 `cleanUp` 功能。

### 渲染为字符串

渲染到字符串对于测试服务器上使用的组件的行为很有用。 您可以利用此功能断言生成的HTML字符串。

`createRender()` 函数非常适合这种情况。 这只是enzyme API的别名，只是为了保持一致性而暴露。

## API

### `createShallow([options]) => shallow`

使用所需的上下文生成增强的浅函数。 有关 `shallow`函数的更多详细信息, 请参考[enzyme API 文档 ](https://airbnb.io/enzyme/docs/api/shallow.html),

#### 参数

1. `选项` (*Object* [optional]) 
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

  before(() => {
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<MyComponent />);
  });
});
```

### `createMount([options]) => mount`

使用所需的上下文生成增强的挂载功能。 有关 `mount` 功能的更多详细信息，请参阅 [enzyme API文档](https://airbnb.io/enzyme/docs/api/mount.html)。

#### 参数

1. `选项` (*Object* [optional]) 
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

使用所需的上下文生成渲染到字符串函数。 有关 `render` 功能的更多详细信息，请参阅 [enzyme API文档](https://airbnb.io/enzyme/docs/api/render.html)。

#### 参数

1. `选项` (*Object* [optional]) 
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