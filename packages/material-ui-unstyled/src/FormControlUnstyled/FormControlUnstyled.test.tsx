import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  createClientRender,
  describeConformanceUnstyled,
  fireEvent,
} from 'test/utils';
import FormControlUnstyled, {
  formControlUnstyledClasses,
  useFormControlUnstyled,
} from '@material-ui/unstyled/FormControlUnstyled';

function TestComponent() {
  const context = useFormControlUnstyled();

  const inputProps = {
    'data-filled': context?.filled,
    'data-focused': context?.focused,
    disabled: context?.disabled,
    onChange: context?.onChange,
    required: context?.required,
    value: context?.value as any,
  };

  return <input {...inputProps} />;
}

describe('<FormControlUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceUnstyled(<FormControlUnstyled />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiFormControl',
    slots: {
      root: {
        expectedClassName: formControlUnstyledClasses.root,
      },
    },
  }));

  describe('initial state', () => {
    it('has undefined value', () => {
      const { getByRole } = render(
        <FormControlUnstyled>
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox')).to.have.property('value', '');
    });

    it('has disabled, filled, focused, and required set to false', () => {
      const { getByRole } = render(
        <FormControlUnstyled>
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox')).to.include({
        disabled: false,
        required: false,
      });

      expect(getByRole('textbox').dataset).to.include({
        filled: 'false',
        focused: 'false',
      });
    });
  });

  describe('prop: value', () => {
    it('propagates the value via the context', () => {
      const { getByRole } = render(
        <FormControlUnstyled value="42">
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox')).to.have.property('value', '42');
    });
  });

  describe('prop: disabled', () => {
    it('propagates the value via the context', () => {
      const { getByRole } = render(
        <FormControlUnstyled disabled>
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox')).to.have.property('disabled', true);
    });
  });

  describe('prop: defaultValue', () => {
    it('propagates the value via the context', () => {
      const { getByRole } = render(
        <FormControlUnstyled defaultValue="foo">
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox')).to.have.property('value', 'foo');
    });
  });

  describe('prop: focused', () => {
    it('propagates the value via the context', () => {
      const { getByRole } = render(
        <FormControlUnstyled focused>
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox').dataset).to.have.property('focused', 'true');
    });

    it('ignores focused when disabled', () => {
      const { getByRole } = render(
        <FormControlUnstyled focused disabled>
          <TestComponent />
        </FormControlUnstyled>,
      );
      expect(getByRole('textbox')).to.have.property('disabled', true);
      expect(getByRole('textbox').dataset).to.have.property('focused', 'false');
    });
  });

  describe('prop: required', () => {
    it('propagates the value via the context', () => {
      const { getByRole } = render(
        <FormControlUnstyled required>
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox')).to.have.property('required', true);
    });
  });

  describe('prop: filled', () => {
    it('should be set if value is provided', () => {
      const { getByRole } = render(
        <FormControlUnstyled value="foo">
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox').dataset).to.have.property('filled', 'true');
    });

    it('should be set if defaultValue is provided', () => {
      const { getByRole } = render(
        <FormControlUnstyled defaultValue="foo">
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox').dataset).to.have.property('filled', 'true');
    });

    it('should be set if a controlled inner input sets its value', () => {
      const { getByRole } = render(
        <FormControlUnstyled>
          <TestComponent />
        </FormControlUnstyled>,
      );

      const input = getByRole('textbox');
      fireEvent.change(input, { target: { value: 'a' } });

      expect(input.dataset).to.have.property('filled', 'true');
    });
  });

  describe('prop: onChange', () => {
    it("propagates the inner input's onChange to FormControlUnstyled's onChange", () => {
      const handleChange = spy();
      const { getByRole } = render(
        <FormControlUnstyled onChange={handleChange}>
          <TestComponent />
        </FormControlUnstyled>,
      );

      const input = getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][0]).to.have.property('target');
      expect(handleChange.args[0][0].target).to.have.property('value', 'test');
    });
  });
});
