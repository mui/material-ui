---
product: base
title: React Select unstyled component and hook
components: SelectUnstyled, MultiSelectUnstyled, OptionUnstyled, OptionGroupUnstyled
githubLabel: 'component: select'
waiAria: https://www.w3.org/TR/wai-aria-practices/#combobox
---

# Select

<p class="description">The `SelectUnstyled` and `MultiSelectUnstyled` components let you create menus of options for users to choose from.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

MUI Base offers two components to replace the native HTML `<select>` tag: `SelectUnstyled` and `MultiSelectUnstyled`.

## SelectUnstyled

```tsx
import SelectUnstyled from '@mui/base/SelectUnstyled';
```

### Basic usage

{{"demo": "UnstyledSelectSimple.js"}}

The `SelectUnstyled` component accepts generic props.
Due to TypeScript limitations, this may cause unexpected behavior when wrapping the component in `forwardRef` (or other higher-order components).
In such cases, the generic argument will be defaulted to `unknown` and type suggestions will be incomplete.
To avoid this, you can manually cast the resulting component to the correct type, as shown in the demo above.

For the sake of brevity, the rest of the demos that follow will not use `forwardRef`.

### Controlled select

The SelectUnstyled can be used as either uncontrolled (as shown in the demo above) or controlled component.

{{"demo": "UnstyledSelectControlled.js"}}

### Usage with object values

The unstyled select may be used with non-string values.

{{"demo": "UnstyledSelectObjectValues.js"}}

### Customizing the selected value appearance

You can customize the selected value display by providing a function to the `renderValue` prop.
The element returned by this function will be rendered inside the select's button.

{{"demo": "UnstyledSelectCustomRenderValue.js"}}

### Customizing the options' appearance

Options don't have to be plain strings.
You can include custom elements to be rendered inside the listbox.

{{"demo": "UnstyledSelectRichOptions.js"}}

### Grouping

Options can be grouped, similarly to the how the native `select` element works.
Unlike the native `select`, however, groups can be nested.

Place the `Option` components inside `OptionGroup` to achieve this.

{{"demo": "UnstyledSelectGrouping.js"}}

## MultiSelectUnstyled

The `MultiSelectUnstyled` component lets your users select multiple options.

```js
import { MultiSelectUnstyled } from '@mui/base/SelectUnstyled';
```

{{"demo": "UnstyledSelectMultiple.js"}}

## The useSelect hook

```js
import { useSelect } from '@mui/base/SelectUnstyled';
```

You can use the `useSelect` hook to apply the functionality of `SelectUnstyled` to a different component.
This hook gives you the most customization options, but requires more work to implement.

The following example shows a select that opens when hovered over or focused.
It can be controlled by a mouse/touch or a keyboard.

{{"demo": "UseSelect.js"}}
