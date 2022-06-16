#!/usr/bin/env node
const console = require('console');
const envinfo = require('envinfo');
const clipboard = require('clipboardy');

const json = process.argv.indexOf('--json') !== -1;
const skipClipboard = process.argv.indexOf('--skipClipboard') !== -1;

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
    console.log(output);

    if (!skipClipboard) {
      try {
        // write to OS clipboard
        clipboard.writeSync(output);
        console.log('\x1b[33m%s\x1b[0m', 'Output copied to clipboard', '\x1b[0m');
      } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', 'Failed to copy to clipboard', '\x1b[0m');
        console.log(e);
      }
    }
  });
