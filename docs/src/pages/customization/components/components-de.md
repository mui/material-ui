# Customizing components

<p class="description">You can easily customize the appearance of a Material-UI component.</p>

As components can be used in different contexts, the are several approaches to this. Going from the narrowest use-case to the broadest, these are:

1. [Spezifische Abweichung für eine einmalige Situation](#1-specific-variation-for-a-one-time-situation)
2. [Dynamische Variation für eine einmalige Situation](#2-dynamic-variation-for-a-one-time-situation)
3. [ Spezifische Variation einer Komponente ](#3-specific-variation-of-a-component) wiederverwendet in verschiedenen Kontexten
4. [ Variationen des Materialdesigns ](#4-material-design-variations) wie mit der Button-Komponente
5. [Global theme variation](#5-global-theme-variation)

## 1. Spezifische Abweichung für eine einmalige Situation

Möglicherweise müssen Sie den Stil einer Komponente für eine bestimmte Implementierung ändern, für die Sie die folgenden Lösungen zur Verfügung haben:

### Overriding styles with class names

Die erste Möglichkeit, den Stil einer Komponente zu überschreiben, besteht in der Verwendung von **Klassennamen**. Jede Komponente stellt eine `Klassennamen` Eigenschaft bereit, die immer auf das unterste Element angewendet wird.

In diesem Beispiel wird die [`withStyles()`](/styles/basics/#higher-order-component-api) höherer Ordnung Komponente verwendet um benutzerdefinierte Stile in den DOM einzufügen und den Klassennamen mittels ihre `classes` Eigenschaftan die ` ClassNames` Komponente zu übergeben. Sie können sich [für jede andere Styling-Lösung](/guides/interoperability/) entscheiden oder sogar Standard CSS benutzen, um die Stile zu schaffen. Stellen Sie aber sicher, die [CSS - Injektionsreihenfolge](/styles/advanced/#css-injection-order) zu prüfen, da das CSS, welches durch die Material UI-Komponente in den DOM injiziert wird, die höchste Spezifität hat, da der `<link>` am Ende des `<4 />` injiziert wird, um sicherzustellen, dass die Komponenten immer richtig gerendert werden.

{{"demo": "pages/customization/components/ClassNames.js"}}

### Overriding styles with classes

Wenn die ` Klassennamen`-Eigenschaft nicht genug ist, und Sie auf tiefere Elemente zugreifen müssen, können Sie die ` classes`-Eigenschaft nutzen, um alle von Material-UI für eine bestimmte Komponente eingefügtes CSS anzupassen. Die Liste der Klassen für jede Komponente ist in der **Komponenten-API** Sektion dokumentiert. Zum Beispiel können Sie sich die [ Button CSS-API](/api/button/#css) anschauen. Alternativ können Sie die [Browser-Entwicklungswerkzeuge](#using-the-dev-tools) verwenden.

In diesem Beispiel wird auch `withStyles()` verwendet (siehe oben), aber hier verwendet `ClassesNesting` die `Button` `classes` Eigenschaft, welche ein Objekt liefert, das die **Namen der zu überschreibenden Klassen** (Stilregeln) auf die anzuwendenden **CSS-Klassennamen ** (Werte) abbildet. Die vorhandenen Klassen der Komponente werden weiterhin eingefügt. Daher müssen nur die spezifischen Styles gesetzt werden die Sie hinzufügen oder überschreiben möchten.

Beachten Sie, dass zusätzlich zum Buttonstil die Großschreibung der Buttonbeschriftung geändert wurde:

{{"demo": "pages/customization/components/ClassesNesting.js"}}

### Verwenden der Dev-Tools

Mit den Browser-Entwicklertools können Sie viel Zeit sparen. Die Klassennamen der Material-UI im Entwicklungsmodus [folgen einem einfachen Muster](/styles/advanced/#class-names): `Mui[Komponentenname]-[Stilregelname]-[UUID]`.

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

{{"demo": "pages/customization/components/ClassesShorthand.js"}}

### Pseudo-classes

The components special states, like *hover*, *focus*, *disabled* and *selected*, are styled with a higher CSS specificity. [Spezifität ist ein Gewicht](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) das für eine gegebene CSS-Deklaration gilt.

In order to override the components special states, **you need to increase specificity**. Hier ist ein Beispiel mit dem *disable* Zustand und einer Button Komponente mittels einer **pseudo-class** (`:disabled`):

```css
.Button {
  color: black;
}
.Button:disabled { /* We increase the specificity */
  color: white;
}
```

```jsx
<Button disabled className="Button">
```

Manchmal können Sie keine **Pseudoklasse** verwenden, da der Zustand nicht in der Plattform existiert. Nehmen wir die Menüpunkt Komponente und den *selected* Zustand als Beispiel. Aside from accessing nested elements, the `classes` property can be used to customize the special states of Material-UI components:

```css
.MenuItem {
  color: black;
}
.MenuItem.selected { /* We increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MenuItem', selected: 'selected' }}>
```

#### Warum muss ich die Spezifität erhöhen, um einen Komponentenzustand außer Kraft zu setzen?

Die CSS-Spezifikation bewirkt, dass die Pseudoklassen die Spezifität erhöhen. For consistency, Material-UI increases the specificity of its custom pseudo-classes. This has one important advantage, it allows you to cherry-pick the state you want to customize.

#### Can I use a different API that requires fewer boilerplate?

Instead of providing values to the `classes` prop API, you can rely on [the global class names](/styles/advanced/#with-material-ui-core) generated by Material-UI. It implements all these custom pseudo-classes:

| classes key  | Global class name |
|:------------ |:----------------- |
| checked      | Mui-checked       |
| disabled     | Mui-disabled      |
| error        | Mui-error         |
| focused      | Mui-focused       |
| focusVisible | Mui-focusVisible  |
| required     | Mui-required      |
| expanded     | Mui-expanded      |
| selected     | Mui-selected      |

```css
.MenuItem {
  color: black;
}
.MenuItem.Mui-selected { /* We increase the specificity */
  color: blue;
}
```

```jsx
<MenuItem selected className="MenuItem">
```

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

{{"demo": "pages/customization/components/ClassesState.js"}}

### Overriding with inline-styles

Die zweite Möglichkeit, den Stil einer Komponente zu überschreiben, ist die Verwendung des **Inline-Stils** Ansatzes. Jede Komponente bietet eine `style` Eigenschaft. Diese Eigenschaft werden immer auf das unterste Element angewendet.

Sie müssen sich keine Gedanken über die CSS-Spezifität machen, da der Inline-Stil Vorrang vor dem regulären CSS hat.

{{"demo": "pages/customization/components/InlineStyle.js"}}

[Wann sollte ich Inline-Styles und wann Klassen verwenden?](/getting-started/faq/#when-should-i-use-inline-style-vs-classes)

## 2. Dynamische Variation für eine einmalige Situation

You have learned how to override the style of a Material-UI component in the previous section. Nun wollen wir mal sehen, wie wir diese Überschreibungen dynamisch machen können. Here are five alternatives; each has it's pros and cons.

### Dynamisches CSS

{{"demo": "pages/customization/components/DynamicCSS.js"}}

### Klassenname Branch

{{"demo": "pages/customization/components/DynamicClassName.js"}}

### CSS-Variablen

{{"demo": "pages/customization/components/DynamicCSSVariables.js"}}

### Inline-styles

{{"demo": "pages/customization/components/DynamicInlineStyle.js"}}

### Verschachtelung des Themes

{{"demo": "pages/customization/components/DynamicThemeNesting.js"}}

## 3. Spezifische Variation einer Komponente

Möglicherweise müssen Sie eine Variation einer Komponente erstellen und in verschiedenen Kontexten verwenden, beispielsweise auf einer farbigen Button auf Ihrer Produktseite. Allerdings möchten Sie wahrscheinlich, dass Ihr Code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) bleibt.

Der beste Ansatz ist, Option 1 zu folgen und dann die Kompositionskraft von React zu nutzen, indem Sie Ihre benutzerdefinierte Komponente exportieren, um sie dort zu verwenden, wo Sie sie benötigen.

{{"demo": "pages/customization/components/Component.js", "hideEditButton": true}}

## 4. Material Design Variationen

In der Material Design-Spezifikation werden verschiedene Variationen bestimmter Komponenten dokumentiert, z. B. wie Buttons in unterschiedlichen Formen erscheinen:[text](https://material.io/design/components/buttons.html#text-button) (früher "flat"), [contained](https://material.io/design/components/buttons.html#contained-button) (früher "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) und mehr.

Die Material-UI versucht, alle diese Variationen zu implementieren. Bitte beachten Sie die [Unterstützte Komponente ](/getting-started/supported-components/) Dokumentation, um den aktuellen Status aller unterstützten Material Design-Komponenten herauszufinden.

## 5. Global theme variation

In order to promote consistency between components, and manage the user interface appearance as a whole, Material-UI provides a mechanism to apply global changes.

The demos of this section covers how to the change the button's font size.

### Theme-Variablen

You can adjusting the [theme configuration variables](/customization/themes/#theme-configuration-variables).

```jsx
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});
```

{{"demo": "pages/customization/components/ThemeVariables.js"}}

### Globales CSS überschreiben

Sie können auch alle Instanzen einer Komponente mit CSS anpassen. Wir legen [globale Klassennamen](/styles/advanced/#with-material-ui-core) offen, um das zu tun. Es ist sehr ähnlich, wie Sie Bootstrap anpassen würden.

```jsx
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-root': {
      fontSize: '1rem',
    },
  },
})(() => null);

// …

<GlobalCss />
```

{{"demo": "pages/customization/components/GlobalCssOverride.js", "iframe": true, "height": 70}}

### Globales Theme überschreiben

Wenn die Konfigurationsvariablen nicht ausreichen, können Sie die Vorteile der `overrides` Schlüssel des `Theme` verwenden, um potenziell jeden einzelnen von Material-UI in den DOM eingefügten Stil zu ändern. Weitere Informationen dazu finden Sie im [Themen](/customization/globals/#css) Abschnitt der Dokumentation.

```jsx
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```

{{"demo": "pages/customization/components/GlobalThemeOverride.js"}}