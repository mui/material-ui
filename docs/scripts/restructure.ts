import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import pages from 'docs/src/pages';
import { refactorMarkdownContent } from './restructureUtils';

const workspaceRoot = path.resolve(__dirname, '../../');
const prettierConfigPath = path.join(workspaceRoot, 'prettier.config.js');

function writePrettifiedFile(filename: string, data: string, options: object = {}) {
  const prettierConfig = prettier.resolveConfig.sync(filename, {
    config: prettierConfigPath,
  });
  if (prettierConfig === null) {
    throw new Error(
      `Could not resolve config for '${filename}' using prettier config path '${prettierConfigPath}'.`,
    );
  }

  fs.writeFileSync(filename, prettier.format(data, { ...prettierConfig, filepath: filename }), {
    encoding: 'utf8',
    ...options,
  });
}

const prefixSource = (arraySource: string, pathnames: string[], product: string) => {
  let target = arraySource;

  // prefix with `/${product}/`
  pathnames.forEach((pathname) => {
    const replace = `"${pathname}/([-/a-z]*)"`;
    target = target.replace(new RegExp(replace, 'g'), `"/${product}${pathname}/$1"`);
    target = target.replace(
      new RegExp(`"pathname":"${pathname}"`, 'g'),
      `"pathname":"/${product}${pathname}"`,
    );
  });

  return target;
};

const createProductPagesData = (arraySource: string, product: string) => {
  // prepare source code
  const source = `
const pages = ${arraySource}

export default pages
  `;

  // create new folder and add prettified file.
  fs.mkdirSync(`${workspaceRoot}/docs/src/data`, { recursive: true });
  writePrettifiedFile(`${workspaceRoot}/docs/src/data/${product}Pages.ts`, source);
};

const appendSource = (target: string, template: string, source: string) => {
  const match = source.match(/^(.*)$/m);
  if (match && target.includes(match[0])) {
    // do nothing if $source already existed
    return target;
  }
  // eslint-disable-next-line prefer-template
  return target.replace(new RegExp(template), template + '\n' + source);
};

const updateAppToUseProductPagesData = (product: string) => {
  const appPath = path.resolve(__dirname, '../../docs/pages/_app.js');
  let appSource = fs.readFileSync(appPath, { encoding: 'utf8' });
  appSource = appendSource(
    appSource,
    `import pages from 'docs/src/pages';`,
    `import ${product}Pages from 'docs/src/data/${product}Pages';`,
  );
  appSource = appendSource(
    appSource,
    `let productPages = pages;`,
    `if (router.asPath.startsWith('/${product}')) {
      productPages = ${product}Pages;
    }`,
  );
  writePrettifiedFile(appPath, appSource);
};

const productPathnames = {
  material: [
    '/getting-started',
    '/components',
    '/api-docs',
    '/customization',
    '/guides',
    '/discover-more',
  ],
  system: ['/system'],
  styles: ['/styles'],
};

const readdirDeep = (directory: string, pathsProp: string[] = []) => {
  const paths: string[] = pathsProp;
  const items = fs.readdirSync(directory);
  items.forEach((item) => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      readdirDeep(itemPath, paths);
    }

    paths.push(itemPath);
  });

  return paths;
};

function run() {
  /**
   * clone pages & api data from `docs/src/pages.ts` to `docs/src/data/materialPages.ts`
   * also prefix all pathnames with `/$product/` by using Regexp replace
   */
  (['styles', 'system', 'material'] as const).forEach((product) => {
    const pathnames = productPathnames[product];
    const productPages = pages.filter((item) => pathnames.includes(item.pathname));

    let arraySource = JSON.stringify(productPages);

    if (product === 'material') {
      arraySource = prefixSource(arraySource, [...pathnames, '/api'], 'material');
    }

    createProductPagesData(arraySource, product);

    // update _app.js to use product pages
    updateAppToUseProductPagesData(product);

    if (product === 'material') {
      // copy material related pages to `docs/pages/material/*`

      pathnames.forEach((pathname) => {
        const dataDir = readdirDeep(path.resolve(`docs/src/pages${pathname}`));
        dataDir.forEach((filePath) => {
          if (filePath.match(/^.*\.(ts|js|tsx|md)$/)) {
            let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
            data = refactorMarkdownContent(data, pathnames);
            fs.writeFileSync(filePath.replace('src/pages', 'products/material'), data); // (A)
          }
        });

        const pagesDir = readdirDeep(path.resolve(`docs/pages${pathname}`));
        pagesDir.forEach((filePath) => {
          // pathname could be a directory
          if (filePath.match(/^.*\.(ts|js|tsx|md)$/)) {
            let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
            data = data.replace('/src/pages/', '/products/material/'); // point to data path (A) in new directory
            fs.writeFileSync(filePath.replace('docs/pages', 'docs/pages/material'), data);
          }
        });
      });
    }
  });
}

run();
