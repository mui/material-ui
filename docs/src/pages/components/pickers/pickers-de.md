---
title: Date Picker, Time Picker React-Komponenten
components: TextField
---

# Auswähler (Picker)

<p class="description">Pickers bieten eine einfache Möglichkeit, um einen einzelnen Wert aus einem vorher festgelegten Satz auszuwählen.</p>

- Auf dem Handy sind Pcikers am besten für die Anzeige im Bestätigungsdialogfeld geeignet.
- Für die Inline-Anzeige, z. B. in einem Formular, sollten Sie kompakte Steuerelemente wie segmentierte Dropdown-Schaltflächen verwenden.

## Native Picker

⚠️ Unterstützung von systemeigenen Eingabesteuerelementen durch Browser [ist nicht perfekt](https://caniuse.com/#feat=input-datetime). Sehen Sie sich die [ergänzenden Projekte](#complementary-projects) an, um weitere Lösungen zu erhalten.

### Datums-Auswahl

Ein natives Datumsauswahlbeispiel mit `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Datum & Zeitauswahl

Ein natives Datum & Zeitauswahlbeispiel mit `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Zeitauswahl

Ein natives Datum Zeitauswahlbeispiel mit `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen.

### @material-ui/pickers

![stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) enthält Steuerelemente für Datum und Uhrzeit, die der Material Design-Spezifikation entsprechen.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}