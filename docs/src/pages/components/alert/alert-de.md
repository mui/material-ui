---
title: React Hinweis Komponenten
components: Alert, AlertTitle
---

# Hinweis (Alert)

<p class="description">Ein Hinweis zeigt eine kurze, wichtige Nachricht auf eine Weise, welche die Aufmerksamkeit des Benutzers auf sich zieht ohne die Aufgabe des Benutzers zu unterbrechen.</p>

**Hinweis:** Diese Komponente ist nicht in den [Material-Design-Richtlinien](https://material.io/) dokumentiert, wird aber von Material-UI unterstützt.

## Einfache Hinweise

Der Hinweis bietet vier Schweregrade an, welche je ein eigenes Icon und eine eigene Farbe besitzen.

{{"demo": "pages/components/alert/SimpleAlerts.js"}}

## Beschreibung

Die `AlertTitle`-Komponente kann verwendet werden um einen formatierten Titel über dem Inhalt anzuzeigen.

{{"demo": "pages/components/alert/DescriptionAlerts.js"}}

## Aktionen

Ein Hinweis kann eine Aktion wie zum Beispiel Schließen oder Zurücksetzen haben. Sie wird am Ende des Hinweises, hinter der Nachricht, angezeigt.

Wenn ein `onClose` callback und kein `action` prop gesetzt ist, wird ein Schließ-Icon angezeigt. The `action` prop can be used to provide an alternative action, for example using a Button or IconButton.

{{"demo": "pages/components/alert/ActionAlerts.js"}}

### Transition

You can use a [transition component](/components/transitions/) such as `Collapse` to transition the appearance of the alert.

{{"demo": "pages/components/alert/TransitionAlerts.js"}}

## Icons

The `icon` prop allows you to add an icon to the beginning of the alert component. This will override the default icon for the specified severity.

You can change the default severity to icon mapping with the `iconMapping` prop. This can be defined globally using [theme customization](/customization/globals/#default-props).

Setting the icon prop to false will remove the icon altogether.

{{"demo": "pages/components/alert/IconAlerts.js"}}

## Varianten

Zwei weitere Varianten sind verfügbar – umrandet und ausgefüllt:

### Umrandung

{{"demo": "pages/components/alert/OutlinedAlerts.js"}}

### Ausgefüllt

{{"demo": "pages/components/alert/FilledAlerts.js"}}

## Toast

You can use the Snackbar to [display a toast](/components/snackbars/#customized-snackbars) with the Alert.

## Farbe (Color)

The `color` prop will override the default color for the specified severity.

{{"demo": "pages/components/alert/ColorAlerts.js"}}

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#alert)

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
