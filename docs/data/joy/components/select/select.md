---
product: joy-ui
title: React Select component
githubLabel: 'component: select'
unstyled: /base/react-select/
---

# Select

<p class="description">Select components are used for collecting user provided information from a list of options.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

Users can trigger a popup by clicking on the `Select` which then displays a list of `Option` components.

{{"demo": "SelectUsage.js", "hideToolbar": true}}

:::info
📝 Note

- The selected option inherits `color` from the select, and uses `primary` color by default.
- The option **does not** inherit `variant` from the select.
  :::

## Component

### Basic

The basic usage of the Select components is similar to native `<select>` and `<option>`.

{{"demo": "SelectBasic.js"}}

### Field

Use `FormLabel` for visually associated with the select and provide appropriate `aria-label` to the button slot. If the select has a helper text associated with, provides the id to the button's `aria-describedby`.

{{"demo": "SelectFieldDemo.js"}}

### Decorators

Use `startDecorator` and/or `endDecorator` to show extra content in the select.

{{"demo": "SelectDecorators.js"}}

### Indicator

You can change the default indicator by providing any React element (including string) to `indicator` prop or using `null` to remove the indicator completely.

{{"demo": "SelectIndicator.js"}}

To apply the indicator to all select instances, provide it to the theme's default props like this:

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

## Customization

### Option

You can think of the option as if it is `ListItemButton` component because they share the same style internally, so you can mix list item components within an option.

In this case, `ListItemDecorator` is used to provide enough space for the avatar and `ListDivider` is used as a visual separator.

{{"demo": "SelectCustomOption.js"}}

:::info
By default, the option children is used for displaying the selected value. Take a look at [selected value appearance](#selected-value-appearance), to see how to customize the appearance.
:::

### Selected value appearance

The select will display the value of the `label` prop when the option is selected.

The value can be `string`, `number`, or any valid React element.

{{"demo": "SelectCustomValueAppearance.js"}}

### Group options

To create [listbox with grouped options](https://www.w3.org/WAI/ARIA/apg/example-index/listbox/listbox-grouped.html), wrap the options with `List` component and provide an associated label using `ListItem` to have consistent height and leverage nested CSS variables.

{{"demo": "SelectGroupedOptions.js"}}

:::info
If you'd like to set a max-height for a long list of options, make sure to specify it to the `listbox` slot so that the keyboard navigation works as expected.

```jsx
<Select
  componentsProps={{
    listbox: {
      sx: {
        maxHeight: 300,
        overflow: 'auto', // this is required to make it scrollable.
      }
    }
  }}
>
```

:::

## Debugging

To keep the listbox open for inspecting elements, you can enable the `Emulate a focused page` option from the [Chrome DevTool Rendering](https://developer.chrome.com/docs/devtools/rendering/apply-effects/#emulate-a-focused-page) tab. You can also access this option by using [command menu and search for it](https://developer.chrome.com/docs/devtools/command-menu/).
