# Rechts nach links

<p class="description">Right-to-left languages such as Arabic, Persian or Hebrew are supported. Um die Richtung der Material-UI-Komponenten zu ändern, müssen Sie die folgenden Schritte ausführen.</p>

## Schritte

### 1. HTML

Stellen Sie sicher, dass das `dir` Attribut in body gesetzt wird, sonst werden native Komponenten beschädigt:

```html
<body dir="rtl">
```

### 2. Theme

Legen Sie die Richtung in Ihrem benutzerdefinierten Theme fest:

```js
const theme = createMuiTheme({
  direction: 'rtl',
});
```

### 3. jss-rtl

Sie benötigen dieses JSS-Plugin, um die Styles umzudrehen: [jss-rtl](https://github.com/alitaheri/jss-rtl).

```sh
npm install jss-rtl
```

Nachdem Sie das Plugin in Ihrem Projekt installiert haben, müssen die Komponenten der Material-UI weiterhin von der jss-Instanz geladen werden, wie im Folgenden beschrieben. Intern verwendet withStyles dieses JSS-Plugin wenn `direction: 'rtl'` im Theme gesetzt ist. Schaue in die [plugin README](https://github.com/alitaheri/jss-rtl), um mehr zu erfahren.

Nachdem Sie eine neue JSS-Instanz mit dem Plugin erstellt haben, müssen Sie diese für alle Komponenten in der Komponentenstruktur verfügbar machen. The [`StylesProvider`](/styles/api/#stylesprovider) component enables this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
```

## Demo

*Verwenden Sie den Richtungsumschaltknopf in der oberen rechten Ecke, um die gesamte Dokumentation zu spiegeln*

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## RTL-Umwandlung deaktivieren

Wenn Sie verhindern möchten, dass ein bestimmter Regelsatz von der `Rtl` Transformation beeinflusst wird, können Sie `flip: false` am Anfang hinzufügen.

*Verwenden Sie den Richtungsumschaltknopf in der oberen rechten Ecke, um den Effekt zu sehen.*

{{"demo": "pages/guides/right-to-left/RtlOptOut.js", "hideEditButton": true}}