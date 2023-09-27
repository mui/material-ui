import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import DialogActions, { dialogActionsClasses as classes } from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { expect } from 'chai';

describe('<DialogActions />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiDialogActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should apply margin to all children but the first one', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const { container } = render(
      <DialogActions>
        <Button>Agree</Button>
        <Button href="#">Agree</Button>
        <Button component="span">Agree</Button>
        <div />
      </DialogActions>,
    );

    const children = container.children[0];
    const children2 = container.children[1];
    expect(children).toHaveComputedStyle({ marginLeft: '0px' });
    expect(children2).toHaveComputedStyle({ marginLeft: '8px' });
  });
});
