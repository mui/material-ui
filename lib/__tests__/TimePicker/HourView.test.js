import React from 'react';
import moment from 'moment';
import { shallow } from '../test-utils';

import { HourView } from '../../src/TimePicker/HourView';

const date = moment();
describe('HourView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<HourView date={date} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
