import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersContextConsumer } from '../utils/MuiPickersUtilsProvider';

const WithUtils = () => (Component) => {
  const withUtils = ({ pickerRef, ...props }) => (
    <MuiPickersContextConsumer>
      {utils => <Component ref={pickerRef} utils={utils} {...props} />}
    </MuiPickersContextConsumer>
  );

  withUtils.displayName = `WithUtils(${Component.displayName || Component.name})`;

  withUtils.propTypes = {
    pickerRef: PropTypes.func,
  };

  withUtils.defaultProps = {
    pickerRef: undefined,
  };

  return withUtils;
};

export default WithUtils;

