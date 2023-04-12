---
product: base
title: Unstyled React Number Input component and hook
components: NumberInputUnstyled
hooks: useNumberInput
githubLabel: 'component: NumberInput'
---

# Unstyled Number Input

<p class="description">The Unstyled Number Input component provides users with a field for integer values, and buttons to increment or decrement the value.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Lorem ipsum etc etc

{{"demo": "UnstyledNumberInputIntroduction.js", "defaultCodeOpen": false, "bg": "gradient"}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import NumberInputUnstyled from '@mui/base/NumberInputUnstyled';

export default function MyApp() {
  return <NumberInputUnstyled />;
}
```

## Hook

```js
import useNumberInput from '@mui/base/useNumberInput';
```

Here's an example of a component built using the hook alone:

{{"demo": "UseNumberInput.js", "defaultCodeOpen": false, "bg": "gradient"}}

## Customization

### Quantity Input

The "purchase quantity" input component from the MUI store:

{{"demo": "QuantityInput.js", "defaultCodeOpen": false, "bg": "gradient"}}

### Steppers only

A compact stepper-only component using the hook:

{{"demo": "UseNumberInputCompact.js", "defaultCodeOpen": false, "bg": "gradient"}}
