# Installation

<p class="description">Installieren Sie Material-UI, das weltweit beliebteste React UI-Framework.</p>

Material-UI ist als [npm-Paket](https://www.npmjs.com/package/@material-ui/core) verfügbar.

## npm

Um die Abhängigkeit zu ihrer `package.json` hinzuzufügen, führen Sie folgenden Befehl aus:

```sh
// with npm
npm install @material-ui/core@next @emotion/core @emotion/styled

// with yarn
yarn add @material-ui/core@next @emotion/core @emotion/styled
```

Beachten Sie, dass [react](https://www.npmjs.com/package/react) >= 16.8.0 und [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 Abhängigkeiten in Ihrem Projekt sein müssen.

## Die Roboto Schrift

Material-UI wurde mit Blick auf die [Roboto](https://fonts.google.com/specimen/Roboto)-Schrift designed. Bitte folgen Sie daher [diesen Anweisungen](/components/typography/#general). Zum Beispiel über Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Schriftarten-Icons

Hier sind einige [Anweisungen](/components/icons/#font-icons) wie das geht. In order to use the font `Icon` component, you must first add the [Material icons](https://material.io/tools/icons/) font. Zum Beispiel über Google Web Fonts:

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

Two Universal Module Definition (**UMD**) files are provided:

- eine für die Entwicklung: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- eine für die Entwicklung: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Sie können diesem [CDN-Beispiel](https://github.com/mui-org/material-ui/tree/master/examples/cdn) folgen um schnell anfangen zu können.

⚠️ Using this approach in **production** is **discouraged** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ Die UMD-Links verwenden den `neueste` Tag, um auf die neueste Version der Bibliothek zu verweisen. ⚠️ Die UMD-Links verwenden den `neueste` Tag, um auf die neueste Version der Bibliothek zu verweisen. You should consider pointing to a specific version, such as [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).

## Design-Ressourcen

<a href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>
<a href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>

Dies ist eine Sammlung von Drittanbieterprojekten, die Material-UI erweitern.

- **Sketch**: [Sketch for Material-UI](https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=related-projects-sketch) — A large UI kit with over 600 handcrafted Material-UI's symbols 💎.
- **Figma**: [Figma for Material-UI](https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=related-projects-sketch) — A large UI kit with over 600 handcrafted Material-UI's components 🎨.
- **Framer**: [Framer for Material-UI](https://packages.framer.com/package/material-ui/material-ui) — A small MIT UI kit preview of handcrafted Material-UI's component.
