/* eslint-disable prefer-template, import/no-mutable-exports */
/* eslint-disable flowtype/require-valid-file-annotation */

import PropTypes from 'prop-types';

const customPropTypes = {};

customPropTypes.muiRequired = (props, propName, componentName, location, propFullName, ...args) => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const error = PropTypes.object.isRequired(
    props,
    propName,
    componentName,
    location,
    propFullName,
    ...args,
  );

  if (error) {
    error.message =
      'You need to provide a theme to Material-UI. ' +
      'Wrap the root component in a `<MuiThemeProvider />`. ' +
      '\n' +
      'Have a look at http://www.material-ui.com/#/get-started/usage for an example.' +
      '\n' +
      error.message;
  }

  return error;
};

export default customPropTypes;
