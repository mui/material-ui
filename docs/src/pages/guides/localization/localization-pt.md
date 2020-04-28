# Localização

<p class="description">Localização (também referida como "l10n") é o processo de adaptação de um produto ou conteúdo a uma localidade ou mercado específico.</p>

A localidade padrão do Material-UI é em inglês (Estados Unidos). Se você quiser usar outras localidades, siga as instruções abaixo.

## Texto da localidade

Use o tema para configurar o texto de configuração global:

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

### Localidades suportadas

| Localidade              | Etiqueta do idioma BCP 47 | Nome da importação |
|:----------------------- |:------------------------- |:------------------ |
| Armênio                 | hy-AM                     | `hyAM`             |
| Azerbaijano             | az-AZ                     | `azAZ`             |
| Búlgaro                 | bg-BG                     | `bgBG`             |
| Catalão                 | ca-ES                     | `caES`             |
| Chinês (Simplificado)   | zh-CN                     | `zhCN`             |
| Tcheco                  | cs-CZ                     | `csCZ`             |
| Holandês                | nl-NL                     | `nlNL`             |
| Inglês (Estados Unidos) | en-US                     | `enUS`             |
| Estoniano               | et-EE                     | `etEE`             |
| Finlandês               | fi-FI                     | `fiFI`             |
| Francês                 | fr-FR                     | `frFR`             |
| Alemão                  | de-DE                     | `deDE`             |
| Hebraico                | he-IL                     | `heIL`             |
| Húngaro                 | hu-HU                     | `huHU`             |
| Islandês                | is-IS                     | `isIS`             |
| Indonésio               | id-ID                     | `idID`             |
| Italiano                | it-IT                     | `itIT`             |
| Japonês                 | ja-JP                     | `jaJP`             |
| Coreano                 | ko-KR                     | `koKR`             |
| Persa                   | fa-IR                     | `faIR`             |
| Polonês                 | pl-PL                     | `plPL`             |
| Português (Brasil)      | pt-BR                     | `ptBR`             |
| Português               | pt-PT                     | `ptPT`             |
| Romeno                  | ro-RO                     | `roRO`             |
| Russo                   | ru-RU                     | `ruRU`             |
| Eslovaco                | sk-SK                     | `skSK`             |
| Espanhol                | es-ES                     | `esES`             |
| Sueco                   | sv-SE                     | `svSE`             |
| Turco                   | tr-TR                     | `trTR`             |
| Ucraniano               | uk-UA                     | `ukUA`             |
| Vietnamita              | vi-VN                     | `viVN`             |

Você pode [encontrar o fonte](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/locale/index.js) no repositório do GitHub.

Para criar sua própria tradução, ou para personalizar o texto em Inglês. copie este arquivo para o seu projeto, faça as alterações necessárias e importe a localidade de lá.

Por favor, considere contribuir com novas traduções de volta para o Material-UI abrindo uma pull request. However, Material-UI aims to support the [100 most popular locales](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

### Exemplo

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

## Suporte RTL

Idiomas direita-para-esquerda como árabe, persa ou hebraico são suportados. Siga [este guia](/guides/right-to-left/) para usá-los.
