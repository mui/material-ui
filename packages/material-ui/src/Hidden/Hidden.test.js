import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import Hidden from './Hidden';

describe('<Hidden />', () => {
  let render = createClientRender();

  describe('prop: implementation', () => {
    it('should use HiddenJs by default', () => {
      const { container } = render(<Hidden>Hello</Hidden>);
      // JS implementation doesn't requires wrapping <div />
      expect(container.firstChild).to.equal(null);
    });

    it('should change the implementation', () => {
      const { container } = render(<Hidden implementation="css">Hello</Hidden>);
      // CSS  implementation requires wrapping <div />
      expect(container.firstChild).to.have.tagName('div');
    });
  });
});
