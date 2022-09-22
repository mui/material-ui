# CSS theme variables

<p class="description">An overview of adopting CSS theme variables in Material UI.</p>

[CSS variables](https://www.w3.org/TR/css-variables-1/) is a modern cross-browser feature that lets author declare variables in CSS and reuse them in other properties. It enables Material UI to improve theming and customization experience.

If you come across CSS variables the first time, you should check out [the basic](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) before reading our documentation.

## Introduction

CSS theme variables is a new feature in Material UI added in [`v5.6.0`](https://github.com/mui/material-ui/releases/tag/v5.6.0) (**not** enabled by default). It tells Material UI components to use the generated CSS theme variables instead of the raw values.

## Advantages

- It lets you prevent the [dark-mode SSR flickering](https://github.com/mui/material-ui/issues/27651).
- You can create unlimited color schemes beyond `light` and `dark`.
- It offers a better debugging experience not only for developers but also designers in your team as well.
- The color scheme of your website is automatically synced between browser tabs.
- It simplifies the integration with third parties because the CSS theme variables are available globally.
- It reduces the need of a nested theme when you want to apply dark styles to a specific part of your application.

## Trade-offs

For server-side application, there are some trade-offs that are worth noticing:

|                                                      | Compare to the default method | Reason                                                                                                       |
| ---------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| HTML size                                            | bigger                        | CSS variables are generated for both light and dark mode at built time.                                      |
| [First Contentful Paint (FCP)](https://web.dev/fcp/) | larger                        | Since the HTML size is generally bigger, the time to download the HTML before showing the content is longer. |
| [Time to Interactive (TTI)](https://web.dev/tti/)    | Smaller (for dark mode)       | The stylesheet are not regenerated between light and dark mode, so it takes less time for javascript to run. |

:::warning
⚠️ The comparison described in the table might not be eligible for large and complex applications since there are a lot of factors that can impact the metrics.
:::

## Mental model

Adopting CSS variables requires some mental model shift when it comes to theming and customization between user selected modes.

### Colors

**[Default approach](/material-ui/customization/dark-mode/)**: Light and dark colors are created separately.

```js
const lightTheme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
```

**CSS theme variables**: Light and dark colors are consolidated into a theme.

```js
// `extendTheme` is a new API
const theme = extendTheme({
  colorSchemes: {
    light: { // palette for light mode
      palette: {...}
    },
    dark: { // palette for dark mode
      palette: {...}
    }
  }
})
```

### Styling

**Default approach**: usually relies on javascript to switch the value between modes:

```js
createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          // use javascript conditional expression
          color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
        }),
      },
    },
  },
});
```

**CSS theme variables**: the styling leans toward cascading and specificity by using the appropriate selector which lets you prevent the [dark-mode SSR flickering](https://github.com/mui/material-ui/issues/27651).:

```js
extendTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.primary.main,
          // When mode becomes dark, the attribute selector is attached to the <html> by default.
          '[data-mui-color-scheme="dark"] &': {
            color: '#fff',
          },
        }),
      },
    },
  },
});
```

## What's next

- To start a new project with CSS theme variables, check out the [basic usage](/material-ui/experimental-api/css-theme-variables/usage/).
- For an existing Material UI project, check out the [migration guide](/material-ui/experimental-api/css-theme-variables/migration/)
- For theming and customization, check out the [how-to guide](/material-ui/experimental-api/css-theme-variables/customization/).
