import React from 'react';
import * as enzyme from 'enzyme';
import DateFnsUtils from '../src/utils/date-fns-utils';
import MomentUtils from '../src/utils/moment-utils';

export const utilsToUse = process.env.UTILS === 'moment'
  ? new MomentUtils()
  : new DateFnsUtils();

const getComponentWithUtils = Component => React.cloneElement(Component, { utils: utilsToUse });

export const shallow = Component => enzyme.shallow(getComponentWithUtils(Component));

export const mount = Component => enzyme.mount(getComponentWithUtils(Component));
