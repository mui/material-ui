import * as React from 'react';
import { ShallowWrapper } from 'enzyme';
import { shallow } from '../test-utils';
import { ModalDialog, ModalDialogProps } from '../../_shared/ModalDialog';

const initialProps = {
  onAccept: jest.fn(),
  onDismiss: jest.fn(),
  onClear: jest.fn(),
  onKeyDownInner: jest.fn(),
  okLabel: 'OK',
  open: false,
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
  clearable: false,
  todayLabel: 'Today',
  showTodayButton: false,
  onSetToday: jest.fn(),
  children: 'Test',
  classes: {} as any,
};

describe('ModalDialog', () => {
  let component: ShallowWrapper<ModalDialogProps>;
  const props = { ...initialProps };

  beforeEach(() => {
    component = shallow(<ModalDialog {...props} />);
  });

  it('Should render dialog content', () => {
    expect(component.find('WithStyles(ForwardRef(DialogContent))').props().children).toBe(
      props.children
    );
  });

  it('Should render dialog actions with 2 buttons', () => {
    expect(component.find('WithStyles(ForwardRef(DialogActions))').length).toBe(1);
    expect(
      component
        .find('WithStyles(ForwardRef(Button))')
        .at(0)
        .props().children
    ).toBe('Cancel');

    expect(
      component
        .find('WithStyles(ForwardRef(Button))')
        .at(1)
        .props().children
    ).toBe('OK');
  });

  it('Should handle on OK button click', () => {
    component
      .find('WithStyles(ForwardRef(Button))')
      .at(1)
      .simulate('click');
    expect(props.onAccept).toHaveBeenCalled();
  });

  it('Should handle on Cancel button click', () => {
    component
      .find('WithStyles(ForwardRef(Button))')
      .at(0)
      .simulate('click');
    expect(props.onDismiss).toHaveBeenCalled();
  });
});

describe('ModalDialog with Clear Button', () => {
  let component: ShallowWrapper<ModalDialogProps>;
  const props = {
    ...initialProps,
    clearable: true,
  };

  beforeEach(() => {
    component = shallow(<ModalDialog {...props} />);
  });

  it('Should handle on Clear button click', () => {
    component
      .find('WithStyles(ForwardRef(Button))')
      .at(0)
      .simulate('click');
    expect(props.onClear).toHaveBeenCalled();
  });
});

describe('ModalDialog with Today Button', () => {
  let component: ShallowWrapper<ModalDialogProps>;
  const props = {
    ...initialProps,
    showTodayButton: true,
  };

  beforeEach(() => {
    component = shallow(<ModalDialog {...props} />);
  });

  it('Should handle on Clear button click', () => {
    component
      .find('WithStyles(ForwardRef(Button))')
      .at(0)
      .simulate('click');
    expect(props.onSetToday).toHaveBeenCalled();
  });
});
