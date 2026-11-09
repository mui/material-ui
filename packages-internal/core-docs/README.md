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

Transpile core-docs for its Next.js module imports.
DocSearch also needs transpilation for its CommonJS autocomplete dependency during SSR.

```js
export default {
  transpilePackages: ['@mui/internal-core-docs', '@docsearch/react'],
};
```
