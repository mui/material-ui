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
If the color of the select is `neutral`, it will have the focus and highlighted option as `primary` color.
:::

## Component

### Basic

### Field

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

### Render value
