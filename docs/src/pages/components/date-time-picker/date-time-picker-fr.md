---
title: Composant react Date Time Picker
components: DateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Sélecteurs de date et d'heure

<p class="description">Sélecteur de date et heure combiné.</p>

Ce composant combine les sélecteurs de date et des heures. Il permet à l'utilisateur de sélectionner à la fois la date et l'heure avec le même contrôle.

Notez que ce composant est le [ DatePicker](/components/date-picker/) et [TimePicker](/components/time-picker/) combiné, afin que toutes les propriétés (props) de ces composants puissent être passées au sélecteur DateTimePicker.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

Ce composant compatible avec les bibliothèques de gestion des dates de votre choix. Il supporte [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) et toute autre bibliothèque via une interface publique `dateAdapter`.

Veuillez installer l'une de ces bibliothèques et configurer le bon moteur de date en enveloppant votre racine (ou le niveau le plus élevé que vous souhaitez que les sélecteurs soient disponibles) avec `LocalizationProvider`:

```jsx
// ou @material-ui/lab/Adapter{Dayjs,Luxon,Moment} ou tout adaptateur date-io valide
importer AdapterDateFns depuis '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>. .</LocalizationProvider>
  );
}
```

## Utilisation de base

Permet de choisir la date et l'heure. Il y a 4 étapes disponibles (année, date, heure et minute), donc les onglets sont requis pour distinguer visuellement les étapes date/heure.

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## Réactivité

Le composant `DateTimePicker` est conçu et optimisé pour l'appareil sur lequel il tourne.

- Le composant `MobileDateTimePicker` fonctionne mieux pour les appareils tactiles et les petits écrans.
- Le composant `DesktopDateTimePicker` fonctionne mieux pour les périphériques de souris et les grands écrans.

Par défaut, le composant `DateTimePicker` affiche la version bureau si la requête média (media query) [`@media (pointeur : fin)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) correspondent. Ceci peut être personnalisé avec la propriété `desktopModeMediaQuery`.

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## Form props

Le composant du sélecteur de date peut être désactivé ou être en lecture seule.

{{"demo": "pages/components/date-time-picker/FormPropsDateTimePickers.js"}}

## Validation de la date et de l'heure

Il est possible de restreindre la sélection de la date et de l'heure de deux manières:

- en utilisant `minDateTime`/`maxDateTime` pour restreindre la sélection de temps à avant ou après un moment particulier dans le temps
- en utilisant `minTime`/`maxTime`, vous pouvez désactiver la sélection des heures avant ou après un certain temps chaque jour respectivement.

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## Mode statique

Il est possible de rendre n'importe quel sélecteur de date & heure en ligne (inline). This will enable building custom popover/modal containers.

{{"demo": "pages/components/date-time-picker/StaticDateTimePickerDemo.js", "bg": true}}

## Personnalisation

Voici quelques exemples de sélecteurs de date & heure fortement personnalisés :

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
