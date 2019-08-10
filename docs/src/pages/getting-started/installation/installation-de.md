# Installation

<p class="description">Installieren Sie Material-UI, das weltweit beliebteste React UI-Framework.</p>

Material-UI ist als [npm-Paket](https://www.npmjs.com/package/@material-ui/core) verfügbar.

## npm

Um die Abhängigkeit zu ihrer `package.json` hinzuzufügen, führen Sie folgenden Befehl aus:

```sh
// mit npm
npm install @material-ui/core

// mit yarn
yarn add @material-ui/core
```

Beachten Sie, dass [react](https://www.npmjs.com/package/react) >= 16.8.0 und [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 Abhängigkeiten in Ihrem Projekt sein müssen.

## Die Roboto Schrift

Material-UI wurde mit Blick auf die [Roboto](https://fonts.google.com/specimen/Roboto)-Schrift designed. Bitte folgen Sie daher [diesen Anweisungen](/components/typography/#general). Zum Beispiel über Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Schriftarten-Icons

Um die Font `Symbol` Komponente zu verwenden, müssen Sie zuerst die [Material Symbole Schriftart](https://material.io/tools/icons/) hinzufügen. Hier sind einige [Anweisungen](/components/icons/#font-icons) wie das geht. Zum Beispiel über Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG Symbole

Um vorgefertigte SVG-Materialsymbole zu verwenden, wie sie in den [Icon Demos](/components/icons/) enthalten sind, müssen Sie zuerst das [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) Paket installieren:

```sh
// mit npm
npm install @material-ui/icons

// mit yarn
yarn add @material-ui/icons
```

## CDN

Sie können mit der Material-UI mit minimaler Front-End-Infrastruktur verwenden, was sich hervorragend für das Prototyping eignet.

Wir bieten zwei UMD-Dateien (**Universal Module Definition**) an:

- eine für die Entwicklung: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- eine für die Entwicklung: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Sie können diesem [CDN-Beispiel](https://github.com/mui-org/material-ui/tree/master/examples/cdn) folgen um schnell anfangen zu können.

⚠️ Wir **raten davon ab**, diesen Ansatz in der **Produktion** zu verwenden: Der Client muss die gesamte Bibliothek herunterladen, unabhängig davon, welche Komponenten tatsächlich verwendet werden, was die Leistung und Bandbreitennutzung beeinflusst.

⚠️ Die UMD-Links verwenden den `neueste` Tag, um auf die neueste Version der Bibliothek zu verweisen. Dieser Link ist **instabil**, da er sich verändert, wenn wir neue Versionen veröffentlichen. Sie sollten in Betracht ziehen, auf eine bestimmte Version wie [v3.9.3](https://unpkg.com/@material-ui/core@3.9.3/umd/material-ui.development.js) zu verweisen.