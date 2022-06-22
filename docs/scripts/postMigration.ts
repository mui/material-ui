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
/components/data-grid/* /x/react-data-grid/:splat/ 301
/:lang/components/data-grid/* /:lang/x/react-data-grid/:splat/ 301

/api/data-grid/* /x/api/data-grid/:splat 301
### specific to current supported languages, to prevent this redirect: /x/api/data-grid/* => /x/x/api/data-grid/*
/zh/api/data-grid/* /zh/x/api/data-grid/:splat 301
/pt/api/data-grid/* /pt/x/api/data-grid/:splat 301

/components/date-pickers/ /x/react-date-pickers/getting-started/ 301
/:lang/components/date-pickers/ /:lang/x/react-date-pickers/getting-started/ 301

/components/date-range-pickers/ /x/react-date-pickers/date-range-picker/ 301
/:lang/components/date-range-pickers/ /:lang/x/react-date-pickers/date-range-picker/ 301

/components/date-time-pickers/ /x/react-date-pickers/date-time-picker/ 301
/:lang/components/date-time-pickers/ /:lang/x/react-date-pickers/date-time-picker/ 301

/components/time-pickers/ /x/react-date-pickers/time-picker/ 301
/:lang/components/time-pickers/ /:lang/x/react-date-pickers/time-picker/ 301

/api/date-picker/ /x/api/date-pickers/date-picker/ 301
/zh/api/date-picker/ /zh/x/api/date-pickers/date-picker/ 301
/pt/api/date-picker/ /pt/x/api/date-pickers/date-picker/ 301

/api/date-range-picker/ /x/api/date-pickers/date-range-picker/ 301
/zh/api/date-range-picker/ /zh/x/api/date-pickers/date-range-picker/ 301
/pt/api/date-range-picker/ /pt/x/api/date-pickers/date-range-picker/ 301

/api/date-range-picker-day/ /x/api/date-pickers/date-range-picker-day/ 301
/zh/api/date-range-picker-day/ /zh/x/api/date-pickers/date-range-picker-day/ 301
/pt/api/date-range-picker-day/ /pt/x/api/date-pickers/date-range-picker-day/ 301

/api/date-time-picker/ /x/api/date-pickers/date-time-picker/ 301
/zh/api/date-time-picker/ /zh/x/api/date-pickers/date-time-picker/ 301
/pt/api/date-time-picker/ /pt/x/api/date-pickers/date-time-picker/ 301

/api/desktop-date-picker/ /x/api/date-pickers/desktop-date-picker/ 301
/zh/api/desktop-date-picker/ /zh/x/api/date-pickers/desktop-date-picker/ 301
/pt/api/desktop-date-picker/ /pt/x/api/date-pickers/desktop-date-picker/ 301

/api/desktop-date-range-picker/ /x/api/date-pickers/desktop-date-range-picker/ 301
/zh/api/desktop-date-range-picker/ /zh/x/api/date-pickers/desktop-date-range-picker/ 301
/pt/api/desktop-date-range-picker/ /pt/x/api/date-pickers/desktop-date-range-picker/ 301

/api/desktop-date-time-picker/ /x/api/date-pickers/desktop-date-time-picker/ 301
/zh/api/desktop-date-time-picker/ /zh/x/api/date-pickers/desktop-date-time-picker/ 301
/pt/api/desktop-date-time-picker/ /pt/x/api/date-pickers/desktop-date-time-picker/ 301

/api/desktop-time-picker/ /x/api/date-pickers/desktop-time-picker/ 301
/zh/api/desktop-time-picker/ /zh/x/api/date-pickers/desktop-time-picker/ 301
/pt/api/desktop-time-picker/ /pt/x/api/date-pickers/desktop-time-picker/ 301

/api/calendar-picker/ /x/api/date-pickers/calendar-picker/ 301
/zh/api/calendar-picker/ /zh/x/api/date-pickers/calendar-picker/ 301
/pt/api/calendar-picker/ /pt/x/api/date-pickers/calendar-picker/ 301

/api/calendar-picker-skeleton/ /x/api/date-pickers/calendar-picker-skeleton/ 301
/zh/api/calendar-picker-skeleton/ /zh/x/api/date-pickers/calendar-picker-skeleton/ 301
/pt/api/calendar-picker-skeleton/ /pt/x/api/date-pickers/calendar-picker-skeleton/ 301

/api/mobile-date-picker/ /x/api/date-pickers/mobile-date-picker/ 301
/zh/api/mobile-date-picker/ /zh/x/api/date-pickers/mobile-date-picker/ 301
/pt/api/mobile-date-picker/ /pt/x/api/date-pickers/mobile-date-picker/ 301

/api/month-picker/ /x/api/date-pickers/month-picker/ 301
/zh/api/month-picker/ /zh/x/api/date-pickers/month-picker/ 301
/pt/api/month-picker/ /pt/x/api/date-pickers/month-picker/ 301

/api/pickers-day/ /x/api/date-pickers/pickers-day/ 301
/zh/api/pickers-day/ /zh/x/api/date-pickers/pickers-day/ 301
/pt/api/pickers-day/ /pt/x/api/date-pickers/pickers-day/ 301

/api/static-date-picker/ /x/api/date-pickers/static-date-picker/ 301
/zh/api/static-date-picker/ /zh/x/api/date-pickers/static-date-picker/ 301
/pt/api/static-date-picker/ /pt/x/api/date-pickers/static-date-picker/ 301

/api/year-picker/ /x/api/date-pickers/year-picker/ 301
/zh/api/year-picker/ /zh/x/api/date-pickers/year-picker/ 301
/pt/api/year-picker/ /pt/x/api/date-pickers/year-picker/ 301

/api/mobile-date-range-picker/ /x/api/date-pickers/mobile-date-range-picker/ 301
/zh/api/mobile-date-range-picker/ /zh/x/api/date-pickers/mobile-date-range-picker/ 301
/pt/api/mobile-date-range-picker/ /pt/x/api/date-pickers/mobile-date-range-picker/ 301

/api/static-date-range-picker/ /x/api/date-pickers/static-date-range-picker/ 301
/zh/api/static-date-range-picker/ /zh/x/api/date-pickers/static-date-range-picker/ 301
/pt/api/static-date-range-picker/ /pt/x/api/date-pickers/static-date-range-picker/ 301

/api/mobile-date-time-picker/ /x/api/date-pickers/mobile-date-time-picker/ 301
/zh/api/mobile-date-time-picker/ /zh/x/api/date-pickers/mobile-date-time-picker/ 301
/pt/api/mobile-date-time-picker/ /pt/x/api/date-pickers/mobile-date-time-picker/ 301

/api/static-date-time-picker/ /x/api/date-pickers/static-date-time-picker/ 301
/zh/api/static-date-time-picker/ /zh/x/api/date-pickers/static-date-time-picker/ 301
/pt/api/static-date-time-picker/ /pt/x/api/date-pickers/static-date-time-picker/ 301

/api/clock-picker/ /x/api/date-pickers/clock-picker/ 301
/zh/api/clock-picker/ /zh/x/api/date-pickers/clock-picker/ 301
/pt/api/clock-picker/ /pt/x/api/date-pickers/clock-picker/ 301

/api/mobile-time-picker/ /x/api/date-pickers/mobile-time-picker/ 301
/zh/api/mobile-time-picker/ /zh/x/api/date-pickers/mobile-time-picker/ 301
/pt/api/mobile-time-picker/ /pt/x/api/date-pickers/mobile-time-picker/ 301

/api/static-time-picker/ /x/api/date-pickers/static-time-picker/ 301
/zh/api/static-time-picker/ /zh/x/api/date-pickers/static-time-picker/ 301
/pt/api/static-time-picker/ /pt/x/api/date-pickers/static-time-picker/ 301

/api/time-picker/ /x/api/date-pickers/time-picker/ 301
/zh/api/time-picker/ /zh/x/api/date-pickers/time-picker/ 301
/pt/api/time-picker/ /pt/x/api/date-pickers/time-picker/ 301

## MUI Core
/styles/* /system/styles/:splat 301
/:lang/styles/* /:lang/system/styles/:splat 301

/getting-started/* /material-ui/getting-started/:splat 301
/:lang/getting-started/* /:lang/material-ui/getting-started/:splat 301

/customization/* /material-ui/customization/:splat 301
/:lang/customization/* /:lang/material-ui/customization/:splat 301

/guides/* /material-ui/guides/:splat 301
/:lang/guides/* /:lang/material-ui/guides/:splat 301

/discover-more/* /material-ui/discover-more/:splat 301
/:lang/discover-more/* /:lang/material-ui/discover-more/:splat 301

### Exceptions
/components/icons/ /material-ui/icons/ 301
/:lang/components/icons/ /:lang/material-ui/icons/ 301

/components/material-icons/ /material-ui/material-icons/ 301
/:lang/components/material-icons/ /:lang/material-ui/material-icons/ 301

/components/transitions/ /material-ui/transitions/ 301
/:lang/components/transitions/ /:lang/material-ui/transitions/ 301

/components/about-the-lab/ /material-ui/about-the-lab/ 301
/:lang/components/about-the-lab/ /:lang/material-ui/about-the-lab/ 301

/components/trap-focus/ /base/react-trap-focus/ 301
/:lang/components/trap-focus/ /:lang/base/react-trap-focus/ 301

/guides/classname-generator/ /experimental-api/classname-generator/ 301
/:lang/guides/classname-generator/ /:lang/experimental-api/classname-generator/ 301

### React plural
/components/tabs/ /material-ui/react-tabs/ 301
/:lang/components/tabs/ /:lang/material-ui/react-tabs/ 301

/components/breadcrumbs/ /material-ui/react-breadcrumbs/ 301
/:lang/components/breadcrumbs/ /:lang/material-ui/react-breadcrumbs/ 301

/components/checkboxes/ /material-ui/react-checkbox/ 301
/:lang/components/checkboxes/ /:lang/material-ui/react-checkbox/ 301

/components/switches/ /material-ui/react-switch/ 301
/:lang/components/switches/ /:lang/material-ui/react-switch/ 301

/components/buttons/ /material-ui/react-button/ 301
/:lang/components/buttons/ /:lang/material-ui/react-button/ 301

/components/radio-buttons/ /material-ui/react-radio-button/ 301
/:lang/components/radio-buttons/ /:lang/material-ui/react-radio-button/ 301

/components/selects/ /material-ui/react-select/ 301
/:lang/components/selects/ /:lang/material-ui/react-select/ 301

/components/text-fields/ /material-ui/react-text-field/ 301
/:lang/components/text-fields/ /:lang/material-ui/react-text-field/ 301

/components/avatars/ /material-ui/react-avatar/ 301
/:lang/components/avatars/ /:lang/material-ui/react-avatar/ 301

/components/badges/ /material-ui/react-badge/ 301
/:lang/components/badges/ /:lang/material-ui/react-badge/ 301

/components/chips/ /material-ui/react-chip/ 301
/:lang/components/chips/ /:lang/material-ui/react-chip/ 301

/components/dividers/ /material-ui/react-divider/ 301
/:lang/components/dividers/ /:lang/material-ui/react-divider/ 301

/components/lists/ /material-ui/react-list/ 301
/:lang/components/lists/ /:lang/material-ui/react-list/ 301

/components/tables/ /material-ui/react-table/ 301
/:lang/components/tables/ /:lang/material-ui/react-table/ 301

/components/tooltips/ /material-ui/react-tooltip/ 301
/:lang/components/tooltips/ /:lang/material-ui/react-tooltip/ 301

/components/dialogs/ /material-ui/react-dialog/ 301
/:lang/components/dialogs/ /:lang/material-ui/react-dialog/ 301

/components/snackbars/ /material-ui/react-snackbar/ 301
/:lang/components/snackbars/ /:lang/material-ui/react-snackbar/ 301

/components/cards/ /material-ui/react-card/ 301
/:lang/components/cards/ /:lang/material-ui/react-card/ 301

/components/drawers/ /material-ui/react-drawer/ 301
/:lang/components/drawers/ /:lang/material-ui/react-drawer/ 301

/components/links/ /material-ui/react-link/ 301
/:lang/components/links/ /:lang/material-ui/react-link/ 301

/components/menus/ /material-ui/react-menu/ 301
/:lang/components/menus/ /:lang/material-ui/react-menu/ 301

/components/steppers/ /material-ui/react-stepper/ 301
/:lang/components/steppers/ /:lang/material-ui/react-stepper/ 301

/components/* /material-ui/react-:splat 301
/:lang/components/* /:lang/material-ui/react-:splat 301

/api/unstable-trap-focus/ /base/api/trap-focus/ 301
/zh/api/unstable-trap-focus/ /zh/base/api/trap-focus/ 301
/pt/api/unstable-trap-focus/ /pt/base/api/trap-focus/ 301

/api/* /material-ui/api/:splat 301
/zh/api/* /zh/material-ui/api/:splat 301
/pt/api/* /pt/material-ui/api/:splat 301
`,
  );

  // remove X redirects because of the above redirects
  redirects = redirects
    .replace('/api/*/ https://docs-v5--material-ui-x.netlify.app/api/:splat/ 200\n', '')
    .replace('/:lang/api/*/ https://docs-v5--material-ui-x.netlify.app/:lang/api/:splat/ 200\n', '')
    .replace('/components/* https://docs-v5--material-ui-x.netlify.app/components/:splat 200\n', '')
    .replace(
      '/:lang/components/* https://docs-v5--material-ui-x.netlify.app/:lang/components/:splat 200\n',
      '',
    );

  fs.writeFileSync(redirectsPath, redirects);
}

run();
