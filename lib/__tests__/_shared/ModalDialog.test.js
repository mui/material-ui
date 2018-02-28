import React from 'react';
import { shallow } from '../test-utils';
import ModalDialog from '../../src/_shared/ModalDialog';

describe('ModalDialog', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ModalDialog />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
