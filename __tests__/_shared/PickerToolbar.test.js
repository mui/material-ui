import React from 'react';
import { shallow } from 'enzyme';
import PickerToolbar from '../../src/_shared/PickerToolbar';

describe('PickerToolbar', () => {
  let component;

  beforeEach(() => {
    component = shallow(<PickerToolbar />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
