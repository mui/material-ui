---
title: Checkbox, Radio, Switch React-Komponente
components: FormControl, FormGroup, FormLabel, FormControlLabel, RadioGroup, Checkbox, Radio, Switch
---
# Auswahlsteuerelemente (Selection Controls)

<p class="description">Auswahlsteuerungen ermöglichen dem Benutzer die Auswahl von Optionen.</p>

[Auswahlsteuerelemente](https://material.io/design/components/selection-controls.html) ermöglichen dem Benutzer das Ausführen von Aufgaben, bei denen eine Auswahl getroffen werden muss, z. B. Auswahl von Optionen oder Ein- und Ausschalten von Einstellungen. Auswahlbedienelemente befinden sich auf Bildschirmen, in denen Benutzer aufgefordert werden, Entscheidungen zu treffen oder Präferenzen wie Einstellungen oder Dialoge festzulegen.

In diesem Abschnitt werden drei Arten von Auswahlsteuerelementen behandelt:

- **[Optionsfelder](#radio-buttons)** ermöglichen die Auswahl einer einzelnen Option aus einem Set.
- **[Kontrollkästchen](#checkboxes)** ermöglichen die Auswahl mehrerer Optionen aus einem Satz.
- **[Schalter](#switches)** ermöglichen, eine Auswahl an oder aus zu schalten.

## Optionsfeld (Radio Buttons)

[Optionsfelder](https://material.io/design/components/selection-controls.html#radio-buttons) ermöglichen die Auswahl einer einzelnen Option aus einem Set. Verwenden Sie Optionsfelder, wenn dem Benutzer alle verfügbaren Optionen anzeigen werden müssen. Wenn verfügbare Optionen reduziert werden können, sollten Sie ein Dropdown-Menü in Betracht ziehen, da so weniger Platz benötigt wird.

Bei Optionsschaltflächen sollte die am häufigsten verwendete Option standardmäßig ausgewählt sein.

`RadioGroup` ist ein hilfreicher Wrapper zur Gruppierung von `Optionsfelder` Komponenten, der eine einfachere API und den richtigen Zugriff der Tastatur auf die Gruppe bietet.

{{"demo": "pages/demos/selection-controls/RadioButtonsGroup.js"}}

### Alleinstehende Schaltflächen

Ein `Optionsfeld` kann auch ohne Wrapper einzeln verwendet werden.

{{"demo": "pages/demos/selection-controls/RadioButtons.js"}}

## Kontrollkästchen

[Kontrollkästchen ](https://material.io/design/components/selection-controls.html#checkboxes) ermöglichen die Auswahl einer einzelnen Option aus einem Set. Kontrollkästchen können verwendet werden, um eine Option ein- oder auszuschalten.

Wenn in einer Liste mehrere Optionen erscheinen, können Sie durch Kontrollkästchen die Abstände erhalten statt Ein- / Aus - Schalter zu verwenden. Wenn Sie nur eine Option haben, vermeiden Sie die Verwendung eines Kontrollkästchens und verwenden Sie stattdessen einen Ein- / Ausschalter.

{{"demo": "pages/demos/selection-controls/Checkboxes.js"}}

Die `Checkbox` kann dank der `FormControlLabel` Komponente auch mit einer Etikettenbeschreibung verwendet werden.

{{"demo": "pages/demos/selection-controls/CheckboxLabels.js"}}

## Kontrollkästchen mit FormGroup

`FormGroup` ist ein hilfreicher Wrapper zum Gruppieren von Auswahlsteuerungskomponenten, welcher eine einfachere API bietet.

{{"demo": "pages/demos/selection-controls/CheckboxesGroup.js"}}

## Schalter

[Schalter](https://material.io/design/components/selection-controls.html#switches) wechseln den Status einer einzelnen Einstellung zwischen ein und aus. Sie sind die bevorzugte Methode zum Anpassen der Einstellungen auf dem Handy.

Die Option, die der Schalter steuert, sowie der Status, in dem er sich befindet, sollte aus dem entsprechenden Inline-Label hervorgehen.

{{"demo": "pages/demos/selection-controls/Switches.js"}}

### Schalter mit FormControlLabel

Ein `Schalter` kann dank der `FormControlLabel` Komponente auch mit einer Etikettenbeschreibung verwendet werden.

{{"demo": "pages/demos/selection-controls/SwitchLabels.js"}}

### Schalter mit FormGroup

`FormGroup` ist ein hilfreicher Wrapper zum Gruppieren von Auswahlsteuerungskomponenten, der eine einfachere API bietet. Wir empfehlen jedoch, stattdessen eine [Checkbox](#checkboxes) verwenden.

{{"demo": "pages/demos/selection-controls/SwitchesGroup.js"}}

### Anpasster Schalter

Wenn du die [Überschreibungs Dokumentationsseite](/customization/overrides/) gelesen hast, aber dich noch nicht sicher genug fühlst, um direkt loszulegen, ist hier noch ein Beispiel, wie du die Farbe des Schalters ändern kannst, und ein iOS Schalter.

⚠️ Auch wenn die material design Spezifikation zur Verwendung von Themes ermutigt, liegen diese Beispiele außerhalb der üblichen Pfade.

{{"demo": "pages/demos/selection-controls/CustomizedSwitches.js"}}

## Etikettenplatzierung

Sie können die Platzierung des Etiketts ändern:

{{"demo": "pages/demos/selection-controls/FormControlLabelPosition.js"}}

## Barrierefreiheit

Alle Formularsteuerelemente sollten Beschriftungen haben. Dazu gehören Optionsfelder, Kontrollkästchen und Schalter. In den meisten Fällen wird dazu das Element `<label>` ([FormControlLabel](/api/form-control-label/)) verwendet.

Wenn ein Label nicht verwendet werden kann, muss der Eingabekomponente ein Attribut direkt hinzugefügt werden. In diesem Fall können Sie das zusätzliche Attribut (z. B. `aria-label`, `aria-labelby`, `title`) über die Eigenschaft `inputProps` anwenden.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' } }
/>
```

## Anleitung

- [Kontrollkästchen vs. Optionsfelder](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)