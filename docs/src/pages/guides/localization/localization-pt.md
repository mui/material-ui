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

### Example

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### Localidades suportadas

| Localidade              | Etiqueta do idioma BCP 47 | Nome da importação |
|:----------------------- |:------------------------- |:------------------ |
| Amharic                 | am-ET                     | `amET`             |
| Arabic (Egypt)          | ar-EG                     | `arEG`             |
| Arabic (Sudan)          | ar-SD                     | `arSD`             |
| Armênio                 | hy-AM                     | `hyAM`             |
| Azerbaijano             | az-AZ                     | `azAZ`             |
| Bangla                  | bn-BD                     | `bnBD`             |
| Búlgaro                 | bg-BG                     | `bgBG`             |
| Catalão                 | ca-ES                     | `caES`             |
| Chinese (Hong Kong)     | zh-HK                     | `zhHK`             |
| Chinês (Simplificado)   | zh-CN                     | `zhCN`             |
| Chinese (Taiwan)        | zh-TW                     | `zhTW`             |
| Tcheco                  | cs-CZ                     | `csCZ`             |
| Holandês                | nl-NL                     | `nlNL`             |
| Inglês (Estados Unidos) | en-US                     | `enUS`             |
| Estoniano               | et-EE                     | `etEE`             |
| Finlandês               | fi-FI                     | `fiFI`             |
| Francês                 | fr-FR                     | `frFR`             |
| Alemão                  | de-DE                     | `deDE`             |
| Greek                   | el-GR                     | `elGR`             |
| Hebraico                | he-IL                     | `heIL`             |
| Hindi                   | hi-IN                     | `hiIN`             |
| Húngaro                 | hu-HU                     | `huHU`             |
| Islandês                | is-IS                     | `isIS`             |
| Indonésio               | id-ID                     | `idID`             |
| Italiano                | it-IT                     | `itIT`             |
| Japonês                 | ja-JP                     | `jaJP`             |
| Khmer                   | kh-KH                     | `khKH`             |
| Kazakh                  | kz-KZ                     | `kzKZ`             |
| Coreano                 | ko-KR                     | `koKR`             |
| Persa                   | fa-IR                     | `faIR`             |
| Polonês                 | pl-PL                     | `plPL`             |
| Português (Europeu)     | pt-PT                     | `ptPT`             |
| Português (Brasil)      | pt-BR                     | `ptBR`             |
| Romeno                  | ro-RO                     | `roRO`             |
| Russo                   | ru-RU                     | `ruRU`             |
| Sinhalese               | si-LK                     | `siLK`             |
| Eslovaco                | sk-SK                     | `skSK`             |
| Espanhol                | es-ES                     | `esES`             |
| Sueco                   | sv-SE                     | `svSE`             |
| Thai                    | th-TH                     | `thTH`             |
| Turco                   | tr-TR                     | `trTR`             |
| Ucraniano               | uk-UA                     | `ukUA`             |
| Vietnamita              | vi-VN                     | `viVN`             |

<!-- #default-branch-switch -->

Você pode [encontrar o fonte](https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/locale/index.ts) no repositório do GitHub.

Para criar sua própria tradução, ou para personalizar o texto em Inglês. copie este arquivo para o seu projeto, faça as alterações necessárias e importe a localidade de lá.

Please do consider contributing new translations back to MUI by opening a pull request. However, MUI aims to support the [100 most common](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [locales](https://www.ethnologue.com/guides/ethnologue200), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

## Suporte RTL

Idiomas direita-para-esquerda como árabe, persa ou hebraico são suportados. Siga [este guia](/guides/right-to-left/) para usá-los.
