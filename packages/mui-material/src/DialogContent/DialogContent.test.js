import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import DialogContent, { dialogContentClasses as classes } from '@mui/material/DialogContent';
import describeConformance from '../../test/describeConformance';

describe('<DialogContent />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiDialogContent',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { dividers: true },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render children', () => {
    const children = <p data-testid="test-children" />;
    render(<DialogContent>{children}</DialogContent>);

    screen.getByTestId('test-children');
  });
});
