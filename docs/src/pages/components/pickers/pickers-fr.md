---
title: Date picker, Time picker React components
components: TextField
---

# Date / Time pickers

<p class="description">Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.</p>

- Sur mobile, les sélecteurs conviennent mieux à l’affichage dans la boîte de dialogue de confirmation.
- Pour un affichage en ligne, par exemple sur un formulaire, envisagez d'utiliser des contrôles compacts tels que des boutons déroulants segmentés.

## @material-ui/pickers

![stars](https://img.shields.io/github/stars/mui-org/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/@material-ui/pickers.svg)

[@material-ui/pickers](https://material-ui-pickers.dev/) provides date picker and time picker controls.

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Native pickers

⚠️ La prise en charge des sélecteurs natifs par les navigateurs [n'est pas parfaite](https://caniuse.com/#feat=input-datetime). Have a look at [@material-ui/pickers](https://material-ui-pickers.dev/) for a richer solution.

### Datepickers

Exemple de sélecteur de date natif avec `type = "date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Sélecteurs de date & temps

Exemple de sélecteur de date natif avec `type = "datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Sélecteurs de temps

Exemple de sélecteur de temps natif avec `type = "time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}