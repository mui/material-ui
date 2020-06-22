# Composition 组合

<p class="description">Material-UI 试着让组合尽可能的简单。</p>

## 封装组件

我们需要一种了解组件接收的子元素的本质的方式，这样可以尽可能提供最大的灵活性和最好的性能。 To solve this problem we tag some of the components with a `muiName` static property when needed.

但是，您仍可能需要封装一个组件以增强它的功能，而这可能与 `muiName` 的解决方案相冲突。 If you wrap a component, verify if that component has this static property set.

如果您遇到此问题，那么请为封装组件附加上与被封装组件一样的标记。 另外，鉴于父组件可能需要对被封装的组件属性加以控制，您应该向父组件传递这些属性。

让我们来看一个例子：

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## 组件属性

Material-UI allows you to change the root element that will be rendered via a prop called `component`.

### 它是如何工作的呢？

The custom component will be rendered by Material-UI like this:

```js
return React.createElement(props.component, props)
```

例如，在默认情况下，`List` 组件会渲染 `<ul>` 元素。 This can be changed by passing a [React component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) to the `component` prop. The following example will render the `List` component with a `<nav>` element as root element instead:

```jsx
<List component="nav">
  <ListItem button>
    <ListItemText primary="Trash" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Spam" />
  </ListItem>
</List>
```

This pattern is very powerful and allows for great flexibility, as well as a way to interoperate with other libraries, such as your favorite routing or forms library. 但它也**带有一个小小的警告!**

### 当与内联函数一起使用时要注意

Using an inline function as an argument for the `component` prop may result in **unexpected unmounting**, since a new component is passed every time React renders. 例如，如果要创建自定义` ListItem `作为链接，您可以执行以下操作：

```jsx
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = props => <Link to={to} {...props} />;

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
```

⚠️然而，由于我们使用内联函数来更改呈现的组件，因此，在每一次` ListItemLink `被渲染时，React都会先将它卸载。 不只是React会更新那些不必要的DOM，`ListItem` 的涟漪效应也将无法正常工作。

The solution is simple: **avoid inline functions and pass a static component to the `component` prop** instead. Let's change the `ListItemLink` component so `CustomLink` always reference the same component:

```jsx
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
```

### Caveat with prop forwarding

You can take advantage of the prop forwarding to simplify the code. 在此示例中，我们不创建任何中间组件：

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️ However, this strategy suffers from a limitation: prop collisions. The component providing the `component` prop (e.g. ListItem) might not forward all the props (for example dense) to the root element.

### 使用 TypeScript

You can find the details in the [TypeScript guide](/guides/typescript/#usage-of-component-prop).

## Routing libraries

The integration with third-party routing libraries is achieved with the `component` prop. The behavior is identical to the description of the prop above. Here are a few demos with [react-router-dom](https://github.com/ReactTraining/react-router). It covers the Button, Link, and List components, you should be able to apply the same strategy with all the components.

### Button

{{"demo": "pages/guides/composition/ButtonRouter.js"}}

### Link

{{"demo": "pages/guides/composition/LinkRouter.js"}}

### Lists（列表）

{{"demo": "pages/guides/composition/ListRouter.js"}}

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

In some instances an additional warning is issued to help with debugging, similar to:

> Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.

Only the two most common use cases are covered. 更多信息见[React官方文档中的本章节](https://reactjs.org/docs/forwarding-refs.html)。

```diff
-const MyButton = props => <div role="button" {...props} />;
+const MyButton = React.forwardRef((props, ref) => <div role="button" {...props} ref={ref} />);
<Button component={MyButton} />;
```

```diff
-const SomeContent = props => <div {...props}>Hello, World!</div>;
+const SomeContent = React.forwardRef((props, ref) => <div {...props} ref={ref}>Hello, World!</div>);
<Tooltip title="Hello, again."><SomeContent /></Tooltip>;
```

要确定您使用的Material-UI组件是否具有此需求，请查阅该组件的props API文档。 如果您需要转递 refs，描述将链接到此部分。

### Caveat with StrictMode

If you use class components for the cases described above you will still see warnings in `React.StrictMode`. `ReactDOM.findDOMNode` is used internally for backwards compatibility. You can use `React.forwardRef` and a designated prop in your class component to forward the `ref` to a DOM component. Doing so should not trigger any more warnings related to the deprecation of `ReactDOM.findDOMNode`.

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