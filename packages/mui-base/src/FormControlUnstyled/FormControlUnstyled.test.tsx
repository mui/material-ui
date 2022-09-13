import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, createRenderer, describeConformanceUnstyled, fireEvent } from 'test/utils';
import FormControlUnstyled, { formControlUnstyledClasses } from '@mui/base/FormControlUnstyled';
import useFormControlUnstyledContext from '@mui/base/useFormControlUnstyledContext';

describe('<FormControlUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<FormControlUnstyled />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'BaseFormControl',
    slots: {
      root: {
        expectedClassName: formControlUnstyledClasses.root,
      },
    },
  }));

  describe('initial state', () => {
    it('has undefined value', () => {
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return <input value={context!.value as string} onChange={context!.onChange} />;
      }

      const { getByRole } = render(
        <FormControlUnstyled>
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox')).to.have.property('value', '');
    });

    it('has disabled, filled, focused, and required set to false', () => {
      function TestComponent() {
        const context = useFormControlUnstyledContext();

        return (
          <input
            data-filled={context!.filled}
            data-focused={context!.focused}
            disabled={context!.disabled}
            required={context!.required}
          />
        );
      }

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
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return <input value={context!.value as string} onChange={context!.onChange} />;
      }

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
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return <input disabled={context?.disabled} />;
      }

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
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return <input value={context!.value as string} onChange={context!.onChange} />;
      }

      const { getByRole } = render(
        <FormControlUnstyled defaultValue="foo">
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox')).to.have.property('value', 'foo');
    });
  });

  describe('prop: required', () => {
    it('propagates the value via the context', () => {
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return <input required={context!.required} />;
      }

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
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return <input data-filled={context!.filled} />;
      }

      const { getByRole } = render(
        <FormControlUnstyled value="foo">
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox').dataset).to.have.property('filled', 'true');
    });

    it('should be set if defaultValue is provided', () => {
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return <input data-filled={context!.filled} />;
      }

      const { getByRole } = render(
        <FormControlUnstyled defaultValue="foo">
          <TestComponent />
        </FormControlUnstyled>,
      );

      expect(getByRole('textbox').dataset).to.have.property('filled', 'true');
    });

    it('should be set if a controlled inner input sets its value', () => {
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return (
          <input
            data-filled={context!.filled}
            value={context!.value as string}
            onChange={context!.onChange}
          />
        );
      }

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
      function TestComponent() {
        const context = useFormControlUnstyledContext();
        return <input value={context!.value as string} onChange={context!.onChange} />;
      }

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
