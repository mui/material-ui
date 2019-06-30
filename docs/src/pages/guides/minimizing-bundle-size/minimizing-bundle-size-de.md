# Packetgröße minimieren

<p class="description">Erfahren Sie mehr über die Tools, mit denen Sie die Paketgröße reduzieren können.</p>

## Packetgröße zählt

Die Paketgröße der Material-UI wird sehr ernst genommen. Bei jedem Commit werden für jedes Paket und für kritische Teile dieser Pakete Größen-Snapshots erstellt ([siehe letzten Snapshot](/size-snapshot)). Wir können, kombiniert mit [dangerJS](https://danger.systems/js/), [detaillierte Änderungen der Bündelgröße](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) bei jedem Pull Request prüfen.

## Wie kann ich die Packetgröße reduzieren?

Der Einfachheit halber stellt Material-UI seine vollständige API auf der oberste Ebene des `material-ui` Imports zur Verfügung. Wenn Sie ES 6-Module und einen Bundler verwenden, der Tree-Shaking unterstützt ([`webpack` >= 2.x ](https://webpack.js.org/guides/tree-shaking/), [ ` parcel` mit einer Flagge](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)), können Sie sicher benannte Importe verwenden und nur einen minimalen Satz von Material-UI-Komponenten in Ihrem Bundles erwarten:

```js
import { Button, TextField } from '@material-ui/core';
```

Beachten Sie, dass das Tree-Shacking eine Optimierung darstellt, die normalerweise nur für die Produktion von Bundles angewendet wird. Entwicklung-Bundles wird die gesamte Bibliothek enthalten, was zu langsamen Startzeiten führen kann. Dies macht sich insbesondere dann bemerkbar, wenn Sie aus `@material-ui/icons` importieren. Die Startzeiten können ungefähr 6-mal langsamer sein als ohne benannte Importe von der API der obersten Ebene.

Wenn dies ein Problem für Sie ist, haben Sie verschiedene Möglichkeiten:

### Option 1

Sie können Pfadimporte verwenden, um zu vermeiden, dass nicht verwendete Module abgerufen werden. Zum Beispiel anstelle von:

```js
import { Button, TextField } from '@material-ui/core';
```

verwende:

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

Beim direkten Importieren auf diese Weise werden die Exporte in [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js) nicht verwendet. Diese Datei kann trotzdem als praktische Referenz für die öffentlichen Module dienen.

Beachten Sie, dass wir nur Importe der ersten und zweiten Ebene unterstützen. Alles drunter wird als privat betrachtet und kann zu einer Duplizierung des Moduls in Ihrem Bundle führen.

```js
// OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1. oder Top-Level

// OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2. Level

// NICHT OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3. Level
```

### Option 2

**Wichtiger Hinweis**: Dies wird nur für `@material-ui/icons` unterstützt. Wir empfehlen diesen Ansatz, wenn Sie Ihren Entwicklungsbuild häufig neu starten.

Eine weitere Option ist benannte Import zu benutzen, aber immer noch kurze Startzeiten zu erhalten, indem Sie `babel` Plugins benutzen.

Wählen Sie eines der folgenden Plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) mit folgender Konfiguration: 
        js
        [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm', // order falls dein Bundler keine ES Module unterstützt
          camel2DashComponentName: false,
        },
        ];

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-import) hat eine andere Api als `babel-plugin-import` aber macht das gleiche. 
        js
        [
        'transform-imports',
        {
          '@material-ui/icons': {
            transform: '@material-ui/icons/esm/${member}',
            / Für Bundler, die keine ES-Module unterstützen, verwenden Sie:
            // transform: '@material-ui/icons/${member}',
          },
        },
        ];

## ECMAScript

Das auf npm veröffentlichte Paket ist mit [Babel](https://github.com/babel/babel) **transpiliert**, um die [ unterstützten Plattformen](/getting-started/supported-platforms/) zu berücksichtigen.

Wir veröffentlichen auch eine zweite Version der Komponenten. Sie finden diese Version unter den [`/es` Ordner](https://unpkg.com/@material-ui/core@next/es/). Die gesamte nicht offizielle Syntax wird auf den [ECMA-262 Standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm) transpiliert, nichts mehr. Dies kann verwendet werden, um separate Bundles für verschiedene Browser zu erstellen. Ältere Browser erfordern mehr transpilierte JavaScript-Funktionen. Dies erhöht die Größe des Packets. Für die Laufzeitfunktionen von ES2015 sind keine polyfills enthalten. IE11 + und Evergreen-Browser unterstützen alle erforderlichen Funktionen. Wenn Sie Unterstützung für andere Browser benötigen, sollten Sie [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill) in Betracht ziehen.

⚠️ Um die Duplizierung von Code in Benutzerpaketen zu minimieren, raten wir **dringend davon ab** den `/es` Ordner zu benutzten.