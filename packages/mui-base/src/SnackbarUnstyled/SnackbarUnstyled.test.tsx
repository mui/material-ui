import * as React from 'react';
import { createRenderer, createMount, describeConformanceUnstyled } from 'test/utils';
import SnackbarUnstyled, { snackbarUnstyledClasses as classes } from '@mui/base/SnackbarUnstyled';

describe('<SnackbarUnstyled />', () => {
  const { render } = createRenderer();
  const mount = createMount();

  describeConformanceUnstyled(
    <SnackbarUnstyled open>
      <div />
    </SnackbarUnstyled>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      mount,
      refInstanceof: window.HTMLDivElement,
      muiName: 'BaseSnackbar',
      slots: {
        root: {
          expectedClassName: classes.root,
        },
      },
    }),
  );
});
