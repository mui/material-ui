const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const glob = require('fast-glob');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const workspaceRoot = path.join(__dirname, '..', '..');

async function getWebpackEntries() {
  const materialPackagePath = path.join(workspaceRoot, 'packages/mui-material/build');
  const materialComponents = (await glob(path.join(materialPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));
      let entryName = componentName;
      // adjust for legacy names
      if (componentName === 'Paper') {
        entryName = '@material-ui/core/Paper.esm';
      } else if (componentName === 'TextareaAutosize') {
        entryName = '@material-ui/core/Textarea';
      }

      return {
        id: entryName,
        import: `@mui/material/${componentName}`,
      };
    },
  );

  const corePackagePath = path.join(workspaceRoot, 'packages/mui-base/build');
  const baseComponents = (await glob(path.join(corePackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));
      let entryName = componentName;

      if (['Popper'].includes(componentName)) {
        entryName = `@material-ui/core/${componentName}`;
      }

      return {
        id: entryName,
        import: `@mui/base/${componentName}`,
      };
    },
  );

  const labPackagePath = path.join(workspaceRoot, 'packages/mui-lab/build');
  const labComponents = (await glob(path.join(labPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        id: componentName,
        import: `@mui/lab/${componentName}`,
      };
    },
  );

  const joyPackagePath = path.join(workspaceRoot, 'packages/mui-joy/build');
  const joyComponents = (await glob(path.join(joyPackagePath, '([A-Z])*/index.js'))).map(
    (componentPath) => {
      const componentName = path.basename(path.dirname(componentPath));

      return {
        id: `@mui/joy/${componentName}`,
        import: `@mui/joy/${componentName}`,
      };
    },
  );

  return [
    {
      // WARNING: Changing the name will break tracking of bundle size over time
      // If the name of the package changes, rename its display name in https://github.com/eps1lon/mui-contributor-dashboard/blob/main/src/pages/SizeComparison.tsx
      id: '@material-ui/core',
      import: '@mui/material',
    },
    ...materialComponents,
    {
      id: '@material-ui/lab',
      import: '@mui/lab',
    },
    ...labComponents,
    {
      id: '@material-ui/styles',
      import: '@mui/styles',
    },
    {
      id: '@material-ui/private-theming',
      import: '@mui/private-theming',
    },
    {
      id: '@material-ui/system',
      import: '@mui/system',
    },
    {
      id: 'createBox',
      import: '@mui/system/createBox',
    },
    {
      id: 'createStyled',
      import: '@mui/system/createStyled',
    },
    {
      id: '@material-ui/core/styles/createTheme',
      importName: 'createTheme',
      import: '@mui/material/styles',
    },
    {
      id: 'colorManipulator',
      import: '@mui/system/colorManipulator',
    },
    {
      id: 'useAutocomplete',
      import: '@mui/lab/useAutocomplete',
    },
    {
      id: '@material-ui/core/useMediaQuery',
      import: '@mui/material/useMediaQuery',
    },
    {
      id: '@material-ui/core/useScrollTrigger',
      import: '@mui/material/useScrollTrigger',
    },
    {
      id: '@material-ui/unstyled',
      import: '@mui/base',
    },
    ...baseComponents,
    {
      id: '@material-ui/utils',
      import: '@mui/utils',
    },
    // TODO: Requires webpack v5
    // Resolution of webpack/acorn to 7.x is blocked by nextjs (https://github.com/vercel/next.js/issues/11947)
    // {
    //   id: '@material-ui/core.modern',
    //   webpack: true,
    //   path: path.join(path.relative(workspaceRoot, materialPackagePath), 'modern/index.js'),
    // },
    {
      id: '@mui/joy',
      import: '@mui/joy',
    },
    ...joyComponents,
  ];
}

function createWebpackConfig(entry, environment) {
  const analyzerMode = environment.analyze ? 'static' : 'disabled';
  const concatenateModules = !environment.accurateBundles;

  const importNames = entry.importName ? `{ ${entry.importName} as foo }` : '* as foo';

  /**
   * @type {import('webpack').Configuration}
   */
  const configuration = {
    // ideally this would be computed from the bundles peer dependencies
    // Ensure that `react` as well as `react/*` are considered externals but not `react*`
    externals: /^(date-fns|dayjs|luxon|moment|react|react-dom)(\/.*)?$/,
    mode: 'production',
    optimization: {
      concatenateModules,
      minimizer: [
        new TerserPlugin({
          test: /\.m?js(\?.*)?$/i,
        }),
      ],
    },
    output: {
      filename: '[name].js',
      library: {
        // TODO: Use `type: 'module'` once it is supported (currently incompatible with `externals`)
        name: 'M',
        type: 'var',
        // type: 'module',
      },
      path: path.join(__dirname, 'build'),
    },
    plugins: [
      new CompressionPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode,
        // We create a report for each bundle so around 120 reports.
        // Opening them all is spam.
        // If opened with `webpack --config . --analyze` it'll still open one new tab though.
        openAnalyzer: false,
        // '[name].html' not supported: https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/12
        reportFilename: `${entry.id}.html`,
      }),
    ],
    // A context to the current dir, which has a node_modules folder with workspace dependencies
    context: __dirname,
    entry: {
      // This format is a data: url combined with inline matchResource to obtain a virtual entry.
      // See https://github.com/webpack/webpack/issues/6437#issuecomment-874466638
      // See https://webpack.js.org/api/loaders/#inline-matchresource
      [entry.id]: `./index.js!=!data:text/javascript,import ${importNames} from '${entry.import}';console.log(foo);`,
    },
    // TODO: 'browserslist:modern'
    // See https://github.com/webpack/webpack/issues/14203
    target: 'web',
  };

  return configuration;
}

exports.getWebpackEntries = getWebpackEntries;
exports.createWebpackConfig = createWebpackConfig;
