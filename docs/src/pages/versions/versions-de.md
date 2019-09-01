# Material-UI-Versionen

<p class="description">Sie können jederzeit zu dieser Seite zurückkehren und die Version der Dokumente, die Sie gerade lesen, wechseln.</p>

## Stabile Versionen

Die aktuellste Version wird in der Produktion empfohlen.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Neueste Versionen

Hier finden Sie die neuesten unveröffentlichten Dokumentationen und Codes. Sie können damit feststellen, welche Änderungen bevorstehen, und den Mitwirkenden der Material-UI besseres Feedback geben.

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## Versionierungsstrategie

Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Material-UI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Die Material-UI folgt strikt der [ Semantic Versioning 2.0.0](https://semver.org/). Die Versionsnummern der Material-UI bestehen aus drei Teilen: `Hauptversion.Nebenversion.Patch`. Die Versionsnummer wird basierend auf dem in der Version enthaltenen Änderungsstand erhöht.

- **Hauptversionen** enthalten wichtige neue Funktionen, während des Updates wird jedoch eine minimale Entwicklerunterstützung erwartet. Bei der Aktualisierung auf eine neue Hauptversion müssen Sie möglicherweise Aktualisierungsskripts ausführen, Code umgestalten, zusätzliche Tests ausführen und neue APIs erlernen.
- ** Nebenversionen ** enthalten wichtige neue Funktionen. Minor Releases sind vollständig abwärtskompatibel. Während des Updates wird keine Unterstützung durch Entwickler erwartet. Sie können jedoch optional Ihre Apps und Bibliotheken ändern, um neue APIs, Funktionen und Funktionen zu verwenden, die in der Version hinzugefügt wurden.
- ** Patch-Versionen ** sind geringes Risiko, enthalten Fehlerbehebungen und kleine neue Funktionen. Während des Updates wird keine Entwicklerunterstützung erwartet.

## Release-Frequenz

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

Im Allgemeinen können Sie den folgenden Release-Zyklus erwarten:

- Ein Veröffentlichung einer **Hauptversion** alle 6 Monate.
- 1-3 Veröffentlichungen von ** Nebenversionen** für jede Hauptversion.
- Ein ** Patch ** Veröffentlichung jede Woche (jederzeit für dringende Bugfixes).

## Release Zeitplan

> Haftungsausschluss: Die Daten werden als allgemeine Hinweise angeboten und können von uns bei Bedarf angepasst werden, um die Lieferung eines qualitativ hochwertigen Codes sicherzustellen.

| Datum      | Version                    |
|:---------- |:-------------------------- |
| Mai 2018 ✅ | `@material-ui/core` v1.0.0 |
| Mai 2019 ✅ | `@material-ui/core` v4.0.0 |
| ? ⏳        | `@material-ui/core` v5.0.0 |


You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

## Support-Richtlinie

Only the latest version of Material-UI is supported. Wir haben noch keine Ressourcen für [ LTS](https://en.wikipedia.org/wiki/Long-term_support) Veröffentlichungen.

## Verfallspraktiken

Manchmal sind **"breaking changes"** wie das Entfernen der Unterstützung für ausgewählte APIs und Features erforderlich.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features iare announced n the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.