---
title: Stepper React-Komponente
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
---

# Stepper

<p class="description">Stepper vermitteln den Fortschritt durch nummerierte Schritte. Es bietet einen assistentenartigen Workflow.</p>

[Stepper](https://material.io/archive/guidelines/components/steppers.html) zeigen den Fortschritt durch eine Folge logischer und nummerierter Schritte an. Sie können auch zur Navigation verwendet werden. Steppers können eine vorübergehende Rückmeldung anzeigen, nachdem ein Schritt gespeichert wurde.

**Arten von Steppers**

- Editierbar
- Nicht Editierbar
- Mobil
- Optional

**Typen von Steppers**

- Horizontal
- Senkrecht
- Linear
- Nicht linear

> **Hinweis:** Steppers sind nicht mehr in der Material Design-Dokumentation dokumentiert.

## Horizontal Linear

Der `Stepper` kann gesteuert werden, indem der aktuelle Schrittindex (auf Null basierend) als `activeStep` Eigenschaft übergeben wird. Die `Stepper-` Ausrichtung wird mithilfe der Eigenschaft `orientation` gesetzt.

Dieses Beispiel zeigt auch die Verwendung eines optionalen Schritt durch setzten der `optional` Eigenschaft auf der zweiten `Step` Komponente. Beachten Sie, dass Sie selbst entscheiden müssen, wann ein optionaler Schritt übersprungen wird. Wenn Sie dies für einen bestimmten Schritt festgelegt haben, müssen Sie `complete={false}` setzten, um anzuzeigen, dass der Index des aktiven Schritts den optionalen Schritt überschritten hat, jedoch nicht wirklich abgeschlossen ist.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js"}}

## Horizontal Nicht-Linear

Mit nichtlinearen Steppern können Benutzer an jedem Punkt einen mehrstufigen Fluss einsteigen.

Dieses Beispiel ähnelt dem regulären horizontalen Stepper, mit der Ausnahme, dass Schritte nicht mehr automatisch auf `=disabled={true}` basierend auf der Eigenschaft `activeStep` gesetzt werden.

Wir haben den `StepButton` hier verwendet, um anklickbare Schrittbeschriftungen zu demonstrieren sowie das Eigenschaft `completed`. Da Schritte auf nicht lineare Weise aufgerufen werden können, müssen Sie dies selbst implementieren und festzulegen, wann alle Schritte abgeschlossen sind (oder auch wenn sie abgeschlossen sein müssen).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js"}}

## Horizontal Linear - Alternative Beschriftung

Beschriftungen können unterhalb des Schrittsymbols platziert werden, indem Sie die Eigenschaft `alternativeLabel` für die Komponente `Stepper` festlegen.

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

## Horizontal Nicht-Linear - Alternative Beschriftung

{{"demo": "pages/components/steppers/HorizontalNonLinearAlternativeLabelStepper.js"}}

## Horizontal Nicht-Linear - Fehlerschritt

{{"demo": "pages/components/steppers/HorizontalNonLinearStepperWithError.js"}}

## Vertikaler Stepper

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

## Anpasster Stepper

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

Diese Komponente verwendet ein benutzerdefiniertes `StepConnector` Element, das die Randfarbe basierend auf dem Status `active` und `completed` ändert.

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

## Mobile Stepper

Diese Komponente implementiert einen kompakten Stepper, der für ein mobiles Gerät geeignet ist. Siehe [Mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) zur Inspiration.

### Mobile Stepper - Text

Dies ist im Wesentlichen eine Zurück / Nächste Schaltfläche, die richtig positioniert ist. Sie müssen die Textbeschreibung selbst implementieren. Nachfolgend finden Sie ein Beispiel.

{{"demo": "pages/components/steppers/TextMobileStepper.js"}}

### Mobile Stepper - Text mit Karusselleffekt

Diese Demo ist der vorherigen sehr ähnlich, der Unterschied besteht in der Verwendung von [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views), um den Übergang von Schritten zu realisieren.

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js"}}

### Mobile Stepper - Punkte

Verwenden Sie Punkte, wenn die Anzahl der Schritte nicht groß ist.

{{"demo": "pages/components/steppers/DotsMobileStepper.js"}}

### Mobile Stepper - Fortschritt

Verwenden Sie eine Fortschrittsleiste, wenn viele Schritte vorhanden sind oder wenn Schritte eingefügt werden müssen (basierend auf den Antworten auf frühere Schritte).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js"}}