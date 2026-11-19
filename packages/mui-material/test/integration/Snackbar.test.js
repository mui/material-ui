import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Snackbar from '@mui/material/Snackbar';

describe('<Snackbar /> with a <Dialog />', () => {
  const { render } = createRenderer();

  function DialogWithSnackbar({ initialSnackbarOpen = false }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(initialSnackbarOpen);
    const [snackbarMounted, setSnackbarMounted] = React.useState(true);

    return (
      <div>
        <button onClick={() => setDialogOpen(true)}>Open dialog</button>
        {snackbarMounted && (
          <Snackbar
            open={snackbarOpen}
            disablePortal={false}
            message="Task completed"
            transitionDuration={0}
          />
        )}
        <Dialog open={dialogOpen} transitionDuration={0}>
          <button onClick={() => setSnackbarOpen(true)}>Show snackbar</button>
          <button onClick={() => setSnackbarOpen(false)}>Close snackbar</button>
          <button onClick={() => setSnackbarMounted(false)}>Remove snackbar</button>
        </Dialog>
      </div>
    );
  }

  it('exposes a sibling snackbar opened from the dialog while keeping the background hidden', async () => {
    const { user } = render(<DialogWithSnackbar />);
    const openDialogButton = screen.getByRole('button', { name: 'Open dialog' });

    await user.click(openDialogButton);
    const showSnackbarButton = screen.getByRole('button', { name: 'Show snackbar' });
    await user.click(showSnackbarButton);

    expect(screen.getByRole('alert', { hidden: false })).to.have.text('Task completed');
    expect(screen.getByRole('dialog', { hidden: false })).to.contain(
      screen.getByRole('alert', { hidden: false }),
    );
    expect(openDialogButton).toBeInaccessible();
    expect(showSnackbarButton).toHaveFocus();
  });

  it('keeps an existing sibling snackbar accessible when the dialog opens', async () => {
    const { user } = render(<DialogWithSnackbar initialSnackbarOpen />);
    const alert = screen.getByRole('alert', { hidden: false });
    const openDialogButton = screen.getByRole('button', { name: 'Open dialog' });

    await user.click(openDialogButton);

    expect(screen.getByRole('alert', { hidden: false })).to.equal(alert);
    expect(screen.getByRole('dialog')).to.contain(alert);
    expect(openDialogButton).toBeInaccessible();
    expect(screen.getByRole('dialog')).not.toBeInaccessible();
  });

  ['Close snackbar', 'Remove snackbar'].forEach((buttonName) => {
    it(`restores background hiding after ${buttonName.toLowerCase()}`, async () => {
      const { container, user } = render(<DialogWithSnackbar />);
      const openDialogButton = screen.getByRole('button', { name: 'Open dialog' });

      await user.click(openDialogButton);
      await user.click(screen.getByRole('button', { name: 'Show snackbar' }));
      expect(screen.getByRole('alert', { hidden: false })).to.have.text('Task completed');

      await user.click(screen.getByRole('button', { name: buttonName }));
      await waitFor(() => {
        expect(screen.queryByText('Task completed')).to.equal(null);
      });

      expect(container).to.have.attribute('aria-hidden', 'true');
      expect(openDialogButton).toBeInaccessible();
      expect(screen.getByRole('button', { name: 'Show snackbar' })).not.toBeInaccessible();
    });
  });

  it('keeps a nested snackbar action inside the dialog focus trap', async () => {
    function Test() {
      const [snackbarOpen, setSnackbarOpen] = React.useState(false);

      return (
        <Dialog open transitionDuration={0}>
          <button onClick={() => setSnackbarOpen(true)}>Show snackbar</button>
          <Snackbar
            open={snackbarOpen}
            message="Task completed"
            action={<button>Undo</button>}
            transitionDuration={0}
          />
        </Dialog>
      );
    }

    const { user } = render(<Test />);
    await user.click(screen.getByRole('button', { name: 'Show snackbar' }));
    const undoButton = screen.getByRole('button', { name: 'Undo' });

    await user.tab();

    expect(undoButton).toHaveFocus();
    expect(screen.getByRole('dialog')).to.contain(undoButton);
  });

  it('allows a nested snackbar to explicitly portal to the document body', () => {
    render(
      <Dialog open transitionDuration={0}>
        <Snackbar
          open
          disablePortal={false}
          container={() => document.body}
          message="Task completed"
          transitionDuration={0}
        />
      </Dialog>,
    );

    const alert = screen.getByRole('alert', { hidden: false });
    expect(alert.parentElement.parentElement.parentElement).to.equal(document.body);
    expect(screen.getByRole('dialog')).not.to.contain(alert);
  });

  it('includes a sibling snackbar action in the dialog tab sequence', async () => {
    function Test() {
      const [open, setOpen] = React.useState(false);

      return (
        <React.Fragment>
          <Dialog open transitionDuration={0}>
            <button onClick={() => setOpen(true)}>Save task</button>
          </Dialog>
          <Snackbar
            open={open}
            disablePortal={false}
            message="Task completed"
            action={<button>Undo</button>}
            transitionDuration={0}
          />
        </React.Fragment>
      );
    }

    const { user } = render(<Test />);
    await user.click(screen.getByRole('button', { name: 'Save task' }));
    const undoButton = screen.getByRole('button', { name: 'Undo' });

    await user.tab();

    expect(undoButton).toHaveFocus();
    expect(screen.getByRole('dialog')).to.contain(undoButton);
  });

  it('moves an open snackbar into a dialog and back without remounting its content', async () => {
    const handleMount = spy();

    function CounterMessage() {
      const [count, setCount] = React.useState(0);
      React.useEffect(() => {
        handleMount();
      }, []);

      return <button onClick={() => setCount(count + 1)}>Count {count}</button>;
    }

    function Test() {
      const [open, setOpen] = React.useState(false);

      return (
        <React.Fragment>
          <button onClick={() => setOpen(true)}>Open dialog</button>
          <Snackbar
            open
            disablePortal={false}
            message={<CounterMessage />}
            transitionDuration={0}
          />
          <Dialog open={open} transitionDuration={0}>
            <button onClick={() => setOpen(false)}>Close dialog</button>
          </Dialog>
        </React.Fragment>
      );
    }

    const { user } = render(<Test />);
    const counter = screen.getByRole('button', { name: 'Count 0' });
    const alert = screen.getByRole('alert', { hidden: false });
    const host = alert.parentElement.parentElement;
    const initialMountCount = handleMount.callCount;
    expect(host.parentElement).to.equal(document.body);
    await user.click(counter);
    expect(counter).to.have.text('Count 1');

    await user.click(screen.getByRole('button', { name: 'Open dialog' }));

    expect(screen.getByRole('dialog')).to.contain(alert);
    expect(screen.getByRole('button', { name: 'Count 1' })).to.equal(counter);
    expect(alert.parentElement.parentElement).to.equal(host);
    expect(handleMount.callCount).to.equal(initialMountCount);
    await user.click(counter);
    expect(counter).to.have.text('Count 2');

    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    await waitFor(() => {
      expect(host.parentElement).to.equal(document.body);
    });

    expect(screen.getByRole('alert', { hidden: false })).to.equal(alert);
    expect(screen.getByRole('button', { name: 'Count 2' })).to.equal(counter);
    expect(handleMount.callCount).to.equal(initialMountCount);
  });

  it('keeps the focused action and host in place when the message updates', async () => {
    function Test({ message }) {
      return (
        <React.Fragment>
          <Dialog open transitionDuration={0}>
            <button>Dialog action</button>
          </Dialog>
          <Snackbar
            open
            disablePortal={false}
            message={message}
            action={<button>Undo</button>}
            transitionDuration={0}
          />
        </React.Fragment>
      );
    }

    const { setProps } = render(<Test message="Task completed" />);
    const undoButton = screen.getByRole('button', { name: 'Undo' });
    const host = screen.getByRole('alert', { hidden: false }).parentElement.parentElement;
    const parent = host.parentElement;
    act(() => undoButton.focus());
    const hostChanges = [];
    const observer = new MutationObserver((records) => {
      hostChanges.push(
        ...records.filter(
          (record) =>
            Array.from(record.addedNodes).includes(host) ||
            Array.from(record.removedNodes).includes(host),
        ),
      );
    });
    observer.observe(parent, { childList: true });

    try {
      setProps({ message: 'Task updated' });
      await waitFor(() => {
        expect(screen.getByRole('alert', { hidden: false })).to.have.text('Task updatedUndo');
      });

      expect(host.parentElement).to.equal(parent);
      expect(screen.getByRole('button', { name: 'Undo' })).to.equal(undoButton);
      expect(undoButton).toHaveFocus();
      expect(hostChanges).to.have.lengthOf(0);
    } finally {
      observer.disconnect();
    }
  });

  it('keeps the snackbar host when dialog content rerenders', () => {
    function Test({ prompt }) {
      return (
        <React.Fragment>
          <Dialog open transitionDuration={0}>
            {prompt}
          </Dialog>
          <Snackbar open disablePortal={false} message="Task completed" transitionDuration={0} />
        </React.Fragment>
      );
    }

    const { setProps } = render(<Test prompt="Review this task" />);
    const alert = screen.getByRole('alert', { hidden: false });
    const host = alert.parentElement.parentElement;

    setProps({ prompt: 'Review the updated task' });

    expect(screen.getByRole('dialog')).to.have.text('Review the updated taskTask completed');
    expect(screen.getByRole('alert', { hidden: false })).to.equal(alert);
    expect(alert.parentElement.parentElement).to.equal(host);
    expect(host.isConnected).to.equal(true);
  });

  it('uses the active dialog instead of a hidden nested dialog kept in its DOM', () => {
    render(
      <React.Fragment>
        <Dialog open transitionDuration={0} aria-labelledby="outer-dialog-title">
          <h2 id="outer-dialog-title">Outer dialog</h2>
          <Dialog
            open={false}
            disablePortal
            keepMounted
            transitionDuration={0}
            aria-labelledby="inner-dialog-title"
          >
            <h2 id="inner-dialog-title">Inner dialog</h2>
          </Dialog>
        </Dialog>
        <Snackbar open disablePortal={false} message="Task completed" transitionDuration={0} />
      </React.Fragment>,
    );

    const outer = screen.getByRole('dialog', { name: 'Outer dialog' });
    const inner = screen.getByText('Inner dialog').closest('[role="dialog"]');
    const alert = screen.getByRole('alert', { hidden: false });

    expect(inner).toBeInaccessible();
    expect(outer).to.contain(inner);
    expect(alert.closest('[role="dialog"]')).to.equal(outer);
    expect(inner).not.to.contain(alert);
  });

  it('uses an explicit container instead of the active dialog host', () => {
    const customContainer = document.createElement('div');
    render(
      <React.Fragment>
        <Dialog open transitionDuration={0}>
          <div
            ref={(node) => {
              node?.appendChild(customContainer);
            }}
          />
        </Dialog>
        <Snackbar
          open
          disablePortal={false}
          container={customContainer}
          message="Task completed"
          transitionDuration={0}
        />
      </React.Fragment>,
    );

    const host = screen.getByRole('alert', { hidden: false }).parentElement.parentElement;
    expect(host.parentElement).to.equal(customContainer);
    expect(host.parentElement).not.to.equal(screen.getByRole('dialog'));
  });
});

