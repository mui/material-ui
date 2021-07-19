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
import { FormControlUnstyledState } from './FormControlContext';

function TestComponent(props: { contextCallback?: (context: FormControlUnstyledState) => void }) {
  const context = useFormControlUnstyled();
  React.useEffect(() => {
    props.contextCallback?.(context!);
  });

  const inputProps = {
    value: context?.value as any,
    defaultValue: context?.defaultValue as any,
    onChange: context?.onChange,
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
      const readContext = spy();
      render(
        <FormControlUnstyled>
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.have.property('value', undefined);
      expect(readContext.args[0][0]).to.have.property('defaultValue', undefined);
    });

    it('has disabled, filled, focused, and required set to false', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled>
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.include({
        disabled: false,
        filled: false,
        focused: false,
        required: false,
      });
    });
  });

  describe('prop: value', () => {
    it('propagates the value via the context', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled value="42">
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.have.property('value', '42');
    });
  });

  describe('prop: disabled', () => {
    it('propagates the value via the context', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled disabled>
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.have.property('disabled', true);
    });
  });

  describe('prop: defaultValue', () => {
    it('propagates the value via the context', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled defaultValue="foo">
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.have.property('defaultValue', 'foo');
    });
  });

  describe('prop: focused', () => {
    it('propagates the value via the context', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled focused>
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.have.property('focused', true);
    });

    it('ignores focused when disabled', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled focused disabled>
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );
      expect(readContext.args[0][0]).to.include({ disabled: true, focused: false });
    });
  });

  describe('prop: required', () => {
    it('propagates the value via the context', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled required>
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.have.property('required', true);
    });
  });

  describe('prop: filled', () => {
    it('should be set if value is provided', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled value="foo">
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should be set if defaultValue is provided', () => {
      const readContext = spy();
      render(
        <FormControlUnstyled defaultValue="foo">
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should be set if a controlled inner input sets its value', () => {
      const readContext = spy();
      const { getByRole } = render(
        <FormControlUnstyled>
          <TestComponent contextCallback={readContext} />
        </FormControlUnstyled>,
      );

      const input = getByRole('textbox');
      fireEvent.change(input, { target: { value: 'a' } });

      expect(readContext.lastCall.args[0]).to.have.property('filled', true);
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
