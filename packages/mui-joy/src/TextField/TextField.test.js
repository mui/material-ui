import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformance, createRenderer, act, fireEvent } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import TextField, { textFieldClasses as classes } from '@mui/joy/TextField';
import { inputClasses } from '@mui/joy/Input';
import { formHelperTextClasses } from '@mui/joy/FormHelperText';

describe('Joy <TextField />', () => {
  const { render } = createRenderer();

  describeConformance(<TextField />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyTextField',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<TextField />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<TextField className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should provide proper id to elements', () => {
    const { container, getByRole } = render(
      <TextField id="textfield" label="Label" helperText="Helper text" />,
    );
    expect(getByRole('textbox')).to.have.attribute('id', 'textfield');
    expect(container.querySelector('label')).to.have.attribute('id', 'textfield-label');
    expect(container.querySelector(`.${formHelperTextClasses.root}`)).to.have.attribute(
      'id',
      'textfield-helper-text',
    );
  });

  it('should have configurable variant', () => {
    const { container, rerender } = render(<TextField />);
    expect(container.firstChild).to.have.class(classes.variantOutlined); // default variant

    rerender(<TextField variant="soft" />);
    expect(container.firstChild).to.have.class(classes.variantSoft);
    expect(container.querySelector(`.${inputClasses.wrapper}`)).to.have.class(
      inputClasses.variantSoft,
    );
  });

  it('should have configurable size', () => {
    const { container, rerender } = render(<TextField />);
    expect(container.firstChild).to.have.class(classes.sizeMd); // default variant

    rerender(<TextField size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
    expect(container.querySelector(`.${inputClasses.wrapper}`)).to.have.class(inputClasses.sizeSm);
  });

  it('should have configurable color', () => {
    const { container } = render(<TextField color="primary" />);

    expect(container.firstChild).to.have.class(classes.colorPrimary);
    expect(container.querySelector(`.${inputClasses.wrapper}`)).to.have.class(
      inputClasses.colorPrimary,
    );
  });

  it('should pass `type` to Input', () => {
    const { getByLabelText } = render(<TextField label="password" type="password" />);

    expect(getByLabelText(/password/)).to.have.attribute('type', 'password');
  });

  it('should pass `name` to Input', () => {
    const { getByRole } = render(<TextField name="username" />);

    expect(getByRole('textbox')).to.have.attribute('name', 'username');
  });

  it('should be error', () => {
    const { container } = render(<TextField error />);

    expect(container.firstChild).to.have.class(classes.error);
    expect(container.querySelector(`.${inputClasses.wrapper}`)).to.have.class(inputClasses.error);
  });

  it('should be disabled', () => {
    const { container } = render(<TextField disabled />);

    expect(container.firstChild).to.have.class(classes.disabled);
    expect(container.querySelector(`.${inputClasses.wrapper}`)).to.have.class(
      inputClasses.disabled,
    );
  });

  it('should have fullWidth classes', () => {
    const { container } = render(<TextField fullWidth />);

    expect(container.firstChild).to.have.class(classes.fullWidth);
    expect(container.querySelector(`.${inputClasses.wrapper}`)).to.have.class(
      inputClasses.fullWidth,
    );
  });

  it('should show asterisk if required', () => {
    const { getByRole, container } = render(
      <TextField required label={<div data-testid="label">label</div>} />,
    );

    expect(container.querySelector(`label`)).to.have.text('label\u2009*');
    expect(getByRole('textbox')).to.have.attribute('required');
  });

  it('should accept defaultValue', () => {
    const { getByRole } = render(<TextField defaultValue="foo" />);
    expect(getByRole('textbox')).to.have.value('foo');
  });

  it('should pass value and handler props to Input', () => {
    const handleChange = spy();
    const handleFocus = spy();
    const handleBlur = spy();
    const handleKeyUp = spy();
    const handleKeyDown = spy();
    const { getByRole } = render(
      <TextField
        componentsProps={{
          input: {
            onKeyUp: handleKeyUp,
            onKeyDown: handleKeyDown,
          },
        }}
        value="bar"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
    );
    const input = getByRole('textbox');

    expect(input).to.have.value('bar');

    act(() => {
      input.focus();
    });
    expect(handleFocus.callCount).to.equal(1);

    fireEvent.keyDown(input, { key: 'a' });
    expect(handleKeyDown.callCount).to.equal(1);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleChange.callCount).to.equal(1);

    fireEvent.keyUp(input, { key: 'a' });
    expect(handleKeyUp.callCount).to.equal(1);

    act(() => {
      input.blur();
    });
    expect(handleBlur.callCount).to.equal(1);
  });

  it('should accept startDecorator', () => {
    const { getByText } = render(<TextField startDecorator="foo" />);
    expect(getByText('foo')).toBeVisible();
  });

  it('should accept endDecorator', () => {
    const { getByText } = render(<TextField endDecorator="bar" />);
    expect(getByText('bar')).toBeVisible();
  });
});
