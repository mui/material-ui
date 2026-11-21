import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Snackbar from '@mui/material/Snackbar';
import { getSnackbarModal } from '../../src/utils/snackbarRegistry';

describe('useModal snackbar document scope', () => {
  const { render } = createRenderer();

  [
    { name: 'Dialog', Component: Dialog },
    { name: 'Drawer', Component: Drawer },
  ].forEach(({ name, Component }) => {
    it(`does not add a Snackbar outlet to a default ${name}`, () => {
      render(
        <Component open transitionDuration={0}>
          Default modal content
        </Component>,
      );

      expect(document.querySelector('[data-mui-snackbar-container]')).to.equal(null);
      expect(getSnackbarModal(document)).to.equal(null);
    });
  });

  it('creates and removes the outlet when a sibling Snackbar opts into portal placement', async () => {
    function Test() {
      const [open, setOpen] = React.useState(false);
      return (
        <React.Fragment>
          <Dialog open transitionDuration={0}>
            <Button onClick={() => setOpen(true)}>Show notification</Button>
          </Dialog>
          <Snackbar
            open={open}
            disablePortal={false}
            transitionDuration={0}
            message="Task saved"
            action={<Button onClick={() => setOpen(false)}>Dismiss notification</Button>}
          />
        </React.Fragment>
      );
    }

    const { user } = render(<Test />);
    expect(document.querySelector('[data-mui-snackbar-container]')).to.equal(null);

    await user.click(screen.getByRole('button', { name: 'Show notification' }));

    const outlet = getSnackbarModal(document);
    expect(outlet).not.to.equal(null);
    expect(outlet!.closest('[role="dialog"]')).not.to.equal(null);
    expect(outlet!.contains(screen.getByRole('alert', { hidden: false }))).to.equal(true);

    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));

    await waitFor(() => {
      expect(document.querySelector('[data-mui-snackbar-container]')).to.equal(null);
      expect(getSnackbarModal(document)).to.equal(null);
    });
  });

  it('clears an unmounted iframe dialog without changing the other document', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const frameDocument = iframe.contentDocument!;

    const { unmount: unmountMainDialog } = render(
      <React.Fragment>
        <Dialog
          open
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          transitionDuration={0}
        >
          Main document dialog
        </Dialog>
        <Snackbar open disablePortal={false} message="Main notification" />
      </React.Fragment>,
    );
    const { unmount: unmountFrameDialog } = render(
      <React.Fragment>
        <Dialog
          open
          container={frameDocument.body}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          transitionDuration={0}
        >
          Iframe dialog
        </Dialog>
        <Snackbar
          open
          disablePortal={false}
          container={frameDocument.body}
          message="Iframe notification"
        />
      </React.Fragment>,
    );

    try {
      const mainDialog = document.querySelector('[role="dialog"]');
      const frameDialog = frameDocument.querySelector('[role="dialog"]');
      const mainSnackbarContainer = getSnackbarModal(document);
      const frameSnackbarContainer = getSnackbarModal(frameDocument);

      expect(mainDialog).not.to.equal(null);
      expect(frameDialog).not.to.equal(null);
      expect(mainSnackbarContainer).not.to.equal(null);
      expect(frameSnackbarContainer).not.to.equal(null);
      expect(mainDialog!.contains(mainSnackbarContainer)).to.equal(true);
      expect(frameDialog!.contains(frameSnackbarContainer)).to.equal(true);
      expect(mainSnackbarContainer!.closest('[role="dialog"]')).to.equal(mainDialog);
      expect(frameSnackbarContainer!.closest('[role="dialog"]')).to.equal(frameDialog);

      unmountFrameDialog();

      expect(frameDialog!.isConnected).to.equal(false);
      expect(getSnackbarModal(frameDocument)).to.equal(null);
      expect(getSnackbarModal(document)).to.equal(mainSnackbarContainer);
    } finally {
      unmountFrameDialog();
      unmountMainDialog();
      iframe.remove();
    }
  });
});
