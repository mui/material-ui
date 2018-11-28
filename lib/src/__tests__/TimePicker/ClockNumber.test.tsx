import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { ClockNumber, ClockNumberProps } from '../../TimePicker/components/ClockNumber';
import { shallow } from '../test-utils';

describe('ClockNumber', () => {
  let component: ShallowWrapper<ClockNumberProps>;

  beforeEach(() => {
    component = shallow(<ClockNumber classes={{} as any} index={0} label="foo" selected />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
