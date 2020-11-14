---
components: Link
---

# Enlaces

<p class="description">Los Enlaces permiten personalizar fácilmente los enlaces con los colores de su Tema y estilos de tipografía.</p>

## Enlaces simples

Los enlaces estan contruidos sobre el componente [Tipografia](/api/typography/). Puedes aprovechar sus propiedades.

{{"demo": "pages/components/links/Links.js"}}

Sin embargo, los Enlaces tienen propiedades por defecto distintas a las de las Tipografias:

- `color="primary"` as the link needs to stand out.
- `variant="inherit"` as the link will, most of the time, be used as a child of a Typography component.

## Seguridad

When you use `target="_blank"` with Links, it is [recommended](https://developers.google.com/web/tools/lighthouse/audits/noopener) to always set `rel="noopener"` or `rel="noreferrer"` when linking to third party content.

- `rel="noopener"` prevents the new page from being able to access the `window.opener` property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
- `rel="noreferrer"` has the same effect, but also prevents the *Referer* header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.

## Librería externa de routing

Un uso comun es realizar la navegacion solo en el cliente, sin realizar el viaje HTTP Ida-Vuelta al servidor. El componente `Link` contiene la propiedad para manejar este uso: `component`.

Here is an [integration example with react-router](/guides/composition/#link).

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- Al proporcionar el contenido del enlace, evitar descripciones genéricas como "haga clic aquí" o "ir a". En su lugar, utilice [descripciones específicas](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- Para una mejor experiencia de usuario, los enlaces deben sobresalir del texto en la página.
- Si un enlace no tiene un significativo href, [se debe representarse mediante un `<button>` elemento](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}