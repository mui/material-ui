import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import PickerToolbar, { PickerToolbarProps } from '../../_shared/PickerToolbar';
import { shallow } from '../test-utils';

describe('PickerToolbar', () => {
  let component: ShallowWrapper<PickerToolbarProps>;

  beforeEach(() => {
    component = shallow(<PickerToolbar children={['foo']} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
