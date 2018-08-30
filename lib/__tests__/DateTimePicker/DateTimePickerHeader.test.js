import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { DateTimePickerHeader } from '../../src/DateTimePicker/components/DateTimePickerHeader';

describe('DateTimePickerHeader', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTimePickerHeader
      setMeridiemMode={() => jest.fn()}
      date={utilsToUse.date('01-01-2017')}
      classes={{}}
      theme={{}}
    />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
