---
title: No SSR React component
components: NoSsr
---

# No SSR

<p class="description">NoSsr purposely removes components from the subject of Server Side Rendering (SSR).</p>

This component can be useful in a variety of situations:

- Escape hatch for broken dependencies not supporting SSR.
- Improve the time-to-first paint on the client by only rendering above the fold.
- Reduce the rendering time on the server.
- Under too heavy server load, you can turn on service degradation.
- Improve the time-to-interactive by only rendering what's important (with the `defer` property).

## Client side deferring

{{"demo": "pages/components/no-ssr/SimpleNoSsr.js"}}

## Frame deferring

In it's core, the NoSsr component purpose is to **defer rendering**. As it's illustrated in the previous demo, you can use it to defer the rendering from the server to the client.

But you can also use it to defer the rendering within the client itself. You can **wait a screen frame** with the `defer` property to render the children. React does [2 commits](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) instead of 1.

{{"demo": "pages/components/no-ssr/FrameDeferring.js"}}