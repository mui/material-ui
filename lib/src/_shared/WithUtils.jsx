import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersContextConsumer } from '../utils/MuiPickersUtilsProvider';

const withUtils = () => (Component) => {
  const WithUtils = ({ pickerRef, ...other }) => (
    <MuiPickersContextConsumer>
      {utils => <Component ref={pickerRef} utils={utils} {...other} />}
    </MuiPickersContextConsumer>
  );

  WithUtils.displayName = `WithUtils(${Component.displayName || Component.name})`;

  WithUtils.propTypes = {
    pickerRef: PropTypes.func,
  };

  WithUtils.defaultProps = {
    pickerRef: undefined,
  };

  return WithUtils;
};

export default withUtils;
