import * as React from 'react';
import { act, createRenderer } from '@mui-internal/test-utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { useInput } from './useInput';
import { UseInputParameters } from './useInput.types';

describe('useInput', () => {
  const { render } = createRenderer();
  it('returns an inputRef to the underlying input', () => {
    let returnedInputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement> | null = {
      current: null,
    };

    function Input() {
      const { getInputProps, inputRef } = useInput();
      returnedInputRef = inputRef;
      return <input {...getInputProps()} />;
    }

    const { getByRole } = render(<Input />);

    expect(returnedInputRef?.current).to.deep.equal(getByRole('textbox'));
  });

  describe('params: inputRef', () => {
    it('should be able to attach input ref passed through params', () => {
      const inputRef = React.createRef<HTMLInputElement>();

      function Input() {
        const { getInputProps } = useInput({
          inputRef,
        });
        return <input {...getInputProps()} />;
      }
      const { getByRole } = render(<Input />);

      expect(inputRef.current).to.deep.equal(getByRole('textbox'));
    });
  });

  describe('prop: disabled', () => {
    it('should render a disabled <input />', () => {
      function Input(props: { disabled: boolean }) {
        const { getInputProps } = useInput({
          disabled: props.disabled,
        });
        return <input {...getInputProps()} />;
      }
      const { getByRole } = render(<Input disabled />);
      const input = getByRole('textbox');
      expect(input).to.have.attribute('disabled');
    });

    it('should reset the focused state if getting disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();

      function Input(props: UseInputParameters) {
        const { getInputProps } = useInput(props);

        return <input {...getInputProps()} />;
      }
      const { getByRole, setProps } = render(<Input onBlur={handleBlur} onFocus={handleFocus} />);

      act(() => {
        getByRole('textbox').focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });

      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });
  });

  describe('external props', () => {
    it('prop getter functions should forward arbitrary props to the corresponding slot', () => {
      const rootRef = React.createRef<HTMLDivElement>();

      function Input() {
        const { getRootProps, getInputProps } = useInput();
        return (
          <div {...getRootProps({ 'data-testid': 'test-root-slot', ref: rootRef })}>
            <input {...getInputProps({ 'data-testid': 'test-input-slot' })} />
          </div>
        );
      }
      const { getByRole } = render(<Input />);

      expect(rootRef.current).to.have.attribute('data-testid', 'test-root-slot');

      expect(getByRole('textbox')).to.have.attribute('data-testid', 'test-input-slot');
    });
  });
});
