/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-console */
// Track bug on imported flow type: https://github.com/reactjs/react-docgen/issues/180

import fs from 'fs';
import path from 'path';
import * as reactDocgen from 'react-docgen';
import { generateMarkdown } from './generate-docs-markdown';

const ignoredItems = [
  'internal',
  'HiddenJs.js',
];
const componentRegex = /^([A-Z][a-z]+)+\.js/;
const docsDir = path.resolve(__dirname, '../docs/src/pages/component-api');
const srcDir = path.resolve(__dirname, '../src');

function ensureExists(pat, mask, cb) {
  fs.mkdir(pat, mask, (err) => {
    if (err) {
      if (err.code === 'EEXIST') cb(null); // ignore the error if the folder already exists
      else cb(err); // something else went wrong
    } else cb(null); // successfully created folder
  });
}

function buildDocs(componentPath) {
  fs.readFile(componentPath, 'utf8', (err, src) => {
    const relativePath = path.parse(path.relative(srcDir, componentPath));
    const outputDir = path.resolve(docsDir, relativePath.dir);

    let componentInfo;
    try {
      componentInfo = reactDocgen.parse(src);
    } catch (err2) {
      console.log('Error parsing src for', relativePath.name);
      console.log(err2);
      return;
    }

    let markdown;
    try {
      markdown = generateMarkdown(relativePath.name, componentInfo);
    } catch (err2) {
      console.log('Error generating markdown for', relativePath.name);
      console.log(err2);
      return;
    }

    ensureExists(outputDir, 0o744, (err2) => {
      if (err2) {
        console.log('Error creating directory', outputDir);
        return;
      }
      fs.writeFile(path.resolve(outputDir, `${relativePath.name}.md`), markdown, (err3) => {
        if (err3) {
          console.log('Error writing markdown file', path.format(relativePath));
        }
        console.log('Built markdown docs for', path.format(relativePath));
      });
    });
  });
}

function findComponents(dir) {
  fs.readdir(dir, (err, items) => {
    items.forEach((item) => {
      if (ignoredItems.includes(item)) {
        return;
      }

      const itemPath = path.resolve(dir, item);
      fs.stat(itemPath, (err2, stats) => {
        if (stats.isDirectory()) {
          return findComponents(itemPath);
        }
        if (!componentRegex.test(item)) {
          return false;
        }
        return buildDocs(itemPath);
      });
    });
  });
}

findComponents(srcDir);
