# Composition

<p class="description">MUI tries to make composition as easy as possible.</p>

## 封装组件

To provide maximum flexibility and performance, MUI needs a way to know the nature of the child elements a component receives. To solve this problem, we tag some of the components with a `muiName` static property when needed.

You may, however, need to wrap a component in order to enhance it, which can conflict with the `muiName` solution. If you wrap a component, verify if that component has this static property set.

If you encounter this issue, you need to use the same tag for your wrapping component that is used with the wrapped component. In addition, you should forward the props, as the parent component may need to control the wrapped components props.

让我们来看一个例子：

```jsx
const WrappedIcon = (props) => <Icon {...props} />;
WrappedIcon.muiName = Icon.muiName;
```

{{"demo": "pages/guides/composition/Composition.js"}}

## 组件属性

MUI allows you to change the root element that will be rendered via a prop called `component`.

### 它是如何工作的呢？

The custom component will be rendered by MUI like this:

```js
return React.createElement(props.component, props);
```

例如，在默认情况下，`List` 组件会渲染 `<ul>` 元素。 但只要把一个 [React 组件](https://reactjs.org/docs/components-and-props.html#function-and-class-components) 属性传递给 `component` 属性，就即可将此更改。 在下面的例子里，就将 `List` 组件作为一个根元素来渲染成 `<nav>` 元素：

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

这种模式非常强大，它拥有很强的灵活性，也涵盖了与其他库互操作的方法，例如你最喜欢的一些 routing 或者 forms 的库。 但它也**带有一个小小的警告!**

### 当与内联函数一起使用时要注意

使用内联函数作为 `component` 属性的参数可能会导致 **意外的卸载**，因为每次 React 渲染时都会传递一个新的组件。 例如，如果要创建自定义 `ListItem` 来作为一个链接使用，您可以这样编写：

```jsx
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = (props) => <Link to={to} {...props} />;

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

⚠️ 然而，由于我们使用一个内联函数来更改渲染的组件，所以每一次渲染 `ListItemLink` 时，React 都会先将它卸载。 React 不仅会不必要地更新 DOM，还会影响 `ListItem` 的涟漪效果。

解决方案很简单： **避免内联函数，取而代之的是将一个静态组件传递给 `component` 属性**。 我们可以改变 `ListItemLink` 组件，这样一来 `CustomLink` 总是引用相同的组件：

```tsx
import { Link, LinkProps } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
        linkProps,
        ref,
      ) {
        return <Link ref={ref} to={to} {...linkProps} />;
      }),
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

### 带有传递属性的一些注意事项

您可以利用传递属性来简化您的代码。 在此示例中，我们不创建任何中间组件：

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️ 但是，这种策略会受到一些限制：属性的冲突。 提供 `component` 属性的组件（如：ListItem）则可能不会将其所有属性（如 dense）传递到根元素。

### 使用 TypeScript

Many MUI components allow you to replace their root node via a `component` prop, this is detailed in the component's API documentation. 例如，一个按钮（Button）的根节点可以被替换成一个 React Router 的链接（Link），并且，任何传入按钮（Button）的额外的属性，例如 `to` ，都会被传递到链接（Link）组件中。 关于按钮和 react-router-dom 的代码示例查看[这些示例](/guides/routing/#component-prop)。

To be able to use props of such a MUI component on their own, props should be used with type arguments. Otherwise, the `component` prop will not be present in the props of the MUI component.

下面的示例使用了 `TypographyProps`，这也同样适用于那些带有 `OverrideProps` 定义的属性的组件。

以下 `CustomComponent` 组件与 `Typography` 组件具有相同的属性。

```ts
function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
  /* ... */
}
```

按照以上示例来设置，现在的 `CustomComponent` 就可以与 `component` 属性一起使用了，并且该属性应该设置为 `'a'`。 此外，`CustomComponent` 将拥有 `<a>` 这个 HTML 元素的所有属性。 `Typography` 组件的其他属性也会出现在 `CustomComponent` 的属性中。

It is possible to have generic `CustomComponent` which will accept any React component, custom, and HTML elements.

```ts
function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}
```

If the `GenericCustomComponent` will be used with a `component` prop provided, it should also have all props required by the provided component.

```ts
function ThirdPartyComponent({ prop1 }: { prop1: string }) {
  return <div />;
}
// ...
function ThirdPartyComponent({ prop1 }: { prop1: string }) {
  return <div />;
}
// ...
```

当所需的 `ThirdPartyComponent` 是明确要求时，`prop1` 也成为 `GenericCustomComponent` 的必需属性。

但是，并不是每个组件都完全支持您传入的任何组件类型。 If you encounter a component that rejects its `component` props in TypeScript, please open an issue. 我们也一直在努力实现组件属性的通用化。

## 使用 refs 时的一些注意事项

本节介绍将自定义组件用作`子组件`或`component`属性的值时的注意事项。

某些组件需要访问DOM节点。 之前提到，通过使用` ReactDOM.findDOMNode ` 就能实现。 该方法已被废弃，代替的是使用` ref `和 ref 转递。 然而，只有下列组件类型才可获得 `ref`：

- Any MUI component
- 类组件，如 `React.Component` 或 `React.PureComponent` 等
- DOM（或 host）组件，例如 `div` 或 `button`
- [React.forwardRef 组件](https://reactjs.org/docs/react-api.html#reactforwardref)
- [React.lazy 组件](https://reactjs.org/docs/react-api.html#reactlazy)
- [React.memo 组件](https://reactjs.org/docs/react-api.html#reactmemo)

If you don't use one of the above types when using your components in conjunction with MUI, you might see a warning from React in your console similar to:

> Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

Note that you will still get this warning for `lazy` and `memo` components if their wrapped component can't hold a ref. In some instances, an additional warning is issued to help with debugging, similar to:

> Invalid prop `component` supplied to `ComponentName`. Expected an element type that can hold a ref.

这只包含了两个最常见的用例。 更多信息见[React官方文档中的本章节](https://reactjs.org/docs/forwarding-refs.html)。

```diff
-const MyButton = () => <div role="button" />;
+const MyButton = React.forwardRef((props, ref) =>
+  <div role="button" {...props} ref={ref} />);

 <Button component={MyButton} />;
```

```diff
-const SomeContent = props => <div {...props}>Hello, World!</div>;
+const SomeContent = React.forwardRef((props, ref) =>
+  <div {...props} ref={ref}>Hello, World!</div>);

 <Tooltip title="Hello again."><SomeContent /></Tooltip>;
```

To find out if the MUI component you're using has this requirement, check out the props API documentation for that component. 如果您需要转递 refs，描述将链接到此部分。

### 使用 StrictMode 的注意事项

如果对上述情况，您使用类组件，那么您会看到 `React.StrictMode` 中的一些警告。 在内部使用 `ReactDOMfindDOMNode` 来达到向后的兼容性。 您可以使用 ` React.forwardRef ` 和类组件中的一个指定的属性来把 `ref` 传递到一个 DOM 组件中。 这样做不再会触发与 ` ReactDOM.findDOMNode ` 相关的弃用警告 。

```diff
 class Component extends React.Component {
   render() {
-    const { props } = this;
+    const { forwardedRef, ...props } = this.props;
     return <div {...props} ref={forwardedRef} />;
   }
 }

-export default Component;
+export default React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />);
```
