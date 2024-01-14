import createGetModuleSize from 'docs/src/docs-infra/createGetModuleSize';
import materialPkgJson from 'packages/mui-material/package.json';
import joyPkgJson from 'packages/mui-joy/package.json';
import systemPkgJson from 'packages/mui-system/package.json';
import basePkgJson from 'packages/mui-base/package.json';

const getModuleSize = createGetModuleSize({
  packageVersion: {
    '@mui/material': materialPkgJson.version,
    '@mui/joy': joyPkgJson.version,
    '@mui/system': systemPkgJson.version,
    '@mui/base': basePkgJson.version,
  },
  productIdPackage: {
    'material-ui': '@mui/material',
    'joy-ui': '@mui/joy',
    'base-ui': '@mui/base',
    system: '@mui/system',
  },
});

export default getModuleSize;
