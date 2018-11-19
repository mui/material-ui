import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import {
  DateTimePickerHeader,
  DateTimePickerHeaderProps,
} from '../../DateTimePicker/components/DateTimePickerHeader';
import { shallow, utilsToUse } from '../test-utils';

describe('DateTimePickerHeader', () => {
  let component: ShallowWrapper<DateTimePickerHeaderProps>;

  beforeEach(() => {
    component = shallow(
      <DateTimePickerHeader
        setMeridiemMode={() => jest.fn()}
        date={utilsToUse.date('01-01-2017')}
        classes={{} as any}
        meridiemMode="am"
        openView="year"
        onOpenViewChange={jest.fn()}
        utils={utilsToUse}
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
