---
title: Text Field React-Komponente
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Felder (Text Fields)

<p class="description">Text Felder lassen Nutzer Text eingeben und bearbeiten.</p>

[Text Felder](https://material.io/design/components/text-fields.html) erlauben Nutzern, Text in eine Benutzeroberfläche einzugeben. Sie erscheinen typischerweise in Formen und Dialogen.

## Textfeld

Die `TextField` Wrapper-Komponente ist ein vollständiges Formularsteuerelement, das eine Beschriftung, Eingabe und Hilfetext enthält.

{{"demo": "pages/components/text-fields/TextFields.js"}}

> **Hinweis:** Diese Version des Textfelds ist nicht mehr in der Material Design-Dokumentation dokumentiert.

## Umrandung

`TextField` unterstützt Umrandungen.

{{"demo": "pages/components/text-fields/OutlinedTextFields.js"}}

## Gefüllt

`TextField` unterstützt Füllung.

{{"demo": "pages/components/text-fields/FilledTextFields.js"}}

## Komponenten

Das `Textfeld` besteht aus kleineren Komponenten ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), und [`FormHelperText`](/api/form-helper-text/) ) welche Sie direkt nutzen können, um Ihre Formulareingaben erheblich anzupassen.

Möglicherweise haben Sie auch festgestellt, dass einige native HTML-Eingabeeigenschaften in der Komponente `TextField` fehlen. Das war Absicht. Die Komponente kümmert sich um die am häufigsten verwendeten Eigenschaften. Anschließend muss der Benutzer die darunter liegende Komponente verwenden, die in der folgenden Demo gezeigt wird. Sie können jedoch `inputProps` (und `InputProps`, `InputLabelProps` Eigenschaften) verwenden, wenn Sie einiges an Boilerplate vermeiden möchten.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Eingaben

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Benutzerdefinierte Eingabe

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

Die Anpassung endet nicht bei CSS. Sie können Komposition verwenden, um benutzerdefinierte Komponenten zu erstellen und Ihrer App ein einzigartiges Gefühl zu verleihen. Nachfolgend ein Beispiel mit der [`InputBase`](/api/input-base/) Komponente, die von Google Maps inspiriert wurde.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js"}}

## Eingabeverzierungen

`Input` ermöglicht die Bereitstellung von `InputAdornment`. Diese können verwendet werden, um einer Eingabe ein Präfix, ein Suffix oder eine Aktion hinzuzufügen. Sie können beispielsweise eine Symbolschaltfläche verwenden, um das Kennwort ein- oder auszublenden.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

### Mit Symbol

Symbole können vorangestellt oder angehängt werden.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Ausgefüllte Eingabeverzierungen

{{"demo": "pages/components/text-fields/FilledInputAdornments.js"}}

### Umrahmte Eingabeverzierungen

{{"demo": "pages/components/text-fields/OutlinedInputAdornments.js"}}

## Layout

`TextField`, `FormControl` ermöglicht die Angabe von `Abständen (Margin)`, um den vertikalen Abstand der Eingaben zu ändern. Bei Verwendung von `none` (Standard) werden keine Ränder für das `FormControl` angewendet, wohingegen `dense (dicht)` und `normal` sowie andere Stile angegeben werden können, um die Spezifikation zu erfüllen.

{{"demo": "pages/components/text-fields/TextFieldMargins.js"}}

## Einschränkungen

Der Status des Eingabe-Labels "Verkleinern" ist nicht immer korrekt. Das Eingabeetikett soll schrumpfen, sobald die Eingabe etwas anzeigt. Unter bestimmten Umständen können wir den Status "Schrumpfen" nicht ermitteln (Zahleneingabe, Datumseingabe, Stripe-Eingabe). Möglicherweise stellen Sie eine Überlappung fest.

![schrumpfen](/static/images/text-fields/shrink.png)

Um das Problem zu umgehen, können Sie den Status des Labels "verkleinern" erzwingen.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

oder

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

## Formatierte Eingabe

Sie können Bibliotheken von Drittanbietern verwenden, um eine Eingabe zu formatieren. Sie müssen eine benutzerdefinierte Implementierung des `<input>` -Elements mit der `inputComponent` -Eigenschaft bereitstellen. Die bereitgestellte Eingabekomponente sollte die Eigenschaft `inputRef` haben. Die Eigenschaft sollte mit einem Wert aufgerufen werden, der die [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) Schnittstelle implementiert.

Die folgende Demo verwendet die Bibliotheken [react-text-mask](https://github.com/text-mask/text-mask) und [react-number-format](https://github.com/s-yadav/react-number-format).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

## Barrierefreiheit

Damit auf das Textfeld zugegriffen werden kann, muss **die Eingabe mit dem Label und dem Hilfetext** verknüpft werden. Die zugrunde liegenden DOM-Knoten sollten diese Struktur haben.

```jsx
<div class="form-control">
  <label for="my-input">E-Mail-Adresse</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Wir werden Ihre E-Mail niemals teilen.</span>
</div>
```

- Wenn Sie die Komponente `TextField` verwenden, müssen Sie nur eine eindeutige `Id`angeben.
- Wenn Sie die Komponente zusammenstellen:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">E-mail-Adresse</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">Wir werden Ihre E-Mail niemals teilen.</FormHelperText>
</FormControl>
```

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) Eine Reihe von Wrapper-Komponenten, die die Verwendung der Material-Benutzeroberfläche mit Redux-Formular erleichtern.
- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindungen zur Verwendung von Material-UI mit formik.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) Eine Reihe von Wrapper-Komponenten, die die Verwendung der Material-Benutzeroberfläche mit Final Form erleichtern.