# Versiones de Material-UI

<p class="description">Puedes volver a esta página y cambiar la versión de los docs que estás leyendo en cualquier momento.</p>

## Versiones estables

La versión más reciente se recomienda en producción.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Latest versions

Aquí puedes encontrar la version inédita mas reciente de la documentación y código. Puedes usarlo para ver qué cambios se avecinan y proporcionar mejores comentarios a los contribuyentes de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## Estrategia para versionado

Reconocemos que necesitas ** estabilidad ** por parte de la biblioteca de Material-UI. La estabilidad asegura que componentes y librerias reutilizables, tutoriales, herramientas, y prácticas aprendidas no se vuelven obsoletos de forma inesperada. La estabilidad es esencial para que el ecosistema alrededor de Material-UI prospere.

Este documento contiene ** las prácticas que seguimos ** para proporcionarte una librería de IU de vanguardia, equilibrada con estabilidad. Nos esforzamos para asegurar que futuros cambios siempre sean introducidos de una manera predecible. Queremos que todos los que dependen de Material-UI sepan cuándo y cómo se agregan nuevas prestaciones, y que estén bien preparados cuando se remuevan obsoletas.

Material-UI sigue estrictamente [ Versionado semántico 2.0.0](https://semver.org/). Los números en la versión de Material-UI tienen tres partes: ` mayor.menor.parche`. El número de versión se incrementa en base a el nivel de cambio incluido en tal lanzamiento.

- ** Lanzamientos mayores** contienen nuevas prestaciones importantes, se espera alguna o mínima asistencia por parte del desarrollador durante la actualización. Al actualizar a una nueva versión mayor, es posible que debas ejecutar los scripts de actualización, refactorizar código, ejecutar pruebas adicionales, y aprender nuevas API.
- ** Lanzamientos menores ** contienen nuevas prestaciones importantes. Los lanzamientos menores son totalmente compatibles con versiones anteriores; no se espera asistencia del desarrollador durante la actualización, pero opcionalmente puedes modificar tus aplicaciones y librerias para comenzar a usar nuevas API, prestaciones, y capacidades que se agregaron en ese lanzamiento.
- ** Lanzamientos de parches ** son de bajo riesgo, contienen correcciones de errores y nuevas pequeñas prestaciones. No se espera asistencia del desarrollador durante la actualización.

## Frecuencia de lanzamiento

Trabajamos hacia un calendario regular de lanzamientos, para que puedas planificar y coordinar tus actualizaciones con la continua evolución de Material-UI.

En general, espera el siguiente ciclo de lanzamiento:

- Un lanzamiento ** mayor ** cada 6 meses.
- 1-3 lanzamiento ** menor ** por cada lanzamiento mayor.
- Un Lanzamiento de **parche** cada semana (en cualquier momento para la corrección de errores urgente).

## Calendario de lanzamientos

> Descargo de responsabilidad: Las fechas se ofrecen como orientación general y podriamos ajustarlas cuando sea necesario para garantizar la entrega de un código de alta calidad.

| Fecha         | Versión                    |
|:------------- |:-------------------------- |
| May 2019      | `@material-ui/core` v4.0.0 |
| December 2019 | `@material-ui/core` v5.0.0 |

Puedes seguir [ nuestros hitos ](https://github.com/mui-org/material-ui/milestones) para una visión general más detallada.

## Política de soporte

Solo ofrecemos soporte a la versión mas reciente de Material-UI. Aún no tenemos los recursos para ofrecer lanzamientos [ LTS ](https://en.wikipedia.org/wiki/Long-term_support).

## Practicas de deprecación

A veces ** "cambios rompientes"**, como la remoción de soporte para algunas API y prestaciones, son necesarios.

Para que estas transiciones sean lo más fáciles posible, hacemos dos compromisos:

- Trabajamos arduamente en minimizar el número de cambios rompientes de última hora y proporcionar herramientas de migración cuando sea posible.
- Seguimos la política de eliminación descrita aquí, para que tengas tiempo de actualizar tus aplicaciones a las últimas API y mejores prácticas.

Para ayudar a asegurarte de que tengas tiempo suficiente y un camino claro para actualizar, esta es nuestra política de deprecación:

- Anunciamos prestaciones deprecadas en el registro de cambios y, cuando sea posible, con advertencias en tiempo de ejecución.
- Cuando anunciamos una deprecación, también anunciamos una ruta de actualización recomendada.
- Soportamos el uso vigente de una API estable durante su período de deprecación, por lo que tu código seguirá funcionando durante ese período.
- Solo realizamos actualizaciones de dependencias tipo "Peer" (React) que requieren cambios en tus aplicaciones en una versión mayor.