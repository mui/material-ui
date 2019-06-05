# API设计方法

<p class="description">我们已经学习了很多关于如何使用Material-UI的知识，而v1重写允许我们完全重新思考组件API。</p>

> API设计很难，因为你可以让它看起来很简单，但它实际上看似复杂，或者说它实际上很简单但看起来很复杂。

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

正如Sebastian Markbage [指出](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html)，没有抽象优于错误的抽象。 我们提供低级组件以最大化组合功能。

## 构成

您可能已经注意到API中有关组合组件的一些不一致之处。 为了提供一些透明度，我们在设计API时一直使用以下规则：

1. 使用` children `属性是使用React进行合成的惯用方法。
2. 有时我们只需要有限的子组成，例如当我们不需要允许子顺序排列时。 在这种情况下，提供显式属性可以使实现更简单，更高效; 例如，`Tab`采用`icon`和`label`属性。
3. API一致性很重要。

## 规则

除了上述构成权衡之外，我们还执行以下规则：

### 传播

提供的未记录的属性传播到根元素; 例如，` className `属性应用于根。

现在，假设您要禁用` MenuItem `上的涟漪。 您可以利用传播行为：

```jsx
<MenuItem disableRipple />
```

` disableRipple `属性将以这种方式流动：[` MenuItem `](/api/menu-item/)> [` ListItem `](/api/list-item/)> [` ButtonBase `](/api/button-base/)。

### 原生属性

我们避免记录DOM支持的本机属性，如[` className `](/customization/components/#overriding-styles-with-class-names)。

### CSS classes

所有组件都接受[`classes`](/customization/components/#overriding-styles-with-classes)属性来自定义样式。 类设计回答了两个约束： 使类结构尽可能简单，同时足以实现Material Design规范。

- 应用于根元素的类始终称为` root `。
- 所有默认样式都分组在一个类中。
- 应用于非根元素的类以元素的名称为前缀，例如， Dialog组件中的` paperWidthXs `。
- 由布尔属性应用的variants **不是** 前缀，例如 `rounded` 类由 `rounded` 属性应用
- 由 enum 属性应用的variants ** 是 ** 前缀, 例如 ` colorPrimary ` 类 应用的 ` color = "primary" ` 属性。
- Variant具有 ** 一个特定级别 **。 `color`和`variant`属性被视为variant。 样式特异性越低, 它就越容易覆盖。
- 我们增加了variant修饰符的特异性。 我们已经 ** 必须这样做 ** 为伪类 (`:hover `, `:focus ` 等)。 它允许更多的控制，但代价是更多的样板。 希望它也更直观。

```js
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};
```

### 嵌套的组件

组件内的嵌套组件具有:

- 当它们是顶级组件抽象的关键时，它们自己的扁平属性， 例如，`input`组件的` id `属性。
- 当用户可能需要调整内部render方法的子组件时，他们自己的` xxxProps `属性，例如，在内部使用`input`的组件上公开` inputProps `和` InputProps `属性。
- 他们自己的` xxxComponent `属性，用于执行组件注入。
- 当用户可能需要执行命令性操作时，他们自己的` xxxRef `属性， 例如，公开` inputRef `属性以访问`input`组件上的native `input`。 这有助于回答问题[“我如何访问DOM元素？”](/getting-started/faq/#how-can-i-access-the-dom-element)

### 属性名称

应根据 ** 默认值 ** 选择布尔属性的名称。 例如, 输入元素上的 ` disabled ` 特性 (如果提供) 默认为 ` true `。 此选项允许速记符号:

```diff
-<Input enabled={false} />
+<Input disabled />
```

### 受控组件

大多数受控组件通过 ` value ` 和 ` onChange ` 属性进行控制, 但是, ` onChange `/` onClose `/` onOpen ` 组合用于显示相关状态。

### 布尔值 vs 枚举

为组件的变体设计API有两种选择：使用* boolean*; 或者使用* enum *。 例如, 让我们取一个具有不同类型的按钮。 每个选项都有其优点和缺点:

- 选项 1 * 布尔值(boolean) *:
    
    ```tsx
    type Props = {
    contained: boolean;
    fab: boolean;
    };
    ```
    
    此 API 启用了简写表示法: `<Button>`、` <Button contained /> `、` <Button fab /> `。

- 选项2 *枚举(enum)*
    
    ```tsx
    type Props = {
    variant: 'text' | 'contained' | 'fab';
    }
    ```
    
    这个API更详细： `<Button>`,`<Button variant="contained">`,`<Button variant="fab">`。
    
    但是它可以防止使用无效组合， 限制暴露的属性数量， 并且可以在将来轻松支持新的价值观。

Material-UI组件根据以下规则使用两种方法的组合：

- 当需要**2**自由度时，使用*布尔*。
- 当需要**>2**自由度时，或者如果将来可能需要额外的自由度，则使用*枚举*。

回到上一个按钮示例; 因为它需要3个自由度，所以我们使用* enum *。

### Ref

The `ref` is forwarded to the root element. This means that, without changing the rendered root element via the `component` prop, it is forwarded to the outermost DOM element that which component renders. If you pass a different component via the `component` prop the ref will be attached to that component instead.

## Glossary

- **host component**: a DOM node type in the context of `react-dom`, e.g. a `'div'`. See also [React Implementation Notes](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements).
- **host element**: a DOM node in the context of `react-dom`, e.g. an instance of `window.HTMLDivElement`.
- **outermost**: The first component when reading the component tree from top to bottom i.e. breadth-first search.
- **root component**: the outermost component that renders a host component.
- **root element**: the outermost element that renders a host component.