# Localização

<p class="description">Localização (também referida como "l10n") é o processo de adaptação de um produto ou conteúdo a um idioma ou mercado específico (localidade).</p>

A localidade padrão do Material UI é em inglês (Estados Unidos). Se você quiser usar outras localidades, siga as instruções abaixo.

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

> ⚠️ For [`DataGrid` and `DataGridPro`](/x/react-data-grid/) components, they have their own [localization](/x/react-data-grid/localization/).

### Localidades suportadas

| Localidade              | Etiqueta do idioma BCP 47 | Nome da importação |
|:----------------------- |:------------------------- |:------------------ |
| Amharic                 | am-ET                     | `amET`             |
| Arabic (Egypt)          | ar-EG                     | `arEG`             |
| Arabic (Saudi Arabia)   | ar-SA                     | `arSA`             |
| Arabic (Sudan)          | ar-SD                     | `arSD`             |
| Armênio                 | hy-AM                     | `hyAM`             |
| Azerbaijano             | az-AZ                     | `azAZ`             |
| Bangla                  | bn-BD                     | `bnBD`             |
| Búlgaro                 | bg-BG                     | `bgBG`             |
| Catalão                 | ca-ES                     | `caES`             |
| Chinese (Hong Kong)     | zh-HK                     | `zhHK`             |
| Chinês (Simplificado)   | zh-CN                     | `zhCN`             |
| Chinese (Taiwan)        | zh-TW                     | `zhTW`             |
| Tcheco                  | hr-HR                     | `hrHR`             |
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
| Kazakh                  | kz-KZ                     | `kzKZ`             |
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

Você pode [encontrar o fonte](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/locale/index.ts) no repositório do GitHub.

Para criar sua própria tradução, ou para personalizar o texto em inglês, copie este arquivo para o seu projeto, faça as alterações necessárias e importe a localidade de lá.

Por favor, considere contribuir com novas traduções de volta para o Material UI abrindo uma pull request. No entanto, Material UI visa suportar [100 mais comuns](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [localidades](https://www.ethnologue.com/guides/ethnologue200), nós podemos não aceitar contribuições para localidades que não são frequentemente usadas, por exemplo `gl-ES` que tem "apenas" 2.5 milhões de falantes nativos.

## Suporte RTL

Idiomas da direita para esquerda como árabe, persa ou hebraico são suportados. Siga [este guia](/material-ui/guides/right-to-left/) para usá-los.
