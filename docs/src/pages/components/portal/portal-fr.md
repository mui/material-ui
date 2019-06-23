---
title: Composant React Téléportation
components: Portal
---

# Téléportation (Portal)

<p class="description">Le composant de portail convertit ses enfants en un nouveau "sous-arbre" en dehors de la hiérarchie de composants actuelle.</p>

- 

Les enfants du composant Portal seront ajoutés au `container` fournit.

The component is used internally by the [`Modal`](/components/modal/) and [`Popper`](/components/popper/) components. Sur le serveur, le contenu ne sera pas rendu. You have to wait for the client side hydratation to see the children.

## Téléportation simple

{{"demo": "pages/components/portal/SimplePortal.js"}}