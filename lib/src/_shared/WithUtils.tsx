import { Omit } from '@material-ui/core';
import * as React from 'react';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';
import { MuiPickersContextConsumer } from '../utils/MuiPickersUtilsProvider';

export interface WithUtilsProps {
  utils: Utils<MaterialUiPickersDate>;
}

type Subtract<T, K> = Omit<T, keyof K>;

const checkUtils = (utils: Utils<any> | null) => {
  if (!utils) {
    // tslint:disable-next-line
    throw new Error(
      'Can not find utils in context. You likely forgot to wrap your component tree in MuiPickersUtilsProvider or mixed imports from core module and paths.'
    );
  }
};

const WithUtils = () => <P extends WithUtilsProps>(
  Component: React.ComponentType<P>
) => {
  const withUtils: React.SFC<Subtract<P, WithUtilsProps>> = props => (
    <MuiPickersContextConsumer>
      {utils => {
        checkUtils(utils);
        return <Component utils={utils} {...props} />;
      }}
    </MuiPickersContextConsumer>
  );

  withUtils.displayName = `WithUtils(${Component.displayName ||
    Component.name})`;

  return withUtils;
};

export default WithUtils;
