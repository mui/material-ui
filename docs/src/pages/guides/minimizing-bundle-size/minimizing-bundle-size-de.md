# Packetgröße minimieren

<p class="description">Erfahren Sie mehr über die Tools, mit denen Sie die Paketgröße reduzieren können.</p>

## Packetgröße zählt

Die Paketgröße der Material-UI wird sehr ernst genommen. Bei jedem Commit werden für jedes Paket und für kritische Teile dieser Pakete Größen-Snapshots erstellt ([siehe letzten Snapshot](/size-snapshot)). Wir können, kombiniert mit [dangerJS](https://danger.systems/js/), [detaillierte Änderungen der Bündelgröße](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) bei jedem Pull Request prüfen.

## Wie kann ich die Packetgröße reduzieren?

Der Einfachheit halber stellt Material-UI seine vollständige API auf der oberste Ebene des `material-ui` Imports zur Verfügung. Dies ist in Ordnung, wenn Sie mit Tree Shaking arbeiten, wenn Tree Shaking jedoch in Ihrer Build-Kette nicht unterstützt oder konfiguriert ist, kann dadurch **die gesamte Bibliothek und ihre Abhängigkeiten** in Ihrem Packet eingeschlossen werden.

Sie haben mehrere Möglichkeiten, um dies zu vermeiden:

### Option 1

Sie können direkt aus `material-ui/` importieren, um zu vermeiden, ungenutzte Module zu laden. Zum Beispiel anstelle von:

```js
import { Button, TextField } from '@material-ui/core';
```

verwende:

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

Beim direkten Importieren auf diese Weise werden die Exporte in [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/index.js) nicht verwendet. Diese Datei kann trotzdem als praktische Referenz für die öffentlichen Module dienen. Alles, was dort nicht aufgeführt ist, sollte als **privat** betrachtet werden und können ohne vorherige Ankündigung geändert werden. Zum Beispiel die ist `Tabs` Komponente ein öffentliches Modul, während der `TabIndicator` privat ist.

### Option 2

Eine weitere Möglichkeit besteht darin, den gekürzten Import wie folgt zu verwenden, jedoch die Größe des Bundles dank eines **Babel plugins** zu optimieren:

```js
import { Button, TextField } from '@material-ui/core';
```

Wählen Sie eines der folgenden Plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) ist sehr anpassbar und funktioniert mit genügend Anpassungen mit der Material-UI.
- [babel-transform-imports](https://bitbucket.org/amctheatres/babel-transform-imports) hat eine andere Api als `babel-plugin-import`, tut aber dasselbe.
- [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) zielt darauf ab, sofort mit allen `package.json` Dateien zu funktionieren.

**Wichtiger Hinweis**: Diese beiden Optionen *sollten temporär sein* bis Sie Ihrem Projekt Tree Shaking-Funktionen hinzufügen.

## ECMAScript

Das auf npm veröffentlichte Paket ist mit [Babel](https://github.com/babel/babel) **transpiliert**, um die [ unterstützten Plattformen](/getting-started/supported-platforms/) zu berücksichtigen.

Wir veröffentlichen auch eine zweite Version der Komponenten, um **Evergreen-Browser** zu unterstützen. Sie finden diese Version unter den [`/es` Ordner](https://unpkg.com/@material-ui/core@next/es/). Die gesamte nicht offizielle Syntax wird auf den [ECMA-262 Standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm) transpiliert, nichts mehr. Dies kann verwendet werden, um separate Bundles für verschiedene Browser zu erstellen. Ältere Browser erfordern mehr transpilierte JavaScript-Funktionen. Dies erhöht die Größe des Packets. Für die Laufzeitfunktionen von ES2015 sind keine polyfills enthalten. IE11 + und Evergreen-Browser unterstützen alle erforderlichen Funktionen. Wenn Sie Unterstützung für andere Browser benötigen, sollten Sie [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill) in Betracht ziehen.

⚠️ Um die Duplizierung von Code in Benutzerpaketen zu minimieren, raten wir **dringend davon ab** den `/es` Ordner zu benutzten.