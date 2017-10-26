import React from 'react';
import { shallow } from 'enzyme';
import DatePickerModal from '../../src/DatePicker/DatePickerModal';

describe('DatePickerModal', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DatePickerModal />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
