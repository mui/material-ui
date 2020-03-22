# 本地化

<p class="description">本地化（也称为“i10n”），是使产品或内容适应特定地区或市场的过程。</p>

Material-UI 的默认语言环境是 English (United States)。 如果您想使用其他语言环境，按照下面的说明去做。

## 本地化文本

使用主题来全局地配置语言环境文本：

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

### 支持的语言环境

| 地区                      | BCP 47 语言标签 | 导入名称   |
|:----------------------- |:----------- |:------ |
| Armenian                | hy-AM       | `hyAM` |
| Azerbaijani             | az-AZ       | `azAZ` |
| Bulgarian               | bg-BG       | `bgBG` |
| Catalan                 | ca-ES       | `caES` |
| Chinese (Simplified)    | zh-CN       | `zhCN` |
| Czech                   | cs-CZ       | `csCZ` |
| Dutch                   | nl-NL       | `nlNL` |
| English (United States) | en-US       | `enUS` |
| Estonian                | et-EE       | `etEE` |
| Finnish                 | fi-FI       | `fiFI` |
| French                  | fr-FR       | `frFR` |
| German                  | de-DE       | `deDE` |
| Hebrew                  | he-IL       | `heIL` |
| Hungarian               | hu-HU       | `huHU` |
| Icelandic               | is-IS       | `isIS` |
| Indonesian              | id-ID       | `idID` |
| Italian                 | it-IT       | `itIT` |
| Japanese                | ja-JP       | `jaJP` |
| Korean                  | ko-KR       | `koKR` |
| Persian                 | fa-IR       | `faIR` |
| Polish                  | pl-PL       | `plPL` |
| Portuguese (Brazil)     | pt-BR       | `ptBR` |
| Portuguese              | pt-PT       | `ptPT` |
| Romanian                | ro-RO       | `roRO` |
| Russian                 | ru-RU       | `ruRU` |
| Slovak                  | sk-SK       | `skSK` |
| Spanish                 | es-ES       | `esES` |
| Swedish                 | sv-SE       | `svSE` |
| Turkish                 | tr-TR       | `trTR` |
| Ukrainian               | uk-UA       | `ukUA` |
| Vietnamese              | vi-VN       | `viVN` |

您可以在GitHub库中找到[源文件](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/locale/index.js)。

要创建自己的翻译，或自定义英文文本，请将此文件复制到您的项目中，进行所需的任何更改并从那里导入语言环境。 （请务必考虑通过开启一个 pull request 为 Material-UI 贡献新的翻译。）

### 示例

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

## RTL 支持

支持从右到左的语言，如阿拉伯语（Arabic）、波斯语（Persian ）或希伯来语（Hebrew ）。 遵循[本指南](/guides/right-to-left/)使用它们。
