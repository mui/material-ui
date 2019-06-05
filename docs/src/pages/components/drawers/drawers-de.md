---
title: Drawer React-Komponente
components: Drawer, SwipeableDrawer
---

# Seitliches Menü (Drawer)

<p class="description">Navigationsfächer bieten Zugriff auf Ziele in Ihrer App. Seitenblätter sind Flächen, die zusätzlichen Inhalt enthalten, der am linken oder rechten Rand des Bildschirms verankert ist.</p>

[Navigationsleisten ](https://material.io/design/components/navigation-drawer.html) bieten Zugriff auf Ziele und App-Funktionen, wie z.B. Benutzer wechseln. Sie können entweder permanent auf dem Bildschirm angezeigt oder durch ein Navigationsmenüsymbol gesteuert werden.

[Die Seitenblätter](https://material.io/design/components/sheets-side.html) sind Zusatzflächen, die hauptsächlich auf Tablets und Desktops verwendet werden.

## Temporäre Navigationsleisten

Temporäre Navigationsleisten können geöffnet oder geschlossen werden. Die Leiste ist standardmäßig geschlossen und öffnet sich vorübergehend über allen anderen Inhalten, bis ein Bereich ausgewählt wird.

Die Leiste kann durch Klicken auf die Überlagerung oder Drücken der Esc-Taste abgebrochen werden. Sie wird geschlossen, wenn ein Element ausgewählt wird. Dies wird durch Steuern der `open` Eigenschaft gesteuert.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

## Wischbare Navigationsleisten

Sie können die Leiste mit der `SwipeableDrawer` Komponente einklappbar machen.

Diese Komponente ist mit einem 2-kB-gzipped -Overhead ausgestattet. Einige mobile Endgeräte können den Fingern bei 60 FPS nicht folgen. Sie können die Eigenschaft `disableBackdropTransition` als Hilfe verwenden, um dies zu verhindern.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

Wir verwenden auf dieser Dokumentations-Website die folgenden Eigenschaften, um die Komponente optimal nutzen zu können: - iOS wird auf High-End-Geräten gehostet. Wir können den Hintergrundübergang aktivieren, ohne einen Einbruch der Bilder pro Sekunde zu sehen. Die Leistung wird gut genug sein. - iOS hat eine „Swipe, um zurück zu gehen“ Feature, welches Chaos bei der Discovery-Funktion verursacht. Wir müssen es deaktivieren.

```jsx
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
```

## Responsive Navigationsleiste

Die `Hidden` Responsive-Hilfskomponente ermöglicht die Anzeige verschiedener Leistentypen in Abhängigkeit von der Bildschirmbreite. Eine `temporäre` Leiste wird für kleine Bildschirme angezeigt, während eine `permanente` Leiste für breitere Bildschirme angezeigt wird.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Andauernde Navigationsleiste

Andauernde Navigationsleisten können geöffnet oder geschlossen werden. Die Leiste befindet sich auf der gleichen Höhe wie der Inhalt. Sie ist standardmäßig geschlossen und wird durch Auswahl des Menüsymbols geöffnet und bleibt geöffnet, bis es vom Benutzer geschlossen wird. Der Status der Leiste wird von Aktion zu Aktion und von Sitzung zu Sitzung gespeichert.

Wenn sich die Leiste außerhalb des Seitenrasters befindet und geöffnet wird, zwingt die Schublade andere Inhalte, ihre Größe zu ändern und sich an den kleineren Ansichtsfenster anzupassen.

Andauernde Navigationsleisten sind für alle Größen, die größer als mobile sind, zulässig. Sie werden nicht für Apps mit mehreren Hierarchieebenen empfohlen, für deren Navigation ein Aufwärtspfeil erforderlich ist.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini-Variante Navigationsleiste

Bei dieser Variante ändert die andauernde Navigationsleiste ihre Breite. Ihr Ruhezustand ist eine MiniLeiste auf derselben Höhe wie der Inhalt, die von der App-Leiste abgeschnitten wird. Wenn sie erweitert wird, wird es als standardmäßige andauernde Navigationsleiste angezeigt.

Die Mini-Variante wird für Anwendungsbereiche empfohlen, die neben Inhalten einen schnellen Auswahlzugriff benötigen.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Permanente Navigationsleiste

Permanente Navigationsleisten sind immer sichtbar und am linken Rand auf derselben Höhe wie der Inhalt oder der Hintergrund fixiert. Sie können nicht geschlossen werden.

Permanente Navigationsleisten sind die **empfohlene Standardeinstellung für Desktop**.

### Navigation in voller Höhe

Apps, welche sich auf den Informationsverbrauch konzentrieren, verwenden eine Links-Rechts-Hierarchie.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Unter der App-Leiste geschnitten

Apps, welche sich auf Produktivität konzentrieren, verwenden ein ausgewogenes Verhältnis über den Bildschirm.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}