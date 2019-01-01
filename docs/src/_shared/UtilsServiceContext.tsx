import React from 'react';
import { UtilsService, createUtilsService } from '../utils/utilsService';
import { Omit } from '@material-ui/core';

export const { Provider: UtilsServiceContextProvider, Consumer } = React.createContext<
  UtilsService
>(createUtilsService('date-fns'));

export const withUtilsService = <P extends UtilsService>(Component: React.ComponentType<P>) => {
  const withUtilsService: React.SFC<Omit<P, keyof UtilsService>> = props => (
    <Consumer>{service => <Component {...service} {...props as any} />}</Consumer>
  );

  withUtilsService.displayName = `withUtilsService(${Component.displayName || Component.name})`;

  return withUtilsService;
};
