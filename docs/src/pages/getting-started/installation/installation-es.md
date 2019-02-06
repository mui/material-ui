# Instalación

<p class="description">Instala Material-UI, el marco de trabajo IU en React más popular del mundo.</p>

Material-UI está disponible como un [ paquete npm ](https://www.npmjs.com/package/@material-ui/core).

## npm

Para instalar y guardar en tu dependencias ` package.json `, ejecuta:

```sh
// usando npm
npm install @material-ui/core

// usando yarn
yarn add @material-ui/core
```

Ten en cuenta que [ react ](https://www.npmjs.com/package/react) > = 16.3.0 y [ react-dom ](https://www.npmjs.com/package/react-dom) > = 16.3.0 son dependencias tipo "peer".

## Fuente Roboto

Material-UI fue diseñado con la fuente [ Roboto ](https://fonts.google.com/specimen/Roboto) en mente. Así que asegúrate de seguir [ estas instrucciones ](/style/typography/#general). Por ejemplo, a través de las Fuentes Web de Google:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

Alternativamente, si estás utilizando JSX sobre HTML para renderizar el encabezado:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Fuente de Iconos

Con el fin de utilizar el componente `Icon` de la fuente primero debe agregar la fuente [Material icons](https://material.io/tools/icons/). Aquí hay [ algunas instrucciones ](/style/icons/#font-icons) sobre cómo hacerlo. Por ejemplo, a través de las Fuentes Web de Google:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Alternativamente, si estás utilizando JSX sobre HTML para renderizar el encabezado:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Iconos SVG

Con el fin de utilizar iconos SVG Material prediseñados, tales como los que se encuentran en los [demos de componentes](/demos/app-bar/) primero debes instalar el paquete [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
npm install @material-ui/icons
```

## CDN

Puede comenzar a utilizar Material-UI con una infraestructura mínima de front-end, lo que es excelente para la creación de prototipos. Desaconsejamos el uso de este enfoque en producción, ya que el cliente tiene que descargar toda la libreria, independientemente de qué componentes se utilizan realmente, afectando el rendimiento y la utilización del ancho de banda.

#### Lanzamientos UMD

Proporcionamos dos archivos de definición de módulo universal (UMD, por sus siglas en inglés):

- uno para desarrollo: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- uno para producción: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

Puedes seguir [ este ejemplo sobre CDN ](https://github.com/mui-org/material-ui/tree/master/examples/cdn) para empezar rápidamente.