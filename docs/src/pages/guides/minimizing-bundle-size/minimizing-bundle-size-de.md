# Packetgröße minimieren

<p class="description">Erfahren Sie mehr über die Tools, mit denen Sie die Paketgröße reduzieren können.</p>

## Packetgröße zählt

Die Paketgröße der Material-UI wird sehr ernst genommen. Bei jedem Commit werden für jedes Paket und für kritische Teile dieser Pakete Größen-Snapshots erstellt ([siehe letzten Snapshot](/size-snapshot)). Wir können, kombiniert mit [dangerJS](https://danger.systems/js/), [detaillierte Änderungen der Bündelgröße](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) bei jedem Pull Request prüfen.

## Wie kann ich die Packetgröße reduzieren?

Der Einfachheit halber stellt Material-UI seine vollständige API auf der oberste Ebene des `material-ui` Imports zur Verfügung. If you're using ES 6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and expect only a minimal set of Material-UI components in your bundle:

```js
import { Button, TextField } from '@material-ui/core';
```

Be aware that tree-shaking is an optimization that is usually only applied to production bundles. Development bundles will contain the full library which can lead to slower startup times. This is especially noticeable if you import from `@material-ui/icons`. Startup times can be approximately 6x slower than without named imports from the top-level API.

If this is an issue for you you have various options:

### Option 1

You can use path imports to avoid pulling in unused modules. Zum Beispiel anstelle von:

```js
import { Button, TextField } from '@material-ui/core';
```

verwende:

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

Beim direkten Importieren auf diese Weise werden die Exporte in [`@material-ui/core/index.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/index.js) nicht verwendet. Diese Datei kann trotzdem als praktische Referenz für die öffentlichen Module dienen.

Be aware that we only support first and second leve imports. Anything below is considered private and can cause module duplication in your bundle.

```js
// OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1st or top-level

// OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2nd level

// NOT OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3rd level
```

### Option 2

**Important note**: This is only supported for `@material-ui/icons`. We recommend this approach if you often restart your development build.

Another option is to keep using named imports, but still have shorter start up times by using `babel` plugins.

Wählen Sie eines der folgenden Plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) with the following configuration: 
        js
        [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm', // or '' if your bundler does not support ES modules
          camel2DashComponentName: false,
        },
        ];

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-import) has a different api than `babel-plugin-import` but does same thing. 
        js
        [
        'transform-imports',
        {
          '@material-ui/icons': {
            transform: '@material-ui/icons/esm/${member}',
            // for bundlers not supporting ES modules use:
            // transform: '@material-ui/icons/${member}',
          },
        },
        ];

## ECMAScript

Das auf npm veröffentlichte Paket ist mit [Babel](https://github.com/babel/babel) **transpiliert**, um die [ unterstützten Plattformen](/getting-started/supported-platforms/) zu berücksichtigen.

We also publish a second version of the components. Sie finden diese Version unter den [`/es` Ordner](https://unpkg.com/@material-ui/core@next/es/). Die gesamte nicht offizielle Syntax wird auf den [ECMA-262 Standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm) transpiliert, nichts mehr. Dies kann verwendet werden, um separate Bundles für verschiedene Browser zu erstellen. Ältere Browser erfordern mehr transpilierte JavaScript-Funktionen. Dies erhöht die Größe des Packets. Für die Laufzeitfunktionen von ES2015 sind keine polyfills enthalten. IE11 + und Evergreen-Browser unterstützen alle erforderlichen Funktionen. Wenn Sie Unterstützung für andere Browser benötigen, sollten Sie [`@babel/polyfill`](https://www.npmjs.com/package/@babel/polyfill) in Betracht ziehen.

⚠️ Um die Duplizierung von Code in Benutzerpaketen zu minimieren, raten wir **dringend davon ab** den `/es` Ordner zu benutzten.