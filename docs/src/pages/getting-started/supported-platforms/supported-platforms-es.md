# Plataformas compatibles

<p class="description">Aprende sobre las plataformas que son compatibles por Material-UI. Desde las modernas hasta las viejas.</p>

## Navegador

Material-UI es compatible con las versiones más recientes y estables de todos los principales navegadores y plataformas. También es compatible con Internet Explorer 11. No es necesario utilizar ningún polyfill de JavaScript, ya que nosotros nos encargamos, internamente y de manera aislada, de las funciones de los navegadores no compatibles.

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |

Es fundamental que Material-UI sea compatible con el servicio de renderización web (WRS) utilizado por Googlebot para clasificar el contenido de la página web. [WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Podrás contar con que los componentes de Material-UI sean renderizados sin mayores problemas.

## Servidor

Ya que Material-UI es compatible con renderización en el servidor, es necesario que mantengamos la compatibilidad con las últimas versiones estables de [Node.js](https://github.com/nodejs/node). También nos esforzamos por mantener la compatibilidad con las [versiones LTS que se encuentren en mantenimiento](https://github.com/nodejs/Release#lts-schedule1). Ahora mismo tenemos compatibilidad con **node v8.x** y versiones más nuevas.

### Prefijado de CSS

Ten en cuenta que algunas características de CSS [requieren](https://github.com/cssinjs/jss/issues/279) un paso adicional de post-procesamiento para añadir prefijos específicos de los proveedores. Éstos prefijos se añaden automáticamente en el cliente gracias a [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

El CSS servido en ésta documentación se procesa con [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). Puedes utilizar [la implementación de ésta documentación](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) como punto de partida e inspiración. Ten en cuenta que ésto tiene implicaciones en el desempeño de la página. Es algo necesario para páginas estáticas, sin embargo se debe balancear con no hacer nada en caso de renderizar páginas dinámicas.