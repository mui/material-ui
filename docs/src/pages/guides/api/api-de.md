# API-Design-Ansatz

<p class="description">Wir haben viel über die Verwendung von Material-UI gelernt, und durch das Umschreiben von Version 1 konnten wir die Komponenten-API vollständig überdenken.</p>

> Das API-Design ist schwierig, weil man es einfach erscheinen lassen kann, aber es ist tatsächlich täuschend komplex ist, oder man macht die API einfach, aber die Umsetzung komplex.

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

Wie Sebastian Markbage [sagt](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html): Keine Abstraktion ist falschen Abstraktionen überlegen. Wir bieten Komponenten auf niedriger Ebene an, um die Kompositionsfähigkeiten zu maximieren.

## Komposition

Möglicherweise haben Sie bei der Erstellung von Komponenten Inkonsistenzen in der API festgestellt. Um für mehr Transparenz zu sorgen, haben wir beim Entwurf der API die folgenden Regeln verwendet:

1. Verwenden der `children` Eigenschaft ist der idiomatische Weg, um mit React zu komponieren.
2. Manchmal benötigen wir nur eine eingeschränkte Zusammensetzung von Kidnern, zum Beispiel, wenn wir keine Permutationen für untergeordnete Elemente zulassen müssen. In diesem Fall macht die Angabe expliziter Eigenschaften die Implementierung einfacher und performanter. Zum Beispiel nimmt ein `Tab` ein `icon` und `label` als Eigenschaft an.
3. Die API-Konsistenz ist wichtig.

## Regeln

Abgesehen von den oben genannten Kompensationsregeln setzen wir die folgenden Regeln durch:

### Verteilt

Nicht dokumentierte Eigenschaften werden auf das Stammelement verteilt. zum Beispiel wird die `className`Eigenschaft auf die Wurzel angewendet.

Angenommen, Sie möchten die Wellen im `Menüelement` deaktivieren. Sie können das Ausbreitungsverhalten nutzen:

```jsx
<MenuItem disableRipple />
```

Die Eigenschaft `disableRipple` wird folgendermaßen weitergegeben: [`MenuItem`](/api/menu-item/) > [`ListItem`](/api/list-item/) > [`ButtonBase`](/api/button-base/).

### Native Eigenschaften

