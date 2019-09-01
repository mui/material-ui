---
title: Date picker, Time picker React components
components: TextField
---

# Date / Time pickers

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- Auf dem Handy sind Pcikers am besten für die Anzeige im Bestätigungsdialogfeld geeignet.
- Für die Inline-Anzeige, z. B. in einem Formular, sollten Sie kompakte Steuerelemente wie segmentierte Dropdown-Schaltflächen verwenden.

## @material-ui/pickers

![stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date picker and time picker controls.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native Picker

⚠️ Unterstützung von systemeigenen Eingabesteuerelementen durch Browser [ist nicht perfekt](https://caniuse.com/#feat=input-datetime). Have a look at [@material-ui/pickers](#material-ui-pickers) for a richer solution.

### Datepickers

A native datepicker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Datum & Zeitauswahl

Ein natives Datum & Zeitauswahlbeispiel mit `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Zeitauswahl

Ein natives Datum Zeitauswahlbeispiel mit `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}