---
title: Detect click outside React component
components: ClickAwayListener
---

# Click Away Listener

<p class="description">Detecta si ocurrió un evento de clic fuera de un elemento. Escucha los clics que se producen en algún lugar del documento.</p>

- 📦 [1.5 kB comprimido](/size-snapshot).
- ⚛️ Support portals

## Ejemplo

Por ejemplo, si necesita ocultar un menú desplegable cuando las personas hacen clic en cualquier otro lugar de su página:

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Ten en cuenta que el componente sólo acepta un elemento child. Puedes encontrar una demostración más avanzada en la [sección de documentación del Menú](/components/menus/#menulist-composition).

## Portal

La siguiente demostración utiliza [`Portal`](/components/portal/) para renderizar el desplegable en un nuevo "subárbol" fuera de la jerarquía del DOM actual.

{{"demo": "pages/components/click-away-listener/PortalClickAway.js"}}

## Eventos

Por defecto, el componente responde a los eventos clic y de toque final (click + touch end). Sin embargo, puedes configurarlo para que responda a los eventos de ratón presionado y toque inicial (mouse down + touch start).

{{"demo": "pages/components/click-away-listener/LeadingClickAway.js"}}

> ⚠️ En este modo, sólo se ignoran las interacciones con la barra de desplazamiento del documento.