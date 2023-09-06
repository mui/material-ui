---
productId: base-ui
title: React Select components and hook
components: Select, Option, OptionGroup
hooks: useSelect, useOption
githubLabel: 'component: select'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
---

# Select

<p class="description">The Select components let you create lists of options for users to choose from.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

A select is a UI element that gives users a list of options to choose from.

Base UI offers components to replace the native HTML `<select>` tag: Select.
It also includes Option for creating the options on the list, and Option Group for grouping those options.

{{"demo": "UnstyledSelectIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

### Features

- 🦍 Can be used as a controlled or uncontrolled component
- 🧬 Accepts custom elements and non-string values for options
- 🗃️ Options can be grouped and nested

## Components

### Usage

After [installation](/base-ui/getting-started/quickstart/#installation), you can start building with this component collection using the following basic elements:

```jsx
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';

export default function MyApp() {
  return (
    <Select>
      <Option value="#F00">Red</Option>
      <Option value="#0F0">Green</Option>
      <Option value="#00F">Blue</Option>
    </Select>
  );
}
```

### Basics

The following demo shows how to create and style a Select component.

{{"demo": "UnstyledSelectBasic", "defaultCodeOpen": false}}

#### Form submission

The value(s) chosen in the Select can be posted to a server using a standard HTML form.
When the `name` prop is set, the Select will render a hidden input with the selected value.

{{"demo": "UnstyledSelectForm.js"}}

Note how the second Select in the demo above renders a hidden input with the name provided as a prop.

You can customize the value of this hidden input.
See the [Object values](#object-values) section to learn how to do it.

#### TypeScript caveat

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
) => JSX.Element;
```

For the sake of brevity, the rest of the demos throughout this doc will not use `forwardRef`.

### Multi-select

The Select component lets your users select multiple options from the list.
In contrast to the single-selection mode, the options popup doesn't close after an item is selected, enabling users to continue choosing more options.

Set the `multiple` prop to turn on the multi-selection mode.

{{"demo": "UnstyledSelectMultiple.js", "defaultCodeOpen": false}}

Note that in the multiple selection mode, the `value` prop (and `defaultValue`) is an array.

### Controlled select

Select can be used as an uncontrolled or controlled component.

:::info

- The value is **controlled** when its parent manages it by providing a `value` prop.
- The value is **uncontrolled** when it is managed by the component's own internal state. This state can be initialized using the `defaultValue` prop.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

{{"demo": "UnstyledSelectControlled.js", "defaultCodeOpen": false}}

To set the value of the controlled Select, use the `value` prop.
The uncontrolled component accepts the `defaultValue` that can be used to set the initial value.
In any case, if you wish to deselect all values, pass `null` to the respective prop.

:::warning
This pattern is where Base UI's Select differs from the equivalent [Material UI component](/material-ui/react-select/).
The Material UI Select takes an empty string to deselect all values.
In Base UI, you must use `null` to achieve this.
:::

### Object values

The Select component can be used with non-string values:

{{"demo": "UnstyledSelectObjectValues.js", "defaultCodeOpen": false}}

If you use a Select with object values in a form and post the form contents to a server, the selected value will be converted to JSON.
You can change this behavior with the help of the `getSerializedValue` prop.

{{"demo": "UnstyledSelectObjectValuesForm.js", "defaultCodeOpen": false}}

### Grouping options

Options can be grouped, similarly to how the native `<select>` element works.
Unlike the native `<select>`, groups can be nested.

The following demo shows how to group options with the Option Group component:

{{"demo": "UnstyledSelectGrouping.js", "defaultCodeOpen": false}}

### Anatomy

The Select component is composed of a root `<button>` along with a `<div>` that houses a `<ul>` within a Popper.
Option renders as an `<li>`:

```html
<button class="MuiSelect-root" type="button">Open</button>
<div class="MuiSelect-popper">
  <ul class="MuiSelect-listbox">
    <li class="MuiOption-root">Option one</li>
    <li class="MuiOption-root">Option two</li>
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

By default, the Select's popup is rendered in a [Portal](https://mui.com/base-ui/react-portal/) and appended to the bottom of the DOM.
To instead render the popup where the component is defined, override the `disablePortal` prop of the underlying Popper, as shown below:

```jsx
<Select slotProps={{ popper: { disablePortal: true } }} />
```

#### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component. This way, you can safely provide the custom root's props directly on the component:

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

The `useSelect` hook lets you apply the functionality of a select to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The following example shows a select built with a hook.
Note how this component does not include any built-in classes.
The resulting HTML is much smaller compared to the unstyled component version, as the class names are not applied.

{{"demo": "UseSelect.js", "defaultCodeOpen": false}}

## Customization

### Selected value appearance

You can customize the appearance of the selected value display by providing a function to the `renderValue` prop.
The element returned by this function will be rendered inside the select's button.

{{"demo": "UnstyledSelectCustomRenderValue.js", "defaultCodeOpen": false}}

### Option appearance

Options don't have to be plain strings.
You can include custom elements to be rendered inside the listbox.

{{"demo": "UnstyledSelectRichOptions.js", "defaultCodeOpen": false}}
