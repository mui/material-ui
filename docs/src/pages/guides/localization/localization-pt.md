# Localização

<p class="description">Localização (também referida como "l10n") é o processo de adaptação de um produto ou conteúdo a um idioma ou mercado específico (localidade).</p>

A localidade padrão do Material-UI é em inglês (Estados Unidos). Se você quiser usar outras localidades, siga as instruções abaixo.

## Texto da localidade

Use o tema para configurar os textos da localização globalmente:

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

### Exemplo

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

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
| Hindi                   | hi-IN                     | `hiIN`             |
| Húngaro                 | hu-HU                     | `huHU`             |
| Islandês                | is-IS                     | `isIS`             |
| Indonésio               | id-ID                     | `idID`             |
| Italiano                | it-IT                     | `itIT`             |
| Japonês                 | ja-JP                     | `jaJP`             |
| Coreano                 | ko-KR                     | `koKR`             |
| Persa                   | fa-IR                     | `faIR`             |
| Polonês                 | pl-PL                     | `plPL`             |
| Português (Brasil)      | pt-BR                     | `ptBR`             |
| Português (Europeu)     | pt-PT                     | `ptPT`             |
| Romeno                  | ro-RO                     | `roRO`             |
| Russo                   | ru-RU                     | `ruRU`             |
| Eslovaco                | sk-SK                     | `skSK`             |
| Espanhol                | es-ES                     | `esES`             |
| Sueco                   | sv-SE                     | `svSE`             |
| Turco                   | tr-TR                     | `trTR`             |
| Ucraniano               | uk-UA                     | `ukUA`             |
| Vietnamita              | vi-VN                     | `viVN`             |

Você pode [encontrar o fonte](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/locale/index.ts) no repositório do GitHub.

Para criar sua própria tradução, ou para personalizar o texto em inglês, copie este arquivo para o seu projeto, faça as alterações necessárias e importe a localidade de lá.

Por favor, considere contribuir com novas traduções de volta para o Material-UI abrindo uma pull request. No entanto, o Material-UI visa suportar as [100 localidades mais populares](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers), nós podemos não aceitar contribuições para localidades que não são frequentemente usadas, por exemplo `gl-ES` que tem "apenas" 2.5 milhões de falantes nativos.

## Suporte RTL

Idiomas da direita para esquerda como árabe, persa ou hebraico são suportados. Siga [este guia](/guides/right-to-left/) para usá-los.
