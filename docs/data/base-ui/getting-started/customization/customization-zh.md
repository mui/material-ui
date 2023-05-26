# Customizing Base UI components

<p class="description">There are several ways to customize Base UI components, from applying custom CSS rules to building fully custom components using hooks.</p>

With Base UI, you have the freedom to decide how much you want to customize a component's structure and style.

This document reviews the three levels of customization that are available: applying custom CSS rules, overriding default subcomponent slots, and using hooks to build fully custom components.

## Applying custom CSS rules

If you're happy with the default structure of a component's rendered HTML, you can apply custom styles to the component's classes.

Each component has its own set of classes. Some classes are **static**, which is to say that they are always present on the component. Others are applied **conditionally**—like `Mui-disabled`, for example, which is only present when a component is disabled.

Each component's API documentation lists all classes that the component uses. Additionally, you can import a `[componentName]Classes` object that describes all the classes a given component uses, as the following demo illustrates:

{{"demo": "StylingCustomCss.js", "defaultCodeOpen": true}}

## Overriding subcomponent slots

If you want to make changes to a component's rendered HTML structure, you can override the default subcomponents ("slots") using the `components` and/or `component` prop—see ["Shared props" on the Base Usage page](/base/getting-started/usage/#shared-props) for more details.

The following demo uses [SwitchUnstyled](/base/react-switch/) to show how to create a styled component by applying styles to three of its subcomponent slots: `Root`, `Thumb`, and `Input`.

Note that although this demo uses [MUI System](/system/styled/) as a styling solution, you are free to choose any alternative.

{{"demo": "StylingSlots.js"}}

The components you pass in the `components` prop receive the `ownerState` prop from the top-level component (the "owner"). By convention, it contains all props passed to the owner, merged with its rendering state.

For example:

```jsx
<SwitchUnstyled components={{ Thumb: MyCustomThumb }} data-foo="42" />
```

In this case, `MyCustomThumb` component receives the `ownerState` object with the following data:

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

## Creating custom components using hooks

If you need complete control over a component's rendered HTML structure, you can build it with hooks.

Hooks give you access to the _logic_ that a component uses, but without any default structure. See ["Components vs. hooks" on the Base Usage page](/base/getting-started/usage/#components-vs-hooks) for more details.

Hooks return the current state of the component (e.g. `checked`, `disabled`, `open`, etc.) and provide functions that return props you can apply to your fully custom components.

In the case of [SwitchUnstyled](/base/react-switch/), the component is accompanied by the `useSwitch` hook which gives you all of the functionality without any structure.

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

The `getInputProps` function can be used to get the props to place on an HTML `<input>` to make the switch accessible.

{{"demo": "StylingHooks.js", "defaultCodeOpen": true}}
