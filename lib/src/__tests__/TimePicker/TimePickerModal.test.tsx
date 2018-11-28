import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { TimePickerModal, TimePickerModalProps } from '../../TimePicker/TimePickerModal';
import { shallow } from '../test-utils';

describe('TimePickerModal', () => {
  let component: ShallowWrapper<TimePickerModalProps>;

  beforeEach(() => {
    component = shallow(<TimePickerModal value={null} onChange={jest.fn()} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
