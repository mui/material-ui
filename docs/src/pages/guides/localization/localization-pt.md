# Localização

<p class="description">Localização (também referida como "l10n") é o processo de adaptação de um produto ou conteúdo a um idioma ou mercado específico (localidade).</p>

The default locale of MUI is English (United States). Se você quiser usar outras localidades, siga as instruções abaixo.

## Texto da localidade

Use o tema para configurar os textos da localização globalmente:

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

### Exemplo

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### Localidades suportadas

| Localidade              | Etiqueta do idioma BCP 47 | Nome da importação |
|:----------------------- |:------------------------- |:------------------ |
| Árabe (Egito)           | ar-EG                     | `arEG`             |
| Arabic (Sudan)          | ar-SD                     | `arSD`             |
| Armenian                | hy-AM                     | `hyAM`             |
| Azerbaijani             | az-AZ                     | `azAZ`             |
| Bangla                  | bn-BD                     | `bnBD`             |
| Bulgarian               | bg-BG                     | `bgBG`             |
| Catalan                 | ca-ES                     | `caES`             |
| Chinese (Hong Kong)     | zh-HK                     | `zhHK`             |
| Chinese (Simplified)    | zh-CN                     | `zhCN`             |
| Chinese (Taiwan)        | zh-TW                     | `zhTW`             |
| Czech                   | cs-CZ                     | `csCZ`             |
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
| Kazakh                  | kz-KZ                     | `kzKZ`             |
| Korean                  | ko-KR                     | `koKR`             |
| Persian                 | fa-IR                     | `faIR`             |
| Polish                  | pl-PL                     | `plPL`             |
| Portuguese              | pt-PT                     | `ptPT`             |
| Portuguese (Brazil)     | pt-BR                     | `ptBR`             |
| Romanian                | ro-RO                     | `roRO`             |
| Russian                 | ru-RU                     | `ruRU`             |
| Sinhalese               | si-LK                     | `siLK`             |
| Slovak                  | sk-SK                     | `skSK`             |
| Spanish                 | es-ES                     | `esES`             |
| Swedish                 | sv-SE                     | `svSE`             |
| Thai                    | th-TH                     | `thTH`             |
| Turkish                 | tr-TR                     | `trTR`             |
| Ukrainian               | uk-UA                     | `ukUA`             |
| Vietnamese              | vi-VN                     | `viVN`             |

<!-- #default-branch-switch -->

You can [find the source](https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/locale/index.ts) in the GitHub repository.

Para criar sua própria tradução, ou para personalizar o texto em Inglês. copie este arquivo para o seu projeto, faça as alterações necessárias e importe a localidade de lá.

Please do consider contributing new translations back to MUI by opening a pull request. However, MUI aims to support the [100 most common](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [locales](https://www.ethnologue.com/guides/ethnologue200), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

## Suporte RTL

Idiomas direita-para-esquerda como árabe, persa ou hebraico são suportados. Siga [este guia](/guides/right-to-left/) para usá-los.
