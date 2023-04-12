---
product: base
title: Unstyled React Select components and hook
components: SelectUnstyled, MultiSelectUnstyled, OptionUnstyled, OptionGroupUnstyled
githubLabel: 'component: select'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
---

# Unstyled select

<p class="description">The select components let you create lists of options for users to choose from.</p>

## Introduction

A select is a UI element that gives users a list of options to choose from.

Base UI offers two components to replace the native HTML `<select>` tag: `SelectUnstyled` and `MultiSelectUnstyled`. It also includes `OptionUnstyled` for creating the options on the list, and `OptionGroupUnstyled` for grouping those options.

### Features

- 🦍 Can be used as a controlled or uncontrolled component
- 🧬 Accepts custom elements and non-string values for options
- 🪆 Options can be grouped and nested

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Components

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component collection using the following basic elements:

```jsx
import SelectUnstyled from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';

export default function MyApp() {
  return (
    <SelectUnstyled>
      <OptionUnstyled>{/* option one */}</OptionUnstyled>
      <OptionUnstyled>{/* option two */}</OptionUnstyled>
    </SelectUnstyled>
  );
}
```

### Basics

The following demo shows how to create and style a select component. Note that it also uses [`PopperUnstyled`](/base/react-popper/) to render a popup for the list of options:

{{"demo": "UnstyledSelectSimple.js", "defaultCodeOpen": false}}

`SelectUnstyled` accepts generic props. Due to TypeScript limitations, this may cause unexpected behavior when wrapping the component in `forwardRef` (or other higher-order components).

In such cases, the generic argument will be defaulted to `unknown` and type suggestions will be incomplete. To avoid this, you can manually cast the resulting component to the correct type:

```tsx
const CustomSelect = React.forwardRef(function CustomSelect<TValue>(
  props: SelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  // ...your code here...
  return <SelectUnstyled {...props} ref={ref} />;
}) as <TValue>(
  props: SelectUnstyledProps<TValue> & React.RefAttributes<HTMLUListElement>,
) => JSX.Element;
```

For the sake of brevity, the rest of the demos throughout this doc will not use `forwardRef`.

### Multi-select

The `MultiSelectUnstyled` component lets your users select multiple options from the list.

```js
import { MultiSelectUnstyled } from '@mui/base/SelectUnstyled';
```

{{"demo": "UnstyledSelectMultiple.js", "defaultCodeOpen": false}}

### Anatomy

The `SelectUnstyled` and `MultiSelectUnstyled` components are composed of a root `<button>` along with a `<div>` that houses a `<ul>` within `PopperUnstyled`. `OptionUnstyled` renders as an `<li>`:

```html
<button class="MuiSelectUnstyled-root" type="button">Open</button>
<div class="MuiSelectUnstyled-popper">
  <ul class="MuiSelectUnstyled-listbox">
    <li class="MuiOptionUnstyled-root">Option one</li>
    <li class="MuiOptionUnstyled-root">Option two</li>
  </ul>
</div>
```

### Slot props

:::info
The following props are available on all non-utility Base components. See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<SelectUnstyled component="div" />
```

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<SelectUnstyled components={{ Root: 'div', Listbox: 'ol' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots. The following code snippet applies a CSS class called `my-listbox` to the listbox slot:

```jsx
<SelectUnstyled componentsProps={{ listbox: { className: 'my-listbox' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

## Hook

```js
import { useSelect } from '@mui/base/SelectUnstyled';
```

The `useSelect` hook lets you apply the functionality of `SelectUnstyled` to a fully custom component. It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement. With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#component-slots).
:::

The following example shows a select that opens when hovered over or focused. It can be controlled by a mouse/touch or a keyboard.

{{"demo": "UseSelect.js", "defaultCodeOpen": false}}

## Customization

### Controlled select

`SelectUnstyled` can be used as an uncontrolled or controlled component:

{{"demo": "UnstyledSelectControlled.js", "defaultCodeOpen": false}}

### Object values

The `SelectUnstyled` component can be used with non-string values:

{{"demo": "UnstyledSelectObjectValues.js", "defaultCodeOpen": false}}

If you use a SelectUnstyled with object values in a form and post the form contents to a server, the selected value will be converted to JSON. You can change this behavior with the help of the `getSerializedValue` prop.

{{"demo": "UnstyledSelectObjectValuesForm.js", "defaultCodeOpen": false}}

### Selected value appearance

You can customize the appearance of the selected value display by providing a function to the `renderValue` prop. The element returned by this function will be rendered inside the select's button.

{{"demo": "UnstyledSelectCustomRenderValue.js", "defaultCodeOpen": false}}

### Option appearance

Options don't have to be plain strings. You can include custom elements to be rendered inside the listbox.

{{"demo": "UnstyledSelectRichOptions.js", "defaultCodeOpen": false}}

### Grouping options

Options can be grouped, similarly to how the native `<select>` element works. Unlike the native `<select>`, groups can be nested.

The following demo shows how to group options with the `OptionGroupUnstyled` component:

{{"demo": "UnstyledSelectGrouping.js", "defaultCodeOpen": false}}
