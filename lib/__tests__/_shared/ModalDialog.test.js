import React from 'react';
import { shallow } from 'enzyme';
import ModalDialog from '../../src/_shared/ModalDialog';

describe('ModalDialog', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ModalDialog />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
