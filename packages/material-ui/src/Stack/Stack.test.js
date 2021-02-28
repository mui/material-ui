import * as React from 'react';
import { expect } from 'chai';
import Stack from './Stack';

describe('<Stack />', () => {
  const render = createClientRender();

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Stack spacing={1} />);
    });
  });
});
