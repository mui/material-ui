---
title: Composant React Diviseurs
components: Divider
---

# Dividers (Séparateurs)

<p class="description">Un diviseur est une ligne mince qui regroupe le contenu dans des listes et des mises en page.</p>

[Diviseurs](https://material.io/design/components/dividers.html) séparer le contenu en groupes clairs.

## Liste diviseurs

Le diviseur s'affiche par défaut sous la forme d'un `<hr>` . Vous pouvez économiser le rendu de cet élément DOM à l'aide de la propriété `divider` du composant `ListItem`.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## Spécification HTML5

Nous devons nous assurer que le `Divider` est rendu en tant que `li` pour correspondre à la spécification HTML5. Les exemples ci-dessous montrent deux manières d'y parvenir.

## Encart De Diviseurs

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Sous-En-Tête Diviseurs

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Diviseurs moyens

{{"demo": "pages/components/dividers/MiddleDividers.js"}}