import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent } from '@mui/internal-test-utils';
import { FormControl, formControlClasses, useFormControlContext } from '@mui/base/FormControl';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<FormControl />', () => {
  const { render } = createRenderer();

  describeConformanceUnstyled(<FormControl />, () => ({
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    slots: {
      root: {
        expectedClassName: formControlClasses.root,
      },
    },
    skip: ['componentProp'],
  }));

  describe('initial state', () => {
    it('has undefined value', () => {
      function TestComponent() {
        const context = useFormControlContext();
        return <input value={context!.value as string} onChange={context!.onChange} />;
      }

      const { getByRole } = render(
        <FormControl>
          <TestComponent />
        </FormControl>,
      );

      expect(getByRole('textbox')).to.have.property('value', '');
    });

    it('has disabled, filled, focused, and required set to false', () => {
      function TestComponent() {
        const context = useFormControlContext();

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
        <FormControl>
          <TestComponent />
        </FormControl>,
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
        const context = useFormControlContext();
        return <input value={context!.value as string} onChange={context!.onChange} />;
      }

      const { getByRole } = render(
        <FormControl value="42">
          <TestComponent />
        </FormControl>,
      );

      expect(getByRole('textbox')).to.have.property('value', '42');
    });
  });

  describe('prop: disabled', () => {
    it('propagates the value via the context', () => {
      function TestComponent() {
        const context = useFormControlContext();
        return <input disabled={context?.disabled} />;
      }

      const { getByRole } = render(
        <FormControl disabled>
          <TestComponent />
        </FormControl>,
      );

      expect(getByRole('textbox')).to.have.property('disabled', true);
    });
  });

  describe('prop: defaultValue', () => {
    it('propagates the value via the context', () => {
      function TestComponent() {
        const context = useFormControlContext();
        return <input value={context!.value as string} onChange={context!.onChange} />;
      }

      const { getByRole } = render(
        <FormControl defaultValue="foo">
          <TestComponent />
        </FormControl>,
      );

      expect(getByRole('textbox')).to.have.property('value', 'foo');
    });
  });

  describe('prop: required', () => {
    it('propagates the value via the context', () => {
      function TestComponent() {
        const context = useFormControlContext();
        return <input required={context!.required} />;
      }

      const { getByRole } = render(
        <FormControl required>
          <TestComponent />
        </FormControl>,
      );

      expect(getByRole('textbox')).to.have.property('required', true);
    });
  });

  describe('prop: filled', () => {
    it('should be set if value is provided', () => {
      function TestComponent() {
        const context = useFormControlContext();
        return <input data-filled={context!.filled} />;
      }

      const { getByRole } = render(
        <FormControl value="foo">
          <TestComponent />
        </FormControl>,
      );

      expect(getByRole('textbox').dataset).to.have.property('filled', 'true');
    });

    it('should be set if defaultValue is provided', () => {
      function TestComponent() {
        const context = useFormControlContext();
        return <input data-filled={context!.filled} />;
      }

      const { getByRole } = render(
        <FormControl defaultValue="foo">
          <TestComponent />
        </FormControl>,
      );

      expect(getByRole('textbox').dataset).to.have.property('filled', 'true');
    });

    it('should be set if a controlled inner input sets its value', () => {
      function TestComponent() {
        const context = useFormControlContext();
        return (
          <input
            data-filled={context!.filled}
            value={context!.value as string}
            onChange={context!.onChange}
          />
        );
      }

      const { getByRole } = render(
        <FormControl>
          <TestComponent />
        </FormControl>,
      );

      const input = getByRole('textbox');
      fireEvent.change(input, { target: { value: 'a' } });

      expect(input.dataset).to.have.property('filled', 'true');
    });
  });

  describe('prop: onChange', () => {
    it("propagates the inner input's onChange to FormControl's onChange", () => {
      function TestComponent() {
        const context = useFormControlContext();
        return <input value={context!.value as string} onChange={context!.onChange} />;
      }

      const handleChange = spy();
      const { getByRole } = render(
        <FormControl onChange={handleChange}>
          <TestComponent />
        </FormControl>,
      );

      const input = getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][0]).to.have.property('target');
      expect(handleChange.args[0][0].target).to.have.property('value', 'test');
    });
  });
});
