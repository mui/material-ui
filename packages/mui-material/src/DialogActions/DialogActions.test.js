import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import DialogActions, { dialogActionsClasses as classes } from '@mui/material/DialogActions';
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

  it('should render a children element', function test() {
    const { queryByTestId } = render(
      <DialogActions>
        <div data-testid="test-children" />
      </DialogActions>,
    );

    expect(queryByTestId('test-children')).not.to.equal(null);
  });
});
