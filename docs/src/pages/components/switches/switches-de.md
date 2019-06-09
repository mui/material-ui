---
title: Switch React Komponente
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Schalter (Switch)

<p class="description">Schalter ändern den Status einer einzelnen Einstellung ein oder aus.</p>

[Schalter](https://material.io/design/components/selection-controls.html#switches) sind die bevorzugte Methode zum Anpassen der Einstellungen auf dem Handy. Die Option, die der Schalter steuert, sowie der Status, in dem er sich befindet, sollte aus dem entsprechenden Inline-Label hervorgehen.

{{"demo": "pages/components/switches/Switches.js"}}

## Schalter mit FormControlLabel

Ein `Schalter` kann dank der `FormControlLabel` Komponente auch mit einer Etikettenbeschreibung verwendet werden.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Schalter mit FormGroup

`FormGroup` ist ein hilfreicher Wrapper zum Gruppieren von Auswahlsteuerungskomponenten, welcher eine einfachere API bietet. Wir empfehlen Ihnen jedoch, stattdessen ein [Kontrollkästchen](#checkboxes) zu verwenden.

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Anpasster Schalter

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## Etikettenplatzierung

Sie können die Platzierung des Etiketts ändern:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Barrierefreiheit

Alle Formularsteuerelemente sollten Beschriftungen haben. Dazu gehören Optionsfelder, Kontrollkästchen und Schalter. In den meisten Fällen wird dazu das Element `<label>` ([FormControlLabel](/api/form-control-label/)) verwendet.

Wenn ein Label nicht verwendet werden kann, muss der Eingabekomponente ein Attribut direkt hinzugefügt werden. In diesem Fall können Sie das zusätzliche Attribut (z. B. `aria-label`, `aria-labelby`, `title`) über die Eigenschaft `inputProps` anwenden.

```jsx
<Switch
  value="checkedA"
  inputProps={{ 'aria-label': 'Switch A' } }
/>
```