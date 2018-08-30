import React from 'react';
import { shallow } from '../test-utils';
import { TimePickerModal } from '../../src/TimePicker/TimePickerModal';

describe('TimePickerModal', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TimePickerModal />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
