import * as React from 'react';
import TrapFocus from '@material-ui/core/Unstable_TrapFocus';

export default function DisableEnforceFocus() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <br />
      {open && (
        <TrapFocus
          disableEnforceFocus
          open
          isEnabled={() => true}
          getDoc={() => document}
        >
          <div tabIndex={-1}>
            <h3>Quick form</h3>
            <label>
              First name: <input type="text" />
            </label>
            <br />
            <label>
              Last name: <input type="text" />
            </label>
            <br />
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </TrapFocus>
      )}
    </div>
  );
}
