# Überschreibungen

<p class="description">Da Komponenten in verschiedenen Kontexten verwendet werden können, unterstützt Material-UI verschiedene Arten von Anpassungsanforderungen, die von den spezifischsten bis zu den allgemeinsten reichen.</p>

1. [Spezifische Abweichung für eine einmalige Situation](#1-specific-variation-for-a-one-time-situation)
2. [Dynamische Variation für eine einmalige Situation](#2-dynamic-variation-for-a-one-time-situation)
3. [ Spezifische Variation einer Komponente ](#3-specific-variation-of-a-component) wiederverwendet in verschiedenen Kontexten
4. [ Variationen des Materialdesigns ](#4-material-design-variations) wie mit der Button-Komponente
5. [Global theme variation](#5-global-theme-variation)

## 1. Spezifische Abweichung für eine einmalige Situation

Möglicherweise müssen Sie den Stil einer Komponente für eine bestimmte Implementierung ändern, für die Sie die folgenden Lösungen zur Verfügung haben:

### Überschreiben mit Klassennamen

Die erste Möglichkeit, den Stil einer Komponente zu überschreiben, besteht in der Verwendung von **Klassennamen**. Jede Komponente stellt eine `Klassennamen` Eigenschaft bereit, die immer auf das unterste Element angewendet wird.

In diesem Beispiel wird die [`withStyles()`](/css-in-js/basics/#higher-order-component-api) höherer Ordnung Komponente verwendet um benutzerdefinierte Stile in den DOM einzufügen und den Klassennamen mittels ihre `classes` Eigenschaftan die ` ClassNames` Komponente zu übergeben. Sie können sich [für jede andere Styling-Lösung](/guides/interoperability/) entscheiden oder sogar Standard CSS benutzen, um die Stile zu schaffen. Stellen Sie aber sicher, die [CSS - Injektionsreihenfolge](/css-in-js/advanced/#css-injection-order) zu prüfen, da das CSS, welches durch die Material UI-Komponente in den DOM injiziert wird, die höchste Spezifität hat, da der `<link>` am Ende des `<4 />` injiziert wird, um sicherzustellen, dass die Komponenten immer richtig gerendert werden.

{{"demo": "pages/customization/overrides/ClassNames.js"}}

### Überschreiben mit Klassen

Wenn die ` Klassennamen`-Eigenschaft nicht genug ist, und Sie auf tiefere Elemente zugreifen müssen, können Sie die ` classes`-Eigenschaft nutzen, um alle von Material-UI für eine bestimmte Komponente eingefügtes CSS anzupassen. Die Liste der Klassen für jede Komponente ist in der **Komponenten-API** Sektion dokumentiert. Zum Beispiel können Sie sich die [ Button CSS-API](/api/button/#css) anschauen. Alternativ können Sie die [Browser-Entwicklungswerkzeuge](#using-the-dev-tools) verwenden.

In diesem Beispiel wird auch `withStyles()` verwendet (siehe oben), aber hier verwendet `ClassesNesting` die `Button` `classes` Eigenschaft, welche ein Objekt liefert, das die **Namen der zu überschreibenden Klassen** (Stilregeln) auf die anzuwendenden **CSS-Klassennamen ** (Werte) abbildet. Die vorhandenen Klassen der Komponente werden weiterhin eingefügt. Daher müssen nur die spezifischen Styles gesetzt werden die Sie hinzufügen oder überschreiben möchten.

Beachten Sie, dass zusätzlich zum Buttonstil die Großschreibung der Buttonbeschriftung geändert wurde:

{{"demo": "pages/customization/overrides/ClassesNesting.js"}}

### Verwenden der Dev-Tools

Mit den Browser-Entwicklertools können Sie viel Zeit sparen. Die Klassennamen der Material-UI im Entwicklungsmodus [folgen einem einfachen Muster](/css-in-js/advanced/#class-names): `Mui[Komponentenname]-[Stilregelname]-[UUID]`.

Gehen wir zurück zur obigen Demo. Wie können Sie die Beschriftung des Buttons überschreiben?

![dev-tools](/static/images/customization/dev-tools.png)

Mit den Entwicklungswerkzeugen wissen Sie, dass Sie die `Button` Komponente und die `label` Stilregel als Ziel festlegen müssen:

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### Kurzform

Das obige Codebeispiel kann durch Verwendung **derselben CSS-API** als untergeordnete Komponente komprimiert werden. In diesem Beispiel injiziert die `withStyles()` höherer Ordnung Komponente eine `classes` Eigenschaft, die von der [`Button` Komponente](/api/button/#css) verwendet wird.

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/overrides/ClassesShorthand.js"}}

### Interne Zustände

Die internen Zustände der Komponenten, z. B. *hover*, *focus*, *disabled* und *selected*, sind mit einer höheren CSS-Spezifität gestaltet. [Spezifität ist ein Gewicht](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) das für eine gegebene CSS-Deklaration gilt.

Um die internen Zustände der Komponenten außer Kraft zu setzen, **müssen Sie die Spezifität erhöhen **. Hier ist ein Beispiel mit dem *disable* Zustand und einer Button Komponente mittels einer **pseudo-class** (`:disabled`):

```css
.MuiButton {
  color: black;
}
/ * Wir erhöhen die Spezifität * /
.MuiButton:disabled {
  color: white;
}
```

```jsx
<Button disabled className="MuiButton">
```

Manchmal können Sie keine **Pseudoklasse** verwenden, da der Zustand nicht in der Plattform existiert. Nehmen wir die Menüpunkt Komponente und den *selected* Zustand als Beispiel. Abgesehen vom Zugriff auf verschachtelte Elemente kann die `classes` Eigenschaft verwendet werden, um die internen Zustände von Material-UI-Komponenten anzupassen:

```css
.MuiMenuItem {
  color: black;
}
/* We increase the specificity */
.MuiMenuItem.selected {
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MuiMenuItem', selected: 'selected' }}>
```

#### Warum muss ich die Spezifität erhöhen, um einen Komponentenzustand außer Kraft zu setzen?

Die CSS-Spezifikation bewirkt, dass die Pseudoklassen die Spezifität erhöhen. Aus Gründen der Konsistenz erhöht die Material-UI die Spezifität ihrer benutzerdefinierten Zustände. Dies hat einen wichtigen Vorteil: Sie können den Zustand auswählen, den Sie anpassen möchten.

### Verwenden Sie `$ruleName` um eine lokale Regel innerhalb desselben Stylesheets referenzieren

Das [jss-nested](https://github.com/cssinjs/jss-nested) Plugin (standardmäßig verfügbar) macht es einfach, die Spezifität verbessern.

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

kompiliert zu:

```css
.root-x.disable-x {
  color: white;
}
```

⚠️ Sie müssen die beiden generierten Klassennamen (`root` & `disabled`) an das DOM übergeben, damit es funktioniert.

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  } }
>
```

{{"demo": "pages/customization/overrides/ClassesState.js"}}

### Überschreiben mit Inline-Style

Die zweite Möglichkeit, den Stil einer Komponente zu überschreiben, ist die Verwendung des **Inline-Stils** Ansatzes. Jede Komponente bietet eine `style` Eigenschaft. Diese Eigenschaft werden immer auf das unterste Element angewendet.

Sie müssen sich keine Gedanken über die CSS-Spezifität machen, da der Inline-Stil Vorrang vor dem regulären CSS hat.

{{"demo": "pages/customization/overrides/InlineStyle.js"}}

[Wann sollte ich Inline-Styles und wann Klassen verwenden?](/getting-started/faq/#when-should-i-use-inline-style-vs-classes)

## 2. Dynamische Variation für eine einmalige Situation

In den vorherigen Abschnitten haben Sie gelernt, wie Sie den Stil der Material-UI-Komponenten überschreiben. Nun wollen wir mal sehen, wie wir diese Überschreibungen dynamisch machen können. Wir zeigen 5 Alternativen, von denen jede ihre Vor- und Nachteile hat.

### Dynamisches CSS

{{"demo": "pages/customization/overrides/DynamicCSS.js"}}

### Klassenname Branch

{{"demo": "pages/customization/overrides/DynamicClassName.js"}}

### CSS-Variablen

{{"demo": "pages/customization/overrides/DynamicCSSVariables.js"}}

### Inline-Stil

{{"demo": "pages/customization/overrides/DynamicInlineStyle.js"}}

### Verschachtelung des Themes

{{"demo": "pages/customization/overrides/DynamicThemeNesting.js"}}

## 3. Spezifische Variation einer Komponente

Möglicherweise müssen Sie eine Variation einer Komponente erstellen und in verschiedenen Kontexten verwenden, beispielsweise auf einer farbigen Button auf Ihrer Produktseite. Allerdings möchten Sie wahrscheinlich, dass Ihr Code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) bleibt.

Der beste Ansatz ist, Option 1 zu folgen und dann die Kompositionskraft von React zu nutzen, indem Sie Ihre benutzerdefinierte Komponente exportieren, um sie dort zu verwenden, wo Sie sie benötigen.

{{"demo": "pages/customization/overrides/Component.js", "hideEditButton": true}}

## 4. Material Design Variationen

In der Material Design-Spezifikation werden verschiedene Variationen bestimmter Komponenten dokumentiert, z. B. wie Buttons in unterschiedlichen Formen erscheinen:[text](https://material.io/design/components/buttons.html#text-button) (früher "flat"), [contained](https://material.io/design/components/buttons.html#contained-button) (früher "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) und mehr.

Die Material-UI versucht, alle diese Variationen zu implementieren. Bitte beachten Sie die [Unterstützte Komponente ](/getting-started/supported-components/) Dokumentation, um den aktuellen Status aller unterstützten Material Design-Komponenten herauszufinden.

## 5. Global theme variation

### Theme-Variablen

Um die Konsistenz zwischen den Komponenten zu verbessern und das Erscheinungsbild der Benutzeroberfläche insgesamt zu verwalten, bietet die Material-UI einen Mechanismus zum Anwenden globaler Änderungen durch Anpassen der [Theme Konfigurationsvariablen](/customization/themes/#theme-configuration-variables) an.

### Globales CSS überschreiben

Sie können auch alle Instanzen einer Komponente mit CSS anpassen. We expose [global class names](/css-in-js/advanced/#with-material-ui-core) to do so. Es ist sehr ähnlich, wie Sie Bootstrap anpassen würden.

### Globales Theme überschreiben

You can take advantage of the `overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM. Weitere Informationen dazu finden Sie im [Themen](/customization/themes/#customizing-all-instances-of-a-component-type) Abschnitt der Dokumentation.