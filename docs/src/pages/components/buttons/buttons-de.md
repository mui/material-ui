---
title: Button React Komponente
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Buttons

<p class="description">Mit den Schaltflächen können Benutzer mit einem einzigen Tastendruck Aktionen ausführen und Entscheidungen treffen.</p>

[Buttons](https://material.io/design/components/buttons.html) communicate actions that users can take. They are typically placed throughout your UI, in places like:

- Dialoge
- Modale Fenster
- Formulare
- Cards
- Toolbars

## Contained Buttons

[Contained buttons](https://material.io/design/components/buttons.html#contained-button) sind hervorgehoben und unterscheiden sich durch die Verwendung von Höhe und Füllung. Sie enthalten Aktionen, die für Ihre App vorrangig sind.

Das letzte Beispiel dieser Demo zeigt, wie Sie eine Schaltfläche zum Hochladen verwenden.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

## Text Buttons

[Text buttons](https://material.io/design/components/buttons.html#text-button) werden normalerweise für weniger ausgeprägte Aktionen verwendet, darunter auch solche, die Folgendes enthalten:

- In Dialogen
- In Karten

In Karten helfen Text Buttons dabei, den Karteninhalt hervorzuheben.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined Buttons](https://material.io/design/components/buttons.html#outlined-button) sind Buttons mit mittlerer Betonung. Sie enthalten wichtige Aktionen, aber nicht die primäre Aktion in einer App.

### Alternativen

Outlined Buttons sind auch eine Alternative mit geringerer Betonung als Contained Buttons, oder eine Alternative mit höherer Betonung als Text Buttons.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Grouped Buttons

Mit der ButtonGroup-Komponente können Sie umrissene (Standard) oder betonte Buttons gruppieren.

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

## Split Button

ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example), or be use to immediately trigger a related action.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Floating Action Buttons

Ein [Floating Action Button](https://material.io/design/components/buttons-floating-action-button.html) (FAB) führt die primäre oder gebräuchlichste Aktion auf einem Bildschirm aus. Es wird vor allen Bildschirminhalten angezeigt, normalerweise als Kreisform mit einem Symbol in der Mitte. Es gibt zwei Arten von FABs: normal und erweitert.

Verwenden Sie eine FAB nur, wenn dies für die Darstellung der Hauptaktion eines Bildschirms am besten geeignet ist.

Es wird nur eine Floating Action Button pro Bildschirm empfohlen, um die am häufigsten verwendete Aktion darzustellen.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

Der floating-action-button, wird standardmäßig als expandierendes Material auf dem Bildschirm animiert.

Ein floating-action-button, der sich über mehrere seitliche Bildschirme (wie tabbed-screens) erstreckt, sollte kurz verschwinden und dann wieder erscheinen, wenn sich seine Aktion ändert.

Hierzu kann der Zoom-Übergang verwendet werden. Da sowohl die vorhandenen als auch die eingegebenen Animationen gleichzeitig ausgelöst werden, verwenden wir `enterDelay`, um die Animation der ausgehenden Floating Action Buttons zu beenden, bevor die neue Animation eintritt.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js"}}

## Größen

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Buttons mit Symbolen und Beschriftung

Manchmal möchten Sie möglicherweise Symbole für bestimmte Schaltflächen, um die UX der Anwendung zu verbessern, da Logos leichter als einfacher Text erkannt werden. Wenn Sie beispielsweise eine Schaltfläche zum Löschen haben, können Sie sie mit einem Mülleimer-Symbol kennzeichnen.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon Buttons finden Sie häufig in App-Bars und Toolbars.

Icons eignen sich auch für Umschaltflächen, mit denen eine einzelne Auswahl ausgewählt oder die Auswahl auf z. B. das Hinzufügen oder Entfernen eines Sterns zu einem Element.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Benutzerdefinierte Buttons

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js"}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/button).

## Complex Buttons

Die Text Buttons, die Contained Buttons, die Floatin Action Buttons und die Icon Buttons basieren auf derselben Komponente: der `ButtonBase`. Sie können die Vorteile dieser grundlegenden Komponente zum erstellen von benutzerdefinierten Interaktionen nutzen.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Drittanbieter-Routing Bibliothek

Ein häufiger Anwendungsfall ist die Verwendung eines Buttons, um eine Navigation zu einer neuen Seite auszulösen. Die `ButtonBase` Komponente stellt eine Eigenschaft für diesen Anwendungsfall bereit: `component`. Für bestimmte Fokus-Polyfills erfordert `ButtonBase` jedoch den DOM-Knoten der bereitgestellten Komponente. Dies wird erreicht, indem der Komponente ein Ref zugeordnet wird und erwartet wird, dass die Komponente diesen Ref an den zugrunde liegenden DOM-Knoten weiterleitet. Given that a lot of our interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Here is an integration example with react-router:

{{"demo": "pages/components/buttons/ButtonRouter.js", "defaultCodeOpen": true}}

*Note: Creating the Button components is necessary to prevent unexpected unmounting. You can read more about it in our [component property guide](/guides/composition/#component-property).*