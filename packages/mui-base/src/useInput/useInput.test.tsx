import * as React from 'react';
import { createRenderer } from 'test/utils';
import { expect } from 'chai';
import useInput from './useInput';

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
});
