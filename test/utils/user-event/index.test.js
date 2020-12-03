import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, screen, userEvent } from 'test/utils';

describe('userEvent', () => {
  const render = createClientRender();

  describe('tab', () => {
    it('should tab', () => {
      render(
        <div>
          <input />
          <span />
          <input />
        </div>,
      );
      const inputs = document.querySelectorAll('input');
      inputs[0].focus();
      expect(document.activeElement).to.equal(inputs[0]);
      userEvent.tab();
      expect(document.activeElement).to.equal(inputs[1]);
      userEvent.tab({ shift: true });
      expect(document.activeElement).to.equal(inputs[0]);
    });

    it('should handle radio', () => {
      const Test = () => {
        const [value, setValue] = React.useState('two');
        const onChange = (e) => setValue(e.target.value);
        return (
          <div>
            <button data-testid="start" type="button">
              start
            </button>
            <input
              aria-label="one"
              checked={value === 'one'}
              id="one"
              name="country"
              onChange={onChange}
              type="radio"
              value="one"
            />
            <input
              aria-label="two"
              checked={value === 'two'}
              id="two"
              name="country"
              onChange={onChange}
              type="radio"
              value="two"
            />
            <input
              aria-label="three"
              checked={value === 'three'}
              id="three"
              name="country"
              onChange={onChange}
              type="radio"
              value="three"
            />
          </div>
        );
      };
      render(<Test />);
      screen.getByTestId('start').focus();
      expect(screen.getByTestId('start')).toHaveFocus();
      userEvent.tab();
      expect(screen.getByLabelText('two')).toHaveFocus();
    });
  });
});
