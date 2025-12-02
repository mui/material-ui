// @ts-check
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
// @ts-ignore
import getBaseConfig from '@mui/internal-code-infra/babel-config';

/**
 * @typedef {import('@babel/core')} babel
 */

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const errorCodesPath = path.resolve(dirname, './docs/public/static/error-codes.json');

/**
 * @param {string} relativeToBabelConf
 * @returns {string}
 */
function resolveAliasPath(relativeToBabelConf) {
  const resolvedPath = path.relative(process.cwd(), path.resolve(dirname, relativeToBabelConf));
  return `./${resolvedPath.replace('\\', '/')}`;
}

/** @type {babel.ConfigFunction} */
export default function getBabelConfig(api) {
  const baseConfig = getBaseConfig(api);
  const useESModules = api.env(['regressions', 'stable']);

  const defaultAlias = {
    '@mui/material': resolveAliasPath('./packages/mui-material/src'),
    '@mui/docs': resolveAliasPath('./packages/mui-docs/src'),
    '@mui/icons-material': resolveAliasPath(
      `./packages/mui-icons-material/lib${useESModules ? '/esm' : ''}`,
    ),
    '@mui/lab': resolveAliasPath('./packages/mui-lab/src'),
    '@mui/internal-markdown': resolveAliasPath('./packages/markdown'),
    '@mui/styled-engine': resolveAliasPath('./packages/mui-styled-engine/src'),
    '@mui/styled-engine-sc': resolveAliasPath('./packages/mui-styled-engine-sc/src'),
    '@mui/system': resolveAliasPath('./packages/mui-system/src'),
    '@mui/private-theming': resolveAliasPath('./packages/mui-private-theming/src'),
    '@mui/utils': resolveAliasPath('./packages/mui-utils/src'),
    '@mui/joy': resolveAliasPath('./packages/mui-joy/src'),
    '@mui/internal-docs-utils': resolveAliasPath('./packages-internal/docs-utils/src'),
    '@mui/internal-test-utils': resolveAliasPath('./packages-internal/test-utils/src'),
    docs: resolveAliasPath('./docs'),
    test: resolveAliasPath('./test'),
  };

  /** @type {babel.PluginItem[]} */
  const plugins = [
    [
      '@mui/internal-babel-plugin-minify-errors',
      {
        missingError: 'annotate',
        errorCodesPath,
        runtimeModule: '@mui/utils/formatMuiErrorMessage',
      },
    ],
  ];

  if (process.env.NODE_ENV === 'test') {
    plugins.push([
      'babel-plugin-module-resolver',
      {
        alias: defaultAlias,
        root: ['./'],
      },
    ]);
  }
  const basePlugins = (baseConfig.plugins || []).filter(
    (/** @type {[unknown, unknown, string]} */ [, , pluginName]) =>
      pluginName !== '@mui/internal-babel-plugin-display-name',
  );
  basePlugins.push(...plugins);

  return {
    ...baseConfig,
    plugins: basePlugins,
    overrides: [
      {
        exclude: /\.test\.(m?js|ts|tsx)$/,
        plugins: ['@babel/plugin-transform-react-constant-elements'],
      },
    ],
    env: {
      coverage: {
        plugins: [
          'babel-plugin-istanbul',
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: defaultAlias,
            },
          ],
        ],
      },
      development: {
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              alias: {
                ...defaultAlias,
                modules: './modules',
              },
              root: ['./'],
            },
          ],
        ],
      },
      test: {
        sourceMaps: 'both',
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: defaultAlias,
            },
          ],
        ],
      },
    },
  };
}
