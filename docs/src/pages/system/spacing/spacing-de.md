# Abstände

<p class="description">Eine große Auswahl an reaktionsschnellen Abkürzungs- und Auffüllungswerkzeugklassen zum Ändern der Darstellung eines Elements.</p>

## Vermerk

Die Abstand-Utility konvertiert die Abkürzung für Marginals und Padding-Eigenschaften in CSS-Deklarationen für Margin und Padding. Die Eigenschaften werden im Format `{property}{sides}`.

Die *Eigenschaften* ist eine von:

- ` m ` - für Klassen mit *margin*
- `p` - für Klassen mit *padding*

Die *sides* ist eine von:

- ` t ` - für Klassen, die * margin-top* oder *padding-top* setzen
- `b` - für Klassen, die * margin-bottom* oder *padding-bottom* setzen
- ` l ` - für Klassen, die * margin-links* oder *padding-links* setzen
- ` r ` - für Klassen, die * margin-rechts* oder *padding-rechts* setzen
- ` x ` - für Klassen, die sowohl **-links* als auch **-rechts* setzen
- ` y ` - für Klassen, die sowohl **-top* als auch **-bottom* setzen
- leerzeichen - für Klassen, die auf allen vier Seiten des Elements ein margin oder ein padding festlegen

## Transformation

Abhängig von der Eingabe und der Themenkonfiguration wird die folgende Transformation angewendet:

- input: `number` & theme: `number`: tDie Eigenschaft wird mit dem Designwert multipliziert.

```jsx
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

- input: `number` & theme: `array`: Die Eigenschaft Wert wird als Arrayindex verwendet.

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

- input: `number` & theme: `function`: Die Funktion wird mit dem Eigenschaftswert aufgerufen.

```jsx
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```

- input: `string`: Die Eigenschaft wird als unformatierter CSS-Wert übergeben.

```jsx
<Box m="2rem" /> // margin: 2rem;
<Box mx="auto" /> // margin-left: auto; margin-right: auto;
```

## Beispiel

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

{{"demo": "pages/system/spacing/Demo.js"}}

## Horizontale Zentrierung

```jsx
<Box mx="auto">…
```

{{"demo": "pages/system/spacing/HorizontalCentering.js"}}

## API

```js
import { spacing } from '@material-ui/system';
```

| Inportname | Eigenschaften | CSS-Eigenschaft                 | Theme-Schlüssel                                                  |
|:---------- |:------------- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`  | `m`           | `margin`                        | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `mt`          | `margin-top`                    | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `mr`          | `margin-right`                  | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `mb`          | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `ml`          | `margin-left`                   | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `mx`          | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `my`          | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `p`           | `padding`                       | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `pt`          | `padding-top`                   | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `pr`          | `padding-right`                 | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `pb`          | `padding-bottom`                | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `pl`          | `padding-left`                  | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `px`          | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |
| `spacing`  | `py`          | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expend-path=$.spacing) |

*Einige Leute finden die Kurzform der Eigenschaft verwirrend. Sie können die Vollversion verwenden, wenn Sie möchten:*

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```