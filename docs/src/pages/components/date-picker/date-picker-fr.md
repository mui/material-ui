---
title: Composent React Date Picker (Sélecteur de date)
components: DatePicker, PickersDay
githubLabel: 'component: DatePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Sélecteur de date (Date Picker)

<p class="description">Ce composent permettent à l'utilisateur de sélectionner une date</p>

Ce composent permettent à l'utilisateur de sélectionner une date Les sélecteurs de dates sont affichés avec :

- Fenêtre de dialogue sur un mobile
- Liste déroulante sur un écran de bureau

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

Ce composant compatible avec les bibliothèques de gestion des dates de votre choix. Il supporte [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) et toute autre bibliothèque via une interface publique `dateAdapter`.

Veuillez installer l'une de ces bibliothèques et configurer le bon moteur de date en enveloppant votre racine (ou le niveau le plus élevé que vous souhaitez que les sélecteurs soient disponibles) avec `LocalizationProvider`:

```jsx
// ou @material-ui/lab/Adapter{DayJS,Luxon,Moment} ou tout adaptateur date-io valide
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Utilisation de base

Le sélecteur de dates est affiché comme une boîte de dialogue modale sur mobile, et une zone de texte avec une fenêtre pop-up sur l'écran de bureau.

{{"demo": "pages/components/date-picker/BasicDatePicker.js"}}

## Mode statique

It's possible to render any picker without the modal/popover and text field. Cela peut être utile lors que vous faite votre propre popover/modal.

{{"demo": "pages/components/date-picker/StaticDatePickerDemo.js", "bg": true}}

## Réactivité

Le composant du sélecteur de dates est conçu et optimisé pour le périphérique sur lequel il s'exécute.

- Le composant `MobileDatePicker` fonctionne mieux pour les appareils tactiles et les petits écrans.
- Le composant `DesktopDatePicker` fonctionne mieux pour les appareils avec souris et les grands écrans.

Par défaut, le composant `DatePicker` affiche la version bureau si la média query [`@media (pointeur : fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) correspond. Ceci peut être personnalisé avec la propriété `desktopModeMediaQuery`.

{{"demo": "pages/components/date-picker/ResponsiveDatePickers.js"}}

## Form props

The date picker component can be disabled or read-only.

{{"demo": "pages/components/date-picker/InternalPickers.js"}}

## Localisation

Utilisez la propriété `LocalizationProvider` pour modifier la locale du moteur de date qui est utilisée pour afficher le sélecteur de date. Voici un exemple de changement de locale pour l'adaptateur `date-fns`:

{{"demo": "pages/components/date-picker/LocalizedDatePicker.js"}}

## Système de calendrier Jalali

Installez `date-fns-jalali` et utilisez l'adaptateur `@date-io/date-fns-jalali` pour supporter le [calendrier Jalali](https://en.wikipedia.org/wiki/Jalali_calendar).

{{"demo": "pages/components/date-picker/JalaliDatePicker.js"}}

## Affichages des Models

Il est possible de combiner les vues de la sélection `année`, `mois`, et `date`. Les vues apparaîtront dans l'ordre dans lequel elles sont incluses dans le tableau `views`.

{{"demo": "pages/components/date-picker/ViewsDatePicker.js"}}

## L'orientation d'affichage

Pour faciliter l'utilisation, le sélecteur de dates changera automatiquement la mise en page entre le portrait et le paysage en s'abonnant au changement de `window.orientation`. Vous pouvez forcer une mise en page spécifique en utilisant la propriété `orientation`.

{{"demo": "pages/components/date-picker/StaticDatePickerLandscape.js", "bg": true}}

## Sous-composants

Certains sous-composants de niveau inférieur (`CalendarPicker`, `MonthPicker`, et `YearPicker`) sont également exportés. Ceux-ci sont affichés sans wrapper ou logique externe (masque, formatage et validation des valeurs de date, etc.).

{{"demo": "pages/components/date-picker/SubComponentsPickers.js"}}

## Composant d'Input personnalisé

Vous pouvez personnaliser le rendu de l'input avec la propriété `renderInput`. Assurez-vous d'étendre `ref` et `inputProps` correctement au composant d'input personnalisé.

{{"demo": "pages/components/date-picker/CustomInput.js"}}

## Affichage du jour personnalisé

Les jours affichés sont personnalisables avec la propriété type fonction `renderDay`. Vous pouvez profiter du composant [PickersDay](/api/pickers-day/).

{{"demo": "pages/components/date-picker/CustomDay.js"}}

## Données dynamiques

Parfois, il peut être nécessaire d'afficher des informations supplémentaires directement dans le calendrier. Voici un exemple de pré-affichage des données côté serveur en utilisant les propriétés `onMonthChange`, `loading`, et `renderDay`.

{{"demo": "pages/components/date-picker/ServerRequestDatePicker.js"}}

## Helper text

Vous pouvez afficher un texte d'aide avec le format de date accepté.

{{"demo": "pages/components/date-picker/HelperText.js"}}
