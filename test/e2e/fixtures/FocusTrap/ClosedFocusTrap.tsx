import * as React from 'react';
import { FocusTrap } from '@mui/base/FocusTrap';

export default function ClosedFocusTrap() {
  return (
    <React.Fragment>
      <button type="button" autoFocus>
        initial focus
      </button>
      <FocusTrap open={false}>
        <div data-testid="root">
          <button type="button">inside focusable</button>
        </div>
      </FocusTrap>
      <button type="button">final tab target</button>
    </React.Fragment>
  );
}
