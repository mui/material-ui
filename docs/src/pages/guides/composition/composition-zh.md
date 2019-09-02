# Composition（组合）

<p class="description">Material-UI 试着让组合尽可能的简单。</p>

## 封装组件

我们需要一种了解组件接收的子元素的本质的方式，这样可以尽可能提供最大的灵活性和最好的性能。 在需要的时候我们会用 `muiName` 静态属性来标记一些我们的组件，这样能够解决这个问题。

但是，您仍可能需要封装一个组件以增强它的功能，而这可能与 `muiName` 的解决方案相冲突。 If you wrap a component, verify if that component has this static property set.

如果您遇到此问题，那么请为封装组件附加上与被封装组件一样的标记。 另外，鉴于父组件可能需要对被封装的组件属性加以控制，您应该向父组件传递这些属性。

让我们来看一个例子：

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## 组件属性

在 Material-UI 中，通过一个叫 `component` 的属性，您可以更改渲染后呈现的根节点。

### 它是如何工作的呢？

该组件将这样渲染：

```js
return React.createElement(this.props.component, props)
```

例如，在默认情况下，`List` 组件会渲染 `<ul>` 元素。 通过将一个 [React 组件](https://reactjs.org/docs/components-and-props.html#function-and-class-components)传递给 `component` 属性，就可以改变此默认行为。 下面的例子则将 `List` 组件和一个`<nav>` 元素渲染为根节点：

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

这种模式非常强大，它拥有很强的灵活性，也涵盖了与其他库互操作的方法，例如 [`react-router`](#react-router-demo) 或者你最喜欢的表格库。 但它也**带有一个小小的警告!**

### 当与内联函数一起使用时要注意

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

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
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

### Caveat with StrictMode

If you use class components for the cases described above you will still see warnings in `React.StrictMode`. We use `ReactDOM.findDOMNode` internally for backwards compatibility. You can use `React.forwardRef` and a designated prop in your class component to forward the `ref` to a DOM component. Doing so should not trigger any more warnings related to the deprecation of `ReactDOM.findDOMNode`.

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