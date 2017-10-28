import React from 'react';
import { shallow } from 'enzyme';
import DateTimePickerModal from '../../src/DateTimePicker/DateTimePickerModal';

describe('DateTimePickerModal', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerModal />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
