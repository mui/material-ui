import * as React from 'react';
import { FocusTrap } from '@mui/base/FocusTrap';

export default function disableEnforceFocusFocusTrap() {
  return (
    <React.Fragment>
      <button data-testid="initial-focus" type="button" autoFocus>
        initial focus
      </button>
      <FocusTrap open disableEnforceFocus disableAutoFocus>
        <div data-testid="root">
          <button data-testid="inside-trap-focus" type="button">
            inside focusable
          </button>
        </div>
      </FocusTrap>
    </React.Fragment>
  );
}
