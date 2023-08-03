import * as React from 'react';
import { FocusTrap } from '@mui/base/FocusTrap';

export default function BaseFocusTrap() {
  const [open, close] = React.useReducer(() => false, true);

  return (
    <React.Fragment>
      <button type="button" autoFocus data-testid="initial-focus">
        initial focus
      </button>
      <FocusTrap isEnabled={() => true} open={open} disableAutoFocus>
        <div data-testid="root">
          <div>Title</div>
          <button type="button" onClick={close}>
            close
          </button>
          <button type="button">noop</button>
        </div>
      </FocusTrap>
    </React.Fragment>
  );
}
