---
product: joy-ui
title: React Select component
components: Select, Option
githubLabel: 'component: select'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
unstyled: /base/react-select/
---

# Select

<p class="description">Select components are used for collecting user provided information from a list of options.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

The `Select` component is used to trigger a popup that displays a list of `Option` components.

{{"demo": "SelectUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function SelectBasic() {
  return (
    <Select defaultValue="dog">
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
    </Select>
  );
}
```

### Basic usage

The `Select` component is similar to the native HTML's `<select>` and `<option>` tags.

{{"demo": "SelectBasic.js"}}

### Decorators

Use the `startDecorator` and/or `endDecorator` props to add supporting icons or elements to the select.

{{"demo": "SelectDecorators.js"}}

If you have interactive elements as the select's decorators, call `stopPropagation()` from the mouse down event to prevent the popup from being opened.

```jsx
<IconButton
  onMouseDown={(event) => {
    // don't open the popup when clicking on this button
    event.stopPropagation();
  }}
  onClick={() => {
    // click handler goes here
  }
>...</IconButton>
```

### Indicator

To change the default indicator, use the `indicator` prop with either any React element (including string) or `null` as value (to remove the indicator completely).

{{"demo": "SelectIndicator.js"}}

To apply the indicator to all instances of the select component, customize the `indicator` prop directly in the theme:

```js
import { extendTheme, CssVarsProvider } from '@mui/joy/styles';
import Select from '@mui/joy/Select';

const theme = extendTheme({
  components: {
    JoySelect: {
      defaultProps: {
        indicator: '↕',
      },
    },
  },
});

const App = () => (
  <CssVarsProvider theme={theme}>
    <Select>...options</Select>
  </CssVarsProvider>
);
```

### Listbox

#### Maximum height

To change the listbox's maximum height, use `slotProps` prop to target listbox slot:

```jsx
<Select
  slotProps={{
    listbox: {
      sx: {
        maxHeight: '300px',
      },
    },
  }}
>
  ...
</Select>
```

#### Minimum width

By default, the listbox's width is equal to Select's button or the maximum content of its children. You can control the minimum width by using `slotProps` prop to target listbox slot.

{{"demo": "SelectMinWidth.js"}}

:::success
To control the placement of the listbox, use `placement`:

```js
<Select
  slotProps={{
    // the left-edge of the listbox will align with button.
    listbox: { placement: 'bottom-start' },
  }}
>
```

:::

### `Option` component

The `Option` component is used for the choosable options within the select.

The selected option inherits the `color` from the Select parent, and it uses the `primary` palette by default.
However, it does not inherit the Select's used `variant`.

The `ListItemButton` component is very similar to this one, as they share the same internal styles.
In fact, you can mix them together to compose various designs.

In the demo below, we're using the `ListItemDecorator` to provide space between the avatars.
We're also using the `ListDivider` as a visual separator.

{{"demo": "SelectCustomOption.js"}}

:::warning
By default, the option children are used for displaying the selected value.
Take a look at [selected value appearance](#selected-value-appearance) to see how to customize its appearance.
:::

### Grouped options

To create a [listbox with grouped options](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/), wrap the `Option` with `List` component and provide an associated label using `ListItem`.
That way, you'll have a consistent height and will be able to leverage nested CSS variables.

{{"demo": "SelectGroupedOptions.js"}}

:::warning
If you'd like to set a `max-height` for a long list of options, make sure to specify it to the `listbox` slot so that keyboard-based navigation works as expected.

```jsx
<Select
  slotProps={{
    listbox: {
      sx: {
        maxHeight: 300,
        overflow: 'auto', // required for scrolling
      }
    }
  }}
>
```

:::

## Accessibility

In order for the select to be accessible, **it should be linked to a label**.

The `FormControl` automatically generates a unique id that links the select with the `FormLabel` component:

{{"demo": "SelectFieldDemo.js"}}

Alternatively, you can do it manually by targeting the button slot:

```jsx
<label htmlFor="select-button" id="select-label">Label</label>
<Select
  slotProps={{
    button: {
      id: 'select-button',
      'aria-labelledby': 'select-label select-button',
    }
  }}
>
  <Option value="option1">Option I</Option>
  <Option value="option2">Option II</Option>
</Select>
```

## Common examples

### Clear action

Use the `IconButton` component as a decorator to the `Select` to add a clear action.

The `Select` will set the focus-visible state back to the select button after the select value is cleared, ensuring a great keyboard-navigation experience.

{{"demo": "SelectClearable.js"}}

### Selected value appearance

The select will display the value of the `label` prop when the option is selected.

The value can be `string`, `number`, or any valid React element.

{{"demo": "SelectCustomValueAppearance.js"}}

## Debugging

To keep the listbox open for inspecting elements, enable the `Emulate a focused page` option from the [Chrome DevTool Rendering](https://developer.chrome.com/docs/devtools/rendering/apply-effects/#emulate-a-focused-page) tab.
You can also access this option by using [command menu and search for it](https://developer.chrome.com/docs/devtools/command-menu/).
