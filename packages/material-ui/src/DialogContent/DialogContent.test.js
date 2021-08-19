import * as React from 'react';
import { describeConformance, createClientRender } from 'test/utils';
import DialogContent, { dialogContentClasses as classes } from '@material-ui/core/DialogContent';

describe('<DialogContent />', () => {
  const render = createClientRender();

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
    const { getByTestId } = render(<DialogContent>{children}</DialogContent>);

    getByTestId('test-children');
  });
});
