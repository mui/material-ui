# Plataformas compatibles

<p class="description">Aprende sobre las plataformas que son compatibles por Material-UI. Desde las modernas hasta las viejas.</p>

## Navegador

Material-UI es compatible con las versiones más recientes y estables de todos los principales navegadores y plataformas. You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari (macOS) | Safari (iOS) |
|:----- |:------- |:------ |:-------------- |:------------ |
| >= 85 | >= 78   | >= 84  | >= 13          | >= 12.2      |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui-org/material-ui/blob/next/.browserslistrc#L12-L27) (check the `stable` entry). If you need to support IE 11, check out our [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).

Es fundamental que Material-UI sea compatible con el servicio de renderización web (WRS) utilizado por Googlebot para clasificar el contenido de la página web. [WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Podrás contar con que los componentes de Material-UI sean renderizados sin mayores problemas.

## Servidor

<!-- #stable-snapshot -->

We support [Node.js](https://github.com/nodejs/node) starting with version 10 for server-side rendering. Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#release-schedule) are supported.

### Prefijado de CSS

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor-specific prefixes. These prefixes are automatically added to the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

El CSS servido en ésta documentación se procesa con [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). Puedes utilizar [la implementación de ésta documentación](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) como punto de partida e inspiración. Ten en cuenta que ésto tiene implicaciones en el desempeño de la página. It's a must-do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.

## React

Material-UI supports the most recent versions of React, starting with ^16.8.0 (the one with the hooks). Have a look at the older [versions](https://material-ui.com/versions/) for backward compatibility.

## TypeScript

Material-UI requires a minimum version of TypeScript 3.2.
