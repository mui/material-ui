---
productId: base-ui
title: React Autocomplete hook
hooks: useAutocomplete
githubLabel: 'component: autocomplete'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
---

# Autocomplete

<p class="description">An autocomplete component is a text input enhanced by a panel of suggested options.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

An autocomplete component is an enhanced text input that shows a list of suggested options as users type and lets them select an option from the list.

Base UI provides the `useAutocomplete` hook for building a custom Autocomplete.
It implements the WAI-ARIA Combobox pattern and is typically used to assist users in completing form inputs or search queries faster.

{{"demo": "AutocompleteIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

:::warning
Material UI and Joy UI have Autocomplete components that are built using the `useAutocomplete` hook, and they include many features not yet described here.

To learn more about implementing a custom Autocomplete, you can explore the [`useAutocomplete` API docs](/base-ui/react-autocomplete/hooks-api/#use-autocomplete), or reference the Material UI and Joy UI implementations:

- [Material UI Autocomplete](/material-ui/react-autocomplete/)
- [Joy UI Autocomplete](/joy-ui/react-autocomplete/)

:::

## Hook

```jsx
import { useAutocomplete } from '@mui/base/useAutocomplete';
```

The `useAutocomplete` hook requires a list of `options` to be displayed when the textbox receives focus.
The value must be chosen from a predefined set of values.

The following demo shows how to create a simple combobox, apply styles, and write the selected value to a state variable using the `onChange` prop:

{{"demo": "UseAutocomplete.js"}}

## Customization

### Rendering options

By default, the `options` prop accepts an array of `string`s or `{ label: string }`:

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

If you need to use a different structure for options, you must provide a function to the `getOptionLabel` prop that resolves each option to a unique value.

```js
const options = [
  { issuer: 'Bank of America', brand: 'Visa', last4: '1234' },
  { issuer: 'Bank of America', brand: 'MasterCard', last4: '5678' },
  { issuer: 'Barclays', brand: 'Visa', last4: '4698' },
  // ...
];

const {
  getRootProps,
  // etc
} = useAutocomplete({
  getOptionLabel: (option) => option.last4,
});
```

### Controlled states

The `useAutocomplete` hook has two states that can be controlled:

1. the "value" state with the `value`/`onChange` props combination. This state represents the value selected by the user, for instance when pressing <kbd class="key">Enter</kbd>.
2. the "input value" state with the `inputValue`/`onInputChange` props combination. This state represents the value displayed in the textbox.

These two states are isolated and should be controlled independently.

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

{{"demo": "ControlledStates.js"}}

### Using a portal

React Portals can be used to render the listbox outside of the DOM hierarchy, making it easier to allow it to "float" above adjacent elements.

Base UI provides a [Popper](/base-ui/react-popper/) component built around React's `createPortal()` for exactly this purpose, and additionally helps you manage keyboard focus as it moves in and out of the portal.

To render the listbox in Base UI's Popper, the `ref`s must be merged as follows:

```jsx
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Popper } from '@mui/base/Popper';
import { unstable_useForkRef as useForkRef } from '@mui/utils';

export default function App(props) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    popupOpen,
    anchorEl,
    setAnchorEl,
    groupedOptions,
  } = useAutocomplete(props);

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <React.Fragment>
      <div {...getRootProps()} ref={rootRef}>
        <input {...getInputProps()} />
      </div>
      {anchorEl && (
        <Popper open={popupOpen} anchorEl={anchorEl}>
          {groupedOptions.length > 0 && (
            <ul {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>{option.label}</li>
              ))}
            </ul>
          )}
        </Popper>
      )}
    </React.Fragment>
  );
}
```

Here's a complete demo that renders the listbox inside a Popper:

{{"demo": "UseAutocompletePopper.js", "defaultCodeOpen": false}}
