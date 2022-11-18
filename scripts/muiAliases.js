const path = require('path');

const workspaceRoot = path.join(__dirname, '..');

/**
 * @param {'build' | 'src'} type Define if the target should be the built version or the source.
 */
function getMuiAliases(type) {
  return {
    '@mui/base': path.join(workspaceRoot, 'packages/mui-base', type),
    '@mui/docs': path.join(workspaceRoot, 'packages/mui-docs', type),
    '@mui/icons-material': path.join(
      workspaceRoot,
      'packages/mui-icons-material',
      type === 'src' ? 'lib' : 'build',
    ),
    '@mui/joy': path.join(workspaceRoot, 'packages/mui-joy', type),
    '@mui/lab': path.join(workspaceRoot, 'packages/mui-lab', type),
    '@mui/material': path.join(workspaceRoot, 'packages/mui-material', type),
    '@mui/material-next': path.join(workspaceRoot, 'packages/mui-material-next', type),
    '@mui/private-theming': path.join(workspaceRoot, 'packages/mui-private-theming', type),
    '@mui/styled-engine': path.join(workspaceRoot, 'packages/mui-styled-engine', type),
    '@mui/styled-engine-sc': path.join(workspaceRoot, 'packages/mui-styles-sc', type),
    '@mui/styles': path.join(workspaceRoot, 'packages/mui-styles', type),
    '@mui/system': path.join(workspaceRoot, 'packages/mui-system', type),
    '@mui/utils': path.join(workspaceRoot, 'packages/mui-utils', type),
    docs: path.join(workspaceRoot, 'docs'),
    'typescript-to-proptypes': path.join(workspaceRoot, 'packages/typescript-to-proptypes/src'),
  };
}

module.exports = getMuiAliases;
