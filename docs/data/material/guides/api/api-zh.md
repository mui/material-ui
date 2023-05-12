# API design approach

<p class="description">我们在如何使用 Material-UI 方面学到了很多相关的知识，而通过 v1 版本的重写，我们能够彻底重新考虑组件的 API。</p>

:::info
API design is hard because you can make it seem simple but it's actually deceptively complex, or make it actually simple but seem complex.
:::

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

As Sebastian Markbage [pointed out](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html), no abstraction is superior to wrong abstractions. We are providing low-level components to maximize composition capabilities.

## 封装

You may have noticed some inconsistency in the API regarding composing components. To provide some transparency, we have been using the following rules when designing the API:

1. 使用`children`属性是使用 React 进行合成的惯用方法。
2. 有时我们只需要有限的子组件封装，例如，当我们不需要允许子组件的顺序排列的时候。 在这种情况下，提供显式属性可以使实现更简单，更高效; 例如，`Tab`采用`icon`和`label`属性。
3. API 的一致性至关重要。

## 规则

Aside from the above composition trade-off, we enforce the following rules:

### 扩展

Props supplied to a component which are not explicitly documented are spread to the root element; for instance, the `className` prop is applied to the root.

Now, let's say you want to disable the ripples on the `MenuItem`. You can take advantage of the spread behavior:

```jsx
<MenuItem disableRipple />
```

The `disableRipple` prop will flow this way: [`MenuItem`](/material-ui/api/menu-item/) > [`ListItem`](/material-ui/api/list-item/) > [`ButtonBase`](/material-ui/api/button-base/).

### 原生属性

We avoid documenting native properties supported by the DOM like [`className`](/material-ui/customization/how-to-customize/#overriding-styles-with-class-names).

### CSS classes

All components accept a [`classes`](/material-ui/customization/how-to-customize/#overriding-styles-with-class-names) prop to customize the styles. The classes design answers two constraints: to make the classes structure as simple as possible, while sufficient to implement the Material Design guidelines.

- 应用于根元素的类始终称为 `root`。
- 所有默认样式都分组在单个类中。
- 应用于非根元素的类则以元素的名称为前缀，例如， Dialog 组件中的 `paperWidthXs`。
- 由布尔属性赋值的 variants **不添加** 前缀，例如 `rounded` 类由 `rounded` 属性赋值。
- 由枚举属性赋值的 variants**添加**前缀，例如，`colorPrimary` 类使用 `color="primary"` 属性赋值。
- Variant 具有 ** 一个特定级别 **。 `color`和`variant`属性被视为 variant。 样式特异性越低，它就越容易被覆盖。
- 我们增加了变体修饰符（variant modifier）的特异性。 我们已经 ** 必须这样做 ** 为伪类 (`:hover`, `:focus` 等)。 以更多模板为代价，它才会开放更多的控制权。 我们也希望，它也能更加直观。

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

Nested components inside a component have:

- 它们自己的扁平化属性（当这些属性是顶层组件抽象的关键时），例如 `Input` 组件的 `id` 属性。
- 当用户可能需要调整内部 render 方法的子组件时，他们自己的`xxxProps`属性，例如，在内部使用`input`的组件上公开`inputProps`和`InputProps`属性。
- 他们自己的`xxxComponent`属性，用于执行组件注入。
- 当您可能需要执行命令性操作时，例如，公开 `inputRef` 属性以访问 `input` 组件上的原生`input`，您就可以使用它们自己的 `xxxRef` 属性。 This helps answer the question ["How can I access the DOM element?"](/material-ui/getting-started/faq/#how-can-i-access-the-dom-element)

### Prop naming

The name of a boolean prop should be chosen based on the **default value**. This choice allows:

- the shorthand notation. the shorthand notation. 例如，若提供了一个输入框元素的 `disabled` 属性，则默认值为 `true`。

  ```jsx
  -(<Input enabled={false} />) + <Input disabled />;
  ```

- developers to know what the default value is from the name of the boolean prop. It's always the opposite. It's always the opposite.

### 受控的组件

Most of the controlled component are controlled via the `value` and the `onChange` props, however, the `open` / `onClose` / `onOpen` combination is used for display related state. In the cases where there are more events, we put the noun first, and then the verb, for example: `onPageChange`, `onRowsChange`.

### boolean vs. enum

There are two options to design the API for the variations of a component: with a _boolean_; or with an _enum_. For example, let's take a button that has different types. Each option has its pros and cons:

- 选项 1 _布尔值（boolean）_：

  ```tsx
  type Props = {
    contained: boolean;
    fab: boolean;
  };
  ```

  该 API 启用了简写的表示法：`<Button>`，`<Button contained />`，`<Button fab />`。

- 选项 2 _枚举（enum）_：

  ```tsx
  type Props = {
    variant: 'text' | 'contained' | 'fab';
  };
  ```

  这个 API 更详细： `<Button>`,`<Button variant="contained">`,`<Button variant="fab">`。

  However, it prevents an invalid combination from being used, bounds the number of props exposed, and can easily support new values in the future.

The MUI components use a combination of the two approaches according to the following rules:

- 当需要 **2** 个可能的值时，我们使用 _boolean_。
- **host element**：`react-dom` 中的一个 DOM 节点，例如 `window.HTMLDivElement` 的实例。

Going back to the previous button example; since it requires 3 possible values, we use an _enum_.

### Ref

The `ref` is forwarded to the root element. This means that, without changing the rendered root element via the `component` prop, it is forwarded to the outermost DOM element which the component renders. If you pass a different component via the `component` prop, the ref will be attached to that component instead.

## 术语表

- **host component**：`react-dom` 的 DOM 节点类型，例如，一个 `“div”`。 另请参阅 [React 实施说明](https://legacy.reactjs.org/docs/implementation-notes.html#mounting-host-elements)。
- **host element**：`react-dom` 中的一个 DOM 节点，例如 `window.HTMLDivElement` 的实例。
- **outermost**：从上到下读取组件树时的第一个组件，例如，广度优先（breadth-first）搜索。
- **root component**：渲染一个宿主组件的最外层的那个组件。
- **root element**：渲染一个宿主组件的最外层的那个元素。
