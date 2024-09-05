import * as React from 'react';
import { FocusTrap } from '@mui/base/FocusTrap';

export default function BaseFocusTrap() {
  return (
    <React.Fragment>
      <button type="button" autoFocus data-testid="initial-focus">
        initial focus
      </button>
      <FocusTrap isEnabled={() => true} open>
        <div tabIndex={-1} data-testid="root">
          <div>Title</div>
          <button type="button">x</button>
          <button type="button">cancel</button>
          <button type="button">ok</button>
        </div>
      </FocusTrap>
    </React.Fragment>
  );
}
