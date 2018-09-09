/* eslint-disable no-underscore-dangle, no-plusplus */

if (!global.__MUI_PACKAGE_ID__) {
  global.__MUI_PACKAGE_ID__ = 0;
}

// One unique value per @material-ui/core package installation.
export default global.__MUI_PACKAGE_ID__++;
