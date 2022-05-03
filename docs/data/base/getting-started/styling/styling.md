# Styling MUI Base components

<p class="description">Styling</p>

There are several levels of customization available:

## Applying custom CSS rules to unstyled components

If you're happy with the structure of the HTML rendered by the unstyled component by default, you can apply custom styles to the classes used by the component.
Each component has its own set of classes.
Some are static - present on different parts of the component all the time, and some are applied conditionally (like `Mui-disabled`, applied when a component is disabled).

Each component's API documentation lists all classes that the component uses.
Additionally, you can import a `[componentName]Classes` object that describes all the classes a given component uses (see the demo below for an example).

{{"demo": "StylingCustomCss.js"}}

### Overriding the unstyled components' slots

If you don't want to rely on default components, you can override them with your own.
This makes it possible to provide a styled component.
Each unstyled component has a specific set of "slots" - that is subcomponents that you can override.

Let's take a [SwitchUnstyled](/base/api/switch-unstyled/) as an example.
It has three slots: `Root`, `Thumb`, and `Input`.
The demo below shows how to create a styled component (using [System](/system/styled/) in this case, but it could well be any other solution)

{{"demo": "StylingSlots.js"}}

The components you pass in the `components` prop receive the `ownerState` prop from the top-level component (host).
By convention, it contains all props passed to the host, merged with its rendering "state".

For example:

```jsx
<SwitchUnstyled components={{ Thumb: MyCustomThumb }} data-foo="42" />
```

In this case, `MyCustomThumb` component will receive the `ownerState` object with the following data:

```ts
{
  checked: boolean;
  disabled: boolean;
  focusVisible: boolean;
  readOnly: boolean;
  'data-foo': string;
}
```

You can use this object to style your component.

### Creating custom components using hooks

If you need to create your own component structure, you can use the provided hooks.
They encapsulate the logic of the components while not enforcing structure.

Hooks return the current state of the component (`checked`, `disabled`, `open`, etc., depending on the component) and provide functions that return props you can apply to your components.

Again, let's take a Switch as an example. The corresponding hook is called `useSwitch`.
It returns the following object:

```ts
{
  checked: Readonly<boolean>;
  disabled: Readonly<boolean>;
  readOnly: Readonly<boolean>;
  focusVisible: Readonly<boolean>;
  getInputProps: (otherProps?: object) => SwitchInputProps;
}

```

The `checked`, `disabled`, `readOnly`, and `focusVisible` fields represent the state of the switch. Use them to apply styling to your HTML elements.
The `getInputProps` function can be used to get the props to place on an HTML `input` to make the switch accessible.

{{"demo": "StylingHooks.js"}}
