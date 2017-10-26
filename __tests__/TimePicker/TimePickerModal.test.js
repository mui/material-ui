import React from 'react';
import { shallow } from 'enzyme';
import TimePickerModal from '../../src/TimePicker/TimePickerModal';

describe('TimePickerModal', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TimePickerModal />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
