---
title: Expansion Panel React-Komponente
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Erweiterungspanel (Expansion Panel)

<p class="description">Erweiterungspanels (Tafeln) enthalten Erstellungsabläufe und ermöglichen die einfache Bearbeitung eines Elements.</p>

[Ein Erweiterungspanel](https://material.io/archive/guidelines/components/expansion-panels.html) ist ein leichter Behälter, der entweder alleine stehen kann oder mit einer größeren Oberfläche verbunden ist, beispielsweise einer Karte.

> **Hinweis:** Erweiterungspanele sind nicht mehr in der Material Design-Dokumentation dokumentiert.

## Barrierefreiheit

Für eine optimale Erreichbarkeit empfehlen wir die Einstellung `id` und `aria-controls` in der `ExpansionPanelSummary`. Das `ExpansionPanel` leitet die notwendigen `aria-labelledby` und `id` für den Inhaltsbereich des Panels ab.

## Einfaches Erweiterungspanel

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Kontrolliertes Akkordeon

Erweitern Sie das Standardbedienfeldverhalten, um ein Akkordeon mit der Komponente `ExpansionPanel` zu erstellen.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## Sekundäre Überschrift und Spalten

Zur Strukturierung des Inhalts können mehrere Spalten verwendet werden. Dem Bedienfeld kann ein Hilfetext hinzugefügt werden, welches den Benutzer unterstützt.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## Performance

Der Inhalt von ExpansionPanels wird standardmäßig bereitgestellt, auch wenn das Panel nicht erweitert wird. Bei diesem Standardverhalten werden serverseitiges Rendering und SEO berücksichtigt. Wenn Sie teure Komponentenbäume in Ihren Panels rendern oder einfach viele Panels rendern, empfiehlt es sich, dieses Standardverhalten zu ändern, indem Sie `unmountOnExit` in `TransitionProps` aktivieren: `<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`. Wie bei jeder Leistungsoptimierung ist dies keine Silberkugel. Stellen Sie sicher, dass Sie zuerst Engpässe erkennen und anschließend diese Optimierungsstrategien ausprobieren.

## Customized expansion panels

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}