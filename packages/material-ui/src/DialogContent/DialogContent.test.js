import * as React from 'react';
import { createMount, describeConformanceV5, createClientRender } from 'test/utils';
import DialogContent, { dialogContentClasses as classes } from '@material-ui/core/DialogContent';

describe('<DialogContent />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<DialogContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiDialogContent',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { dividers: true },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render children', () => {
    const children = <p data-testid="test-children" />;
    const { getByTestId } = render(<DialogContent>{children}</DialogContent>);

    getByTestId('test-children');
  });
});
