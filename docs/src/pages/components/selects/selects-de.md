---
title: Auswahl React-Komponente
components: Select, NativeSelect
---

# Selects (auswähler)

<p class="description">Auswahllkomponenten werden zum Sammeln von vom Benutzer bereitgestellten Informationen aus einer Liste von Optionen verwendet.</p>

## Einfache Auswahl

Menüs werden über ihren Referenzelementen so positioniert, dass der aktuell ausgewählte Menüpunkt über dem Referenzelement angezeigt wird.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## Advanced features

The Select component is meant to be interchangeable with a native `<select>` element.

If you are looking for more advanced features, like combobox, multiselect, autocomplete, async or creatable support, head to the [`Autocomplete` component](/components/autocomplete/). It's meant to be an improved version of the "react-select" and "downshift" packages.

## Native Auswahl

Da die Benutzererfahrung auf mobilen Geräten durch die native Auswahl der Plattform verbessert werden kann, erlauben wir ein solches Muster.

{{"demo": "pages/components/selects/NativeSelects.js"}}

## Text Felder (Text Fields)

Die `TextField` Wrapper-Komponente ist ein vollständiges Formularsteuerelement, das eine Beschriftung, Eingabe und Hilfetext enthält. Ein Beispiel für den Auswahlmodus [in diesem Abschnitt](/components/text-fields/#select).

## Benutzerdefinierte Auswahl

Hier sind einige Beispiele, wie man die Komponente anpassen kann. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

Der erste Schritt besteht darin, die `InputBase` Komponente zu formatieren. Anschließend können Sie es entweder direkt als Textfeld verwenden oder der Eigenschaft select `input` zuweisen, um ein Feld `select` zu erhalten.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## Mehrfach Auswahl

The `Select` component can handle multiple selections. It's enabled with the `multiple` property.

Like with the single selection, you can pull out the new value by accessing `event.target.value` in the `onChange` callback. Es ist immer ein Array.

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## Kontrollierte Auswahl

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Mit einem Dialog

Während es von der Material Design-Spezifikation nicht empfohlen wird, können Sie eine Auswahl innerhalb eines Dialogfelds verwenden.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Gruppierung

Display categories with the `ListSubheader` component or the native `<optgroup>` element.

{{"demo": "pages/components/selects/GroupedSelect.js"}}

## Barrierefreiheit

To properly label your `Select` input you need an extra element with an `id` that contains a label. That `id` needs to match the `labelId` of the `Select` e.g.

```jsx
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
```

Alternatively a `TextField` with an `id` and `label` creates the proper markup and ids for you:

```jsx
<TextField id="select" label="Age" value="20" select>
  <MenuItem value="10">Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</TextField>
```

For a [native select](#native-select), you should mention a label by giving the value of the `id` attribute of the select element to the `InputLabel`'s `htmlFor` attribute:

```jsx
<InputLabel htmlFor="select">Age</InputLabel>
<NativeSelect id="select">
  <option value="10">Ten</option>
  <option value="20">Twenty</option>
</NativeSelect>
```