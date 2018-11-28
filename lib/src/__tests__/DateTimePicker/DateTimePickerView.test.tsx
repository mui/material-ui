import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import {
  DateTimePickerView,
  DateTimePickerViewProps,
} from '../../DateTimePicker/components/DateTimePickerView';
import { shallow } from '../test-utils';

describe('DateTimePickerView', () => {
  let component: ShallowWrapper<DateTimePickerViewProps>;

  beforeEach(() => {
    component = shallow(<DateTimePickerView selected={true}>foo</DateTimePickerView>);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
