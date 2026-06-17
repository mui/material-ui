import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import { expect, test, vi } from 'vitest';
import App from './App.jsx';

test('renders the app through the published @mui/material package layout', () => {
  render(<App />);

  expect(screen.getByText('Faded in on first render')).toBeDefined();
  expect(screen.getByText('Item 1')).toBeDefined();
});

test('adds a list item to an already-mounted TransitionGroup', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Add item' }));

  expect(await screen.findByText('Item 4')).toBeDefined();
});

test('Collapse added to a mounted TransitionGroup enters with isAppearing=false', async () => {
  const handleEntered = vi.fn();

  function Harness() {
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <button type="button" onClick={() => setOpen(true)}>
          Open
        </button>
        <TransitionGroup>
          {open ? (
            <Collapse key="content" onEntered={handleEntered} timeout={50}>
              <p>Collapse content</p>
            </Collapse>
          ) : null}
        </TransitionGroup>
      </React.Fragment>
    );
  }

  render(<Harness />);
  fireEvent.click(screen.getByRole('button', { name: 'Open' }));

  expect(await screen.findByText('Collapse content')).toBeDefined();
  await waitFor(() => expect(handleEntered).toHaveBeenCalledTimes(1));

  // Material UI and react-transition-group must share one TransitionGroupContext
  // instance for this to hold: a child added after the group mounted reports
  // isAppearing=false (the last callback argument).
  const enteredArguments = handleEntered.mock.calls[0];
  expect(enteredArguments[enteredArguments.length - 1]).toBe(false);
});
