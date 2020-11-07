import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, userEvent } from 'test/utils';

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
  });
});
