# Localization 本地化

<p class="description">本地化（也称为“i10n”），是将一个产品或者一些内容适应到特定的地区或市场的过程。</p>

The default locale of MUI is English (United States). 如果您想使用其他语言环境，您可以遵循以下的说明。 If you want to use other locales, follow the instructions below.

## 本地化的文本

使用 theme 来全局地配置语言环境文本：

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

### 示例

{{"demo": "Locales.js", "defaultCodeOpen": false}}

> ⚠️ For [`DataGrid` and `DataGridPro`](/x/react-data-grid/) components, they have their own [localization](/x/react-data-grid/localization/).

### 支持的地区

| 地区                      | BCP 47 语言标签 | 导入名称   |
|:----------------------- |:----------- |:------ |
| Amharic                 | am-ET       | `amET` |
| Arabic (Egypt)          | ar-EG       | `arEG` |
| Arabic (Saudi Arabia)   | ar-SA       | `arSA` |
| Arabic (Sudan)          | ar-SD       | `arSD` |
| 亚美尼亚语                   | hy-AM       | `hyAM` |
| 阿塞拜疆语                   | az-AZ       | `azAZ` |
| Bangla                  | bn-BD       | `bnBD` |
| 保加利亚语                   | bg-BG       | `bgBG` |
| 加泰罗尼亚语                  | ca-ES       | `caES` |
| Chinese (Hong Kong)     | zh-HK       | `zhHK` |
| 简体中文                    | zh-CN       | `zhCN` |
| Chinese (Taiwan)        | zh-TW       | `zhTW` |
| 捷克语                     | hr-HR       | `hrHR` |
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
| Kazakh                  | kz-KZ       | `kzKZ` |
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

您可以在 GitHub 库中找到 [源文件](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/locale/index.ts)。

要创建自己的翻译，或自定义英文文本，请将此文件复制到您的项目中，进行所需的任何更改并从那里导入语言环境。

请考虑创建一个拉取请求（pull request）来为 Material UI 贡献新的译文。 然而，Material UI 的目标是支持 [100 个最常见的](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [本地化语言](https://www.ethnologue.com/guides/ethnologue200)，我们可能不接受不常用的本地化语言的贡献，例如 `gl-ES`，它“只有”250 万母语使用者。

## RTL 支持

支持从右到左的语言，如阿拉伯语（Arabic）、波斯语（Persian ）或希伯来语（Hebrew ）。 请遵循 [本指南](/material-ui/guides/right-to-left/) 来使用这些语言。
