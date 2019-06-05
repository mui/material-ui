# Unterstützte Plattformen

<p class="description">Erfahren Sie, welche von der modernen bis zu alten Plattformen von Material-UI unterstützt werden.</p>

## Browser

Die Material-UI unterstützt die neuesten, stabilen Versionen aller gängigen Browser und Plattformen. Wir unterstützen auch Internet Explorer 11. Sie müssen keine JavaScript-Komponente angeben, da wir nicht unterstützte Browserfunktionen intern und isoliert verwalten.

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |

Da Googlebot einen Web-Rendering-Service (WRS) zum Indizieren des Seiteninhalts verwendet, ist es entscheidend, dass Material-UI dies unterstützt. [WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Sie können erwarten, dass die Komponenten von Material-UI ohne größere Probleme gerendert werden.

## Server

Da die Material-UI serverseitiges Rendering unterstützt, müssen wir die neueste, stabile Version von [Node.js ](https://github.com/nodejs/node) unterstützen. Wir versuchen auch, die in Wartung befindlichen [LTS-Versionen](https://github.com/nodejs/Release#lts-schedule1) zu unterstützen. Derzeit unterstützen wir den **node v8.x** und neuere Versionen.

### CSS-Präfix

Beachten Sie, dass einige CSS-Funktionen einen zusätzlichen Nachverarbeitungsschritt [erfordern](https://github.com/cssinjs/jss/issues/279), welcher herstellerspezifische Präfixe hinzufügt. Diese Präfixe werden auf dem Client dank [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer) automatisch hinzugefügt.

Das in dieser Dokumentation bereitgestellte CSS wird mit dem [`Autoprefixer`](https://www.npmjs.com/package/autoprefixer) verarbeitet. Sie können die [Dokumentationsimplementierung](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) als Inspiration verwenden. Beachten Sie, dass dies Auswirkungen auf die Leistung der Seite hat. Für statische Seiten ist dies ein Muss, aber es muss in Einklang gebracht werden mit nichts tun, wenn dynamische Seiten gerendert werden.