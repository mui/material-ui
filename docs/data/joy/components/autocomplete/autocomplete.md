---
product: joy-ui
title: React Autocomplete component
githubLabel: 'component: autocomplete'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
---

# Autocomplete

<p class="description">The Autocomplete component is a text input enhanced by a panel of suggested options when users start typing.</p>

## Introduction

The Autocomplete component is an enhanced version of a text input that shows suggested options as a user types, and lets them select options from the list.
It includes many sophisticated customization options to suit a wide range of design and user experience needs.

{{"demo": "Playground.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Usage

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';

export default function App() {
  return <Autocomplete options={['Option 1', 'Option 2']} />;
}
```

## Basics

The Autocomplete component requires a list of options, which is displayed when the input receives focus.
The user must choose from this predefined set of values passed to the `options` prop.
This prop accepts either an array of strings, or an array of objects with the desired values assigned to the `label` key, as shown below:

```js
// options can be an array of strings...
const options = ['The Godfather', 'Pulp Fiction'];

// ...or an array of objects (using the label key)
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

```

{{"demo": "BasicAutocomplete.js"}}

## Customization

### Custom option labels

Use the `getOptionLabel` prop to populate the Autocomplete component with values assigned to a different key than `label`.
For example, the code snippet below populates the Autocomplete with values from the `title` key instead:

```js
const options = [
  { title: 'Pulp Fiction', id: 2 },
  // ...
];

<Autocomplete getOptionLabel={option => option.title}>
```

### Option appearance

To customize the appearance of the options, use the `renderOption` prop along with the Autocomplete Option component as an option container.

{{"demo": "CountrySelect.js"}}

### Variants

The Autocomplete component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid`, `soft`, `outlined` (default), and `plain`.

{{"demo": "InputAppearance.js"}}

:::success
To learn how to add more variants to the component, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
:::

### Label

Put an Autocomplete, a Form Label, and a Form Helper Text (optional) under a Form Control component to create an accessible Autocomplete:

{{"demo": "LabelAndHelperText.js"}}

### Decorators

Use `startDecorator` or `endDecorator` to insert decorators to the autocomplete.

{{"demo": "AutocompleteDecorators.js"}}

### Controlled states

The component has two states that can be controlled:

1. the "value" state with the `value`/`onChange` props combination. This state represents the value selected by the user, for instance when pressing <kbd class="key">Enter</kbd>.
2. the "input value" state with the `inputValue`/`onInputChange` props combination. This state represents the value displayed in the textbox.

:::warning
⚠️ These two states are isolated, and should be controlled independently.
:::

{{"demo": "ControllableStates.js"}}

### Disabled options

Use `getOptionDisabled` prop to read the options and returns `true` to disable them.

{{"demo": "DisabledOptions.js"}}

### Grouped options

You can group the options with the `groupBy` prop.
If you do so, make sure that the options are also sorted with the same dimension that they are grouped by,
otherwise, you will notice duplicate headers.

{{"demo": "Grouped.js"}}

### Loading

It displays a progress state as long as the network request is pending.

{{"demo": "Asynchronous.js"}}

### Search input

Use `freeSolo` to create a search input with suggestions, similar to Google search or [react-autowhatever](https://github.com/moroshko/react-autowhatever).

{{"demo": "FreeSolo.js"}}

:::warning
⚠️ Be careful when using the free solo mode with non-string options, as it may cause type mismatch.

The value created by typing into the textbox is always a string, regardless of the type of the options.
:::

### User-created option

If you intend to use `freeSolo` mode for a [combo box](#combo-box)-like experience (an enhanced version of a select element), try using:

- `selectOnFocus` to help the user clear the selected value.
- `clearOnBlur` to help the user enter a new value.
- `handleHomeEndKeys` to move focus inside the popup with the <kbd class="key">Home</kbd> and <kbd class="key">End</kbd> keys.
- A last option, for instance: `Add "YOUR SEARCH"`.

{{"demo": "FreeSoloCreateOption.js"}}

You could also display a dialog when the user wants to add a new value:

{{"demo": "FreeSoloCreateOptionDialog.js"}}

:::info
The Autocomplete Option component uses the same styles and variables as [List Item Button](/joy-ui/react-list/#actionable), so that you get the same customization experience.
:::

### Validation

To display an invalid state, set the `error` prop on the Form Control.

{{"demo": "AutocompleteError.js"}}

### Multiple selection

By default, Autocomplete uses the [Chip](/joy-ui/react-chip/) component to render the user's selected options.

When the Autocomplete is focused, the user can press the backspace to remove the latest selected option from the list.

{{"demo": "Tags.js"}}

### Selected options appearance

Use the `renderTag` prop to customize the appearance.

{{"demo": "CustomTags.js"}}

### Limit the selected options to be displayed

You can use the `limitTags` prop to limit the number of displayed options when not focused.

{{"demo": "LimitTags.js"}}

### Sizes

The Autocomplete component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`. The size is propagated to internal components, including `Input`, `Chip`, and `List`.

{{"demo": "Sizes.js"}}

:::success
To learn how to add more sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

The `size` can also be controlled at the Form Control.

{{"demo": "SizeWithLabel.js"}}

### Custom filter

The component exposes a factory to create a filter method that can be provided to the `filterOptions` prop.
You can use it to change the default option filter behavior.

```js
import { createFilterOptions } from '@mui/material/Autocomplete';
```

#### Arguments

1. `config` (_object_ [optional]):

- `config.ignoreAccents` (_bool_ [optional]): Defaults to `true`. Remove diacritics.
- `config.ignoreCase` (_bool_ [optional]): Defaults to `true`. Lowercase everything.
- `config.limit` (_number_ [optional]): Default to null. Limit the number of suggested options to be shown. For example, if `config.limit` is `100`, only the first `100` matching options are shown. It can be useful if a lot of options match and virtualization wasn't set up.
- `config.matchFrom` (_'any' | 'start'_ [optional]): Defaults to `'any'`.
- `config.stringify` (_func_ [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
- `config.trim` (_bool_ [optional]): Defaults to `false`. Remove trailing spaces.

#### Returns

`filterOptions`: the returned filter method can be provided directly to the `filterOptions` prop of the `Autocomplete` component, or the parameter of the same name for the hook.

In the following demo, the options need to start with the query prefix:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "Filter.js", "defaultCodeOpen": false}}

### Advanced filter

For richer filtering mechanisms, like fuzzy matching, try using [match-sorter](https://github.com/kentcdodds/match-sorter) as a reference point. For instance:

```jsx
import { matchSorter } from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Common examples

### Highlighting options

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "Highlights.js"}}

### GitHub label picker

To reproduce GitHub's label picker, the Autocomplete is rendered inside an [Unstyled Popper](/base/react-popper/).
To remove the popup behavior from the autocomplete, replace the listbox slot with the Autocomplete Listbox component.

{{"demo": "GitHubLabel.js"}}

### Virtualization

Search within 10,000 randomly-generated options.
The list is virtualized thanks to [react-window](https://github.com/bvaughn/react-window).

{{"demo": "Virtualize.js"}}

## Events

To prevent the default key handler behavior, you can set the event's `defaultMuiPrevented` property to `true`:

```jsx
<Autocomplete
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      // Prevent's default 'Enter' behavior.
      event.defaultMuiPrevented = true;
      // your handler code
    }
  }}
/>
```

## CSS Variables

The Autocomplete component reuses CSS variables from the Input component to give you a consistent customization experience.

{{"demo": "AutocompleteVariables.js", "hideToolbar": true}}

## Limitations

### Autocomplete and autofill

By default, the component disables the input _autocomplete_ feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute.
Google Chrome does not currently support this attribute setting ([Issue 587466](https://bugs.chromium.org/p/chromium/issues/detail?id=587466)).
A possible workaround is to remove the `id` to have the component generate a random one.

In addition to remembering previously entered values, the browser might also propose _autofill_ suggestions (saved login, address, or payment details).
To avoid autofill, you can try the following:

- Name the input without leaking any information the browser can use. e.g. `id="field1"` instead of `id="country"`. If you leave the id empty, the component uses a random id.
- Set `autoComplete="new-password"` (some browsers will suggest a strong password for inputs with this attribute setting):

  ```jsx
  <Autocomplete
    componentsProps={{
      input: {
        autoComplete: 'new-password',
      },
    }}
  />
  ```

Read [the guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for more details.

### iOS VoiceOver

VoiceOver on iOS Safari doesn't support the `aria-owns` attribute very well.
You can work around the issue with the `disablePortal` prop.

```jsx
<Autocomplete
  componentsProps={{
    listbox: {
      disablePortal: true,
    },
  }}
/>
```

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

The component implements the WAI-ARIA authoring practices.
Be sure to add a label for the textbox.

## Anatomy

The Autocomplete component is composed of an `<input>` and a `<button>` housed in a wrapper `<div>`, which in turn is nested within the root `<div>`:

```html
<div class="JoyAutocomplete-root" aria-owns=":r39:-listbox">
  <div class="JoyAutocomplete-wrapper">
    <input
      id=":r39:"
      aria-autocomplete="list"
      aria-expanded="true"
      autocomplete="off"
      autocapitalize="none"
      spellcheck="false"
      role="combobox"
      placeholder="Combo box"
      class="JoyAutocomplete-input"
      value=""
      aria-controls=":r39:-listbox"
    />
  </div>
  <button
    tabindex="-1"
    aria-label="Close"
    title="Close"
    class="JoyAutocomplete-popupIndicator JoyAutocomplete-popupIndicatorOpen"
  >
    <svg
      class="JoySvgIcon-root"
      focusable="false"
      aria-hidden="true"
      data-testid="ArrowDropDownIcon"
      viewBox="0 0 24 24"
    >
      <path d="M7 10l5 5 5-5z"></path>
    </svg>
  </button>
</div>
```
