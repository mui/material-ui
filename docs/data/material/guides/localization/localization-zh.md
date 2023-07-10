# Localization 本地化

<p class="description">本地化（也称为“i10n”），是将一个产品或者一些内容适应到特定的地区或市场的过程。</p>

The default locale of MUI is English (United States). 如果您想使用其他语言环境，您可以遵循以下的说明。 If you want to use other locales, follow the instructions below.

## 本地化的文本

使用 theme 来全局地配置语言环境文本：

```jsx
import { createTheme, ThemeProvider } from '@mui/core/styles';
import { zhCN } from '@mui/core/locale';

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

### 示例

{{"demo": "Locales.js", "defaultCodeOpen": false}}

:::warning
⚠️ For [`DataGrid` and `DataGridPro`](/x/react-data-grid/) components, they have their own [localization](/x/react-data-grid/localization/).
:::

### 支持的地区

| 地区                      | BCP 47 语言标签 | 导入名称   |
|:----------------------- |:----------- |:------ |
| Amharic                 | am-ET       | `amET` |
| Arabic (Egypt)          | ar-EG       | `arEG` |
| Arabic (Sudan)          | ar-SD       | `arSD` |
| Armenian                | hy-AM       | `hyAM` |
| Azerbaijani             | az-AZ       | `azAZ` |
| Bangla                  | bn-BD       | `bnBD` |
| Bulgarian               | bg-BG       | `bgBG` |
| Catalan                 | ca-ES       | `caES` |
| Chinese (Hong Kong)     | zh-HK       | `zhHK` |
| Chinese (Simplified)    | zh-CN       | `zhCN` |
| Chinese (Taiwan)        | zh-TW       | `zhTW` |
| Croatian                | hr-HR       | `hrHR` |
| Czech                   | cs-CZ       | `csCZ` |
| Danish                  | da-DK       | `daDK` |
| Dutch                   | nl-NL       | `nlNL` |
| English (United States) | en-US       | `enUS` |
| Estonian                | et-EE       | `etEE` |
| Finnish                 | fi-FI       | `fiFI` |
| French                  | fr-FR       | `frFR` |
| German                  | de-DE       | `deDE` |
| Greek                   | el-GR       | `elGR` |
| Hebrew                  | he-IL       | `heIL` |
| Hindi                   | hi-IN       | `hiIN` |
| Hungarian               | hu-HU       | `huHU` |
| Icelandic               | is-IS       | `isIS` |
| Indonesian              | id-ID       | `idID` |
| Italian                 | it-IT       | `itIT` |
| Japanese                | ja-JP       | `jaJP` |
| Khmer                   | kh-KH       | `khKH` |
| Kazakh                  | kk-KZ       | `kkKZ` |
| Korean                  | ko-KR       | `koKR` |
| Macedonian              | mk-MK       | `mkMK` |
| Norwegian (bokmål)      | nb-NO       | `nbNO` |
| Persian                 | fa-IR       | `faIR` |
| Polish                  | pl-PL       | `plPL` |
| Portuguese              | pt-PT       | `ptPT` |
| Portuguese (Brazil)     | pt-BR       | `ptBR` |
| Romanian                | ro-RO       | `roRO` |
| Russian                 | ru-RU       | `ruRU` |
| Serbian                 | sr-RS       | `srRS` |
| Sinhalese               | si-LK       | `siLK` |
| Slovak                  | sk-SK       | `skSK` |
| Spanish                 | es-ES       | `esES` |
| Swedish                 | sv-SE       | `svSE` |
| Thai                    | th-TH       | `thTH` |
| Turkish                 | tr-TR       | `trTR` |
| Ukrainian               | uk-UA       | `ukUA` |
| Vietnamese              | vi-VN       | `viVN` |

<!-- #default-branch-switch -->

You can [find the source](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/locale/index.ts) in the GitHub repository.

To create your own translation, or to customize the English text, copy this file to your project, make any changes needed and import the locale from there.

Please do consider contributing new translations back to MUI by opening a pull request. However, MUI aims to support the [100 most common](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [locales](https://www.ethnologue.com/guides/ethnologue200), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

## RTL 支持

Right-to-left languages such as Arabic, Persian, or Hebrew are supported. Follow [this guide](/material-ui/guides/right-to-left/) to use them.
