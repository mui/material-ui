---
product: joy-ui
title: React Select component
components: Select, Option
githubLabel: 'component: select'
unstyled: /base/react-select/
---

# Select

<p class="description">Select components are used for collecting user provided information from a list of options.</p>

## Introduction

The `Select` component is used to trigger a popup that displays a list of `Option` components.

{{"demo": "SelectUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

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

### Field

Use the `FormLabel` component to add a label to the select component. Make sure to provide an appropriate `aria-label` and an id to the button's `aria-describedby`.

{{"demo": "SelectFieldDemo.js"}}

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

### `Option` component

The `Option` component is used for the chooseable options within the select.

The selected option inherits the `color` from the Select parent, and it uses the `primary` palette by default. However, it does not inherit the Select's used `variant`.

The `ListItemButton` component is very similar to this one, as they share the same internal styles. In fact, you can mix them together to compose various designs.

In the demo below, we're using the `ListItemDecorator` to provide space between the avatars. We're also using the `ListDivider` as a visual separator.

{{"demo": "SelectCustomOption.js"}}

:::info
💡 **Keep in mind:** By default, the option children is used for displaying the selected value. Take a look at [selected value appearance](#selected-value-appearance) to see how to customize its appearance.
:::

#### Group options

To create a [listbox with grouped options](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/), wrap the `Option` with `List` component and provide an associated label using `ListItem`. That way, you'll have a consistent height and will be able to leverage nested CSS variables.

{{"demo": "SelectGroupedOptions.js"}}

:::info
💡 **Keep in mind:** If you'd like to set a `max-height` for a long list of options, make sure to specify it to the `listbox` slot so that keyboard-based navigation works as expected.

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

## Common examples

### Clear action

Use the `IconButton` component as a decorator to the `Select` to add a clear action.

The `Selct` will set the focus-visible state back to the select button after the select value is cleared, ensuring a great keyboard-navigation experience.

{{"demo": "SelectClearable.js"}}

### Selected value appearance

The select will display the value of the `label` prop when the option is selected.

The value can be `string`, `number`, or any valid React element.

{{"demo": "SelectCustomValueAppearance.js"}}

## Debugging

To keep the listbox open for inspecting elements, enable the `Emulate a focused page` option from the [Chrome DevTool Rendering](https://developer.chrome.com/docs/devtools/rendering/apply-effects/#emulate-a-focused-page) tab. You can also access this option by using [command menu and search for it](https://developer.chrome.com/docs/devtools/command-menu/).
