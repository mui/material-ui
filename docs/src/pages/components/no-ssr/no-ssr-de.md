---
title: NoSSR React-Komponente
components: NoSsr
---

# NoSSR

<p class="description">NoSSR entfernt absichtlich Komponenten aus dem Server Side Rendering (SSR) Theme.</p>

Diese Komponente kann in verschiedenen Situationen nützlich sein:

- Notluke für gebrochene Abhängigkeiten, die SSR nicht unterstützen.
- Verbessern Sie die Zeit bis zum ersten Rednern beim Client, indem Sie nur über der Klappe rendern.
- Reduzieren Sie die Renderzeit auf dem Server.
- Bei zu starker Serverlast können Sie die Dienstverschlechterung aktivieren.
- Verbessern Sie die Zeit bis zur Interaktion, indem Sie nur das ausgeben, was wichtig ist (mit der `defer` Eigenschaft).

## Aufschiebung der Client-Seite

{{"demo": "pages/components/no-ssr/SimpleNoSsr.js"}}

## Rahmen Verzögerung

Die Hauptaufgabe der NoSSR Komponente ist das **Verzögerte Rendern**. Wie in der vorherigen Demo veranschaulicht, können Sie damit das Rendern vom Server auf den Client verschieben.

Sie können es aber auch verwenden, um das Rendern im Client selbst zu verschieben. Sie können **einen Frame** mit der `defer` Eigenschaft warten, um die Kinder zu erzeugen. React macht [2 commits](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) anstatt 1.

{{"demo": "pages/components/no-ssr/FrameDeferring.js"}}