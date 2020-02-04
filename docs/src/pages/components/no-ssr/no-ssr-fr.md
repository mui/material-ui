---
title: No SSR React component
components: NoSsr
---

# Pas de SSR

<p class="description">NoSsr supprime intentionnellement des composants du rendu côté serveur (SSR).</p>

Ce composant peut être utile dans diverses situations:

- Trappe d'évacuation pour les dépendances qui ne supportent pas le SSR.
- Améliorer le temps nécessaire pour peindre le client en rendant uniquement le rendu visible à l'écran.
- Réduire le temps de rendu sur le serveur.
- Si la charge du serveur est trop importante, vous pouvez activer une dégradation du service.
- Améliorez le temps d'interactivité en ne rendant que ce qui est important (avec la propriété `defer`).

## Report du côté client

{{"demo": "pages/components/no-ssr/SimpleNoSsr.js"}}

## Report d'une frame

In it's core, the NoSsr component purpose is to **defer rendering**. As it's illustrated in the previous demo, you can use it to defer the rendering from the server to the client.

But you can also use it to defer the rendering within the client itself. You can **wait a screen frame** with the `defer` property to render the children. React does [2 commits](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) instead of 1.

{{"demo": "pages/components/no-ssr/FrameDeferring.js"}}