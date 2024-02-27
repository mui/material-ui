import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui-internal/test-utils';
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';

describe('useNumberInput2', () => {
  const { clock, render } = createRenderer();

  describe('press and hold', () => {
    clock.withFakeTimers();
    it('should call onChange continuously', () => {
      const handleChange = spy();
      function NumberInput(props: { defaultValue: number }) {
        const { getInputProps, getIncrementButtonProps } = useNumberInput({
          ...props,
          onChange: handleChange,
        });

        return (
          <div role="group">
            <button {...getIncrementButtonProps()} data-testid="incrementBtn" />
            <input data-testid="test-input" {...getInputProps()} />
          </div>
        );
      }
      render(<NumberInput defaultValue={0} />);

      const incrementBtn = screen.getByTestId('incrementBtn');

      fireEvent.mouseDown(incrementBtn); // onChange x1

      clock.tick(100); // onChange x2
      clock.tick(100); // onChange x3
      clock.tick(100); // onChange x4
      clock.runToLast();

      expect(handleChange.callCount).to.equal(4);
    });
  });
});
