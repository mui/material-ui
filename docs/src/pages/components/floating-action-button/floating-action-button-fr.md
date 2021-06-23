---
title: Composant React Fab
components: Fab
---

# Bouton d'action flottant

<p class="description">Un bouton d'action flottant (FAB) effectue l'action principale, ou la plus courante, sur un écran.</p>

## Bouton d'action flottant

Un [bouton d'action flottant](https://material.io/design/components/buttons-floating-action-button.html) apparaît devant tout le contenu de l'écran, généralement sous forme circulaire avec une icône au centre. Il existe deux types de FAB: régulier et étendu.

Utilisez un FAB uniquement si c'est le moyen le plus approprié pour présenter l'action principale d'un écran.

Un seul bouton d’action flottante est recommandé par écran pour représenter l’action la plus courante.

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Taille

Utilisez la propriété `size` pour de plus grands ou plus petits boutons d'action flottants.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

## Animation

Le bouton d'action flottant s'anime à l'écran comme un morceau de matériau en expansion, par défaut.

Un bouton d'action flottant qui s'étend sur plusieurs écrans latéraux (tels que des écrans à onglets) devrait disparaître brièvement, puis réapparaître si son action change.

La transition Zoom peut être utilisée pour y parvenir. Notez que, comme les animations sortantes et entrantes sont déclenchées simultanément, nous utilisons `enterDelay` pour permettre à l'animation du bouton d'action flottant sortant de se terminer avant l'entrée de la nouvelle.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
