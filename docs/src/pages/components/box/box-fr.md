---
title: React Box component
githubLabel: 'component: Box'
---

# Box (Boite)

<p class="description">Le composant Box sert de composant de wrapper pour la plupart des besoins de l'utilitaire CSS.</p>

Le composant Box contiens [toutes les fonctions de style](/system/basics/#all-inclusive) qui sont exposées dans `@material-ui/system`. It's created using the `experimentalStyled()` function of `@material-ui/core/styles`.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Exemple

[La palette](/system/palette/) de style fonction.

## The sx prop

All system properties are available via the `sx` prop. In addition, this prop allows you to specify any other CSS rules you may need. Here's an example of how you can use it:

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Remplacer les composants Material-UI

Le composant Box enveloppe votre composant. It creates a new DOM element, a `<div>` by default that can be changed with the `component` property. Disons que vous voulez utiliser un `<span>` à la place :

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

Cela fonctionne très bien quand les changements peuvent être isolés dans un nouvel élément DOM. Par exemple, vous pouvez changer la marge de cette façon.

Cependant, vous devez parfois cibler l'élément DOM sous-jacent. For instance, you want to change the border of the Button. The Button component defines its own styles. L'héritage CSS n'aide pas. Pour contourner le problème, vous avez deux options :

1. Utilisez [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

The Box component has a `clone` property to enable the usage of the clone element method of React.

{{"demo": "pages/components/box/BoxClone.js", "defaultCodeOpen": true }}

2. Utiliser les props de rendu

Les enfants de la boîte acceptent une fonction de rendu des props. Vous pouvez retirer le `className`.

{{"demo": "pages/components/box/BoxRenderProps.js", "defaultCodeOpen": true }}

> ⚠ La spécificité CSS dépend de l'ordre d'importation. Si vous voulez la garantie que le style du composant enveloppé sera surchargé, vous devez importer le Box en dernier.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Nom                                                     | Type                                                                                                                          | Défaut                                  | Description                                                                                                            |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:---------------------------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br></span>                                     |                                         | Fonction de rendu ou noeud de la boîte.                                                                                |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                                           | <span class="prop-default">false</span> | Si `true`, la boîte recycle son élément DOM enfant. Il utilise `React.cloneElement` en interne.                        |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | Le composant utilisé pour le noeud racine. Soit une chaîne de caractères pour utiliser un élément DOM ou un composant. |
| <span class="prop-name">sx</span>                       | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Accepts all system properties, as well as any valid CSS properties.                                                    |