describe('<Snackbar /> with a <Drawer />', () => {
  const { render } = createRenderer();

  it('keeps the notification mounted when the drawer text changes', async () => {
    function CounterAction() {
      const [count, setCount] = React.useState(0);
      return <button onClick={() => setCount(count + 1)}>Undo {count}</button>;
    }

    function Test({ contents }) {
      return (
        <React.Fragment>
          <Drawer open transitionDuration={0}>
            {contents}
          </Drawer>
          <Snackbar
            open
            disablePortal={false}
            message="Task completed"
            action={<CounterAction />}
            transitionDuration={0}
          />
        </React.Fragment>
      );
    }

    const { user, setProps } = render(<Test contents="Original drawer text" />);
    const alert = screen.getByRole('alert', { hidden: false });
    const action = screen.getByRole('button', { name: 'Undo 0' });
    const host = alert.parentElement.parentElement;
    const drawer = screen.getByRole('dialog');
    expect(drawer).to.contain(alert);
    await user.click(action);
    expect(action).toHaveFocus();

    setProps({ contents: 'Updated drawer text' });

    expect(alert.isConnected).to.equal(true);
    expect(screen.getByRole('alert', { hidden: false })).to.equal(alert);
    expect(drawer).to.contain(host);
    expect(screen.getByRole('button', { name: 'Undo 1' })).to.equal(action);
    expect(action).toHaveFocus();
  });
});
