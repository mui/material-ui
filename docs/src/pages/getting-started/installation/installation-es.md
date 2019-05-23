# Instalación

<p class="description">Instala Material-UI, el framework de IU para React más popular del mundo.</p>

Material-UI está disponible como un [ paquete npm ](https://www.npmjs.com/package/@material-ui/core).

## npm

Para instalarlo y guardarlo en las dependencias de tu ` package.json `, ejecuta:

```sh
// con npm
npm install @material-ui/core@next

// con yarn
yarn add @material-ui/core@next
```

Ten en cuenta que [ react ](https://www.npmjs.com/package/react) > = 16.8.0 y [ react-dom ](https://www.npmjs.com/package/react-dom) > = 16.8.0 son dependencias tipo "peer".

## Fuente Roboto

Material-UI fue diseñado con la fuente [ Roboto ](https://fonts.google.com/specimen/Roboto) en mente. Así que asegúrate de seguir [ estas instrucciones ](/components/typography/#general). Por ejemplo, a través de Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Fuente de Iconos

Con el fin de utilizar el componente `Icon` de la fuente primero debes agregar la fuente [Material icons](https://material.io/tools/icons/). Aquí hay [ algunas instrucciones ](/components/icons/#font-icons) sobre cómo hacerlo. Por ejemplo, a través de Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

Alternativamente, si estás utilizando JSX sobre HTML para renderizar el encabezado:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Iconos SVG

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/components/icons/) you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
// con npm
npm install @material-ui/icons@next

// con yarn
yarn add @material-ui/icons@next
```

## CDN

Puedes comenzar a utilizar Material-UI con una infraestructura mínima de front-end, lo que es excelente para la creación de prototipos. Desaconsejamos el uso de este enfoque en producción - ya que el cliente tiene que descargar toda la librería, independientemente de qué componentes se utilizan realmente, afectando al rendimiento y al uso del ancho de banda.

#### Lanzamientos UMD

Proporcionamos dos archivos de definición de módulo universal (UMD, por sus siglas en inglés):

- uno para desarrollo: https://unpkg.com/@material-ui/core@next/umd/material-ui.development.js
- uno para producción: https://unpkg.com/@material-ui/core@next/umd/material-ui.production.min.js

Puedes seguir [ este ejemplo sobre CDN ](https://github.com/mui-org/material-ui/tree/next/examples/cdn-next) para empezar rápidamente.