Wir vermeiden, die vom DOM unterstützten nativen Eigenschaften wie [`className`](/customization/components/#overriding-styles-with-class-names) zu dokumentieren.

### CSS-Klassen

Alle Komponenten akzeptieren die [`classes`](/customization/components/#overriding-styles-with-classes) Eigenschaft zum Anpassen der Stile. Das Design der classes beantwortet zwei Bedingungen: Die Klassenstruktur so einfach wie möglich zu gestalten, aber trotzdem ausreichend, um die Material Design-Spezifikation zu implementieren.

- Die auf das Wurzelelement angewendete Klasse wird immer als `root` bezeichnet.
- Alle Standardstile sind in einer einzigen Klasse zusammengefasst.
- Die auf Nicht-Root-Elemente angewendeten Klassen wird der Name des Elements vorangestellt, z. B. `paperWidthXs` in der Dialogkomponente.
- Die von einer booleschen Eigenschaft angewendeten Varianten sind **nicht** vorangestellt, zB die `rounded` Klasse wird durch die `rounded` Eigenschaft angewendet.
- Die von einer Enumeneigenschaft angewendeten Varianten **sind** vorangestellt, z. B. die `colorPrimary` Klasse wird von der Farbe `color= "primary" ` Eigenschaft angewendet.
- Eine Variante hat **eine Spezifitätsebene**. Die `color` und `variant` Eigenscahft werden als Variant betrachtet. Je geringer die Stilspezifität ist, desto einfacher ist es, sie zu überschreiben.
- Wir erhöhen die Spezifität für einen Variantenmodifikator. Wir ** müssen es schon ** für die Pseudoklassen (`:hover`, `:focus`, usw.) anwenden. Es ermöglicht viel mehr Kontrolle auf Kosten von mehr Boilerplate. Hoffentlich ist es auch intuitiver.

```js
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};
```

### Verschachtelte Komponenten

Verschachtelte Komponenten in einer Komponente haben:

- ihre eigenen abgeflachten Eigenschaften, wenn diese der Schlüssel für die Abstraktion der Komponenten der obersten Ebene sind, eine Instanz und eine `id` Eigenschaft für die `Input` Komponente.
- ihre eigenen `xxxProps ` Eigenschaft, falls Benutzer möglicherweise die Unterkomponenten der internen Render-Methode anpassen müssen, z. B. die `inputProps` und `InputProps` Eigenschaften für Komponenten, die `Input` intern verwenden.
- ihre eigene `xxxComponent` Eigenschaft zum Durchführen der Komponenteninjektion.
- ihre eigene `xxxRef` Eigenschaft, falls der Benutzer möglicherweise zwingende Aktionen ausführen muss, z. B. eine `inputRef` Eigenschaft verfügbar machen, um auf ein natives `input` Element der `Input` Komponente zuzugreifen. Dies hilft bei der Beantwortung der Frage ["Wie kann ich auf das DOM-Element zugreifen?"](/getting-started/faq/#how-can-i-access-the-dom-element)

### Benennung der Eigenschaften

Der Name einer booleschen Eigenschaft sollte basierend auf dem **Standardwert** ausgewählt werden. Zum Beispiel ist das `disabled` Attribut für ein Eingabeelement, sofern angegeben, standardmäßig auf `true` gesetzt. Diese Wahl erlaubt die Kurzschreibweise:

```diff
-<Input enabled={false} />
+<Input disabled />
```

### Kontrollierte Komponenten

Der überwiegende Teil der kontrollierten Komponente wird über die `value` und `onChange` Eigenschaften gesteuert, jedoch werden die `open` / `onClose` / `onOpen` Kombination wird für den Anzeigezustand verwendet.

### boolean vs enum

Es gibt zwei Möglichkeiten, die API für die Variationen einer Komponente zu entwerfen: mit einem * Booleschen Wert*; oder mit einer *Aufzählung (enum)*. Nehmen wir zum Beispiel einen Button, die verschiedene Typen hat. Jede Option hat ihre Vor- und Nachteile:

- Option 1 *boolean*:
    
    ```tsx
    type Props = {
    contained: boolean;
    fab: boolean;
    };
    ```
    
    Diese API hat die Kurzschreibweise aktiviert: `<Button>`, `<Button contained />`, `<Button fab />`.

- Option 2 *enum*:
    
    ```tsx
    type Props = {
    variant: 'text' | 'contained' | 'fab';
    }
    ```
    
    Diese API ist ausführlicher: `<Button>`, `<Button variant="contained">`, `<Button variant="fab">`.
    
    Es verhindert jedoch, dass eine ungültige Kombination verwendet wird, begrenzt die Anzahl der offengelegten Eigenschaften, und kann neue Werte in Zukunft leicht unterstützen.

Die Komponenten der Material-UI verwenden eine Kombination der beiden Ansätze gemäß den folgenden Regeln:

- Ein *boolean* wird verwendet, wenn **2** Freiheitsgrade erforderlich sind.
- Eine *Aufzählung* wird verwendet, wenn **> 2** Freiheitsgrade erforderlich sind, oder wenn die Möglichkeit besteht, dass in Zukunft zusätzliche Freiheitsgrade erforderlich sind.

Zurück zum vorherigen Beispiel des Buttons; Da 3 Freiheitsgrade erforderlich sind, verwenden wir eine *Aufzählung*.

### Ref

Das `ref` Element wird an das Wurzelelement weitergeleitet. Das bedeutet, ohne das gerenderte Wurzelelement über die `component` Eigenschaft zu ändern, wird an das äußerste DOM-Element weitergeleitet, welche Komponente rendert. Wenn Sie eine andere Komponente über die `compnent` Eigenschaft wird der Ref stattdessen an diese Komponente angehängt.

## Glossar

- **host component**: ein DOM-Knotentype im Kontext von `react-dom`, z.B. ein `'div'`. Siehe auch [React Implementation Notes](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements).
- **host element**: in DOM-Knoten im Kontext von `react-dom` z.B. eine Instanz von `window.HTMLDivElement`.
- **outermost**: Die erste Komponente, wenn der Komponentenbaum von oben nach unten gelesen wird, dh die Breitensuche.
- ** Wurzelkomponente**: Die äußerste Komponente, die eine Hostkomponente darstellt.
- ** Wurzelelement**: Das äußerste Element, das eine Hostkomponente darstellt.