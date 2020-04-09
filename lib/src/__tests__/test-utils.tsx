import * as React from 'react';
import * as enzyme from 'enzyme';
import LuxonUtils from '@date-io/luxon';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LocalizationProvider from '../LocalizationProvider';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

interface WithUtilsProps {
  utils: IUtils<MaterialUiPickersDate>;
}

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
export const utilsToUse: IUtils<MaterialUiPickersDate> = new UtilClassToUse();

const getComponentWithUtils = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  React.cloneElement(element, { utils: utilsToUse } as any);

export const shallow = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  enzyme.shallow(getComponentWithUtils(element));

export const mount = <P extends WithUtilsProps>(element: React.ReactElement<P>) =>
  enzyme.mount(
    <ThemeProvider theme={createMuiTheme()}>
      <LocalizationProvider dateAdapter={UtilClassToUse}>{element}</LocalizationProvider>
    </ThemeProvider>
  );

export const shallowRender = (render: (props: any) => React.ReactElement<any>) => {
  return enzyme.shallow(render({ utils: utilsToUse, classes: {} as any, theme: {} as any }));
};

// toHaveBeenCalledWith doesn't work with moment because of changing some internal props
export const toHaveBeenCalledExceptMoment = (mock: jest.Mock<any, any>, params: any[]) => {
  if (process.env.UTILS === 'moment') {
    return expect(mock).toHaveBeenCalled();
  }

  return expect(mock).toHaveBeenCalledWith(...params);
};
