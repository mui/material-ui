import React from 'react';
import * as enzyme from 'enzyme';
import DateFnsUtils from '../src/utils/date-fns-utils';
import MomentUtils from '../src/utils/moment-utils';
import LuxonUtils from '../src/utils/luxon-utils';

const getUtilToUse = () => {
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

const getComponentWithUtils = Component => React.cloneElement(Component, { utils: utilsToUse });

export const shallow = Component => enzyme.shallow(getComponentWithUtils(Component));

export const mount = Component => enzyme.mount(getComponentWithUtils(Component));
