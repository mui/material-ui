import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { ClockPointer, ClockPointerProps } from '../../TimePicker/components/ClockPointer';
import { shallow } from '../test-utils';

describe('ClockPointer', () => {
  let component: ShallowWrapper<ClockPointerProps>;

  beforeEach(() => {
    component = shallow(
      <ClockPointer classes={{} as any} value={1} hasSelected isInner type="hours" />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
