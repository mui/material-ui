# TypeScript

<p class="description">You can add static typing to JavaScript to improve developer productivity and code quality thanks to TypeScript.</p>

## Minimum configuration

<!-- #default-branch-switch -->

Material UI requires a minimum version of TypeScript 4.7. Have a look at the [Create React App with TypeScript](https://github.com/mui/material-ui/tree/next/examples/material-ui-cra-ts) example.

For types to work, it's recommended that you have at least the following options enabled in your `tsconfig.json`:

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
published in the `@types/` namespace.
Using a less strict `tsconfig.json` or omitting some of the libraries might cause errors.
To get the best type experience with the types we recommend setting `"strict": true`.

## Handling `value` and event handlers

Many components concerned with user input offer a `value` prop or event handlers
which include the current `value`. In most situations that `value` is only handled
within React which allows it be of any type, such as objects or arrays.

However, that type cannot be verified at compile time in situations where it depends on the component's children, for example `Select` or `RadioGroup`.
This means that the soundest option is to type it as `unknown` and let the developer decide how they want to narrow that type down.
We do not offer the possibility to use a generic type in those cases for [the same reasons `event.target` is not generic in React](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682).

The demos include typed variants that use type casting.
It is an acceptable tradeoff because the types are all located in a single file and are very basic.
You have to decide for yourself if the same tradeoff is acceptable for you.
The library types are strict by default and loose via opt-in.

## Customization of `Theme`

Moved to [the Customizing the theme page](/material-ui/customization/theming/#custom-variables).

## Complications with the `component` prop

Because of some TypeScript limitations, using the `component` prop can be problematic if you are creating your custom component based on the Material UI's components.
For the composition of the components, you will likely need to use one of these two options:

1. Wrap the Material UI component in order to enhance it
2. Use the `styled()` utility in order to customize the styles of the component

If you are using the first option, take a look at the [composition guide](/material-ui/guides/composition/#with-typescript) for more details.

If you are using the `styled()` utility (regardless of whether it comes from `@mui/material` or `@emotion/styled`), you will need to cast the resulting component as shown below:

```tsx
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  // your custom styles go here
}) as typeof Button;
```
