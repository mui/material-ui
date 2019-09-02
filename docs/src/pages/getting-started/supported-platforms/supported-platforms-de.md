# Unterstützte Plattformen

<p class="description">Erfahren Sie, welche von der modernen bis zu alten Plattformen von Material-UI unterstützt werden.</p>

## Browser

Die Material-UI unterstützt die neuesten, stabilen Versionen aller gängigen Browser und Plattformen. It also supports Internet Explorer 11. You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


Da Googlebot einen Web-Rendering-Service (WRS) zum Indizieren des Seiteninhalts verwendet, ist es entscheidend, dass Material-UI dies unterstützt. [WRS aktualisiert regelmäßig die verwendete Rendering-Engine](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). Sie können erwarten, dass die Komponenten von Material-UI ohne größere Probleme gerendert werden.

## Server

Because Material-UI supports server-side rendering, it needs to support the latest, stable releases of [Node.js](https://github.com/nodejs/node). Wir versuchen auch, die in Wartung befindlichen [LTS-Versionen](https://github.com/nodejs/Release#lts-schedule1) zu unterstützen. Right now, it supports **node v8.x** and newer versions.

### CSS-Präfix

Beachten Sie, dass einige CSS-Funktionen einen zusätzlichen Nachverarbeitungsschritt [erfordern](https://github.com/cssinjs/jss/issues/279), welcher herstellerspezifische Präfixe hinzufügt. Diese Präfixe werden auf dem Client dank [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer) automatisch hinzugefügt.

Das in dieser Dokumentation bereitgestellte CSS wird mit dem [`Autoprefixer`](https://www.npmjs.com/package/autoprefixer) verarbeitet. Sie können die [Dokumentationsimplementierung](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) als Inspiration verwenden. Beachten Sie, dass dies Auswirkungen auf die Leistung der Seite hat. Für statische Seiten ist dies ein Muss, aber es muss in Einklang gebracht werden mit nichts tun, wenn dynamische Seiten gerendert werden.

## React

Material-UI supports the most recent versions of React, starting with ^16.8.0 (the one with the hooks). Have a look at our older [versions](/versions/) for backward compatibility.