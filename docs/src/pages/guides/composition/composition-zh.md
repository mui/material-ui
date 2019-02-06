# 构成

<p class="description">Material-UI尝试使合成尽可能简单。</p>

## 包装组件

为了提供最大的灵活性和性能， 我们需要一种方法来知道组件接收子元素的性质。 为了解决这个问题，我们在需要 时使用 `muiName` 静态属性标记我们的一些组件。

但是，用户喜欢包装组件以增强它们。 这可能与我们的 `muiName` 解决方案相冲突。 如果遇到此问题，则需要：

1. 转发属性。
2. 对包装组件使用的包装组件使用相同的标记。

我们来看一个例子：

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = 'Icon';
```

{{"demo": "pages/guides/composition/Composition.js"}}

## 组件属性

Material-UI allows you to change the root node that will be rendered via a property called `component`.

### How does it work?

The component will render like this:

```js
return React.createElement(this.props.component, props)
```

For example, by default a `List` component will render a `<ul>` element. 这可以通过将 [React组件](https://reactjs.org/docs/components-and-props.html#function-and-class-components) 传递给 `component` 属性来更改。 The following example will render the `List` component with a `<nav>` element as root node instead:

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

This pattern is very powerful and allows for great flexibility, as well as a way to interoperate with other libraries, such as [`react-router`](#react-router-demo) or your favorite forms library. But it also **comes with a small caveat!**

### Caveat with inlining

使用内联函数作为 `component` 属性的参数可能会导致 **意外的卸载**，因为每次React呈现时都会将新组件传递给 `component` 属性。 For instance, if you want to create a custom `ListItem` that acts as a link, you could do the following:

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

⚠️ However, since we are using an inline function to change the rendered component, React will unmount the link every time `ListItemLink` is rendered. Not only will React update the DOM unnecessarily, the ripple effect of the `ListItem` will also not work correctly.

解决方案很简单： **避免内联函数并将静态组件传递给 `component` 属性**。 Let's change our `ListItemLink` to the following:

```jsx
import { Link } from 'react-router-dom';

class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

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

`renderLink` will now always reference the same component.

### Caveat with shorthand

You can take advantage of the properties forwarding to simplify the code. In this example, we don't create any intermediary component:

```jsx
import { Link } from 'react-router-dom';

<ListItem button component={Link} to="/">
```

⚠️ However, this strategy suffers from a little limitation: properties collision. The component providing the `component` property (e.g. ListItem) might not forward all its properties to the root element (e.g. dense).

### React Router Demo

Here is a demo with [React Router DOM](https://github.com/ReactTraining/react-router):

{{"demo": "pages/guides/composition/ComponentProperty.js"}}

### With TypeScript

You can find the details in the [TypeScript guide](/guides/typescript#usage-of-component-property).