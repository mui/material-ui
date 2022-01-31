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
/api/data-grid/* https://material-ui-x.netlify.app/x/api/data-grid/:splat 200
/x/* https://material-ui-x.netlify.app/x/:splat 200

## MUI Core
/styles/* /system/styles/:splat 301
/getting-started/* /material/getting-started/:splat 301
/customization/* /material/customization/:splat 301
/guides/* /material/guides/:splat 301
/discover-more/* /material/discover-more/:splat 301

### Exceptions
/components/icons/ /material/icons/ 301
/components/material-icons/ /material/material-icons/ 301
/components/about-the-lab/ /material/about-the-lab/ 301
/components/transitions/ /material/transitions/ 301
/components/pickers/ /material/pickers/ 301

### React plural
/components/tabs/ /material/react-tabs/ 301
/components/breadcrumbs/ /material/react-breadcrumbs/ 301

/components/checkboxes/ /material/react-checkbox/ 301
/components/switches/ /material/react-switch/ 301
/components/buttons/ /material/react-button/ 301
/components/radio-buttons/ /material/react-radio-button/ 301
/components/selects/ /material/react-select/ 301
/components/text-fields/ /material/react-text-field/ 301
/components/avatars/ /material/react-avatar/ 301
/components/badges/ /material/react-badge/ 301
/components/chips/ /material/react-chip/ 301
/components/dividers/ /material/react-divider/ 301
/components/lists/ /material/react-list/ 301
/components/tables/ /material/react-table/ 301
/components/tooltips/ /material/react-tooltip/ 301
/components/dialogs/ /material/react-dialog/ 301
/components/snackbars/ /material/react-snackbar/ 301
/components/cards/ /material/react-card/ 301
/components/drawers/ /material/react-drawer/ 301
/components/links/ /material/react-link/ 301
/components/menus/ /material/react-menu/ 301
/components/steppers/ /material/react-stepper/ 301
/components/* /material/react-:splat 301
/api/* /material/api/:splat 301`,
  );

  // remove X redirects because of the above redirects
  redirects
    .replace('/api/*/ https://docs-v5--material-ui-x.netlify.app/api/:splat/ 200', '')
    .replace('/components/* https://docs-v5--material-ui-x.netlify.app/components/:splat 200', '');

  fs.writeFileSync(redirectsPath, redirects);
}

run();
