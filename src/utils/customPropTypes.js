/* eslint-disable prefer-template */
import {PropTypes} from 'react';

let customPropTypes = {};

if (process.env.NODE_ENV !== 'production') {
  const horizontal = PropTypes.oneOf(['left', 'middle', 'right']);
  const vertical = PropTypes.oneOf(['top', 'center', 'bottom']);

  customPropTypes = {
    corners: PropTypes.oneOf([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right',
    ]),
    horizontal: horizontal,
    vertical: vertical,
    origin: PropTypes.shape({
      horizontal: horizontal,
      vertical: vertical,
    }),
    cornersAndCenter: PropTypes.oneOf([
      'bottom-center',
      'bottom-left',
      'bottom-right',
      'top-center',
      'top-left',
      'top-right',
    ]),
    stringOrNumber: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    zDepth: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  };
}

if (process.env.NODE_ENV !== 'production') {
  customPropTypes.muiTheme = (props, propName, componentName, location, propFullName, ...args) => {
    const error = PropTypes.object.isRequired(
      props, propName, componentName, location, propFullName, ...args
    );

    if (error) {
      error.message = 'You need to provide a theme to Material-UI. ' +
        'Wrap the root component in a `<MuiThemeProvider />`. ' +
        '\n' +
        'Have a look at http://www.material-ui.com/#/get-started/usage for an example.' +
        '\n' +
        error.message;
    }

    return error;
  };
} else {
  customPropTypes.muiTheme = () => {};
}

export default customPropTypes;
