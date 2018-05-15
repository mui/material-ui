import React from 'react';
import { MuiPickersContextConsumer } from '../utils/MuiPickersUtilsProvider';

const WithUtils = () => (Component) => {
  const withUtils = React.forwardRef((props, ref) => (
    <MuiPickersContextConsumer>
      {utils => <Component ref={ref} utils={utils} {...props} />}
    </MuiPickersContextConsumer>
  ));

  withUtils.displayName = `WithUtils(${Component.displayName || Component.name})`;
  return withUtils;
};

export default WithUtils;

