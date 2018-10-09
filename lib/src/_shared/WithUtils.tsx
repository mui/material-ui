import { Omit } from '@material-ui/core';
import * as React from 'react';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';
import { MuiPickersContextConsumer } from '../utils/MuiPickersUtilsProvider';

export interface WithUtilsProps {
  utils: Utils<MaterialUiPickersDate>;
}

type Subtract<T, K> = Omit<T, keyof K>;

const WithUtils = () => <P extends WithUtilsProps>(
  Component: React.ComponentType<P>
) => {
  const withUtils: React.SFC<Subtract<P, WithUtilsProps>> = props => (
    <MuiPickersContextConsumer>
      {utils => <Component utils={utils} {...props} />}
    </MuiPickersContextConsumer>
  );

  withUtils.displayName = `WithUtils(${Component.displayName ||
    Component.name})`;

  return withUtils;
};

export default WithUtils;
