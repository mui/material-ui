import React from 'react';
import { shallow } from '../test-utils';
import PickerToolbar from '../../src/_shared/PickerToolbar';

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
