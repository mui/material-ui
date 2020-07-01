# Instalación

<p class="description">Instala Material-UI, el framework de IU para React más popular del mundo.</p>

Material-UI está disponible como un [ paquete npm ](https://www.npmjs.com/package/@material-ui/core).

## npm

Para instalarlo y guardarlo en las dependencias de tu ` package.json `, ejecuta:

```sh
// usando npm
npm install @material-ui/core

// usando yarn
yarn add @material-ui/core
```

Ten en cuenta que [ react ](https://www.npmjs.com/package/react) > = 16.8.0 y [ react-dom ](https://www.npmjs.com/package/react-dom) > = 16.8.0 son dependencias tipo "peer".

## Fuente Roboto

Material-UI fue diseñado con la fuente [ Roboto ](https://fonts.google.com/specimen/Roboto) en mente. Así que asegúrate de seguir [ estas instrucciones ](/components/typography/#general). Por ejemplo, a través de Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Fuente de Iconos

Aquí hay [ algunas instrucciones ](/components/icons/#font-icons) sobre cómo hacerlo. Para poder utilizar la fuente del componente `Icon`, primero debes agregar la fuente [Material icons](https://material.io/tools/icons/). Por ejemplo, a través de Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Iconos SVG

Para poder utilizar los íconos SVG Material precompilados, como los que se encuentran en los [demos de íconos](/components/icons/), primero debes instalar el paquete [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons):

```sh
// usando npm
npm install @material-ui/icons

// usando yarn
yarn add @material-ui/icons
```

## CDN

Puedes comenzar a utilizar Material-UI con una infraestructura mínima de front-end, lo que es excelente para la creación de prototipos.

Se proporcionan dos archivos de Definición Universal de Módulos (**UMD**):

- uno para desarrollo: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- uno para producción: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Puedes seguir [ este ejemplo sobre CDN ](https://github.com/mui-org/material-ui/tree/master/examples/cdn) para empezar rápidamente.

⚠️ Sin embargo, utilizar esta estrategia en **producción** **no es aconsejable** - ya que el cliente tiene que descargar la biblioteca completa, sin importar cuales son los componentes que realmente están en uso, afectando al desempeño y la utilización de ancho de banda.

⚠️ Los enlaces UMD están utilizando la etiqueta `latest` para hacer referencia a la última versión de la biblioteca. Dicha referencia es **inestable**, cambia cada vez que lanzamos nuevas versiones. Deberias considerar hacer referencia a alguna versión específica, por ejemplo, [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).