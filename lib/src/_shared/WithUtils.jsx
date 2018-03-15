import React from 'react';
import PropTypes from 'prop-types';

const withUtils = () => (Component) => {
  const WithUtils = ({ pickerRef, ...other }, context) => {
    if (!context.muiPickersDateUtils) {
      // eslint-disable-next-line no-console
      console.error('Utils should be provided');
    }

    return <Component ref={pickerRef} utils={context.muiPickersDateUtils} {...other} />;
  };

  WithUtils.displayName = `WithUtils(${Component.displayName || Component.name})`;

  WithUtils.contextTypes = {
    muiPickersDateUtils: PropTypes.object,
  };

  WithUtils.propTypes = {
    pickerRef: PropTypes.func,
  };

  WithUtils.defaultProps = {
    pickerRef: undefined,
  };

  return WithUtils;
};

export default withUtils;
