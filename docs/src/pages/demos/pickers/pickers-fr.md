---
title: Date Picker, Time Picker React components
components: TextField
---
# Les sélecteurs (Pickers)

<p class="description">Les sélecteurs constituent un moyen simple de sélectionner une valeur unique dans un ensemble prédéterminé.</p>

- Sur mobile, les sélecteurs conviennent mieux à l’affichage dans la boîte de dialogue de confirmation.
- For inline display, such as on a form, consider using compact controls such as segmented dropdown buttons.

#### Avis

We are falling back to **native input controls**.

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime). Have a look at the [complementary projects](#complementary-projects) for richer solutions.

## Sélecteurs de date

A native date picker example with `type="date"`, it can be used as a calendar too.

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## Sélecteurs de date & temps

A native date & time picker example with `type="datetime-local"`.

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}

## Sélecteurs de temps

A native time picker example with `type="time"`.

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des avantages suivants.

### material-ui-pickers

![stars](https://img.shields.io/github/stars/dmtrKovalenko/material-ui-pickers.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-ui-pickers.svg)

[Material-ui-pickers](https://material-ui-pickers. firebaseapp. com/) fournit des contrôles de date et d'heure conformes à la spécification Material Design.

{{"demo": "pages/demos/pickers/MaterialUIPickers.js"}}

### Autres

- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker): time pickers.
- [material-ui-next-pickers](https://github.com/chingyawhao/material-ui-next-pickers): date pickers and time pickers.