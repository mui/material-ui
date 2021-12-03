import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import Alert, { alertClasses as classes } from '@mui/material/Alert';
import Paper, { paperClasses } from '@mui/material/Paper';

describe('<Alert />', () => {
  const { render } = createRenderer();

  describeConformance(<Alert />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAlert',
    testVariantProps: { variant: 'standard', color: 'success' },
    testDeepOverrides: { slotName: 'message', slotClassName: classes.message },
    skip: ['componentsProp'],
  }));

  describe('prop: square', () => {
    it('adds rounded corners when we disable square', () => {
      const { getByTestId } = render(
        <Alert data-testid="root" square={false}>
          Hello World
        </Alert>,
      );

      expect(getByTestId('root')).to.have.class(paperClasses.rounded);
    });

    it('should disable rounded corners by default', () => {
      const { getByTestId } = render(<Alert data-testid="root">Hello World</Alert>);

      expect(getByTestId('root')).not.to.have.class(paperClasses.rounded);
    });
  });
});
