import { WithStyles } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DateTextField, DateTextFieldProps } from '../../_shared/DateTextField';
import { shallow, utilsToUse } from '../test-utils';

describe('DateTextField', () => {
  let component: ShallowWrapper<DateTextFieldProps>;

  beforeEach(() => {
    component = shallow(
      <DateTextField
        value={utilsToUse.date()}
        utils={utilsToUse}
        format="dd/MM/yyyy"
        classes={{} as any}
        onChange={jest.fn()}
        onClick={jest.fn()}
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });

  it('Should disable the TextField when disabled is true', () => {
    component.setProps({ disabled: true });
    expect(component.find('TextField').props().disabled).toBe(true);
  });
});

describe('DateTextField keyboard mode', () => {
  let component: ShallowWrapper<DateTextFieldProps>;

  beforeEach(() => {
    component = shallow(
      <DateTextField
        value={utilsToUse.date()}
        utils={utilsToUse}
        format="dd/MM/yyyy"
        classes={{}}
        keyboard
        KeyboardButtonProps={{ 'aria-label': 'bar' }}
        clearable
        onClear={jest.fn()}
        onChange={jest.fn()}
        onClick={jest.fn()}
      />
    );
  });

  it('Should dispatch onClear if value is empty', () => {
    component.find('TextField').simulate('blur', {
      target: { value: '' },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });

    expect((component.instance().props as any).onClear).toHaveBeenCalled();
  });

  it('Should disable the IconButton and TextField when disabled and keyboard are true', () => {
    component.setProps({ disabled: true });

    expect(component.find('TextField').props().disabled).toBe(true);
    expect(
      component.find('TextField').prop<any>('InputProps').endAdornment.props.children.props.disabled
    ).toBe(true);
  });

  it('Should spread properties onto the InputAdornmentButton', () => {
    expect(
      component
        .render()
        .find('button')
        .attr('aria-label')
    ).toBe('bar');
  });
});

describe('DateTextField with custom TextField', () => {
  it('Should handle a component function', () => {
    function CustomTextField(props: any) {
      return <li {...props} />;
    }

    const component = shallow(
      <DateTextField
        value={utilsToUse.date()}
        utils={utilsToUse}
        classes={{}}
        TextFieldComponent={CustomTextField}
        format="dd/MM/yyyy"
        onChange={jest.fn()}
        onClick={jest.fn()}
      />
    );

    // Check InputProps to make sure DateTextField is passing props to the custom component
    expect(component.props().InputProps).toBeTruthy();
    expect(component.find('li')).toBeTruthy();
  });

  it('Should handle a component string', () => {
    const component = shallow(
      <DateTextField
        value={utilsToUse.date()}
        utils={utilsToUse}
        classes={{}}
        TextFieldComponent="li"
        format="dd/MM/yyyy"
        onChange={jest.fn()}
        onClick={jest.fn()}
      />
    );

    expect(component.props().InputProps).toBeTruthy();
    expect(component.find('li')).toBeTruthy();
  });

  it('Should not handle an element', () => {
    const mount = createMount();
    expect(() => {
      mount(
        <DateTextField
          classes={{}}
          value={utilsToUse.date()}
          utils={utilsToUse}
          TextFieldComponent={<div /> as any}
          format="dd/MM/yyyy"
          onChange={jest.fn()}
          onClick={jest.fn()}
        />
      );
    }).toThrow();
  });
});
