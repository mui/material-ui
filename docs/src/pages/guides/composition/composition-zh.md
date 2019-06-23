# 组合

<p class="description">Material-UI尝试使组合尽可能简单。</p>

## 封装组件

为了提供最大的灵活性和性能， 我们需要一种方法来知道组件接收子元素的本质。 为了解决这个问题，我们在需要 时使用 `muiName` 静态属性标记我们的一些组件。

但是，您仍可能需要包装一个组件以增强它的功能，即使这可能与` muiName `解决方案冲突。 如果你封装一个组件，并验证是否该组件具有这种静态属性集。

如果遇到此问题，则需要为封装组件与被封装组件使用相同的标记。 另外，由于父组件可能需要控制被封装子组件的属性，你应该将子组件的这些属性向父组件传递。

我们来看一个例子：

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## 组件属性

Material-UI允许您通过名为`component`的属性，实现更改组件被渲染后呈现的根节点（HTML元素）。

### 它如何工作？

该组件将呈现如下：

```js
return React.createElement(this.props.component, props)
```

例如，在默认情况下，`List` 组件将被渲染为`<ul>`元素。 但只要把一个[React组件](https://reactjs.org/docs/components-and-props.html#function-and-class-components) 传递给 `component` 属性就可以更改这个默认行为。 在下面的例子里， `List` 组件的根元素就会被渲染为一个`<nav>`元素：

```jsx
<List component="nav">
  <ListItem>
    <ListItemText primary="Trash" />
  </ListItem>
  <ListItem>
    <ListItemText primary="Spam" />
  </ListItem>
</List>
```

这种模式非常强大，具有很大的灵活性，并允许其与其他库进行交互，例如[` react-router `](#react-router-demo)或者你最喜欢的表单库。 但它也**带有一个小小的警告!**

### 使用内联时要注意

使用内联函数作为 `component` 属性的参数可能会导致 **意外的卸载**，因为每次React呈现时都会将新组件传递给 `component` 属性。 例如，如果要创建自定义` ListItem `作为链接，您可以执行以下操作：

```jsx
import { Link } from 'react-router-dom';

const ListItemLink = ({ icon, primary, secondary, to }) => (
  <li>
    <ListItem button component={props => <Link to={to} {...props} />}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset primary={primary} secondary={secondary} />
    </ListItem>
  </li>
);
```

⚠️然而，由于我们使用内联函数来更改呈现的组件，因此，在每一次` ListItemLink `被渲染时，React都会先将它卸载。 不只是React会更新那些不必要的DOM，`ListItem` 的涟漪效应也将无法正常工作。

解决方法很简单： **避免内联函数并将静态组件传递给 `component` 属性**。 将上述的` ListItemLink `改成：

```jsx
import { Link as RouterLink } from 'react-router-dom';

class ListItemLink extends React.Component {
  renderLink = React.forwardRef((itemProps, ref) => (
    // 在 react-router-dom@^5.0.0 中用 `ref` 代替 `innerRef`
    <RouterLink to={this.props.to} {...itemProps} innerRef={ref} />
  ));

  render() {
    const { icon, primary, secondary, to } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText inset primary={primary} secondary={secondary} />
        </ListItem>
      </li>
    );
  }
}
```

` renderLink `现在将始终引用相同的组件。

### 简化代码时要注意

您可以利用属性传递来简化代码。 在此示例中，我们不创建任何中间组件：

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️但是，这种策略受到一些限制：属性冲突。 提供`component` 属性的组件 (例如：ListItem) 可能不会将其所有属性传递到根元素 (例如：dense) 。

### React Router 示例

这是一个带有[ React Router DOM](https://github.com/ReactTraining/react-router) 的示例 ：

{{"demo": "pages/guides/composition/ComponentProperty.js"}}

### 使用 TypeScript

您可以在[ TypeScript指南 ](/guides/typescript/#usage-of-component-property)中找到详细信息 。

## 使用refs时要注意

本节介绍将自定义组件用作`子组件`或`component`属性的值时的注意事项。

某些组件需要访问DOM节点。 之前提到，通过使用` ReactDOM.findDOMNode ` 就能实现。 该方法已被废弃，代替的是使用` ref `和 ref 转递。 然而，只有下列组件类型才可获得 `ref`：

- 任何Material-UI组件
- 类组件，如 `React.Component` 或 `React.PureComponent` 等
- DOM (或 host) 组件，例如 `div` 或 `button`等
- [React.forwardRef组件](https://reactjs.org/docs/react-api.html#reactforwardref)
- [React.lazy组件](https://reactjs.org/docs/react-api.html#reactlazy)
- [React.memo组件](https://reactjs.org/docs/react-api.html#reactmemo)

如果在将组件与Material-UI结合使用时未使用上述类型之一，则可能会在控制台中看到来自React的警告，类似于：

> Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

请注意，在使用 `lazy` 和 `memo` 组件时，如果被封装的组件无法持有 ref，您仍然有可能收到这个警告。

在某些情况下，我们发出了一个额外警告，帮助调试，类似于：

> Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.

我们只涵盖两个最常见的使用案例。 更多信息见[React官方文档中的本章节](https://reactjs.org/docs/forwarding-refs.html)。

```diff
- const MyButton = props => <div role="button" {...props} />;
+ const MyButton = React.forwardRef((props, ref) => <div role="button" {...props} ref={ref} />);
<Button component={MyButton} />;
```

```diff
- const SomeContent = props => <div {...props}>Hello, World!</div>;
+ const SomeContent = React.forwardRef((props, ref) => <div {...props} ref={ref}>Hello, World!</div>);
<Tooltip title="Hello, again."><SomeContent /></Tooltip>;
```

要确定您使用的Material-UI组件是否具有此需求，请查阅该组件的props API文档。 如果您需要转递 refs，描述将链接到此部分。

### 使用 StrictMode 和 unstable_ConcurrentMode 时要注意

如果在` React.StrictMode `和` React.unstable_ConcurrentMode ` 模式下，对上述情况使用类组件，则仍然会看到警告。 我们在内部使用` ReactDOM.findDOMNode `用于向后兼容。 您可以使用` React.forwardRef `和类组件中的指定prop来传递` ref `到DOM组件。 这样做不再会触发与` ReactDOM.findDOMNode `相关的弃用警告 。

```diff
class Component extends React.Component {
  render() {
-   const { props } = this;
+   const { forwardedRef, ...props } = this.props;
    return <div {...props} ref={forwardedRef} />;
  }
}

-export default Component;
+export default React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />);
```