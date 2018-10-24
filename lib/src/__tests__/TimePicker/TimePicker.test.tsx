import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { TimePicker, TimePickerProps } from '../../TimePicker/TimePicker';
import { shallow, utilsToUse } from '../test-utils';

describe('TimePicker', () => {
  let component: ShallowWrapper<TimePickerProps>;

  beforeEach(() => {
    component = shallow(
      <TimePicker
        classes={{} as any}
        theme={{} as any}
        date={utilsToUse.date('01-01-2017 12:00')}
        onChange={jest.fn()}
        utils={utilsToUse}
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
