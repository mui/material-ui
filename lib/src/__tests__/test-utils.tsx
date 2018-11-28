import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import MomentUtils from '@date-io/moment';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import * as enzyme from 'enzyme';
import * as React from 'react';
import { WithUtilsProps } from '../_shared/WithUtils';
import MuiPickersUtilsProvider from '../MuiPickersUtilsProvider';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

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

// jest.doMock('../_shared/WithUtils', () => {
//   const WithUtils = () => (Component: React.ComponentType<WithUtilsProps>) => {
//     const withUtils: React.SFC<any> = props => (
//       <Component utils={utilsToUse} {...props} />
//     );
//     withUtils.displayName = `WithUtils(${Component.displayName ||
//     Component.name})`;
//
//     return withUtils;
//   };
//
//   return { default: WithUtils };
// });

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
