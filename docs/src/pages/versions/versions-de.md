# Material-UI-Versionen

<p class="description">Sie können jederzeit zu dieser Seite zurückkehren und die Version der Dokumente, die Sie gerade lesen, wechseln.</p>

## Stabile Versionen

Die aktuellste Version wird in der Produktion empfohlen.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Neueste Versionen

Hier finden Sie die neuesten unveröffentlichten Dokumentationen und Codes. Sie können damit feststellen, welche Änderungen bevorstehen, und den Mitwirkenden der Material-UI besseres Feedback geben.

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## Versionierungsstrategie

Wir erkennen an, dass Sie **Stabilität** aus der Material-UI-Bibliothek benötigen. Stabilität stellt sicher, dass wiederverwendbare Komponenten und Bibliotheken, Lernprogramme, Tools und erlernte Methoden nicht unerwartet veraltet werden. Stabilität ist wichtig für das Gedeihen des Ökosystems um Material-UI.

Dieses Dokument enthält ** die Praktiken, die wir befolgen ** um Ihnen eine hochmoderne UI-Bibliothek mit ausgewogener Stabilität zu bieten. Wir bemühen uns sicherzustellen, dass zukünftige Änderungen immer auf vorhersehbare Weise eingeführt werden. Wir möchten, dass alle, die auf die Material-UI angewiesen sind, wissen, wann und wie neue Funktionen hinzugefügt werden, und dass sie gut vorbereitet sind, wenn veraltete Funktionen entfernt werden.

Die Material-UI folgt strikt der [ Semantic Versioning 2.0.0](https://semver.org/). Die Versionsnummern der Material-UI bestehen aus drei Teilen: `Hauptversion.Nebenversion.Patch`. Die Versionsnummer wird basierend auf dem in der Version enthaltenen Änderungsstand erhöht.

- **Hauptversionen** enthalten wichtige neue Funktionen, während des Updates wird jedoch eine minimale Entwicklerunterstützung erwartet. Bei der Aktualisierung auf eine neue Hauptversion müssen Sie möglicherweise Aktualisierungsskripts ausführen, Code umgestalten, zusätzliche Tests ausführen und neue APIs erlernen.
- ** Nebenversionen ** enthalten wichtige neue Funktionen. Minor Releases sind vollständig abwärtskompatibel. Während des Updates wird keine Unterstützung durch Entwickler erwartet. Sie können jedoch optional Ihre Apps und Bibliotheken ändern, um neue APIs, Funktionen und Funktionen zu verwenden, die in der Version hinzugefügt wurden.
- ** Patch-Versionen ** sind geringes Risiko, enthalten Fehlerbehebungen und kleine neue Funktionen. Während des Updates wird keine Entwicklerunterstützung erwartet.

## Release-Frequenz

Wir arbeiten an einem regelmäßigen Zeitplan für Releases, damit Sie Ihre Updates mit der fortlaufenden Entwicklung der Material-UI planen und koordinieren können.

Im Allgemeinen können Sie den folgenden Release-Zyklus erwarten:

- Ein Veröffentlichung einer **Hauptversion ** alle 6 Monate.
- 1-3 Veröffentlichungen von ** Nebenversionen** für jede Hauptversion.
- Ein ** Patch ** Veröffentlichung jede Woche (jederzeit für dringende Bugfixes).

## Release Zeitplan

> Haftungsausschluss: Die Daten werden als allgemeine Hinweise angeboten und können von uns bei Bedarf angepasst werden, um die Lieferung eines qualitativ hochwertigen Codes sicherzustellen.

| Datum         | Version                    |
|:------------- |:-------------------------- |
| May 2019      | `@material-ui/core` v4.0.0 |
| December 2019 | `@material-ui/core` v5.0.0 |

Sie können [unsere Meilensteine](https://github.com/mui-org/material-ui/milestones) für eine detailliertere Übersicht verfolgen.

## Support-Richtlinie

Wir unterstützen nur die neueste Version von Material-UI. Wir haben noch keine Ressourcen für [ LTS](https://en.wikipedia.org/wiki/Long-term_support) Veröffentlichungen.

## Verfallspraktiken

Manchmal sind **"breaking changes"** wie das Entfernen der Unterstützung für ausgewählte APIs und Features erforderlich.

Um diese Übergänge so einfach wie möglich zu gestalten, versprechen wir Ihnen zwei Dinge:

- Wir arbeiten hart daran, die Anzahl der grundlegenden Änderungen zu minimieren und wenn möglich Migrationswerkzeuge bereitzustellen.
- Wir befolgen die hier beschriebene Verfallspraktiken, sodass Sie Zeit haben, Ihre Apps auf die neuesten APIs und Best Practices zu aktualisieren.

Um sicherzustellen, dass Sie genügend Zeit und einen klaren Pfad für die Aktualisierung haben, ist dies unsere Verfallspraktik:

- Wir geben veraltete Funktionen im Changelog und wenn möglich mit Warnungen zur Laufzeit an.
- Wenn wir eine veraltete Version ankündigen, geben wir auch einen empfohlenen Aktualisierungspfad bekannt.
- Wir unterstützen die bestehende Verwendung einer stabilen API während des Verfallszeitraums, sodass Ihr Code während dieses Zeitraums weiter funktioniert.
- Wir führen nur Peer-Abhängigkeitsaktualisierungen (React) durch, die Änderungen an Ihren Apps in einer Hauptversion erfordern.