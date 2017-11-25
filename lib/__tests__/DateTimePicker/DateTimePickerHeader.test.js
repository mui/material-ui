import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { DateTimePickerHeader } from '../../src/DateTimePicker/DateTimePickerHeader';

describe('DateTimePickerHeader', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerHeader
      setMeridiemMode={() => jest.fn()}
      date={moment('01-01-2017')}
      classes={{}}
      theme={{}}
    />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
