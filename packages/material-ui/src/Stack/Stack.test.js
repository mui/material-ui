import * as React from 'react';
import { createClientRender } from 'test/utils';
import Stack from '@material-ui/core/Stack';

describe('<Stack />', () => {
  const render = createClientRender();

  describe('prop: spacing', () => {
    it('should have a spacing', () => {
      const { container } = render(<Stack spacing={1} />);
    });
  });
});
