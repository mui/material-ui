---
title: Circular Progress, Linear Progress React-Komponente
components: CircularProgress, LinearProgress
---

# Fortschritt (Progress)

<p class="description">Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process. The animation works with CSS, not JavaScript.</p>

[Fortschrittsanzeigen](https://material.io/design/components/progress-indicators.html) informieren Benutzer über den Status laufender Prozesse, z. B. Laden einer App, Senden eines Formulars oder Speichern von Updates. Sie kommunizieren den Status der App und zeigen verfügbare Aktionen an, beispielsweise, ob Benutzer vom aktuellen Bildschirm weg navigieren können.

**Bestimmte** Indikatoren zeigen an, wie lange eine Operation dauert.

**Unbestimmt** Indikatoren visualisieren eine nicht angegebene Wartezeit.

#### Fortschritt als Gruppe

Wenn Sie den Fortschritt für eine Folge von Prozessen anzeigen, geben Sie den Gesamtfortschritt und nicht den Fortschritt der einzelnen Aktivitäten an.

## Kreisförmig

[Zirkulärer Fortschritt](https://material.io/design/components/progress-indicators.html#circular-progress-indicators) unterstützt sowohl bestimmte als auch unbestimmte Prozesse.

- **Bestimmte** zirkuläre Fortschritte füllen die unsichtbare, kreisförmige Spur mit Farbe, wenn sich der Indikator von 0 bis 360 Grad bewegt.
- **Unbestimmte** zirkuläree Fortschritte vergrößern und verkleinern sich, während sie sich entlang der unsichtbaren Spur bewegen.

### Zirkular Unbestimmt

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Interaktive Integration

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### Zirkular Bestimmt

{{"demo": "pages/components/progress/CircularDeterminate.js"}}

### Zirkular Statisch

{{"demo": "pages/components/progress/CircularStatic.js"}}

## Linear

[Linearer Fortschritt](https://material.io/design/components/progress-indicators.html#linear-progress-indicators) Indikator.

### Linear Unbestimmt

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Linear Bestimmt

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Linearer Puffer

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Linear Abfrage

{{"demo": "pages/components/progress/LinearQuery.js"}}

## Nicht-standardmäßige Bereiche

Die Fortschrittskomponenten akzeptieren einen Wert im Bereich von 0 - 100. Dies vereinfacht die Benutzer von Bildschirmleseprogrammen, wenn dies die voreingestellten Min / Max-Werte sind. Manchmal arbeiten Sie jedoch mit einer Datenquelle, bei der die Werte außerhalb dieses Bereichs liegen. So können Sie einen Wert in einem beliebigen Bereich auf eine Skala von 0 - 100 leicht umwandeln:

```jsx
// MIN = Minimaler erwarteter Wert
// MAX = Maximaler erwarteter Wert
// Funktion zur Normalisierung der Werte (MIN / MAX kann integriert werden)
const normalize = Wert => (Wert - MIN) * 100 / (MAX - MIN.));

// Beispielkomponente, die an der Stelle des Renderns die Funktion "normalise" verwendet.
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## Individueller Fortschritt

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js"}}

## Erscheinung verzögern

Es gibt [3 wichtige Grenzwerte](https://www.nngroup.com/articles/response-times-3-important-limits/), um die Reaktionszeit zu kennen. Der Ripple Effekt der `ButtonBase` Komponente stellt sicher, dass der Benutzer das Gefühl hat, dass das System sofort reagiert. Normalerweise ist keine spezielle Rückmeldung bei Verzögerungen von mehr als 0,1 Sekunden und weniger als 1,0 Sekunden erforderlich. Nach 1,0 Sekund können Sie einen Fortschritt anzeigen, um den Gedankenfluss des Benutzers nicht zu unterbrechen.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Einschränkungen

Bei starker Belastung verlieren Sie möglicherweise die Strich-Animation oder sehen zufällige CircularProgress-Ringbreiten. Sie sollten prozessorintensive Vorgänge in einem Web-Worker oder in Batches ausführen, um den Haupt-Rendering-Thread nicht zu blockieren.

![schwere Last](/static/images/progress/heavy-load.gif)

Wenn dies nicht möglich ist, können Sie die `disableShrink` Eigenschaft nutzen, um das Problem zu verringern. Siehe [dieses Github issue](https://github.com/mui-org/material-ui/issues/10327).

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}