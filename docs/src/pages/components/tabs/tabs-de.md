---
title: Tabs React-Komponente
components: Tabs, Tab
---

# Tabs

<p class="description">Tabs erleichtern das Erkunden und Wechseln zwischen verschiedenen Ansichten.</p>

[Tabs](https://material.io/design/components/tabs.html) organisieren und ermöglichen die Navigation zwischen zusammengehörigen Inhaltsgruppen auf derselben Hierarchieebene.

## Einfache Tabs

Ein einfaches Beispiel ohne Verzierungen.

{{"demo": "pages/components/tabs/SimpleTabs.js"}}

### Umwickelte Tabs

Lange Tab-Beschriftungen werden automatisch umgebrochen. Sollte die Beschriftung für den Tab zu lang sein, läuft sie über und der Text ist nicht sichtbar.

{{"demo": "pages/components/tabs/TabsWrappedLabel.js"}}

### Deaktivierter Tab

Ein Tab kann durch die Eigenschaft `disabled` deaktiviert werden.

{{"demo": "pages/components/tabs/DisabledTabs.js"}}

## Feste Tabs

Feste Tabs sollten mit einer begrenzten Anzahl von Tabs verwendet werden, und wenn eine gleichmäßige Platzierung das Muskelgedächtnis verbessert.

### Gesamte Breite

Die Eigenschaft `variant="fullWidth"` sollte für kleinere Ansichten verwendet werden. Diese Demo verwendet auch [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views), um den Tab-Übergang zu animieren und Tabs auf Touch-Geräten zu ziehen.

{{"demo": "pages/components/tabs/FullWidthTabs.js"}}

### Zentriert

Die Eigenschaft `centered` sollte für kleinere Ansichten verwendet werden.

{{"demo": "pages/components/tabs/CenteredTabs.js"}}

## Scrollbare Tabs

### Automatische Scroll-Tasten

Die linken und rechten Bildlauftasten werden automatisch auf dem Desktop angezeigt und auf dem Handy ausgeblendet. (basierend auf der Breite des Ansichtsfensters)

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js"}}

### Erzwungene Bildlaufschaltflächen

Die linken und rechten Bildlauftasten werden unabhängig von der Breite des Ansichtsfensters angezeigt.

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js"}}

### Scrolltasten verhindern

Linke und rechte Bildlauftasten werden niemals angezeigt. Der gesamte Bildlauf muss durch Benutzeragenten-Bildlaufmechanismen (z. B. Wischen nach links / rechts, Shift-Mausrad usw.) eingeleitet werden

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js"}}

## Benutzerdefinierte Tabs

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/tabs/CustomizedTabs.js"}}



## Nav-Tabs

Standardmäßig verwenden Tabs ein `Button` -Element, aber Sie können Ihren eigenen benutzerdefinierten Tag oder eine Komponente zur Verfügung stellen. Hier ein Beispiel für die Implementierung der Tabnavigation:

{{"demo": "pages/components/tabs/NavTabs.js"}}

## Symbol-Tabs

Tab-Beschriftungen können entweder nur Symbole oder nur Text enthalten.

{{"demo": "pages/components/tabs/IconTabs.js"}}

{{"demo": "pages/components/tabs/IconLabelTabs.js"}}