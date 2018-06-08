import React from 'react';
import { MuiPickersContextConsumer } from '../utils/MuiPickersUtilsProvider';

const WithUtils = () => (Component) => {
  const withUtils = props => (
    <MuiPickersContextConsumer>
      {utils => <Component utils={utils} {...props} />}
    </MuiPickersContextConsumer>
  );

  withUtils.displayName = `WithUtils(${Component.displayName || Component.name})`;

  return withUtils;
};

export default WithUtils;

