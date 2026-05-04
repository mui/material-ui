---
productId: material-ui
title: React Autocomplete component
components: TextField, Popper, Autocomplete
githubLabel: 'scope: autocomplete'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
githubSource: packages/mui-material/src/Autocomplete
---

# Autocomplete

<p class="description">A text input that suggests matching options as you type.</p>

Autocomplete supports three core interaction modes:

1. Pick a single value from a predefined list, like a country picker: [Combobox](#combobox).
2. Pick multiple values shown as chips, like a tag picker: [Multiple values](#multiple-values).
3. Accept any text with suggestions, like a search field: [Free solo](#free-solo).

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Usage guidelines

- **Use for filterable choices**: Autocomplete is best for lists that are too long to scan. Use [Select](/material-ui/react-select/) instead for short lists.
- **Form controls must have an accessible name**: Use a visible `TextField` `label` when possible, or add `aria-label` if the label is hidden.
- **Keep the popup option-only**: The listbox should only contain selectable options. Avoid buttons, links, or non-option controls such as "Select all" because they disrupt keyboard semantics and assistive technology behavior.

## Combobox

Use the basic combobox when users need to search a predefined list and pick one value.

{{"demo": "ComboBox.js"}}

### Options structure

By default, options can be strings or objects with a `label` string. You can add fields that model your data, such as a stable ID, timestamp, or grouping field. TypeScript infers the option type from the `options` prop, so callbacks like `onChange` are strongly typed.

```ts
interface AutocompleteOption {
  label: string;
  id?: string | number;
}
// or
type AutocompleteOption = string;
```

For example:

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

When using object options, you must provide `isOptionEqualToValue` so the component can match the current value to the right option. The default comparison uses strict equality (`===`), which only works when the value reference is the same as one of the options:

```tsx
<Autocomplete
  options={options}
  isOptionEqualToValue={(option, value) => option.id === value.id}
/>
```

To display a value other than `label`, use `getOptionLabel` to return a string representing each option:

```tsx
const options = [
  { id: '1', email: 'alice@example.com' },
  { id: '2', email: 'bob@example.com' },
];

<Autocomplete options={options} getOptionLabel={(option) => option.email} />;
```

Autocomplete uses the label as the React key for each option by default. If two options share the same label, keep `getOptionLabel` for the display text and use `getOptionKey` to provide a stable key for each rendered option:

```tsx
// Two contacts happen to share the same display name
const options = [
  { label: 'John Smith', id: 'usr_4f12a7b8' },
  { label: 'John Smith', id: 'usr_e9c3d521' },
];

<Autocomplete
  options={options}
  getOptionLabel={(option) => option.label}
  getOptionKey={(option) => option.id}
/>;
```

### Playground

Each example below demonstrates one feature.

{{"demo": "Playground.js"}}

### Country select

Use `renderOption` to customize each option. This country picker renders a flag, country code, and calling code.

{{"demo": "CountrySelect.js"}}

### Controlled states

Autocomplete has two states that can be controlled independently:

1. **`value`** with `value`/`onChange`—the option the user has selected, set when they press <kbd class="key">Enter</kbd> or click an option.
2. **`inputValue`** with `inputValue`/`onInputChange`—the text currently shown in the textbox.

Control them independently—the two states aren't linked.

:::info

- A component is **controlled** when its parent manages it through props.
- A component is **uncontrolled** when it manages its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

{{"demo": "ControllableStates.js"}}

:::warning

If you control `value`, keep the reference stable between renders by passing the same array or object if its contents haven't changed.

```tsx
// ⚠️ BAD
return <Autocomplete multiple value={allValues.filter((v) => v.selected)} />;

// 👍 GOOD
const selectedValues = React.useMemo(
  () => allValues.filter((v) => v.selected),
  [allValues],
);
return <Autocomplete multiple value={selectedValues} />;
```

In the first example, `allValues.filter` returns **a new array** every render. Wrapping it in `useMemo` ensures the array only changes when its contents change.
:::

### Disabled options

Mark specific options as disabled with the `getOptionDisabled` prop.

{{"demo": "DisabledOptions.js"}}

### Grouped

Group options with the `groupBy` prop. Sort the options by the same field you're grouping on—otherwise the same group header repeats.

{{"demo": "Grouped.js"}}

### Custom group rendering

Customize how groups render with the `renderGroup` prop. It receives an object with:

- `key`—the React key to apply to the rendered group
- `group`—the group name string
- `children`—the list items in that group

The demo below groups countries by continent and customizes the group rendering.

{{"demo": "RenderGroup.js"}}

## Free solo

Use `freeSolo` when the input should accept values outside the provided options.

### Search input

Designed for **search inputs** with suggestions—for example, Google search or a typeahead field.

{{"demo": "FreeSolo.js"}}

:::warning
Free solo with non-string options can cause type mismatches. The typed value is always a string, so make sure your callbacks can handle both strings and option objects:

```tsx
<Autocomplete
  freeSolo
  options={options}
  getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
/>
```

:::

### Creatable

To let users pick an existing option or create a new one, we recommend setting:

- `selectOnFocus`: highlight the input's current text when it receives focus so the user can overwrite it.
- `clearOnBlur`: clear leftover input text on blur when no option is picked or created.
- `handleHomeEndKeys`: move focus to the first or last option with <kbd class="key">Home</kbd> and <kbd class="key">End</kbd>.
- `resetHighlightOnMouseLeave`: clear mouse-created highlights when the pointer leaves the popup.
- A trailing option like `Add "${inputValue}"` to make the create action discoverable.

{{"demo": "FreeSoloCreateOption.js"}}

Or open a dialog when the user wants to add a new value.

{{"demo": "FreeSoloCreateOptionDialog.js"}}

## Multiple values

Set `multiple={true}` to let users select more than one value. By default, selected values render as removable Material UI Chips; customize their rendering with `renderValue`.

- Spread the props from `getItemProps` onto each rendered item to preserve the component's built-in behavior.
- If you replace the default Chip, destructure `onDelete` first; it's specific to `Chip`.

{{"demo": "Tags.js"}}

### Fixed options

To lock certain tags so they can't be removed, mark their chips as disabled.

{{"demo": "FixedTags.js"}}

### Selection indicators

Use icons as a visual cue for sighted users to show which options are selected.

{{"demo": "CheckboxesTags.js"}}

### Limit tags

Use `limitTags` to limit how many selected items are visible when the input isn't focused.

{{"demo": "LimitTags.js"}}

## Asynchronous requests

The component supports two async patterns:

- [Load on open](#load-on-open): wait until the user interacts before fetching options.
- [Search as you type](#search-as-you-type): make a new request on every keystroke.

### Load on open

Shows a loading state while the request is pending.

{{"demo": "Asynchronous.js"}}

### Search as you type

If you fetch new options on every keystroke and filter on the server, throttle the requests.

Also disable the built-in client-side filtering—the server has already filtered the options, so re-filtering them would hide valid matches. Pass an identity function to `filterOptions`:

```jsx
<Autocomplete filterOptions={(x) => x} />
```

### Google Maps place

A customized UI on top of Google Places Autocomplete. The demo loads the [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/overview) and [Google Places](https://developers.google.com/maps/documentation/places/web-service/overview) APIs.

{{"demo": "GoogleMaps.js"}}

It uses [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting matched text.

:::error
You'll need your own [API key](https://developers.google.com/maps/documentation/javascript/get-api-key) to use the Google Maps and Places APIs.

This demo has a limited request quota. Once it's exceeded, results fall back to "Paris".
:::

### Infinite loading

Uses `@tanstack/react-query` to fetch more options when the user scrolls to the bottom of the list. The list is virtualized with `@tanstack/react-virtual`.

{{"demo": "InfiniteLoading.js"}}

## Customization

### Single value rendering

In the default single-selection mode (when `multiple={false}`), the selected option appears as plain text inside the input. Use `renderValue` to customize the display—for example, to add icons, badges, or formatted output.

The `renderValue` callback receives two parameters:

- `value`: the selected option to render inside the input.
- `getItemProps`: returns props for the rendered item. Forward the DOM-safe props you need, such as `className`, `data-item-index`, and `tabIndex`; omit `onDelete` unless you render a Chip.

{{"demo": "CustomSingleValueRendering.js"}}

### Highlights

Uses [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight) (1 kB) to highlight the matched portion of each option label.

{{"demo": "Highlights.js"}}

### Custom filter

Customize how options are filtered with `createFilterOptions`—a factory that returns a function suitable for the `filterOptions` prop.

```js
import { createFilterOptions } from '@mui/material/Autocomplete';
```

#### `createFilterOptions(config) => filterOptions`

**Arguments**

1. `config` (_object_ [optional]):

- `config.ignoreAccents` (_bool_ [optional]): Defaults to `true`. Removes diacritics.
- `config.ignoreCase` (_bool_ [optional]): Defaults to `true`. Lowercases everything.
- `config.limit` (_number_ [optional]): Defaults to `null`. Limits how many matched options are shown. Useful when many options match and the listbox isn't virtualized.
- `config.matchFrom` (_'any' | 'start'_ [optional]): Defaults to `'any'`.
- `config.stringify` (_func_ [optional]): Controls how an option is converted to a string for matching against the input.
- `config.trim` (_bool_ [optional]): Defaults to `false`. Removes trailing spaces.

**Returns**

`filterOptions`: a function ready to pass to the `filterOptions` prop of `Autocomplete` (or the option of the same name in `useAutocomplete`).

In the demo below, options must start with the query string:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "Filter.js", "defaultCodeOpen": false}}

### Advanced filter

For richer filtering—like fuzzy matching—we recommend [match-sorter](https://github.com/kentcdodds/match-sorter):

```jsx
import { matchSorter } from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

### Sizes

Use the `size` prop to render a smaller input.

{{"demo": "Sizes.js"}}

### Custom input

Customize the rendered input with the `renderInput` prop. Forward the input ref and HTML input props to preserve the Autocomplete behavior.

:::warning
When using a custom input component, forward the ref to the underlying DOM element.
:::

```tsx
<Autocomplete
  options={options}
  renderInput={(params) => (
    <div ref={params.slotProps.input.ref}>
      <input type="text" {...params.slotProps.htmlInput} />
    </div>
  )}
/>
```

### Globally customized options

To customize option rendering for every Autocomplete in your app, set `renderOption` in [theme default props](/material-ui/customization/theme-components/#theme-default-props).

`renderOption` receives `ownerState` as its fourth argument, which exposes props and internal state. Use `ownerState.getOptionLabel` to render the label.

This keeps option styling consistent across the app while letting each instance customize its content.

{{"demo": "GloballyCustomizedOptions.js"}}

### GitHub's picker

A reproduction of GitHub's label picker:

{{"demo": "GitHubLabel.js"}}

### Hint

Add a hint (ghost text suggestion) inside the input:

{{"demo": "AutocompleteHint.js"}}

### Events

Callbacks such as `onChange`, `onClose`, `onHighlightChange`, and `onInputChange` include a `reason` argument. Use it to distinguish user input from selection, clear, and other internal updates:

- Selected value changes use `AutocompleteChangeReason`, covering selection, creation, removal, clear, and blur transitions.
- Textbox changes use `AutocompleteInputChangeReason`, which separates user typing from resets, clears, blur, and option selection or removal.
- Popup and highlight changes use `AutocompleteCloseReason` and `AutocompleteHighlightChangeReason` to describe why the popup closed or how the highlighted option moved.

```jsx
<Autocomplete
  onInputChange={(_event, value, reason) => {
    if (reason === 'input') {
      setQuery(value);
    }
  }}
/>
```

To override the default key handling, set `defaultMuiPrevented` to `true` on the event:

```jsx
<Autocomplete
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      // Prevents the default 'Enter' behavior.
      event.defaultMuiPrevented = true;
      // your handler code
    }
  }}
/>
```

### Virtualization

Searches through a fixed list of 10,000 randomly generated options. The list is virtualized with [react-window](https://github.com/bvaughn/react-window).

{{"demo": "Virtualize.js"}}

### `useAutocomplete`

Use the `useAutocomplete` hook when you need full control over markup. Import it from `@mui/material/useAutocomplete` ([4.6 kB gzipped](https://bundlephobia.com/package/@mui/material)); it accepts the same options as `Autocomplete`, minus the rendering props. The snippet shows the essential setup for a headless combobox.

```tsx
import useAutocomplete from '@mui/material/useAutocomplete';

interface Option {
  label: string;
}

interface MyAutocompleteProps {
  id: string;
  label: string;
  options: readonly Option[];
}

function MyAutocomplete({ id, label, options }: MyAutocompleteProps) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id,
    options,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <label {...getInputLabelProps()}>{label}</label>
        <input {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key} {...optionProps}>
                {option.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function App() {
  return <MyAutocomplete id="movie" label="Movie" options={movies} />;
}

interface Film extends Option {
  year: number;
}

const movies: readonly Film[] = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
];
```

This demo shows a fully customized multi-selection combobox built with `useAutocomplete`.

{{"demo": "CustomizedHook.js", "defaultCodeOpen": false}}

## Limitations

### autocomplete/autofill

Browsers use heuristics to try to autofill form inputs—but this can interfere with the Autocomplete experience.

By default, the component sets `autoComplete="off"` to disable the browser's autocomplete history (remembering past entries for a field). Google Chrome ignores this setting ([Issue 41239842](https://issues.chromium.org/issues/41239842)). A workaround: remove the `id` so the component generates a random one.

Browsers may also propose **autofill** suggestions (saved logins, addresses, payment details). To avoid these:

- Use a generic input id that doesn't hint at the field's purpose—`id="field1"` rather than `id="country"`. Leave it empty to get a random id.
- Set `autoComplete="new-password"` (some browsers will offer a strong password for these inputs):

  ```jsx
  <TextField
    {...params}
    slotProps={{
      ...params.slotProps,
      htmlInput: {
        ...params.slotProps.htmlInput,
        autoComplete: 'new-password',
      },
    }}
  />
  ```

Read [the guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Turning_off_form_autocompletion) for more details.

### iOS VoiceOver

VoiceOver on iOS Safari has poor support for `aria-owns`. Work around it with the `disablePortal` prop.

### Custom listbox component

When you provide a custom `listbox` slot, set `role="listbox"` on the scroll container. This is what keyboard navigation looks for to scroll the highlighted item into view.
