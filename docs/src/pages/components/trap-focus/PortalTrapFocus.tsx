import React from 'react';
import Portal from '@material-ui/core/Portal';
import TrapFocus from '@material-ui/core/Unstable_TrapFocus';

export default function PortalTrapFocus() {
  const [open, setOpen] = React.useState(false);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <br />
      {open && (
        <TrapFocus open isEnabled={() => true} getDoc={() => document}>
          <div tabIndex={-1}>
            <h3>Quick form</h3>
            <label>
              First name: <input type="text" />
            </label>
            <br />
            <Portal container={container}>
              <label>
                Last name: <input type="text" />
              </label>
              <br />
            </Portal>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </TrapFocus>
      )}
      <div ref={setContainer} />
    </div>
  );
}
