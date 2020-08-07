---
title: Détecter les clics en dehors du composant React
components: ClickAwayListener
---

# Click Away Listener

<p class="description">Détecte si un événement de clic s'est produit en dehors d'un élément. Il écoute les clics qui se produisent quelque part dans le document.</p>

- 📦 [1,5 ko gzippé](/size-snapshot).
- ⚛️ Les portails d'assistance

## Exemple

Par exemple, si vous avez besoin de cacher un menu déroulant lorsque des personnes cliquent n'importe où sur votre page :

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Notez que le composant n'accepte qu'un seul élément enfant. Vous pouvez trouver une démo plus avancée dans la section de la documentation du menu [](/components/menus/#menulist-composition).

## Portal

La démo suivante utilise [`Portal`](/components/portal/) pour rendre le menu déroulant dans un nouveau « sous-arbre » en dehors de la hiérarchie DOM actuelle.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Arête principale

Par défaut, le composant répond aux événements finaux (cliquez sur + touche fin). Cependant, vous pouvez le configurer pour répondre aux événements principaux (souris vers le bas + démarrage tactile).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠ Dans ce mode, seules les interactions sur la barre de défilement du document sont ignorées.