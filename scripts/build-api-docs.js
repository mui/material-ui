/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import * as reactDocgen from '@nmarks/react-docgen';
import generateMarkdown from './generate-docs-markdown';

const componentRegex = /^([A-Z][a-z]+)+\.js/;
const docsDir = path.resolve(__dirname, '../docs/api');
const srcDir = path.resolve(__dirname, '../src');
findComponents(srcDir);

function findComponents(dir) {
  fs.readdir(dir, (err, items) => {
    items.forEach((item) => {
      if (item === 'internal') {
        return false;
      }
      const itemPath = path.resolve(dir, item);
      fs.stat(itemPath, (err, stats) => {
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

function buildDocs(componentPath) {
  fs.readFile(componentPath, 'utf8', (err, src) => {
    const relativePath = path.parse(path.relative(srcDir, componentPath));
    const outputDir = path.resolve(docsDir, relativePath.dir);

    let componentInfo;
    try {
      componentInfo = reactDocgen.parse(src);
    } catch (err) {
      console.log('Error parsing src for', relativePath.name);
      console.log(err);
      return false;
    }

    let markdown;
    try {
      markdown = generateMarkdown(relativePath.name, componentInfo);
    } catch (err) {
      console.log('Error generating markdown for', relativePath.name);
      console.log(err);
      return false;
    }

    ensureExists(outputDir, 0o744, function(err) {
      if (err) {
        console.log('Error creating directory', outputDir);
        return;
      }
      fs.writeFile(path.resolve(outputDir, `${relativePath.name}.md`), markdown, (err) => {
        if (err) {
          console.log('Error writing markdown file', path.format(relativePath));
        }
        console.log('Built markdown docs for', path.format(relativePath));
      });
    });
  });
}

function ensureExists(pat, mask, cb) {
  fs.mkdir(pat, mask, function(err) {
    if (err) {
      if (err.code === 'EEXIST') cb(null); // ignore the error if the folder already exists
      else cb(err); // something else went wrong
    } else cb(null); // successfully created folder
  });
}
