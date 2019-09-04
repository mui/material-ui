import * as React from 'react';
import { Omit } from '../_helpers/utils';
import { useUtils } from './hooks/useUtils';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../typings/date';

export interface WithUtilsProps {
  utils: IUtils<MaterialUiPickersDate>;
}

export const withUtils = () => <P extends WithUtilsProps>(Component: React.ComponentType<P>) => {
  const WithUtils: React.SFC<Omit<P, keyof WithUtilsProps>> = props => {
    const utils = useUtils();
    return <Component utils={utils} {...(props as any)} />;
  };

  WithUtils.displayName = `WithUtils(${Component.displayName || Component.name})`;
  return WithUtils;
};
