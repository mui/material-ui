---
product: base
title: React Select unstyled component and hook
components: ''
githubLabel: 'component: select'
waiAria: https://www.w3.org/TR/wai-aria-practices/#combobox
---

# Select

<p class="description">Select components are used for choosing options from a list.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

MUI Base offers two components that aim to replace the native `<select>` tag: SelectUnstyled and MultiSelectUnstyled.

## The SelectUnstyled component

```tsx
import SelectUnstyled from '@mui/base/SelectUnstyled';
```

### Basic usage

{{"demo": "UnstyledSelectSimple.js"}}

The `SelectUnstyled` is a component that accepts generic props.
Due to Typescript limitations, this may cause unexpected behavior when wrapping the component in `forwardRef` (or other higher-order components).
In such cases, the generic argument will be defaulted to `unknown` and type suggestions will be incomplete.
To avoid this, manually cast the resulting component to the correct type (as shown above).

The rest of the demos below will not use `forwardRef` for brevity.

### Controlled select

The SelectUnstyled can be used as either uncontrolled (as shown in the demo above) or controlled component.

{{"demo": "UnstyledSelectControlled.js"}}

### Usage with object values

The unstyled select may be used with non-string values.

{{"demo": "UnstyledSelectObjectValues.js"}}

### Customizing the selected value appearance

It is possible to customize the selected value display by providing a function to the `renderValue` prop.
The element returned by this function will be rendered inside the select's button.

{{"demo": "UnstyledSelectCustomRenderValue.js"}}

### Customizing the options' appearance

Options don't have to be plain strings.
You can include custom elements to be rendered inside the listbox.

{{"demo": "UnstyledSelectRichOptions.js"}}

### Grouping

Options can be grouped, similarly to the how the native `select` element works.
Unlike the native `select`, however, the groups can be nested.

Place the `Option` components inside `OptionGroup` to achieve this.

{{"demo": "UnstyledSelectGrouping.js"}}

### Multiselect

To be able to select multiple options at once, use the `MultiSelectUnstyled` component.

```js
import { MultiSelectUnstyled } from '@mui/base/SelectUnstyled';
```

{{"demo": "UnstyledSelectMultiple.js"}}

## The useSelect hook

```js
import { useSelect } from '@mui/base/SelectUnstyled';
```

If you need to use Select's functionality in another component, you can use the `useSelect` hook.
It enables maximal customizability at the cost of being lower-level.

The following example shows a select that opens when hovered over or focused.
It can be controlled by a mouse/touch or a keyboard.

{{"demo": "UseSelect.js"}}
