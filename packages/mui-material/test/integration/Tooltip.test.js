import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen, isJsdom, act, flushMicrotasks } from '@mui/internal-test-utils';
import Tooltip from '@mui/material/Tooltip';
import Input from '@mui/material/Input';

describe('<Tooltip> integration', () => {
  const { render } = createRenderer();

  it.skipIf(isJsdom())(
    'does not throw error and closes Tooltip when Input becomes disabled while focused',
    async () => {
      function TestCase({ disabled }) {
        return (
          <Tooltip title="Test" enterDelay={0} leaveDelay={0} slotProps={{ transition: { timeout: 0 } }}>
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

      await flushMicrotasks();
      expect(tooltip).to.equal(null);
    },
  );
});
