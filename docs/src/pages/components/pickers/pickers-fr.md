---
title: Composant React pour les sélecteurs de date ou d'heure
components: TextField
---

# Les sélecteurs

<p class="description">Les sélecteurs constituent un moyen simple de sélectionner une valeur unique dans un ensemble prédéterminé.</p>

- Sur mobile, les sélecteurs conviennent mieux à l’affichage dans la boîte de dialogue de confirmation.
- Pour un affichage en ligne, par exemple sur un formulaire, envisagez d'utiliser des contrôles compacts tels que des boutons déroulants segmentés.

## Native pickers

⚠️ La prise en charge des sélecteurs natifs par les navigateurs [n'est pas parfaite](https://caniuse.com/#feat=input-datetime). Have a look at the [complementary projects](#complementary-projects) for a richer solution.

### Sélecteurs de date

A native date picker example with `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Sélecteurs de date & temps

Exemple de sélecteur de date natif avec `type = "datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Sélecteurs de temps

Exemple de sélecteur de temps natif avec `type = "time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des avantages suivants.

### @material-ui/pickers

![stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date and time controls that follow the Material Design spec.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}