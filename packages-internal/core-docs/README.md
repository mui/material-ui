# @mui/internal-core-docs

This package hosts the documentation building blocks.

## Installation

Install the package in your project directory with:

<!-- #npm-tag-reference -->

```bash
npm install @mui/internal-core-docs@next
```

The docs has a peer dependency on the core components.
If you are not already using Material UI in your project, you can add it with:

<!-- #npm-tag-reference -->

```bash
npm install @mui/material@next
```

## Documentation

### Next.js consumers

Transpile the published package so Next.js can transform its dynamic imports and preload legacy demo chunks before hydration.
DocSearch also needs transpilation for its CommonJS autocomplete dependency during SSR.

With webpack, parse the published markdown renderer as `javascript/auto` so webpack resolves Next.js's generated `require.resolveWeak` calls.
Without this rule, the published ESM renderer can build and render on the server but fail during hydration.
The rule is needed even when a page contains no legacy demos.
Turbopack does not need this parser rule.

```js
export default {
  transpilePackages: ['@mui/internal-core-docs', '@docsearch/react'],
  webpack(config) {
    config.module.rules.push({
      test: /[/\\]@mui[/\\]internal-core-docs[/\\]MarkdownDocs[/\\]RichMarkdownElement\.js$/,
      type: 'javascript/auto',
    });
    return config;
  },
};
```

Legacy demo rendering remains enabled on the server.
On client-side navigation, uncached legacy demos can briefly render nothing until their shared chunk loads.
Cached or prefetched chunks can avoid this delay.
Migrated demos do not use this legacy renderer.
