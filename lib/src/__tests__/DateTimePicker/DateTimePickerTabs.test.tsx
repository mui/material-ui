import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import {
  DateTimePickerTabs,
  DateTimePickerTabsProps,
} from '../../DateTimePicker/components/DateTimePickerTabs';
import { shallow } from '../test-utils';

describe('DateTimePickerTabs', () => {
  let component: ShallowWrapper<DateTimePickerTabsProps>;

  beforeEach(() => {
    component = shallow(
      <DateTimePickerTabs
        theme={{ palette: { type: 'light' } } as any}
        classes={{} as any}
        view="date"
        onChange={jest.fn()}
        dateRangeIcon="foo"
        timeIcon="bar"
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
