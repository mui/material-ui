import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import DialogActions, { dialogActionsClasses as classes } from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { expect } from 'chai';
import describeConformance from '../../test/describeConformance';

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
        <Button data-testid="child-1">Agree</Button>
        <Button data-testid="child-2" href="#">
          Agree
        </Button>
        <Button data-testid="child-3" component="span">
          Agree
        </Button>
        <div data-testid="child-4" />
      </DialogActions>,
    );

    const children = container.querySelectorAll('[data-testid^="child-"]');
    expect(children[0]).toHaveComputedStyle({ marginLeft: '0px' });
    expect(children[1]).toHaveComputedStyle({ marginLeft: '8px' });
    expect(children[2]).toHaveComputedStyle({ marginLeft: '8px' });
    expect(children[3]).toHaveComputedStyle({ marginLeft: '8px' });
  });
});
