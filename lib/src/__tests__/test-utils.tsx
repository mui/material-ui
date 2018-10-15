import * as enzyme from 'enzyme';
import * as React from 'react';
import { WithUtilsProps } from '../_shared/WithUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';
import DateFnsUtils from '../utils/date-fns-utils';
import LuxonUtils from '../utils/luxon-utils';
import MomentUtils from '../utils/moment-utils';

const getUtilToUse = (): Utils<MaterialUiPickersDate> => {
  switch (process.env.UTILS) {
    case 'moment':
      return new MomentUtils();
    case 'date-fns':
      return new DateFnsUtils();
    case 'luxon':
      return new LuxonUtils();
    default:
      return new DateFnsUtils();
  }
};

export const utilsToUse = getUtilToUse();

const getComponentWithUtils = <P extends WithUtilsProps>(
  element: React.ReactElement<P>
) => React.cloneElement(element, { utils: utilsToUse } as any);

export const shallow = <P extends WithUtilsProps>(
  element: React.ReactElement<P>
) => enzyme.shallow(getComponentWithUtils(element));

export const mount = <P extends WithUtilsProps>(
  element: React.ReactElement<P>
) => enzyme.mount(getComponentWithUtils(element));

export const shallowRender = (
  render: (props: any) => React.ReactElement<any>
) => {
  return enzyme.shallow(
    render({ utils: utilsToUse, classes: {} as any, theme: {} as any })
  );
};

jest.doMock('../_shared/WithUtils', () => {
  const WithUtils = () => (Component: React.ComponentType<WithUtilsProps>) => {
    const withUtils: React.SFC<any> = props => (
      <Component utils={utilsToUse} {...props} />
    );
    withUtils.displayName = `WithUtils(${Component.displayName ||
      Component.name})`;

    return withUtils;
  };

  return { default: WithUtils };
});
