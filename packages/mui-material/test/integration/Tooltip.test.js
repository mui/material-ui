import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen, isJsdom, act } from '@mui/internal-test-utils';
import Tooltip from '@mui/material/Tooltip';
import Input from '@mui/material/Input';

describe('<Tooltip> integration', () => {
  const { render, clock } = createRenderer({ clock: 'fake' });

  it.skipIf(isJsdom())(
    'does not throw error and closes Tooltip when Input becomes disabled while focused',
    async () => {
      function TestCase({ disabled }) {
        return (
          <Tooltip title="Test" slotProps={{ transition: { timeout: 0 } }}>
            <Input disabled={disabled} placeholder="click here and wait" />
          </Tooltip>
        );
      }

      const { setProps } = render(<TestCase disabled={false} />);

      const input = screen.getByRole('textbox');

      await act(async () => {
        input.focus();
      });

      const tooltip = screen.queryByRole('tooltip');

      expect(tooltip).toBeVisible();

      expect(() => {
        setProps({ disabled: true });
      }).not.to.throw();

      clock.tick(100);
      expect(tooltip).to.equal(null);
    },
  );
});
