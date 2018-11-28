import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DatePickerInline, DatePickerInlineProps } from '../../DatePicker/DatePickerInline';
import { shallow, utilsToUse } from '../test-utils';

describe('DatePicker', () => {
  let component: ShallowWrapper<DatePickerInlineProps>;

  beforeEach(() => {
    component = shallow(
      <DatePickerInline value={utilsToUse.date('01-01-2017')} onChange={jest.fn()} />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
