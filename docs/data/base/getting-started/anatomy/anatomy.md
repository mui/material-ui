# Anatomy

<p class="description">Anatomy</p>

## Anatomy of an unstyled component

While each component has its own API, there are a few props common to all of them:

- `components` - an object that allows you to override subcomponents (slots) used by the unstyled "host" component. Each host component will at least have the `Root` slot. Many complex components have more slots. You can either provide a custom component or an HTML tag there.

  ```jsx
  <BadgeUnstyled components={{ Root: 'div', Badge: MyCustomBadge }} />
  ```

- `component` - a shortcut to `components.Root`. Note that if both `components.Root` and `component` are specified, `component` takes precedence.

  ```jsx
  <BadgeUnstyled component="div" />
  ```

- `componentsProps` - an object with each slot's props. Even if you don't override a specific slot (with `components` or `component`), you can provide additional props for the default components. For example, if you want to add a custom CSS class to one of the slots' components, specify it in the `componentsProps`.

  ```jsx
  <BadgeUnstyled componentsProps={{ input: { className: 'my-badge' } }} />
  ```

Additionally, all the extra props placed on the host component are propagated into the root component (just as if they were placed in `componentsProps.root`).
These two examples are equivalent:

```jsx
<BadgeUnstyled id="badge1">
```

```jsx
<BadgeUnstyled componentsProps={{ root: { id: 'badge1' } }}>
```
