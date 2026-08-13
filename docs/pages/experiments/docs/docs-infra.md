# docs-infra

<p class="description">Demos that exercise the docs-infra migration pipeline.</p>

## Source highlighting

This demo is allowlisted in `demoPipelineAllowlist`, so the Markdown loader
precomputes its source graph with docs-infra and the source below is highlighted
by docs-infra instead of Prism. Demos without an allowlist entry still render
through the legacy pipeline.

{{"demo": "DemoInDocsDocsInfra.js", "defaultCodeOpen": true, "disableLiveEdit": true}}
