---
title: React Accordion Komponente
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Akkordeon (Accordion)

<p class="description">Erweiterungspanels (Tafeln) enthalten Erstellungsabläufe und ermöglichen die einfache Bearbeitung eines Elements.</p>

[Ein Erweiterungspanel](https://material.io/archive/guidelines/components/expansion-panels.html) ist ein leichter Behälter, der entweder alleine stehen kann oder mit einer größeren Oberfläche verbunden ist, beispielsweise einer Karte.

> **Hinweis:** Diese Komponente ist zwar nicht mehr in den [Material-Design-Richtlinien](https://material.io/) dokumentiert, wird aber weiterhin von Material-UI unterstützt. It was formerly known as the "expansion panel".

## Einfaches Erweiterungspanel

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Kontrolliertes Akkordeon

Erweitern Sie das Standardbedienfeldverhalten, um ein Akkordeon mit der Komponente `Accordion` zu erstellen.

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Individuelles Erweiterungspanel

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Zusätzliche Aktionen

In order to put an action such as a `Checkbox` or a button inside of the `AccordionSummary`, you need to stop the propagation of the focus and click events to prevent the panel from expanding/collapsing when using the action. You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in the label of the parent button that controls the accordion expansion.

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## Performance

Der Inhalt von Accordions wird standardmäßig bereitgestellt, auch wenn das Panel nicht erweitert wird. Bei diesem Standardverhalten werden serverseitiges Rendering und SEO berücksichtigt. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Wie bei jeder Leistungsoptimierung ist dies keine Silberkugel. Stellen Sie sicher, dass Sie zuerst Engpässe erkennen und anschließend diese Optimierungsstrategien ausprobieren.

## Sekundäre Überschrift und Spalten

Zur Strukturierung des Inhalts können mehrere Spalten verwendet werden. Dem Bedienfeld kann ein Hilfetext hinzugefügt werden, welches den Benutzer unterstützt.

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Für eine optimale Erreichbarkeit empfehlen wir die Einstellung `id` und `aria-controls` in der `AccordionSummary`. Das `Accordion` leitet die notwendigen `aria-labelledby` und `id` für den Inhaltsbereich des Panels ab.
