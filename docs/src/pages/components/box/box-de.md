---
title: Box React Komponente
---

# Box

<p class="description">Die Box-Komponente dient als Wrapper-Komponente für die meisten Anforderungen des CSS-Dienstprogramms.</p>

Die Box-Komponenten packt [alle Stilfunktionen](/system/basics/#all-inclusive), die in `@material-ui/system` verfügbar sind. It's created using the [`styled()`](/styles/api/#styled-style-function-component) function of `@material-ui/core/styles`.

## Beispiel

Die Style-Funktion der [Palette](/system/palette/).

## Material-UI-Komponenten überschreiben

Die Box-Komponente umschließt Ihre Komponente. Es erstellt ein neues DOM-Element, standardmäßig `<div>`, das mit der Eigenschaft `component` geändert werden kann. Angenommen, Sie möchten stattdessen ein `<span>` verwenden:

```jsx
<Box component="span" m={1}>
  <Button />
</Box>
```

Dies funktioniert hervorragend, wenn die Änderungen für ein neues DOM-Element isoliert werden können. Zum Beispiel können Sie den Rand auf diese Weise ändern.

Manchmal müssen Sie jedoch das zugrunde liegende DOM-Element als Ziel festlegen. Sie möchten beispielsweise die Textfarbe des Buttons ändern. Die Button-Komponente definiert ihre eigene Farbe. CSS-Vererbung hilft hier nicht. Um das Problem zu umgehen, haben Sie zwei Möglichkeiten:

1. Verwenden Sie [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

Die Box-Komponente verfügt über eine `clone`-Eigenschaft, um die Verwendung der Klonelementmethode von React zu ermöglichen.

```jsx
<Box color="text.primary" clone>
  <Button />
</Box>
```

2. Verwenden Sie Render Eigenschaften

Die Box-Kinder akzeptieren eine Render-Funktion als Eigenschaft. Sie können den `className` herausziehen.

```jsx
<Box color="text.primary">
  {props => <Button {...props} />}
</Box>
```

> ⚠️ Die CSS-Spezifität hängt von der Importreihenfolge ab. If you want the guarantee that the wrapped component's style will be overridden, you need to import the Box last.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                                    | Typ                                                                                                               | Standard                                | Beschreibung                                                                                                               |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:-------------------------------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br />&nbsp;func<br /></span>                                 |                                         | Box Render-Funktion oder Knoten.                                                                                           |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                               | <span class="prop-default">false</span> | Wenn `true`, werden die untergeordnete DOM-Elemente der Box recycelt. Es verwendet intern `React.cloneElement`.            |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br />&nbsp;func&nbsp;&#124;<br />&nbsp;object<br /></span> | <span class="prop-default">'div'</span> | Die für den Wurzelknoten verwendete Komponente. Entweder ein String, um ein DOM-Element zu verwenden oder eine Komponente. |


Alle anderen angegebenen Eigenschaften werden von [der Stilfunktionen](/system/basics/#all-inclusive) benutzt oder auf das Wurzelelement verteilt.