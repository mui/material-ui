import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

export default function IndependentBodyScrollLock() {
  const [open, setOpen] = React.useState(false);

  return (
    <div data-testid="scroll-content" style={{ height: '300vh' }}>
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <Menu2 trigger={<button type="button">Open menu</button>} transitionDuration={0}>
        <Menu2Item onClick={() => setOpen(true)}>Open dialog from menu</Menu2Item>
      </Menu2>
      <Dialog open={open} transitionDuration={0} aria-label="Scroll lock dialog">
        <button type="button" onClick={() => setOpen(false)}>
          Close dialog
        </button>
      </Dialog>
    </div>
  );
}
