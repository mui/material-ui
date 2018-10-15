import React from 'react';
import { ModalDialog } from '../../_shared/ModalDialog';
import { shallow } from '../test-utils';

const initialProps = {
  onAccept: jest.fn(),
  onDismiss: jest.fn(),
  onClear: jest.fn(),
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
  clearable: false,
  todayLabel: 'Today',
  showTodayButton: false,
  onSetToday: jest.fn(),
  classes: {},
  children: 'Test',
};

describe('ModalDialog', () => {
  let component;
  const props = { ...initialProps };

  beforeEach(() => {
    component = shallow(<ModalDialog {...props} />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });

  it('Should render dialog content', () => {
    expect(component.find('WithStyles(DialogContent)').props().children).toBe(
      props.children
    );
  });

  it('Should render dialog actions with 2 buttons', () => {
    expect(component.find('WithStyles(DialogActions)').length).toBe(1);
    expect(
      component
        .find('WithStyles(Button)')
        .at(0)
        .props().children
    ).toBe('Cancel');
    expect(
      component
        .find('WithStyles(Button)')
        .at(1)
        .props().children
    ).toBe('OK');
  });

  it('Should handle on OK button click', () => {
    component
      .find('WithStyles(Button)')
      .at(1)
      .simulate('click');
    expect(props.onAccept).toHaveBeenCalled();
  });

  it('Should handle on Cancel button click', () => {
    component
      .find('WithStyles(Button)')
      .at(0)
      .simulate('click');
    expect(props.onDismiss).toHaveBeenCalled();
  });
});

describe('ModalDialog with Clear Button', () => {
  let component;
  const props = {
    ...initialProps,
    clearable: true,
  };

  beforeEach(() => {
    component = shallow(<ModalDialog {...props} />);
  });

  it('Should handle on Clear button click', () => {
    component
      .find('WithStyles(Button)')
      .at(0)
      .simulate('click');
    expect(props.onClear).toHaveBeenCalled();
  });
});

describe('ModalDialog with Today Button', () => {
  let component;
  const props = {
    ...initialProps,
    showTodayButton: true,
  };

  beforeEach(() => {
    component = shallow(<ModalDialog {...props} />);
  });

  it('Should handle on Clear button click', () => {
    component
      .find('WithStyles(Button)')
      .at(0)
      .simulate('click');
    expect(props.onSetToday).toHaveBeenCalled();
  });
});
