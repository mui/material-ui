---
title: Autocomplete React-Komponente
components: TextField, Popper, Autocomplete
---

# Autovervollständigung (Autocomplete)

<p class="description">Die Autovervollständigung ist eine normale Texteingabe, die durch ein Panel mit vorgeschlagenen Optionen ergänzt wird.</p>

Das Widget ist nützlich, um den Wert eines einzeiligen Textfeldes in einem von zwei Arten von Szenarien zu setzen:

1. The value for the textbox must be chosen from a predefined set of allowed values, e.g., a location field must contain a valid location name: [combo box](#combo-box).
2. The textbox may contain any arbitrary value, but it is advantageous to suggest possible values to the user, e.g., a search field may suggest similar or previous searches to save the user time: [free solo](#free-solo).

## Combo box

The value must be chosen from a predefined set of allowed values.

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Spielwiese

Die folgenden Beispiele demonstrieren je eine Funktion der Autocomplete-Komponente.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Länderauswahl

Wählen Sie ein Land aus 248.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

## Free solo

Set `freeSolo` to true so the textbox can contain any arbitrary value. The prop is designed to cover the primary use case of a search box with suggestions, e.g. Google search.

However, if you intend to use it for a [combo box](#combo-box) like experience (an enhanced version of a select element) we recommend setting `selectOnFocus` (it helps the user clearning the selected value).

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Helper message

Sometimes you want to make explicit to the user that he/she can add whatever value he/she wants. The following demo adds a last option: `Add "YOUR SEARCH"`.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

You could also display a dialog when the user wants to add a new value.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Grouped

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Disabled options

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

For advanced customization use cases, we expose a `useAutocomplete()` hook. It accepts almost the same options as the Autocomplete component minus all the props related to the rendering of JSX. The Autocomplete component uses this hook internally.

```jsx
import useAutocomplete from '@material-ui/lab/useAutocomplete';
```

- 📦 [4.5 kB gzipped](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Customized hook

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

Head to the [Customized Autocomplete](#customized-autocomplete) section for a customization example with the `Autocomplete` component instead of the hook.

## Asynchrone Anfragen

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### Google Maps place

A customized UI for Google Maps Places Autocomplete.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

For this demo, we need to load the [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial) API.

> ⚠️ Bevor Sie die Google Maps JavaScript-API verwenden können, müssen Sie sich anmelden und ein Abrechnungskonto erstellen.

## Mehrere Werte

Also known as tags, the user is allowed to enter more than one value.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Fixed options

In the event that you need to lock certain tag so that they can't be removed in the interface, you can set the chips disabled.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Checkboxes

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

## Größen

Fancy smaller inputs? Verwenden Sie die `size` Prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Angepasste Autovervollständigung

This demo reproduces the GitHub's label picker:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

## Highlights

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Benutzerderfinierter Filter

The component exposes a factory to create a filter method that can provided to the `filerOption` prop. You can use it to change the default option filter behavior.

```js
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
```

It supports the following options:

1. `config` (*Object* [optional]): 
  - `config.ignoreAccents` (*Boolean* [optional]): Defaults to `true`. Remove diacritics.
  - `config.ignoreCase` (*Boolean* [optional]): Defaults to `true`. Alles in Kleinbuchstaben.
  - `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
  - `config.stringify` (*Func* [optional]): Defaults to `JSON.stringify`.
  - `config.trim ` (*Boolean* [optional]): Standardeinstellung ist `false`. Abschließende Leerzeichen entfernen.
  - `config.limit` (*Number* [optional]): Default to null. Limit the number of suggested options to be shown. For example, if `config.limit` is `100`, only the first `100` matching options are shown. It can be useful if a lot of options match and virtualization wasn't set up.

In the following demo, the options need to start with the query prefix:

```js
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### Erweitert

For richer filtering mechanisms, like fuzzy matching, it's recommended to look at [match-sorter](https://github.com/kentcdodds/match-sorter). Zum Beispiel:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

## Virtualisierung

Search within 10,000 randomly generated options. The list is virtualized thanks to [react-window](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Einschränkungen

### autocomplete/autofill

The browsers have heuristics to help the users fill the form inputs. However, it can harm the UX of the component.

By default, the component disable the **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute.

However, in addition to remembering past entered values, the browser might also propose **autofill** suggestions (saved login, address, or payment details). In the event you want the avoid autofill, you can try the following:

- Name the input without leaking any information the browser can use. e.g. `id="field1"` instead of `id="country"`. Wenn Sie die ID leer lassen, verwendet die Komponente eine zufällige ID.
- Setze `autoComplete="neues Passwort"`: 
        jsx
        <TextField
        {...params}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password',
        }}
        />

### iOS VoiceOver

VoiceOver on iOS Safari doesn't support the `aria-owns` attribute very well. You can work around the issue with the `disablePortal` prop.

### TypeScript

To fully take advantage of type inference, you need to set the `multiple` prop to `undefined`, `false` or `true`. See [this discussion](https://github.com/mui-org/material-ui/pull/18854#discussion_r364215153) for more details. TypeScript might solve this bug in the future.

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

We encourage the usage of a label for the textbox. The component implements the WAI-ARIA authoring practices.