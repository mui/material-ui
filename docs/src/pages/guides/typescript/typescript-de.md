# TypeScript

<p class="description">Sie können statische Typisierung zu JavaScript hinzufügen, um die Produktivität und die Codequalität dank TypeScript zu verbessern.</p>

Schauen Sie sich das [Create React App mit TypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript) Beispiel an. Eine Mindestversion von TypeScript 2.8 ist erforderlich.

Unsere Type Definitionen werden mit der folgenden [tsconfig.json](https://github.com/mui-org/material-ui/tree/master/tsconfig.json) getestet. Verwendung einer weniger strengen `tsconfig.json` oder das Weglassen einiger Bibliotheken kann zu Fehlern führen.

## Verwendung von `withStyles`

Verwenden von `withStyles` in TypeScript kann es etwas kniffelig sein, aber es gibt einige Hilfsprogramme, um die Erfahrung so schmerzlos wie möglich zu gestalten.

### Verwenden von `CreateStyles`, um die Typerweiterung zu besiegen

Eine häufige Quelle der Verwirrung ist die [Erweiterung der Typen](https://mariusschulz.com/blog/typescript-2-1-literal-type-widening) von TypeScript, was dazu führt, dass dieses Beispiel nicht wie erwartet funktioniert:

```ts
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles(styles);
//         ^^^^^^
//         Typen der Eigenschaft  'flexDirection' sind nicht kompatibel.
// Der Typ 'string' kann dem Typ '"-moz-initial" | "inherit" | "initial" |
// "revert" | "unset" | "column" | "column-reverse" | "row"...'
// nicht zugewiesen werden.
```

Das Problem ist, dass der Typ der `flexDirection` als `string` interpretiert wird, was zu ungenau ist. Um dies zu beheben, können Sie das Styles-Objekt direkt an `withStyles`: übergeben:

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

Wenn Sie jedoch versuchen, die Stile von dem Thema abhängig zu machen, macht Ihnen die Typenerweiterung wieder eine Strich durch die Rechnung:

```ts
withStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.main,
  },
}));
```

Dies liegt daran, dass TypeScript [die Rückgabetypen von Funktionsausdrücken ](https://github.com/Microsoft/TypeScript/issues/241) erweitert.

Aus diesem Grund empfehlen wir die Verwendung unserer `createStyles` Hilfsfunktion zum Erstellen Ihres Stilregelobjekts:

```ts
// Non-dependent styles
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

// Theme-dependent styles
const styles = ({ palette, spacing }: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.main,
  },
});
```

`createStyles` ist nur die Identitätsfunktion; es "tut" nichts zur Laufzeit, es hilft nur die Typen zur Kompilierzeit festzulegen.

### Media-Anfragen

`withStyles` erlaubt ein Styles-Objekt mit Top-Level-Media-Abfragen wie:

```ts
const styles = createStyles({
  root: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    root: {
      display: 'flex',
    },
  },
});
```

However to allow these styles to pass TypeScript, the definitions have to be ambiguous concerning names for CSS classes and actual CSS property names. Aus diesem Grund sollten Klassennamen, die den CSS-Eigenschaften entsprechen, vermieden werden.

```ts
// Fehler, da TypeScript denkte, dass `@media (min-width: 960px)` ein Klassen-
// name und `content` eine css Eigenschaft ist
const ambiguousStyles = createStyles({
  content: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    content: {
      display: 'flex',
    },
  },
});

// Dies funktioniert
const ambiguousStyles = createStyles({
  contentClass: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    contentClass: {
      display: 'flex',
    },
  },
});
```

### Erweitern Sie Ihre Eigenschaften mit `WithStyles`

Da, wenn eine Komponente mit `withStyles(styles)` dekoriert ist, eine spezielle `classes` Eigenschaft injiziert bekommt, möchten Sie die Eigenschaften entsprechend definieren:

```ts
const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface Props {
  // Nicht style Eigenschaften
  foo: number;
  bar: boolean;
  // Injizierte Style Eigenschaften
  classes: {
    root: string;
    paper: string;
    button: string;
  };
}
```

Dies ist jedoch nicht sehr [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) weil Sie die Klassennamen (`'root'`, `'paper'`, `'button'`, ...) an zwei verschiedenen Stellen pflegen müssen. Wir stellen einen Typoperator `WithStyles` bereit, um damit zu helfen. So kannst du einfach schreiben:

```ts
import { WithStyles, createStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface Props extends WithStyles<typeof styles> {
  foo: number;
  bar: boolean;
}
```

### Komponenten dekorieren

Anwenden von `withStyles(styles)` als Funktion funktioniert wie erwartet:

```tsx
const DecoratedSFC = withStyles(styles)(({ text, type, color, classes }: Props) => (
  <Typography variant={type} color={color} classes={classes}>
    {text}
  </Typography>
));

const DecoratedClass = withStyles(styles)(
  class extends React.Component<Props> {
    render() {
      const { text, type, color, classes } = this.props
      return (
        <Typography variant={type} color={color} classes={classes}>
          {text}
        </Typography>
      );
    }
  }
);
```

Aufgrund einer [aktuellen Einschränkung der TypeScript-Dekorateure](https://github.com/Microsoft/TypeScript/issues/4881), kann `withStyles(styles)` leider nicht als Dekorator in TypeScript verwendet werden.

## Anpassung des `Theme`

Beim Hinzufügen benutzerdefinierter Eigenschaften zum `Theme` können Sie es weiterhin in stark typisierter Weise verwenden, indem Sie die [Modulerweiterung von TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) nutzen.

Im folgenden Beispiel wird eine `appDrawer` Eigenschaft hinzugefügt, welche in das von `material-ui` exportierte Theme eingefügt wird:

```ts
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width']
      breakpoint: Breakpoint
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
      breakpoint?: Breakpoint
    }
  }
}
```

Und eine benutzerdefinierte Theme Generierung mit zusätzlichen Standardoptionen:

**./styles/createMyTheme**:

```ts
import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export default function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    appDrawer: {
      width: 225,
      breakpoint: 'lg',
    },
    ...options,
  })
}
```

Dies könnte wie folgt verwendet werden:

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});
```

## Verwendung der `component` Eigenschaft

Mit der Material-UI können Sie die root Komponente einer Komponente durch die `component` Eigenschaft ersetzen. Zum Beispiel ist die Stamm Komponente eines `Button` durch einen React Router `Link` ersetzt werden und alle zusätzlichen Eigenschaften, die an den `Button` übergeben werden, wie `to`, wird auf die `Link` Komponente verteilt. Für ein Code Beispiel für den `Button ` und `react-router-dom` schau dir [diese Demo an](/components/buttons/#third-party-routing-library).

Nicht jede Komponente unterstützt vollständig jeden übergebenen Komponententyp. Wenn Sie auf eine Komponente stoßen, die ihre `component` Eigenschaft ablehnt in TypeScript, öffnen Sie bitte eine Frage in Github. Es besteht ein ständiger Aufwand, um dies zu beheben, indem Komponentenstützen generisch gemacht werden.