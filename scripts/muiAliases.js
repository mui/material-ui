const path = require('path');

/**
 * @param {object} params The parameters of the function.
 * @param {'build' | 'src'} params.type Define if the target should be the built version or the source.
 * @param {boolean | undefined} params.isRelative If `true` the path will be relative to the repository root.
 * @param {boolean | undefined} params.useESIcons If `true` will use the ES version of `@mui/icons-material`.
 */
function getMuiAliases({ type, isRelative = false, useESIcons = false }) {
  const workspaceRoot = path.join(__dirname, '..');

  const resolveAliasPath = (aliasPath) => {
    const fullPath = path.join(workspaceRoot, aliasPath);

    if (!isRelative) {
      return fullPath;
    }

    const resolvedPath = path.relative(process.cwd(), fullPath);
    return `./${resolvedPath.replace('\\', '/')}`;
  };

  return {
    '@mui/base': resolveAliasPath(`packages/mui-base/${type}`),
    '@mui/docs': resolveAliasPath(`packages/mui-docs/${type}`),
    '@mui/icons-material': resolveAliasPath(
      `packages/mui-icons-material/lib${useESIcons ? '/esm' : ''}`,
    ),
    '@mui/joy': resolveAliasPath(`packages/mui-joy/${type}`),
    '@mui/lab': resolveAliasPath(`packages/mui-lab/${type}`),
    '@mui/markdown': resolveAliasPath('packages/markdown'),
    '@mui/material': resolveAliasPath(`packages/mui-material/${type}`),
    '@mui/material-next': resolveAliasPath(`packages/mui-material-next/${type}`),
    '@mui/private-theming': resolveAliasPath(`packages/mui-private-theming/${type}`),
    '@mui/styled-engine': resolveAliasPath(`packages/mui-styled-engine/${type}`),
    '@mui/styled-engine-sc': resolveAliasPath(`packages/mui-styled-engine-sc/${type}`),
    '@mui/styles': resolveAliasPath(`packages/mui-styles/${type}`),
    '@mui/system': resolveAliasPath(`packages/mui-system/${type}`),
    '@mui/utils': resolveAliasPath(`packages/mui-utils/${type}`),
    docs: resolveAliasPath('docs'),
    modules: resolveAliasPath('modules'),
    'typescript-to-proptypes': resolveAliasPath('packages/typescript-to-proptypes/src'),
  };
}

module.exports = getMuiAliases;
