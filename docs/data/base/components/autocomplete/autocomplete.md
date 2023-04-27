---
product: base
title: React Autocomplete hook
hooks: useAutocomplete
githubLabel: 'component: autocomplete'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
---

# Autocomplete

<p class="description">The Autocomplete component is a text input enhanced by a panel of suggested options.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The autocomplete component is an enhanced text input that shows a list of suggested options as users type and lets them select an option from the list. It implements the WAI-ARIA Combobox pattern, and is typically used to assist users complete a form inputs or search queries faster.

{{"demo": "AutocompleteIntroduction.js", "defaultCodeOpen": false, "bg": "gradient"}}

## Usage

After [installation](/base/getting-started/installation/), you can start building with this hook as follows:

```jsx
import useAutocomplete from '@mui/base/useAutocomplete';

export default function App() {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options: [
      { label: 'The Dark Knight', year: 2008 },
      { label: '12 Angry Men', year: 1957 },
      { label: "Schindler's List", year: 1993 },
    ],
    getOptionLabel: (option) => option.label,
  });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 && (
        <ul {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.label}</li>
          ))}
        </ul>
      )}
    </>
  );
}
```

## Basics

The useAutocomplete hook requires a list of `options` to be displayed when the textbox receives focus. The value must be chosen from a predefined set of values.

The following demo shows how to create a simple combobox, apply some styling, and write the selected value to a state variable using the `onChange` prop:

{{"demo": "UseAutocomplete.js"}}

&nbsp;
