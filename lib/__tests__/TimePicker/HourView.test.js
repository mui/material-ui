import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { HourView } from '../../src/TimePicker/HourView';

const date = utilsToUse.date();
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
