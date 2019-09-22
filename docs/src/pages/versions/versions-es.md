# Versiones de Material-UI

<p class="description">Puedes volver a esta página y cambiar la versión de los docs que estás leyendo en cualquier momento.</p>

## Versiones estables

La versión más reciente se recomienda en producción.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Latest versions

Aquí puedes encontrar la version inédita mas reciente de la documentación y código. Puedes usarlo para ver qué cambios se avecinan y proporcionar mejores comentarios a los contribuyentes de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## Estrategia para versionado

Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Material-UI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Material-UI follows [Semantic Versioning 2.0.0](https://semver.org/). Los números en la versión de Material-UI tienen tres partes: ` mayor.menor.parche`. El número de versión se incrementa en base a el nivel de cambio incluido en tal lanzamiento.

- ** Lanzamientos mayores** contienen nuevas prestaciones importantes, se espera alguna o mínima asistencia por parte del desarrollador durante la actualización. Al actualizar a una nueva versión mayor, es posible que debas ejecutar los scripts de actualización, refactorizar código, ejecutar pruebas adicionales, y aprender nuevas API.
- ** Lanzamientos menores ** contienen nuevas prestaciones importantes. Los lanzamientos menores son totalmente compatibles con versiones anteriores; no se espera asistencia del desarrollador durante la actualización, pero opcionalmente puedes modificar tus aplicaciones y librerias para comenzar a usar nuevas API, prestaciones, y capacidades que se agregaron en ese lanzamiento.
- ** Lanzamientos de parches ** son de bajo riesgo, contienen correcciones de errores y nuevas pequeñas prestaciones. No se espera asistencia del desarrollador durante la actualización.

## Frecuencia de lanzamiento

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

En general, espera el siguiente ciclo de lanzamiento:

- A **major** release every 6-12 months.
- 1-3 lanzamiento ** menor ** por cada lanzamiento mayor.
- Un Lanzamiento de **parche** cada semana (en cualquier momento para la corrección de errores urgente).

## Calendario de lanzamientos

> Descargo de responsabilidad: Las fechas se ofrecen como orientación general y podriamos ajustarlas cuando sea necesario para garantizar la entrega de un código de alta calidad.

| Fecha      | Versión                    |
|:---------- |:-------------------------- |
| May 2018 ✅ | `@material-ui/core` v1.0.0 |
| May 2019 ✅ | `@material-ui/core` v4.0.0 |
| 2020? ⏳    | `@material-ui/core` v5.0.0 |


You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

## Política de soporte

Find details on the [supported versions](/getting-started/support/#supported-versions).

## Practicas de deprecación

A veces ** "cambios rompientes"**, como la remoción de soporte para algunas API y prestaciones, son necesarios.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features iare announced n the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.