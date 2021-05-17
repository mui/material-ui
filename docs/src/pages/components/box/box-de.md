---
title: React Box component
githubLabel: 'component: Box'
---

# Box

<p class="description">Die Box-Komponente dient als Wrapper-Komponente für die meisten Anforderungen des CSS-Dienstprogramms.</p>

Die Box-Komponente kombiniert [alle Stilfunktionen](/system/basics/#all-inclusive), die in `@material-ui/system` verfügbar sind. Die Box-Komponente kombiniert [alle Stilfunktionen](/system/basics/#all-inclusive), die in `@material-ui/system` verfügbar sind.

Die Style-Funktion der [Palette](/system/palette/).

## Beispiel

Die Style-Funktion der [Palette](/system/palette/).

## The sx prop

All system properties are available via the `sx` prop. In addition, this prop allows you to specify any other CSS rules you may need. Here's an example of how you can use it:

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Material-UI-Komponenten überschreiben

Die Box-Komponente umschließt Ihre Komponente. It creates a new DOM element, a `<div>` by default that can be changed with the `component` prop. Angenommen, stattdessen soll ein `<span>`-Element verwendet werden:

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

Dies funktioniert hervorragend, wenn die Änderungen für ein neues DOM-Element isoliert werden können. Zum Beispiel kann der Rand auf diese Weise verändert werden.

Manchmal müssen Sie jedoch das zugrunde liegende DOM-Element als Ziel festlegen. For instance, you want to change the border of the Button. The Button component defines its own styles. CSS-Vererbung hilft hier nicht. Um das Problem zu umgehen, haben Sie zwei Möglichkeiten:

1. Verwenden Sie [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

Die Box-Komponente verfügt über eine `clone`-Eigenschaft, um die Verwendung der Klonelementmethode von React zu ermöglichen.

{{"demo": "pages/components/box/BoxClone.js", "defaultCodeOpen": true }}

2. Verwenden Sie Render Eigenschaften

Die Box-Kinder akzeptieren eine Render-Funktion als Eigenschaft. Sie können den `className` herausziehen.

{{"demo": "pages/components/box/BoxRenderProps.js", "defaultCodeOpen": true }}

> ⚠️ Die CSS-Spezifität hängt von der Importreihenfolge ab. Wenn Sie garantieren wollen, dass der Stil der wrapped Komponente überschrieben wird, müssen Sie die Box zuletzt importieren.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                                    | Typ                                                                                                                           | Standard                                | Beschreibung                                                                                                               |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:-------------------------------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br></span>                                     |                                         | Box Render-Funktion oder Knoten.                                                                                           |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                                           | <span class="prop-default">false</span> | Wenn `true`, werden die untergeordnete DOM-Elemente der Box recycelt. Es verwendet intern `React.cloneElement`.            |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | Die für den Wurzelknoten verwendete Komponente. Entweder ein String, um ein DOM-Element zu verwenden oder eine Komponente. |
| <span class="prop-name">sx</span>                       | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Accepts all system properties, as well as any valid CSS properties.                                                        |
