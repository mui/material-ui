import React from 'react';
import PickerToolbar from '../../_shared/PickerToolbar';
import { shallow } from '../test-utils';

describe('PickerToolbar', () => {
  let component;

  beforeEach(() => {
    component = shallow(<PickerToolbar />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
