---
title: React Icon Component
components: Icon, SvgIcon
---

# Icons

<p class="description">Anleitungen und Vorschläge für die Verwendung von Symbolen mit der Material-UI.</p>

Ein [-Systemsymbol](https://material.io/design/iconography/system-icons.html) oder ein UI-Symbol symbolisiert einen Befehl, eine Datei, ein Gerät oder ein Verzeichnis. Systemsymbole werden auch verwendet, um gemeinsame Aktionen wie Müll, drucken und speichern und sind häufig in App Leisten, Symbolleisten, Schaltflächen und Listen. Google hat eine Reihe von [Materialsymbolen](https://material.io/tools/icons/?style=baseline) bereitgestellt, die diesen Richtlinien entsprechen.

Material-UI bietet zwei Komponenten um Icons darzustellen: `SvgIcon` für die Darstellung von SVG - Pfaden und `Icon` für die Darstellung von Schrift - Symbolen.

## SVG Symbole

Die `SvgIcon` Komponente nimmt ein SVG-`Pfad`-Element als untergeordnetes Element an und konvertiert es in eine React-Komponente, die den Pfad anzeigt. Dadurch kann das Symbol formatiert werden und auf Mausereignisse reagieren. SVG-Elemente sollten für ein 24x24px-Ansichtsfenster skaliert werden.

Das resultierende Symbol kann so wie es ist, oder als untergeordnetes Element für andere Material-UI-Komponenten, die Symbole verwenden, verwendet werden. Standardmäßig erbt ein Symbol die aktuelle Textfarbe. Optional können Sie die Farbe des Symbols mithilfe einer der Designfarbeneigenschaften festlegen: `primary`, `secondary`, `action`, `error` & `disabled`.

{{"demo": "pages/components/icons/SvgIcons.js"}}

### SVG Material Symbole

Es ist interessant, über die Bausteine zu verfügen, die zum Implementieren von benutzerdefinierten Symbolen erforderlich sind, aber was ist mit den Voreinstellungen? Wir bieten ein separates npm-Paket an,[@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons), das die über 1.000 offiziellen [Material-Icons](https://material.io/tools/icons/?style=baseline) besitzt, die in `SvgIcon` Komponenten umgewandelt werden.

<a href="https://material.io/tools/icons/?icon=3d_rotation&style=baseline">
  <img src="/static/images/icons/icons.png" alt="Offizielle Material Symbole" style="width: 566px" />
</a>

#### Nutzung

Sie können [material.io/tools/icons](https://material.io/tools/icons/?style=baseline) benutzten, um ein bestimmtes Symbol zu finden. Beachten Sie beim Importieren eines Symbols, dass die Namen der Symbole `PascalCase` sind, zum Beispiel:

- [`delete`](https://material.io/tools/icons/?icon=delete&style=baseline) ist unter `@material-ui/icons/Delete` bereitgestellt
- [`delete forever`](https://material.io/tools/icons/?icon=delete_forever&style=baseline) ist unter `@material-ui/icons/DeleteForever` bereitgestellt

Hängen Sie bei *"themed"* Symbolen den Themenamen an den Symbolnamen an. Zum Beispiel

- Das umrahmte [`delete`](https://material.io/tools/icons/?icon=delete&style=outline) Symbol ist unter `@material-ui/icons/DeleteOutlined` bereitgestellt
- Das runde [`delete`](https://material.io/tools/icons/?icon=delete&style=rounded) Symbol ist unter `@material-ui/icons/DeleteRounded` bereitgestellt
- Das zweifarbige [`delete`](https://material.io/tools/icons/?icon=delete&style=twotone) Symbol ist unter `@material-ui/icons/DeleteTwoTone` bereitgestellt
- Das eckige [`delete`](https://material.io/tools/icons/?icon=delete&style=sharp) Symbol ist unter `@material-ui/icons/DeleteSharp` bereitgestellt

Hier gibt es drei Ausnahmen:

- [`3d_rotation`](https://material.io/tools/icons/?icon=3d_rotation&style=baseline) ist unter `@material-ui/icons/ThreeDRotation` bereitgestellt
- [`4k`](https://material.io/tools/icons/?icon=4k&style=baseline) ist unter `@material-ui/icons/FourK` bereitgestellt
- [`360`](https://material.io/tools/icons/?icon=360&style=baseline) ist unter `@material-ui/icons/ThreeSixty` bereitgestellt

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

#### Importe

- Wenn Ihre Umgebung nicht tree-shaking unterstützt, ist der **empfohlen** Weg, um die Symbole zu importieren die folgende:

```jsx
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

- Wenn Ihre Umgebung Tree-Shaking unterstützt, können Sie die Symbole auch folgendermaßen importieren:

```jsx
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
```

Hinweis: Wenn Sie benannte Exporte auf diese Weise importieren, wird der Code für *jedes Symbol* in Ihr Projekt eingefügt. Dies wird nicht empfohlen, es sei denn, Sie konfigurieren [Tree Shake](https://webpack.js.org/guides/tree-shaking/). Dies kann sich auch auf die Leistung des Hot Module Reload auswirken.

### Weitere SVG-Symbole

Auf der Suche nach noch mehr SVG-Icons? Es gibt eine Menge Projekte, aber [https://materialdesignicons.com](https://materialdesignicons.com/) bietet über 2.000 offizielle und von der Community bereitgestellte Symbole. [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) packt diese Symbole als Material-UI-Svg Symbole auf die gleiche Weise wie [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) für die offiziellen Symbole.

## Schriftarten-Icons

Die `Symbol-` Komponente zeigt ein Symbol aus einer beliebigen Symbolschriftart an, die Ligaturen unterstützt. Voraussetzung ist, dass Sie eine, beispielsweise die [Material Icon-Schriftart](http://google.github.io/material-design-icons/#icon-font-for-the-web) in Ihr Projekt einfügen, beispielsweise über Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Symbol` legt den korrekten Klassennamen für die Material-Symbolschriftart fest. Bei anderen Schriftarten müssen Sie den Klassennamen mit der Eigenschaft `className` der Icon-Komponente angeben.

Um ein Symbol zu verwenden, wickeln Sie einfach das Symbol Namen (Schrift Ligatur) mit der `Icon` Komponente zum Beispiel:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Standardmäßig erbt ein Symbol die aktuelle Textfarbe. Optional können Sie die Farbe des Symbols mithilfe einer der Designfarbeneigenschaften festlegen: `primary`, `secondary`, `action`, `error` & `disabled`.

### Schriftart Material icons

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) kann wie folgt mit der Komponente `Icon` werden:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Schriftart vs SVG. Welchen Ansatz verwenden?

Beide Ansätze funktionieren gut, es gibt jedoch einige geringfügige Unterschiede, insbesondere hinsichtlich der Leistung und der Renderqualität. Wann immer möglich, wird SVG bevorzugt, da es die Codeaufteilung ermöglicht, mehr Symbole unterstützt und schneller und besser rendert.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Barrierefreiheit

Icons können alle Arten von aussagekräftigen Informationen vermitteln, daher ist es wichtig, dass sie die größtmögliche Anzahl von Personen erreichen. Es gibt zwei Anwendungsfälle, die Sie berücksichtigen sollten: - **Dekorative Symbole** werden nur für die visuelle oder Branding-Verstärkung verwendet. Wenn sie von der Seite entfernt würden, könnten Benutzer Ihre Seite trotzdem verstehen und verwenden. - **Semantische Symbole** sind Symbole, die Sie verwenden, um Bedeutung zu vermitteln, und nicht nur reine Dekoration. Dazu gehören Symbole ohne nebenstehenden Text, die als interaktive Steuerelemente verwendet werden, etc.

### Dekorative SVG-Symbole

Wenn Ihre Icons rein dekorativ sind, sind Sie bereits fertig! Wir fügen das Attribut `aria-hidden=true`, damit Ihre Symbole richtig zugänglich sind (unsichtbar).

### Semantic SVG Symbole

Wenn Ihr Symbol semantische Bedeutung hat, alles, was Sie tun müssen, ist das Hinzufügen der `titleAccess=„Bedeutung“` Eigenschaft. Wir fügen das Attribut `role="img"` und das Element `<title>` hinzu, damit Ihre Symbole richtig zugänglich sind.

Bei fokussierbaren interaktiven Elementen können Sie, wie bei der Verwendung einer Symbolschaltfläche, die Eigenschaft `aria-label` benutzen:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="Delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### Dekorative Schrift-Symbole

Wenn Ihre Icons rein dekorativ sind, sind Sie bereits fertig! Wir fügen das Attribut `aria-hidden=true`, damit Ihre Symbole richtig zugänglich sind (unsichtbar).

### Semantic Font Symbole

Wenn Ihre Symbole eine semantische Bedeutung haben, müssen Sie eine Textalternative bereitstellen, die nur für assistive Technologien sichtbar ist.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Erstellen Sie einen Benutzer</Typography>
```

### Referenz

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/