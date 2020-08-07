---
title: Composant React Box
---

# Box (Boite)

<p class="description">Le composant Box sert de composant de wrapper pour la plupart des besoins de l'utilitaire CSS.</p>

Le composant Box contiens [toutes les fonctions de style](/system/basics/#all-inclusive) qui sont exposées dans `@material-ui/system`. Il est créé en utilisant la fonction [`styled()`](/styles/api/#styled-style-function-component) de `@material-ui/core/styles`.

## Exemple

[La palette](/system/palette/) de style fonction.

## Remplacer les composants Material-UI

Le composant Box enveloppe votre composant. Il crée un nouvel élément DOM, un élément `<div>` par défaut qui peut être modifié avec la propriété du composant ``. Disons que vous voulez utiliser un `<span>` à la place :

```jsx
<Box component="span" m={1}>
  <Button />
</Box>
```

Cela fonctionne très bien quand les changements peuvent être isolés dans un nouvel élément DOM. Par exemple, vous pouvez changer la marge de cette façon.

Cependant, vous devez parfois cibler l'élément DOM sous-jacent. Par exemple, vous voulez changer la couleur du texte du bouton. Le composant Bouton définit sa propre couleur. L'héritage CSS n'aide pas. Pour contourner le problème, vous avez deux options :

1. Utilisez [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)

La composante Box a une propriété `cloner` pour activer l'utilisation de l'élément de clone méthode de React.

```jsx
<Box color="text.primary" clone>
  <Button />
</Box>
```

2. Utiliser les props de rendu

Les enfants de la boîte acceptent une fonction de rendu des props. Vous pouvez retirer le `className`.

```jsx
<Box color="text.primary">
  {props => <Button {...props} />}
</Box>
```

> ⚠ La spécificité CSS dépend de l'ordre d'importation. Si vous voulez la garantie que le style du composant enveloppé sera surchargé, vous devez importer le Box en dernier.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Name                                                    | Type                                                                                                              | Default                                 | Description                                                                                                            |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:---------------------------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br />&nbsp;func<br /></span>                                 |                                         | Fonction de rendu ou noeud de la boîte.                                                                                |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                               | <span class="prop-default">false</span> | Si `true`, la boîte recycle son élément DOM enfant. Il utilise `React.cloneElement` en interne.                        |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br />&nbsp;func&nbsp;&#124;<br />&nbsp;object<br /></span> | <span class="prop-default">'div'</span> | Le composant utilisé pour le noeud racine. Soit une chaîne de caractères pour utiliser un élément DOM ou un composant. |


Toute autre propriété fournie sera utilisée par [les fonctions de style](/system/basics/#all-inclusive) ou étendue à l'élément racine.