#!/usr/bin/env node
const envinfo = require('envinfo');

const json = process.argv.indexOf('--json') !== -1;
envinfo
  .run(
    {
      npmPackages: `{${[
        '@mui/*',
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
      json,
      duplicates: true,
      // include transitive dependencies and important packages that are transitive dependencies (e.g. `jsdom` is usually a transitive dependency inside jest)
      fullTree: true,
      showNotFound: true,
    },
  )
  .then((output) => {
    // eslint-disable-next-line no-console
    console.log(output);
  });
