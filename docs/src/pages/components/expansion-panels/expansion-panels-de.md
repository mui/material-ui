---
title: Expansion Panel React-Komponente
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panel (erweiterungspanel)

<p class="description">Erweiterungspanels (Tafeln) enthalten Erstellungsabläufe und ermöglichen die einfache Bearbeitung eines Elements.</p>

[Ein Erweiterungspanel](https://material.io/archive/guidelines/components/expansion-panels.html) ist ein leichter Behälter, der entweder alleine stehen kann oder mit einer größeren Oberfläche verbunden ist, beispielsweise einer Karte.

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them.

## Einfaches Erweiterungspanel

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js", "bg": true}}

## Kontrolliertes Akkordeon

Erweitern Sie das Standardbedienfeldverhalten, um ein Akkordeon mit der Komponente `ExpansionPanel` zu erstellen.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js", "bg": true}}

## Individuelles Erweiterungspanel

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}

## Zusätzliche Aktionen

In order to put an action such as a `Checkbox` or a button inside of the `ExpansionPanelSummary`, you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the panel expansion.

{{"demo": "pages/components/expansion-panels/ActionsInExpansionPanelSummary.js", "bg": true}}

## Performance

Der Inhalt von ExpansionPanels wird standardmäßig bereitgestellt, auch wenn das Panel nicht erweitert wird. Bei diesem Standardverhalten werden serverseitiges Rendering und SEO berücksichtigt. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />
```

Wie bei jeder Leistungsoptimierung ist dies keine Silberkugel. Stellen Sie sicher, dass Sie zuerst Engpässe erkennen und anschließend diese Optimierungsstrategien ausprobieren.

## Sekundäre Überschrift und Spalten

Zur Strukturierung des Inhalts können mehrere Spalten verwendet werden. Dem Bedienfeld kann ein Hilfetext hinzugefügt werden, welches den Benutzer unterstützt.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js", "bg": true}}

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Für eine optimale Erreichbarkeit empfehlen wir die Einstellung `id` und `aria-controls` in der `ExpansionPanelSummary`. Das `ExpansionPanel` leitet die notwendigen `aria-labelledby` und `id` für den Inhaltsbereich des Panels ab.