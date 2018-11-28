import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DateTimePicker, DateTimePickerProps } from '../../DateTimePicker/DateTimePicker';
import { shallow, utilsToUse } from '../test-utils';

describe('DateTimePicker', () => {
  let component: ShallowWrapper<DateTimePickerProps>;

  beforeEach(() => {
    component = shallow(
      <DateTimePicker
        date={utilsToUse.date('01-01-2017')}
        classes={{} as any}
        utils={utilsToUse}
        onChange={jest.fn()}
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
