# Composition

Material-UI tries to make composition as easy as possible.

## Wrapping components

In order to provide the maximum flexibility and performance,
we need a way to know the nature of the child elements a component receives.
To solve this problem we tag some of our components when needed
with a `muiName` static property.

However, users like to wrap components in order to enhance them.
That can conflict with our `muiName` solution.
If you encounter this issue, you need to:
1. Forward the properties.
2. Use the same tag for your wrapping component that is used with the wrapped component.

Let's see an example:

```jsx
const WrappedIcon = props => <Icon {...props} />;
WrappedIcon.muiName = 'Icon';
```

{{"demo": "pages/guides/Composition.js"}}

## Prevent unnecessary rerendering

Material-UI allows you to change the root node that will be used for a component via a prop called `component`.

For example, by default a `<List>` will render an `<ul>` element. This can be changed by passing a `string` or a `React.Component` to the `component` prop. The following example will render the `<List>` component with a `<nav>` element as root node instead:

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

This pattern is very powerful and allows for great flexibility as well as a way to interoperate with other libaries, like `react-router` or your favorite forms library. But it also comes with a small caveat!

Using inline functions as argument for the `component` prop may result in unnecessary rerendering, since you pass a new function to the component everytime react checks if it has to update its DOM.

For instance, if you want to create a custom `<ListItem>` that acts as a link, you could do the following:

```jsx
const ListItemLink = ({ icon, primary, secondary, to }) => (
  <li>
    <ListItem button component={props => <Link to={to} {...props} />}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset primary={primary} secondary={secondary} />
    </ListItem>
  </li>
);
```

But since we are using an inline function to change the rendered component, React will rerender the `<ListItem>` every time it checks our `<ListItemLink>` for changes. Not only will React update the DOM unnecessarily, the ripple effects of the `<ListItem>` will also not work correctly. A rerender will be triggered in the middle of the animation.

Here is an example of what this effect looks like:

{{"demo": "pages/guides/Composition-Render-Inline.js"}}

The solution is very simple: Avoid inline functions and pass a bound function to the `component` prop instead. Let's change our `<ListItemLink>` to the following:

```jsx
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

`renderLink` will now always reference the same function and React will rerender our component only if other props are changed. Here is a demo of the updated version: 

{{"demo": "pages/guides/Composition-Render-Class.js"}}