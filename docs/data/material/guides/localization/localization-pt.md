# Localização

<p class="description">Localização (também referida como "l10n") é o processo de adaptação de um produto ou conteúdo a um idioma ou mercado específico (localidade).</p>

A localidade padrão do Material-UI é em inglês (Estados Unidos). Se você quiser usar outras localidades, siga as instruções abaixo.

## Texto da localidade

Use o tema para configurar os textos da localização globalmente:

```jsx
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  zhCN,
);

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>;
```

### Exemplo

{{"demo": "Locales.js", "defaultCodeOpen": false}}

:::warning
⚠️ For [`DataGrid` and `DataGridPro`](/x/react-data-grid/) components, they have their own [localization](/x/react-data-grid/localization/).
:::

### Localidades suportadas

| Localidade              | Etiqueta do idioma BCP 47 | Nome da importação |
|:----------------------- |:------------------------- |:------------------ |
| Amharic                 | am-ET                     | `amET`             |
| Arabic (Egypt)          | ar-EG                     | `arEG`             |
| Arabic (Sudan)          | ar-SD                     | `arSD`             |
| Armenian                | hy-AM                     | `hyAM`             |
| Azerbaijani             | az-AZ                     | `azAZ`             |
| Bangla                  | bn-BD                     | `bnBD`             |
| Bulgarian               | bg-BG                     | `bgBG`             |
| Catalan                 | ca-ES                     | `caES`             |
| Chinese (Hong Kong)     | zh-HK                     | `zhHK`             |
| Chinese (Simplified)    | zh-CN                     | `zhCN`             |
| Chinese (Taiwan)        | zh-TW                     | `zhTW`             |
| Croatian                | hr-HR                     | `hrHR`             |
| Czech                   | cs-CZ                     | `csCZ`             |
| Danish                  | da-DK                     | `daDK`             |
| Dutch                   | nl-NL                     | `nlNL`             |
| English (United States) | en-US                     | `enUS`             |
| Estonian                | et-EE                     | `etEE`             |
| Finnish                 | fi-FI                     | `fiFI`             |
| French                  | fr-FR                     | `frFR`             |
| German                  | de-DE                     | `deDE`             |
| Greek                   | el-GR                     | `elGR`             |
| Hebrew                  | he-IL                     | `heIL`             |
| Hindi                   | hi-IN                     | `hiIN`             |
| Hungarian               | hu-HU                     | `huHU`             |
| Icelandic               | is-IS                     | `isIS`             |
| Indonesian              | id-ID                     | `idID`             |
| Italian                 | it-IT                     | `itIT`             |
| Japanese                | ja-JP                     | `jaJP`             |
| Khmer                   | kh-KH                     | `khKH`             |
| Kazakh                  | kk-KZ                     | `kkKZ`             |
| Korean                  | ko-KR                     | `koKR`             |
| Macedonian              | mk-MK                     | `mkMK`             |
| Norwegian (bokmål)      | nb-NO                     | `nbNO`             |
| Persian                 | fa-IR                     | `faIR`             |
| Polish                  | pl-PL                     | `plPL`             |
| Portuguese              | pt-PT                     | `ptPT`             |
| Portuguese (Brazil)     | pt-BR                     | `ptBR`             |
| Romanian                | ro-RO                     | `roRO`             |
| Russian                 | ru-RU                     | `ruRU`             |
| Serbian                 | sr-RS                     | `srRS`             |
| Sinhalese               | si-LK                     | `siLK`             |
| Slovak                  | sk-SK                     | `skSK`             |
| Spanish                 | es-ES                     | `esES`             |
| Swedish                 | sv-SE                     | `svSE`             |
| Thai                    | th-TH                     | `thTH`             |
| Turkish                 | tr-TR                     | `trTR`             |
| Ukrainian               | uk-UA                     | `ukUA`             |
| Vietnamese              | vi-VN                     | `viVN`             |

<!-- #default-branch-switch -->

You can [find the source](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/locale/index.ts) in the GitHub repository.

To create your own translation, or to customize the English text, copy this file to your project, make any changes needed and import the locale from there.

Please do consider contributing new translations back to MUI by opening a pull request. However, MUI aims to support the [100 most common](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [locales](https://www.ethnologue.com/guides/ethnologue200), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

## Suporte RTL

Right-to-left languages such as Arabic, Persian, or Hebrew are supported. Follow [this guide](/material-ui/guides/right-to-left/) to use them.
