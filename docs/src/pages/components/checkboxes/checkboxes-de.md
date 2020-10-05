---
title: React Checkbox component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkbox (kontrollkästchen)

<p class="description">Kontrollkästchen ermöglichen dem Benutzer die Auswahl eines oder mehrerer Elemente aus einem Satz.</p>

[Kontrollkästchen ](https://material.io/design/components/selection-controls.html#checkboxes) können eine Option aus- oder anschalten.

Wenn in einer Liste mehrere Optionen erscheinen, können Sie durch Kontrollkästchen die Abstände erhalten statt Ein- / Aus - Schalter zu verwenden. Wenn Sie nur eine Option haben, vermeiden Sie die Verwendung eines Kontrollkästchens und verwenden Sie stattdessen einen Ein- / Ausschalter.

## Basic checkboxes

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## Checkbox with FormControlLabel

`Checkbox` can be provided with a label thanks to the `FormControlLabel` component.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Kontrollkästchen mit FormGroup

`FormGroup` ist ein hilfreicher Wrapper zum Gruppieren von Auswahlsteuerungskomponenten, welcher eine einfachere API bietet.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Etikettenplatzierung

Sie können die Platzierung des Etiketts ändern:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Angepasstes Kontrollkästchen

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js", "defaultCodeOpen": false}}

🎨 Wenn Sie nach Inspiration suchen, sehen sie sich [MUI Treasury's Anpassungs-Beispiele](https://mui-treasury.com/styles/checkbox) an.

## When to use

- [Kontrollkästchen vs. Optionsfeld (Radio Buttons)](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Kontrollkästchen vs. Schalter](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Alle Formularsteuerelemente sollten Beschriftungen haben. Dazu gehören Optionsfelder, Kontrollkästchen und Schalter. In den meisten Fällen wird dazu das Element `<label>` ([FormControlLabel](/api/form-control-label/)) verwendet.
- Wenn ein Label nicht verwendet werden kann, muss der Eingabekomponente ein Attribut direkt hinzugefügt werden. In diesem Fall können Sie das zusätzliche Attribut (z. B. `aria-label`, `aria-labelby`, `title`) über die Eigenschaft `inputProps` anwenden.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```