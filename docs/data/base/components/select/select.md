---
productId: base-ui
title: React Select components and hook
components: Select, Option, OptionGroup
hooks: useSelect, useOption, useOptionContextStabilizer
githubLabel: 'component: select'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
---

# Select

<p class="description">The Select components let you create lists of options for users to choose from.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

A select is a UI element that gives users a list of options to choose from.

Base UI's Select component replaces the native HTML `<select>` tag.
It also includes the Option component for creating the options in the list, and Option Group for grouping those options.

{{"demo": "UnstyledSelectIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Components

```jsx
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
```

The following demo shows how to create and style a Select component with several Options:

{{"demo": "UnstyledSelectBasic", "defaultCodeOpen": false}}

### Form submission

The value(s) chosen in the Select can be posted to a server using a standard HTML form.

{{"demo": "UnstyledSelectForm.js"}}

You can customize the value of this hidden input—see the [Object values](#object-values) section for details.

### TypeScript caveat

Select's props are generic.
Due to TypeScript limitations, this may cause unexpected behavior when wrapping the component in `forwardRef` (or other higher-order components).

In such cases, the generic argument will be defaulted to `unknown` and type suggestions will be incomplete.
To avoid this, you can manually cast the resulting component to the correct type:

```tsx
const CustomSelect = React.forwardRef(function CustomSelect<TValue>(
  props: SelectProps<TValue>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  // ...your code here...
  return <Select {...props} ref={ref} />;
}) as <TValue>(
  props: SelectProps<TValue> & React.RefAttributes<HTMLUListElement>,
) => React.JSX.Element;
```

For the sake of brevity, the rest of the demos throughout this doc will not use `forwardRef`.

### Multiple selections

Set the `multiple` prop to let your users select multiple options from the list.
In contrast with single-selection mode, the options popup doesn't close after an item is selected, which enables users to continue choosing more options.

Note that in multiple selection mode, the `value` prop (and `defaultValue`) is an array.

{{"demo": "UnstyledSelectMultiple.js", "defaultCodeOpen": false}}

### Controlled select

Select can be used as an uncontrolled or controlled component.

:::info

- The value is **controlled** when its parent manages it by providing a `value` prop.
- The value is **uncontrolled** when it is managed by the component's own internal state. This state can be initialized using the `defaultValue` prop.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

{{"demo": "UnstyledSelectControlled.js", "defaultCodeOpen": false}}

Use the `value` prop to set the value of the controlled Select.
The uncontrolled component accepts the `defaultValue` that can be used to set the initial value.
To deselect all values, pass `null` to the respective prop.

:::warning
This pattern is where Base UI's Select differs from the equivalent [Material UI component](/material-ui/react-select/).
The Material UI Select takes an empty string to deselect all values.
In Base UI, you must use `null` to achieve this.
:::

### Object values

The Select component can be used with non-string values:

{{"demo": "UnstyledSelectObjectValues.js", "defaultCodeOpen": false}}

If you use a Select with object values in a form and post the form contents to a server, the selected value will be converted to JSON.
You can change this behavior with the help of the `getSerializedValue` prop.

{{"demo": "UnstyledSelectObjectValuesForm.js", "defaultCodeOpen": false}}

### Grouping options

```jsx
import { OptionGroup } from '@mui/base/OptionGroup';
```

Options can be grouped, similarly to how the native `<select>` element works.
Unlike the native `<select>`, groups can be nested.

The following demo shows how to group Options with the Option Group component:

{{"demo": "UnstyledSelectGrouping.js", "defaultCodeOpen": false}}

### Anatomy

The Select component is composed of a root `<button>` along with a `<div>` that houses a `<ul>` within a [Popup](/base-ui/react-popup/).
Option renders as an `<li>`, and Option Group renders a `<ul>` with an `<li>` that represents its label.

```html
<button class="base-Select-root" type="button">Open</button>
<div class="base-Select-popup">
  <ul class="base-Select-listbox">
    <li class="base-Option-root">Option one</li>
    <li class="base-Option-root">Option two</li>
  </ul>
</div>
```

### Custom structure

Use the `slots` prop to override the root or any other interior slot:

```jsx
<Select slots={{ root: 'div', listbox: 'ol' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-listbox` to the listbox slot:

```jsx
<Select slotProps={{ listbox: { className: 'my-listbox' } }} />
```

### Portals

By default, the Select's popup is rendered in a [Portal](/base-ui/react-portal/) and appended to the bottom of the DOM.
To instead render the popup where the component is defined, override the `disablePortal` prop of the underlying Popup, as shown below:

```jsx
<Select slotProps={{ popup: { disablePortal: true } }} />
```

### Transitions

The Select component supports the [Transitions API](/base-ui/react-transitions/), so it's possible to animate the appearing and disappearing Listbox.
To do this, override the Listbox slot of the Select and wrap it with a transition component ([CssTransition](/base-ui/react-transitions/#css-transition), [CssAnimation](/base-ui/react-transitions/#css-animation), or a custom-built one).

{{"demo": "UnstyledSelectTransitions.js", "defaultCodeOpen": false}}

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<Select<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Select<'button'> slots={{ root: 'button' }} onClick={() => {}} />
```

## Hooks

```js
import { useSelect } from '@mui/base/useSelect';
```

The `useSelect` hook lets you apply the functionality of a Select to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The following example shows a select built with a hook.
Note how this component does not include any built-in classes.
The resulting HTML is much smaller compared with its prebuilt component counterpart, because the class names are not applied.

{{"demo": "UseSelect.js", "defaultCodeOpen": false}}

### Performance

The `useOption` hook listens to changes in a context that is set up by the parent Select component.
This context changes every time an item is highlighted.
Usually, it shouldn't be a problem, however, when your select has hundreds of options, you may notice it's not very responsive, as every option is rerendered whenever highlight changes.

To improve performance by preventing options from rendering unnecessarily, you can create a component that wraps the option.
Inside this component, call `useOptionContextStabilizer` and create a ListContext with the value from the hook's result:

```tsx
const StableOption = React.forwardRef(function StableOption<OptionValue>(
  props: OptionProps<OptionValue>,
  ref: React.ForwardedRef<Element>,
) {
  const { contextValue } = useOptionContextStabilizer(props.value);

  return (
    <ListContext.Provider value={contextValue}>
      <Option {...props} ref={ref} />
    </ListContext.Provider>
  );
});
```

The `useOptionContextStabilizer` hook ensures that the context value changes only when the state of the option is updated.

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos, and code snippets primarily feature components.
:::

### Selected value appearance

You can customize the appearance of the selected value display by providing a function to the `renderValue` prop.
The element returned by this function will be rendered inside the Select's button.

{{"demo": "UnstyledSelectCustomRenderValue.js"}}

### Option appearance

Options don't have to be plain strings.
You can include custom elements to be rendered inside the listbox.

{{"demo": "UnstyledSelectRichOptions.js"}}
