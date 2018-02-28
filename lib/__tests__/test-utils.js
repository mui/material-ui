import React from 'react';
import * as enzyme from 'enzyme';
import dateFnsUtils from '../src/utils/date-fns-utils';
import momentUtils from '../src/utils/moment-utils';

export const utilsToUse = process.env.UTILS === 'moment'
  ? momentUtils
  : dateFnsUtils;

const getComponentWithUtils = Component => React.cloneElement(Component, { utils: utilsToUse });

export const shallow = Component => enzyme.shallow(getComponentWithUtils(Component));

export const mount = Component => enzyme.mount(getComponentWithUtils(Component));
