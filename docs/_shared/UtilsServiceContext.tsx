import React from 'react';
import { Omit } from '@material-ui/core';
import { UtilsService, createUtilsService } from '../utils/utilsService';

export const UtilsContext = React.createContext<UtilsService>(createUtilsService('date-fns'));

export const withUtilsService = <P extends UtilsService>(Component: React.ComponentType<P>) => {
  const withUtilsService: React.SFC<Omit<P, keyof UtilsService>> = props => (
    <UtilsContext.Consumer>
      {service => <Component {...service} {...props as any} />}
    </UtilsContext.Consumer>
  );

  withUtilsService.displayName = `withUtilsService(${Component.displayName || Component.name})`;

  return withUtilsService;
};
