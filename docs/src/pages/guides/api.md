# API

We have learned a lot regarding how people use Material-UI.
The 1.x.x rewrite allowed us to completely rethink our component API.

> API design is hard because you can make it seem simple but it's actually deceptively complex, or make it actually simple but seem complex.

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

As Sebastian Markbage [pointed out](http://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html), no abstraction is superior to wrong abstractions.
We are providing low-level components to maximize composition capabilities.

## Composition

You may have noticed some inconsistency in our API regarding composing components.
To provide some transparency, we have been using the following rules when designing the API:

1. Using the `children` property is the idiomatic way to do composition with React.
2. Sometimes we only need a limited child composition, for instance when we don't need to allow child order permutations.
Under this condition, providing explicit properties makes the implementation simpler and more performant; for example, the `<Tab />` takes an `icon` and a `label` property.
3. API consistency matters.

## Rules

Aside from the above composition trade-off, we enforce the following rules:

### Spread

Undocumented properties supplied are spread to the root element.
For instance, the `className` property is applied to the root.

Now, let's say you want to disable the ripples on the `MenuItem`.
You can take advantage of the spread behavior:
```jsx
<MenuItem disableRipple />
```
The `disableRipple` property will flow this way: [`MenuItem`](/api/menu-item) > [`ListItem`](/api/list-item) > [`ButtonBase`](/api/button-base).

### Native properties

We avoid documenting native properties supported by the DOM like [`className`](/customization/overrides#overriding-with-class-names).

### Classes

All the components accept a [`classes`](/customization/overrides#overriding-with-classes) property to customize the styles.

### Internal components

Internal components have:
- their own flattened properties when they are key to the abstraction.
- their own `xxxProps` property when users might need to tweak internal render method's components. For instance, we expose a `inputProps` and a `InputProps` properties.
  For instance, we expose a `value` property.
- their own `xxxRef` property when user might need to perform imperative actions.
  For instance, we expose a `inputRef` property to access the native `input` on the `Input` component.
  You fill often find a `rootRef` property, this property is applied as a `ref` to the root element of the component
- their own `xxxClassName` property when `classes` isn't enough.

### Property naming

The name of the boolean properties should be chosen based on the default value. We are following the HTML specification.
For instance, the `disabled` attribute on an input element. This choice allows the shorthand notation.

### Controllable components

Most of the controllable component are controlled via the `value` and the `onChange` properties.
However, we also use the `open`/`onClose`/`onOpen` combination for display relative state.
