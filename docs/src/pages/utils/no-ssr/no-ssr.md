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

{{"demo": "pages/utils/no-ssr/SimpleNoSsr.js"}}
