import React from 'react';
import { shallow } from '../test-utils';
import ModalWrapper from '../../wrappers/ModalWrapper';

describe('ModalWrapper', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <ModalWrapper
        value={new Date()}
        onOpen={jest.fn()}
        onClose={jest.fn()}
        onDismiss={jest.fn()}
        onAccept={jest.fn()}
        onClear={jest.fn()}
      />,
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should dispatch onOpen callback', () => {
    component.find('WithUtils(DateTextField)').simulate('click');
    expect(component.state().open).toBeTruthy();
    expect(component.instance().props.onOpen).toHaveBeenCalled();
  });

  it('Should dispatch onClose callback', () => {
    component.setState({ open: true });
    component.find('WithStyles(ModalDialog)').simulate('dismiss');
    expect(component.state().open).toBeFalsy();
    expect(component.instance().props.onClose).toHaveBeenCalled();
  });

  it('Should dispatch onAccept when accepted', () => {
    component.setState({ open: true });
    component.find('WithStyles(ModalDialog)').simulate('accept');
    expect(component.state().open).toBeFalsy();
    expect(component.instance().props.onAccept).toHaveBeenCalled();
  });

  it('Should dispatch onClear', () => {
    component.setState({ open: true });
    component.find('WithStyles(ModalDialog)').simulate('clear');
    expect(component.state().open).toBeFalsy();
    expect(component.instance().props.onClear).toHaveBeenCalled();
  });
});
