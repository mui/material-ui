#!/usr/bin/env node
const envinfo = require('envinfo');

envinfo.run(
  {
    npmPackages: `{${[
      '@material-ui/*',
      // Peer dependencies
      'react',
      'react-dom',
      // optional peer deps
      '@emotion/react',
      '@emotion/styled',
      'styled-components',
      '@types/react',
      // auxiliary libraries
      'typescript',
    ]}}`,
    Binaries: ['Node', 'Yarn', 'npm'],
    System: ['OS'],
    Browsers: ['Chrome', 'Firefox', 'Safari', 'Edge'],
  },
  {
    // `markdown: true` uses level 2 headings. It doesn't necessarily fit our issue template
    console: true,
    duplicates: true,
    // include transitive dependencies and important packages that are transitive dependencies (e.g. `jsdom` is usually a transitive dependency inside jest)
    fullTree: true,
    showNotFound: true,
  },
);
