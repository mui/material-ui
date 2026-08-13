# docs-infra

<p class="description">Demos that exercise the docs-infra migration pipeline.</p>

## Source highlighting

This demo opts in with `"docsInfra": true`, so the Markdown loader
precomputes its source graph with docs-infra and the source below is highlighted
by docs-infra instead of Prism. Every other demo on this page still renders
through the legacy pipeline.

### Existing transform

{{"demo": "DemoInDocsDocsInfra.js", "defaultCodeOpen": false, "disableLiveEdit": true}}

### Docs infra transform

{{"demo": "DemoInDocsDocsInfra.js", "docsInfra": true, "defaultCodeOpen": false, "disableLiveEdit": true}}
