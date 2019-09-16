# Composition（组合）

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

## Component prop

Material-UI allows you to change the root element that will be rendered via a prop called `component`.

### 它是如何工作的呢？

该组件将这样渲染：

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

  return (
    <li>
      <ListItem button component={props => <Link to={to} {...props} />}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
```

⚠️然而，由于我们使用内联函数来更改呈现的组件，因此，在每一次` ListItemLink `被渲染时，React都会先将它卸载。 不只是React会更新那些不必要的DOM，`ListItem` 的涟漪效应也将无法正常工作。

The solution is simple: **avoid inline functions and pass a static component to the `component` prop** instead. Let's change the `ListItemLink` to the following:

```jsx
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <Link to={to} {...linkProps} innerRef={ref} />
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

### Caveat with prop forwarding

You can take advantage of the prop forwarding to simplify the code. 在此示例中，我们不创建任何中间组件：

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️ However, this strategy suffers from a limitation: prop collisions. The component providing the `component` prop (e.g. ListItem) might not forward all the props (for example dense) to the root element.

### With TypeScript

You can find the details in the [TypeScript guide](/guides/typescript/#usage-of-component-prop).

## Routing libraries

The integration with third-party routing libraries is achieved with the `component` prop. The behavior is identical to the description of the prop above. Here are a few demos with [react-router-dom](https://github.com/ReactTraining/react-router). It covers the Button, Link, and List components, you should be able to apply the same strategy with all the components.

### Buttons（按钮）

{{"demo": "pages/guides/composition/ButtonRouter.js"}}

### Link

{{"demo": "pages/guides/composition/LinkRouter.js"}}

### Lists（列表）

{{"demo": "pages/guides/composition/ListRouter.js"}}

## Caveat with refs

This section covers caveats when using a custom component as `children` or for the `component` prop.

Some of the components need access to the DOM node. This was previously possible by using `ReactDOM.findDOMNode`. This function is deprecated in favor of `ref` and ref forwarding. However, only the following component types can be given a `ref`:

- 任何Material-UI组件
- 类组件，如 `React.Component` 或 `React.PureComponent` 等
- DOM (或 host) 组件，例如 `div` 或 `button`等
- [React.forwardRef组件](https://reactjs.org/docs/react-api.html#reactforwardref)
- [React.lazy组件](https://reactjs.org/docs/react-api.html#reactlazy)
- [React.memo组件](https://reactjs.org/docs/react-api.html#reactmemo)

If you don't use one of the above types when using your components in conjunction with Material-UI, you might see a warning from React in your console similar to:

> Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

Be aware that you will still get this warning for `lazy` and `memo` components if their wrapped component can't hold a ref.

In some instances an additional warning is issued to help with debugging, similar to:

> Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.

Only the two most common use cases are covered. For more information see [this section in the official React docs](https://reactjs.org/docs/forwarding-refs.html).

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

To find out if the Material-UI component you're using has this requirement, check out the the props API documentation for that component. If you need to forward refs the description will link to this section.

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