import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Dialog from '@mui/material/Dialog';
import SnackbarPortal from './SnackbarPortal';

describe('SnackbarPortal', () => {
  const { render } = createRenderer();

  it('keeps a null-returning explicit container in the body when a dialog closes', () => {
    const { unmount: unmountDialog } = render(
      <Dialog open transitionDuration={0}>
        Dialog content
      </Dialog>,
    );
    const { unmount: unmountPortal } = render(
      <SnackbarPortal container={() => null}>
        <div role="alert">Task completed</div>
      </SnackbarPortal>,
    );

    try {
      const alert = screen.getByRole('alert');
      expect(alert.parentElement!.parentElement).to.equal(document.body);

      unmountDialog();

      expect(alert.isConnected).to.equal(true);
      expect(alert.parentElement!.parentElement).to.equal(document.body);
    } finally {
      unmountPortal();
      unmountDialog();
    }
  });
});
