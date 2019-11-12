# Globalization

<p class="description">Globalization is a process which combines the translation of component messages (localization) with their adaptation to specific cultures (internationalization).</p>

The default locale of Material-UI is English (United States). If you want to use other locales, you can follow the instructions below.

## Locale text

Use the theme to configure the locale text globally

```jsx
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, zhCN);

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

### Supported locales

| Locale | BCP 47 language tag | Import name
|:-------|:---------|:---------|
| Chinese (Simplified) | zh-CN | `zhCN` |
| English (United States) | en-US | `enUS` |
| French | fr-FR | `frFR` |
| German | de-DE |  `deDE` |
| Japanese | ja-JP | `jaJP` |
| Portuguese (Brazil) | pt-BR | `ptBR` |
| Persian | fa-IR | `faIR` |
| Russian | ru-RU | `ruRU` |
| Spanish | es-ES | `esES` |

You can find the [sources](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/locale/index.js) in the GitHub repository.

### Example

{{"demo": "pages/guides/globalization/Locales.js", "defaultCodeOpen": false}}

## RTL Support

Right-to-left languages are Arabic, Hebrew, and others.
Follow [the guide](/guides/right-to-left/) to use them.
