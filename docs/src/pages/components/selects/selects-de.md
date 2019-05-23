---
title: Auswahl React-Komponente
components: Select, NativeSelect
---

# Auswähler (Selects)

<p class="description">Auswahllkomponenten werden zum Sammeln von vom Benutzer bereitgestellten Informationen aus einer Liste von Optionen verwendet.</p>

## Einfache Auswahl

Menüs werden über ihren Referenzelementen so positioniert, dass der aktuell ausgewählte Menüpunkt über dem Referenzelement angezeigt wird.

{{"demo": "pages/components/selects/SimpleSelect.js"}}

## Native Auswahl

Da die Benutzererfahrung auf mobilen Geräten durch die native Auswahl der Plattform verbessert werden kann, erlauben wir ein solches Muster.

{{"demo": "pages/components/selects/NativeSelects.js"}}

## Benutzerdefinierte Auswahl

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

Der erste Schritt besteht darin, die `InputBase` Komponente zu formatieren. Once it's styled, you can either use it directly as a text field or provide it to the select `input` property to have a `select` field.

{{"demo": "pages/components/selects/CustomizedSelects.js"}}

## Mehrfach Auswahl

Die `Auswahl-` Komponente kann mehrere Auswahlmöglichkeiten verarbeiten. Es wird mit der `multiple` Eigenschaft aktiviert.

Wie bei der Einzelauswahl können Sie den neuen Wert abrufen, indem Sie auf `event.target.value` im `onChange` Callback zugreifen. Es ist immer ein Array.

{{"demo": "pages/components/selects/MultipleSelect.js"}}

## Controlled Open Select

{{"demo": "pages/components/selects/ControlledOpenSelect.js"}}

## Mit einem Dialog

Während es von der Material Design-Spezifikation nicht empfohlen wird, können Sie eine Auswahl innerhalb eines Dialogfelds verwenden.

{{"demo": "pages/components/selects/DialogSelect.js"}}

## Text Felder (Text Fields)

Die `TextField` Wrapper-Komponente ist ein vollständiges Formularsteuerelement, das eine Beschriftung, Eingabe und Hilfetext enthält. Ein Beispiel für den Auswahlmodus [in diesem Abschnitt](/components/text-fields/#textfield).