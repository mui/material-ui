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

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### Localidades suportadas

| Localidade              | Etiqueta do idioma BCP 47 | Nome da importação |
|:----------------------- |:------------------------- |:------------------ |
| Árabe (Egito)           | ar-EG                     | `arEG`             |
| Armênio                 | ar-SD                     | `arSD`             |
| Azerbaijano             | hy-AM                     | `hyAM`             |
| Búlgaro                 | az-AZ                     | `azAZ`             |
| Bangla                  | bn-BD                     | `bnBD`             |
| Catalão                 | bg-BG                     | `bgBG`             |
| Catalão                 | ca-ES                     | `caES`             |
| Chinese (Hong Kong)     | zh-HK                     | `zhHK`             |
| Chinês (Simplificado)   | zh-CN                     | `zhCN`             |
| Chinese (Taiwan)        | zh-TW                     | `zhTW`             |
| Holandês                | cs-CZ                     | `csCZ`             |
| Inglês (Estados Unidos) | nl-NL                     | `nlNL`             |
| Estoniano               | en-US                     | `enUS`             |
| Finlandês               | et-EE                     | `etEE`             |
| Francês                 | fi-FI                     | `fiFI`             |
| Alemão                  | fr-FR                     | `frFR`             |
| Hebraico                | de-DE                     | `deDE`             |
| Hebraico                | el-GR                     | `elGR`             |
| Húngaro                 | he-IL                     | `heIL`             |
| Hindi                   | hi-IN                     | `hiIN`             |
| Islandês                | hu-HU                     | `huHU`             |
| Indonésio               | is-IS                     | `isIS`             |
| Italiano                | id-ID                     | `idID`             |
| Japonês                 | it-IT                     | `itIT`             |
| Cazaque                 | ja-JP                     | `jaJP`             |
| Coreano                 | kh-KH                     | `khKH`             |
| Persa                   | kz-KZ                     | `kzKZ`             |
| Polonês                 | ko-KR                     | `koKR`             |
| Português (Brasil)      | fa-IR                     | `faIR`             |
| Português (Europeu)     | pl-PL                     | `plPL`             |
| Romeno                  | pt-PT                     | `ptPT`             |
| Russo                   | pt-BR                     | `ptBR`             |
| Eslovaco                | ro-RO                     | `roRO`             |
| Espanhol                | ru-RU                     | `ruRU`             |
| Sueco                   | si-LK                     | `siLK`             |
| Turco                   | sk-SK                     | `skSK`             |
| Vietnamita              | es-ES                     | `esES`             |
| Ucraniano               | sv-SE                     | `svSE`             |
| Vietnamita              | th-TH                     | `thTH`             |
| Turco                   | tr-TR                     | `trTR`             |
| Ucraniano               | uk-UA                     | `ukUA`             |
| Vietnamita              | vi-VN                     | `viVN`             |

<!-- #default-branch-switch -->

Você pode [encontrar o fonte](https://github.com/mui-org/material-ui/blob/HEAD/packages/mui-material/src/locale/index.ts) no repositório do GitHub.

Para criar sua própria tradução, ou para personalizar o texto em inglês, copie este arquivo para o seu projeto, faça as alterações necessárias e importe a localidade de lá.

Por favor, considere contribuir com novas traduções de volta para o Material-UI abrindo uma pull request. No entanto, Material-UI visa suportar [100 mais comuns](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [localidades](https://www.ethnologue.com/guides/ethnologue200), nós podemos não aceitar contribuições para localidades que não são frequentemente usadas, por exemplo `gl-ES` que tem "apenas" 2.5 milhões de falantes nativos.

## Suporte RTL

Idiomas da direita para esquerda como árabe, persa ou hebraico são suportados. Siga [este guia](/guides/right-to-left/) para usá-los.
