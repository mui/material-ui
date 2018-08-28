import React from 'react';
import { shallow } from '../test-utils';
import { DateTimePickerModal } from '../../src/DateTimePicker/DateTimePickerModal';

describe('DateTimePickerModal', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerModal classes={{}} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
