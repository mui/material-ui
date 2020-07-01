# Versiones de Material-UI

<p class="description">Puedes volver a esta página y cambiar la versión de los docs que estás leyendo en cualquier momento.</p>

## Versiones estables

La versión más reciente se recomienda en producción.

{{"demo": "pages/versions/StableVersions.js", "hideToolbar": true, "bg": "inline"}}

## Latest versions

Aquí puedes encontrar la version inédita mas reciente de la documentación y código. Puedes usarlo para ver qué cambios se avecinan y proporcionar mejores comentarios a los contribuyentes de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## Estrategia para versionado

La estabilidad asegura que componentes y librerias reutilizables, tutoriales, herramientas, y prácticas aprendidas no se vuelven obsoletos de forma inesperada. La estabilidad es esencial para que el ecosistema alrededor de Material-UI prospere.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Material-UI follows [Semantic Versioning 2.0.0](https://semver.org/). Los números en la versión de Material-UI tienen tres partes: `mayor.menor.parche`. El número de versión se incrementa en base a el nivel de cambio incluido en tal lanzamiento.

- ** Lanzamientos mayores** contienen nuevas prestaciones importantes, se espera alguna o mínima asistencia por parte del desarrollador durante la actualización. Al actualizar a una nueva versión mayor, es posible que debas ejecutar los scripts de actualización, refactorizar código, ejecutar pruebas adicionales, y aprender nuevas API.
- ** Lanzamientos menores ** contienen nuevas prestaciones importantes. Los lanzamientos menores son totalmente compatibles con versiones anteriores; no se espera asistencia del desarrollador durante la actualización, pero opcionalmente puedes modificar tus aplicaciones y librerias para comenzar a usar nuevas API, prestaciones, y capacidades que se agregaron en ese lanzamiento.
- ** Lanzamientos de parches ** son de bajo riesgo, contienen correcciones de errores y nuevas pequeñas prestaciones. No se espera asistencia del desarrollador durante la actualización.

## Frecuencia de lanzamiento

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

En general, espera el siguiente ciclo de lanzamiento:

- Un lanzamiento ** mayor ** cada 12 meses.
- 1-3 lanzamiento ** menor ** por cada lanzamiento mayor.
- Un Lanzamiento de **parche** cada semana (en cualquier momento para la corrección de errores urgente).

## Calendario de lanzamientos

| Fecha          | Versión | Status   |
|:-------------- |:------- |:-------- |
| May 2018       | v1.0.0  | Released |
| September 2018 | v3.0.0  | Released |
| May 2019       | v4.0.0  | Released |
| Q3 2020        | v5.0.0  | ⏳        |


You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

> ⚠️ **Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction. It's intended for informational purposes only. We may decide to add/remove new items at any time depending on our capability to deliver while meeting our quality standards. The development, releases and timing of any features or functionality of Material-UI remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation or promise to deliver at any time.

## Política de soporte

Find details on the [supported versions](/getting-started/support/#supported-versions).

## Practicas de deprecación

A veces ** "cambios rompientes"**, como la remoción de soporte para algunas API y prestaciones, son necesarios.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.