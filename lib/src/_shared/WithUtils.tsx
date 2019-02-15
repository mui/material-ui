import { IUtils } from '@date-io/core/IUtils';
import { Omit } from '@material-ui/core';
import * as React from 'react';
import { MuiPickersContext } from '../MuiPickersUtilsProvider';
import { MaterialUiPickersDate } from '../typings/date';

export interface WithUtilsProps {
  utils: IUtils<MaterialUiPickersDate>;
}

export const checkUtils = (utils: IUtils<MaterialUiPickersDate> | null | undefined) => {
  if (!utils) {
    // tslint:disable-next-line
    throw new Error(
      'Can not find utils in context. You either a) forgot to wrap your component tree in MuiPickersUtilsProvider; or b) mixed named and direct file imports.  Recommendation: use named imports from the module index.'
    );
  }
};

export const withUtils = () => <P extends WithUtilsProps>(Component: React.ComponentType<P>) => {
  const WithUtils: React.SFC<Omit<P, keyof WithUtilsProps>> = props => (
    <MuiPickersContext.Consumer>
      {utils => {
        checkUtils(utils);
        return <Component utils={utils} {...props as any} />;
      }}
    </MuiPickersContext.Consumer>
  );

  WithUtils.displayName = `WithUtils(${Component.displayName || Component.name})`;

  return WithUtils;
};
