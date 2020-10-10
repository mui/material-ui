---
title: React Container component
components: Container (Conteneur)
githubLabel: 'component: Container'
---

# Container (Conteneur)

<p class="description">Le conteneur centralise votre contenu horizontalement. C'est l'élément de mise en page le plus basique.</p>

Bien que les conteneurs puissent être imbriqués, la plupart des mises en page ne nécessitent pas de conteneur imbriqué.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Fluid

A fluid container width is bounded by the `maxWidth` prop value.

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container maxWidth="sm">
```

## Fixe

If you prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport, you can set the `fixed` property. La largeur maximale correspond à la largeur minimale du point d'arrêt actuel.

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true, "defaultCodeOpen": false}}

```jsx
<Container fixed>
```
