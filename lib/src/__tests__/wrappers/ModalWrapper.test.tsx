import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { ModalDialog } from '../../_shared/ModalDialog';
import ModalWrapper, { ModalWrapperProps } from '../../wrappers/ModalWrapper';
import { shallow } from '../test-utils';

describe('ModalWrapper', () => {
  let component: ShallowWrapper<ModalWrapperProps>;

  beforeEach(() => {
    component = shallow(
      <ModalWrapper
        value={new Date()}
        onOpen={jest.fn()}
        onClose={jest.fn()}
        onDismiss={jest.fn()}
        onAccept={jest.fn()}
        onClear={jest.fn()}
        onChange={jest.fn()}
        format="mm dd"
      >
        <div>foo</div>
      </ModalWrapper>
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should dispatch onOpen callback', () => {
    component.find('WithUtils(DateTextField)').simulate('click');
    expect((component.state() as ModalDialog).open).toBeTruthy();
    expect((component.instance() as ModalDialog).props.onOpen).toHaveBeenCalled();
  });

  it('Should dispatch onClose callback', () => {
    component.setState({ open: true });
    component.find('WithStyles(ModalDialog)').simulate('dismiss');
    expect((component.state() as ModalDialog).open).toBeFalsy();
    expect((component.instance() as ModalDialog).props.onClose).toHaveBeenCalled();
  });

  it('Should dispatch onAccept when accepted', () => {
    component.setState({ open: true });
    component.find('WithStyles(ModalDialog)').simulate('accept');
    expect((component.state() as ModalDialog).open).toBeFalsy();
    expect((component.instance() as ModalDialog).props.onAccept).toHaveBeenCalled();
  });

  it('Should dispatch onClear', () => {
    component.setState({ open: true });
    component.find('WithStyles(ModalDialog)').simulate('clear');
    expect((component.state() as ModalDialog).open).toBeFalsy();
    expect((component.instance() as ModalDialog).props.onClear).toHaveBeenCalled();
  });
});
