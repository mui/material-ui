# API Design Approach

<p class="description">Nós aprendemos bastante como o Material-UI é usado e o refatoramento da v1 permitiu-nos repensar completamente o componente de API.</p>

> Le design de l'API est difficile car vous pouvez le rendre simple mais il est en fait trompeur complexe, ou le rendre vraiment simple mais semble complexe.

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

Comme Sebastian Markbage [ l'a souligné ](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html) , aucune abstraction n'est supérieure aux mauvaises abstractions. Nous fournissons des composants de bas niveau pour optimiser les capacités de composition.

## Composition

Vous avez peut-être remarqué des incohérences dans l'API par rapport à la composition des composants. Pour fournir une certaine transparence, nous avons utilisé les règles suivantes lors de la conception de l'API :

1. L'utilisation de la propriété `children` est le moyen idiomatique pour faire la composition avec React.
2. Par fois, on a juste besoin d'une composition limite par enfants, par example lorsque qu'on n'a pas besoin d'autoriser la permutation d'ordre par enfant. Dans ce cas, fournir des propriétés explicites rend l'implémentation plus simple et plus performante; par example, `Tab` prend `icon` et une propriété `label`.
3. La cohérence des API est importante.

## Règles

Outre le compromis de composition ci-dessus, nous appliquons les règles suivantes:

### La propagation

Les propriétés non documentées fournies sont propagées à l'élément racine. par exemple, la propriété ` className ` est appliquée à la racine.

Maintenant, supposons que vous vouliez désactiver les ondulations sur le `MenuItem`. Vous pouvez tirer parti du comportement de propagation :

```jsx
<MenuItem disableRipple />
```

La propriété `disableRipple` va suivre de cette façon : [`MenuItem`](/api/menu-item/) > [`ListItem`](/api/list-item/) > [`ButtonBase`](/api/button-base/).

### Les Propriétés natives

Nous évitons de documenter les propriétés natives supportées par le DOM, comme [` className `](/customization/components/#overriding-styles-with-class-names) .

### Les Classes CSS

Tous les composants acceptent une propriété [` classes `](/customization/components/#overriding-styles-with-classes) pour personnaliser les styles. The classes design answers two constraints: to make the classes structure as simple as possible, while sufficient to implement the Material Design specification.

- The class applied to the root element is always called `root`.
- All the default styles are grouped in a single class.
- The classes applied to non-root elements are prefixed with the name of the element, e.g. `paperWidthXs` in the Dialog component.
- The variants applied by a boolean property **aren't** prefixed, e.g. the `rounded` class applied by the `rounded` property.
- The variants applied by an enum property **are** prefixed, e.g. the `colorPrimary` class applied by the `color="primary"` property.
- A variant has **one level of specificity**. The `color` and `variant` properties are considered a variant. The lower the style specificity is, the simpler it is to override.
- We increase the specificity for a variant modifier. We already **have to do it** for the pseudo-classes (`:hover`, `:focus`, etc.). It allows much more control at the cost of more boilerplate. Hopefully, it's also more intuitive.

```js
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};
```

### Nested components

Nested components inside a component have:

- their own flattened properties when these are key to the top level component abstraction, for instance and `id` property for the `Input` component.
- their own `xxxProps` property when users might need to tweak the internal render method's sub-components, for instance, exposing the `inputProps` and `InputProps` properties on components that use `Input` internally.
- their own `xxxComponent` property for performing component injection.
- their own `xxxRef` property when user might need to perform imperative actions, for instance, exposing a `inputRef` property to access the native `input` on the `Input` component. This helps answer the question ["How can I access the DOM element?"](/getting-started/faq/#how-can-i-access-the-dom-element)

### Property naming

The name of a boolean property should be chosen based on the **default value**. For example, the `disabled` attribute on an input element, if supplied, defaults to `true`. This choice allows the shorthand notation:

```diff
-<Input enabled={false} />
+<Input disabled />
```

### Controlled components

Most of the controlled component are controlled via the `value` and the `onChange` properties, however, the `open` / `onClose` / `onOpen` combination is used for display related state.

### boolean vs enum

There are two options to design the API for the variations of a component: with a *boolean*; or with an *enum*. For example, let's take a button that has different types. Each option has its pros and cons:

- Option 1 *boolean*:
    
    ```tsx
    type Props = {
    contained: boolean;
    fab: boolean;
    };
    ```
    
    This API enabled the shorthand notation: `<Button>`, `<Button contained />`, `<Button fab />`.

- Option 2 *enum*:
    
    ```tsx
    type Props = {
    variant: 'text' | 'contained' | 'fab';
    }
    ```
    
    This API is more verbose: `<Button>`, `<Button variant="contained">`, `<Button variant="fab">`.
    
    However it prevents an invalid combination from being used, bounds the number of properties exposed, and can easily support new values in the future.

The Material-UI components use a combination of the two approaches according to the following rules:

- A *boolean* is used when **2** degrees of freedom are required.
- An *enum* is used when **> 2** degrees of freedom are required, or if there is the possibility that additional degrees of freedom may be required in the future.

Going back to the previous button example; since it requires 3 degrees of freedom, we use an *enum*.

### Ref

The `ref` is forwarded to the root element. This means that, without changing the rendered root element via the `component` prop, it is forwarded to the outermost DOM element that which component renders. If you pass a different component via the `component` prop the ref will be attached to that component instead.

## Glossary

- **host component**: a DOM node type in the context of `react-dom`, e.g. a `'div'`. See also [React Implementation Notes](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements).
- **host element**: a DOM node in the context of `react-dom`, e.g. an instance of `window.HTMLDivElement`.
- **outermost**: The first component when reading the component tree from top to bottom i.e. breadth-first search.
- **root component**: the outermost component that renders a host component.
- **root element**: the outermost element that renders a host component.