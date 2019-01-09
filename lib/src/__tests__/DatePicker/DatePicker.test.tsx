import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DatePicker, DatePickerProps } from '../../DatePicker/DatePicker';
import { shallow, utilsToUse } from '../test-utils';

describe('DatePicker', () => {
  let component: ShallowWrapper<DatePickerProps>;

  beforeEach(() => {
    component = shallow(
      <DatePicker date={utilsToUse.date('01-01-2017')} utils={utilsToUse} onChange={jest.fn()} />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
