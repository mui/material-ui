import * as React from 'react';
import TrapFocus from '@mui/base/TrapFocus';

export default function BaseTrapFocus() {
  return (
    <React.Fragment>
      <button type="button" autoFocus>
        initial focus
      </button>
      <TrapFocus open={false}>
        <div data-testid="root">
          <button type="button">inside focusable</button>
        </div>
      </TrapFocus>
      <button type="button">final tab target</button>
    </React.Fragment>
  );
}
