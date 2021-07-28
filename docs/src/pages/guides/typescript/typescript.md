# TypeScript

<p class="description">You can add static typing to JavaScript to improve developer productivity and code quality thanks to TypeScript.</p>

Material-UI requires a minimum version of TypeScript 3.5.

Have a look at the [Create React App with TypeScript](https://github.com/mui-org/material-ui/tree/next/examples/create-react-app-with-typescript) example.

In order for types to work, you have to at least have the following options enabled
in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "lib": ["es6", "dom"],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true
  }
}
```

The strict mode options are the same that are required for every types package
published in the `@types/` namespace. Using a less strict `tsconfig.json` or omitting some of the libraries might cause errors. To get the best type experience with the types we recommend
setting `"strict": true`.

## Usage of `component` prop

Many Material-UI components allow you to replace their root node via a `component`
prop, this will be detailed in the component's API documentation.
For example, a Button's root node can be replaced with a React Router's Link, and any additional props that are passed to Button, such as `to`, will be spread to the Link component.
For a code example concerning Button and react-router-dom checkout [these demos](/guides/routing/#component-prop).

To be able to use props of such a Material-UI component on their own, props should be used with type arguments. Otherwise, the `component` prop will not be present in the props of the Material-UI component.

The examples below use `TypographyProps` but the same will work for any component which has props defined with `OverrideProps`.

The following `CustomComponent` component has the same props as the `Typography` component.

```ts
function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
  /* ... */
}
```

Now the `CustomComponent` can be used with a `component` prop which should be set to `'a'`. In addition, the `CustomComponent` will have all props of a `<a>` HTML element. The other props of the `Typography` component will also be present in props of the `CustomComponent`.

It is possible to have generic `CustomComponent` which will accept any React component, custom and HTML elements.

```ts
function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}
```

Now if the `GenericCustomComponent` will be used with a `component` prop provided, it should also have all props required by the provided component.

```ts
function ThirdPartyComponent({ prop1 }: { prop1: string }) {
  return <div />;
}
// ...
<GenericCustomComponent component={ThirdPartyComponent} prop1="some value" />;
```

The `prop1` became required for the `GenericCustomComponent` as the `ThirdPartyComponent` has it as a requirement.

Not every component fully supports any component type you pass in. If you encounter a component that rejects its `component` props in TypeScript please open an issue.
There is an ongoing effort to fix this by making component props generic.

## Handling `value` and event handlers

Many components concerned with user input offer a `value` prop or event handlers
which include the current `value`. In most situations that `value` is only handled
within React which allows it be of any type, such as objects or arrays.

However, that type cannot be verified at compile time in situations where it depends
on the component's children e.g. for `Select` or `RadioGroup`. This means that
the soundest option is to type it as `unknown` and let the developer decide
how they want to narrow that type down. We do not offer the possibility to use a generic
type in those cases for [the same reasons `event.target` is not generic in React](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682).

The demos include typed variants that use type casting. It is an acceptable tradeoff
because the types are all located in a single file and are very basic. You have to decide for yourself
if the same tradeoff is acceptable for you. The library types are be strict
by default and loose via opt-in.
