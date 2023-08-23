import * as React from 'react';
import { act, createRenderer } from 'test/utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { useInput } from './useInput';
import { UseInputParameters } from './useInput.types';

describe('useInput', () => {
  const { render } = createRenderer();
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
});
