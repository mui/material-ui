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

However, if you intend to use it for a [combo box](#combo-box) like experience (an enhanced version of a select element) we recommend setting `selectOnFocus`.

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

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

### Google Maps Ort

Eine angepasste Oberfläche für Google Maps Places Autovervollständigung.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

Für diese Demo müssen wir die [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial) API laden.

> ⚠️ Bevor Sie die Google Maps JavaScript-API verwenden können, müssen Sie sich anmelden und ein Abrechnungskonto erstellen.

## Mehrere Werte

Auch als Tags bekannt, darf der Benutzer mehr als einen Wert eingeben.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Feste Optionen

Falls Sie bestimmte Tags sperren müssen, damit sie nicht in der Schnittstelle entfernt werden können, können Sie die Chips deaktivieren.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Kontrollkästchen

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

## Größen

Fancy smaller inputs? Verwenden Sie die `size` Prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Angepasste Autovervollständigung

Diese Demo reproduziert die Label-Auswahl von GitHub:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

## Highlights

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Benutzerderfinierter Filter

The component exposes a factory to create a filter method that can provided to the `filerOption` prop. Sie können es verwenden, um das Standard-Filterverhalten der Option zu ändern.

```js
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
```

Es unterstützt die folgenden Optionen:

1. `config` (*Object* [optional]): 
  - `config.ignoreAccents` (*Boolean* [optional]): Defaults to `true`. Remove diacritics.
  - `config.ignoreCase` (*Boolean* [optional]): Defaults to `true`. Alles in Kleinbuchstaben.
  - `config.matchFrom` (*'any' | 'start'* [optional]): Defaults to `'any'`.
  - `config.stringify` (*Func* [optional]): Defaults to `JSON.stringify`.
  - `config.trim ` (*Boolean* [optional]): Standardeinstellung ist `false`. Abschließende Leerzeichen entfernen.

In der folgenden Demo müssen die Optionen mit dem Abfragepräfix beginnen:

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

Suche innerhalb von 10.000 zufällig generierten Optionen. Die Liste ist virtualisiert dank [react-window](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Einschränkungen

### autocomplete/autofill

Die Browser haben Heuristiken, um den Benutzern zu helfen, die Formulareingaben auszufüllen. Es kann jedoch die UX der Komponente negativ beeinflussen.

By default, the component disable the **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute.

Zusätzlich zur Speicherung der eingegebenen Werte kann der Browser aber auch **Autofill** Vorschläge vorschlagen (gespeichertes Login, Adresse oder Zahlungsinformationen). Falls Sie die automatische Füllung vermeiden möchten, können Sie Folgendes versuchen:

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

VoiceOver auf iOS Safari unterstützt das `aria-owns` Attribut nicht sehr gut. You can work around the issue with the `disablePortal` prop.

### TypeScript

To fully take advantage of type inference, you need to set the `multiple` prop to `undefined`, `false` or `true`. See [this discussion](https://github.com/mui-org/material-ui/pull/18854#discussion_r364215153) for more details. TypeScript könnte diesen Fehler in Zukunft lösen.

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

Wir empfehlen die Verwendung eines Labels für die Textbox. Die Komponente implementiert die WAI-ARIA Autorenpraktiken.