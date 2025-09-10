import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { useSlider } from './useSlider';

describe('useSlider', () => {
  const { render } = createRenderer();

  describe('getRootProps', () => {
    it('forwards external props including event handlers', () => {
      const rootRef = React.createRef();

      const handleClick = spy();

      function Test() {
        const { getRootProps } = useSlider({
          rootRef,
          marks: [
            {
              label: 'One',
              value: 1,
            },
          ],
        });

        return (
          <div {...getRootProps({ 'data-testid': 'test-slider-root', onClick: handleClick })} />
        );
      }

      render(<Test />);

      const slider = screen.getByTestId('test-slider-root');
      expect(slider).not.to.equal(null);
      expect(rootRef.current).to.deep.equal(slider);

      fireEvent.click(slider);
      expect(handleClick.callCount).to.equal(1);
    });
  });

  describe('getHiddenInputProps', () => {
    function Test(
      props = {
        slotProps: {
          input: {},
        },
      },
    ) {
      const { getRootProps, getThumbProps, getHiddenInputProps } = useSlider({
        marks: [
          {
            label: 'One',
            value: 1,
          },
        ],
      });

      return (
        <div {...getRootProps()}>
          <div {...getThumbProps()}>
            <input
              value={1}
              {...getHiddenInputProps({ 'data-testid': 'test-input', ...props.slotProps.input })}
            />
          </div>
        </div>
      );
    }

    it('forwards external props including event handlers', () => {
      const handleClick = spy();
      render(
        <Test
          slotProps={{
            input: {
              onClick: handleClick,
            },
          }}
        />,
      );

      const input = screen.getByTestId('test-input');
      expect(input).not.to.equal(null);

      fireEvent.click(input);
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
