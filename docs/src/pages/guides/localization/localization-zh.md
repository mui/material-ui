# Localization 本地化

<p class="description">本地化（也称为“i10n”），是将一个产品或者一些内容适应到特定的地区或市场的过程。</p>

The default locale of MUI is English (United States). 如果您想使用其他语言环境，您可以遵循以下的说明。

## 本地化的文本

使用 theme 来全局地配置语言环境文本：

```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zhCN } from '@mui/material/locale';

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

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### 支持的地区

| 地区                  | BCP 47 语言标签 | 导入名称   |
|:------------------- |:----------- |:------ |
| Amharic             | am-ET       | `amET` |
| Arabic (Egypt)      | ar-EG       | `arEG` |
| Arabic (Sudan)      | ar-SD       | `arSD` |
| 亚美尼亚语               | hy-AM       | `hyAM` |
| 阿塞拜疆语               | az-AZ       | `azAZ` |
| Bangla              | bn-BD       | `bnBD` |
| 保加利亚语               | bg-BG       | `bgBG` |
| 加泰罗尼亚语              | ca-ES       | `caES` |
| Chinese (Hong Kong) | zh-HK       | `zhHK` |
| 简体中文                | zh-CN       | `zhCN` |
| Chinese (Taiwan)    | zh-TW       | `zhTW` |
| 捷克语                 | cs-CZ       | `csCZ` |
| 荷兰语                 | nl-NL       | `nlNL` |
| 英语（美式）              | en-US       | `enUS` |
| 爱沙尼亚语               | et-EE       | `etEE` |
| 芬兰语                 | fi-FI       | `fiFI` |
| 法语                  | fr-FR       | `frFR` |
| 德语                  | de-DE       | `deDE` |
| Greek               | el-GR       | `elGR` |
| 希伯来语                | he-IL       | `heIL` |
| 印地语                 | hi-IN       | `hiIN` |
| 匈牙利语                | hu-HU       | `huHU` |
| 冰岛语                 | is-IS       | `isIS` |
| 印度尼西亚语              | id-ID       | `idID` |
| 意大利语                | it-IT       | `itIT` |
| 日语                  | ja-JP       | `jaJP` |
| Khmer               | kh-KH       | `khKH` |
| Kazakh              | kz-KZ       | `kzKZ` |
| 韩语/朝鲜语              | ko-KR       | `koKR` |
| 波斯语                 | fa-IR       | `faIR` |
| 波兰语                 | pl-PL       | `plPL` |
| 葡萄牙语                | pt-PT       | `ptPT` |
| 葡萄牙语（巴西）            | pt-BR       | `ptBR` |
| 罗马尼亚语               | ro-RO       | `roRO` |
| 俄罗斯语                | ru-RU       | `ruRU` |
| Sinhalese           | si-LK       | `siLK` |
| 斯洛伐克语               | sk-SK       | `skSK` |
| 西班牙语                | es-ES       | `esES` |
| 瑞典语                 | sv-SE       | `svSE` |
| Thai                | th-TH       | `thTH` |
| 土耳其语                | tr-TR       | `trTR` |
| 乌克兰语                | uk-UA       | `ukUA` |
| 越南语                 | vi-VN       | `viVN` |

<!-- #default-branch-switch -->

您可以在 GitHub 库中找到 [源文件](https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/locale/index.ts)。

To create your own translation, or to customize the English text, copy this file to your project, make any changes needed and import the locale from there.

Please do consider contributing new translations back to MUI by opening a pull request. However, MUI aims to support the [100 most common](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [locales](https://www.ethnologue.com/guides/ethnologue200), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

## RTL 支持

Right-to-left languages such as Arabic, Persian, or Hebrew are supported. 请遵循 [本指南](/guides/right-to-left/) 来使用这些语言。
