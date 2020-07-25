# Localización

<p class="description">La localización (también llamada "l10n") es el proceso de adaptación de un producto o contenido a un local o mercado específico.</p>

La localización predeterminada de Material-UI es Inglés (Estados Unidos). Si quieres usar otros locales, sigue las instrucciones que se indican a continuación.

## Texto local

Utilice el tema para configurar el texto regional globalmente:

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

### Ejemplo

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### Locales soportados

| Local                   | Etiqueta de idioma BCP 47 | Nombre del import |
|:----------------------- |:------------------------- |:----------------- |
| Armenio                 | hy-AM                     | `hyAM`            |
| Azerbaiyano             | az-AZ                     | `azAZ`            |
| Búlgaro                 | bg-BG                     | `bgBG`            |
| Catalán                 | ca-ES                     | `caES`            |
| Chino (simplificado)    | zh-CN                     | `zhCN`            |
| Checo                   | cs-CZ                     | `csCZ`            |
| Holandés                | nl-NL                     | `nlNL`            |
| Inglés (Estados Unidos) | en-US                     | `enUS`            |
| Estonio                 | et-EE                     | `etEE`            |
| Finlandés               | fi-FI                     | `fiFI`            |
| Francés                 | fr-FR                     | `frFR`            |
| Alemán                  | de-DE                     | `deDE`            |
| Hebreo                  | he-IL                     | `heIL`            |
| Hindú                   | hi-IN                     | `hiIN`            |
| Húngaro                 | hu-HU                     | `huHU`            |
| Islandés                | is-IS                     | `isIS`            |
| Indonesio               | id-ID                     | `idID`            |
| Italiano                | it-IT                     | `itIT`            |
| Japonés                 | ja-JP                     | `jaJP`            |
| Coreano                 | ko-KR                     | `koKR`            |
| Persa                   | fa-IR                     | `faIR`            |
| Polaco                  | pl-PL                     | `plPL`            |
| Portugués (Brasil)      | pt-BR                     | `ptBR`            |
| Portugués               | pt-PT                     | `ptPT`            |
| Rumano                  | ro-RO                     | `roRO`            |
| Ruso                    | ru-RU                     | `ruRU`            |
| Eslovaco                | sk-SK                     | `skSK`            |
| Español                 | es-ES                     | `esES`            |
| Sueco                   | sv-SE                     | `svSE`            |
| Turco                   | tr-TR                     | `trTR`            |
| Ucraniano               | uk-UA                     | `ukUA`            |
| Vietnamita              | vi-VN                     | `viVN`            |

Puedes [encontrar la fuente](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/locale/index.ts) en el repositorio de GitHub.

Crear tu propia traducción, o personalizar el texto en inglés, copia este archivo a tu proyecto, realiza cualquier cambio necesario e importa la configuración local desde allí.

Por favor considere contribuir con nuevas traducciones a Material-UI abriendo un pull request. Sin embargo, Material-UI pretende apoyar a los [100 locales más populares](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers), podríamos no aceptar contribuciones para locales que no se utilizan con frecuencia, por ejemplo `gl-ES` que tiene "solo" 2. millones de hablantes nativos.

## Soporte RTL

Idiomas de derecha a izquierda como árabe, persa o hebreo son compatibles. Sigue [esta guía](/guides/right-to-left/) para usarlas.
