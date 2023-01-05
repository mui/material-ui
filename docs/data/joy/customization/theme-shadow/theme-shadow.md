# Theme shadow

<p class="description">Learn about the theme's default shadow and how to customize them.</p>

## Default tokens

Joy UI uses T-shirt scale for defining shadows which are used by components such as [`Card`](/joy-ui/react-card/), [`Menu`](/joy-ui/react-menu/), etc.

These tokens are grouped inside `theme.shadow` node:

{{"demo": "ShadowThemeViewer.js", "bg": "inline"}}

## Customizing the default shadow

Provide a key-values to the `shadow` node to override the default shadows:

```js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  shadow: {
    xs: '{CSS box-shadow}',
    sm: '{CSS box-shadow}',
    md: '{CSS box-shadow}',
    lg: '{CSS box-shadow}',
    xl: '{CSS box-shadow}',
  },
});

// Then, pass it to `<CssVarsProvider theme={theme}>`.
```

:::info
We recommend that the shadow value uses `var(--joy-shadowRing)` and `var(--joy-shadowChannel)` similar to the above [default token value](#default-tokens).
:::

## Adding new shadows

You can add any custom keys to the `shadow` node:

```js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  shadow: {
    subtle: '{CSS box-shadow}',
    strong: '{CSS box-shadow}',
  },
});

// Then, pass it to `<CssVarsProvider theme={theme}>`.
```

### TypeScript

You need to augment the theme's `Shadow` interface with the new keys:

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface Shadow {
    subtle: string;
    strong: string;
  }
}
```

## Shadow ring

The shadow ring can be configured for both light and dark color schemes. To create a shadow ring, provide a valid CSS box-shadow to the `shadowRing` node:

```js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      // This creates a 1px box-shadow.
      shadowRing: '0 0 0 1px rgba(0 0 0 / 0.1)',
    },
    dark: {
      shadowChannel: '0 0 0 1px rgba(255 255 255 / 0.1)',
    },
  },
});

// Then, pass it to `<CssVarsProvider theme={theme}>`.
```

:::warning
Customizing the theme's shadow ring will affect all Joy UI components that consume the theme's shadows.

If you want to create a shadow ring to a specific element, see [Customizing shadow on an element](#customizing-shadow-on-an-element).
:::

## Shadow colors

The color of the shadow comes from the theme's token named `var(--joy-shadowChannel)`. You can customize the value for both light and dark color schemes:

```js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      shadowChannel: '12 12 12',
    },
    dark: {
      shadowChannel: '0 0 0',
    },
  },
});

// Then, pass it to `<CssVarsProvider theme={theme}>`.
```

:::warning
The `shadowChannel` value must be rgb channels, e.g. `187 187 187`.
:::

## Customizing shadow on an element

To customize a shadow color or shadow ring on a specific instance, use the raw value from the `theme.shadow.*`.

:::info
**Don't** use shadows from `theme.vars` or the shorthand syntax `{ shadow: '{key}' }`.
:::

```js
// ✅
<Button
  sx={(theme) => ({
    boxShadow: theme.shadow.md,
    '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
    '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
  })}
>

// ❌ Both of these do not work
<Button
  sx={(theme) => ({
    boxShadow: 'md',
    '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
    '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
  })}
>
<Button
  sx={(theme) => ({
    boxShadow: theme.vars.shadow.md,
    '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
    '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
  })}
>
```

{{"demo": "CustomShadowOnElement.js"}}
