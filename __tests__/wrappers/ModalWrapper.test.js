import React from 'react';
import { shallow } from 'enzyme';
import ModalWrapper from '../../src/wrappers/ModalWrapper';

describe('ModalWrapper', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ModalWrapper value={new Date()} />);
  });

  it('Should renders', () => {
    console.log(component.debug()); // TODO REMOVE ME
    expect(component).toBeTruthy();
  });
});
