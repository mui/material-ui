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
- their own flattened properties when these are key to the abstraction.
- their own `xxxProps` property when users might need to tweak the internal render method's sub-components,
for instance, exposing the `inputProps` and `InputProps` properties on components that use `Input` internally.
  For instance, exposing a `value` property.
- their own `xxxRef` property when user might need to perform imperative actions.
  For instance, exposing a `inputRef` property to access the native `input` on the `Input` component.
  It help answering the following question. [How can I access the DOM element?](/getting-started/frequently-asked-questions/#how-can-i-access-the-dom-element-)
- their own `xxxClassName` property when `classes` isn't enough.

### Property naming

The name of the boolean properties should be chosen based on the default value. We are following the HTML specification.
For instance, the `disabled` attribute on an input element. This choice allows the shorthand notation.

### Controllable components

Most of the controllable component are controlled via the `value` and the `onChange` properties,
however, the `open`/`onClose`/`onOpen` combination is used for display related state.

### boolean vs enum

You can potentially expose the variations of a component with a *boolean* or an *enum*.
For instance, let's say you have a button of different types.
You can use one of the two following options, each with its pros and cons:
- Option 1 *boolean*: `<Button>`, `<Button raised />`, `<Button fab />`.
  With this API, you can use the shorthand notation.

```tsx
type Props = {
  raised: boolean;
  fab: boolean;
};
```

- Option 2 *enum*: `<Button>`, `<Button type="raised">`, `<Button type="fab">`.
  With this API, you prevent invalid combination from being used, you bound the number of properties you expose, and you can easily support new values in the future.

```tsx
type Props = {
  type: 'flat' | 'raised' | 'fab';
}
```

The Material-UI components use a combination of the two approaches.
We enforce the following rule:
- We use a *boolean* when the degrees of freedom required is **2**.
- We use an *enum* when the degrees of freedom required is **> 2**.

Going back to the previous button example; since it requires 3 degrees of freedom, we use an *enum*.
