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
  if (filename.endsWith('.tsx.preview')) {
    fs.writeFileSync(filename, data);
  } else {
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
    `import findActivePage from 'docs/src/modules/utils/findActivePage';`,
    `import FEATURE_TOGGLE from 'docs/src/featureToggle';`,
  );
  appSource = appendSource(
    appSource,
    `import pages from 'docs/src/pages';`,
    `import ${product}Pages from 'docs/data/${product}/pages';`,
  );
  appSource = appendSource(
    appSource,
    `let productPages = pages;`,
    `if (asPathWithoutLang.startsWith('/${product}')${
      product === 'system' ? ` && FEATURE_TOGGLE.enable_system_scope` : ''
    }) {
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

    if (itemPath.match(/.*\/[^/]+\.[^.]+/)) {
      // ends with extension
      paths.push(itemPath);
    }
  });

  return paths;
};

function run() {
  /**
   * clone pages & api data from `docs/src/pages.ts` to `docs/src/data/materialPages.ts`
   * also prefix all pathnames with `/$product/` by using Regexp replace
   */
  (['system', 'material'] as const).forEach((product) => {
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
              data = markdown.updateMaterialTitle(filePath, data);
            }
          }
          fs.mkdirSync(info.directory, { recursive: true });
          writePrettifiedFile(info.path, data); // (A)

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
              writePrettifiedFile(info.path, data);

              writePrettifiedFile(filePath, data);
            }
          }
        } else {
          let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
          if (filePath.endsWith('.js')) {
            data = data.replace(`/src/pages/`, `/data/`); // point to data path (A) in new directory
          }
          writePrettifiedFile(filePath, data);
        }
      });
    });
  });

  /**
   * ======================================================================
   * Styles legacy
   */
  const stylesDataDir = readdirDeep(path.resolve(`docs/src/pages/styles`));
  stylesDataDir.forEach((filePath) => {
    // pathname could be a directory
    let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    if (filePath.endsWith('.md')) {
      data = markdown.removeDemoRelativePath(data);
    }
    const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json|tsx\.preview)$/);
    fs.mkdirSync(match[1].replace('src/pages', 'data'), { recursive: true });
    writePrettifiedFile(filePath.replace('src/pages', 'data'), data);

    fs.rmSync(filePath);
  });

  const stylesPagesDir = readdirDeep(path.resolve(`docs/pages/styles`));
  stylesPagesDir.forEach((filePath) => {
    let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    if (filePath.endsWith('.js')) {
      data = data.replace(`src/pages`, `data`);
    }

    // replace the old file
    writePrettifiedFile(filePath, data);

    // add to /system
    const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json|tsx\.preview)$/);
    fs.mkdirSync(match[1].replace('pages/styles', 'pages/system/styles'), { recursive: true });
    writePrettifiedFile(filePath.replace('pages/styles', 'pages/system/styles'), data);
  });
  // =======================================================================

  // include `base` pages in `_app.js`
  updateAppToUseProductPagesData('base');

  // Turn feature toggle `enable_product_scope: true`
  const featureTogglePath = path.join(process.cwd(), 'docs/src/featureToggle.js');
  let featureToggle = fs.readFileSync(featureTogglePath, { encoding: 'utf8' });

  featureToggle = featureToggle.replace(
    `enable_product_scope: false`,
    `enable_product_scope: true`,
  );

  writePrettifiedFile(featureTogglePath, featureToggle);
}

run();
