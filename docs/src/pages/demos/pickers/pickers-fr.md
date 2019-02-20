---
title: Composant React pour les sélecteurs de date ou d'heure
components: TextField
---
# Les sélecteurs (Pickers)

<p class="description">Les sélecteurs constituent un moyen simple de sélectionner une valeur unique dans un ensemble prédéterminé.</p>

- Sur mobile, les sélecteurs conviennent mieux à l’affichage dans la boîte de dialogue de confirmation.
- Pour un affichage en ligne, par exemple sur un formulaire, envisagez d'utiliser des contrôles compacts tels que des boutons déroulants segmentés.

#### Avis

Nous nous replions sur les **contrôles natifs** du navigateur.

⚠️ La prise en charge des sélecteurs natifs par les navigateurs [n'est pas parfaite](https://caniuse.com/#feat=input-datetime). Consultez les [projets complémentaires](#complementary-projects) pour des solutions plus riches.

## Sélecteurs de date

Exemple de sélecteur de date natif avec `type = "date"`, il peut également être utilisé comme calendrier.

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## Sélecteurs de date & temps

Exemple de sélecteur de date natif avec `type = "datetime-local"`.

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

## Sélecteurs de temps

Exemple de sélecteur de temps natif avec `type = "time"`.

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des avantages suivants.

### material-ui-pickers

![stars](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[Material-ui-pickers](https://material-ui-pickers.firebaseapp.com/) fournit des sélecteurs de date et d'heure conformes à la spécification Material Design.

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### Autres

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker): time pickers.
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers): date pickers and time pickers.