import React from 'react';
import PropTypes from 'prop-types';

const withUtils = () => (Component) => {
  const WithUtils = (props, context) => {
    if (!context.muiPickersDateUtils) {
      // eslint-disable-next-line no-console
      console.error('Utils should be provided');
    }

    return <Component utils={context.muiPickersDateUtils} {...props} />;
  };

  WithUtils.contextTypes = {
    muiPickersDateUtils: PropTypes.object,
  };

  WithUtils.displayName = `withUtils${Component.displayName || Component.name}`;

  return WithUtils;
};

export default withUtils;
