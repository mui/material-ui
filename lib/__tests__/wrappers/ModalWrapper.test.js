import React from 'react';
import { shallow } from '../test-utils';
import ModalWrapper from '../../src/wrappers/ModalWrapper';

describe('ModalWrapper', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ModalWrapper value={new Date()} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
