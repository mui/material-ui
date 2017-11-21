import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';

import HourView from '../../src/TimePicker/HourView';

const date = moment();
describe('HourView', () => {
  let component;

  beforeEach(() => {
    component = shallow(<HourView date={date} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
