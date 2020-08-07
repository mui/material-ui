# Testen

<p class="description">Schreiben Sie Tests, um Regressionen zu verhindern und besseren Code zu schreiben.</p>

Die Beispiele in diesem Abschnitt verwenden [globale Methoden von Mocha](https://mochajs.org/api/global.html), nicht [Jest](https://jestjs.io/docs/en/api).

## Intern

To learn more about the internal tests, you can have a look at the [README](https://github.com/mui-org/material-ui/blob/master/test/README.md). Material-UI has **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) have proven to be really helpful.

## Benutzerraum

Was ist mit Tests im Benutzerraum? Die Material-UI-Styling-Infrastruktur verwendet einige Hilfsfunktionen, die auf dem [enzym ](https://github.com/airbnb/enzyme) basieren, um den Prozess zu erleichtern, den wir offenlegen. Sie können sie nutzen, wenn Sie dies wünschen. We use almost exclusively full DOM rendering APIs. We encourage you to do the same especially if your components rely on custom themes. Tests using shallow rendering APIs become more brittle with the amount of provider components they require.

### Volles DOM-Rendering

Das vollständige DOM-Rendering ist ideal für Anwendungsfälle, in denen Komponenten vorhanden sind, die mit DOM-APIs interagieren oder den gesamten Lebenszyklus erfordern, um die Komponente vollständig zu testen (z. B. `componentDidMount` usw.).

Die `createMount()` Funktion kann für diese Situation verwendet werden. Neben dem Einwickeln der Enzym-API bietet es eine `cleanUp` Möglichkeit.

### Flaches Rendering (Shallow)

Flaches Rendering ist nützlich, um Ihre Tests auf eine Komponente als Einheit zu beschränken. Dadurch wird auch sichergestellt, dass Ihre Tests das Verhalten untergeordneter Komponenten nicht indirekt durchsetzen. Es wurde ein flaches Rendering erstellt, um Komponenten isoliert zu testen. Dies bedeutet, dass untergeordnete Implementierungsdetails wie der Kontext nicht verloren gehen.

Die `createShallow()` Funktion kann für diese Situation verwendet werden. Neben dem Einwickeln der Enzym-API bietet es eine `dive` und `untilSelector` Möglichkeit.

### Als string rendern

Das Rendern in einen String ist hilfreich, um das Verhalten der auf dem Server verwendeten Komponenten zu testen. Sie können dies nutzen, um die generierte HTML-Zeichenfolge zu bestätigen.

Die `createRender()` Funktion ist dafür ideal. Dies ist nur ein Alias für die Enzym-API, die nur wegen der Konsistenz sichtbar ist.

## API

### `createMount([options]) => mount`

Generieren Sie eine erweiterte Mount-Funktion mit dem erforderlichen Kontext. Bitte beachten Sie die [Enzyme API-Dokumentation](https://airbnb.io/enzyme/docs/api/mount.html) für weitere Informationen zur `mount` Funktion.

#### Argumente

1. `options` (*Object* [optional]) 
  - `options.mount` (*Function* [optional]): Die Mount-Funktion, die verbessert werden soll, verwendet **standardmäßig Enzym**.
  - Die anderen Schlüssel werden an das Optionsargument von `enzyme.mount()` weitergeleitet.

#### Rückgabewerte

`mount` (*mount*): Die mount-Funktion.

#### Beispiele

```jsx
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';

describe('<MyComponent />', () => {
  let mount;

  function MySuccessButton({ children }) {
    return (
      <ThemeProvider theme={{ success: { main: '#fff' } }}>
        {children}
      </ThemeProvider>
    );
  }

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = mount(<MockedTheme><MySuccessButton /></MockedTheme>);
  });
});
```

### `createShallow([options]) => shallow`

Generieren Sie eine erweiterte Shallow-Funktion mit dem erforderlichen Kontext. Bitte beachten Sie die [Enzyme API-Dokumentation](https://airbnb.io/enzyme/docs/api/shallow.html) für weitere Informationen zur `shallow` Funktion.

#### Argumente

1. `options` (*Object* [optional]) 
  - `options.shallow` (*Function* [optional]): Die Shallow-Funktion, die verbessert werden soll, verwendet **standardmäßig Enzym**.
  - `options.untilSelector` (*String* [optional]): Rendert rekursiv die Kinder flach, so lange, bis sie den bereitgestellten Selektor finden können. Es ist hilfreich, Komponenten höherer Ordnung aufzuschlüsseln.
  - `options.dive` (*Boolean* [optional]): Rendert funktional flach das erste nicht-DOM-Child des aktuellen Wrappers und gibt einen Wrapper zurück.
  - Die anderen Schlüssel werden an das Optionsargument von `enzyme.shallow()` weitergeleitet.

#### Rückgabewerte

`shallow` (*shallow*): Eine shallow-Funktion.

#### Beispiele

```jsx
importiere { createShallow } aus '@ material-ui / core / test-utils';

beschreiben ('<0 />', () => {
  sei flach;

  vor (()) => {// Dies ist Mocha; in Jest verwende beforeAll
    shallow = createShallow ();
  });

  es ('sollte funktionieren', () => {
    const wrapper = shallow (<0 />);
  });
});
```

### `createRender([options]) => render`

Generieren Sie eine Render-zu-String-Funktion mit dem erforderlichen Kontext. Bitte beachten Sie die [Enzyme API-Dokumentation](https://airbnb.io/enzyme/docs/api/render.html) für weitere Informationen zur `render` Funktion.

#### Argumente

1. `options` (*Object* [optional]) 
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