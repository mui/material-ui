# Testen

<p class="description">Schreiben Sie Tests, um Regressionen zu verhindern und besseren Code zu schreiben.</p>

Die Beispiele in diesem Abschnitt verwenden [globale Methoden von Mocha](https://mochajs.org/api/global.html), nicht [Jest](https://jestjs.io/docs/en/api).

## Intern

Wir nehmen Tests ernst. Wir haben **eine breite Palette** von Tests geschrieben und halten diese aktuell, sodass wir mit Vertrauen auf den Komponenten iterieren können, zum Beispiel haben sich die, von [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) zur Verfügung gestellten, visuellen Regressionstests als sehr hilfreich erwiesen. Weitere Informationen zu unseren internen Tests finden Sie in der [README](https://github.com/mui-org/material-ui/blob/master/test/README.md).

Obwohl wir eine 100%ige Testabdeckung erreicht haben, empfehlen wir unseren Benutzern nicht, dasselbe zu tun. [![Abdeckungsstatus](https://img.shields.io/codecov/c/github/mui-org/material-ui/master.svg)](https://codecov.io/gh/mui-org/material-ui/branch/master)

## Benutzerraum

Was ist mit Tests im Benutzerraum? Die Material-UI-Styling-Infrastruktur verwendet einige Hilfsfunktionen, die auf dem [enzym ](https://github.com/airbnb/enzyme) basieren, um den Prozess zu erleichtern, den wir offenlegen. Sie können sie nutzen, wenn Sie dies wünschen.

### Flaches Rendering (Shallow)

Flaches Rendering ist nützlich, um Ihre Tests auf eine Komponente als Einheit zu beschränken. Dadurch wird auch sichergestellt, dass Ihre Tests das Verhalten untergeordneter Komponenten nicht indirekt durchsetzen. Es wurde ein flaches Rendering erstellt, um Komponenten isoliert zu testen. Dies bedeutet, dass untergeordnete Implementierungsdetails wie der Kontext nicht verloren gehen.

Die `createShallow()` Funktion kann für diese Situation verwendet werden. Neben dem Einwickeln der Enzym-API bietet es eine `dive` und `untilSelector` Möglichkeit.

### Volles DOM-Rendering

Das vollständige DOM-Rendering ist ideal für Anwendungsfälle, in denen Komponenten vorhanden sind, die mit DOM-APIs interagieren oder den gesamten Lebenszyklus erfordern, um die Komponente vollständig zu testen (z. B. `componentDidMount` usw.).

Die `createMount()` Funktion kann für diese Situation verwendet werden. Neben dem Einwickeln der Enzym-API bietet es eine `cleanUp` Möglichkeit.

### Als string rendern

Das Rendern in einen String ist hilfreich, um das Verhalten der auf dem Server verwendeten Komponenten zu testen. Sie können dies nutzen, um die generierte HTML-Zeichenfolge zu bestätigen.

Die `createRender()` Funktion ist dafür ideal. Dies ist nur ein Alias für die Enzym-API, die nur wegen der Konsistenz sichtbar ist.

## API

### `createShallow([options]) => shallow`

Generieren Sie eine erweiterte Shallow-Funktion mit dem erforderlichen Kontext. Bitte beachten Sie die [Enzyme API-Dokumentation](https://airbnb.io/enzyme/docs/api/shallow.html) für weitere Informationen zur `shallow` Funktion.

#### Argumente

1. `Optionen` (*Object* [optional]) 
    - `options.shallow` (*Function* [optional]): Die Shallow-Funktion, die verbessert werden soll, verwendet **standardmäßig Enzym**.
    - `options.untilSelector` (*String* [optional]): Rendert rekursiv die Kinder flach, so lange, bis sie den bereitgestellten Selektor finden können. Es ist hilfreich, Komponenten höherer Ordnung aufzuschlüsseln.
    - `options.dive` (*Boolean* [optional]): Shallow function renders the one non-DOM child of the current wrapper, and returns a wrapper around the result.
    - Die anderen Schlüssel werden an das Optionsargument von `enzyme.shallow()` weitergeleitet.

#### Rückgabewerte

`shallow` (*shallow*): Eine shallow-Funktion.

#### Beispiele

```jsx
importiere { createShallow } aus '@ material-ui / core / test-utils';

beschreiben ('<0 />', () =&gt; {
  sei flach;

  vor (()) =&gt; {// Dies ist Mocha; in Jest verwende beforeAll
    shallow = createShallow ();
  });

  es ('sollte funktionieren', () =&gt; {
    const wrapper = shallow (<0 />);
  });
});
```

### `createMount([options]) => mount`

Generieren Sie eine erweiterte Mount-Funktion mit dem erforderlichen Kontext. Bitte beachten Sie die [Enzyme API-Dokumentation](https://airbnb.io/enzyme/docs/api/mount.html) für weitere Informationen zur `mount` Funktion.

#### Argumente

1. `Optionen` (*Object* [optional]) 
    - `options.mount` (*Function* [optional]): Die Mount-Funktion, die verbessert werden soll, verwendet **standardmäßig Enzym**.
    - Die anderen Schlüssel werden an das Optionsargument von `enzyme.mount()` weitergeleitet.

#### Rückgabewerte

`mount` (*mount*): Die mount-Funktion.

#### Beispiele

```jsx
import { createMount } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = mount(<MyComponent />);
  });
});
```

### `createRender([options]) => render`

Generieren Sie eine Render-zu-String-Funktion mit dem erforderlichen Kontext. Bitte beachten Sie die [Enzyme API-Dokumentation](https://airbnb.io/enzyme/docs/api/render.html) für weitere Informationen zur `render` Funktion.

#### Argumente

1. `Optionen` (*Object* [optional]) 
    - `options.render` (*Function* [optional]): Die Renderfunktion, die verbessert werden soll, verwendet **standardmäßig Enzym**.
    - Die anderen Schlüssel werden an das Optionsargument von `enzyme.render()` weitergeleitet.

#### Rückgabewerte

`render` (*Funktion*): Eine Render-zu-String-Funktion.

#### Beispiele

```jsx
import { createRender } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let render;

  before(() => {
    render = createRender();
  });

  it('should work', () => {
    const wrapper = render(<MyComponent />);
  });
});
```