import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import {
  getNewDataLocation,
  getNewPageLocation,
  productPathnames,
  markdown,
} from './restructureUtils';

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
    `import ${product}Pages from 'docs/data/${product}/pages';`,
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
    const pathnames = productPathnames[product] as unknown as string[];

    // update _app.js to use product pages
    updateAppToUseProductPagesData(product);

    pathnames.forEach((pathname) => {
      // clone js/md data to new location
      const dataDir = readdirDeep(path.resolve(`docs/src/pages${pathname}`));
      dataDir.forEach((filePath) => {
        const info = getNewDataLocation(filePath, product);
        // pathname could be a directory
        if (info) {
          let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
          if (filePath.endsWith('.md')) {
            data = markdown.removeDemoRelativePath(data);
            if (product === 'material') {
              data = markdown.addProductFrontmatter(data, 'material');
            }
          }
          fs.mkdirSync(info.directory, { recursive: true });
          fs.writeFileSync(info.path, data); // (A)

          fs.rmSync(filePath);
        }
      });

      const pagesDir = readdirDeep(path.resolve(`docs/pages${pathname}`));
      pagesDir.forEach((filePath) => {
        if (product === 'material') {
          if (!filePath.includes('api-docs')) {
            // clone pages to new location
            const info = getNewPageLocation(filePath);
            // pathname could be a directory
            if (info) {
              let data = fs.readFileSync(filePath, { encoding: 'utf-8' });

              if (filePath.endsWith('.js')) {
                data = data.replace('/src/pages/', `/data/material/`); // point to data path (A) in new directory
              }

              fs.mkdirSync(info.directory, { recursive: true });
              fs.writeFileSync(info.path, data);

              fs.writeFileSync(filePath, data);
            }
          }
        } else {
          let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
          if (filePath.endsWith('.js')) {
            data = data.replace('/src/pages/', `/data/${product}`); // point to data path (A) in new directory
          }
          fs.writeFileSync(filePath, data);
        }
      });
    });
  });

  // include `base` pages in `_app.js`
  updateAppToUseProductPagesData('base');

  // Turn feature toggle `enable_product_scope: true`
  const featureTogglePath = path.join(process.cwd(), 'docs/src/featureToggle.js');
  let featureToggle = fs.readFileSync(featureTogglePath, { encoding: 'utf8' });

  featureToggle = featureToggle.replace(
    `enable_product_scope: false`,
    `enable_product_scope: true`,
  );

  fs.writeFileSync(featureTogglePath, featureToggle);
}

run();
