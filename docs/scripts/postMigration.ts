import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import replaceMarkdownLinks from '../src/modules/utils/replaceMarkdownLinks';

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
  fs.removeSync(path.resolve(`docs/pages/api-docs`));
  fs.removeSync(path.resolve(`docs/pages/components`));
  fs.removeSync(path.resolve(`docs/pages/customization`));
  fs.removeSync(path.resolve(`docs/pages/discover-more`));
  fs.removeSync(path.resolve(`docs/pages/getting-started`));
  fs.removeSync(path.resolve(`docs/pages/guides`));
  fs.removeSync(path.resolve(`docs/pages/styles`));

  fs.removeSync(path.resolve(`test/e2e-website/material-current.spec.ts`));

  const dataDir = readdirDeep(path.resolve(`docs/data`));
  dataDir.forEach((filePath) => {
    if (filePath.endsWith('.md')) {
      let data = fs.readFileSync(filePath, { encoding: 'utf-8' });

      data = replaceMarkdownLinks(data);

      writePrettifiedFile(filePath, data);
    }
  });

  // Turn feature toggle `enable_product_scope: true`
  const featureTogglePath = path.join(process.cwd(), 'docs/src/featureToggle.js');
  let featureToggle = fs.readFileSync(featureTogglePath, { encoding: 'utf8' });

  featureToggle = featureToggle
    .replace(`enable_redirects: false`, `enable_redirects: true`)
    .replace(`enable_system_scope: false`, `enable_system_scope: true`);

  fs.writeFileSync(featureTogglePath, featureToggle);

  // Add redirects to _redirects (netlify)
  const redirectsPath = path.join(process.cwd(), 'docs/public/_redirects');
  let redirects = fs.readFileSync(redirectsPath, { encoding: 'utf8' });

  redirects = redirects.replace(
    `# 2022`,
    `# 2022
## MUI X
/components/data-grid/* https://material-ui-x.netlify.app/x/react-data-grid/:splat 200
/zh/components/data-grid/* https://material-ui-x.netlify.app/zh/x/react-data-grid/:splat 200
/pt/components/data-grid/* https://material-ui-x.netlify.app/pt/x/react-data-grid/:splat 200

/api/data-grid/* https://material-ui-x.netlify.app/x/api/data-grid/:splat 200
/zh/api/data-grid/* https://material-ui-x.netlify.app/zh/x/api/data-grid/:splat 200
/pt/api/data-grid/* https://material-ui-x.netlify.app/pt/x/api/data-grid/:splat 200

/x/* https://material-ui-x.netlify.app/x/:splat 200
/zh/x/* https://material-ui-x.netlify.app/zh/x/:splat 200
/pt/x/* https://material-ui-x.netlify.app/pt/x/:splat 200

## MUI Core
/styles/* /system/styles/:splat 301
/zh/styles/* /zh/system/styles/:splat 301
/pt/styles/* /pt/system/styles/:splat 301

/getting-started/* /material/getting-started/:splat 301
/zh/getting-started/* /zh/material/getting-started/:splat 301
/pt/getting-started/* /pt/material/getting-started/:splat 301

/customization/* /material/customization/:splat 301
/zh/customization/* /zh/material/customization/:splat 301
/pt/customization/* /pt/material/customization/:splat 301

/guides/* /material/guides/:splat 301
/zh/guides/* /zh/material/guides/:splat 301
/pt/guides/* /pt/material/guides/:splat 301

/discover-more/* /material/discover-more/:splat 301
/zh/discover-more/* /zh/material/discover-more/:splat 301
/pt/discover-more/* /pt/material/discover-more/:splat 301

### Exceptions
/components/icons/ /material/icons/ 301
/zh/components/icons/ /zh/material/icons/ 301
/pt/components/icons/ /pt/material/icons/ 301

/components/material-icons/ /material/material-icons/ 301
/zh/components/material-icons/ /zh/material/material-icons/ 301
/pt/components/material-icons/ /pt/material/material-icons/ 301

/components/pickers/ /material/pickers/ 301
/zh/components/about-the-lab/ /zh/material/about-the-lab/ 301
/pt/components/transitions/ /pt/material/transitions/ 301

### React plural
/components/tabs/ /material/react-tabs/ 301
/zh/components/tabs/ /zh/material/react-tabs/ 301
/pt/components/tabs/ /pt/material/react-tabs/ 301

/components/breadcrumbs/ /material/react-breadcrumbs/ 301
/zh/components/breadcrumbs/ /zh/material/react-breadcrumbs/ 301
/pt/components/breadcrumbs/ /pt/material/react-breadcrumbs/ 301

/components/checkboxes/ /material/react-checkbox/ 301
/zh/components/checkboxes/ /zh/material/react-checkbox/ 301
/pt/components/checkboxes/ /pt/material/react-checkbox/ 301

/components/switches/ /material/react-switch/ 301
/zh/components/switches/ /zh/material/react-switch/ 301
/pt/components/switches/ /pt/material/react-switch/ 301

/components/buttons/ /material/react-button/ 301
/zh/components/buttons/ /zh/material/react-button/ 301
/pt/components/buttons/ /pt/material/react-button/ 301

/components/radio-buttons/ /material/react-radio-button/ 301
/zh/components/radio-buttons/ /zh/material/react-radio-button/ 301
/pt/components/radio-buttons/ /pt/material/react-radio-button/ 301

/components/selects/ /material/react-select/ 301
/zh/components/selects/ /zh/material/react-select/ 301
/pt/components/selects/ /pt/material/react-select/ 301

/components/text-fields/ /material/react-text-field/ 301
/zh/components/text-fields/ /zh/material/react-text-field/ 301
/pt/components/text-fields/ /pt/material/react-text-field/ 301

/components/avatars/ /material/react-avatar/ 301
/zh/components/avatars/ /zh/material/react-avatar/ 301
/pt/components/avatars/ /pt/material/react-avatar/ 301

/components/badges/ /material/react-badge/ 301
/zh/components/badges/ /zh/material/react-badge/ 301
/pt/components/badges/ /pt/material/react-badge/ 301

/components/chips/ /material/react-chip/ 301
/zh/components/chips/ /zh/material/react-chip/ 301
/pt/components/chips/ /pt/material/react-chip/ 301

/components/dividers/ /material/react-divider/ 301
/zh/components/dividers/ /zh/material/react-divider/ 301
/pt/components/dividers/ /pt/material/react-divider/ 301

/components/lists/ /material/react-list/ 301
/zh/components/lists/ /zh/material/react-list/ 301
/pt/components/lists/ /pt/material/react-list/ 301

/components/tables/ /material/react-table/ 301
/zh/components/tables/ /zh/material/react-table/ 301
/pt/components/tables/ /pt/material/react-table/ 301

/components/tooltips/ /material/react-tooltip/ 301
/zh/components/tooltips/ /zh/material/react-tooltip/ 301
/pt/components/tooltips/ /pt/material/react-tooltip/ 301

/components/dialogs/ /material/react-dialog/ 301
/zh/components/dialogs/ /zh/material/react-dialog/ 301
/pt/components/dialogs/ /pt/material/react-dialog/ 301

/components/snackbars/ /material/react-snackbar/ 301
/zh/components/snackbars/ /zh/material/react-snackbar/ 301
/pt/components/snackbars/ /pt/material/react-snackbar/ 301

/components/cards/ /material/react-card/ 301
/zh/components/cards/ /zh/material/react-card/ 301
/pt/components/cards/ /pt/material/react-card/ 301

/components/drawers/ /material/react-drawer/ 301
/zh/components/drawers/ /zh/material/react-drawer/ 301
/pt/components/drawers/ /pt/material/react-drawer/ 301

/components/links/ /material/react-link/ 301
/zh/components/links/ /zh/material/react-link/ 301
/pt/components/links/ /pt/material/react-link/ 301

/components/menus/ /material/react-menu/ 301
/zh/components/menus/ /zh/material/react-menu/ 301
/pt/components/menus/ /pt/material/react-menu/ 301

/components/steppers/ /material/react-stepper/ 301
/zh/components/steppers/ /zh/material/react-stepper/ 301
/pt/components/steppers/ /pt/material/react-stepper/ 301

/components/* /material/react-:splat 301
/zh/components/* /zh/material/react-:splat 301
/pt/components/* /pt/material/react-:splat 301

/api/* /material/api/:splat 301
/zh/api/* /zh/material/api/:splat 301
/pt/api/* /pt/material/api/:splat 301`,
  );

  // remove X redirects because of the above redirects
  redirects
    .replace('/api/*/ https://docs-v5--material-ui-x.netlify.app/api/:splat/ 200', '')
    .replace('/components/* https://docs-v5--material-ui-x.netlify.app/components/:splat 200', '');

  fs.writeFileSync(redirectsPath, redirects);
}

run();
