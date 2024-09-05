import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Typography from '@mui/material/Typography';
import DialogTitle, { dialogTitleClasses as classes } from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import describeConformance from '../../test/describeConformance';

describe('<DialogTitle />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogTitle>foo</DialogTitle>, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiDialogTitle',
    refInstanceof: window.HTMLHeadingElement,
    testVariantProps: { 'data-color': 'red' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render JSX children', () => {
    const children = <span data-testid="test-children" />;
    const { getByTestId } = render(<DialogTitle>{children}</DialogTitle>);

    getByTestId('test-children');
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    const { getByText } = render(<DialogTitle>{children}</DialogTitle>);

    getByText('Hello');
  });

  describe('prop: id', () => {
    it('should apply the id attribute provided to the Dialog title', () => {
      const { getByText } = render(
        <Dialog open>
          <DialogTitle id="custom-id">title test</DialogTitle>
        </Dialog>,
      );

      expect(getByText('title test')).to.have.attribute('id', 'custom-id');
    });

    it('should fallback to the aria-labelledby from the Dialog', () => {
      const { getByText } = render(
        <Dialog open aria-labelledby="custom-id">
          <DialogTitle>title test</DialogTitle>
        </Dialog>,
      );

      expect(getByText('title test')).to.have.attribute('id', 'custom-id');
    });

    it('should apply the id attribute explicitly provided to the DialogTitle and not take from Dialog', () => {
      const { getByText } = render(
        <Dialog open aria-labelledby="custom-id-1">
          <DialogTitle id="custom-id-2">title test</DialogTitle>
        </Dialog>,
      );

      expect(getByText('title test')).to.have.attribute('id', 'custom-id-2');
    });
  });
});
