---
title: React Container component
components: Container (Conteneur)
---

# Container (Conteneur)

<p class="description">Le conteneur centralise votre contenu horizontalement. C'est l'élément de mise en page le plus basique.</p>

Bien que les conteneurs puissent être imbriqués, la plupart des mises en page ne nécessitent pas de conteneur imbriqué.

## Fluid

Une largeur de conteneur fluide est limitée par la valeur de propriété `maxWidth`.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## Fixe

Si vous préférez concevoir pour un ensemble fixe de tailles au lieu d'essayer de s'adapter à une vue entièrement fluide, vous pouvez définir la propriété `fixe`. La largeur maximale correspond à la largeur minimale du point d'arrêt actuel.

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```