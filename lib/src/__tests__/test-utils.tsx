import * as React from 'react';
import * as enzyme from 'enzyme';
import LuxonUtils from '@date-io/luxon';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from '../MuiPickersUtilsProvider';
import { createMuiTheme } from '@material-ui/core';
// @ts-ignore
import { MuiThemeProvider } from '@material-ui/core';
import { WithUtilsProps } from '../_shared/WithUtils';

const theme = createMuiTheme({});

const getUtilClass = () => {
  switch (process.env.UTILS) {
    case 'moment':
      return MomentUtils;
    case 'date-fns':
      return DateFnsUtils;
    case 'luxon':
      return LuxonUtils;
    default:
      return DateFnsUtils;
  }
};

export const UtilClassToUse: any = getUtilClass();
export const utilsToUse = new UtilClassToUse();

const getComponentWithUtils = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  React.cloneElement(element, { utils: utilsToUse } as any);

export const shallow = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  enzyme.shallow(getComponentWithUtils(element));

export const mount = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  enzyme.mount(
    <MuiPickersUtilsProvider utils={UtilClassToUse}>
      <MuiThemeProvider theme={theme}>{element}</MuiThemeProvider>
    </MuiPickersUtilsProvider>
  );

export const shallowRender = (render: (props: any) => React.ReactElement<any>) => {
  return enzyme.shallow(render({ utils: utilsToUse, classes: {} as any, theme: {} as any }));
};
